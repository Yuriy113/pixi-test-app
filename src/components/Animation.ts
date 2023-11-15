import { AnimatedSprite, Assets, Container, Point, Ticker } from 'pixi.js';

class Animation extends Container {
  saber;
  animate;
  ticker: Ticker;
  constructor(x: number, y: number, ticker: Ticker) {
    super();
    this.ticker = ticker;
    this.saber = Assets.get('saber');
    this.animate = new AnimatedSprite(this.saber.animations['saber']);
    this.animate.scale.set(0.5);
    this.x = x;
    this.y = y;

    this.animate.anchor.set(0.5, 0.5);
    this.addChild(this.animate);
  }

  play(): void {
    this.animate.play();
  }

  follow(pointerX: number, pointerY: number, velocity: number): void {
    const katX = this.x - pointerX;
    const katY = this.y - pointerY;
    const hypot = Math.sqrt(katX ** 2 + katY ** 2);

    let distanceX = katX;
    let distanceY = katY;

    const speedX = (katX / hypot) * velocity;
    const speedY = (katY / hypot) * velocity;

    this.ticker.add((delta) => {
      if (!(Math.abs(distanceX) <= velocity && Math.abs(distanceY) <= velocity)) {
        this.x -= speedX * delta;
        this.y -= speedY * delta;
        distanceX = this.x - pointerX;
        distanceY = this.y - pointerY;
      }
    });
  }
}

export { Animation };
