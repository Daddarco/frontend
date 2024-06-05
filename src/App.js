import React from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

// page & layout imports
import Homepage from './pages/Homepage'
import DettagliPattern from './pages/DettagliPattern'
import ViewAmministratore from './pages/ViewAmministratore'
import ViewResponsabile from './pages/ViewResponsabile'
import SiteHeader from './components/SiteHeader'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Logout from './pages/Logout'
import { Protector } from './helpers'

//apollo client
const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache()
})

function App() {
  const location = useLocation();
  
  return (
    <ApolloProvider client={client}>
      <SiteHeader />
      <div className="App">
        <div className={`pattern-list ${location.pathname === '/' ? 'home' : ''}`}>
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route path="/dettagli/:id" element={<DettagliPattern />} />
            <Route path="/amministratore" element={<Protector Component={ViewAmministratore} />} />
            <Route path="/responsabile" element={<Protector Component={ViewResponsabile} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </ApolloProvider>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
