import { http } from '../lib/http'

export type GetMovieDataResult = {
    data: MovieData[]
    minDate: string
    maxDate: string
    parsedSearch: ParsedSearch
}

export type MovieData = {
    likes: number
    views: number
    date: string
}

export type ParsedSearch = {
    from: string
    to: string
}

export async function getMovieData(id: string, from?: string, to?: string) {
    const { body: data } = await http.get<GetMovieDataResult>(
        `/v2/movies/${id}/data`,
        {
            searchParams: {
                from,
                to,
            },
        },
    )
    return data
}
