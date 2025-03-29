import React from 'react';
import {
  Box,
  Text,
  Heading,
  List,
  ListItem,
  Link,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Code,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaChevronRight, FaWindows, FaVolumeUp } from 'react-icons/fa';
import DocSection from './DocSection';

function WindowsSenderInstall() {
  return (
    <Box>
      <Breadcrumb spacing="8px" separator={<FaChevronRight color="gray.500" />} mb={8}>
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to="/docs">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Windows Sender Installation</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      
      <Heading as="h1" size="xl" mb={6}>
        Windows Scream Sender Installation
      </Heading>
      
      <Text fontSize="lg" mb={8}>
        ScreamSender functionality is now integrated into the ScreamRouter Windows Desktop app. This provides a convenient
        way to stream audio from your Windows PC to ScreamRouter with a user-friendly interface and configuration options.
      </Text>
      
      <DocSection title="Windows Sender Installation" icon={FaVolumeUp}>
        <Alert status="info" borderRadius="md" mb={6}>
          <AlertIcon />
          <Box>
            <Text fontWeight="semibold">Integrated with Windows Desktop App</Text>
            <Text>
              ScreamSender is now built into the ScreamRouter Windows Desktop app, providing a seamless audio streaming
              experience with an easy-to-use interface. The standalone sender is no longer required.
            </Text>
          </Box>
        </Alert>

        <Text mb={4}>
          To use ScreamSender functionality:
        </Text>

        <List as="ol" styleType="decimal" spacing={2} ml={5} mb={4}>
          <ListItem>Install the ScreamRouter Windows Desktop app from the Downloads page</ListItem>
          <ListItem>Open the app's settings from the system tray icon</ListItem>
          <ListItem>Configure the ScreamSender settings:
            <List ml={4} mt={1} spacing={1} styleType="circle">
              <ListItem><Text fontWeight="medium">Enable audio transmission</Text></ListItem>
              <ListItem><Text fontWeight="medium">Set destination IP and port</Text></ListItem>
              <ListItem><Text fontWeight="medium">Configure multicast mode if needed</Text></ListItem>
            </List>
          </ListItem>
        </List>

        <Alert status="info" mb={6}>
          <AlertIcon />
          For detailed instructions on using the integrated ScreamSender, please refer to the <Link as={RouterLink} to="/docs/windows-app" color="brand.500">Windows Desktop App documentation</Link>.
        </Alert>
        
        <Heading as="h3" size="md" mb={3}>Integration with ScreamRouter</Heading>
        <Text mb={3}>
          Once the sender is running, ScreamRouter should automatically detect it as a new source.
          If not, you can manually add it:
        </Text>
        
        <List as="ol" styleType="decimal" spacing={2} ml={5} mb={4}>
          <ListItem>In the ScreamRouter web interface, go to the Sources tab</ListItem>
          <ListItem>Click "Add Source"</ListItem>
          <ListItem>Enter a name for your source (e.g., "Windows PC")</ListItem>
          <ListItem>Set the IP address to the IP of your Windows PC</ListItem>
          <ListItem>Save the source</ListItem>
          <ListItem>Create a route to connect this source to your desired sink</ListItem>
        </List>
        
        <Heading as="h3" size="md" mb={3}>Troubleshooting</Heading>
        <List spacing={2} styleType="disc" ml={5}>
          <ListItem><Text fontWeight="semibold">No sound:</Text> Ensure the ScreamSender is running with the correct IP and port. Check your Windows volume mixer to ensure the application is not muted.</ListItem>
          <ListItem><Text fontWeight="semibold">Audio quality issues:</Text> Administrator privileges allow the application to run at a higher priority, which can improve audio quality.</ListItem>
          <ListItem><Text fontWeight="semibold">Firewall issues:</Text> Make sure Windows Firewall is not blocking the application. You might need to add an exception for UDP traffic on the configured port.</ListItem>
        </List>
      </DocSection>
    </Box>
  );
}

export default WindowsSenderInstall;
