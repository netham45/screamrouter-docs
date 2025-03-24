import React from 'react';
import { Box, Heading, Text, Flex, Icon } from '@chakra-ui/react';

const FeatureCard = ({ title, description, icon }) => {
  return (
    <Box p={5} borderWidth="1px" borderRadius="lg" shadow="sm">
      <Flex align="center" mb={3}>
        <Box color="brand.500" mr={3}>
          <Icon as={icon} boxSize={5} />
        </Box>
        <Heading as="h3" size="md">
          {title}
        </Heading>
      </Flex>
      <Text>{description}</Text>
    </Box>
  );
};

export default FeatureCard;