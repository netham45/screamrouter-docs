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
          <Heading size="lg" mb={4}>ScreamRouter Server</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            <DownloadCard
              icon={FaPython}
              title="Python pip"
              description="Install ScreamRouter directly from PyPI. Supports Windows and Linux with Python 3.10+."
              version="Latest"
              recommended={true}
              links={[
                { text: 'pip install screamrouter', url: '/docs/install-screamrouter', primary: true },
                { text: 'PyPI Page', url: 'https://pypi.org/project/screamrouter/', external: true }
              ]}
              badge={{ text: 'EASIEST', color: 'green' }}
            />

            <DownloadCard
              icon={FaDocker}
              title="Docker"
              description="Run ScreamRouter in a container with automatic SSL certificates and isolation."
              version="netham45/screamrouter:latest"
              links={[
                { text: 'Docker Setup Guide', url: '/docs/docker', primary: true },
                { text: 'Docker Hub', url: 'https://hub.docker.com/r/netham45/screamrouter', external: true }
              ]}
              badge={{ text: 'ISOLATED', color: 'blue' }}
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
          <Heading size="lg" mb={4}>Audio Sources (Senders)</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            <DownloadCard
              icon={FaWindows}
              title="Windows Desktop App"
              description="Stream audio from Windows with system tray integration and auto-discovery."
              version="v1.0"
              links={[
                { text: 'Download Installer', url: 'https://github.com/netham45/screamrouter/releases/latest', external: true, primary: true },
                { text: 'Setup Guide', url: '/docs/install-windows-app' }
              ]}
              badge={{ text: 'WINDOWS', color: 'blue' }}
            />

            <DownloadCard
              icon={FaWindows}
              title="Scream (Windows Driver)"
              description="Virtual audio driver for Windows. Routes all system audio to network."
              links={[
                { text: 'Download Scream', url: 'https://github.com/duncanthrax/scream/releases', external: true, primary: true },
                { text: 'Installation Guide', url: '/docs/install-windows-sender' }
              ]}
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
              icon={FaLinux}
              title="PulseAudio/PipeWire"
              description="Stream from Linux using RTP with SAP discovery support."
              links={[
                { text: 'RTP Configuration', url: '/docs/rtp-source', primary: true }
              ]}
              badge={{ text: 'LINUX', color: 'orange' }}
            />
          </SimpleGrid>
        </Box>

        <Divider />

        {/* Audio Receivers */}
        <Box>
          <Heading size="lg" mb={4}>Audio Receivers (Sinks)</Heading>
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
              icon={FaWindows}
              title="Windows Receiver"
              description="Play network audio on Windows PCs with auto-discovery support."
              links={[
                { text: 'Download', url: 'https://github.com/netham45/screamrouter-windows-receiver/releases', external: true, primary: true },
                { text: 'Setup Guide', url: '/docs/install-windows-receiver' }
              ]}
            />

            <DownloadCard
              icon={FaLinux}
              title="Linux/Raspberry Pi"
              description="Lightweight receiver for Linux systems and Raspberry Pi devices."
              links={[
                { text: 'Installation Guide', url: '/docs/install-linux-receiver', primary: true }
              ]}
              badge={{ text: 'LINUX', color: 'orange' }}
            />

            <DownloadCard
              icon={FaAndroid}
              title="Android App"
              description="Play ScreamRouter audio on Android phones and tablets."
              links={[
                { text: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.screamrouter', external: true, primary: true },
                { text: 'Documentation', url: '/docs/android-receiver' }
              ]}
              badge={{ text: 'MOBILE', color: 'green' }}
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
          </SimpleGrid>
        </Box>

        <Divider />

        {/* System Requirements */}
        <Box bg={cardBg} p={6} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
          <Heading size="md" mb={4}>System Requirements</Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <Box>
              <Text fontWeight="bold" mb={2}>ScreamRouter Server (pip)</Text>
              <UnorderedList fontSize="sm" spacing={1}>
                <ListItem>Python 3.10 or higher</ListItem>
                <ListItem>Windows 10/11 or Linux</ListItem>
                <ListItem>2GB RAM minimum</ListItem>
                <ListItem>Network connectivity</ListItem>
              </UnorderedList>
            </Box>
            <Box>
              <Text fontWeight="bold" mb={2}>ScreamRouter Server (Docker)</Text>
              <UnorderedList fontSize="sm" spacing={1}>
                <ListItem>Docker installed</ListItem>
                <ListItem>Any OS with Docker support</ListItem>
                <ListItem>Host networking for mDNS/multicast</ListItem>
                <ListItem>2GB RAM minimum</ListItem>
              </UnorderedList>
            </Box>
          </SimpleGrid>
        </Box>

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
              3. Access web interface at <Code>https://localhost</Code>
            </Text>
            <Text fontSize="sm">
              4. Add audio sources and sinks from the interface
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
