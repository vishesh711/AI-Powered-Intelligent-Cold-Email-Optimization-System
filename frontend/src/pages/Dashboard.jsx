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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
} from '@chakra-ui/react';
import { FiMail, FiUsers, FiBarChart2, FiCalendar } from 'react-icons/fi';

// Define the shape of our dashboard data
const initialDashboardData = {
  activeCampaigns: 12,
  activeCampaignChange: 23.36,
  emailsSent: 2543,
  emailsSentChange: 12.05,
  openRate: 42.3,
  openRateChange: 9.05,
  meetingsBooked: 28,
  meetingsBookedChange: 18.87
};

const Dashboard = () => {
  // Set up state for dashboard data and loading state
  const [dashboardData, setDashboardData] = useState(initialDashboardData);
  const [loading, setLoading] = useState(false);

  // Function to fetch data from API
  const fetchDashboardData = async () => {
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
                  <StatLabel>Emails Sent</StatLabel>
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

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={8}>
        <Card>
          <CardHeader>
            <Heading size="md">Response Rate Trend</Heading>
          </CardHeader>
          <CardBody>
            <Text>Response rate has increased by 15% over the last 6 months</Text>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Heading size="md">Meetings Booked</Heading>
          </CardHeader>
          <CardBody>
            <Text>28 meetings booked this month, up from 22 last month</Text>
          </CardBody>
        </Card>
      </SimpleGrid>

      <Card mb={8}>
        <CardHeader>
          <Heading size="md">Recent Activity</Heading>
        </CardHeader>
        <CardBody>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Event</Th>
                <Th>Campaign</Th>
                <Th>Time</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Email opened</Td>
                <Td>Q2 Outreach</Td>
                <Td>2 minutes ago</Td>
                <Td><Badge colorScheme="green">Success</Badge></Td>
              </Tr>
              <Tr>
                <Td>Email clicked</Td>
                <Td>Product Launch</Td>
                <Td>15 minutes ago</Td>
                <Td><Badge colorScheme="green">Success</Badge></Td>
              </Tr>
              <Tr>
                <Td>Reply received</Td>
                <Td>Follow-up Campaign</Td>
                <Td>1 hour ago</Td>
                <Td><Badge colorScheme="blue">Responded</Badge></Td>
              </Tr>
              <Tr>
                <Td>Campaign started</Td>
                <Td>New Market Expansion</Td>
                <Td>3 hours ago</Td>
                <Td><Badge colorScheme="purple">Active</Badge></Td>
              </Tr>
            </Tbody>
          </Table>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <Heading size="md">AI Insights</Heading>
        </CardHeader>
        <CardBody>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <Box p={4} borderRadius="md" bg="blue.50">
              <Heading size="sm" mb={2}>Optimal Sending Time</Heading>
              <Text>Your emails have the highest open rates when sent on Tuesday between 10:00 AM and 11:00 AM.</Text>
            </Box>
            <Box p={4} borderRadius="md" bg="green.50">
              <Heading size="sm" mb={2}>Subject Line Analysis</Heading>
              <Text>Subject lines containing "strategy" have 28% higher open rates than your average.</Text>
            </Box>
            <Box p={4} borderRadius="md" bg="purple.50">
              <Heading size="sm" mb={2}>Engagement Insight</Heading>
              <Text>Emails with 3-5 paragraphs receive 34% more replies than shorter or longer emails.</Text>
            </Box>
            <Box p={4} borderRadius="md" bg="orange.50">
              <Heading size="sm" mb={2}>Follow-up Recommendation</Heading>
              <Text>Consider sending follow-ups 3 days after the initial email for optimal response rates.</Text>
            </Box>
          </SimpleGrid>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Dashboard;
