import React from 'react';
import { Box, Heading, Button, SimpleGrid, Card, CardHeader, CardBody, CardFooter, Text, Badge, IconButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { FiPlus, FiMoreVertical } from 'react-icons/fi';

const Templates = () => {
  const templates = [
    { id: 1, name: 'Initial Outreach', description: 'First contact with new prospects', category: 'cold', usageCount: 450 },
    { id: 2, name: 'Follow-up #1', description: 'First follow-up after no response', category: 'follow-up', usageCount: 320 },
    { id: 3, name: 'Product Demo Request', description: 'Invitation to schedule a product demo', category: 'demo', usageCount: 215 },
    { id: 4, name: 'Case Study Share', description: 'Sharing relevant case study with prospect', category: 'nurture', usageCount: 178 },
    { id: 5, name: 'Re-engagement', description: 'Re-engaging with cold prospects', category: 'revival', usageCount: 95 },
    { id: 6, name: 'Meeting Confirmation', description: 'Confirming scheduled meetings', category: 'meeting', usageCount: 320 },
  ];

  const getCategoryColor = (category) => {
    switch (category) {
      case 'cold': return 'blue';
      case 'follow-up': return 'purple';
      case 'demo': return 'green';
      case 'nurture': return 'orange';
      case 'revival': return 'red';
      case 'meeting': return 'teal';
      default: return 'gray';
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
        <Heading>Email Templates</Heading>
        <Button leftIcon={<FiPlus />} colorScheme="blue">
          Create Template
        </Button>
      </Box>
      
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {templates.map((template) => (
          <Card key={template.id}>
            <CardHeader pb={0} display="flex" justifyContent="space-between" alignItems="center">
              <Heading size="md">{template.name}</Heading>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<FiMoreVertical />}
                  variant="ghost"
                  size="sm"
                />
                <MenuList>
                  <MenuItem>Edit</MenuItem>
                  <MenuItem>Duplicate</MenuItem>
                  <MenuItem>Preview</MenuItem>
                  <MenuItem>Delete</MenuItem>
                </MenuList>
              </Menu>
            </CardHeader>
            <CardBody>
              <Text>{template.description}</Text>
            </CardBody>
            <CardFooter pt={0} display="flex" justifyContent="space-between">
              <Badge colorScheme={getCategoryColor(template.category)}>
                {template.category}
              </Badge>
              <Text fontSize="sm" color="gray.500">
                Used {template.usageCount} times
              </Text>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Templates; 