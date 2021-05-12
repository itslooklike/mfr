import * as BUS_EVENTS from './events'

const log = (msg: string, payload?: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`🚎 ${msg}`, payload)
  }
}

type ValueOf<T> = T[keyof T]

type TBusEvents = ValueOf<typeof BUS_EVENTS>

/**
 * ```js
 * import { Bus, TEXT_MESSAGE } from '@mfr/core'
 *
 * Bus.emit(TEXT_MESSAGE, { text: 'from bus' })
 * ```
 */
function emit<_, T>(eventName: TBusEvents, detail?: T) {
  const event = new CustomEvent(eventName, { detail })

  log(`${eventName} :`, detail || 'no payload')

  window.document.dispatchEvent(event)
}

/**
 * ```js
 * import { Bus, TEXT_MESSAGE } from '@mfr/core'
 *
 * Bus.on(TEXT_MESSAGE, (payload) => { console.log(payload) })
 * ```
 */
function on(eventName: TBusEvents, callback: (arg0?: any) => void): EventListener {
  const wrapper: EventListenerOrEventListenerObject = (evt) => {
    callback((evt as CustomEvent).detail)
  }

  window.document.addEventListener(eventName, wrapper)

  log(`subscribe on ${eventName}`)

  // INFO: нужен для отписки
  return wrapper
}

/**
 * ```js
 * import { Bus, TEXT_MESSAGE } from '@mfr/core'
 *
 * const callback = (payload) => { console.log(payload) }
 * const listener = Bus.on(TEXT_MESSAGE, callback)
 * Bus.off(TEXT_MESSAGE, listener)
 * ```
 */
function off(eventName: TBusEvents, listener: EventListenerOrEventListenerObject) {
  window.document.removeEventListener(eventName, listener)

  log(`UNsubscribe from ${eventName}`)
}

export const Bus = { emit, on, off }
