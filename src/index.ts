import { App } from './components/App';
import './index.css';

const root: HTMLDivElement = document.querySelector('#root') as HTMLDivElement;
const app = new App();
console.log(app);
root.append(app.view as unknown as Node);

declare global {
  interface Window {
    __PIXI_APP__?: App;
  }
}

// @ts-ignore
globalThis.__PIXI_APP__ = app;
