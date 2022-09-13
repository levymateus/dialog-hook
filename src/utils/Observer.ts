type Listener<T> = (data: T) => void;
type EventType = string;

export class Observer<T> {
  private listeners: Map<EventType, Array<Listener<T>>>;

  constructor () {
    this.listeners = new Map()
  }

  subscribe (type: EventType, observer: Listener<T>): void {
    if (this.listeners.get(type)) {
      if (this.listeners.get) this.listeners.get(type)?.push(observer)
    } else {
      this.listeners.set(type, [])
      this.listeners.get(type)?.push(observer)
    }
  }

  unsubscribe (type: EventType, observer: Listener<T>): void {
    const listeners = this.listeners.get(type)
    if (listeners) {
      this.listeners.set(
        type,
        listeners.filter((item) => item !== observer)
      )
    }
  }

  notify (type: EventType, data: T): void {
    const listeners = this.listeners.get(type)
    if (listeners) {
      listeners.forEach((fn) => fn(data))
    }
  }
}

export default new Observer()
