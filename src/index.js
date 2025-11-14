// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ApiProvider } from './context/ApiContext'; // <-- IMPORTAR
import { AuthProvider } from './context/AuthContext';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<ApiProvider> {/* <-- 1. Envelopar com API Provider */}
				<AuthProvider> {/* <-- 2. Envelopar com Auth Provider */}
					<App />
				</AuthProvider>
			</ApiProvider>
		</BrowserRouter>
	</React.StrictMode>
);