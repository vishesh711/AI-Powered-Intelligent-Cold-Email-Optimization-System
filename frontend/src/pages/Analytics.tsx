import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Flex,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Select,
  FormControl,
  FormLabel,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
} from '@chakra-ui/react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
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
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [campaignFilter, setCampaignFilter] = useState('all');

  // Sample data for charts
  const engagementData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Open Rate',
        data: [42, 38, 45, 50],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Click Rate',
        data: [25, 22, 28, 32],
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
      },
      {
        label: 'Response Rate',
        data: [18, 15, 20, 24],
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
      },
    ],
  };

  const responseTimeData = {
    labels: ['Same Day', '1 Day', '2-3 Days', '4-7 Days', '> 7 Days'],
    datasets: [
      {
        label: 'Response Time Distribution',
        data: [15, 30, 25, 20, 10],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const sentimentData = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        label: 'Response Sentiment',
        data: [65, 25, 10],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Analytics</Heading>
        <Flex>
          <FormControl mr={4} w="auto">
            <Select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              size="sm"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="all">All time</option>
            </Select>
          </FormControl>
          <FormControl w="auto">
            <Select
              value={campaignFilter}
              onChange={(e) => setCampaignFilter(e.target.value)}
              size="sm"
            >
              <option value="all">All Campaigns</option>
              <option value="1">Q2 Product Launch</option>
              <option value="2">Healthcare Vertical</option>
              <option value="3">Follow-up Campaign</option>
            </Select>
          </FormControl>
        </Flex>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <Card>
          <CardBody>
            <Stat>
              <StatLabel>Open Rate</StatLabel>
              <StatNumber>42.8%</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                8.5% from last period
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stat>
              <StatLabel>Click Rate</StatLabel>
              <StatNumber>28.3%</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                5.2% from last period
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stat>
              <StatLabel>Response Rate</StatLabel>
              <StatNumber>18.9%</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                3.7% from last period
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stat>
              <StatLabel>Meetings Booked</StatLabel>
              <StatNumber>24</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                6 more than last period
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>

      <Tabs variant="enclosed" mb={8}>
        <TabList>
          <Tab>Engagement Metrics</Tab>
          <Tab>Response Analysis</Tab>
          <Tab>Campaign Comparison</Tab>
          <Tab>Prospect Insights</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Card mb={6}>
              <CardHeader>
                <Heading size="md">Engagement Over Time</Heading>
              </CardHeader>
              <CardBody>
                <Box height="400px">
                  <Line data={engagementData} options={{ maintainAspectRatio: false }} />
                </Box>
              </CardBody>
            </Card>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
              <Card>
                <CardHeader>
                  <Heading size="md">Response Time Distribution</Heading>
                </CardHeader>
                <CardBody>
                  <Box height="300px">
                    <Bar data={responseTimeData} options={{ maintainAspectRatio: false }} />
                  </Box>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <Heading size="md">Response Sentiment</Heading>
                </CardHeader>
                <CardBody>
                  <Box height="300px">
                    <Pie data={sentimentData} options={{ maintainAspectRatio: false }} />
                  </Box>
                </CardBody>
              </Card>
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <Text>Response analysis content would go here</Text>
          </TabPanel>
          <TabPanel>
            <Text>Campaign comparison content would go here</Text>
          </TabPanel>
          <TabPanel>
            <Text>Prospect insights content would go here</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Card>
        <CardHeader>
          <Heading size="md">Top Performing Templates</Heading>
        </CardHeader>
        <CardBody>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Template Name</Th>
                <Th>Open Rate</Th>
                <Th>Click Rate</Th>
                <Th>Response Rate</Th>
                <Th>Meetings</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Initial Outreach</Td>
                <Td>48.2%</Td>
                <Td>32.5%</Td>
                <Td>22.1%</Td>
                <Td>12</Td>
              </Tr>
              <Tr>
                <Td>Product Demo Request</Td>
                <Td>45.7%</Td>
                <Td>30.2%</Td>
                <Td>19.8%</Td>
                <Td>8</Td>
              </Tr>
              <Tr>
                <Td>Follow-up #1</Td>
                <Td>38.9%</Td>
                <Td>25.4%</Td>
                <Td>15.2%</Td>
                <Td>4</Td>
              </Tr>
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Analytics; 