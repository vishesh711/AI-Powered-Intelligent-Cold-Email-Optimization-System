import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Button,
  Stack,
  Select,
  Textarea,
  Divider,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

const Settings = () => {
  const toast = useToast();
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: 'Settings saved',
        description: 'Your settings have been updated successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }, 1500);
  };

  return (
    <Box>
      <Heading size="lg" mb={6}>Settings</Heading>
      
      <Tabs variant="enclosed">
        <TabList>
          <Tab>General</Tab>
          <Tab>Email Settings</Tab>
          <Tab>AI Configuration</Tab>
          <Tab>Integrations</Tab>
          <Tab>Team</Tab>
          <Tab>Billing</Tab>
        </TabList>
        
        <TabPanels>
          <TabPanel>
            <Stack spacing={6}>
              <Heading size="md" mb={4}>General Settings</Heading>
              
              <FormControl>
                <FormLabel>Company Name</FormLabel>
                <Input defaultValue="Acme Corporation" />
              </FormControl>
              
              <FormControl>
                <FormLabel>Default Time Zone</FormLabel>
                <Select defaultValue="America/New_York">
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="Europe/London">London (GMT)</option>
                </Select>
              </FormControl>
              
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Enable Desktop Notifications</FormLabel>
                <Switch defaultChecked />
              </FormControl>
              
              <Button colorScheme="blue" onClick={handleSave} isLoading={saving} alignSelf="flex-start">
                Save Changes
              </Button>
            </Stack>
          </TabPanel>
          
          <TabPanel>
            <Stack spacing={6}>
              <Heading size="md" mb={4}>Email Settings</Heading>
              
              <FormControl>
                <FormLabel>Default Sender Name</FormLabel>
                <Input defaultValue="John Doe" />
              </FormControl>
              
              <FormControl>
                <FormLabel>Default Sender Email</FormLabel>
                <Input defaultValue="john.doe@acmecorp.com" />
              </FormControl>
              
              <FormControl>
                <FormLabel>Email Signature</FormLabel>
                <Textarea 
                  defaultValue="John Doe\nSales Representative\nAcme Corporation\n(555) 123-4567" 
                  height="120px"
                />
              </FormControl>
              
              <Divider my={4} />
              
              <Heading size="sm" mb={4}>Sending Limits</Heading>
              
              <FormControl>
                <FormLabel>Maximum Emails Per Day</FormLabel>
                <Input type="number" defaultValue={200} />
              </FormControl>
              
              <FormControl>
                <FormLabel>Minimum Time Between Emails (seconds)</FormLabel>
                <Input type="number" defaultValue={60} />
              </FormControl>
              
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Enable Email Throttling</FormLabel>
                <Switch defaultChecked />
              </FormControl>
              
              <Button colorScheme="blue" onClick={handleSave} isLoading={saving} alignSelf="flex-start">
                Save Changes
              </Button>
            </Stack>
          </TabPanel>
          
          <TabPanel>
            <Stack spacing={6}>
              <Heading size="md" mb={4}>AI Configuration</Heading>
              
              <Alert status="info" mb={4}>
                <AlertIcon />
                <Box>
                  <AlertTitle>AI Integration</AlertTitle>
                  <AlertDescription>
                    Configure your AI settings to optimize email generation and personalization.
                  </AlertDescription>
                </Box>
              </Alert>
              
              <FormControl>
                <FormLabel>AI Provider</FormLabel>
                <Select defaultValue="openai">
                  <option value="openai">OpenAI (GPT-4o)</option>
                  <option value="anthropic">Anthropic (Claude)</option>
                  <option value="cohere">Cohere</option>
                </Select>
              </FormControl>
              
              <FormControl>
                <FormLabel>API Key</FormLabel>
                <Input type="password" defaultValue="sk-••••••••••••••••••••••••••••••" />
              </FormControl>
              
              <FormControl>
                <FormLabel>Default Model</FormLabel>
                <Select defaultValue="gpt-4o">
                  <option value="gpt-4o">GPT-4o</option>
                  <option value="gpt-4">GPT-4</option>
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                </Select>
              </FormControl>
              
              <FormControl>
                <FormLabel>Temperature</FormLabel>
                <Input type="number" step="0.1" min="0" max="1" defaultValue={0.7} />
              </FormControl>
              
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Enable AI Content Generation</FormLabel>
                <Switch defaultChecked />
              </FormControl>
              
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Enable AI Personalization</FormLabel>
                <Switch defaultChecked />
              </FormControl>
              
              <Button colorScheme="blue" onClick={handleSave} isLoading={saving} alignSelf="flex-start">
                Save Changes
              </Button>
            </Stack>
          </TabPanel>
          
          <TabPanel>
            <Heading size="md" mb={4}>Integrations</Heading>
            
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <Card>
                <CardHeader>
                  <Heading size="sm">CRM Integration</Heading>
                </CardHeader>
                <CardBody>
                  <Stack spacing={4}>
                    <FormControl>
                      <FormLabel>CRM Provider</FormLabel>
                      <Select defaultValue="salesforce">
                        <option value="salesforce">Salesforce</option>
                        <option value="hubspot">HubSpot</option>
                        <option value="zoho">Zoho CRM</option>
                        <option value="pipedrive">Pipedrive</option>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel>API Key</FormLabel>
                      <Input type="password" defaultValue="••••••••••••••••" />
                    </FormControl>
                    <Button colorScheme="blue" size="sm">Connect</Button>
                  </Stack>
                </CardBody>
              </Card>
              
              <Card>
                <CardHeader>
                  <Heading size="sm">Email Service Provider</Heading>
                </CardHeader>
                <CardBody>
                  <Stack spacing={4}>
                    <FormControl>
                      <FormLabel>Email Provider</FormLabel>
                      <Select defaultValue="gmail">
                        <option value="gmail">Gmail</option>
                        <option value="outlook">Outlook</option>
                        <option value="sendgrid">SendGrid</option>
                        <option value="mailgun">Mailgun</option>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel>API Key / Credentials</FormLabel>
                      <Input type="password" defaultValue="••••••••••••••••" />
                    </FormControl>
                    <Button colorScheme="blue" size="sm">Connect</Button>
                  </Stack>
                </CardBody>
              </Card>
            </SimpleGrid>
          </TabPanel>
          
          <TabPanel>
            <Text>Team management settings would go here</Text>
          </TabPanel>
          
          <TabPanel>
            <Text>Billing and subscription settings would go here</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Settings; 