/* eslint-disable max-len */
import React, { useState, useEffect } from 'react'
import { withAITracking } from '@microsoft/applicationinsights-react-js'
import { withRouter, useHistory, RouteComponentProps } from 'react-router-dom'
import { ai, getAppInsights } from './telemetryService'

interface Props extends RouteComponentProps {
  instrumentationKey: string
  children: JSX.Element
}

export const TelemetryProviderContext = React.createContext({
  appInsights: null,
})

const Telemetry = ({ instrumentationKey, children }: Props) => {
  const [initialized, setInitialized] = useState(false)
  const history = useHistory()

  const appInsights = getAppInsights()

  useEffect(() => {
    if (
      initialized === false &&
      Boolean(instrumentationKey) &&
      Boolean(history)
    ) {
      ai.initialize(instrumentationKey, history)
      setInitialized(true)
    }
  }, [instrumentationKey, initialized, history])

  return (
    <TelemetryProviderContext.Provider value={{ appInsights }}>
      {children}
    </TelemetryProviderContext.Provider>
  )
}
export const TelemetryProvider = withRouter(
  //@ts-ignore
  withAITracking(ai.reactPlugin, Telemetry),
)
