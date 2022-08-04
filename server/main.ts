import { handleRequest } from '../main/main';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import 'dotenv/config';
import fetch from 'node-fetch';

const PORT = process.env.SERVER_PORT || 80;
const SERVER = createServer(server).listen(PORT);

SERVER.on('listening', () => {
    let address = SERVER.address();
    if (address) {
        if (typeof address === 'object') {
            address = `${address.address}:${address.port}`;
        }
        console.log('listening on', address);
    }
});

async function server(req: IncomingMessage, res: ServerResponse) {
    const path = req.url || '/';

    handleRequest(path, fetch)
        .then((response) => {
            res.statusCode = response.status;
            res.write(response.body);
            res.end();
        })
        .catch((err) => {
            res.statusCode = 500;
            res.write('internal server error');
            res.end();
        });
}
