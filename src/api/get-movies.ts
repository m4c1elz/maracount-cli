import { http } from '../lib/http'

export type GetMoviesResult = {
    data: GetMoviesResultItem[]
    totalPages: number
}

export type GetMoviesResultItem = {
    id: number
    link: string
    name: string
    class: string
    language: string
    lowResThumbnail: string
    thumbnail: string
    likes: number
    views: number
}

export async function getMovies(
    page = 1,
    search?: string,
    classNumber?: string,
): Promise<GetMoviesResult> {
    const { body: movies } = await http.get<GetMoviesResult>('/v2/movies', {
        searchParams: {
            page,
            search,
            class: classNumber,
        },
    })

    return movies
}
