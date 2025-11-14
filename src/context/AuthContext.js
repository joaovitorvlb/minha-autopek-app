// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi'; // <-- IMPORTAR O NOVO HOOK

// 1. Criar o Contexto
const AuthContext = createContext();

// 2. Remover a API_URL daqui
// const API_URL = 'http://localhost:5000/api/auth'; <-- REMOVIDO

// 3. Criar o Provedor
export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	const { baseUrl } = useApi(); // <-- PEGAR A BASE URL DO NOSSO NOVO CONTEXTO

	// ... (o useEffect para carregar do localStorage continua igual) ...
	useEffect(() => {
		const savedUser = localStorage.getItem('autopek_user');
		const savedToken = localStorage.getItem('autopek_token');

		if (savedUser && savedToken) {
			setUser(JSON.parse(savedUser));
			setToken(savedToken);
		}
		setLoading(false);
	}, []);


	// 5. Função de Login (MODIFICADA)
	const login = async (email, senha) => {
		// Se a baseUrl ainda não foi configurada, não faz nada
		if (!baseUrl) {
			return { success: false, message: 'URL do servidor não configurada.' };
		}

		try {
			// Usa a baseUrl do contexto!
			const response = await fetch(`${baseUrl}/api/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, senha }),
			});
			// ... (resto da função igual) ...
			const data = await response.json();
			if (!response.ok || !data.success) {
				throw new Error(data.message || 'Credenciais inválidas');
			}
			setUser(data.usuario);
			setToken(data.token);
			localStorage.setItem('autopek_user', JSON.stringify(data.usuario));
			localStorage.setItem('autopek_token', data.token);
			navigate('/');
			return { success: true };
		} catch (err) {
			return { success: false, message: err.message };
		}
	};

	// 6. Função de Logout (MODIFICADA)
	const logout = () => {
		setUser(null);
		setToken(null);
		localStorage.removeItem('autopek_user');
		localStorage.removeItem('autopek_token');

		// Se quiséssemos chamar a API de logout:
		if (baseUrl && token) {
			fetch(`${baseUrl}/api/auth/logout`, {
				method: 'POST',
				headers: { 'Authorization': `Bearer ${token}` }
			});
		}

		navigate('/login');
	};

	// ... (o 'value' e o 'return' continuam iguais) ...
	const value = {
		user,
		token,
		login,
		logout,
		isAuthenticated: !!user,
		isAdmin: user?.nivel_acesso_nome === 'admin',
		isFuncionario: user?.nivel_acesso_nome === 'funcionario' || user?.nivel_acesso_nome === 'admin',
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

export default AuthContext;