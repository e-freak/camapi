import express from 'express';
import multer from 'multer';

export default class CamServer {

    constructor() {
        this._app = express();
        this._uploader = this._createUploader();
        this._server = undefined;
    }

    async close() {
        if (this._server) {
            this._server.close();
            this._server = undefined;
        }
    }

    async start(host, port, onStarted = undefined) {
        this._initialize();
        this._server = this._app.listen(port, host, onStarted);
    }

    _createUploader() {
        const outputDirName = 'uploads';
        const storage = multer.diskStorage({
            destination: (request, file, callback) => callback(null, outputDirName),
            filename: (request, file, callback) => callback(null, file.originalname),
        });
        return multer({ dest: outputDirName, storage: storage });
    }
    
    _initialize() {
        const sendParam = { root: '.' };
        this._app.get('/', (request, response) => response.send("Hello, World."));
        this._app.get('/api/close', (request, response) => { response.send("See you."), this.close() });
        this._app.get('/api/:model/v1/photos', (request, response) => response.sendFile(`app/json/${request.params.model}/photos.json`, sendParam));
        this._app.get('/api/:model/v1/props', (request, response) => response.sendFile(`app/json/${request.params.model}/props.json`, sendParam));
        this._app.post('/api/upload', this._uploader.single('file'), (request, response) => response.send("Upload!!"));
    }

}
