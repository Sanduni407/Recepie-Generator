import React from 'react'
import './App.css'
import {BrowserRouter,Route,Routes, Navigate} from 'react-router-dom'
import { GoogleLogin } from './GoogleLogin'
import Dashboard from './Dashboard'
import PageNotFound from './PageNotFound'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Onboard from './pages/Onboard'
import RecipeGenerator from './components/RecipeGenerator'

const App = () => {

  const GoogleAuthWrapper = ()=>{
     return(
      <GoogleOAuthProvider clientId='537000555870-sk0145sk760mcmo9efam6nf6li4jc7dc.apps.googleusercontent.com'>
        <GoogleLogin></GoogleLogin>
      </GoogleOAuthProvider>
     )
  }
  return (
    <BrowserRouter>
       <Routes>
         <Route path='/login' element={<GoogleAuthWrapper/>} />
          <Route path='/' element={<Navigate to="/login"/>} />
           <Route path='/dashboard' element={<Dashboard/>} />

            <Route path='/onboarding' element={<Onboard/>} />
             <Route path='/generator' element={<RecipeGenerator/>} />
            
             
       </Routes>
    </BrowserRouter>
  )
}

export default App