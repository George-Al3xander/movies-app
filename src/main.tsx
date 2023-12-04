import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { HashRouter } from 'react-router-dom'
import CustomTheme from './components/CustomTheme'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import { RecoilRoot } from 'recoil'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <RecoilRoot>
      <QueryClientProvider client={queryClient}>
    <CustomTheme>
    <App />
    </CustomTheme>
      </QueryClientProvider>
      </RecoilRoot>
    </HashRouter>
  </React.StrictMode>,
)
