export const PHONE_DISPLAY           = "+1 250-317-1366";
export const PHONE_RAW              = "12503171366";
export const BUSINESS_EMAIL         = "info@keystonecleaner.com";
export const BUSINESS_EMAIL_ADMIN   = "admin@keystonecleaner.com";
export const BUSINESS_EMAIL_SUPPORT = "support@keystonecleaner.com";
export const BUSINESS_ADDRESS       = "Lower Mainland & Islands, BC";
export const SITE_URL               = "https://www.keystonecleaner.com";
export const WA_DEFAULT_MSG         = "Hi Keystone Cleaner, I'd like to get a free quote";
export const buildWA = (msg) => `https://wa.me/${PHONE_RAW}?text=${encodeURIComponent(msg)}`;
