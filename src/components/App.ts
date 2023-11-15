import { Application, Assets, FederatedPointerEvent, Sprite } from 'pixi.js';
import { Graphics } from '../controls/Graphics';
import { Loader } from './Loader/Loader';
import { Animation } from './Animation';
import { CONSTANTS } from '../config/appConfig';

class App extends Application {
  assets: any;
  image: any;
  loader: Loader;
  anim: Animation | undefined;
  constructor() {
    super(Graphics.getConfig());
    Graphics.renderer = this.renderer;
    this.loader = new Loader();
    this.setup();
  }

  async setup(): Promise<void> {
    await this.loader.loadAssets();
    this.addImage();
    this.anim = new Animation(this.image.width / 2, this.image.height / 2, this.ticker);
    this.stage.addChild(this.anim);
    this.anim.play();
  }

  async addImage(): Promise<void> {
    this.image = new Sprite(Assets.get('bg_image'));
    this.image.eventMode = 'static';
    this.image.cursor = 'pointer';
    this.image.on('pointertap', this.handleClick, this);
    this.stage.addChild(this.image);
  }

  handleClick = (e: FederatedPointerEvent) => {
    this.anim?.follow(e.globalX, e.globalY, CONSTANTS.VELOCITY);
  };
}

export { App };
