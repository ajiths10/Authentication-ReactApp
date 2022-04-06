import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import TokenContextProvider from './components/Context/TokenContextProvider';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TokenContextProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </TokenContextProvider>
);
