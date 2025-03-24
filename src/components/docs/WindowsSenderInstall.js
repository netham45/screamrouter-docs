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
        The Windows Scream Sender is a usermode application that captures audio from a Windows computer
        and sends it to ScreamRouter. This allows you to use any Windows PC as an audio source without
        installing a virtual audio driver.
      </Text>
      
      <DocSection title="Windows Sender Installation" icon={FaVolumeUp}>
        <Alert status="info" borderRadius="md" mb={6}>
          <AlertIcon />
          <Box>
            <Text fontWeight="semibold">What is ScreamSender?</Text>
            <Text>
              ScreamSender is a usermode alternative to the Windows Scream driver that sends audio over the network.
              It implements the UDP protocol from the Scream Windows Audio driver and is intended to be used with ScreamRouter.
              It works by capturing audio to an existing sound card instead of providing its own.
            </Text>
          </Box>
        </Alert>
        
        <Heading as="h3" size="md" mb={3}>Desktop Tool (Recommended Method)</Heading>
        <Text mb={3}>
          The desktop tool is the easiest way to set up Scream streaming on Windows.
        </Text>
        
        <List as="ol" styleType="decimal" spacing={2} ml={5} mb={4}>
          <ListItem>Download the desktop tool from <Link color="brand.500" href="https://github.com/netham45/windows-scream-sender" isExternal>Windows Scream Sender</Link></ListItem>
          <ListItem>Run <Code>install_tool.bat</Code> and allow it to elevate to administrator to create a service under your user</ListItem>
          <ListItem>When prompted, enter:
            <List ml={4} mt={1} spacing={1} styleType="circle">
              <ListItem><Text fontWeight="medium">IP:</Text> Your ScreamRouter IP address</ListItem>
              <ListItem><Text fontWeight="medium">Port:</Text> The port configured in ScreamRouter (default is 16401)</ListItem>
              <ListItem><Text fontWeight="medium">Multicast:</Text> Choose 'No' for direct connection to ScreamRouter</ListItem>
            </List>
          </ListItem>
        </List>
        
        <Alert status="warning" borderRadius="md" mb={6}>
          <AlertIcon />
          Administrator access is required to allow the tool to set itself as real-time priority for better audio performance.
        </Alert>
        
        <Heading as="h3" size="md" mb={3}>Manual Installation</Heading>
        <Text mb={3}>
          If you prefer to run the sender manually:
        </Text>
        
        <List as="ol" styleType="decimal" spacing={2} ml={5} mb={4}>
          <ListItem>Download the latest release from <Link color="brand.500" href="https://github.com/netham45/windows-scream-sender/releases" isExternal>releases page</Link></ListItem>
          <ListItem>Extract the ZIP file to a folder of your choice</ListItem>
          <ListItem>Run ScreamSender with the appropriate parameters:
            <Code p={3} borderRadius="md" display="block" whiteSpace="pre" my={2}>
{`ScreamSender.exe <IP> [Port=16401] [-m]

Examples:
ScreamSender.exe 192.168.1.100 16401    # Direct to ScreamRouter
ScreamSender.exe 239.255.77.77 4010 -m  # Multicast (compatible with default Scream receivers)`}
            </Code>
          </ListItem>
        </List>
        
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