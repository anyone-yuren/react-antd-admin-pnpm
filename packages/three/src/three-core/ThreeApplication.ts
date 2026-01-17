import Stats from 'three/examples/jsm/libs/stats.module.js';

import { Camera } from './camera/Camera';
import { CameraControl } from './camera/CameraControl';
import { Light } from './light/Light';
import { Renderer } from './renderer/Renderer';
import { ResourceLoader } from './resource-loader/ResourceLoader';
import { Scene } from './scene/Scene';
import { Sizes } from './sizes/Sizes';
import { Ticker } from './ticker/Ticker';

export class ThreeApplication {
  containerElement?: HTMLElement;

  canvas: HTMLCanvasElement;

  stats: Stats;

  sizes: Sizes;

  ticker: Ticker;

  resourceLoader: ResourceLoader;

  renderer: Renderer;

  camera: Camera;

  cameraControl: CameraControl;

  scene: Scene;

  light: Light;

  constructor() {
    this.canvas = document.createElement('canvas');

    this.stats = new Stats();

    this.sizes = new Sizes();

    this.ticker = new Ticker();

    this.resourceLoader = new ResourceLoader();

    this.renderer = new Renderer({ canvas: this.canvas, sizes: this.sizes });

    this.camera = new Camera({ sizes: this.sizes });

    this.cameraControl = new CameraControl({
      canvas: this.canvas,
      camera: this.camera.instance,
    });

    this.scene = new Scene();

    this.light = new Light();

    this.scene.instance.add(this.light.instance);

    this.bindEvent();
  }

  private bindEvent() {
    this.ticker.on('tick', this.handleTick);
  }

  private unbindEvent() {
    this.ticker.off('tick', this.handleTick);
  }

  private handleTick = () => {
    this.renderer.instance.render(this.scene.instance, this.camera.instance);
    this.stats.update();
  };

  public init(containerElement: HTMLElement) {
    this.containerElement = containerElement;
    this.containerElement.appendChild(this.canvas);

    this.sizes.init(this.containerElement);

    this.containerElement.appendChild(this.stats.dom);
    this.stats.dom.style.position = 'absolute';
    this.stats.dom.style.top = '2px';
    this.stats.dom.style.left = '2px';

    this.ticker.start();
  }

  public destroy() {
    this.unbindEvent();
    this.ticker.destroy();

    this.sizes.destroy();

    this.renderer.destroy();
    this.camera.destroy();
    this.scene.destroy();

    this.canvas.remove();
    this.stats.dom.remove();

    this.containerElement = undefined;
  }
}
