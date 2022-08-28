import { ApplicationInsights } from '@microsoft/applicationinsights-web'
import { ReactPlugin } from '@microsoft/applicationinsights-react-js'

let reactPlugin: any = null
let appInsights: any = null

type Initialize = (instrumentationKey: string, browserHistory: any) => void

export const INVALID_INSTRUMENTATION_KEY = '123'

const createTelemetryService = () => {
  const initialize: Initialize = (instrumentationKey, browserHistory) => {
    if (!browserHistory) {
      throw new Error('Could not initialize Telemetry Service')
    }

    if (!instrumentationKey) {
      throw new Error('Instrumentation key not provided')
    }

    reactPlugin = new ReactPlugin()

    appInsights = new ApplicationInsights({
      config: {
        instrumentationKey: instrumentationKey,
        // maxBatchInterval: 0,
        // disableFetchTracking: false,
        disableAjaxTracking: true,
        disableTelemetry: instrumentationKey === INVALID_INSTRUMENTATION_KEY,
        enableDebug: instrumentationKey === INVALID_INSTRUMENTATION_KEY,
        enableRequestHeaderTracking: true,
        extensions: [reactPlugin],
        extensionConfig: {
          [reactPlugin.identifier]: {
            history: browserHistory,
          },
        },
      },
    })

    appInsights.loadAppInsights()
  }

  return { reactPlugin, appInsights, initialize }
}

export const ai = createTelemetryService()
export const getAppInsights: () => any = () => appInsights
