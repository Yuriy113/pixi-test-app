import { AnimatedSprite, Assets, Container } from 'pixi.js';

class Animation extends Container {
  saber;
  animate;
  constructor(x: number, y: number) {
    super();

    this.saber = Assets.get('saber');
    this.animate = new AnimatedSprite(this.saber.animations['saber']);
    this.animate.scale.set(0.5);
    this.animate.x = x;
    this.animate.y = y;

    this.animate.anchor.set(0.5, 0.5);
    this.addChild(this.animate);
  }
  play() {
    this.animate.play();
  }
  follow(pointerX: number, pointerY: number) {
    this.animate.x = pointerX;
    this.animate.y = pointerY;
  }
}

export { Animation };
