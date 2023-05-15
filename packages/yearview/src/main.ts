// import './main.scss'

import { createPlugin } from '@fullcalendar/core'
import DayGridView from './DayGridView'

export { default as SimpleDayGrid, DayGridSlicer } from './SimpleDayGrid'
export { default as DayGrid, DayGridSeg } from './DayGrid'
export { default as AbstractDayGridView } from './AbstractDayGridView'
export { default as DayGridView, buildDayTable as buildBasicDayTable } from './DayGridView'
export { default as DayBgRow } from './DayBgRow'
export { default as DayTable, DayTableSeg, DayTableCell } from './DayTable'

export default createPlugin({
  defaultView: 'year',
  views: {

    yearGrid: DayGridView,

    year: {
      type: 'yearGrid',
      duration: { years: 1 }
    }
  }
})
