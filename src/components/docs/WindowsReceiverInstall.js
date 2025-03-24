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
        The Windows Scream Receiver allows you to play audio from ScreamRouter on any Windows PC.
        This receiver will play back the audio stream through your Windows audio system.
      </Text>
      
      <DocSection title="Windows Receiver Installation" icon={FaHeadphones}>
        <Alert status="info" borderRadius="md" mb={6}>
          <AlertIcon />
          <Box>
            <Text fontWeight="semibold">What is the Windows Scream Receiver?</Text>
            <Text>
              The Windows Scream Receiver is a lightweight application that receives Scream audio streams and plays them
              through Windows audio devices. It can receive streams directly from ScreamRouter or other Scream-compatible
              senders.
            </Text>
          </Box>
        </Alert>
        
        <Heading as="h3" size="md" mb={3}>Installation</Heading>
        <Text mb={3}>
          The Windows Scream Receiver can be installed as a system service for automatic startup:
        </Text>
        
        <List as="ol" styleType="decimal" spacing={2} ml={5} mb={4}>
          <ListItem>Download the latest release from <Link color="brand.500" href="https://github.com/netham45/windows-scream-receiver" isExternal>Windows Scream Receiver</Link></ListItem>
          <ListItem>Extract the ZIP file to a folder of your choice</ListItem>
          <ListItem>Run <Code>install_task.bat</Code> with administrator privileges</ListItem>
          <ListItem>When prompted, enter the port to listen on (default is 4010)
            <Text fontSize="sm" fontStyle="italic" mt={1}>
              This will be the active port for multicast streams on group 239.255.77.77 and unicast streams
              on local interfaces on the selected port
            </Text>
          </ListItem>
        </List>
        
        <Alert status="warning" borderRadius="md" mb={6}>
          <AlertIcon />
          The installation scripts require administrative privileges in order for the app to set its
          priority level to Realtime for optimal audio performance.
        </Alert>
        
        <Heading as="h3" size="md" mb={3}>Manual Execution</Heading>
        <Text mb={3}>
          If you prefer to run the receiver manually rather than as a service:
        </Text>
        
        <Code p={3} borderRadius="md" display="block" whiteSpace="pre" my={2}>
{`ScreamReceiver.exe [Port=4010]`}
        </Code>
        
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