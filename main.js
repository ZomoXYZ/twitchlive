"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const node_fetch_1 = __importDefault(require("node-fetch"));
require("dotenv/config");
const PORT = process.env.PORT || 80;
const SERVER = http_1.default.createServer(server).listen(PORT);
SERVER.on('listening', () => {
    let address = SERVER.address();
    if (address) {
        if (typeof address === 'object') {
            address = `${address.address}:${address.port}`;
        }
        console.log('listening on', address);
    }
});
function server(req, res) {
    const path = req.url || '/';
    const user = path.split('/').filter((l) => l)[0] || '';
    if (!user) {
        res.write('missing user');
        res.statusCode = 400;
        res.end();
        return;
    }
    userIsOnline(user)
        .then((online) => {
        if (online) {
            res.write('online');
            res.statusCode = 200;
        }
        else {
            res.write('offline');
            res.statusCode = 404;
        }
        res.end();
    })
        .catch((err) => {
        res.write(err.message);
        res.statusCode = 500;
        res.end();
    });
}
async function userIsOnline(user) {
    const url = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${user}-440x248.jpg`;
    const response = await (0, node_fetch_1.default)(url, { redirect: 'manual' });
    return response.status === 200;
}
