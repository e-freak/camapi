import CamServer from '@camapi/net/cam-server';

(() => {
    const host = process.env.HOST;
    const port = process.env.PORT;
    if (!host || !port) {
        console.log("illegal state. (.env is not found?)");
        return;
    }
    const server = new CamServer();
    server.start(host, port);
})();