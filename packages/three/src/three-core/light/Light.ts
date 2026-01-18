import { AmbientLight, DirectionalLight, Object3D } from 'three';

export class Light {
  setting = {
    ambientIntensity: 1,
    directionalIntensity: 3,
    directionalPosition: {
      x: -3,
      y: 2,
      z: -1,
    },
  };

  instance: Object3D;

  private ambientLight: AmbientLight;

  private directionalLight: DirectionalLight;

  constructor() {
    this.instance = new Object3D();
    this.ambientLight = new AmbientLight(0xffffff, this.setting.ambientIntensity);
    this.instance.add(this.ambientLight);

    this.directionalLight = new DirectionalLight(0xffffff, this.setting.directionalIntensity);
    this.directionalLight.castShadow = false;
    this.directionalLight.position.set(
      this.setting.directionalPosition.x,
      this.setting.directionalPosition.y,
      this.setting.directionalPosition.z,
    );
    this.instance.add(this.directionalLight);
  }
}
