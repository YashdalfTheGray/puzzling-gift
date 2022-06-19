// Can't use preact because https://github.com/parcel-bundler/parcel/issues/7867
// import { render } from 'preact';
import * as ReactDOM from 'react-dom';
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

document.querySelector('div#app-root')!.innerHTML = '';
ReactDOM.render(<ProvidedApp />, document.querySelector('div#app-root')!);
