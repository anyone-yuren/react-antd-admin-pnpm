import { EventEmitter } from '../event-emitter/EventEmitter';

interface Events {
  tick: (deltaTime: number) => void;
}

export class Ticker extends EventEmitter<Events> {
  private ticker: number;

  startTime: number;

  currentTime: number;

  elapsed: number;

  delta: number;

  constructor() {
    super();
    this.startTime = Date.now();
    this.currentTime = this.startTime;
    this.elapsed = 0;
    this.delta = 16;
    this.ticker = 0;
  }

  private tick = () => {
    this.ticker = window.requestAnimationFrame(this.tick);
    const current = Date.now();

    this.delta = current - this.currentTime;
    this.elapsed = current - this.startTime;
    this.currentTime = current;

    if (this.delta > 60) {
      this.delta = 60;
    }
    this.emit('tick', this.delta);
  };

  start = () => {
    this.tick();
  };

  stop = () => {
    cancelAnimationFrame(this.ticker);
  };

  destroy() {
    this.stop();
    this.clear();
  }
}
