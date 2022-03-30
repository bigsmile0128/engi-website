import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { isDevEnv } from './utils';

Sentry.init({
  dsn: 'https://5d4976956f2341fcb8c719bcacb852a0@o1170825.ingest.sentry.io/6294237',
  integrations: [new BrowserTracing()],
  // range of 0.0 to 1.0 where 0.2 is 20% of transactions logged
  tracesSampleRate: 1.0,
  environment: isDevEnv() ? 'development' : 'production',
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
