import React from 'react';
import { Box, Flex, Heading, Spacer, IconButton, useColorMode, Avatar, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { FiSun, FiMoon, FiBell } from 'react-icons/fi';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={4}
      bg={colorMode === 'light' ? 'white' : 'gray.800'}
      color={colorMode === 'light' ? 'gray.800' : 'white'}
      boxShadow="sm"
    >
      <Heading as="h1" size="lg">
        Cold Email AI
      </Heading>
      
      <Spacer />
      
      <Box>
        <IconButton
          mr={3}
          aria-label="Toggle color mode"
          icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
          onClick={toggleColorMode}
          variant="ghost"
        />
        
        <IconButton
          mr={3}
          aria-label="Notifications"
          icon={<FiBell />}
          variant="ghost"
        />
        
        <Menu>
          <MenuButton>
            <Avatar size="sm" name="User" src="https://bit.ly/broken-link" />
          </MenuButton>
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default Header; 