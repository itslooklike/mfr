import { hydrateApp } from '@mf/builder/client'
import App from '../app/App.svelte'

const appId = __APP_ID__

hydrateApp(appId, App)
