import { Assets } from 'pixi.js';
import { ASSETS_PATHS } from '../../config/assetsPaths';

class Loader {
  constructor() {}

  async loadAssets() {
    Assets.addBundle('assets', ASSETS_PATHS);
    return Assets.loadBundle('assets');
  }
}

export { Loader };
