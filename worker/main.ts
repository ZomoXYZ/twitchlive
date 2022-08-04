import { handleRequest } from '../main/main';

addEventListener('fetch', (event) => {
    event.respondWith(
        server(event.request).catch((err) => {
            console.error('internal server error:', err);
            return new Response('internal server error', {
                status: 500,
                headers: { 'Content-Type': 'text/plain' },
            });
        })
    );
});

async function server(req: Request): Promise<Response> {
    const path = new URL(req.url).pathname;

    const response = await handleRequest(path, fetch);

    return new Response(response.body, {
        status: response.status,
        headers: { 'Content-Type': 'text/plain' },
    });
}
