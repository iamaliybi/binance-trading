import { registerRoute, setDefaultHandler } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst, NetworkOnly, NetworkFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching';

// * Cache vars
const PAGE_CACHE = 'pages-v1'
const ASSETS_CACHE = 'assets-v1';
const FONT_CACHE = 'fonts-v1';
const IMAGES_CACHE = 'images-v1';
const JSON_CACHE = 'json-v1';

// ! Cache page navigation
registerRoute(
	({ request }) => request.mode === 'navigate',
	new NetworkFirst({
		cacheName: PAGE_CACHE,
		plugins: [
			new CacheableResponsePlugin({
				statuses: [200],
			}),
		],
	}),
);

// ! Cache CSS, JS, and Web Worker requests
registerRoute(
	({ request }) =>
		request.destination === 'style' ||
		request.destination === 'script' ||
		request.destination === 'worker',
	new StaleWhileRevalidate({
		cacheName: ASSETS_CACHE,
		plugins: [
			new CacheableResponsePlugin({
				statuses: [200],
			}),
		],
	}),
);

// ! Cache fonts
registerRoute(
	({ event }) => event.request.destination === 'font',
	new StaleWhileRevalidate({
		cacheName: FONT_CACHE,
		plugins: [
			new ExpirationPlugin({
				maxEntries: 15,
			}),
		],
	})
);

// ! Cache json
registerRoute(
	({ event }) => event.request.destination === 'json',
	new StaleWhileRevalidate({
		cacheName: JSON_CACHE,
		plugins: [
			new ExpirationPlugin({
				maxEntries: 15,
			}),
		],
	})
);

// ! Cache images
registerRoute(
	({ request }) => request.destination === 'image',
	new CacheFirst({
		cacheName: IMAGES_CACHE,
		plugins: [
			new CacheableResponsePlugin({
				statuses: [200],
			}),
			new ExpirationPlugin({
				maxEntries: 50,
				maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
			}),
		],
	}),
);

// ! Ensure your build step is configured to include /offline.html as part of your precache manifest.
precacheAndRoute(self.__WB_MANIFEST);

// ! Catch routing errors, like if the user is offline
setDefaultHandler(new NetworkOnly());