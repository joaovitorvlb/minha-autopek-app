// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

// Nossas páginas e componentes de rota
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import ConfigPage from './components/ConfigPage';
import ConfigGate from './components/ConfigGate';

// Rota de Login (continua igual)
const PublicLoginRoute = () => {
	const { isAuthenticated } = useAuth();
	return isAuthenticated ? <Navigate to="/" /> : <LoginPage />;
};

function App() {
	return (
		<Routes>
			{/* 1. Rota de Configuração. Ela NUNCA pode estar dentro do ConfigGate */}
			<Route path="/config" element={<ConfigPage />} />

			{/* 2. O resto da aplicação está "dentro" do ConfigGate */}
			<Route element={<ConfigGate />}>

				{/* Agora, todas as rotas abaixo só funcionam se a URL estiver configurada */}

				<Route path="/login" element={<PublicLoginRoute />} />

				<Route
					path="/"
					element={
						<ProtectedRoute>
							<HomePage />
						</ProtectedRoute>
					}
				/>

				{/* ... (aqui entrariam suas rotas /produtos, /funcionarios, etc.) ... */}
			</Route>

			{/* Redireciona qualquer outra rota. 
		O ConfigGate vai pegar esse '*' e decidir se vai para /config ou /login.
	  */}
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
}

export default App;