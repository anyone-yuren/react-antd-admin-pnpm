import { EventEmitter, Resource, ResourceData, ThreeApplication } from '@gbeata/three';
import { Box3, Color, Material, Mesh, MeshStandardMaterial, Raycaster, Vector2, Vector3 } from 'three';
import { GLTF } from 'three/examples/jsm/Addons';

interface RobotEvents {
  partSelect: (part: Mesh | null) => void;
}

export class Robot extends EventEmitter<RobotEvents> {
  private robotScene: GLTF['scene'] | null = null;
  private selectedPart: Mesh | null = null;
  private originalEmissive = new Color(0x000000);
  private originalOpacity = 1;
  private raycaster = new Raycaster();
  private mouse = new Vector2();

  constructor(private app: ThreeApplication) {
    super();
    this.bindEvents();
  }

  private onModelLoadEnd = (resource: Resource, data: ResourceData) => {
    if (resource.name === 'robot') {
      this.robotScene = data as GLTF['scene'];
      this.app.scene.instance.add(this.robotScene);

      const box = new Box3().setFromObject(this.robotScene);
      const center = box.getCenter(new Vector3());
      const size = box.getSize(new Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = this.app.camera.instance.fov * (Math.PI / 180);
      const cameraZ = maxDim / (2 * Math.tan(fov / 2));

      this.app.camera.instance.position.set(center.x, center.y, center.z + cameraZ);
      this.app.camera.instance.lookAt(center);
      this.app.camera.instance.far = maxDim * 10;
      this.app.camera.instance.updateProjectionMatrix();

      this.app.cameraControl.instance.target.copy(center);
    }
  };

  private onMouseDown = (event: MouseEvent) => {
    if (!this.robotScene) return;

    const canvas = this.app.renderer.instance.domElement;
    const rect = canvas.getBoundingClientRect();
    
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.app.camera.instance);
    const intersects = this.raycaster.intersectObjects(this.robotScene.children, true);

    if (intersects.length > 0) {
      const mesh = intersects[0].object as Mesh;
      this.selectPart(mesh);
    } else {
      this.deselectPart();
    }
  };

  private selectPart(mesh: Mesh) {
    if (this.selectedPart === mesh) return;

    this.deselectPart();

    this.selectedPart = mesh;
    
    if (mesh.material) {
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      materials.forEach((material: Material) => {
        if (this.isMeshStandardMaterial(material)) {
          this.originalEmissive = material.emissive.clone();
        }
        this.originalOpacity = material.transparent ? material.opacity : 1;
      });
      
      this.highlightPart(mesh);
    }

    this.emit('partSelect', mesh);
  }

  private isMeshStandardMaterial(material: Material): material is MeshStandardMaterial {
    return material.type === 'MeshStandardMaterial';
  }

  private highlightPart(mesh: Mesh) {
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    materials.forEach((material: Material) => {
      if (this.isMeshStandardMaterial(material)) {
        material.emissive = new Color(0x00ff00);
        material.emissiveIntensity = 0.3;
      }
    });
  }

  private unhighlightPart(mesh: Mesh) {
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    materials.forEach((material: Material) => {
      if (this.isMeshStandardMaterial(material)) {
        material.emissive = this.originalEmissive;
        material.emissiveIntensity = 0;
      }
    });
  }

  private deselectPart() {
    if (!this.selectedPart) return;

    if (this.selectedPart.material) {
      this.unhighlightPart(this.selectedPart);
    }

    this.selectedPart = null;
    this.emit('partSelect', null);
  }

  setPartScale(scale: number) {
    if (!this.selectedPart) return;
    this.selectedPart.scale.setScalar(scale);
  }

  setPartOpacity(opacity: number) {
    if (!this.selectedPart) return;
    const materials = Array.isArray(this.selectedPart.material) ? this.selectedPart.material : [this.selectedPart.material];
    
    materials.forEach((material: Material) => {
      material.transparent = true;
      material.opacity = opacity;
      material.depthWrite = opacity >= 1;
      material.needsUpdate = true;
    });
  }

  private bindEvents() {
    this.app.resourceLoader.on('fileLoadEnd', this.onModelLoadEnd);
    this.app.renderer.instance.domElement.addEventListener('mousedown', this.onMouseDown);
  }

  private unbindEvents() {
    this.app.resourceLoader.off('fileLoadEnd', this.onModelLoadEnd);
    this.app.renderer.instance.domElement.removeEventListener('mousedown', this.onMouseDown);
  }

  destroy() {
    this.unbindEvents();
    this.clear();
    this.app.destroy();
  }
}
