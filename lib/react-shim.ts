import * as React from "react";

// Next.js 15 App Router uses an internal React 19 runtime where
// `__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED` was renamed to
// `__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE`.
// This provides backward-compatibility for libraries using the React 18 reconciler
// (such as @react-three/fiber v8 / react-reconciler v0.27).
const reactAny = React as any;
if (reactAny && !reactAny.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) {
  const clientInternals =
    reactAny.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  reactAny.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = {
    ReactCurrentOwner: clientInternals?.A ?? { current: null },
    ReactCurrentDispatcher: clientInternals?.H ?? { current: null },
    ReactCurrentBatchConfig: clientInternals?.T ?? { transition: null },
    ReactCurrentActQueue: clientInternals?.S ?? { current: null },
  };
}
