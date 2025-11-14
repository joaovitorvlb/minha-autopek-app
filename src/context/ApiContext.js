// src/context/ApiContext.js
import React, { createContext, useState, useEffect } from 'react';

const ApiContext = createContext();

// Chave para salvar no localStorage
const STORAGE_KEY = 'autopek_base_url';

export const ApiProvider = ({ children }) => {
	const [baseUrl, setBaseUrl] = useState(null);
	const [loading, setLoading] = useState(true);

	// Ao iniciar, tenta carregar a URL salva
	useEffect(() => {
		const savedUrl = localStorage.getItem(STORAGE_KEY);
		if (savedUrl) {
			setBaseUrl(savedUrl);
		}
		setLoading(false);
	}, []);

	// Função para salvar a nova URL
	const saveUrl = (newUrl) => {
		// Remove barra "/" no final, se houver, para evitar erros de URL duplicada
		const cleanedUrl = newUrl.endsWith('/') ? newUrl.slice(0, -1) : newUrl;

		localStorage.setItem(STORAGE_KEY, cleanedUrl);
		setBaseUrl(cleanedUrl);
	};

	const value = {
		baseUrl,
		saveUrl,
		loading, // Exporta o 'loading' para o App não renderizar antes de checar
	};

	return (
		<ApiContext.Provider value={value}>
			{!loading && children}
		</ApiContext.Provider>
	);
};

export default ApiContext;