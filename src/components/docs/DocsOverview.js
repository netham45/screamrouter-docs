import React from 'react';
import {
  Box,
  Heading,
  Text,
  Grid,
  Link,
  Flex,
  Icon,
  OrderedList,
  ListItem,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Badge
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  FaNetworkWired, 
  FaVolumeMute, 
  FaVolumeUp, 
  FaDesktop, 
  FaDocker, 
  FaWindows, 
  FaLinux, 
  FaRaspberryPi, 
  FaMicrochip,
  FaArrowRight,
  FaHeadphones,
  FaHome,
  FaTools,
  FaCode,
  FaCloudDownloadAlt,
  FaBook,
  FaCogs,
  FaSliders,
  FaServer,
  FaChartBar,
  FaWifi
} from 'react-icons/fa';
import DocSection from './DocSection';
import FeatureCard from './FeatureCard';

function DocsOverview() {
  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>
        ScreamRouter Documentation
      </Heading>
      
      <Text fontSize="lg" mb={8}>
        ScreamRouter is a versatile audio routing and management system designed for network audio streaming.
        This documentation provides comprehensive guides for setup, configuration, and advanced features.
        Whether you're building a whole-house audio system or creating a multi-room streaming setup, 
        ScreamRouter offers powerful tools for managing your networked audio environment.
      </Text>
      
      <DocSection title="What is ScreamRouter?" icon={FaNetworkWired}>
        <Text mb={4}>
          ScreamRouter is an application for routing PCM audio between Scream sinks and sources over a network.
          It enables you to create complex audio setups, such as whole-house audio systems, by connecting
          various audio sources to multiple output destinations. ScreamRouter acts as a central hub for all your audio 
          routing needs, with features like volume control, equalization, and synchronized playback across multiple devices.
        </Text>
        
        <Link as={RouterLink} to="/docs/processor" mb={4} display="inline-block">
          <Button rightIcon={<FaArrowRight />} colorScheme="brand" size="sm" mb={6}>
            Read more about the technical details
          </Button>
        </Link>
        
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6} mt={6}>
          <FeatureCard 
            title="Audio Routing" 
            description="Create flexible connections between audio sources and destinations with independent volume control."
            icon={FaVolumeUp} 
          />
          <FeatureCard 
            title="Equalizer" 
            description="18-band equalizer for fine-tuning audio at the source, sink, or route level."
            icon={FaVolumeMute} 
          />
          <FeatureCard 
            title="Multi-Platform" 
            description="Runs on Windows, Linux, Raspberry Pi, ESP32, and in Docker containers."
            icon={FaDesktop} 
          />
          <FeatureCard 
            title="Web Interface" 
            description="Control your entire audio system through an intuitive web dashboard."
            icon={FaNetworkWired} 
          />
          <FeatureCard
            title="Smart Home Integration"
            description="Connect with Home Assistant and other smart home platforms."
            icon={FaHome}
          />
          <FeatureCard
            title="Plugin System"
            description="Extend functionality with custom plugins for advanced users."
            icon={FaTools}
          />
        </Grid>
      </DocSection>
      
      <DocSection title="Core Concepts" icon={FaBook}>
        <Accordion allowToggle defaultIndex={[0]}>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="semibold">
                  Sources
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text mb={3}>
                Sources represent audio inputs to the system. They can be:
              </Text>
              <OrderedList spacing={2} ml={5} mb={3}>
                <ListItem>Individual sources (e.g., a specific computer or device)</ListItem>
                <ListItem>Source groups (collections of individual sources)</ListItem>
                <ListItem>Scream audio sources from Windows virtual machines</ListItem>
                <ListItem>RTP streaming sources</ListItem>
              </OrderedList>
              <Text mb={3}>
                Key properties include name, IP address, volume, equalizer settings, and delay.
              </Text>
              <Flex mt={3}>
                <Link as={RouterLink} to="/docs/scream-source" mr={3}>
                  <Button size="sm" colorScheme="blue" leftIcon={<FaWindows />}>
                    Scream Sources
                  </Button>
                </Link>
                <Link as={RouterLink} to="/docs/rtp-source">
                  <Button size="sm" colorScheme="blue" leftIcon={<FaWifi />}>
                    RTP Sources
                  </Button>
                </Link>
              </Flex>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="semibold">
                  Sinks
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text mb={3}>
                Sinks represent audio outputs from the system. They can be:
              </Text>
              <OrderedList spacing={2} ml={5} mb={3}>
                <ListItem>Individual sinks (e.g., a specific speaker or audio device)</ListItem>
                <ListItem>Sink groups (collections of individual sinks)</ListItem>
                <ListItem>Hardware outputs (USB audio, HDMI, built-in audio)</ListItem>
                <ListItem>Network receivers (Windows, ESP32, Raspberry Pi)</ListItem>
              </OrderedList>
              <Text mb={3}>
                Key properties include name, IP address and port, volume, equalizer settings, delay,
                and audio format settings (bit depth, sample rate, channels).
              </Text>
              <Text mb={3}>
                Supported sample rates: 44100, 48000, 88200, 96000, and 192000 Hz
              </Text>
              <Flex mt={3}>
                <Link as={RouterLink} to="/docs/configuration" mr={3}>
                  <Button size="sm" colorScheme="blue" leftIcon={<FaCogs />}>
                    Sink Configuration
                  </Button>
                </Link>
              </Flex>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="semibold">
                  Routes
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text mb={3}>
                Routes define connections between sources and sinks. A route specifies:
              </Text>
              <OrderedList spacing={2} ml={5} mb={3}>
                <ListItem>A source (individual or group)</ListItem>
                <ListItem>A sink (individual or group)</ListItem>
                <ListItem>Volume adjustment</ListItem>
                <ListItem>Equalizer adjustment (18-band)</ListItem>
                <ListItem>Delay adjustment (for syncing audio across devices)</ListItem>
              </OrderedList>
              <Text mb={3}>
                Routes can be created, modified, and deleted through the web interface or API.
                Advanced routing allows for complex setups like whole-house audio or multi-room configurations.
              </Text>
              <Flex mt={3}>
                <Link as={RouterLink} to="/docs/ui" mr={3}>
                  <Button size="sm" colorScheme="blue" leftIcon={<FaDesktop />}>
                    UI Guide for Routes
                  </Button>
                </Link>
              </Flex>
            </AccordionPanel>
          </AccordionItem>
          
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="semibold">
                  Audio Processing
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text mb={3}>
                ScreamRouter provides several audio processing capabilities:
              </Text>
              <OrderedList spacing={2} ml={5} mb={3}>
                <ListItem>Volume normalization</ListItem>
                <ListItem>18-band equalizer with presets</ListItem>
                <ListItem>Audio delay for synchronization</ListItem>
                <ListItem>Format conversion (sample rate, bit depth, channels)</ListItem>
              </OrderedList>
              <Text mb={3}>
                Processing can be applied at the source, sink, or route level for maximum flexibility.
              </Text>
              <Flex mt={3}>
                <Link as={RouterLink} to="/docs/processor" mr={3}>
                  <Button size="sm" colorScheme="blue" leftIcon={<FaCogs />}>
                    Audio Processing
                  </Button>
                </Link>
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </DocSection>
      
      <DocSection title="Platform Support" icon={FaDesktop}>
        <Text mb={6}>
          ScreamRouter supports a wide range of platforms and can be deployed in various configurations:
        </Text>
        
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
          <Box textAlign="center" p={4} borderWidth="1px" borderRadius="md">
            <Icon as={FaWindows} boxSize={12} color="brand.500" mb={3} />
            <Heading as="h3" size="md" mb={2}>Windows</Heading>
            <Text mb={3}>Desktop application with system tray integration and global media key support. Provides both sender and receiver functionality with a user-friendly interface.</Text>
            <Flex justifyContent="center">
              <Link as={RouterLink} to="/docs/windows-app">
                <Button size="sm" colorScheme="brand" leftIcon={<FaArrowRight />}>Learn More</Button>
              </Link>
            </Flex>
          </Box>
          
          <Box textAlign="center" p={4} borderWidth="1px" borderRadius="md">
            <Icon as={FaLinux} boxSize={12} color="brand.500" mb={3} />
            <Heading as="h3" size="md" mb={2}>Linux/Debian</Heading>
            <Text mb={3}>Command-line and systemd service with web interface access. Ideal for headless operation on servers or media centers. Supports integration with ALSA and PulseAudio.</Text>
            <Flex justifyContent="center">
              <Link as={RouterLink} to="/docs/linux-receiver">
                <Button size="sm" colorScheme="brand" leftIcon={<FaArrowRight />}>Learn More</Button>
              </Link>
            </Flex>
          </Box>
          
          <Box textAlign="center" p={4} borderWidth="1px" borderRadius="md">
            <Icon as={FaDocker} boxSize={12} color="brand.500" mb={3} />
            <Heading as="h3" size="md" mb={2}>Docker</Heading>
            <Text mb={3}>Containerized deployment for easy setup and management. Includes docker-compose files for quick deployment with persistent storage for configurations.</Text>
            <Flex justifyContent="center">
              <Link as={RouterLink} to="/docs/docker">
                <Button size="sm" colorScheme="brand" leftIcon={<FaArrowRight />}>Learn More</Button>
              </Link>
            </Flex>
          </Box>
          
          <Box textAlign="center" p={4} borderWidth="1px" borderRadius="md">
            <Icon as={FaRaspberryPi} boxSize={12} color="brand.500" mb={3} />
            <Heading as="h3" size="md" mb={2}>Raspberry Pi</Heading>
            <Text mb={3}>Optimized for Raspberry Pi with receiver and sender options. Turns any Pi into a networked audio device with minimal configuration. Works with standard audio HATs.</Text>
            <Flex justifyContent="center">
              <Link as={RouterLink} to="/docs/raspberry-pi">
                <Button size="sm" colorScheme="brand" leftIcon={<FaArrowRight />}>Learn More</Button>
              </Link>
            </Flex>
          </Box>
          
          <Box textAlign="center" p={4} borderWidth="1px" borderRadius="md">
            <Icon as={FaMicrochip} boxSize={12} color="brand.500" mb={3} />
            <Heading as="h3" size="md" mb={2}>ESP32</Heading>
            <Text mb={3}>Low-cost microcontroller firmware for wireless audio streaming. Create affordable network speakers using I2S DACs or built-in DAC. Supports OTA updates and web configuration.</Text>
            <Flex justifyContent="center">
              <Link as={RouterLink} to="/docs/esp32">
                <Button size="sm" colorScheme="brand" leftIcon={<FaArrowRight />}>Learn More</Button>
              </Link>
            </Flex>
          </Box>
          
          <Box textAlign="center" p={4} borderWidth="1px" borderRadius="md">
            <Icon as={FaHome} boxSize={12} color="brand.500" mb={3} />
            <Heading as="h3" size="md" mb={2}>Home Assistant</Heading>
            <Text mb={3}>Integration with Home Assistant for smart home control. Create automation routines and control audio from your smart home dashboard.</Text>
            <Flex justifyContent="center">
              <Link as={RouterLink} to="/docs/homeassistant">
                <Button size="sm" colorScheme="brand" leftIcon={<FaArrowRight />}>Learn More</Button>
              </Link>
            </Flex>
          </Box>
        </Grid>
      </DocSection>
      
      <DocSection title="Installation Guides" icon={FaCloudDownloadAlt}>
        <Text mb={6}>
          Select the appropriate installation guide for your setup:
        </Text>
        
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
          <Link as={RouterLink} to="/docs/install-screamrouter">
            <Box p={4} borderWidth="1px" borderRadius="md" _hover={{ bg: "gray.50" }}>
              <Flex align="center">
                <Icon as={FaServer} color="brand.500" mr={3} />
                <Text fontWeight="semibold">ScreamRouter Server</Text>
                <Icon as={FaArrowRight} ml="auto" />
              </Flex>
            </Box>
          </Link>
          <Link as={RouterLink} to="/docs/install-windows-app">
            <Box p={4} borderWidth="1px" borderRadius="md" _hover={{ bg: "gray.50" }}>
              <Flex align="center">
                <Icon as={FaWindows} color="brand.500" mr={3} />
                <Text fontWeight="semibold">ScreamRouter Desktop App</Text>
                <Icon as={FaArrowRight} ml="auto" />
              </Flex>
            </Box>
          </Link>
          <Link as={RouterLink} to="/docs/install-esp32">
            <Box p={4} borderWidth="1px" borderRadius="md" _hover={{ bg: "gray.50" }}>
              <Flex align="center">
                <Icon as={FaMicrochip} color="brand.500" mr={3} />
                <Text fontWeight="semibold">ESP32 Device</Text>
                <Icon as={FaArrowRight} ml="auto" />
              </Flex>
            </Box>
          </Link>
          <Link as={RouterLink} to="/docs/install-raspberry-pi">
            <Box p={4} borderWidth="1px" borderRadius="md" _hover={{ bg: "gray.50" }}>
              <Flex align="center">
                <Icon as={FaRaspberryPi} color="brand.500" mr={3} />
                <Text fontWeight="semibold">Raspberry Pi Installation</Text>
                <Icon as={FaArrowRight} ml="auto" />
              </Flex>
            </Box>
          </Link>
          <Link as={RouterLink} to="/docs/install-windows-sender">
            <Box p={4} borderWidth="1px" borderRadius="md" _hover={{ bg: "gray.50" }}>
              <Flex align="center">
                <Icon as={FaVolumeUp} color="brand.500" mr={3} />
                <Text fontWeight="semibold">Windows Sender</Text>
                <Icon as={FaArrowRight} ml="auto" />
              </Flex>
            </Box>
          </Link>
          <Link as={RouterLink} to="/docs/install-windows-receiver">
            <Box p={4} borderWidth="1px" borderRadius="md" _hover={{ bg: "gray.50" }}>
              <Flex align="center">
                <Icon as={FaHeadphones} color="brand.500" mr={3} />
                <Text fontWeight="semibold">Windows Receiver</Text>
                <Icon as={FaArrowRight} ml="auto" />
              </Flex>
            </Box>
          </Link>
        </Grid>
      </DocSection>
      
      <DocSection title="Getting Started" icon={FaChartBar}>
        <OrderedList spacing={4}>
          <ListItem>
            <Text fontWeight="bold">Choose your platform and download ScreamRouter</Text>
            <Text mb={2}>Select the appropriate version for your system from the <Link as={RouterLink} to="/downloads" color="brand.500">Downloads page</Link>.</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="bold">Install ScreamRouter</Text>
            <Text mb={2}>Follow the installation instructions for your platform in the <Link as={RouterLink} to="/docs/install-screamrouter" color="brand.500">installation guides</Link>.</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="bold">Set up audio sources</Text>
            <Text mb={2}>Configure your audio sources to send audio to ScreamRouter. See the <Link as={RouterLink} to="/docs/scream-source" color="brand.500">Scream source</Link> or <Link as={RouterLink} to="/docs/rtp-source" color="brand.500">RTP source</Link> documentation.</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="bold">Set up audio sinks</Text>
            <Text mb={2}>Configure your output devices to receive audio from ScreamRouter. See the <Link as={RouterLink} to="/docs/configuration" color="brand.500">sink configuration</Link> documentation.</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="bold">Create routes</Text>
            <Text mb={2}>Connect your sources to sinks by creating routes in the ScreamRouter interface. See the <Link as={RouterLink} to="/docs/ui" color="brand.500">UI guide</Link> for step-by-step instructions.</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="bold">Fine-tune your setup</Text>
            <Text mb={2}>Adjust volume, equalizer settings, and delays to optimize your audio experience. See the <Link as={RouterLink} to="/docs/processor" color="brand.500">audio processing</Link> documentation.</Text>
          </ListItem>
        </OrderedList>
      </DocSection>
      
      <DocSection title="Advanced Features" icon={FaTools}>
        <Text mb={6}>
          Explore ScreamRouter's advanced capabilities:
        </Text>
        
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
          <Link as={RouterLink} to="/docs/api">
            <Box p={4} borderWidth="1px" borderRadius="md" _hover={{ bg: "gray.50" }}>
              <Flex align="center">
                <Icon as={FaCode} color="brand.500" mr={3} />
                <Box>
                  <Text fontWeight="semibold">API Documentation</Text>
                  <Text fontSize="sm">Control ScreamRouter programmatically</Text>
                </Box>
                <Icon as={FaArrowRight} ml="auto" />
              </Flex>
            </Box>
          </Link>
          
          <Link as={RouterLink} to="/docs/plugins">
            <Box p={4} borderWidth="1px" borderRadius="md" _hover={{ bg: "gray.50" }}>
              <Flex align="center">
                <Icon as={FaTools} color="brand.500" mr={3} />
                <Box>
                  <Text fontWeight="semibold">Plugin System</Text>
                  <Text fontSize="sm">Extend functionality with custom plugins</Text>
                </Box>
                <Icon as={FaArrowRight} ml="auto" />
              </Flex>
            </Box>
          </Link>
          
          <Link as={RouterLink} to="/docs/homeassistant">
            <Box p={4} borderWidth="1px" borderRadius="md" _hover={{ bg: "gray.50" }}>
              <Flex align="center">
                <Icon as={FaHome} color="brand.500" mr={3} />
                <Box>
                  <Text fontWeight="semibold">Home Assistant Integration</Text>
                  <Text fontSize="sm">Smart home controls for your audio</Text>
                </Box>
                <Icon as={FaArrowRight} ml="auto" />
              </Flex>
            </Box>
          </Link>
          
          <Link as={RouterLink} to="/docs/command_receiver">
            <Box p={4} borderWidth="1px" borderRadius="md" _hover={{ bg: "gray.50" }}>
              <Flex align="center">
                <Icon as={FaServer} color="brand.500" mr={3} />
                <Box>
                  <Text fontWeight="semibold">Command Receiver</Text>
                  <Text fontSize="sm">Remote control via UDP commands</Text>
                </Box>
                <Icon as={FaArrowRight} ml="auto" />
              </Flex>
            </Box>
          </Link>
          
          <Link as={RouterLink} to="/docs/vnc">
            <Box p={4} borderWidth="1px" borderRadius="md" _hover={{ bg: "gray.50" }}>
              <Flex align="center">
                <Icon as={FaDesktop} color="brand.500" mr={3} />
                <Box>
                  <Text fontWeight="semibold">VNC Integration</Text>
                  <Text fontSize="sm">Remote control your audio sources</Text>
                </Box>
                <Icon as={FaArrowRight} ml="auto" />
              </Flex>
            </Box>
          </Link>
          
          <Link as={RouterLink} to="/docs/configuration">
            <Box p={4} borderWidth="1px" borderRadius="md" _hover={{ bg: "gray.50" }}>
              <Flex align="center">
                <Icon as={FaCogs} color="brand.500" mr={3} />
                <Box>
                  <Text fontWeight="semibold">Advanced Configuration</Text>
                  <Text fontSize="sm">Detailed configuration options</Text>
                </Box>
                <Icon as={FaArrowRight} ml="auto" />
              </Flex>
            </Box>
          </Link>
        </Grid>
      </DocSection>
    </Box>
  );
}

export default DocsOverview;