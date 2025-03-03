import React from 'react';
import { Box, Heading, SimpleGrid, Card, CardHeader, CardBody, Text, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Flex, Select } from '@chakra-ui/react';

const Analytics = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
        <Heading>Analytics</Heading>
        <Select placeholder="Last 30 days" width="200px">
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
          <option value="365">Last year</option>
        </Select>
      </Box>
      
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <Card>
          <CardBody>
            <Stat>
              <StatLabel>Open Rate</StatLabel>
              <StatNumber>42.3%</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                9.05%
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody>
            <Stat>
              <StatLabel>Click Rate</StatLabel>
              <StatNumber>18.7%</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                5.12%
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody>
            <Stat>
              <StatLabel>Response Rate</StatLabel>
              <StatNumber>12.8%</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                14.67%
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody>
            <Stat>
              <StatLabel>Conversion Rate</StatLabel>
              <StatNumber>3.2%</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                1.05%
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>
      
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
        <Card>
          <CardHeader>
            <Heading size="md">Performance by Campaign</Heading>
          </CardHeader>
          <CardBody>
            <Text>Chart placeholder - Campaign performance comparison</Text>
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader>
            <Heading size="md">Performance by Template</Heading>
          </CardHeader>
          <CardBody>
            <Text>Chart placeholder - Template performance comparison</Text>
          </CardBody>
        </Card>
      </SimpleGrid>
      
      <Card mb={8}>
        <CardHeader>
          <Heading size="md">Email Activity Over Time</Heading>
        </CardHeader>
        <CardBody>
          <Text>Chart placeholder - Email activity timeline</Text>
        </CardBody>
      </Card>
      
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <Card>
          <CardHeader>
            <Heading size="md">Top Performing Subject Lines</Heading>
          </CardHeader>
          <CardBody>
            <Text>1. "Quick question about [Company]'s approach to [Topic]"</Text>
            <Text>2. "Ideas for improving [Company]'s [Department]"</Text>
            <Text>3. "[Mutual Connection] suggested we connect"</Text>
            <Text>4. "Thoughts on [Recent Company News]?"</Text>
            <Text>5. "[Company] + [Your Company]: Potential collaboration?"</Text>
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader>
            <Heading size="md">Best Sending Times</Heading>
          </CardHeader>
          <CardBody>
            <Text>1. Tuesday, 10:00 AM - 11:00 AM</Text>
            <Text>2. Thursday, 2:00 PM - 3:00 PM</Text>
            <Text>3. Wednesday, 8:00 AM - 9:00 AM</Text>
            <Text>4. Monday, 4:00 PM - 5:00 PM</Text>
            <Text>5. Friday, 11:00 AM - 12:00 PM</Text>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

export default Analytics; 