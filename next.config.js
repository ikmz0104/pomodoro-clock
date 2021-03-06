const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: true,
  },
  env: {
    NEXT_PUBLIC_FIREBASE_KEY: process.env.FIREBASE_KEY,
    NEXT_PUBLIC_FIREBASE_DOMAIN: process.env.FIREBASE_DOMAIN,
    NEXT_PUBLIC_FIREBASE_DATABASE: process.env.FIREBASE_DATABASE,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_SENDER_ID: process.env.FIREBASE_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APPID: process.env.FIREBASE_APPID,
  },
});
