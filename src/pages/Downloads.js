import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Button,
  Link,
  Badge,
  Icon,
  useColorModeValue,
  Alert,
  AlertIcon,
  Divider,
  Code,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  FaDownload, 
  FaGithub, 
  FaDocker, 
  FaWindows, 
  FaLinux, 
  FaApple,
  FaPython,
  FaAndroid,
  FaMicrochip,
  FaRaspberryPi,
  FaDesktop,
  FaExternalLinkAlt
} from 'react-icons/fa';

function Downloads() {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const DownloadCard = ({ icon, title, description, version, links, badge, recommended }) => (
    <Box
      bg={cardBg}
      p={6}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={recommended ? 'brand.500' : borderColor}
      borderStyle={recommended ? 'solid' : 'solid'}
      borderTopWidth={recommended ? '3px' : '1px'}
      position="relative"
      _hover={{ shadow: 'lg' }}
      transition="all 0.3s"
    >
      {recommended && (
        <Badge 
          position="absolute" 
          top="-12px" 
          right="20px" 
          colorScheme="brand"
          px={3}
          py={1}
        >
          RECOMMENDED
        </Badge>
      )}
      <VStack align="stretch" spacing={4}>
        <HStack>
          <Icon as={icon} boxSize={8} color="brand.500" />
          <Box flex="1">
            <Heading size="md">{title}</Heading>
            {version && <Text fontSize="sm" color="gray.500">{version}</Text>}
          </Box>
          {badge && <Badge colorScheme={badge.color}>{badge.text}</Badge>}
        </HStack>
        
        <Text fontSize="sm">{description}</Text>
        
        <VStack spacing={2}>
          {links.map((link, idx) => (
            <Button
              key={idx}
              as={link.external ? Link : RouterLink}
              to={!link.external ? link.url : undefined}
              href={link.external ? link.url : undefined}
              isExternal={link.external}
              width="full"
              size="sm"
              colorScheme={link.primary ? 'brand' : 'gray'}
              variant={link.primary ? 'solid' : 'outline'}
              leftIcon={<FaDownload />}
              rightIcon={link.external ? <FaExternalLinkAlt size={12} /> : undefined}
            >
              {link.text}
            </Button>
          ))}
        </VStack>
      </VStack>
    </Box>
  );

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={4}>
            Downloads
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Get started with ScreamRouter using your preferred installation method
          </Text>
        </Box>

        <Alert status="success" borderRadius="md">
          <AlertIcon />
          <Box>
            <Text fontWeight="bold">Quick Install with pip</Text>
            <Code mt={1}>pip install screamrouter</Code>
          </Box>
        </Alert>

        {/* Main ScreamRouter Installation */}
        <Box>
          <Heading size="lg" mb={4}>ScreamRouter</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            <DownloadCard
              icon={FaWindows}
              title="Standalone Executables"
              description="Standalone Executables for ScreamRouter - No install required"
              links={[
                { text: 'Windows', url: 'https://github.com/netham45/screamrouter/releases/latest/download/ScreamRouter-windows-x64.exe', external: true, primary: true },
                { text: 'Linux x64', url: 'https://github.com/netham45/screamrouter/releases/latest/download/ScreamRouter-linux-x86_64', external: true, primary: true },
                { text: 'Linux ARM', url: 'https://github.com/netham45/screamrouter/releases/latest/download/ScreamRouter-linux-arm64', external: true, primary: true },
              ]}
              badge={{ text: 'EASIEST to start', color: 'green' }}
            />
            <DownloadCard
              icon={FaPython}
              title="Python pip"
              description="Install ScreamRouter directly from PyPI. Supports Windows and Linux with Python 3.10+, can use pip to install updates"
              version="Latest"
              recommended={true}
              links={[
                { text: 'pip install screamrouter', url: '/docs/install-screamrouter', primary: true },
                { text: 'PyPI Page', url: 'https://pypi.org/project/screamrouter/', external: true }
              ]}
              badge={{ text: 'EASIEST To Update', color: 'green' }}
            />

            <DownloadCard
              icon={FaGithub}
              title="Source Code"
              description="Build from source for development or customization. Requires build tools."
              links={[
                { text: 'GitHub Repository', url: 'https://github.com/netham45/screamrouter', external: true, primary: true }
              ]}
              badge={{ text: 'ADVANCED', color: 'purple' }}
            />
          </SimpleGrid>
        </Box>

        <Divider />

        {/* Audio Sources */}
        <Box>
          <Heading size="lg" mb={4}>Audio Sources</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            <DownloadCard
              icon={FaMicrochip}
              title="ESP32 RTP Transceiver"
              description="Versatile ESP32 device supporting USB/S/PDIF input/output with RTP streaming."
              links={[
                { text: 'Web Flasher', url: '/esp32-flasher', primary: true },
                { text: 'Documentation', url: '/docs/esp32' }
              ]}
              badge={{ text: 'HARDWARE', color: 'teal' }}
            />

            <DownloadCard
              icon={FaRaspberryPi}
              title="Raspberry Pi Zero RTP"
              description="Turn a Pi Zero into a USB audio device that streams via RTP protocol."
              links={[
                { text: 'Setup Guide', url: '/docs/install-rpi-sender', primary: true }
              ]}
              badge={{ text: 'RTP', color: 'green' }}
            />

            <DownloadCard
              icon={FaDocker}
              title="Docker Audio Sources"
              description="Run Spotify, Amazon Music, or Firefox in Docker containers."
              links={[
                { text: 'Docker Sources Guide', url: '/docs/docker-sources', primary: true }
              ]}
            />

            <DownloadCard
              icon={FaDesktop}
              title="RTP"
              description="Stream from any RTP app with SAP discovery support."
              links={[
                { text: 'PulseAudio/Pipewire Configuration', url: '/docs/rtp-source', primary: true }
              ]}
              badge={{ text: 'LINUX', color: 'orange' }}
            />

            <DownloadCard
              icon={FaWindows}
              title="Windows Loopback Capture"
              description="Capture Windows audio from output devices with no drivers, just ScreamRouter"
              links={[
                { text: 'Windows System Audio Configuration', url: '/docs/windows-compatibility', primary: true }
              ]}
              badge={{ text: 'Windows', color: 'orange' }}
            />

            <DownloadCard
              icon={FaDesktop}
              title="System Devices"
              description="Use ScreamRouter to capture from System Devices using Alsa or Windows WASAPI, or play back from apps by emulating PulseAudio"
              links={[
                { text: 'Windows System Audio Configuration', url: '/docs/windows-compatibility', primary: true },
                { text: 'Alsa System Audio Configuration', url: '/docs/alsa-compatibility', primary: true },
                { text: 'PulseAudio System Audio Configuration', url: '/docs/pulseaudio-compatibility', primary: true }
              ]}
            />
          </SimpleGrid>
        </Box>

        <Divider />

        {/* Audio Receivers */}
        <Box>
          <Heading size="lg" mb={4}>Audio Receivers</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            <DownloadCard
              icon={FaMicrochip}
              title="ESP32 RTP Transceiver"
              description="Versatile ESP32 device supporting USB/S/PDIF input/output with RTP streaming."
              links={[
                { text: 'Web Flasher', url: '/esp32-flasher', primary: true },
                { text: 'Documentation', url: '/docs/esp32' }
              ]}
              badge={{ text: 'HARDWARE', color: 'teal' }}
            />

            <DownloadCard
              icon={FaDesktop}
              title="Web Browser"
              description="Listen directly in Chrome, Firefox, Safari, or Edge using WebRTC."
              links={[
                { text: 'WebRTC Guide', url: '/docs/webrtc', primary: true }
              ]}
              badge={{ text: 'NO INSTALL', color: 'purple' }}
            />
            <DownloadCard
              icon={FaDesktop}
              title="System Devices"
              description="Play to another ScreamRouter instance configured as a sink and play back to System Devices using Alsa or Windows WASAPI"
              links={[
                { text: 'Windows System Audio Configuration', url: '/docs/windows-compatibility', primary: true },
                { text: 'Alsa System Audio Configuration', url: '/docs/alsa-compatibility', primary: true }
              ]}
            />
          </SimpleGrid>
        </Box>

        <Divider />

        {/* Quick Start */}
        <Alert status="info" borderRadius="md">
          <AlertIcon />
          <VStack align="start" spacing={2}>
            <Text fontWeight="bold">Quick Start Guide</Text>
            <Text fontSize="sm">
              1. Install ScreamRouter server: <Code>pip install screamrouter</Code>
            </Text>
            <Text fontSize="sm">
              2. Run it: <Code>screamrouter</Code>
            </Text>
            <Text fontSize="sm">
              3. Access web interface at <Code>https://localhost</Code> or <Code>https://localhost:8443</Code>
            </Text>
            <Text fontSize="sm">
              4. Follow the tutorial and add audio sources and sinks from the interface
            </Text>
          </VStack>
        </Alert>

        {/* Links */}
        <HStack justify="center" spacing={4}>
          <Button
            as={Link}
            href="https://github.com/netham45/screamrouter"
            isExternal
            leftIcon={<FaGithub />}
            variant="ghost"
          >
            GitHub
          </Button>
          <Button
            as={RouterLink}
            to="/docs"
            variant="ghost"
          >
            Documentation
          </Button>
          <Button
            as={Link}
            href="https://discord.gg/screamrouter"
            isExternal
            variant="ghost"
          >
            Discord
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
}

export default Downloads;
