import { BASE_API_URL } from '../constants/api'

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
    const searchParams = new URLSearchParams()
    searchParams.set('page', page.toString())

    if (search) {
        searchParams.set('search', search)
    }

    if (classNumber) {
        searchParams.set('class', classNumber)
    }

    const url = BASE_API_URL.concat('/v2/movies?').concat(
        searchParams.toString(),
    )

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error('Houve um erro ao procurar os filmes!', {
            cause: response.statusText,
        })
    }

    const movies = (await response.json()) as GetMoviesResult
    return movies
}
