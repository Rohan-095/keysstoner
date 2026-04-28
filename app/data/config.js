export const PHONE_DISPLAY  = "+1 250-317-1366";
export const PHONE_RAW      = "12503171366";
export const WA_DEFAULT_MSG = "Hi Keystoners, I'd like a free quote for exterior cleaning.";
export const buildWA = (msg) => `https://wa.me/${PHONE_RAW}?text=${encodeURIComponent(msg)}`;
