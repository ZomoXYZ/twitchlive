# twitchlive

intermediate http server to see if a twitch user is live

## example

```bash
curl --request GET \
  --url https://shy-truth-4c6b.zomodev.workers.dev/xqc
```

could return

- `200` online
- `404` offline
- `400` missing user

## folders

- main
  - main logic of the server
- server
  - run the logic as a node server, using the http module
- worker
  - run the logic as a cloudflare worker

## `.env` example

```env
SERVER_PORT=8080
```
