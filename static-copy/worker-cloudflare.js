// https://paged.signalwerk.workers.dev/

export default {
  async fetch(request, env, ctx) {
    async function MethodNotAllowed(request) {
      return new Response(`Method ${request.method} not allowed.`, {
        status: 405,
        headers: {
          Allow: "GET",
        },
      });
    }
    // Only GET requests work with this proxy.
    if (request.method !== "GET") return MethodNotAllowed(request);

    const url = new URL(request.url);

    // set destination host
    url.hostname = "typography.japan.signalwerk.ch";

    // handler for adding script to head
    class ElementHandler {
      element(element) {
        element.append(
          `<script src="https://unpkg.com/pagedjs/dist/paged.polyfill.js" type="text/javascript"></script>`,
          { html: true }
        );
      }
    }

    const res = await fetch(url.toString(), request);

    const contentType = res.headers.get("Content-Type");

    // If the response is HTML, transformed with
    // HTMLRewriter -- otherwise, it should pass through
    if (contentType.startsWith("text/html")) {
      return new HTMLRewriter().on("head", new ElementHandler()).transform(res);
    } else {
      return res;
    }
  },
};
