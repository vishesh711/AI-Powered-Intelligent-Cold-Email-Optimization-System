import React from 'react';
import { Box, Heading, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, StatGroup, Text, Card, CardHeader, CardBody } from '@chakra-ui/react';

const Dashboard = () => {
  return (
    <Box>
      <Heading mb={6}>Dashboard</Heading>
      
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <Stat p={5} shadow="md" border="1px" borderColor="gray.200" borderRadius="md">
          <StatLabel>Active Campaigns</StatLabel>
          <StatNumber>12</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            23.36%
          </StatHelpText>
        </Stat>
        
        <Stat p={5} shadow="md" border="1px" borderColor="gray.200" borderRadius="md">
          <StatLabel>Emails Sent</StatLabel>
          <StatNumber>2,543</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            12.05%
          </StatHelpText>
        </Stat>
        
        <Stat p={5} shadow="md" border="1px" borderColor="gray.200" borderRadius="md">
          <StatLabel>Open Rate</StatLabel>
          <StatNumber>42.3%</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            9.05%
          </StatHelpText>
        </Stat>
        
        <Stat p={5} shadow="md" border="1px" borderColor="gray.200" borderRadius="md">
          <StatLabel>Response Rate</StatLabel>
          <StatNumber>12.8%</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            14.67%
          </StatHelpText>
        </Stat>
      </SimpleGrid>
      
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <Card>
          <CardHeader>
            <Heading size="md">Recent Activity</Heading>
          </CardHeader>
          <CardBody>
            <Text>Campaign "Q2 Outreach" started - 2 hours ago</Text>
            <Text>15 new prospects added to "Tech Founders" segment - 5 hours ago</Text>
            <Text>Email template "Product Demo Request" updated - Yesterday</Text>
            <Text>Campaign "Sales Follow-up" completed - 2 days ago</Text>
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader>
            <Heading size="md">AI Insights</Heading>
          </CardHeader>
          <CardBody>
            <Text>Subject lines with questions have 32% higher open rates</Text>
            <Text>Emails sent on Tuesday mornings have the best response rate</Text>
            <Text>Adding personalized company details increases replies by 27%</Text>
            <Text>Follow-up emails perform best when sent 3 days after initial contact</Text>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard; 