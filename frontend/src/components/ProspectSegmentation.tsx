import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Select, Heading, Text, Spinner, 
         useToast, SimpleGrid, Card, CardHeader, CardBody, Stat, 
         StatLabel, StatNumber, StatHelpText, Stack, NumberInput,
         NumberInputField, NumberInputStepper, NumberIncrementStepper,
         NumberDecrementStepper } from '@chakra-ui/react';
import { Scatter } from 'react-chartjs-2';
import apiService from '../services/api';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

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

  const renderScatterPlot = () => {
    if (!segmentationResults || !segmentationResults.visualization_data) {
      return null;
    }

    const { visualization_data, clusters } = segmentationResults;
    
    // Prepare datasets by grouping points by cluster
    const uniqueClusters = [...new Set(clusters)];
    const datasets = uniqueClusters.map(clusterId => {
      // Get indices of points in this cluster
      const indices = clusters.map((c: number, i: number) => c === clusterId ? i : -1).filter((i: number) => i !== -1);
      
      // Get x and y coordinates for these points
      const data = indices.map((i: number) => ({
        x: visualization_data.x[i],
        y: visualization_data.y[i]
      }));

      // Generate a color for this cluster
      const hue = (Number(clusterId) * 137) % 360; // Golden angle approximation for good color distribution
      const color = `hsl(${hue}, 70%, 60%)`;
      
      return {
        label: clusterId === -1 ? 'Outliers' : `Segment ${Number(clusterId) + 1}`,
        data,
        backgroundColor: color,
        borderColor: color,
      };
    });

    const chartData = {
      datasets
    };

    const options = {
      scales: {
        x: {
          title: {
            display: true,
            text: 'Principal Component 1'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Principal Component 2'
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const pointIndex = context.dataIndex;
              const datasetIndex = context.datasetIndex;
              const clusterId = uniqueClusters[datasetIndex];
              return `Segment: ${clusterId === -1 ? 'Outlier' : clusterId + 1}`;
            }
          }
        }
      }
    };

    return <Scatter data={chartData} options={options} />;
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
      <Heading size="lg" mb={4}>Prospect Segmentation</Heading>
      <Text mb={4}>
        Use machine learning to automatically segment your prospects based on their characteristics.
      </Text>
      
      <Stack spacing={4} direction={{ base: 'column', md: 'row' }} mb={6}>
        <FormControl>
          <FormLabel>Algorithm</FormLabel>
          <Select 
            value={algorithm} 
            onChange={(e) => setAlgorithm(e.target.value)}
            disabled={loading}
          >
            <option value="kmeans">K-Means Clustering</option>
            <option value="dbscan">DBSCAN</option>
            <option value="hierarchical">Hierarchical Clustering</option>
          </Select>
        </FormControl>
        
        <FormControl>
          <FormLabel>Number of Clusters</FormLabel>
          <NumberInput 
            min={2} 
            max={20} 
            value={nClusters} 
            onChange={(_, value) => setNClusters(value)}
            isDisabled={loading || algorithm === 'dbscan'}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        
        <Button 
          colorScheme="blue" 
          onClick={handleSegmentation} 
          isLoading={loading}
          loadingText="Segmenting"
          alignSelf="flex-end"
        >
          Run Segmentation
        </Button>
      </Stack>
      
      {loading && (
        <Box textAlign="center" my={8}>
          <Spinner size="xl" />
          <Text mt={4}>Analyzing prospect data and creating segments...</Text>
        </Box>
      )}
      
      {segmentationResults && (
        <Box mt={6}>
          <Heading size="md" mb={4}>Segmentation Results</Heading>
          <Box height="400px" mb={6}>
            {renderScatterPlot()}
          </Box>
          {renderSegmentStats()}
        </Box>
      )}
    </Box>
  );
};

export default ProspectSegmentation; 