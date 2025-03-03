import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Select, Heading, Text, Spinner, 
         useToast, SimpleGrid, Card, CardHeader, CardBody, Stat, 
         StatLabel, StatNumber, StatHelpText, Stack, NumberInput,
         NumberInputField, NumberInputStepper, NumberIncrementStepper,
         NumberDecrementStepper } from '@chakra-ui/react';
import apiService from '../services/api';

interface SegmentationProps {
  onSegmentationComplete?: (segments: any[]) => void;
}

const ProspectSegmentation: React.FC<SegmentationProps> = ({ onSegmentationComplete }) => {
  const [algorithm, setAlgorithm] = useState('kmeans');
  const [nClusters, setNClusters] = useState(5);
  const [loading, setLoading] = useState(false);
  const [segmentationResults, setSegmentationResults] = useState<any>(null);
  const toast = useToast();

  const handleSegmentation = async () => {
    setLoading(true);
    try {
      const results = await apiService.segmentProspects({
        algorithm,
        n_clusters: nClusters
      });
      
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
    } catch (error: any) {
      toast({
        title: 'Segmentation error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Replace scatter plot with a simple segment visualization
  const renderSegmentVisualization = () => {
    if (!segmentationResults || !segmentationResults.visualization_data) {
      return null;
    }

    const { clusters } = segmentationResults;
    
    // Count prospects in each cluster
    const clusterCounts: {[key: string]: number} = {};
    clusters.forEach((clusterId: number) => {
      clusterCounts[clusterId] = (clusterCounts[clusterId] || 0) + 1;
    });
    
    // Generate a color for each cluster
    const getClusterColor = (clusterId: number) => {
      const hue = (clusterId * 137) % 360; // Golden angle approximation
      return `hsl(${hue}, 70%, 60%)`;
    };

    return (
      <Box mt={6}>
        <Heading size="md" mb={4}>Segment Distribution</Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {Object.entries(clusterCounts).map(([clusterId, count]) => (
            <Card key={clusterId} borderLeft="4px solid" borderLeftColor={getClusterColor(Number(clusterId))}>
              <CardBody>
                <Heading size="sm">
                  {Number(clusterId) === -1 ? 'Outliers' : `Segment ${Number(clusterId) + 1}`}
                </Heading>
                <Text mt={2}>{count} prospects</Text>
                <Text fontSize="sm" color="gray.500">
                  {Math.round((count / clusters.length) * 100)}% of total
                </Text>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    );
  };

  const renderSegmentStats = () => {
    if (!segmentationResults || !segmentationResults.segments) {
      return null;
    }

    return (
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5} mt={6}>
        {segmentationResults.segments.map((segment: any) => (
          <Card key={segment.segment_id}>
            <CardHeader>
              <Heading size="md">{segment.name}</Heading>
            </CardHeader>
            <CardBody>
              <Stat>
                <StatLabel>Size</StatLabel>
                <StatNumber>{segment.size}</StatNumber>
                <StatHelpText>{segment.description}</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    );
  };

  return (
    <Box>
      <Heading size="md" mb={4}>Prospect Segmentation</Heading>
      <Text mb={6}>
        Automatically group your prospects into segments based on their characteristics and behavior.
      </Text>
      
      <Stack spacing={6} direction={{ base: 'column', md: 'row' }} mb={6}>
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