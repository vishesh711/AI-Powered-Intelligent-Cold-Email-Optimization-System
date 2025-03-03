import React from 'react';
import { Box, Heading, Button, Table, Thead, Tbody, Tr, Th, Td, Badge, IconButton, Menu, MenuButton, MenuList, MenuItem, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FiPlus, FiMoreVertical, FiSearch } from 'react-icons/fi';

const Prospects = () => {
  const prospects = [
    { id: 1, name: 'John Smith', company: 'Acme Inc.', position: 'CEO', email: 'john@acme.com', status: 'contacted' },
    { id: 2, name: 'Sarah Johnson', company: 'TechCorp', position: 'CTO', email: 'sarah@techcorp.com', status: 'qualified' },
    { id: 3, name: 'Michael Brown', company: 'Innovate LLC', position: 'VP Sales', email: 'michael@innovate.com', status: 'new' },
    { id: 4, name: 'Emily Davis', company: 'Global Systems', position: 'Director', email: 'emily@globalsys.com', status: 'responded' },
    { id: 5, name: 'Robert Wilson', company: 'Future Tech', position: 'Founder', email: 'robert@futuretech.com', status: 'new' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'blue';
      case 'contacted': return 'yellow';
      case 'responded': return 'green';
      case 'qualified': return 'purple';
      default: return 'gray';
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
        <Heading>Prospects</Heading>
        <Button leftIcon={<FiPlus />} colorScheme="blue">
          Add Prospect
        </Button>
      </Box>
      
      <InputGroup mb={6}>
        <InputLeftElement pointerEvents="none">
          <FiSearch color="gray.300" />
        </InputLeftElement>
        <Input placeholder="Search prospects..." />
      </InputGroup>
      
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Company</Th>
            <Th>Position</Th>
            <Th>Email</Th>
            <Th>Status</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {prospects.map((prospect) => (
            <Tr key={prospect.id}>
              <Td fontWeight="medium">{prospect.name}</Td>
              <Td>{prospect.company}</Td>
              <Td>{prospect.position}</Td>
              <Td>{prospect.email}</Td>
              <Td>
                <Badge colorScheme={getStatusColor(prospect.status)}>
                  {prospect.status}
                </Badge>
              </Td>
              <Td>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<FiMoreVertical />}
                    variant="ghost"
                  />
                  <MenuList>
                    <MenuItem>View Profile</MenuItem>
                    <MenuItem>Edit</MenuItem>
                    <MenuItem>Add to Campaign</MenuItem>
                    <MenuItem>Delete</MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Prospects; 