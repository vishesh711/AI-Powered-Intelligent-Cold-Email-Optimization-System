import React from 'react';
import { Box, Heading, Button, Table, Thead, Tbody, Tr, Th, Td, Badge, IconButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { FiPlus, FiMoreVertical } from 'react-icons/fi';

const Campaigns = () => {
  const campaigns = [
    { id: 1, name: 'Q2 Outreach', status: 'active', sent: 450, opened: 213, replied: 45, created: '2023-04-01' },
    { id: 2, name: 'Product Demo Request', status: 'active', sent: 320, opened: 178, replied: 32, created: '2023-03-15' },
    { id: 3, name: 'Follow-up Campaign', status: 'paused', sent: 1200, opened: 540, replied: 98, created: '2023-02-20' },
    { id: 4, name: 'New Feature Announcement', status: 'draft', sent: 0, opened: 0, replied: 0, created: '2023-04-10' },
    { id: 5, name: 'Event Invitation', status: 'completed', sent: 850, opened: 412, replied: 76, created: '2023-01-05' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'green';
      case 'paused': return 'yellow';
      case 'draft': return 'blue';
      case 'completed': return 'gray';
      default: return 'gray';
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
        <Heading>Campaigns</Heading>
        <Button leftIcon={<FiPlus />} colorScheme="blue">
          New Campaign
        </Button>
      </Box>
      
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Status</Th>
            <Th isNumeric>Sent</Th>
            <Th isNumeric>Opened</Th>
            <Th isNumeric>Replied</Th>
            <Th>Created</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {campaigns.map((campaign) => (
            <Tr key={campaign.id}>
              <Td fontWeight="medium">{campaign.name}</Td>
              <Td>
                <Badge colorScheme={getStatusColor(campaign.status)}>
                  {campaign.status}
                </Badge>
              </Td>
              <Td isNumeric>{campaign.sent}</Td>
              <Td isNumeric>{campaign.opened}</Td>
              <Td isNumeric>{campaign.replied}</Td>
              <Td>{campaign.created}</Td>
              <Td>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<FiMoreVertical />}
                    variant="ghost"
                  />
                  <MenuList>
                    <MenuItem>Edit</MenuItem>
                    <MenuItem>Duplicate</MenuItem>
                    <MenuItem>Pause</MenuItem>
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

export default Campaigns; 