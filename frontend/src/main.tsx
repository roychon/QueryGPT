import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './context/authContext.tsx'
import { GoogleOAuthProvider } from "@react-oauth/google"

ReactDOM.createRoot(document.getElementById('root')!).render(
  // TODO: set this is env file
  <GoogleOAuthProvider clientId='187852203826-j9qfenp2tna39pbohcualpobpo0225dg.apps.googleusercontent.com'>
    <AuthProvider>
      <App />
    </AuthProvider>
  </GoogleOAuthProvider>
  // TODO: add React.StrictMode back in 
)
