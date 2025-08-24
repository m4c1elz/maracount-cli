import chalk from 'chalk'
import { getMovieById } from '../api/get-movie-by-id'
import { primaryColorText, secondaryColorText } from '../constants/colors'
import { spinner } from '../lib/spinner'
import { tryCatch } from '../lib/try-catch'
import { getMovieData } from '../api/get-movie-data'
import * as asciichart from 'asciichart'
import { prepareChartDataMultiple } from '../lib/prepare-chart-data'

type ViewActionOptions = {
    chart?: boolean
    from?: string
    to?: string
}

export async function viewAction(id: string, opts?: ViewActionOptions) {
    spinner.start({ text: 'Pegando filmes...' })

    const [movie, error] = await tryCatch(getMovieById(id))

    if (error) {
        spinner.error({ text: error.message })
        return
    }

    spinner.stop().clear()

    if (opts?.chart) {
        const [result, error] = await tryCatch(
            getMovieData(id, opts.from, opts.to),
        )

        if (error) {
            spinner.error({ text: error.message })
            return
        }

        createChartView(result, movie)
        return
    }

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

// function for generating likes/views chart
function createChartView(
    result: Awaited<ReturnType<typeof getMovieData>>,
    movie: Awaited<ReturnType<typeof getMovieById>>,
) {
    const views = result.data.map(d => d.views)
    const likes = result.data.map(d => d.likes)

    const width = process.stdout.columns - 20 || 50 // width based on terminal size
    const adjustedChartData = prepareChartDataMultiple([views, likes], width)

    console.log()

    console.log(
        '   ',
        primaryColorText(movie.name),
        '>',
        chalk.bold('Estatísticas ao longo do tempo'),
        '|',
        chalk.grey(),
    )
    console.log(
        '   ',
        asciichart.colored('██ Curtidas', asciichart.yellow),
        '|',
        asciichart.colored('██ Visualizações', asciichart.lightred),
    )
    console.log()

    const chart = asciichart.plot(adjustedChartData, {
        height: 5,
        colors: [asciichart.lightred, asciichart.yellow],
    })

    console.log(chart)
}
