import React from 'react';
import "../src/assets/css/App.css"
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import App from "./App";
import {createRoot} from "react-dom/client";
import theme from "@/theme/theme";
import StreamClientProvider from "@/providers/StreamClientProvider";


const root = createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<ChakraProvider theme={theme}>
				<React.StrictMode>
					<ThemeEditorProvider>
						<Router>
							<StreamClientProvider>
								<App />
							</StreamClientProvider>
						</Router>
					</ThemeEditorProvider>
				</React.StrictMode>
			</ChakraProvider>
		</PersistGate>
	</Provider>
);

