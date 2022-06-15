import { render, FunctionalComponent } from 'preact';

import { initFirebaseApp } from '~/src/firebase';
import App from '~/src/components/App';

initFirebaseApp();

document.querySelector('div#app-root')!.innerHTML = '';
render(<App />, document.querySelector('div#app-root')!);
