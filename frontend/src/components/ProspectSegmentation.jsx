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
          name: `Segment ${i + 1}`,
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
        description: `Created ${results.n_clusters} segments`,
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
