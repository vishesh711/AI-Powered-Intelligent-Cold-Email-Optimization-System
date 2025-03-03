import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Sidebar>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/campaigns" element={<div>Campaigns Page</div>} />
            <Route path="/prospects" element={<div>Prospects Page</div>} />
            <Route path="/templates" element={<div>Templates Page</div>} />
            <Route path="/settings" element={<div>Settings Page</div>} />
          </Routes>
        </Sidebar>
      </Router>
    </ChakraProvider>
  );
}

export default App; 