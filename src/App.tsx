import React, { FC } from 'react'
import './App.css'
import AuthProvider, { useAuth } from './providers/AuthProvider'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Sidebar from './components/Sidebar'
import CreateCertificate from './pages/CreateCertificate'

const AppRoutes: FC = ()  => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      { isAuthenticated ? (
        <div className='flex mx-auto'>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create-certificate" element={<CreateCertificate />} />
          </Routes>
        </div>
        
        ) :  
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
        }
    </>
  )
}

const App: FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  )
}

export default App
