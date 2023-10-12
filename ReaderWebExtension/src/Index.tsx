import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { AlertProvider } from '@contexts/AlertContext';

const rootNode = document.getElementById('root');

if (rootNode) {
	createRoot(rootNode).render(
		<AlertProvider>
			<App />
		</AlertProvider>
	);
}
