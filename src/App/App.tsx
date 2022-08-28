import React from 'react'
import { ConfigProvider } from 'antd'
import ruLocale from 'antd/lib/locale/ru_RU'
import { Router } from 'react-router'
import { QueryClientProvider } from 'react-query'
import { Routing } from 'navigation'
import { TelemetryProvider } from '../TelemetryService'
import { INVALID_INSTRUMENTATION_KEY } from '../TelemetryService/telemetryService'
import { GlobalStyle } from './GlobalStyle'
import { _history } from './history'
import { LeaveDyrtyFormDialog } from './LeaveDyrtyFormDialog'
import { queryClient } from './query-client'

const instrumentationKey =
  process.env.NODE_ENV === 'development'
    ? undefined
    : process.env.REACT_APP_INSTRUMENTATION_KEY

const App: React.FC = () => (
  <ConfigProvider locale={ruLocale}>
    <QueryClientProvider client={queryClient}>
      <Router history={_history}>
        <GlobalStyle />
        <TelemetryProvider
          instrumentationKey={instrumentationKey || INVALID_INSTRUMENTATION_KEY}
        >
          <>
            <Routing />
            <LeaveDyrtyFormDialog />
          </>
        </TelemetryProvider>
      </Router>
    </QueryClientProvider>
  </ConfigProvider>
)

export { App }
