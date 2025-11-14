// src/components/ConfigGate.js
import React from 'react';
import { useApi } from '../hooks/useApi';
import { Navigate, Outlet } from 'react-router-dom';

/*
  'Outlet' é um componente do React Router que renderiza 
  a rota "filha" da rota atual.
  No nosso App.js, tudo que estiver "dentro" do ConfigGate
  será renderizado pelo <Outlet />.
*/

const ConfigGate = () => {
	const { baseUrl } = useApi();

	// Se NÃO houver baseUrl, redireciona para a tela de configuração
	if (!baseUrl) {
		return <Navigate to="/config" />;
	}

	// Se houver, renderiza as rotas filhas (Login, Home, etc.)
	return <Outlet />;
};

export default ConfigGate;