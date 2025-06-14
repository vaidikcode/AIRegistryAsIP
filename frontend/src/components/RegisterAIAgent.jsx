import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useToast,
  Container,
  Heading,
  Text,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import axios from 'axios';

const RegisterAIAgent = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    metadata: '',
    ownerAddress: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Parse metadata if it's a JSON string
      let metadata = {};
      try {
        metadata = JSON.parse(formData.metadata);
      } catch (e) {
        metadata = { additionalInfo: formData.metadata };
      }

      const response = await axios.post('http://localhost:3001/api/register-ai-agent', {
        ...formData,
        metadata
      });

      toast({
        title: 'AI Agent Registered',
        description: `Successfully registered with IP Asset ID: ${response.data.ipAssetId}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Reset form
      setFormData({
        name: '',
        description: '',
        metadata: '',
        ownerAddress: '',
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to register AI agent');
      toast({
        title: 'Registration Failed',
        description: err.response?.data?.details || 'An error occurred while registering the AI agent',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading as="h1" size="xl" mb={2}>
            Register AI Agent as IP
          </Heading>
          <Text color="gray.600">
            Register your AI agent as an Intellectual Property asset using Story Protocol
          </Text>
        </Box>

        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}

        <Box as="form" onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>AI Agent Name</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter AI agent name"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your AI agent"
                rows={4}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Metadata (JSON)</FormLabel>
              <Textarea
                name="metadata"
                value={formData.metadata}
                onChange={handleChange}
                placeholder='{"capabilities": ["text-generation", "image-analysis"], "model": "GPT-4"}'
                rows={4}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Owner Address</FormLabel>
              <Input
                name="ownerAddress"
                value={formData.ownerAddress}
                onChange={handleChange}
                placeholder="Enter Ethereum address"
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              width="full"
              isLoading={isLoading}
              loadingText="Registering..."
            >
              Register AI Agent
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default RegisterAIAgent; 