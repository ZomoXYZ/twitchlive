"use strict";
(() => {
  // main/main.ts
  async function handleRequest(path, fetch2) {
    const user = path.split("/").filter((l) => l)[0] || "";
    if (!user) {
      return {
        status: 400,
        body: "missing user"
      };
    }
    const online = await userIsOnline(user, fetch2);
    if (online) {
      return {
        status: 200,
        body: "online"
      };
    }
    return {
      status: 404,
      body: "offline"
    };
  }
  async function userIsOnline(user, fetch2) {
    const url = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${user}-440x248.jpg`;
    const response = await fetch2(url, { redirect: "manual" });
    return response.status === 200;
  }

  // worker/main.ts
  addEventListener("fetch", (event) => {
    event.respondWith(
      server(event.request).catch((err) => {
        console.error("internal server error:", err);
        return new Response("internal server error", {
          status: 500,
          headers: { "Content-Type": "text/plain" }
        });
      })
    );
  });
  async function server(req) {
    const path = req.url || "/";
    const response = await handleRequest(path, fetch);
    return new Response(response.body, {
      status: response.status,
      headers: { "Content-Type": "text/plain" }
    });
  }
})();
