import React from 'react'
import ReactDOM from 'react-dom'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import ruLocale from 'dayjs/locale/ru'
import utc from 'dayjs/plugin/utc'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import 'antd/dist/antd.css'
import { App } from './App/App'
import './models/init'

dayjs.extend(isBetween)
dayjs.extend(customParseFormat)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(utc)
dayjs.locale(ruLocale)

ReactDOM.render(<App />, document.getElementById('root'))
