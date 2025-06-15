import { ChakraProvider, Box } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import RegisterAIAgent from './components/RegisterAIAgent'
import Dashboard from './components/Dashboard'
import Marketplace from './components/Marketplace'
import Services from './components/Services'
import Settings from './components/Settings'
import Footer from './components/Footer'

function App() {
  return (
    <> 
      <ChakraProvider>
        <Router>
          <Box minH="100vh" bg="gray.50">
            <Box as="nav" bg="linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)" p={4} shadow="sm">
              <Link to="/" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#3182CE' }}>
                AI Registry as IP...ts name so unblvly tuff twn :3....💔🥀
              </Link>
            </Box>
            
            <Routes>
              <Route path="/" element={<RegisterAIAgent />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/services" element={<Services />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Box>
        </Router>
      </ChakraProvider>
      <Footer />
    </>
  );
}

export default App
