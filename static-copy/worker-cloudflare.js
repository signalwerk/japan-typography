// https://paged.signalwerk.workers.dev/?originHostname=typography.japan.signalwerk.ch

const COOKIE_NAME = "OriginHostname";
const HEADER_NAME = "x-origin-hostname";
const GET_NAME = "originHostname";

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

    // Initialize hostname with the default value
    let hostname = "signalwerk.ch";

    // Check for hostname in the request header
    const headerHostname = request.headers.get(HEADER_NAME);
    if (headerHostname) {
      hostname = headerHostname;
    } else {
      // If not found in header, check for a search parameter
      const searchParamsHostname = url.searchParams.get(GET_NAME);
      if (searchParamsHostname) {
        hostname = searchParamsHostname;
      } else {
        // If not found in search parameters, check for a cookie
        const cookieString = request.headers.get("Cookie");
        const cookies = cookieString
          ? Object.fromEntries(
              cookieString.split("; ").map((c) => c.split("="))
            )
          : {};
        const cookieHostname = cookies[COOKIE_NAME];
        if (cookieHostname) {
          hostname = cookieHostname;
        }
      }
    }

    // Set the destination host
    url.hostname = hostname;

    // Fetch the resource
    const res = await fetch(url.toString(), request);
    // Fetch the CSS content
    // const cssResponse = await fetch(
    //   "https://gitlab.coko.foundation/pagedjs/interface-polyfill/-/raw/master/interface.css?ref_type=heads"
    // );
    // const cssContent = await cssResponse.text();
    const cssContent = `LyogQ1NTIGZvciBQYWdlZC5qcyBpbnRlcmZhY2Ug4oCTIHYwLjQgKi8KCi8qIENoYW5nZSB0aGUgbG9vayAqLwo6cm9vdCB7CiAgICAtLWNvbG9yLWJhY2tncm91bmQ6IHdoaXRlc21va2U7CiAgICAtLWNvbG9yLXBhZ2VTaGVldDogI2NmY2ZjZjsKICAgIC0tY29sb3ItcGFnZUJveDogdmlvbGV0OwogICAgLS1jb2xvci1wYXBlcjogd2hpdGU7CiAgICAtLWNvbG9yLW1hcmdpbkJveDogdHJhbnNwYXJlbnQ7CiAgICAtLXBhZ2VkanMtY3JvcC1jb2xvcjogYmxhY2s7CiAgICAtLXBhZ2VkanMtY3JvcC1zaGFkb3c6IHdoaXRlOwogICAgLS1wYWdlZGpzLWNyb3Atc3Ryb2tlOiAxcHg7Cn0KCi8qIFRvIGRlZmluZSBob3cgdGhlIGJvb2sgbG9vayBvbiB0aGUgc2NyZWVuOiAqLwpAbWVkaWEgc2NyZWVuLCBwYWdlZGpzLWlnbm9yZSB7CiAgICBib2R5IHsKICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iYWNrZ3JvdW5kKTsKICAgIH0KCiAgICAucGFnZWRqc19wYWdlcyB7CiAgICAgICAgZGlzcGxheTogZmxleDsKICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1wYWdlZGpzLXdpZHRoKSAqIDIpOwogICAgICAgIGZsZXg6IDA7CiAgICAgICAgZmxleC13cmFwOiB3cmFwOwogICAgICAgIG1hcmdpbjogMCBhdXRvOwogICAgfQoKICAgIC5wYWdlZGpzX3BhZ2UgewogICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLXBhcGVyKTsKICAgICAgICBib3gtc2hhZG93OiAwIDAgMCAxcHggdmFyKC0tY29sb3ItcGFnZVNoZWV0KTsKICAgICAgICBtYXJnaW46IDA7CiAgICAgICAgZmxleC1zaHJpbms6IDA7CiAgICAgICAgZmxleC1ncm93OiAwOwogICAgICAgIG1hcmdpbi10b3A6IDEwbW07CiAgICB9CgogICAgLnBhZ2VkanNfZmlyc3RfcGFnZSB7CiAgICAgICAgbWFyZ2luLWxlZnQ6IHZhcigtLXBhZ2VkanMtd2lkdGgpOwogICAgfQoKICAgIC5wYWdlZGpzX3BhZ2U6bGFzdC1vZi10eXBlIHsKICAgICAgICBtYXJnaW4tYm90dG9tOiAxMG1tOwogICAgfQoKICAgIC5wYWdlZGpzX3BhZ2Vib3h7CiAgICAgICAgYm94LXNoYWRvdzogMCAwIDAgMXB4IHZhcigtLWNvbG9yLXBhZ2VCb3gpOwogICAgfQoKICAgIC5wYWdlZGpzX2xlZnRfcGFnZXsKICAgICAgICB6LWluZGV4OiAyMDsKICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1wYWdlZGpzLWJsZWVkLWxlZnQpICsgdmFyKC0tcGFnZWRqcy1wYWdlYm94LXdpZHRoKSkhaW1wb3J0YW50OwogICAgfQoKICAgIC5wYWdlZGpzX2xlZnRfcGFnZSAucGFnZWRqc19ibGVlZC1yaWdodCAucGFnZWRqc19tYXJrcy1jcm9wIHsKICAgICAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50OwogICAgfQogICAgCiAgICAucGFnZWRqc19sZWZ0X3BhZ2UgLnBhZ2VkanNfYmxlZWQtcmlnaHQgLnBhZ2VkanNfbWFya3MtbWlkZGxlewogICAgICAgIHdpZHRoOiAwOwogICAgfSAKCiAgICAucGFnZWRqc19yaWdodF9wYWdlewogICAgICAgIHotaW5kZXg6IDEwOwogICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsKICAgICAgICBsZWZ0OiBjYWxjKHZhcigtLXBhZ2VkanMtYmxlZWQtbGVmdCkqLTEpOwogICAgfQoKICAgIC8qIHNob3cgdGhlIG1hcmdpbi1ib3ggKi8KCiAgICAucGFnZWRqc19tYXJnaW4tdG9wLWxlZnQtY29ybmVyLWhvbGRlciwKICAgIC5wYWdlZGpzX21hcmdpbi10b3AsCiAgICAucGFnZWRqc19tYXJnaW4tdG9wLWxlZnQsCiAgICAucGFnZWRqc19tYXJnaW4tdG9wLWNlbnRlciwKICAgIC5wYWdlZGpzX21hcmdpbi10b3AtcmlnaHQsCiAgICAucGFnZWRqc19tYXJnaW4tdG9wLXJpZ2h0LWNvcm5lci1ob2xkZXIsCiAgICAucGFnZWRqc19tYXJnaW4tYm90dG9tLWxlZnQtY29ybmVyLWhvbGRlciwKICAgIC5wYWdlZGpzX21hcmdpbi1ib3R0b20sCiAgICAucGFnZWRqc19tYXJnaW4tYm90dG9tLWxlZnQsCiAgICAucGFnZWRqc19tYXJnaW4tYm90dG9tLWNlbnRlciwKICAgIC5wYWdlZGpzX21hcmdpbi1ib3R0b20tcmlnaHQsCiAgICAucGFnZWRqc19tYXJnaW4tYm90dG9tLXJpZ2h0LWNvcm5lci1ob2xkZXIsCiAgICAucGFnZWRqc19tYXJnaW4tcmlnaHQsCiAgICAucGFnZWRqc19tYXJnaW4tcmlnaHQtdG9wLAogICAgLnBhZ2VkanNfbWFyZ2luLXJpZ2h0LW1pZGRsZSwKICAgIC5wYWdlZGpzX21hcmdpbi1yaWdodC1ib3R0b20sCiAgICAucGFnZWRqc19tYXJnaW4tbGVmdCwKICAgIC5wYWdlZGpzX21hcmdpbi1sZWZ0LXRvcCwKICAgIC5wYWdlZGpzX21hcmdpbi1sZWZ0LW1pZGRsZSwKICAgIC5wYWdlZGpzX21hcmdpbi1sZWZ0LWJvdHRvbSB7CiAgICAgICAgYm94LXNoYWRvdzogMCAwIDAgMXB4IGluc2V0IHZhcigtLWNvbG9yLW1hcmdpbkJveCk7CiAgICB9CgogICAgLyogdW5jb21tZW50IHRoaXMgcGFydCBmb3IgcmVjdG8vdmVyc28gYm9vayA6IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqLwoKICAgIC8qCiAgICAucGFnZWRqc19wYWdlcyB7CiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsKICAgICAgICB3aWR0aDogMTAwJTsKICAgIH0KCiAgICAucGFnZWRqc19maXJzdF9wYWdlIHsKICAgICAgICBtYXJnaW4tbGVmdDogMDsKICAgIH0KCiAgICAucGFnZWRqc19wYWdlIHsKICAgICAgICBtYXJnaW46IDAgYXV0bzsKICAgICAgICBtYXJnaW4tdG9wOiAxMG1tOwogICAgfSAKCiAgICAucGFnZWRqc19sZWZ0X3BhZ2V7CiAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tcGFnZWRqcy1ibGVlZC1sZWZ0KSArIHZhcigtLXBhZ2VkanMtcGFnZWJveC13aWR0aCkgKyB2YXIoLS1wYWdlZGpzLWJsZWVkLWxlZnQpKSFpbXBvcnRhbnQ7CiAgICB9CgogICAgLnBhZ2VkanNfbGVmdF9wYWdlIC5wYWdlZGpzX2JsZWVkLXJpZ2h0IC5wYWdlZGpzX21hcmtzLWNyb3B7CiAgICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1wYWdlZGpzLWNyb3AtY29sb3IpOwogICAgfQoKICAgIC5wYWdlZGpzX2xlZnRfcGFnZSAucGFnZWRqc19ibGVlZC1yaWdodCAucGFnZWRqc19tYXJrcy1taWRkbGV7CiAgICAgICAgd2lkdGg6IHZhcigtLXBhZ2VkanMtY3Jvc3Mtc2l6ZSkhaW1wb3J0YW50OwogICAgfSAKCiAgICAucGFnZWRqc19yaWdodF9wYWdlewogICAgICAgIGxlZnQ6IDA7IAogICAgfSAKICAgICovCiAgICAKICAgIAoKICAgIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qLwoKCgogICAgLyogdW5jb21tZW50IHRoaXMgcGFyIHRvIHNlZSB0aGUgYmFzZWxpbmUgOiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi8KCiAgICAKICAgIC8qIC5wYWdlZGpzX3BhZ2Vib3ggewogICAgICAgIC0tcGFnZWRqcy1iYXNlbGluZTogMjJweDsKICAgICAgICAtLXBhZ2VkanMtYmFzZWxpbmUtcG9zaXRpb246IDVweDsKICAgICAgICAtLXBhZ2VkanMtYmFzZWxpbmUtY29sb3I6IGN5YW47CiAgICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRyYW5zcGFyZW50IDAlLCB0cmFuc3BhcmVudCBjYWxjKHZhcigtLXBhZ2VkanMtYmFzZWxpbmUpIC0gMXB4KSwgdmFyKC0tcGFnZWRqcy1iYXNlbGluZS1jb2xvcikgY2FsYyh2YXIoLS1wYWdlZGpzLWJhc2VsaW5lKSAtIDFweCksIHZhcigtLXBhZ2VkanMtYmFzZWxpbmUtY29sb3IpIHZhcigtLXBhZ2VkanMtYmFzZWxpbmUpKSwgdHJhbnNwYXJlbnQ7CiAgICAgICAgYmFja2dyb3VuZC1zaXplOiAxMDAlIHZhcigtLXBhZ2VkanMtYmFzZWxpbmUpOwogICAgICAgIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQteTsKICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uLXk6IHZhcigtLXBhZ2VkanMtYmFzZWxpbmUtcG9zaXRpb24pOwogICAgfSAgKi8KICAgCgogICAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovCn0KCgoKCgovKiBNYXJrcyAodG8gZGVsZXRlIHdoZW4gbWVyZ2UgaW4gcGFnZWQuanMpICovCgoucGFnZWRqc19tYXJrcy1jcm9wewogICAgei1pbmRleDogOTk5OTk5OTk5OTk5OwogIAp9CgoucGFnZWRqc19ibGVlZC10b3AgLnBhZ2VkanNfbWFya3MtY3JvcCwgCi5wYWdlZGpzX2JsZWVkLWJvdHRvbSAucGFnZWRqc19tYXJrcy1jcm9wewogICAgYm94LXNoYWRvdzogMXB4IDBweCAwcHggMHB4IHZhcigtLXBhZ2VkanMtY3JvcC1zaGFkb3cpOwp9ICAKCi5wYWdlZGpzX2JsZWVkLXRvcCAucGFnZWRqc19tYXJrcy1jcm9wOmxhc3QtY2hpbGQsCi5wYWdlZGpzX2JsZWVkLWJvdHRvbSAucGFnZWRqc19tYXJrcy1jcm9wOmxhc3QtY2hpbGR7CiAgICBib3gtc2hhZG93OiAtMXB4IDBweCAwcHggMHB4IHZhcigtLXBhZ2VkanMtY3JvcC1zaGFkb3cpOwp9ICAKCi5wYWdlZGpzX2JsZWVkLWxlZnQgLnBhZ2VkanNfbWFya3MtY3JvcCwKLnBhZ2VkanNfYmxlZWQtcmlnaHQgLnBhZ2VkanNfbWFya3MtY3JvcHsKICAgIGJveC1zaGFkb3c6IDBweCAxcHggMHB4IDBweCB2YXIoLS1wYWdlZGpzLWNyb3Atc2hhZG93KTsKfQoKLnBhZ2VkanNfYmxlZWQtbGVmdCAucGFnZWRqc19tYXJrcy1jcm9wOmxhc3QtY2hpbGQsCi5wYWdlZGpzX2JsZWVkLXJpZ2h0IC5wYWdlZGpzX21hcmtzLWNyb3A6bGFzdC1jaGlsZHsKICAgIGJveC1zaGFkb3c6IDBweCAtMXB4IDBweCAwcHggdmFyKC0tcGFnZWRqcy1jcm9wLXNoYWRvdyk7Cn0=`;

    // Handler for adding script to head
    class ElementHandler {
      element(element) {
        // Append CSS content
        element.append(
          `
<link rel="stylesheet" href="data:text/css;base64,${cssContent}" type="text/css"> 
<script src="https://unpkg.com/pagedjs/dist/paged.polyfill.js"></script>
<script>
  class MyHandler extends Paged.Handler {
    constructor(chunker, polisher, caller) {
      super(chunker, polisher, caller);
    }

    afterPreview(pages) {
      console.log("finished preview");
      console.log("start force reflow");
      setTimeout(() => {
        document.body.style.lineHeight = "0.2";
        setTimeout(() => {
          document.body.style.lineHeight = "";
          console.log("end force reflow");
        }, 50);
      }, 200);
    }
  }
  Paged.registerHandlers(MyHandler);
</script>
`,
          { html: true }
        );
      }
    }

    // Check the content type of the original response
    const contentType = res.headers.get("Content-Type");

    // Set the hostname in the cookie for the response
    const newHeaders = new Headers(res.headers);
    newHeaders.append(
      "Set-Cookie",
      `${COOKIE_NAME}=${hostname}; path=/; HttpOnly`
    );

    // Create a new response with the updated headers
    const newResponse = new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers: newHeaders,
    });

    // If the response is HTML, transform it with HTMLRewriter
    if (contentType && contentType.startsWith("text/html")) {
      return new HTMLRewriter()
        .on("head", new ElementHandler())
        .transform(newResponse);
    } else {
      return newResponse;
    }
  },
};
