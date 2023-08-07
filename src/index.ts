import App from './app';

function init() {
    const app = new App({
        assetsPath: 'assets'
    });
    document.body.appendChild(app.view as HTMLCanvasElement);
}

init();
