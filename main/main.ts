export interface LogicResponse {
    status: number;
    body: string;
}

export type FetchFn = (
    url: string,
    options?: { redirect: 'manual' }
) => Promise<{ status: number }>;

export async function handleRequest(
    path: string,
    fetch: FetchFn
): Promise<LogicResponse> {
    const user = path.split('/').filter((l) => l)[0] || '';

    if (!user) {
        return {
            status: 400,
            body: 'missing user',
        };
    }

    const online = await userIsOnline(user, fetch);

    if (online) {
        return {
            status: 200,
            body: 'online',
        };
    }

    return {
        status: 404,
        body: 'offline',
    };
}

async function userIsOnline(user: string, fetch: FetchFn): Promise<boolean> {
    const url = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${user}-440x248.jpg`;
    const response = await fetch(url, { redirect: 'manual' });
    return response.status === 200;
}
