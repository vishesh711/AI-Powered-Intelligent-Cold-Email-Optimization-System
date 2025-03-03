import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { SearchIcon, AddIcon, ChevronDownIcon, EditIcon, DeleteIcon, DownloadIcon } from '@chakra-ui/icons';
import ProspectSegmentation from '../components/ProspectSegmentation';
import apiService from '../services/api';

const Prospects = () => {
  const [prospects, setProspects] = useState<any[]>([]);
  const [segments, setSegments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchProspects();
  }, []);

  const fetchProspects = async () => {
    setLoading(true);
    try {
      const data = await apiService.getProspects();
      setProspects(data);
    } catch (error) {
      console.error('Error fetching prospects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSegmentationComplete = (newSegments: any[]) => {
    setSegments(newSegments);
  };

  const filteredProspects = prospects.filter(prospect => {
    const fullName = `${prospect.first_name} ${prospect.last_name}`.toLowerCase();
    const email = prospect.email.toLowerCase();
    const company = prospect.company?.name?.toLowerCase() || '';
    const query = searchQuery.toLowerCase();
    
    return fullName.includes(query) || email.includes(query) || company.includes(query);
  });

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Prospects</Heading>
        <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={onOpen}>
          Add Prospects
        </Button>
      </Flex>

      <Tabs variant="enclosed" colorScheme="blue">
        <TabList>
          <Tab>All Prospects</Tab>
          <Tab>Segments</Tab>
          <Tab>Segmentation Tool</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Flex mb={4}>
              <InputGroup maxW="400px">
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input 
                  placeholder="Search prospects..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </InputGroup>
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} ml={4}>
                  Actions
                </MenuButton>
                <MenuList>
                  <MenuItem icon={<DownloadIcon />}>Export CSV</MenuItem>
                  <MenuItem icon={<DeleteIcon />}>Delete Selected</MenuItem>
                </MenuList>
              </Menu>
            </Flex>

            <Box overflowX="auto">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Company</Th>
                    <Th>Job Title</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {loading ? (
                    <Tr>
                      <Td colSpan={5} textAlign="center">Loading prospects...</Td>
                    </Tr>
                  ) : filteredProspects.length === 0 ? (
                    <Tr>
                      <Td colSpan={5} textAlign="center">No prospects found</Td>
                    </Tr>
                  ) : (
                    filteredProspects.map((prospect) => (
                      <Tr key={prospect.id}>
                        <Td>{prospect.first_name} {prospect.last_name}</Td>
                        <Td>{prospect.email}</Td>
                        <Td>{prospect.company?.name || '-'}</Td>
                        <Td>{prospect.job_title || '-'}</Td>
                        <Td>
                          <IconButton
                            aria-label="Edit prospect"
                            icon={<EditIcon />}
                            size="sm"
                            mr={2}
                            variant="ghost"
                          />
                          <IconButton
                            aria-label="Delete prospect"
                            icon={<DeleteIcon />}
                            size="sm"
                            variant="ghost"
                            colorScheme="red"
                          />
                        </Td>
                      </Tr>
                    ))
                  )}
                </Tbody>
              </Table>
            </Box>
          </TabPanel>

          <TabPanel>
            {segments.length === 0 ? (
              <Box textAlign="center" py={10}>
                <Text mb={4}>No segments created yet. Use the Segmentation Tool to create segments.</Text>
                <Button colorScheme="blue" onClick={() => document.querySelector('[aria-controls="tabpanel-2"]')?.click()}>
                  Go to Segmentation Tool
                </Button>
              </Box>
            ) : (
              <Box>
                {segments.map((segment) => (
                  <Box key={segment.segment_id} p={4} mb={4} borderWidth={1} borderRadius="md">
                    <Heading size="md" mb={2}>{segment.name}</Heading>
                    <Text mb={2}>{segment.description}</Text>
                    <Badge colorScheme="blue">{segment.size} prospects</Badge>
                  </Box>
                ))}
              </Box>
            )}
          </TabPanel>

          <TabPanel>
            <ProspectSegmentation onSegmentationComplete={handleSegmentationComplete} />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Prospects</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs>
              <TabList>
                <Tab>Manual Entry</Tab>
                <Tab>CSV Upload</Tab>
                <Tab>CRM Import</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Text>Form for manual prospect entry would go here</Text>
                </TabPanel>
                <TabPanel>
                  <Text>CSV upload interface would go here</Text>
                </TabPanel>
                <TabPanel>
                  <Text>CRM integration options would go here</Text>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Prospects; 