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
  Image,
  Code,
  Alert,
  AlertIcon
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

      <Text fontSize="lg" mb={4}>
        Whether you're setting up a whole-home audio system, streaming music to multiple rooms, or just want an
        easier way to manage your audio routing, ScreamRouter Windows Desktop delivers a polished experience with
        professional-grade features in a user-friendly package. The Windows desktop experience now ships inside the
        main ScreamRouter installation, so a standard Windows install automatically includes the native interface,
        ScreamSender, and ScreamReceiver tools.
      </Text>

      <Alert status="success" mb={8}>
        <AlertIcon />
        Installing ScreamRouter on Windows—whether via `pip install screamrouter` or by downloading the
        Windows standalone executable from the Downloads page—automatically enables the Windows Desktop
        experience. No extra installers required.
      </Alert>
      
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
            Experience seamless audio control with a sleek, modern interface
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
        
        <Heading as="h3" size="md" mb={3}>Installation Steps</Heading>
        <List as="ol" styleType="decimal" spacing={2} ml={5} mb={4}>
          <ListItem>
            Install the main ScreamRouter package on Windows using your preferred method:
            <List ml={5} spacing={1} styleType="disc">
              <ListItem>
                <Text as="span" fontWeight="semibold">pip:</Text> Run <Code>pip install screamrouter</Code> from an elevated PowerShell or Command Prompt session
              </ListItem>
              <ListItem>
                <Text as="span" fontWeight="semibold">Standalone:</Text> Download the Windows executable from the <Link as={RouterLink} to="/downloads" color="brand.500">Downloads page</Link> and place it somewhere convenient
              </ListItem>
            </List>
          </ListItem>
          <ListItem>Launch ScreamRouter from the downloaded .exe or by running <Code>python -m screamrouter</Code> in your terminal</ListItem>
          <ListItem>The Windows desktop window and tray icon appear automatically the first time ScreamRouter runs on Windows</ListItem>
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
      </DocSection>
    </Box>
  );
}

export default WindowsAppInstall;
