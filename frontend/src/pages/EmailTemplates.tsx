import React, { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  Flex,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
  Divider,
} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon, CopyIcon, ViewIcon } from '@chakra-ui/icons';

const EmailTemplates = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'Initial Outreach',
      description: 'First contact with prospects',
      subject: 'Quick question about {{company}}',
      performance: { open_rate: '42%', response_rate: '18%' },
      tags: ['outreach', 'initial'],
      created_at: '2023-05-15',
    },
    {
      id: 2,
      name: 'Follow-up #1',
      description: 'First follow-up after no response',
      subject: 'Following up on my previous email',
      performance: { open_rate: '38%', response_rate: '12%' },
      tags: ['follow-up'],
      created_at: '2023-05-20',
    },
    {
      id: 3,
      name: 'Product Demo Request',
      description: 'Request for product demonstration',
      subject: '{{product_name}} demo for {{company}}',
      performance: { open_rate: '45%', response_rate: '22%' },
      tags: ['demo', 'product'],
      created_at: '2023-06-01',
    },
  ]);

  const handleDuplicate = (templateId: number) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      const newTemplate = {
        ...template,
        id: Math.max(...templates.map(t => t.id)) + 1,
        name: `${template.name} (Copy)`,
        created_at: new Date().toISOString().split('T')[0],
      };
      setTemplates([...templates, newTemplate]);
      toast({
        title: 'Template duplicated',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Email Templates</Heading>
        <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={onOpen}>
          Create Template
        </Button>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {templates.map((template) => (
          <Card key={template.id}>
            <CardHeader>
              <Flex justify="space-between" align="center">
                <Heading size="md">{template.name}</Heading>
                <Flex>
                  <IconButton
                    aria-label="Edit template"
                    icon={<EditIcon />}
                    size="sm"
                    variant="ghost"
                    mr={1}
                  />
                  <IconButton
                    aria-label="Duplicate template"
                    icon={<CopyIcon />}
                    size="sm"
                    variant="ghost"
                    mr={1}
                    onClick={() => handleDuplicate(template.id)}
                  />
                  <IconButton
                    aria-label="Delete template"
                    icon={<DeleteIcon />}
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                  />
                </Flex>
              </Flex>
              <Text fontSize="sm" color="gray.500" mt={1}>
                Created: {template.created_at}
              </Text>
            </CardHeader>
            <CardBody>
              <Text fontSize="sm" fontWeight="bold" mb={1}>
                Subject:
              </Text>
              <Text fontSize="sm" mb={3}>
                {template.subject}
              </Text>
              <Text fontSize="sm" mb={2}>
                {template.description}
              </Text>
              <Flex mt={3} flexWrap="wrap">
                {template.tags.map((tag) => (
                  <Badge key={tag} mr={2} mb={2} colorScheme="blue">
                    {tag}
                  </Badge>
                ))}
              </Flex>
            </CardBody>
            <Divider />
            <CardFooter>
              <Flex width="100%" justify="space-between">
                <Box>
                  <Text fontSize="xs" fontWeight="bold">
                    Open Rate
                  </Text>
                  <Text fontSize="md" fontWeight="bold" color="green.500">
                    {template.performance.open_rate}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="xs" fontWeight="bold">
                    Response Rate
                  </Text>
                  <Text fontSize="md" fontWeight="bold" color="blue.500">
                    {template.performance.response_rate}
                  </Text>
                </Box>
                <Button
                  size="sm"
                  rightIcon={<ViewIcon />}
                  variant="outline"
                  colorScheme="blue"
                >
                  Preview
                </Button>
              </Flex>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Email Template</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs>
              <TabList>
                <Tab>Basic Info</Tab>
                <Tab>Content</Tab>
                <Tab>Personalization</Tab>
                <Tab>AI Assistance</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <FormControl isRequired mb={4}>
                    <FormLabel>Template Name</FormLabel>
                    <Input placeholder="e.g., Initial Outreach" />
                  </FormControl>
                  <FormControl isRequired mb={4}>
                    <FormLabel>Subject Line</FormLabel>
                    <Input placeholder="e.g., Quick question about {{company}}" />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Description</FormLabel>
                    <Textarea placeholder="Purpose and use case of this template" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Tags</FormLabel>
                    <Input placeholder="e.g., outreach, initial (comma separated)" />
                  </FormControl>
                </TabPanel>
                <TabPanel>
                  <FormControl isRequired>
                    <FormLabel>Email Body</FormLabel>
                    <Textarea
                      placeholder="Write your email content here..."
                      minHeight="300px"
                    />
                  </FormControl>
                </TabPanel>
                <TabPanel>
                  <Text mb={4}>
                    Add personalization variables to make your emails more relevant.
                  </Text>
                  <Text>Available variables:</Text>
                  <SimpleGrid columns={2} spacing={2} mt={2}>
                    <Badge colorScheme="blue" p={2} m={1}>
                      {'{{first_name}}'}
                    </Badge>
                    <Badge colorScheme="blue" p={2} m={1}>
                      {'{{last_name}}'}
                    </Badge>
                    <Badge colorScheme="blue" p={2} m={1}>
                      {'{{company}}'}
                    </Badge>
                    <Badge colorScheme="blue" p={2} m={1}>
                      {'{{job_title}}'}
                    </Badge>
                    <Badge colorScheme="blue" p={2} m={1}>
                      {'{{industry}}'}
                    </Badge>
                    <Badge colorScheme="blue" p={2} m={1}>
                      {'{{product_name}}'}
                    </Badge>
                  </SimpleGrid>
                </TabPanel>
                <TabPanel>
                  <Text mb={4}>
                    Use AI to help generate or improve your email content.
                  </Text>
                  <Button colorScheme="blue" mb={4}>
                    Generate Email Draft
                  </Button>
                  <Button colorScheme="green" mb={4} ml={2}>
                    Improve Current Draft
                  </Button>
                  <FormControl mt={4}>
                    <FormLabel>AI Instructions</FormLabel>
                    <Textarea
                      placeholder="Provide specific instructions for the AI..."
                      mb={2}
                    />
                  </FormControl>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save Template</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EmailTemplates; 