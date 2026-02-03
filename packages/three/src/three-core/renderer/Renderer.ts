import { WebGLRenderer } from 'three';

import type { Sizes } from '../sizes/Sizes';

export class Renderer {
  setting = {
    antialias: true,
    alpha: false,
    pixelRatio: Math.min(window.devicePixelRatio, 2),
  };

  private sizes: Sizes;

  instance: WebGLRenderer;

  constructor({ canvas, sizes }: { canvas: HTMLCanvasElement | OffscreenCanvas; sizes: Sizes }) {
    this.sizes = sizes;
    this.instance = new WebGLRenderer({
      canvas,
      antialias: this.setting.antialias,
      powerPreference: 'high-performance',
    });
    this.instance.setPixelRatio(this.setting.pixelRatio);
    this.bindEvent();
  }

  private bindEvent() {
    this.sizes.on('resize', this.handleResize);
  }

  private unbindEvent() {
    this.sizes.off('resize', this.handleResize);
  }

  private handleResize = (width: number, height: number) => {
    this.instance.setSize(width, height);
  };

  destroy() {
    this.unbindEvent();
    this.instance.dispose();
  }
}
