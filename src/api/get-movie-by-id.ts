import { http } from '../lib/http'

export type GetMovieByIdResult = {
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

export async function getMovieById(id: string): Promise<GetMovieByIdResult> {
    const { body: movie } = await http.get<GetMovieByIdResult>(
        '/v2/movies/' + id,
    )

    return movie
}
