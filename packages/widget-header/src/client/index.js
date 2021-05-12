import { hydrateApp } from '@mfr/builder/client'
import App from '../app/App.svelte'

const appId = __APP_ID__

hydrateApp(appId, App)
