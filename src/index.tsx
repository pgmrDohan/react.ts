import "the-new-css-reset/css/reset.css";
import '@/styles/colors.scss';
import '@/styles/spacings.scss';
import '@/styles/typo.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);