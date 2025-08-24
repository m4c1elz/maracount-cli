import chalk from 'chalk'
import { getLeaderboard } from '../api/get-leaderboard'
import { primaryColorText, secondaryColorText } from '../constants/colors'
import { spinner } from '../lib/spinner'
import { tryCatch } from '../lib/try-catch'

type LeaderboardOptions = {
    search?: string
    class?: string
    sortBy?: string
}

export async function leaderboardAction(
    opts?: LeaderboardOptions,
): Promise<void> {
    spinner.start({ text: 'Pegando placar...' })

    const [leaderboard, error] = await tryCatch(
        getLeaderboard(opts?.search, opts?.class, opts?.sortBy),
    )

    if (error) {
        spinner.error(error.message)
        return
    }

    spinner.stop().clear()

    for (const movie of leaderboard) {
        console.log(
            chalk.bold(primaryColorText(String(movie.position).concat('.'))),
            chalk.bold(movie.name),
            '|',
            secondaryColorText(String(movie.likes).concat(' Curtidas')),
            '|',
            chalk.cyan(String(movie.views).concat(' Visualizações')),
        )
    }
}
