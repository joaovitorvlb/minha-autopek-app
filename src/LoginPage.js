// src/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

function LoginPage() {
	const { login } = useAuth();
	const navigate = useNavigate();

	// Pré-preenche com dados de admin para teste fácil
	const [email, setEmail] = useState('admin@autopeck.com');
	const [senha, setSenha] = useState('admin123');
	const [error, setError] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(''); // Limpa erros anteriores

		try {
			const result = await login(email, senha);

			if (!result.success) {
				throw new Error(result.message || 'Credenciais inválidas');
			}

			// O login bem-sucedido é gerenciado pelo AuthContext
			// O navigate('/') já é feito dentro da função login

		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div className="login-container">
			<h2>AutoPek Login</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Senha</label>
					<input
						type="password"
						id="password"
						value={senha}
						onChange={(e) => setSenha(e.target.value)}
						required
					/>
				</div>
				<button type="submit" className="login-button">
					Entrar
				</button>
				{error && <p className="error-message">{error}</p>}
			</form>

			<button
				onClick={() => navigate('/config')}
				className="config-button"
				style={{
					marginTop: '20px',
					padding: '8px 12px',
					fontSize: '12px',
					backgroundColor: 'transparent',
					color: '#888',
					border: '1px solid #ddd',
					borderRadius: '4px',
					cursor: 'pointer',
					opacity: 0.6,
					transition: 'opacity 0.2s'
				}}
				onMouseEnter={(e) => e.target.style.opacity = '1'}
				onMouseLeave={(e) => e.target.style.opacity = '0.6'}
			>
				⚙️ Configurar Servidor
			</button>
		</div>
	);
}

export default LoginPage;