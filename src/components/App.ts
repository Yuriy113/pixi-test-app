import { Application, Assets, Sprite } from 'pixi.js';
import { ASSETS_PATHS } from '../config/assetsPaths';
import { Graphics } from '../controls/Graphics';
import { Loader } from './Loader/Loader';

class App extends Application {
  assets: any;
  image: any;
  loader: Loader;
  constructor() {
    super(Graphics.getConfig());

    Graphics.renderer = this.renderer;
    this.loader = new Loader();

    this.setup();
  }

  async setup() {
    const assets = await this.loader.loadAssets();
    console.log(assets);
    this.addImage();
  }

  async addImage() {
    this.image = new Sprite(Assets.get('bg_image'));
    this.stage.addChild(this.image);
  }
}

export { App };
