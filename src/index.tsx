// Can't use preact because https://github.com/parcel-bundler/parcel/issues/7867
// import { render } from 'preact';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { initFirebaseApp } from '~/src/firebase';
import store from '~/src/redux';
import App from '~/src/components/App';

initFirebaseApp();

const ProvidedApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

const appRoot = document.querySelector('div#app-root')!;
const root = createRoot(appRoot);
root.render(<ProvidedApp />);
