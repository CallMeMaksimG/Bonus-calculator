import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import './reset.scss';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
