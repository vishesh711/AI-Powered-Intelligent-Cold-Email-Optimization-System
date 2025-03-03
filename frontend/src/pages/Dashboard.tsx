import React from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
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
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Sample data for charts
  const responseRateData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Response Rate',
        data: [12, 19, 15, 22, 25, 28],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const meetingBookedData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Meetings Booked',
        data: [3, 5, 4, 7, 9, 12],
        fill: false,
        borderColor: 'rgb(153, 102, 255)',
        tension: 0.1,
      },
    ],
  };

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
                  <StatNumber>12</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    23.36%
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
                  <StatNumber>2,543</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    12.05%
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
                  <StatLabel>Response Rate</StatLabel>
                  <StatNumber>28.3%</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    5.14%
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
                  <StatNumber>42</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    16.67%
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
            <Box height="250px">
              <Line data={responseRateData} options={{ maintainAspectRatio: false }} />
            </Box>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Heading size="md">Meetings Booked Trend</Heading>
          </CardHeader>
          <CardBody>
            <Box height="250px">
              <Line data={meetingBookedData} options={{ maintainAspectRatio: false }} />
            </Box>
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