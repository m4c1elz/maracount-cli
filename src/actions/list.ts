import chalk from 'chalk'
import { getMovies } from '../api/get-movies'
import { tryCatch } from '../lib/try-catch'
import { primaryColorText, secondaryColorText } from '../constants/colors'
import { spinner } from '../lib/spinner'

type ListOptions = {
    page?: string
    search?: string
    class?: string
}

export async function listAction(opts: ListOptions): Promise<void> {
    spinner.start({ text: 'Pegando filmes...' })

    const [result, error] = await tryCatch(
        getMovies(Number(opts.page || '1'), opts.search, opts.class),
    )

    if (error) {
        spinner.error({ text: 'Houve um erro ao pegar os filmes!' })
        console.log(error.cause)
        return
    }

    spinner.stop()
    spinner.clear()

    for (const movie of result.data) {
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
    console.log(
        chalk.bgGrey(
            `----- Página ${opts.page || 1} de ${result.totalPages} -----`,
        ),
    )
    console.log()
}
