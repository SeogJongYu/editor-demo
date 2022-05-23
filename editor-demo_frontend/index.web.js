import ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client';

import Root from './app/Root';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<Root />);
