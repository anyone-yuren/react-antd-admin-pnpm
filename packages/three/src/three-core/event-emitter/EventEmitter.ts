export class EventEmitter<Events extends Record<keyof Events, (...args: never[]) => unknown>> {
  private eventMap = new Map<keyof Events, Array<Events[keyof Events]>>();

  on<K extends keyof Events>(event: K, listener: Events[K]): void {
    if (!this.eventMap.has(event)) {
      this.eventMap.set(event, [] as Array<Events[K]>);
    }
    this.eventMap.get(event)!.push(listener);
  }

  emit<K extends keyof Events>(event: K, ...args: Parameters<Events[K]>): boolean {
    const listeners = this.eventMap.get(event);
    if (!listeners) return false;
    listeners.map((listener) => listener(...args));
    return true;
  }

  off<K extends keyof Events>(event: K, listener?: Events[K]): void {
    const listeners = this.eventMap.get(event);
    if (!listeners) return;

    if (listener) {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    } else {
      this.eventMap.delete(event);
    }
  }

  clear(): void {
    this.eventMap.clear();
  }

  once<K extends keyof Events>(event: K, listener: Events[K]): void {
    const onceListener = ((...args: Parameters<Events[K]>) => {
      const result = listener(...args);
      this.off(event, onceListener as Events[K]);
      return result;
    }) as Events[K];

    this.on(event, onceListener);
  }

  removeAllListeners<K extends keyof Events>(event?: K): void {
    if (event) {
      this.eventMap.delete(event);
    } else {
      this.eventMap.clear();
    }
  }
}
