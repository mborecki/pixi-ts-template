import App from './app';

function init(container: HTMLCanvasElement) {
    const app = new App();

    container.appendChild(app.view);
}

export {
    init
}
