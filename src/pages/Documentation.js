import React from 'react';
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Divider,
  Link,
  List,
  ListItem,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { Link as RouterLink, Routes, Route, useLocation } from 'react-router-dom';

// Import documentation components
import DocsOverview from '../components/docs/DocsOverview';
import ScreamRouterInstall from '../components/docs/ScreamRouterInstall';
import WindowsAppInstall from '../components/docs/WindowsAppInstall';
import ESP32Install from '../components/docs/ESP32Install';
import WindowsSenderInstall from '../components/docs/WindowsSenderInstall';
import WindowsReceiverInstall from '../components/docs/WindowsReceiverInstall';
import LinuxReceiverInstall from '../components/docs/LinuxReceiverInstall';
import RasPiZeroSenderInstall from '../components/docs/RasPiZeroSenderInstall';
import DockerSourcesDoc from '../components/docs/DockerSourcesDoc';
import RTPSourceConfig from '../components/docs/RTPSourceConfig';
import ApiDocumentation from '../components/docs/ApiDocumentation';
import ConfigurationDoc from '../components/docs/ConfigurationDoc';
import UIGuide from '../components/docs/UIGuide';
import HomeAssistantDoc from '../components/docs/HomeAssistantDoc';
import VNCDoc from '../components/docs/VNCDoc';
import PluginsDoc from '../components/docs/PluginsDoc';
import TechnicalDoc from '../components/docs/TechnicalDoc';
import MP3StreamDoc from '../components/docs/MP3StreamDoc';
import AutoconfigDoc from '../components/docs/AutoconfigDoc';
// New documentation components
import ScreamSourceDoc from '../components/docs/ScreamSourceDoc';
import RTPSourceDoc from '../components/docs/RTPSourceDoc';
import CommandReceiverDoc from '../components/docs/CommandReceiverDoc';
import WindowsAppDoc from '../components/docs/WindowsAppDoc';
import ESP32Doc from '../components/docs/ESP32Doc';
import DockerDoc from '../components/docs/DockerDoc';
import LinuxReceiverDoc from '../components/docs/LinuxReceiverDoc';
import AndroidReceiverDoc from '../components/docs/AndroidReceiverDoc';
// New protocol documentation
import WebRTCDoc from '../components/docs/WebRTCDoc';
import SAPDoc from '../components/docs/SAPDoc';
import WindowsCompatibilityDoc from '../components/docs/WindowsCompatibilityDoc';
import AlsaCompatibilityDoc from '../components/docs/AlsaCompatibilityDoc';
import PulseAudioCompatibilityDoc from '../components/docs/PulseAudioCompatibilityDoc';

// Function to render appropriate content based on path
function DocRouteContent() {
  const location = useLocation();
  const path = location.pathname.split('/').pop();
  
  switch(path) {
    case 'api':
      return <ApiDocumentation />;
    case 'install-screamrouter':
      return <ScreamRouterInstall />;
    case 'install-windows-app':
      return <WindowsAppInstall />;
    case 'install-esp32':
      return <ESP32Install />;
    case 'install-windows-sender':
      return <WindowsSenderInstall />;
    case 'install-windows-receiver':
      return <WindowsReceiverInstall />;
    case 'install-linux-receiver':
    
    
    return <LinuxReceiverInstall />;
    case 'install-rpi-sender':
      return <RasPiZeroSenderInstall />;
    case 'docker-sources':
      return <DockerSourcesDoc />;
    case 'rtp-configuration':
      return <RTPSourceConfig />;
    case 'mp3-stream':
      return <MP3StreamDoc />;
    case 'configuration':
      return <ConfigurationDoc />;
    case 'ui':
      return <UIGuide />;
    case 'homeassistant':
      return <HomeAssistantDoc />;
    case 'vnc':
      return <VNCDoc />;
    case 'plugins':
      return <PluginsDoc />;
    case 'processor':
      return <TechnicalDoc />;
    case 'autoconfig':
      return <AutoconfigDoc />;
    // New document routes
    case 'scream-source':
      return <ScreamSourceDoc />;
    case 'rtp-source':
      return <RTPSourceDoc />;
    case 'command_receiver':
      return <CommandReceiverDoc />;
    case 'windows-app':
      return <WindowsAppDoc />;
    case 'esp32':
      return <ESP32Doc />;
    case 'docker':
      return <DockerDoc />;
    case 'linux-receiver':
      return <LinuxReceiverDoc />;
    case 'raspberry-pi':
      return <LinuxReceiverDoc />;
    case 'android-receiver':
      return <AndroidReceiverDoc />;
    case 'windows-compatibility':
      return <WindowsCompatibilityDoc />;
    case 'alsa-compatibility':
      return <AlsaCompatibilityDoc />;
    case 'pulseaudio-compatibility':
      return <PulseAudioCompatibilityDoc />;
    // New protocol documentation routes
    case 'webrtc':
      return <WebRTCDoc />;
    case 'sap':
      return <SAPDoc />;
    default:
      return <DocsOverview />;
  }
}

// Main Documentation component
function Documentation() {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const sidebarBg = useColorModeValue('white', 'gray.900');
  
  // Recursive component to render sidebar links
  function DocLinks({ links, level = 0 }) {
    const location = useLocation();
    const activeLinkColor = useColorModeValue('brand.600', 'brand.300');
    const hoverBg = useColorModeValue('gray.100', 'gray.700');
    
    return (
      <List spacing={1} ml={level > 0 ? 4 : 0}>
        {links.map((link, idx) => (
          <ListItem key={`${link.title}-${idx}`}>
            {link.path !== undefined ? (
              <Link
                as={RouterLink}
                to={`/docs/${link.path}`}
                display="block"
                py={1}
                px={2}
                rounded="md"
                fontWeight={location.pathname === `/docs/${link.path}` ? 'semibold' : 'normal'}
                color={location.pathname === `/docs/${link.path}` ? activeLinkColor : 'inherit'}
                _hover={{ bg: hoverBg, textDecoration: 'none' }}
              >
                {link.title}
              </Link>
            ) : (
              <>
                <Text 
                  fontWeight="semibold" 
                  mb={1} 
                  mt={level === 0 && idx !== 0 ? 4 : 0}
                >
                  {link.title}
                </Text>
                {link.children && <DocLinks links={link.children} level={level + 1} />}
              </>
            )}
          </ListItem>
        ))}
      </List>
    );
  }

  return (
    <Container maxW="container.xl" py={5}>
      <Grid templateColumns={{ base: '1fr', md: '250px 1fr' }} gap={10}>
        <GridItem>
          <Box
            position="sticky"
            top="2.5vh"
            overflowY={{ base: 'auto', md: 'auto' }}
            maxH="95vh"
            pr={2}
            bg={sidebarBg}
            p={4}
            borderRadius="md"
            shadow="sm"
          >
            <Heading size="md" mb={4}>Documentation</Heading>
            <Divider mb={4} />
            <DocLinks links={[
              { title: 'Overview', path: '' },
              { title: 'API Reference', path: 'api' },
              { title: 'Installation Guides', children: [
                { title: 'ScreamRouter', path: 'install-screamrouter' },
                { title: 'Windows Desktop App', path: 'install-windows-app' },
                { title: 'ESP32 Device', path: 'install-esp32' },
                { title: 'Windows Sender', path: 'install-windows-sender' },
                { title: 'Windows Receiver', path: 'install-windows-receiver' },
                { title: 'Linux/Raspberry Pi Receiver', path: 'install-linux-receiver' },
                { title: 'Raspberry Pi Zero RTP Sender', path: 'install-rpi-sender' },
                { title: 'Docker Audio Sources', path: 'docker-sources' },
                { title: 'RTP Audio Streaming', path: 'rtp-configuration' },
                { title: 'MP3 Stream URLs', path: 'mp3-stream' }
              ]},
              { title: 'Audio Sources', children: [
                { title: 'Scream Sources', path: 'scream-source' },
                { title: 'RTP Sources', path: 'rtp-source' }
              ]},
              { title: 'User Guides', children: [
                { title: 'Configuration', path: 'configuration' },
                { title: 'UI Guide', path: 'ui' },
                { title: 'Command Receiver', path: 'command_receiver' }
              ]},
              { title: 'Platforms', children: [
                { title: 'Windows App', path: 'windows-app' },
                { title: 'Linux/Raspberry Pi', path: 'linux-receiver' },
                { title: 'Docker', path: 'docker' },
                { title: 'ESP32', path: 'esp32' },
                { title: 'Android', path: 'android-receiver' }
              ]},
              { title: 'Compatibility', children: [
                { title: 'Windows Audio', path: 'windows-compatibility' },
                { title: 'ALSA Audio', path: 'alsa-compatibility' },
                { title: 'PulseAudio', path: 'pulseaudio-compatibility' }
              ]},
              { title: 'Streaming Protocols', children: [
                { title: 'WebRTC Streaming', path: 'webrtc' },
                { title: 'SAP Discovery', path: 'sap' },
                { title: 'mDNS Autoconfiguration', path: 'autoconfig' }
              ]},
              { title: 'Integration', children: [
                { title: 'Home Assistant', path: 'homeassistant' },
                { title: 'VNC', path: 'vnc' }
              ]},
              { title: 'Advanced Topics', children: [
                { title: 'Plugins', path: 'plugins' },
                { title: 'Technical Details', path: 'processor' }
              ]}
            ]} />
          </Box>
        </GridItem>
        <GridItem bg={bgColor} p={6} borderRadius="md" shadow="sm">
          <Routes>
            <Route path="*" element={<DocRouteContent />} />
          </Routes>
        </GridItem>
      </Grid>
    </Container>
  );
}

export default Documentation;
