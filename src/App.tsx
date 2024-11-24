import React, { FC, useEffect, useState } from 'react'
import './App.css'
import AuthProvider, { useAuth } from './providers/AuthProvider'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Sidebar from './components/Sidebar'
import CreateCertificate from './pages/CreateCertificate'
import SignUp from './pages/SignUp'
import OwnedCertificates from './pages/OwnedCertificates'
import RequestCertificate from './pages/RequestCertificates'

const AppRoutes: FC = ()  => {
  const { isAuthenticated, isBusinessAccount } = useAuth();

  return (
    <>
      { isAuthenticated ? (
        <div className='flex mx-auto'>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path='/certificates' element={<OwnedCertificates />} />
            {isBusinessAccount ? (
              <Route path="/create-certificate" element={<CreateCertificate />} />
            ) : (
              <Route path="/create-certificate" element={<Navigate to="/" />} />
            )}
            <Route path="/request-certificate" element={<RequestCertificate />} />
          </Routes>
        </div>
        
        ) :  
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
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
