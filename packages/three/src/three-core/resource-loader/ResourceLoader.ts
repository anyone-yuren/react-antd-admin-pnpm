import { type BufferGeometry, type Object3D, Texture } from 'three';
import { DRACOLoader, FBXLoader, type GLTF, GLTFLoader } from 'three/examples/jsm/Addons.js';

import { EventEmitter } from '../event-emitter/EventEmitter';

interface LoaderMap {
  gltfLoader: GLTFLoader;
  fbxLoader: FBXLoader;
  dracoLoader: DRACOLoader;
}

export type ResourceData = BufferGeometry | Texture | Object3D | GLTF;

export interface Resource {
  name: string;
  source: string;
}

interface Loader {
  extensions: string[];
  action: (resource: Resource) => Promise<ResourceData>;
}

interface Events {
  fileLoadEnd: <T extends ResourceData>(resource: Resource, data: T) => void;
  end: () => void;
  progress: (progress: number) => void;
}

export class ResourceLoader extends EventEmitter<Events> {
  private loaders: Loader[];

  loaderMap: LoaderMap;

  loaded: number;

  loadCount: number;

  cache: Map<string, ResourceData> = new Map<string, ResourceData>();

  constructor() {
    super();
    this.loaderMap = {
      gltfLoader: new GLTFLoader(),
      fbxLoader: new FBXLoader(),
      dracoLoader: new DRACOLoader(),
    };
    this.loaders = [];
    this.loaded = 0;
    this.loadCount = 0;
    this.setLoaders();
  }

  private setLoaders() {
    this.createImageLoader();
    this.createDracoLoader();
    this.createGLTFLoader();
    this.createFBXLoader();
  }

  private createImageLoader() {
    this.loaders.push({
      extensions: ['jpg', 'png'],
      action: (resource) => {
        return new Promise((resolve, reject) => {
          const image = new Image();
          image.addEventListener('load', () => {
            const texture = new Texture(image);
            texture.needsUpdate = true;
            this.fileLoadEnd(resource, texture);
            resolve(texture);
          });

          image.addEventListener('error', () => {
            reject(new Error(`Failed to load image: ${resource.source}`));
          });

          image.src = resource.source;
        });
      },
    });
  }

  private createDracoLoader() {
    const { dracoLoader } = this.loaderMap;
    dracoLoader.setDecoderPath('draco/');
    dracoLoader.setDecoderConfig({ type: 'js' });

    this.loaders.push({
      extensions: ['drc'],
      action: (resource) => {
        return new Promise((resolve, reject) => {
          dracoLoader.load(
            resource.source,
            (data) => {
              this.fileLoadEnd(resource, data);
              dracoLoader.dispose();
              resolve(data);
            },
            undefined,
            (error) => {
              reject(error);
            },
          );
        });
      },
    });
  }

  private createGLTFLoader() {
    const { gltfLoader, dracoLoader } = this.loaderMap;

    dracoLoader.setDecoderPath('draco/');
    dracoLoader.setDecoderConfig({ type: 'js' });
    gltfLoader.setDRACOLoader(dracoLoader);

    this.loaders.push({
      extensions: ['glb', 'gltf'],
      action: (resource) => {
        return new Promise((resolve, reject) => {
          gltfLoader.load(
            resource.source,
            (data) => {
              this.fileLoadEnd(resource, data);
              resolve(data);
            },
            undefined,
            (error) => {
              reject(error);
            },
          );
        });
      },
    });
  }

  private createFBXLoader() {
    const { fbxLoader } = this.loaderMap;

    this.loaders.push({
      extensions: ['fbx'],
      action: (resource) => {
        return new Promise((resolve, reject) => {
          fbxLoader.load(
            resource.source,
            (data) => {
              this.fileLoadEnd(resource, data);
              resolve(data);
            },
            undefined,
            (error) => {
              reject(error);
            },
          );
        });
      },
    });
  }

  private fileLoadEnd(resource: Resource, data: ResourceData) {
    if (!this.cache.has(resource.name)) {
      this.cache.set(resource.name, data);
    }
    this.emit('progress', this.loaded / this.loadCount);
    this.emit('fileLoadEnd', resource, data);
    if (this.loaded === this.loadCount) {
      this.emit('end');
    }
  }

  /**
   * Load
   */
  load(resources: Resource[] = []) {
    for (const resource of resources) {
      this.loaded++;
      const extensionMatch = resource.source.match(/\.([a-z]+)$/);

      if (extensionMatch && typeof extensionMatch[1] !== 'undefined') {
        const extension = extensionMatch[1];
        const loader = this.loaders.find((loader) => loader.extensions.find((ext) => ext === extension));

        if (loader) {
          loader.action(resource);
        } else {
          console.warn(`Cannot found loader for ${resource}`);
        }
      } else {
        console.warn(`Cannot found extension of ${resource}`);
      }
    }
  }

  destroy() {
    // 清空加载器数组
    this.loaders = [];

    // 释放DRACOLoader资源
    this.loaderMap.dracoLoader.dispose();

    // 清空缓存
    this.cache.clear();

    // 重置计数器
    this.loaded = 0;
    this.loadCount = 0;

    // 取消所有事件监听器
    this.removeAllListeners();
  }
}
