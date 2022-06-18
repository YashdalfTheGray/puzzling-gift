import { render } from 'preact';
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
render(<ProvidedApp />, document.querySelector('div#app-root')!);
