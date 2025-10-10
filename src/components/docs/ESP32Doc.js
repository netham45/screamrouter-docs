import React from 'react';
import {
  Box,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Code,
  Alert,
  AlertIcon,
  VStack,
  HStack,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Link,
  Button,
  Divider,
  SimpleGrid,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import DocSection from './DocSection';
import { FaMicrochip, FaWifi, FaUsb, FaNetworkWired, FaBolt, FaCog } from 'react-icons/fa';

function ESP32Doc() {
  const codeBg = useColorModeValue('gray.50', 'gray.700');
  const cardBg = useColorModeValue('white', 'gray.800');

  const ModeCard = ({ title, icon, input, output, description, color }) => (
    <Box
      bg={cardBg}
      p={4}
      borderRadius="md"
      borderWidth="1px"
      borderColor={useColorModeValue('gray.200', 'gray.600')}
      _hover={{ shadow: 'md' }}
    >
      <HStack mb={2}>
        <Icon as={icon} color={`${color}.500`} boxSize={5} />
        <Text fontWeight="bold">{title}</Text>
      </HStack>
      <VStack align="start" spacing={1} fontSize="sm">
        <Text><strong>Input:</strong> {input}</Text>
        <Text><strong>Output:</strong> {output}</Text>
        <Text color="gray.600">{description}</Text>
      </VStack>
    </Box>
  );

  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>
        ESP32 RTP Audio Transceiver
      </Heading>
      
      <Text fontSize="lg" mb={4}>
        A versatile audio streaming solution for ESP32 that enables high-quality audio transmission over network using RTP protocol. 
        The device can operate in four distinct modes, bridging different audio interfaces (USB/S/PDIF) with network streaming.
      </Text>

      <Alert status="success" mb={6}>
        <AlertIcon />
        <Box>
          <Text fontWeight="bold">Complete Audio Bridge Solution</Text>
          <Text>Transform your ESP32 into a powerful RTP audio transceiver with USB and S/PDIF support!</Text>
        </Box>
      </Alert>

      <DocSection title="Overview" icon={FaMicrochip}>
        <Text mb={4}>
          The ESP32 RTP Transceiver is an audio streaming device that transforms your ESP32 into a powerful audio bridge. 
          It supports both sending and receiving audio streams over your local network using the Real-time Transport Protocol (RTP), 
          with support for both USB Audio Class (UAC 1.0) and S/PDIF digital audio interfaces.
        </Text>

        <VStack align="stretch" spacing={4} mb={6}>
          <Box>
            <Heading as="h4" size="sm" mb={2}>Key Features</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
              <UnorderedList spacing={1}>
                <ListItem>Four operating modes (USB/S/PDIF × Send/Receive)</ListItem>
                <ListItem>RTP protocol with multicast support</ListItem>
                <ListItem>mDNS discovery for zero-configuration</ListItem>
                <ListItem>Web-based configuration wizard</ListItem>
                <ListItem>Over-the-air (OTA) firmware updates</ListItem>
              </UnorderedList>
              <UnorderedList spacing={1}>
                <ListItem>NTP time synchronization</ListItem>
                <ListItem>Adaptive jitter buffering</ListItem>
                <ListItem>Power management with sleep modes</ListItem>
                <ListItem>Battery charging support (BQ25895)</ListItem>
                <ListItem>Import/export configuration</ListItem>
              </UnorderedList>
            </SimpleGrid>
          </Box>
        </VStack>
      </DocSection>

      <DocSection title="Operating Modes" icon={FaCog}>
        <Text mb={4}>
          The ESP32 can operate in four distinct modes, allowing flexible audio routing:
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={6}>
          <ModeCard
            title="USB Receiver Mode"
            icon={FaUsb}
            input="RTP Network Stream"
            output="USB UAC 1.0 DAC"
            description="Receives network audio and outputs through USB to connected DACs or speakers"
            color="blue"
          />
          
          <ModeCard
            title="S/PDIF Receiver Mode"
            icon={FaNetworkWired}
            input="RTP Network Stream"
            output="S/PDIF Digital Audio"
            description="Receives network audio and outputs through S/PDIF optical/coaxial connection"
            color="green"
          />
          
          <ModeCard
            title="USB Sender Mode"
            icon={FaUsb}
            input="USB Host (PC/Console)"
            output="RTP Network Stream"
            description="Appears as USB sound card and streams received audio to the network"
            color="purple"
          />
          
          <ModeCard
            title="S/PDIF Sender Mode"
            icon={FaNetworkWired}
            input="S/PDIF Digital Input"
            output="RTP Network Stream"
            description="Captures S/PDIF audio input and broadcasts as RTP stream on network"
            color="orange"
          />
        </SimpleGrid>

        <Alert status="info">
          <AlertIcon />
          <Text>
            Mode selection is done through the web interface setup wizard on first boot or after factory reset.
          </Text>
        </Alert>
      </DocSection>

      <DocSection title="Hardware Requirements" icon={FaBolt}>
        <VStack align="stretch" spacing={4}>
          <Box>
            <Heading as="h4" size="sm" mb={2}>Required Components</Heading>
            <UnorderedList spacing={2}>
              <ListItem><strong>ESP32-S3 development board</strong> with USB OTG support</ListItem>
              <ListItem><strong>For S/PDIF modes:</strong> S/PDIF transceiver hardware (connected to GPIO 17)</ListItem>
              <ListItem><strong>Power supply:</strong> USB or battery with charging circuit</ListItem>
            </UnorderedList>
          </Box>

          <Box>
            <Heading as="h4" size="sm" mb={2}>Optional Components</Heading>
            <UnorderedList spacing={2}>
              <ListItem><strong>BQ25895:</strong> Battery charger IC for portable operation</ListItem>
              <ListItem><strong>TS3USB30ERSWR:</strong> USB switch for enhanced USB routing</ListItem>
              <ListItem><strong>Status LEDs:</strong> For visual feedback</ListItem>
            </UnorderedList>
          </Box>
        </VStack>
      </DocSection>

      <DocSection title="Installation" icon={FaWifi}>
        <Tabs variant="enclosed" colorScheme="brand">
          <TabList>
            <Tab>Web Flasher (Easy)</Tab>
            <Tab>Build from Source</Tab>
          </TabList>
          
          <TabPanels>
            <TabPanel>
              <VStack align="stretch" spacing={4}>
                <Text>
                  The easiest way to install the firmware is using our web-based flasher:
                </Text>
                
                <UnorderedList spacing={2}>
                  <ListItem>Open Chrome browser</ListItem>
                  <ListItem>Navigate to the ESP32 flasher page</ListItem>
                  <ListItem>Connect your ESP32 via USB</ListItem>
                  <ListItem>Click "Connect" and select your device</ListItem>
                  <ListItem>Click "Flash" to install the firmware</ListItem>
                </UnorderedList>

                <Button
                  as={RouterLink}
                  to="/esp32-flasher"
                  colorScheme="brand"
                  size="lg"
                  leftIcon={<FaMicrochip />}
                >
                  Open Web Flasher
                </Button>

                <Alert status="info">
                  <AlertIcon />
                  <Text>
                    The web flasher works with Chrome, Edge, and other Chromium-based browsers that support WebSerial API.
                  </Text>
                </Alert>
              </VStack>
            </TabPanel>
            
            <TabPanel>
              <VStack align="stretch" spacing={4}>
                <Text fontWeight="bold">Prerequisites</Text>
                <UnorderedList spacing={1}>
                  <ListItem>ESP-IDF v5.0 or later</ListItem>
                  <ListItem>Python 3.7+</ListItem>
                  <ListItem>Git</ListItem>
                </UnorderedList>

                <Text fontWeight="bold">Build Steps</Text>
                <Code display="block" whiteSpace="pre" p={4} borderRadius="md" bg={codeBg}>
{`# Clone the repository
git clone https://github.com/netham45/esp32-rtp
cd esp32-rtp

# Initialize submodules
git submodule update --init --recursive

# Configure the project
idf.py menuconfig

# Build
idf.py build

# Flash to device
idf.py -p /dev/ttyUSB0 flash

# Monitor output
idf.py -p /dev/ttyUSB0 monitor`}
                </Code>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </DocSection>

      <DocSection title="Initial Setup">
        <VStack align="stretch" spacing={4}>
          <Box>
            <Heading as="h4" size="sm" mb={2}>First Boot Configuration</Heading>
            <UnorderedList spacing={2}>
              <ListItem><strong>Power On:</strong> Device starts in Access Point mode if not configured</ListItem>
              <ListItem><strong>Connect:</strong> Join WiFi network "ESP32-RTP" (default)</ListItem>
              <ListItem><strong>Configure:</strong> Navigate to http://192.168.4.1 in browser</ListItem>
              <ListItem><strong>Setup Wizard:</strong> Follow the interactive setup to configure:
                <UnorderedList mt={2} ml={6}>
                  <ListItem>Operating mode selection</ListItem>
                  <ListItem>WiFi network credentials</ListItem>
                  <ListItem>Device name</ListItem>
                  <ListItem>Audio parameters (sample rate, channels)</ListItem>
                  <ListItem>Network settings (multicast group, ports)</ListItem>
                </UnorderedList>
              </ListItem>
            </UnorderedList>
          </Box>

          <Box>
            <Heading as="h4" size="sm" mb={2}>Factory Reset</Heading>
            <Text mb={2}>
              Hold GPIO 0 or GPIO 1 during the first 3 seconds of boot to reset all settings to defaults.
            </Text>
          </Box>
        </VStack>
      </DocSection>

      <DocSection title="Web Interface">
        <Text mb={4}>
          Access the device's IP address in a web browser for the configuration interface:
        </Text>

        <Table variant="simple" size="sm" mb={6}>
          <Thead>
            <Tr>
              <Th>Tab</Th>
              <Th>Function</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td><strong>Configuration</strong></Td>
              <Td>Setup wizard and quick configuration</Td>
            </Tr>
            <Tr>
              <Td><strong>Logs</strong></Td>
              <Td>Real-time system logs viewer</Td>
            </Tr>
            <Tr>
              <Td><strong>System Update</strong></Td>
              <Td>OTA firmware updates</Td>
            </Tr>
            <Tr>
              <Td><strong>Import/Export</strong></Td>
              <Td>Backup and restore settings</Td>
            </Tr>
          </Tbody>
        </Table>

        <Alert status="success">
          <AlertIcon />
          <Text>
            The web interface provides real-time status updates and configuration without requiring a restart!
          </Text>
        </Alert>
      </DocSection>

      <DocSection title="Network Discovery">
        <Text mb={4}>
          The device supports automatic discovery through mDNS:
        </Text>

        <VStack align="stretch" spacing={4}>
          <Box>
            <Heading as="h4" size="sm" mb={2}>mDNS Advertisement</Heading>
            <UnorderedList spacing={2}>
              <ListItem>Service type: <Code>_scream._tcp</Code></ListItem>
              <ListItem>Advertised properties: name, IP, port, mode</ListItem>
              <ListItem>Compatible with ScreamRouter auto-discovery</ListItem>
              <ListItem>Works with PulseAudio RTP discovery</ListItem>
            </UnorderedList>
          </Box>

          <Box>
            <Heading as="h4" size="sm" mb={2}>Integration with ScreamRouter</Heading>
            <Text mb={2}>
              The ESP32 device is automatically discovered by ScreamRouter when:
            </Text>
            <UnorderedList spacing={1}>
              <ListItem>Both devices are on the same network</ListItem>
              <ListItem>mDNS/multicast is not blocked by firewall</ListItem>
              <ListItem>The ESP32 has completed initial setup</ListItem>
            </UnorderedList>
          </Box>
        </VStack>
      </DocSection>

      <DocSection title="Audio Specifications">
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>Parameter</Th>
              <Th>Specification</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Audio Format</Td>
              <Td>PCM 16-bit (S16BE for RTP)</Td>
            </Tr>
            <Tr>
              <Td>Sample Rates</Td>
              <Td>44.1kHz, 48kHz</Td>
            </Tr>
            <Tr>
              <Td>Channels</Td>
              <Td>Stereo (2 channels)</Td>
            </Tr>
            <Tr>
              <Td>Protocol</Td>
              <Td>RTP (Real-time Transport Protocol)</Td>
            </Tr>
            <Tr>
              <Td>Transport</Td>
              <Td>UDP unicast/multicast</Td>
            </Tr>
            <Tr>
              <Td>Latency</Td>
              <Td>{'<'} 20ms typical (network dependent)</Td>
            </Tr>
          </Tbody>
        </Table>
      </DocSection>

      <DocSection title="Use Cases">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <Box>
            <Heading as="h4" size="sm" mb={2}>Home Audio Streaming</Heading>
            <UnorderedList spacing={1} fontSize="sm">
              <ListItem>Stream from PC to HiFi system</ListItem>
              <ListItem>Wireless speaker systems</ListItem>
              <ListItem>Multi-room audio distribution</ListItem>
              <ListItem>TV audio to wireless headphones</ListItem>
            </UnorderedList>
          </Box>

          <Box>
            <Heading as="h4" size="sm" mb={2}>Gaming</Heading>
            <UnorderedList spacing={1} fontSize="sm">
              <ListItem>Console audio streaming</ListItem>
              <ListItem>Low-latency game audio</ListItem>
              <ListItem>Wireless gaming headsets</ListItem>
              <ListItem>Stream to multiple listeners</ListItem>
            </UnorderedList>
          </Box>

          <Box>
            <Heading as="h4" size="sm" mb={2}>Professional Audio</Heading>
            <UnorderedList spacing={1} fontSize="sm">
              <ListItem>Studio monitoring</ListItem>
              <ListItem>Live performance routing</ListItem>
              <ListItem>Recording studio integration</ListItem>
              <ListItem>Broadcast audio distribution</ListItem>
            </UnorderedList>
          </Box>

          <Box>
            <Heading as="h4" size="sm" mb={2}>Digital Audio Conversion</Heading>
            <UnorderedList spacing={1} fontSize="sm">
              <ListItem>S/PDIF to network bridge</ListItem>
              <ListItem>USB audio to S/PDIF converter</ListItem>
              <ListItem>Legacy equipment integration</ListItem>
              <ListItem>Format conversion hub</ListItem>
            </UnorderedList>
          </Box>
        </SimpleGrid>
      </DocSection>

      <DocSection title="Troubleshooting">
        <VStack align="stretch" spacing={4}>
          <Box>
            <Heading as="h4" size="sm" mb={2}>No Audio Output</Heading>
            <UnorderedList spacing={1}>
              <ListItem>Check network connectivity and firewall settings</ListItem>
              <ListItem>Verify correct mode selection in configuration</ListItem>
              <ListItem>Ensure audio format compatibility (48kHz/16-bit)</ListItem>
              <ListItem>Check cable connections for USB/S/PDIF</ListItem>
            </UnorderedList>
          </Box>

          <Box>
            <Heading as="h4" size="sm" mb={2}>Audio Dropouts</Heading>
            <UnorderedList spacing={1}>
              <ListItem>Increase buffer sizes in configuration</ListItem>
              <ListItem>Check WiFi signal strength (RSSI {'>'} -70dBm recommended)</ListItem>
              <ListItem>Reduce network congestion</ListItem>
              <ListItem>Use 5GHz WiFi if available</ListItem>
            </UnorderedList>
          </Box>

          <Box>
            <Heading as="h4" size="sm" mb={2}>Device Not Discovered</Heading>
            <UnorderedList spacing={1}>
              <ListItem>Ensure same network segment as ScreamRouter</ListItem>
              <ListItem>Check firewall allows mDNS (port 5353)</ListItem>
              <ListItem>Verify multicast is not blocked by router</ListItem>
              <ListItem>Try manual IP configuration in ScreamRouter</ListItem>
            </UnorderedList>
          </Box>
        </VStack>

        <Alert status="warning" mt={4}>
          <AlertIcon />
          <Text>
            For S/PDIF connections, ensure GPIO 17 is properly connected to your S/PDIF transceiver hardware.
          </Text>
        </Alert>
      </DocSection>

      <DocSection title="Advanced Features">
        <VStack align="stretch" spacing={4}>
          <Box>
            <Heading as="h4" size="sm" mb={2}>Power Management</Heading>
            <Text fontSize="sm">
              The device supports various power-saving modes including deep sleep when idle, 
              automatic WiFi power management, and battery operation with BQ25895 charger IC.
            </Text>
          </Box>

          <Box>
            <Heading as="h4" size="sm" mb={2}>Time Synchronization</Heading>
            <Text fontSize="sm">
              NTP synchronization ensures accurate timestamps for RTP packets, enabling synchronized 
              playback across multiple devices and proper jitter buffer management.
            </Text>
          </Box>

          <Box>
            <Heading as="h4" size="sm" mb={2}>Adaptive Buffering</Heading>
            <Text fontSize="sm">
              Dynamic buffer management automatically adjusts to network conditions, minimizing latency 
              while preventing audio dropouts.
            </Text>
          </Box>
        </VStack>
      </DocSection>

      <Divider my={6} />

      <HStack justify="center" spacing={4}>
        <Button
          as={Link}
          href="https://github.com/netham45/esp32-rtp"
          isExternal
          colorScheme="gray"
          variant="outline"
        >
          View on GitHub
        </Button>
        <Button
          as={RouterLink}
          to="/esp32-flasher"
          colorScheme="brand"
        >
          Flash Firmware
        </Button>
      </HStack>
    </Box>
  );
}

export default ESP32Doc;