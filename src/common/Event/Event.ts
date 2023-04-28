import EventEmitter from 'events'

interface publicEvent extends EventEmitter {
  on: (event: 'message', listener: (channel: string, message: number) => void) => this
  once: (event: 'message', listener: (channel: string, message: number) => void) => this

  onError: (event: 'error', cb: (error: Error) => void) => this
  onceError: (event: 'error', cb: (error: Error) => void) => this

  onReady: (event: 'ready', cb: (error: Error) => void) => this
  onceReady: (event: 'ready', cb: (error: Error) => void) => this
}

export default new EventEmitter()
