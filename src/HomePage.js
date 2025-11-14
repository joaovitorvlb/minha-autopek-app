// src/HomePage.js
import React from 'react';
import { useAuth } from './hooks/useAuth';

function HomePage() {
	const { user, logout } = useAuth();

	return (
		<div className="home-container">
			{/* O objeto 'user' vem do contexto de autenticação */}
			<h2>Bem-vindo, {user?.nome}!</h2>
			<p>Você está logado como: <strong>{user?.nivel_acesso_nome}</strong>.</p>
			<p>Seu e-mail: {user?.email}</p>

			<button onClick={logout} className="login-button" style={{ backgroundColor: '#dc3545' }}>
				Sair (Logout)
			</button>
		</div>
	);
}

export default HomePage;