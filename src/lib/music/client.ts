const DEEZER_API_BASE = "https://api.deezer.com";
const TIMEOUT_MS = 8000;
const MAX_RETRIES = 3;

interface FetchOptions extends RequestInit {
  revalidate?: number;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Reusable HTTP fetch client wrapper for the Deezer API.
 * Features built-in AbortController request timeouts, exponential backoff retries,
 * and Next.js revalidation-based fetch caching.
 */
export async function deezerFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const url = `${DEEZER_API_BASE}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
  
  const { revalidate = 3600, ...restOptions } = options;
  
  let attempt = 0;
  let lastError: Error | null = null;

  while (attempt < MAX_RETRIES) {
    attempt++;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const response = await fetch(url, {
        ...restOptions,
        signal: controller.signal,
        next: { revalidate },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Deezer API sometimes returns errors inside a 200 OK JSON body
      if (data && data.error) {
        throw new Error(`Deezer API Error: ${data.error.message || JSON.stringify(data.error)}`);
      }

      return data as T;
    } catch (error) {
      clearTimeout(timeoutId);
      
      let currentError: Error;
      if (error && typeof error === "object" && "name" in error && error.name === "AbortError") {
        currentError = new Error(`Request timed out after ${TIMEOUT_MS}ms`);
      } else {
        currentError = error instanceof Error ? error : new Error(String(error));
      }

      lastError = currentError;
      console.warn(`Deezer Fetch (Attempt ${attempt}/${MAX_RETRIES}) failed for ${url}: ${currentError.message}`);

      if (attempt < MAX_RETRIES) {
        const backoffDelay = Math.pow(2, attempt) * 250; // 500ms, 1000ms...
        await delay(backoffDelay);
      }
    }
  }

  throw lastError || new Error(`Failed to fetch from Deezer API at ${url}`);
}
