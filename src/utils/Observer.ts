type Listener = (data: unknown) => void;
type EventType = string;

class Observer {
  private listeners: Map<EventType, Array<Listener>>;

  constructor () {
    this.listeners = new Map()
  }

  subscribe (type: EventType, observer: Listener) {
    if (this.listeners.get(type)) {
      if (this.listeners.get) this.listeners.get(type)?.push(observer)
    } else {
      this.listeners.set(type, [])
      this.listeners.get(type)?.push(observer)
    }
  }

  unsubscribe (type: EventType, observer: Listener) {
    const listeners = this.listeners.get(type)
    if (listeners) {
      this.listeners.set(
        type,
        listeners.filter((item) => item !== observer)
      )
    }
  }

  notify (type: EventType, data: unknown) {
    const listeners = this.listeners.get(type)
    if (listeners) {
      listeners.forEach((fn) => fn(data))
    }
  }
}

export default new Observer()
