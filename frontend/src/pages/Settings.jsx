import React from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
  Divider,
  Switch,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
  Card,
  CardBody,
} from '@chakra-ui/react';

const Settings = () => {
  const toast = useToast();

  const handleSave = () => {
    toast({
      title: 'Settings saved',
      description: 'Your settings have been updated successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box>
      <Heading mb={6}>Settings</Heading>
      
      <Tabs>
        <TabList>
          <Tab>Account</Tab>
          <Tab>Email</Tab>
          <Tab>Integrations</Tab>
          <Tab>AI Settings</Tab>
          <Tab>Notifications</Tab>
        </TabList>
        
        <TabPanels>
          <TabPanel>
            <Card mb={6}>
              <CardBody>
                <Heading size="md" mb={4}>Profile Information</Heading>
                <VStack spacing={4} align="start">
                  <HStack width="100%" spacing={6}>
                    <FormControl>
                      <FormLabel>First Name</FormLabel>
                      <Input defaultValue="Admin" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Last Name</FormLabel>
                      <Input defaultValue="User" />
                    </FormControl>
                  </HStack>
                  <FormControl>
                    <FormLabel>Email Address</FormLabel>
                    <Input defaultValue="admin@example.com" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Company</FormLabel>
                    <Input defaultValue="Example Corp" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Job Title</FormLabel>
                    <Input defaultValue="Marketing Manager" />
                  </FormControl>
                </VStack>
              </CardBody>
            </Card>
            
            <Card mb={6}>
              <CardBody>
                <Heading size="md" mb={4}>Change Password</Heading>
                <VStack spacing={4} align="start">
                  <FormControl>
                    <FormLabel>Current Password</FormLabel>
                    <Input type="password" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>New Password</FormLabel>
                    <Input type="password" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Confirm New Password</FormLabel>
                    <Input type="password" />
                  </FormControl>
                </VStack>
              </CardBody>
            </Card>
            
            <Button colorScheme="blue" onClick={handleSave}>Save Changes</Button>
          </TabPanel>
          
          <TabPanel>
            <Card mb={6}>
              <CardBody>
                <Heading size="md" mb={4}>Email Settings</Heading>
                <VStack spacing={4} align="start">
                  <FormControl>
                    <FormLabel>From Name</FormLabel>
                    <Input defaultValue="Admin User" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>From Email</FormLabel>
                    <Input defaultValue="admin@example.com" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Reply-To Email</FormLabel>
                    <Input defaultValue="admin@example.com" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Email Signature</FormLabel>
                    <Input defaultValue="Best regards, Admin User" />
                  </FormControl>
                </VStack>
              </CardBody>
            </Card>
            
            <Card mb={6}>
              <CardBody>
                <Heading size="md" mb={4}>SMTP Settings</Heading>
                <VStack spacing={4} align="start">
                  <FormControl>
                    <FormLabel>SMTP Host</FormLabel>
                    <Input defaultValue="smtp.example.com" />
                  </FormControl>
                  <HStack width="100%" spacing={6}>
                    <FormControl>
                      <FormLabel>SMTP Port</FormLabel>
                      <Input defaultValue="587" />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Encryption</FormLabel>
                      <Input defaultValue="TLS" />
                    </FormControl>
                  </HStack>
                  <FormControl>
                    <FormLabel>SMTP Username</FormLabel>
                    <Input defaultValue="smtp_user" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>SMTP Password</FormLabel>
                    <Input type="password" defaultValue="password" />
                  </FormControl>
                </VStack>
              </CardBody>
            </Card>
            
            <Button colorScheme="blue" onClick={handleSave}>Save Changes</Button>
          </TabPanel>
          
          <TabPanel>
            <Card mb={6}>
              <CardBody>
                <Heading size="md" mb={4}>Connected Services</Heading>
                <VStack spacing={4} align="start" width="100%">
                  <HStack justifyContent="space-between" width="100%">
                    <Box>
                      <Text fontWeight="bold">Google</Text>
                      <Text fontSize="sm" color="gray.500">Connect your Google account for calendar integration</Text>
                    </Box>
                    <Button colorScheme="blue">Connect</Button>
                  </HStack>
                  <Divider />
                  <HStack justifyContent="space-between" width="100%">
                    <Box>
                      <Text fontWeight="bold">LinkedIn</Text>
                      <Text fontSize="sm" color="gray.500">Connect to import contacts and share updates</Text>
                    </Box>
                    <Button colorScheme="blue">Connect</Button>
                  </HStack>
                  <Divider />
                  <HStack justifyContent="space-between" width="100%">
                    <Box>
                      <Text fontWeight="bold">Salesforce</Text>
                      <Text fontSize="sm" color="gray.500">Sync prospects and campaign data with Salesforce</Text>
                    </Box>
                    <Button colorScheme="blue">Connect</Button>
                  </HStack>
                  <Divider />
                  <HStack justifyContent="space-between" width="100%">
                    <Box>
                      <Text fontWeight="bold">HubSpot</Text>
                      <Text fontSize="sm" color="gray.500">Integrate with your HubSpot CRM</Text>
                    </Box>
                    <Button colorScheme="blue">Connect</Button>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>
            
            <Card mb={6}>
              <CardBody>
                <Heading size="md" mb={4}>API Keys</Heading>
                <VStack spacing={4} align="start">
                  <FormControl>
                    <FormLabel>API Key</FormLabel>
                    <Input defaultValue="sk_test_123456789abcdefghijklmnopqrstuvwxyz" isReadOnly />
                  </FormControl>
                  <Button colorScheme="blue" size="sm">Generate New API Key</Button>
                </VStack>
              </CardBody>
            </Card>
          </TabPanel>
          
          <TabPanel>
            <Card mb={6}>
              <CardBody>
                <Heading size="md" mb={4}>AI Configuration</Heading>
                <VStack spacing={4} align="start">
                  <FormControl>
                    <FormLabel>OpenAI API Key</FormLabel>
                    <Input type="password" defaultValue="sk-..." />
                  </FormControl>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0">
                      Enable AI-powered email suggestions
                    </FormLabel>
                    <Switch colorScheme="blue" defaultChecked />
                  </FormControl>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0">
                      Enable AI-powered prospect research
                    </FormLabel>
                    <Switch colorScheme="blue" defaultChecked />
                  </FormControl>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0">
                      Enable AI-powered response analysis
                    </FormLabel>
                    <Switch colorScheme="blue" defaultChecked />
                  </FormControl>
                </VStack>
              </CardBody>
            </Card>
            
            <Card mb={6}>
              <CardBody>
                <Heading size="md" mb={4}>AI Personalization</Heading>
                <VStack spacing={4} align="start">
                  <FormControl>
                    <FormLabel>Default Tone</FormLabel>
                    <Input defaultValue="Professional" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Email Length Preference</FormLabel>
                    <Input defaultValue="Medium (100-150 words)" />
                  </FormControl>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0">
                      Include company-specific research
                    </FormLabel>
                    <Switch colorScheme="blue" defaultChecked />
                  </FormControl>
                </VStack>
              </CardBody>
            </Card>
            
            <Button colorScheme="blue" onClick={handleSave}>Save Changes</Button>
          </TabPanel>
          
          <TabPanel>
            <Card mb={6}>
              <CardBody>
                <Heading size="md" mb={4}>Email Notifications</Heading>
                <VStack spacing={4} align="start">
                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0">
                      Email opened notifications
                    </FormLabel>
                    <Switch colorScheme="blue" defaultChecked />
                  </FormControl>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0">
                      Email clicked notifications
                    </FormLabel>
                    <Switch colorScheme="blue" defaultChecked />
                  </FormControl>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0">
                      Email replied notifications
                    </FormLabel>
                    <Switch colorScheme="blue" defaultChecked />
                  </FormControl>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0">
                      Campaign completed notifications
                    </FormLabel>
                    <Switch colorScheme="blue" defaultChecked />
                  </FormControl>
                </VStack>
              </CardBody>
            </Card>
            
            <Card mb={6}>
              <CardBody>
                <Heading size="md" mb={4}>System Notifications</Heading>
                <VStack spacing={4} align="start">
                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0">
                      Daily summary reports
                    </FormLabel>
                    <Switch colorScheme="blue" defaultChecked />
                  </FormControl>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0">
                      Weekly performance reports
                    </FormLabel>
                    <Switch colorScheme="blue" defaultChecked />
                  </FormControl>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0">
                      AI insights and recommendations
                    </FormLabel>
                    <Switch colorScheme="blue" defaultChecked />
                  </FormControl>
                </VStack>
              </CardBody>
            </Card>
            
            <Button colorScheme="blue" onClick={handleSave}>Save Changes</Button>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Settings; 