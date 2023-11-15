import { SCREEN } from '../config/appConfig';

class Graphics {
  protected config;
  renderer: any;
  constructor() {
    this.config = {
      width: SCREEN.WIDTH,
      height: SCREEN.HEIGHT,
    };

    window.addEventListener('load', () => this.handleResize());
    window.addEventListener('resize', () => this.handleResize());
  }

  handleResize(): void {
    const { innerWidth, innerHeight } = window;

    const appRatio = SCREEN.WIDTH / SCREEN.HEIGHT;
    const screenRatio = innerWidth / innerHeight;

    let newWidth = innerWidth;
    let newHeight = innerHeight;

    if (screenRatio > appRatio) {
      newWidth = innerHeight * appRatio;
    } else {
      newHeight = innerWidth / appRatio;
    }

    const maxWidth = SCREEN.MAX_WIDTH;
    const maxHeight = SCREEN.MAX_HEIGHT;

    if (newWidth > maxWidth) {
      newWidth = maxWidth;
      newHeight = newWidth / appRatio;
    }

    if (newHeight > maxHeight) {
      newHeight = maxHeight;
      newWidth = newHeight * appRatio;
    }

    this.renderer.view.style.width = `${newWidth}px`;
    this.renderer.view.style.height = `${newHeight}px`;
  }

  getConfig() {
    return this.config;
  }
}

const GraphicsControlInstance = new Graphics();

export { GraphicsControlInstance as Graphics };
