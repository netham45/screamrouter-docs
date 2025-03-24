import React from 'react';
import { Box, Heading, Flex, Icon, useColorModeValue } from '@chakra-ui/react';

const DocSection = ({ title, children, icon }) => {
  return (
    <Box mb={10} p={6} bg={useColorModeValue('white', 'gray.700')} shadow="md" borderRadius="md">
      <Flex mb={6} align="center">
        {icon && (
          <Box mr={4} color="brand.500">
            <Icon as={icon} boxSize={6} />
          </Box>
        )}
        <Heading as="h2" size="lg">
          {title}
        </Heading>
      </Flex>
      {children}
    </Box>
  );
};

export default DocSection;