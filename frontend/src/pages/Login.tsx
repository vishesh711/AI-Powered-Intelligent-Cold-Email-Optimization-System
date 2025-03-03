import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useToast,
  Image,
  Flex,
} from '@chakra-ui/react';
import { FaGoogle, FaMicrosoft } from 'react-icons/fa';
import apiService from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real app, this would call your authentication API
      const response = await apiService.login(email, password);
      
      // Store the token
      localStorage.setItem('token', response.token);
      
      // Reload the page to trigger the auth check in App.tsx
      window.location.href = '/';
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Invalid email or password',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // For demo purposes, let's add a quick login function
  const handleDemoLogin = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Store a fake token
      localStorage.setItem('token', 'demo-token-12345');
      
      // Reload the page
      window.location.href = '/';
    }, 1000);
  };

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="8">
        <Stack spacing="6" align="center">
          <Flex justifyContent="center">
            <Image src="/logo.png" alt="Logo" fallbackSrc="https://via.placeholder.com/150x50?text=LOGO" />
          </Flex>
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={{ base: 'md', md: 'lg' }}>
              AI-Powered Cold Email Optimization System
            </Heading>
            <Text color="gray.500">
              Sign in to your account to continue
            </Text>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'transparent', sm: 'white' }}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <form onSubmit={handleLogin}>
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input 
                    id="password" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
              </Stack>
              <HStack justify="space-between">
                <Checkbox defaultChecked>Remember me</Checkbox>
                <Button variant="link" colorScheme="blue" size="sm">
                  Forgot password?
                </Button>
              </HStack>
              <Stack spacing="4">
                <Button type="submit" colorScheme="blue" isLoading={isLoading}>
                  Sign in
                </Button>
                <Button onClick={handleDemoLogin} variant="outline" isLoading={isLoading}>
                  Demo Login
                </Button>
                <HStack>
                  <Divider />
                  <Text fontSize="sm" color="gray.500">
                    OR
                  </Text>
                  <Divider />
                </HStack>
                <Button leftIcon={<FaGoogle />} variant="outline">
                  Continue with Google
                </Button>
                <Button leftIcon={<FaMicrosoft />} variant="outline">
                  Continue with Microsoft
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
        <Text textAlign="center" fontSize="sm" color="gray.500">
          Don't have an account? <Button variant="link" colorScheme="blue" size="sm">Sign up</Button>
        </Text>
      </Stack>
    </Container>
  );
};

export default Login; 