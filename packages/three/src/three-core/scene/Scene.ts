import { Color, Scene as ThreeScene } from 'three';

export class Scene {
  setting = {
    bgColor: '#1a1a1a',
    backgroundType: 'color',
  };

  instance: ThreeScene;

  constructor() {
    this.instance = new ThreeScene();
    this.instance.background = new Color(this.setting.bgColor);
    this.instance.backgroundBlurriness = 1;
  }

  destroy() {
    this.instance.clear();
  }
}
