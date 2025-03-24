import React from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  Button, 
  Container, 
  VStack, 
  Image, 
  useColorModeValue 
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

function NotFound() {
  return (
    <Container maxW="3xl" centerContent py={20}>
      <VStack spacing={8} textAlign="center">
        <Heading
          as="h1"
          size="2xl"
          bgGradient="linear(to-r, brand.400, brand.600)"
          backgroundClip="text"
        >
          404 - Page Not Found
        </Heading>
        
        <Box>
          <Image
            src="/images/sound-waves.svg"
            alt="Sound waves illustration"
            maxW="200px"
            opacity="0.5"
            fallback={
              <Box 
                width="200px" 
                height="200px" 
                bg={useColorModeValue('gray.100', 'gray.700')} 
                borderRadius="md" 
                display="flex" 
                alignItems="center" 
                justifyContent="center"
              >
                <Text color={useColorModeValue('gray.500', 'gray.400')}>
                  404
                </Text>
              </Box>
            }
          />
        </Box>
        
        <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.400')}>
          Sorry, the page you're looking for seems to have gone silent.
        </Text>
        
        <Text color={useColorModeValue('gray.600', 'gray.400')}>
          The audio route to this page might be disabled or the page doesn't exist.
        </Text>
        
        <Button
          as={RouterLink}
          to="/"
          colorScheme="brand"
          size="lg"
          fontWeight="bold"
          mt={4}
        >
          Go back to home
        </Button>
      </VStack>
    </Container>
  );
}

export default NotFound;