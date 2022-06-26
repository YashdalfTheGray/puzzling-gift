# puzzling-gift

A puzzle solver

## Setup

This project uses firebase to host the static files as well as firebase to store the puzzle data.

Once you create a new firebase project and pull down `firebase-tools` from NPM, run

```
firebase login
firebase init
```

These will authenticate with firebase as well as set up your project. Once you have the files building, you can run a `firebase deploy` to start the application up.

## Structure

This application has a fairly standard react/redux structure to it. Each major component lives under `src/components` and all of the redux machinery lives under `redux`. Additionally, this project uses `redux-sagas` and `react-redux` to handle the side effects and connect components and reducer state.

## Resources

- https://devjunhong.github.io/rust/backend_rust_rocket_react/
- https://actix.rs/
- https://rocket.rs/
- https://docs.rs/warp/latest/warp/
- https://docs.rs/tide/latest/tide/
