import React from 'react';
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Prospects from './pages/Prospects';
import Campaigns from './pages/Campaigns';
import EmailTemplates from './pages/EmailTemplates';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Login from './pages/Login';

function App() {
  // Simple auth check - in a real app, use a proper auth system
  const isAuthenticated = localStorage.getItem('token') !== null;

  if (!isAuthenticated) {
    return (
      <ChakraProvider theme={theme}>
        <Login />
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box minH="100vh">
          <Navbar />
          <Grid templateColumns={{ base: '1fr', md: '250px 1fr' }}>
            <Sidebar />
            <Box p={8}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/prospects" element={<Prospects />} />
                <Route path="/campaigns" element={<Campaigns />} />
                <Route path="/templates" element={<EmailTemplates />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Box>
          </Grid>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App; 