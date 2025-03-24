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
  Image
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaChevronRight, FaWindows } from 'react-icons/fa';
import DocSection from './DocSection';

function WindowsAppInstall() {
  return (
    <Box>
      <Breadcrumb spacing="8px" separator={<FaChevronRight color="gray.500" />} mb={8}>
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to="/docs">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Windows Desktop App Installation</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      
      <Heading as="h1" size="xl" mb={6}>
        ScreamRouter Windows Desktop App
      </Heading>
      
      <Text fontSize="lg" mb={8}>
        ScreamRouter Windows Desktop is a C# application that provides a desktop interface for controlling ScreamRouter.
        It runs in the system tray and provides quick access to control your audio routing.
      </Text>
      
      <DocSection title="Windows Installation" icon={FaWindows}>
        <Box mb={8}>
          <Image 
            src="/images/screamrouter/windows-desktop-screenshot.png" 
            alt="ScreamRouter Windows App" 
            height="300px"
            mx="auto"
            mb={4}
          />
          <Text align="center" fontStyle="italic" mb={8}>
            ScreamRouter Windows Desktop gives you convenient access to the ScreamRouter interface and media controls
          </Text>
        </Box>
        
        <Heading as="h3" size="md" mb={3}>Prerequisites</Heading>
        <List spacing={2} styleType="disc" ml={5} mb={4}>
          <ListItem>Windows 10 or later</ListItem>
          <ListItem>.NET 8.0 or later</ListItem>
          <ListItem>Microsoft Edge WebView2 Runtime</ListItem>
          <ListItem>A running ScreamRouter instance (on the same machine or network)</ListItem>
        </List>
        
        <Heading as="h3" size="md" mb={3}>Installation Steps</Heading>
        <List as="ol" styleType="decimal" spacing={2} ml={5} mb={4}>
          <ListItem>Download the latest release from the <Link color="brand.500" href="https://github.com/netham45/screamrouter-windows-desktop/releases/latest" isExternal>ScreamRouter Windows App</Link> page</ListItem>
          <ListItem>Run the installer and follow the on-screen instructions</ListItem>
          <ListItem>After installation, ScreamRouter will appear in your Start Menu</ListItem>
          <ListItem>On first launch, you'll need to configure the URL of your ScreamRouter server</ListItem>
        </List>
        
        <Heading as="h3" size="md" mb={3}>Features</Heading>
        <List spacing={2} styleType="disc" ml={5} mb={4}>
          <ListItem><Text fontWeight="semibold">Notification Area Icon</Text> - Access ScreamRouter from the system tray with a context menu for quick controls</ListItem>
          <ListItem><Text fontWeight="semibold">Global Media Key Support</Text> - Control playback using your keyboard's media keys</ListItem>
          <ListItem><Text fontWeight="semibold">Start Menu Integration</Text> - Pin to Start for easy access</ListItem>
          <ListItem><Text fontWeight="semibold">Visual Design</Text> - Modern transparent background with blur effect</ListItem>
        </List>
        
        <Heading as="h3" size="md" mb={3}>Configuration</Heading>
        <Text>
          After installation, you need to configure the app to connect to your ScreamRouter instance:
        </Text>
        <List as="ol" styleType="decimal" spacing={2} ml={5} mt={2}>
          <ListItem>Right-click the ScreamRouter icon in the system tray</ListItem>
          <ListItem>Select "Settings" from the context menu</ListItem>
          <ListItem>Enter the URL to your ScreamRouter server (e.g., "https://192.168.1.100")</ListItem>
          <ListItem>Click "Save" to apply the settings</ListItem>
        </List>
      </DocSection>
    </Box>
  );
}

export default WindowsAppInstall;