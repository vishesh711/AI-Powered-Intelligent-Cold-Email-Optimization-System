import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Card,
  CardHeader,
  CardBody,
  Text,
  Flex,
  Button,
  Icon,
  Progress,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
} from '@chakra-ui/react';
import { FiMail, FiUsers, FiBarChart2, FiCalendar } from 'react-icons/fi';

// Define the shape of our dashboard data with TypeScript interface
interface DashboardData {
  activeCampaigns: number;
  activeCampaignChange: number;
  emailsSent: number;
  emailsSentChange: number;
  openRate: number;
  openRateChange: number;
  meetingsBooked: number;
  meetingsBookedChange: number;
}

// Initial data with proper typing
const initialDashboardData: DashboardData = {
  activeCampaigns: 12,
  activeCampaignChange: 23.36,
  emailsSent: 2543,
  emailsSentChange: 12.05,
  openRate: 42.3,
  openRateChange: 9.05,
  meetingsBooked: 28,
  meetingsBookedChange: 18.87
};

const Dashboard: React.FC = () => {
  // Set up state for dashboard data and loading state with proper typing
  const [dashboardData, setDashboardData] = useState<DashboardData>(initialDashboardData);
  const [loading, setLoading] = useState<boolean>(false);

  // Function to fetch data from API
  const fetchDashboardData = async (): Promise<void> => {
    setLoading(true);
    try {
      // Make sure the API URL is defined
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';
      const response = await axios.get(`${apiUrl}/dashboard-stats`);
      
      // Validate and set the data
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Optionally set some error state here
    } finally {
      setLoading(false);
    }
  };

  // Poll the backend every 30 seconds for updated data
  useEffect(() => {
    // Initial fetch
    fetchDashboardData();
    
    // Set up polling interval
    const intervalId = setInterval(fetchDashboardData, 30000); // 30000 ms = 30 sec
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Dashboard</Heading>
        <Button colorScheme="blue">Create Campaign</Button>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <Card>
          <CardBody>
            <Stat>
              <Flex align="center">
                <Box
                  p={2}
                  borderRadius="md"
                  bg="blue.100"
                  color="blue.700"
                  mr={3}
                >
                  <Icon as={FiMail} boxSize={5} />
                </Box>
                <Box>
                  <StatLabel>Active Campaigns</StatLabel>
                  <StatNumber>
                    {loading ? 'Loading...' : dashboardData.activeCampaigns}
                  </StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    {dashboardData.activeCampaignChange}%
                  </StatHelpText>
                </Box>
              </Flex>
            </Stat>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stat>
              <Flex align="center">
                <Box
                  p={2}
                  borderRadius="md"
                  bg="green.100"
                  color="green.700"
                  mr={3}
                >
                  <Icon as={FiUsers} boxSize={5} />
                </Box>
                <Box>
                  <StatLabel>Total Prospects</StatLabel>
                  <StatNumber>
                    {loading ? 'Loading...' : dashboardData.emailsSent}
                  </StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    {dashboardData.emailsSentChange}%
                  </StatHelpText>
                </Box>
              </Flex>
            </Stat>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stat>
              <Flex align="center">
                <Box
                  p={2}
                  borderRadius="md"
                  bg="purple.100"
                  color="purple.700"
                  mr={3}
                >
                  <Icon as={FiBarChart2} boxSize={5} />
                </Box>
                <Box>
                  <StatLabel>Open Rate</StatLabel>
                  <StatNumber>
                    {loading ? 'Loading...' : `${dashboardData.openRate}%`}
                  </StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    {dashboardData.openRateChange}%
                  </StatHelpText>
                </Box>
              </Flex>
            </Stat>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stat>
              <Flex align="center">
                <Box
                  p={2}
                  borderRadius="md"
                  bg="orange.100"
                  color="orange.700"
                  mr={3}
                >
                  <Icon as={FiCalendar} boxSize={5} />
                </Box>
                <Box>
                  <StatLabel>Meetings Booked</StatLabel>
                  <StatNumber>
                    {loading ? 'Loading...' : dashboardData.meetingsBooked}
                  </StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    {dashboardData.meetingsBookedChange}%
                  </StatHelpText>
                </Box>
              </Flex>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
        <Card>
          <CardHeader>
            <Heading size="md">Response Rate Trend</Heading>
          </CardHeader>
          <CardBody>
            <Text>Jan: 12%</Text>
            <Text>Feb: 19%</Text>
            <Text>Mar: 15%</Text>
            <Text>Apr: 22%</Text>
            <Text>May: 25%</Text>
            <Text>Jun: 28%</Text>
            <Text fontWeight="bold" mt={4}>Trend: Increasing</Text>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Heading size="md">Meetings Booked Trend</Heading>
          </CardHeader>
          <CardBody>
            <Text>Jan: 3</Text>
            <Text>Feb: 5</Text>
            <Text>Mar: 4</Text>
            <Text>Apr: 7</Text>
            <Text>May: 9</Text>
            <Text>Jun: 12</Text>
            <Text fontWeight="bold" mt={4}>Trend: Increasing</Text>
          </CardBody>
        </Card>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        <Card>
          <CardHeader>
            <Heading size="md">Campaign Performance</Heading>
          </CardHeader>
          <CardBody>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Campaign</Th>
                  <Th>Status</Th>
                  <Th isNumeric>Open Rate</Th>
                  <Th isNumeric>Response Rate</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Q2 Product Launch</Td>
                  <Td><Badge colorScheme="green">Active</Badge></Td>
                  <Td isNumeric>42.3%</Td>
                  <Td isNumeric>18.7%</Td>
                </Tr>
                <Tr>
                  <Td>Enterprise Outreach</Td>
                  <Td><Badge colorScheme="green">Active</Badge></Td>
                  <Td isNumeric>38.1%</Td>
                  <Td isNumeric>15.2%</Td>
                </Tr>
                <Tr>
                  <Td>Healthcare Vertical</Td>
                  <Td><Badge colorScheme="green">Active</Badge></Td>
                  <Td isNumeric>45.7%</Td>
                  <Td isNumeric>21.3%</Td>
                </Tr>
                <Tr>
                  <Td>Follow-up Campaign</Td>
                  <Td><Badge colorScheme="purple">Scheduled</Badge></Td>
                  <Td isNumeric>-</Td>
                  <Td isNumeric>-</Td>
                </Tr>
                <Tr>
                  <Td>Q1 Webinar Invite</Td>
                  <Td><Badge colorScheme="gray">Completed</Badge></Td>
                  <Td isNumeric>39.8%</Td>
                  <Td isNumeric>16.5%</Td>
                </Tr>
              </Tbody>
            </Table>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Heading size="md">Recent Activity</Heading>
          </CardHeader>
          <CardBody>
            <Box>
              <Flex justify="space-between" align="center" mb={3}>
                <Text fontWeight="medium">New response from John Smith</Text>
                <Text fontSize="sm" color="gray.500">5 min ago</Text>
              </Flex>
              <Flex justify="space-between" align="center" mb={3}>
                <Text fontWeight="medium">Campaign "Q2 Product Launch" started</Text>
                <Text fontSize="sm" color="gray.500">1 hour ago</Text>
              </Flex>
              <Flex justify="space-between" align="center" mb={3}>
                <Text fontWeight="medium">Meeting booked with Acme Corp</Text>
                <Text fontSize="sm" color="gray.500">3 hours ago</Text>
              </Flex>
              <Flex justify="space-between" align="center" mb={3}>
                <Text fontWeight="medium">250 new prospects imported</Text>
                <Text fontSize="sm" color="gray.500">Yesterday</Text>
              </Flex>
              <Flex justify="space-between" align="center">
                <Text fontWeight="medium">New template created: "Product Demo Request"</Text>
                <Text fontSize="sm" color="gray.500">Yesterday</Text>
              </Flex>
            </Box>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard; 