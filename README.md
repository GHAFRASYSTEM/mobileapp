# GHAFRA Mobile App

The mobile app is an Expo SDK 54 application using React Native 0.81 and
Expo Router. The project is pinned to Expo `~54.0.33` in `package.json`; keep
all Expo packages on SDK 54-compatible versions.

## Important: OTA updates and dependencies

This app is configured for EAS Update:

- Updates URL: `https://u.expo.dev/ad5b2cab-1792-49b3-b6e9-77dac4878ce2`
- Runtime version policy: `appVersion`
- Channels: `development`, `preview`, and `production`
- EAS project ID: `ad5b2cab-1792-49b3-b6e9-77dac4878ce2`

JavaScript, TypeScript, and asset-only fixes can be delivered over the air.
Users should not reinstall the app or install new modules for an OTA update.
An OTA update must remain compatible with the native runtime already installed
on the device. Changes to native code, Expo SDK, native permissions, or native
dependencies require a new EAS build and store/internal distribution; they
cannot be safely solved by installing a package on a user's device.

**Do not add or install dependencies for this project as part of normal
development or an OTA release.** Use the existing `package-lock.json` and
Expo SDK 54 dependency set. If a native dependency change is genuinely
required, document it and create a new build instead of shipping it as OTA.

## Local setup (no dependency changes)

```bash
cd mobileapp
cp .env.example .env.local
# Set the public API and Supabase values.
npm ci
npx expo start
```

`npm ci` restores exactly the packages in `package-lock.json`; it does not
add packages. If the existing `node_modules` is already present, skip it and
run only `npx expo start`.

Useful commands:

```bash
npm run start
npm run web
npm run ios
npm run android
npm run lint
```

Use `npx expo start --clear` only when Metro's cache is stale. The app uses
Expo SDK 54, so do not run an upgrade command or install a different Expo
version.

## Environment

Expo automatically inlines `EXPO_PUBLIC_*` values. Copy `.env.example` to
`.env.local` and set:

- `EXPO_PUBLIC_API_URL`: backend base URL, without a trailing route
- `EXPO_PUBLIC_SUPABASE_URL`: Supabase project URL
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`: Supabase public anon/publishable key

These values are public application configuration. Never place Supabase
service keys, Firebase private keys, Stripe secret keys, or other server
credentials in the mobile environment.

## OTA release checklist

1. Make only JavaScript, TypeScript, or asset changes compatible with the
   installed native runtime.
2. Run `npm run lint` and test the affected flows.
3. Verify `appVersion` and the target EAS channel.
4. Publish through the existing EAS Update workflow; do not install modules
   on devices.
5. For any native change, stop and create a new EAS build instead.

