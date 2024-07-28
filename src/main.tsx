import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store.ts'
import Root from './routes/root.tsx'
import './index.css'
import Account from './routes/account.tsx'
import { AuthContextProvider } from './context/AuthContext.tsx'
import Protected from './components/Protected.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />
  },
  {
    path: '/account',
    element: <Protected><Account /></Protected>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </Provider>
  </React.StrictMode>,
)
