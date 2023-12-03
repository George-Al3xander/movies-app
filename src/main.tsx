import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/scss/index.scss'
import App from './App'
import { HashRouter } from 'react-router-dom'
import CustomTheme from './components/CustomTheme'
import {
  QueryClient,
  QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <QueryClientProvider client={queryClient}>
    <CustomTheme>
    <App />
    </CustomTheme>
      </QueryClientProvider>
    </HashRouter>
  </React.StrictMode>,
)
