const icons = {
 search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/>',
 menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
 chevron:'<path d="m9 5 7 7-7 7"/>',
 close:'<path d="m6 6 12 12M18 6 6 18"/>',
 heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.9-8.6a5.5 5.5 0 0 0-.1-7.8Z"/>',
 map:'<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3ZM9 3v15M15 6v15"/>',
 pin:'<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
 book:'<path d="M12 6c-4-3-8-3-10-2v15c3-1 7-1 10 2 3-3 7-3 10-2V4c-2-1-6-1-10 2ZM12 6v15"/>',
 building:'<path d="M3 9h18M5 10v9M10 10v9M14 10v9M19 10v9M2 21h20M12 2 2 7h20Z"/>',
 play:'<path d="m8 5 12 7-12 7Z"/>',
 globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-5 6-5 12 0 18M12 3c5 6 5 12 0 18"/>',
 check:'<path d="m5 12 4 4L19 6"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 download:'<path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/>'
};
const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.pin}</svg>`;
const logo = `<svg class="brand-symbol" viewBox="0 0 34 42" aria-hidden="true"><path fill="currentColor" stroke="none" d="M3 39V18a14 14 0 0 1 28 0v21h-7V19a7 7 0 0 0-14 0v20Z"/><path d="M17 1v5M7 6l3 3M27 6l-3 3"/></svg><span class="brand-name serif">tétouan<small>LA VILLE QUI SE RACONTE</small></span>`;
export { icon, logo };
