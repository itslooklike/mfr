import React from 'react'
import ReactDOM from 'react-dom'
import App from '../app/App'

type WIDGETS = {
  headerHtml: string
}

declare global {
  interface Window {
    WIDGETS: WIDGETS
  }
}

const { headerHtml } = window.WIDGETS

const APP_NODE_ID = document.querySelector('#root')

ReactDOM.hydrate(<App headerHtml={headerHtml} />, APP_NODE_ID)
