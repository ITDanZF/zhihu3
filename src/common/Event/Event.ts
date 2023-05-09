import EventEmitter from 'events'

interface PublicEvent extends EventEmitter {
  on: (event: 'message', listener: (channel: string, message: string) => void) => this
  once: (event: 'message', listener: (channel: string, message: string) => void) => this

  onError: (event: 'error', cb: (error: Error) => void) => this
  onceError: (event: 'error', cb: (error: Error) => void) => this

  onReady: (event: 'ready', cb: (error: Error) => void) => this
  onceReady: (event: 'ready', cb: (error: Error) => void) => this
}

const eventEmitter = new EventEmitter()

export { PublicEvent, eventEmitter }
