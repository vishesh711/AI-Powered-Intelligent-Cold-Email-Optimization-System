#!/bin/bash
set -e

echo "🔧 Comprehensive fix for all frontend errors..."

# Create backup of current files
echo "Creating backup of current files..."
mkdir -p backup
cp -r frontend/src backup/
cp frontend/package.json backup/

# Clean existing installations
echo "Cleaning existing installations..."
rm -rf frontend/node_modules frontend/package-lock.json

# Create a proper package.json with TypeScript support
echo "Creating proper package.json with TypeScript support..."
cat > frontend/package.json << EOL
{
  "name": "cold-email-frontend",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "@chakra-ui/react": "2.5.1",
    "@emotion/react": "11.10.6",
    "@emotion/styled": "11.10.6",
    "axios": "1.3.4",
    "framer-motion": "10.0.1",
    "react": "18.2.0", 
    "react-dom": "18.2.0",
    "react-icons": "4.8.0",
    "react-router-dom": "6.8.2",
    "react-scripts": "5.0.1"
  },
  "devDependencies": {
    "@types/node": "16.18.0",
    "@types/react": "18.0.0",
    "@types/react-dom": "18.0.0",
    "typescript": "4.9.5"
  },
  "scripts": {
    "start": "BROWSER=none react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
EOL

# Create TypeScript configuration
echo "Creating TypeScript configuration..."
cat > frontend/tsconfig.json << EOL
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": false,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
EOL

# Create react-app-env.d.ts file
echo "Creating TypeScript environment declaration file..."
mkdir -p frontend/src
cat > frontend/src/react-app-env.d.ts << EOL
/// <reference types="react-scripts" />
EOL

# Create a proper Dashboard.jsx file
echo "Creating proper Dashboard.jsx file..."
cat > frontend/src/pages/Dashboard.jsx << EOL
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
      const response = await axios.get(\`\${apiUrl}/dashboard-stats\`);
      
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
                    {loading ? 'Loading...' : \`\${dashboardData.openRate}%\`}
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
EOL

# Create .env file
echo "Creating .env file..."
cat > frontend/src/.env << EOL
REACT_APP_API_URL=http://localhost:8000/api/v1
EOL

# Install dependencies
echo "Installing dependencies..."
cd frontend
npm install --legacy-peer-deps

# Create a simple run script
echo "Creating simple run script..."
cd ..
cat > run-fixed-frontend.sh << EOL
#!/bin/bash
set -e

echo "🚀 Starting fixed frontend..."
cd frontend
npm start
EOL

chmod +x run-fixed-frontend.sh

echo "✅ All fixes applied!"
echo "To run the fixed frontend, execute: ./run-fixed-frontend.sh" 