import { EventEmitter } from '../event-emitter/EventEmitter';

interface Events {
  resize: (width: number, height: number) => void;
}

export class Sizes extends EventEmitter<Events> {
  private containerElement?: HTMLElement;

  width: number;

  height: number;

  constructor() {
    super();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.bindEvents();
  }

  private bindEvents = () => {
    window.addEventListener('resize', this.handleResize);
  };

  private unbindEvents = () => {
    window.removeEventListener('resize', this.handleResize);
  };

  init(containerElement: HTMLElement) {
    this.containerElement = containerElement;
    this.handleResize();
  }

  handleResize = () => {
    this.width = this.containerElement?.offsetWidth || window.innerWidth;
    this.height = this.containerElement?.offsetHeight || window.innerHeight;
    this.emit('resize', this.width, this.height);
  };

  destroy() {
    this.unbindEvents();
    this.clear();
  }
}
