import chalk from 'chalk'
import { getMovieById } from '../api/get-movie-by-id'
import { primaryColorText, secondaryColorText } from '../constants/colors'
import { spinner } from '../lib/spinner'
import { tryCatch } from '../lib/try-catch'

export async function viewAction(id: string) {
    spinner.start({ text: 'Pegando filmes...' })

    const [movie, error] = await tryCatch(getMovieById(id))

    if (error) {
        spinner.error({ text: error.message })
        return
    }

    spinner.stop().clear()

    console.log(
        primaryColorText(movie.name)
            .concat(' | ')
            .concat(secondaryColorText(`Turma ${movie.class}`))
            .concat(' | ')
            .concat(chalk.gray(`ID ${movie.id}`)),
    )
    console.log(
        chalk.bold(
            `👁  ${movie.views} Visualizações | 👍 ${movie.likes} Curtidas`,
        ),
    )
    console.log(`🔗 ${chalk.cyan(movie.link)}`)
    console.log()
}
