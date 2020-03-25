# SEEUS Mobile App

iOS & Android app for SEEUS (Student Eyes and Ears for University Safety)

Built using React Native.

Created for EMU CS Senior Capstone Project, Winter 2020.

[App Prototype on Figma](https://www.figma.com/proto/Ga4ApQ21rwnvLiL5mNWaiU/SEEUS-App?node-id=45%3A2&scaling=scale-down)

## Development

### Local Set Up

1. Install:
   - [NodeJS](https://nodejs.org/)
   - [yarn package manager](https://classic.yarnpkg.com/en/docs/install/)
   - [expo-cli](https://docs.expo.io/versions/latest/workflow/expo-cli/) (will be installed when you run `yarn start` below)
2. Clone repo

   `git clone git@github.com:seeus-dev/seeus-app.git`

3. `cd seeus-app`
4. `yarn install`
5. `yarn start` to start the dev server (Metro Bundler)

### React Native Dev Server (Metro Bundler)

The Metro Bundler runs the TypeScript compiler whenever the code changes. It also serves the code to developer devices connecting to it via the Expo mobile app, enabling hot swapping of modules as the code changes. (In other words, instant updates without losing current state of the app.)

**To run the app on your device:** Download the Expo mobile app ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US), [iOS](https://apps.apple.com/us/app/expo-client/id982107779)) and scan the QR code outputted in the console. In iOS you have to scan the QR code from the camera app.

### Linting/Formatting

To keep a consistent style, we are using ESLint and Prettier. To check your code for style errors, run `yarn lint` from project root. To auto-fix the linter errors run `yarn lint --fix`.
