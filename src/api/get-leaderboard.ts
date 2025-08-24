import { http } from '../lib/http'

export type GetLeaderboardResult = GetLeaderboardResultItem[]

export type GetLeaderboardResultItem = {
    id: number
    name: string
    class: string
    likes: number
    views: number
    position: number
}

export async function getLeaderboard(
    search?: string,
    classNumber?: string,
): Promise<GetLeaderboardResult> {
    const { body: leaderboard } = await http.get<GetLeaderboardResult>(
        '/v2/movies/leaderboard',
        {
            searchParams: {
                search,
                class: classNumber,
            },
        },
    )

    return leaderboard
}
