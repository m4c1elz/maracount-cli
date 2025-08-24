/*
    THIS CODE WAS AI GENERATED.
    Used to correctly size chart data based on desired width,
    as the asciichart library does not have an option to change
    chart width
*/
type Series = number[]
type MultiSeries = Series[]

function interpolateData(data: Series, targetLength: number): Series {
    const result: Series = []
    const step = (data.length - 1) / (targetLength - 1)

    for (let i = 0; i < targetLength; i++) {
        const pos = i * step
        const left = Math.floor(pos)
        const right = Math.ceil(pos)

        if (left === right) {
            result.push(data[left]!)
        } else {
            const weight = pos - left
            const value = data[left]! * (1 - weight) + data[right]! * weight
            result.push(value)
        }
    }

    return result
}

function trimData(data: Series, targetLength: number): Series {
    const result: Series = []
    const step = data.length / targetLength

    for (let i = 0; i < targetLength; i++) {
        const index = Math.floor(i * step)
        result.push(data[index]!)
    }

    return result
}

interface ChartDataResult {
    data: Series
    info: 'Original' | 'Interpolado' | 'Reduzido'
}

export function prepareChartData(
    data: Series,
    targetWidth: number,
): ChartDataResult {
    const length = data.length

    if (length === 0) {
        return { data: [], info: 'Original' }
    }

    if (length === targetWidth) {
        return { data, info: 'Original' }
    } else if (length < targetWidth) {
        return { data: interpolateData(data, targetWidth), info: 'Interpolado' }
    } else {
        return { data: trimData(data, targetWidth), info: 'Reduzido' }
    }
}

export function prepareChartDataMultiple(
    seriesList: MultiSeries,
    targetWidth: number,
): MultiSeries {
    return seriesList.map(series => {
        const length = series.length

        if (length === 0) {
            return Array(targetWidth).fill(0)
        }

        if (length === targetWidth) {
            return series
        } else if (length < targetWidth) {
            return interpolateData(series, targetWidth)
        } else {
            return trimData(series, targetWidth)
        }
    })
}
