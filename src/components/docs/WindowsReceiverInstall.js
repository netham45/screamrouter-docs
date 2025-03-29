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
import { FaChevronRight, FaWindows, FaHeadphones } from 'react-icons/fa';
import DocSection from './DocSection';

function WindowsReceiverInstall() {
  return (
    <Box>
      <Breadcrumb spacing="8px" separator={<FaChevronRight color="gray.500" />} mb={8}>
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to="/docs">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Windows Receiver Installation</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      
      <Heading as="h1" size="xl" mb={6}>
        Windows Scream Receiver Installation
      </Heading>
      
      <Text fontSize="lg" mb={8}>
        ScreamReceiver functionality is now integrated into the ScreamRouter Windows Desktop app. This provides a convenient
        way to receive audio streams on your Windows PC with a user-friendly interface and configuration options.
      </Text>
      
      <DocSection title="Windows Receiver Installation" icon={FaHeadphones}>
        <Alert status="info" borderRadius="md" mb={6}>
          <AlertIcon />
          <Box>
            <Text fontWeight="semibold">Integrated with Windows Desktop App</Text>
            <Text>
              ScreamReceiver is now built into the ScreamRouter Windows Desktop app, providing a seamless audio streaming
              experience with an easy-to-use interface. The standalone receiver is no longer required.
            </Text>
          </Box>
        </Alert>

        <Text mb={4}>
          To use ScreamReceiver functionality:
        </Text>

        <List as="ol" styleType="decimal" spacing={2} ml={5} mb={4}>
          <ListItem>Install the ScreamRouter Windows Desktop app from the Downloads page</ListItem>
          <ListItem>Open the app's settings from the system tray icon</ListItem>
          <ListItem>Configure the ScreamReceiver settings:
            <List ml={4} mt={1} spacing={1} styleType="circle">
              <ListItem><Text fontWeight="medium">Enable audio reception</Text></ListItem>
              <ListItem><Text fontWeight="medium">Set listening port (default: 4010)</Text></ListItem>
            </List>
          </ListItem>
        </List>

        <Alert status="info" mb={6}>
          <AlertIcon />
          For detailed instructions on using the integrated ScreamReceiver, please refer to the <Link as={RouterLink} to="/docs/windows-app" color="brand.500">Windows Desktop App documentation</Link>.
        </Alert>
        
        <Heading as="h3" size="md" mb={3}>Integration with ScreamRouter</Heading>
        <Text mb={3}>
          To use the Windows Scream Receiver with ScreamRouter:
        </Text>
        
        <List as="ol" styleType="decimal" spacing={2} ml={5} mb={4}>
          <ListItem>In the ScreamRouter web interface, go to the Sinks tab</ListItem>
          <ListItem>Click "Add Sink"</ListItem>
          <ListItem>Enter a name for your sink (e.g., "Windows PC Speakers")</ListItem>
          <ListItem>Set the IP address to the IP of your Windows PC</ListItem>
          <ListItem>Set the port to match the one you configured during installation (default: 4010)</ListItem>
          <ListItem>Configure other audio settings as needed (bit depth, sample rate, channels)</ListItem>
          <ListItem>Save the sink</ListItem>
          <ListItem>Create a route to connect this sink to your desired audio source</ListItem>
        </List>
        
        <Heading as="h3" size="md" mb={3}>Audio Configuration</Heading>
        <Text mb={3}>
          The Windows Scream Receiver will run the audio through Windows's built-in audio system for
          any conversions required. You can select which audio device to use through Windows sound settings:
        </Text>
        
        <List as="ol" styleType="decimal" spacing={2} ml={5} mb={4}>
          <ListItem>Right-click the speaker icon in the Windows taskbar</ListItem>
          <ListItem>Select "Open Sound settings"</ListItem>
          <ListItem>Choose your preferred output device under "Choose your output device"</ListItem>
        </List>
        
        <Heading as="h3" size="md" mb={3}>Troubleshooting</Heading>
        <List spacing={2} styleType="disc" ml={5}>
          <ListItem><Text fontWeight="semibold">No sound:</Text> Ensure ScreamRouter is properly configured to send audio to your PC's IP address and port.</ListItem>
          <ListItem><Text fontWeight="semibold">Audio quality issues:</Text> Check your network connection. Unstable Wi-Fi can cause audio dropouts.</ListItem>
          <ListItem><Text fontWeight="semibold">Firewall issues:</Text> Make sure Windows Firewall is not blocking the application. You might need to add an exception for UDP traffic on the configured port.</ListItem>
          <ListItem><Text fontWeight="semibold">Service not starting:</Text> Check Windows Task Scheduler to ensure the task is properly configured and not disabled.</ListItem>
        </List>
      </DocSection>
    </Box>
  );
}

export default WindowsReceiverInstall;
