#!/bin/bash
set -e

echo "🔧 Fixing the Cold Email Optimization System..."

# Create a backup of the current project
echo "Creating backup..."
timestamp=$(date +%Y%m%d_%H%M%S)
mkdir -p ../backups
cp -r . "../backups/cold-email-system-backup-$timestamp"

# Fix frontend dependencies
echo "Fixing frontend dependencies..."
cd frontend

# Update package.json with compatible dependencies
cat > package.json << EOL
{
  "name": "cold-email-optimization-system-frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@chakra-ui/react": "^2.5.1",
    "@emotion/react": "^11.10.6",
    "@emotion/styled": "^11.10.6",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^14.4.3",
    "axios": "^1.3.4",
    "framer-motion": "^10.0.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-icons": "^4.8.0",
    "react-router-dom": "^6.8.2",
    "react-scripts": "5.0.1",
    "recharts": "^2.4.3",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "GENERATE_SOURCEMAP=false react-scripts start",
    "build": "GENERATE_SOURCEMAP=false react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
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

# Clean install dependencies
rm -rf node_modules package-lock.json
npm cache clean --force
npm install --legacy-peer-deps

# Fix Dashboard component
cat > src/pages/Dashboard.jsx << EOL
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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  // Sample data for charts
  const responseData = [
    { name: 'Jan', value: 12 },
    { name: 'Feb', value: 19 },
    { name: 'Mar', value: 15 },
    { name: 'Apr', value: 22 },
    { name: 'May', value: 25 },
    { name: 'Jun', value: 28 },
  ];

  const meetingsData = [
    { name: 'Jan', value: 3 },
    { name: 'Feb', value: 5 },
    { name: 'Mar', value: 4 },
    { name: 'Apr', value: 7 },
    { name: 'May', value: 9 },
    { name: 'Jun', value: 12 },
  ];

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
                  <StatLabel>Emails Sent</StatLabel>
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
                  <StatLabel>Open Rate</StatLabel>
                  <StatNumber>42.3%</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    9.05%
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
                  <StatLabel>Response Rate</StatLabel>
                  <StatNumber>12.8%</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    5.67%
                  </StatHelpText>
                </Box>
              </Flex>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mb={8}>
        <Card>
          <CardHeader>
            <Heading size="md">Response Rate Trend</Heading>
          </CardHeader>
          <CardBody>
            <Box height="300px">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={responseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" name="Response Rate %" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Heading size="md">Meetings Booked Trend</Heading>
          </CardHeader>
          <CardBody>
            <Box height="300px">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={meetingsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#82ca9d" name="Meetings Booked" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
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
EOL

# Fix ProspectSegmentation component
mkdir -p src/components
cat > src/components/ProspectSegmentation.jsx << EOL
import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Select, Heading, Text, Spinner, 
         useToast, SimpleGrid, Card, CardHeader, CardBody, Stat, 
         StatLabel, StatNumber, StatHelpText, Stack, NumberInput,
         NumberInputField, NumberInputStepper, NumberIncrementStepper,
         NumberDecrementStepper } from '@chakra-ui/react';

const ProspectSegmentation = ({ onSegmentationComplete }) => {
  const [algorithm, setAlgorithm] = useState('kmeans');
  const [nClusters, setNClusters] = useState(5);
  const [loading, setLoading] = useState(false);
  const [segmentationResults, setSegmentationResults] = useState(null);
  const toast = useToast();

  const handleSegmentation = async () => {
    setLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const results = {
        n_clusters: nClusters,
        segments: Array.from({ length: nClusters }, (_, i) => ({
          id: i + 1,
          name: \`Segment \${i + 1}\`,
          size: Math.floor(Math.random() * 100) + 20,
          engagement_rate: Math.random() * 0.5,
          key_traits: ['Trait A', 'Trait B', 'Trait C']
        }))
      };
      
      setSegmentationResults(results);
      
      if (onSegmentationComplete) {
        onSegmentationComplete(results.segments);
      }
      
      toast({
        title: 'Segmentation complete',
        description: \`Created \${results.n_clusters} segments\`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Segmentation error',
        description: error.message || 'An error occurred during segmentation',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Simple segment visualization
  const renderSegmentVisualization = () => {
    return (
      <Box mt={8}>
        <Heading size="md" mb={4}>Segment Distribution</Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {segmentationResults.segments.map(segment => (
            <Card key={segment.id} borderColor={getSegmentColor(segment.id)} borderWidth="1px">
              <CardHeader bg={getSegmentColorBg(segment.id)} py={2}>
                <Heading size="sm">{segment.name}</Heading>
              </CardHeader>
              <CardBody>
                <Text><strong>Size:</strong> {segment.size} prospects</Text>
                <Text><strong>Engagement:</strong> {(segment.engagement_rate * 100).toFixed(1)}%</Text>
                <Text><strong>Key traits:</strong> {segment.key_traits.join(', ')}</Text>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    );
  };

  // Segment statistics
  const renderSegmentStats = () => {
    return (
      <Box mt={8}>
        <Heading size="md" mb={4}>Segment Statistics</Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Total Segments</StatLabel>
                <StatNumber>{segmentationResults.n_clusters}</StatNumber>
                <StatHelpText>Based on {algorithm} algorithm</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Largest Segment</StatLabel>
                <StatNumber>
                  {Math.max(...segmentationResults.segments.map(s => s.size))} prospects
                </StatNumber>
              </Stat>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Most Engaged Segment</StatLabel>
                <StatNumber>
                  {(Math.max(...segmentationResults.segments.map(s => s.engagement_rate)) * 100).toFixed(1)}%
                </StatNumber>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Box>
    );
  };

  // Helper function to get segment colors
  const getSegmentColor = (id) => {
    const colors = ['blue.500', 'green.500', 'purple.500', 'orange.500', 'red.500', 
                    'teal.500', 'yellow.500', 'cyan.500', 'pink.500', 'gray.500'];
    return colors[(id - 1) % colors.length];
  };

  const getSegmentColorBg = (id) => {
    const colors = ['blue.50', 'green.50', 'purple.50', 'orange.50', 'red.50', 
                    'teal.50', 'yellow.50', 'cyan.50', 'pink.50', 'gray.50'];
    return colors[(id - 1) % colors.length];
  };

  return (
    <Box>
      <Heading size="md" mb={4}>Prospect Segmentation</Heading>
      <Text mb={4}>
        Use AI-powered segmentation to group your prospects based on similar characteristics and behaviors.
      </Text>
      
      <Stack spacing={4} mb={6}>
        <FormControl>
          <FormLabel>Segmentation Algorithm</FormLabel>
          <Select 
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
          >
            <option value="kmeans">K-Means Clustering</option>
            <option value="hierarchical">Hierarchical Clustering</option>
            <option value="dbscan">Density-Based Clustering</option>
          </Select>
        </FormControl>
        
        <FormControl>
          <FormLabel>Number of Segments</FormLabel>
          <NumberInput 
            min={2} 
            max={10} 
            value={nClusters}
            onChange={(_, value) => setNClusters(value)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </Stack>
      
      <Button 
        colorScheme="blue" 
        onClick={handleSegmentation}
        isLoading={loading}
        loadingText="Segmenting..."
      >
        Run Segmentation
      </Button>
      
      {loading && (
        <Box textAlign="center" mt={8}>
          <Spinner size="xl" />
          <Text mt={4}>Analyzing prospect data and creating segments...</Text>
        </Box>
      )}
      
      {!loading && segmentationResults && (
        <>
          {renderSegmentVisualization()}
          {renderSegmentStats()}
        </>
      )}
    </Box>
  );
};

export default ProspectSegmentation;
EOL

cd ..

# Create a simplified run script
cat > run-simple.sh << EOL
#!/bin/bash
set -e

echo "🚀 Starting the Cold Email Optimization System in simplified mode..."

# Create minimal .env file
echo "Creating minimal .env file..."
cat > .env << EOF
SECRET_KEY=simplifiedsecretkey123456789
POSTGRES_SERVER=localhost
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=coldmail
FIRST_SUPERUSER_EMAIL=admin@example.com
FIRST_SUPERUSER_PASSWORD=admin
OPENAI_API_KEY=your-openai-api-key
REACT_APP_API_URL=http://localhost:8000/api/v1
EOF

# Start frontend only (for testing UI)
echo "Starting frontend in development mode..."
cd frontend
npm start

echo "✅ Frontend started!"
echo "🌐 Access point: http://localhost:3000"
EOL

chmod +x run-simple.sh

echo "✅ All fixes applied!"
echo "To run the application in simplified mode (frontend only), execute: ./run-simple.sh"
echo "This will start just the frontend for testing the UI components." 