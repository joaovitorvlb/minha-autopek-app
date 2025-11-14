// src/components/ConfigPage.js
import React, { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { useNavigate } from 'react-router-dom';

function ConfigPage() {
	const [urlInput, setUrlInput] = useState('http://localhost:5000');
	const { saveUrl } = useApi();
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (urlInput) {
			saveUrl(urlInput);
			navigate('/login'); // Envia para o login após salvar
		}
	};

	return (
		<div className="login-container"> {/* Reutilizando o CSS do login */}
			<h2>Configurar Servidor</h2>
			<p>Insira a URL base da API AutoPek.</p>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="url">URL do Servidor</label>
					<input
						type="text"
						id="url"
						value={urlInput}
						onChange={(e) => setUrlInput(e.target.value)}
						placeholder="Ex: http://api.meuservidor.com"
						required
					/>
				</div>
				<button type="submit" className="login-button">
					Salvar e Continuar
				</button>
			</form>
		</div>
	);
}

export default ConfigPage;
