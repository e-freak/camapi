import express from 'express';
import fs from 'fs';

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

        this._application.get('/api/close', (request, response) => {
            response.send("See you!!");
            this.close();
        });

        this._setupGetAPI('/api/:model/v1/photos', 'photos.json');
        this._setupGetAPI('/api/:model/v1/props', 'props.json');
    }

    _setupGetAPI(url, fileName) {
        this._application.get(url, (request, response) => {
            const sourceFilePath = `app/json/${request.params.model}/${fileName}`;
            fs.readFile(sourceFilePath, 'UTF-8', (error, json) => {
                response.json(JSON.parse(json));
            });
        });
    }

    _setupPutAPI(url, fileName) {
        this._application.put(url, (request, response) => {
            const sourceFilePath = path.join(this._rootDirPath, `app/json/${request.params.model}/${fileName}`);
            fs.readFile(sourceFilePath, 'UTF-8', (error, json) => {
                response.json(JSON.parse(json));
            });
        });
    }

}
