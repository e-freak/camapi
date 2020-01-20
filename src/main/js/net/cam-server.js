import express from 'express';

export default class CamServer {

    constructor() {
        this._application = express();
        this._server = undefined;
    }

    async close(onClosed = undefined) {
        if (this._server) {
            this._server.close(onClosed);
            this._server = undefined;
        }
    }

    async start(host, port, onStarted = undefined) {
        this._initialize();
        this._server = this._application.listen(port, host, onStarted);
    }

    _initialize() {
        this._application.get('/', (request, response) => {
            response.send("Hello, World.");
        });
    }

}
