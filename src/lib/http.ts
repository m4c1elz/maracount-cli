import { BASE_API_URL } from '../constants/api'

export class HttpClient {
    constructor(private baseUrl: string) {}

    public async get<T>(
        endpoint: string,
        opts?: { searchParams: Record<string, unknown> },
    ): Promise<{ response: Response; body: T }> {
        const parsedSearchParams = new URLSearchParams()

        if (opts) {
            const keys = Object.keys(opts.searchParams)
            const values = Object.values(opts.searchParams)

            for (let i = 0; i < keys.length; i++) {
                const key = keys[i]
                const value = values[i]

                if (key && value) {
                    parsedSearchParams.set(key, String(value))
                }
            }
        }

        const response = await fetch(
            this.baseUrl
                .concat(endpoint)
                .concat('?')
                .concat(parsedSearchParams.toString()),
        )

        if (!response.ok) {
            throw new Error(
                `Error while fetching ${endpoint}: ${response.status} ${response.statusText}`,
            )
        }

        const result = (await response.json()) as T

        return {
            response,
            body: result,
        }
    }
}

export const http = new HttpClient(BASE_API_URL)
