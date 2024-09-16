/* eslint-disable no-restricted-globals */
import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';

declare const self: ServiceWorkerGlobalScope;

clientsClaim();

// Precache all the assets generated during the build process
precacheAndRoute(self.__WB_MANIFEST);

// App shell: Cache all navigational requests
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  ({ request, url }: { request: Request; url: URL }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== 'navigate') {
      return false;
    }
    // If the URL has a file extension, skip.
    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    }
    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

// API caching strategy for offline support
registerRoute(
  ({ url }) => url.pathname.startsWith('/todos'),
  new NetworkFirst({
    cacheName: 'todos-api-cache',
    networkTimeoutSeconds: 10, // Try to fetch within 10 seconds
    plugins: [
      {
        cacheWillUpdate: async ({ response }) => {
          // Only cache successful (200) responses
          return response && response.status === 200 ? response : null;
        },
      },
    ],
  })
);

// Offline fallback strategy for other resources (CSS, JS, images)
registerRoute(
  ({ request }) => request.destination === 'style' ||
                   request.destination === 'script' ||
                   request.destination === 'image',
  new StaleWhileRevalidate({
    cacheName: 'assets-cache',
  })
);

// self.addEventListener('message', (event) => {
//   if (event.data && event.data.type === 'SKIP_WAITING') {
//     self.skipWaiting();
//   }
// });
