import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/scss/App.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "linear-gradient(90deg, rgba(95,95,150,1) 0%, rgba(94,94,113,1) 34%, rgba(22,22,59,1) 100%);",
      },
    }),
  },
});


root.render(
  <React.StrictMode>
  <Provider store={store}>
  <ChakraProvider theme={theme}>
    <App />
    </ChakraProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
