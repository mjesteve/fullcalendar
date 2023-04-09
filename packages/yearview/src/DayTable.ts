import { Seg, DaySeries, DateRange, DateMarker } from '@fullcalendar/core'
import moment from 'moment'

export interface DayTableSeg extends Seg {
    row: number
    firstCol: number
    lastCol: number
}

export interface DayTableCell {
    date: DateMarker
    htmlAttrs?: string
}

export default class DayTable {

    rowCnt: number
    colCnt: number
    cells: DayTableCell[][]
    headerDates: DateMarker[]

    private daySeries: DaySeries

    constructor(daySeries: DaySeries, breakOnWeeks: boolean) {
        this.rowCnt = 12
        this.colCnt = 31
        this.daySeries = daySeries
        this.cells = this.buildCells()
        this.headerDates = this.buildHeaderDates()
    }

    private buildCells() {
        let rows = []
        let cells = []

        for (let i = 0; i < this.daySeries.dates.length; i++) {
            cells.push(
                { date: this.daySeries.dates[i] }
            )
            if (this.daySeries.dates.length === (i + 1) || this.daySeries.dates[i + 1].getDate() === 1) {
                for (let padding = this.daySeries.dates[i].getDate(); padding < 31; padding++) {
                    cells.push({
                        date: null
                    })
                }
                rows.push(cells)
                cells = []
            }
        }
        return rows
    }

    private buildHeaderDates() {
        return []
    }

    sliceRange(range: DateRange): DayTableSeg[] {

        let firstDayRangeIni = moment(range.start).startOf('month'); console.log('firstDayRangeIni',firstDayRangeIni.toString());
        
        let { colCnt } = this
        console.log('colCnt', colCnt)
        let seriesSeg = this.daySeries.sliceRange(range)
        let segs: DayTableSeg[] = []

        if (seriesSeg) {
            let { firstIndex, lastIndex } = seriesSeg
            let index = firstIndex

            while (index <= lastIndex) {
                let row = Math.floor(index / colCnt)
                let nextIndex = Math.min((row + 1) * colCnt, lastIndex + 1)

                segs.push({
                row,
                firstCol: index % colCnt,
                lastCol: (nextIndex - 1) % colCnt,
                isStart: seriesSeg.isStart && index === firstIndex,
                isEnd: seriesSeg.isEnd && (nextIndex - 1) === lastIndex
                })

                index = nextIndex
            }
        }

        return segs
    }

}
