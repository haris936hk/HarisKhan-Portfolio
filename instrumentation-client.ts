// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://76d16e704a6a7e9b30775e56ebf364aa@o4509630179901440.ingest.de.sentry.io/4509630209261648",

  // Lean trace sampling in production to minimize client-side overhead
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.05 : 1.0,
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;