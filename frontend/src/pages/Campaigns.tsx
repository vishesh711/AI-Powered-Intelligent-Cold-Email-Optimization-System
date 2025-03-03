import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Stack,
  Progress,
  useToast,
} from '@chakra-ui/react';
import { AddIcon, ChevronDownIcon, EditIcon, DeleteIcon, ViewIcon, PauseIcon, PlayIcon } from '@chakra-ui/icons';
import apiService from '../services/api';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const data = await apiService.getCampaigns();
      setCampaigns(data || []);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      toast({
        title: 'Error',
        description: 'Failed to load campaigns',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'green';
      case 'paused':
        return 'orange';
      case 'draft':
        return 'gray';
      case 'scheduled':
        return 'purple';
      case 'completed':
        return 'blue';
      default:
        return 'gray';
    }
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Campaigns</Heading>
        <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={onOpen}>
          Create Campaign
        </Button>
      </Flex>

      {loading ? (
        <Text>Loading campaigns...</Text>
      ) : campaigns.length === 0 ? (
        <Box textAlign="center" py={10}>
          <Heading size="md" mb={3}>No Campaigns Yet</Heading>
          <Text mb={6}>Create your first campaign to start reaching out to prospects.</Text>
          <Button colorScheme="blue" onClick={onOpen}>Create Campaign</Button>
        </Box>
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Status</Th>
              <Th>Prospects</Th>
              <Th>Progress</Th>
              <Th>Open Rate</Th>
              <Th>Response Rate</Th>
              <Th>Actions</Th>
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
                <Td>{campaign.total_prospects || 0}</Td>
                <Td>
                  <Box width="150px">
                    <Progress 
                      value={campaign.progress || 0} 
                      size="sm" 
                      colorScheme="blue" 
                      borderRadius="full"
                    />
                    <Text fontSize="xs" mt={1}>
                      {campaign.emails_sent || 0} / {campaign.total_prospects || 0} sent
                    </Text>
                  </Box>
                </Td>
                <Td>{campaign.open_rate || '0%'}</Td>
                <Td>{campaign.response_rate || '0%'}</Td>
                <Td>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="Options"
                      icon={<ChevronDownIcon />}
                      variant="outline"
                      size="sm"
                    />
                    <MenuList>
                      <MenuItem icon={<ViewIcon />}>View Details</MenuItem>
                      <MenuItem icon={<EditIcon />}>Edit</MenuItem>
                      {campaign.status === 'active' ? (
                        <MenuItem icon={<PauseIcon />}>Pause</MenuItem>
                      ) : campaign.status === 'paused' ? (
                        <MenuItem icon={<PlayIcon />}>Resume</MenuItem>
                      ) : null}
                      <MenuItem icon={<DeleteIcon />} color="red.500">Delete</MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Campaign</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs>
              <TabList>
                <Tab>Campaign Details</Tab>
                <Tab>Audience</Tab>
                <Tab>Content</Tab>
                <Tab>Settings</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Stack spacing={4}>
                    <FormControl isRequired>
                      <FormLabel>Campaign Name</FormLabel>
                      <Input placeholder="e.g., Q2 Product Launch" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Description</FormLabel>
                      <Textarea placeholder="Campaign purpose and goals" />
                    </FormControl>
                  </Stack>
                </TabPanel>
                <TabPanel>
                  <Text>Select segments or individual prospects for this campaign</Text>
                </TabPanel>
                <TabPanel>
                  <Text>Create or select email templates for this campaign</Text>
                </TabPanel>
                <TabPanel>
                  <Text>Configure campaign settings like timing, follow-ups, etc.</Text>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save Campaign</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Campaigns; 