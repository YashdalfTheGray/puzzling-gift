import { render, FunctionalComponent } from 'preact';

const App: FunctionalComponent<{}> = () => (
  <div>This is where the app will go</div>
)

document.querySelector('div#app-root')!.innerHTML = '';
render(<App />, document.querySelector('div#app-root')!);