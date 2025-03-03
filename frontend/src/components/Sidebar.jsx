import React from 'react';
import { Box, VStack, Link, Icon, Text } from '@chakra-ui/react';
import { NavLink as RouterLink } from 'react-router-dom';
import { FiHome, FiMail, FiUsers, FiFileText, FiBarChart2, FiSettings } from 'react-icons/fi';

const NavItem = ({ icon, children, to }) => {
  return (
    <Link
      as={RouterLink}
      to={to}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      {({ isActive }) => (
        <Box
          display="flex"
          alignItems="center"
          py={3}
          px={4}
          borderRadius="md"
          bg={isActive ? 'blue.500' : 'transparent'}
          color={isActive ? 'white' : 'inherit'}
          _hover={{
            bg: isActive ? 'blue.600' : 'gray.100',
          }}
        >
          <Icon as={icon} mr={3} />
          <Text fontWeight="medium">{children}</Text>
        </Box>
      )}
    </Link>
  );
};

const Sidebar = () => {
  return (
    <Box
      as="nav"
      pos="sticky"
      top="0"
      h="calc(100vh - 60px)"
      pb={10}
      overflowX="hidden"
      overflowY="auto"
      bg="white"
      borderRight="1px"
      borderRightColor="gray.200"
      w={{ base: 'full', md: 60 }}
    >
      <VStack spacing={1} align="stretch" mt={5}>
        <NavItem icon={FiHome} to="/">
          Dashboard
        </NavItem>
        <NavItem icon={FiMail} to="/campaigns">
          Campaigns
        </NavItem>
        <NavItem icon={FiUsers} to="/prospects">
          Prospects
        </NavItem>
        <NavItem icon={FiFileText} to="/templates">
          Templates
        </NavItem>
        <NavItem icon={FiBarChart2} to="/analytics">
          Analytics
        </NavItem>
        <NavItem icon={FiSettings} to="/settings">
          Settings
        </NavItem>
      </VStack>
    </Box>
  );
};

export default Sidebar; 