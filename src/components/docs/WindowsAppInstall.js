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
      
      <Text fontSize="lg" mb={4}>
        Transform your Windows PC into a powerful audio streaming hub with ScreamRouter Windows Desktop. This elegant
        all-in-one solution brings together everything you need for seamless audio control and streaming.
      </Text>

      <Text fontSize="lg" mb={8}>
        Whether you're setting up a whole-home audio system, streaming music to multiple rooms, or just want an
        easier way to manage your audio routing, ScreamRouter Windows Desktop delivers a polished experience with
        professional-grade features in a user-friendly package.
      </Text>
      
      <DocSection title="The Ultimate Audio Control Center" icon={FaWindows}>
        <Box mb={8}>
          <Image 
            src="/images/screamrouter/windows-desktop-screenshot.png" 
            alt="ScreamRouter Windows App" 
            height="300px"
            mx="auto"
            mb={4}
          />
          <Text align="center" fontStyle="italic" mb={8}>
            Experience seamless audio control with our sleek, modern interface
          </Text>
        </Box>

        <Heading as="h3" size="md" mb={3}>Why Choose ScreamRouter Windows Desktop?</Heading>
        <List spacing={3} styleType="none" ml={0} mb={6}>
          <ListItem>
            <Text fontWeight="semibold" fontSize="lg">🎵 Complete Audio Control</Text>
            <Text>Stream audio anywhere in your home, control playback with media keys, and manage everything from one elegant interface.</Text>
          </ListItem>
          <ListItem>
            <Text fontWeight="semibold" fontSize="lg">🔄 Built-in Audio Streaming</Text>
            <Text>Send and receive high-quality audio streams without additional software. Perfect for multi-room audio setups.</Text>
          </ListItem>
          <ListItem>
            <Text fontWeight="semibold" fontSize="lg">⚡ Always Ready</Text>
            <Text>Quick access from the system tray, automatic updates, and seamless integration with Windows make it effortless to use.</Text>
          </ListItem>
        </List>
        
        <Heading as="h3" size="md" mb={3}>Ready to Get Started?</Heading>
        <Text mb={4}>
          Setting up ScreamRouter Windows Desktop is quick and easy. Here's what you'll need:
        </Text>
        
        <List spacing={2} styleType="disc" ml={5} mb={6}>
          <ListItem><Text as="span" fontWeight="semibold">Windows 10 or later</Text> - Experience the full power of modern Windows</ListItem>
          <ListItem><Text as="span" fontWeight="semibold">.NET 8.0 or later</Text> - For optimal performance and security</ListItem>
          <ListItem><Text as="span" fontWeight="semibold">Microsoft Edge WebView2 Runtime</Text> - Automatically installed if needed</ListItem>
          <ListItem><Text as="span" fontWeight="semibold">ScreamRouter server</Text> - Your audio routing command center</ListItem>
        </List>
        
        <Heading as="h3" size="md" mb={3}>Installation Steps</Heading>
        <List as="ol" styleType="decimal" spacing={2} ml={5} mb={4}>
          <ListItem>Download the latest release from the <Link color="brand.500" href="https://github.com/netham45/screamrouter-windows-desktop/releases/latest" isExternal>ScreamRouter Windows App</Link> page</ListItem>
          <ListItem>Run the installer and follow the on-screen instructions</ListItem>
          <ListItem>After installation, ScreamRouter will appear in your Start Menu</ListItem>
          <ListItem>On first launch, you'll need to configure the URL of your ScreamRouter server</ListItem>
        </List>
        
        <Heading as="h3" size="md" mb={3}>Professional-Grade Features</Heading>
        <List spacing={3} styleType="none" ml={0} mb={6}>
          <ListItem>
            <Text fontWeight="semibold" fontSize="lg">🎮 Intuitive Controls</Text>
            <List ml={5} spacing={2}>
              <ListItem>System tray integration for instant access</ListItem>
              <ListItem>Global media key support for seamless playback control</ListItem>
              <ListItem>Modern, transparent interface with blur effects</ListItem>
            </List>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="semibold" fontSize="lg">🔊 Advanced Audio Streaming</Text>
            <List ml={5} spacing={2}>
              <ListItem>Built-in ScreamSender for high-quality audio transmission</ListItem>
              <ListItem>Integrated ScreamReceiver for flexible audio reception</ListItem>
              <ListItem>Multicast support for whole-home audio distribution</ListItem>
            </List>
          </ListItem>
          
        </List>
        
        <Heading as="h3" size="md" mb={3}>Quick Setup Guide</Heading>
        <Text mb={4}>
          Get up and running in minutes with our streamlined setup process:
        </Text>
        
        <Heading as="h4" size="sm" mb={2}>Basic Setup</Heading>
        <List as="ol" styleType="decimal" spacing={2} ml={5} mb={4}>
          <ListItem>Right-click the ScreamRouter icon in the system tray</ListItem>
          <ListItem>Select "Settings" from the context menu</ListItem>
          <ListItem>Enter the URL to your ScreamRouter server (e.g., "https://192.168.1.100")</ListItem>
          <ListItem>Click "Save" to apply the settings</ListItem>
        </List>

        <Heading as="h4" size="sm" mb={2}>Audio Streaming Setup</Heading>
        <List spacing={2} styleType="disc" ml={5} mb={4}>
          <ListItem><Text fontWeight="semibold">ScreamSender Configuration:</Text>
            <List ml={5} spacing={1}>
              <ListItem>Enable audio transmission</ListItem>
              <ListItem>Set destination IP</ListItem>
              <ListItem>Configure port</ListItem>
              <ListItem>Toggle multicast mode if needed</ListItem>
            </List>
          </ListItem>
          <ListItem><Text fontWeight="semibold">ScreamReceiver Configuration:</Text>
            <List ml={5} spacing={1}>
              <ListItem>Enable audio reception</ListItem>
              <ListItem>Set listening port</ListItem>
            </List>
          </ListItem>
        </List>

        <Heading as="h4" size="sm" mb={2}>Update Settings</Heading>
        <List spacing={2} styleType="disc" ml={5} mb={4}>
          <ListItem>Choose your preferred update mode:
            <List ml={5} spacing={1}>
              <ListItem>Do not check for updates</ListItem>
              <ListItem>Notify when updates are available</ListItem>
              <ListItem>Automatically download and install updates</ListItem>
            </List>
          </ListItem>
        </List>
      </DocSection>
    </Box>
  );
}

export default WindowsAppInstall;
