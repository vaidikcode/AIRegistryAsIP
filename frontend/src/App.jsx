import { ChakraProvider, Box } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import RegisterAIAgent from './components/RegisterAIAgent'

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Box minH="100vh" bg="gray.50">
          <Box as="nav" bg="white" p={4} shadow="sm">
            <Link to="/" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#3182CE' }}>
              AI Registry as IP
            </Link>
          </Box>
          
          <Routes>
            <Route path="/" element={<RegisterAIAgent />} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  )
}

export default App
