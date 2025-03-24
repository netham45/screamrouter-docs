import React from 'react';
import {
  Box,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  OrderedList,
  Code,
  Alert,
  AlertIcon,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue
} from '@chakra-ui/react';
import DocSection from './DocSection';

function ESP32Doc() {
  const codeBlockBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>
        ESP32 Scream Audio Device
      </Heading>
      
      <Text fontSize="lg" mb={6}>
        Transform low-cost ESP32 microcontrollers into powerful wireless audio streaming devices that 
        integrate perfectly with ScreamRouter. Create affordable network speakers or audio transmitters
        that work with your whole-house audio system.
      </Text>
      
      <Alert status="info" mb={6}>
        <AlertIcon />
        ESP32 devices provide an extremely cost-effective way to add audio endpoints to your ScreamRouter system,
        with typical hardware costs under $15 per device.
      </Alert>
      
      <DocSection title="Overview">
        <Text mb={4}>
          The ESP32 Scream Audio Device project turns ESP32 or ESP32-S3 microcontrollers into versatile
          audio streaming devices. These devices can function as both receivers and senders within your
          ScreamRouter ecosystem.
        </Text>
        
        <Tabs variant="enclosed" mb={6}>
          <TabList>
            <Tab>Receiver Mode</Tab>
            <Tab>Sender Mode</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <UnorderedList spacing={2}>
                <ListItem>Receives audio wirelessly from ScreamRouter or any Scream source</ListItem>
                <ListItem>Outputs to USB DAC (ESP32-S3) or SPDIF (ESP32/ESP32-S3)</ListItem>
                <ListItem>Supports 16-bit, 48kHz audio</ListItem>
                <ListItem>Dynamic buffer management for balancing latency and stability</ListItem>
                <ListItem>Volume control through web interface</ListItem>
              </UnorderedList>
            </TabPanel>
            <TabPanel>
              <UnorderedList spacing={2}>
                <ListItem>Acts as a USB sound card and captures audio from hosts (computers, game consoles, phones)</ListItem>
                <ListItem>Transmits audio wirelessly to any Scream-compatible receiver</ListItem>
                <ListItem>Configurable destination IP and port</ListItem>
                <ListItem>Volume and mute controls via web interface</ListItem>
                <ListItem><strong>Note:</strong> Sender mode requires ESP32-S3 only</ListItem>
              </UnorderedList>
            </TabPanel>
          </TabPanels>
        </Tabs>
        
        <Text mb={4}>
          The ESP32 Scream devices are fully compatible with ScreamRouter, allowing you to create a comprehensive
          whole-house audio system with both high-end and budget-friendly components.
        </Text>
      </DocSection>
      
      <DocSection title="Hardware Requirements">
        <Tabs variant="enclosed" mb={6}>
          <TabList>
            <Tab>Receiver Mode</Tab>
            <Tab>Sender Mode</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Heading as="h3" size="sm" mb={3}>Required Components:</Heading>
              <UnorderedList spacing={2} mb={4}>
                <ListItem><strong>ESP32-S3 with USB DAC</strong> <em>or</em> <strong>ESP32/ESP32-S3 with SPDIF DAC</strong></ListItem>
                <ListItem>5V power supply (USB power adapter works well)</ListItem>
                <ListItem>WiFi network (2.4GHz)</ListItem>
                <ListItem>Speakers or amplifier connected to your DAC</ListItem>
              </UnorderedList>
              
              <Heading as="h3" size="sm" mb={3}>Recommended ESP32 Development Boards:</Heading>
              <UnorderedList spacing={2}>
                <ListItem>ESP32-S3-DevKitC-1 (supports both USB and SPDIF)</ListItem>
                <ListItem>ESP32-S3-WROOM-1</ListItem>
                <ListItem>ESP32-DevKitC (for SPDIF output only)</ListItem>
              </UnorderedList>
            </TabPanel>
            <TabPanel>
              <Heading as="h3" size="sm" mb={3}>Required Components:</Heading>
              <UnorderedList spacing={2} mb={4}>
                <ListItem><strong>ESP32-S3</strong> development board (ESP32 does not support sender mode)</ListItem>
                <ListItem>USB audio input device (source device like PC, console, etc.)</ListItem>
                <ListItem>5V power supply</ListItem>
                <ListItem>WiFi network (2.4GHz)</ListItem>
              </UnorderedList>
              
              <Alert status="warning" mb={4}>
                <AlertIcon />
                Sender mode is only available on ESP32-S3 models due to USB host requirements.
              </Alert>
            </TabPanel>
          </TabPanels>
        </Tabs>
        
        <Heading as="h3" size="sm" mb={3}>Audio Output Options:</Heading>
        <UnorderedList spacing={2} mb={4}>
          <ListItem>
            <Text fontWeight="semibold">USB DAC (ESP32-S3 only):</Text>
            <Text ml={5}>Connect any USB audio DAC to the ESP32-S3's USB port for high-quality audio output. Most USB DACs are supported.</Text>
          </ListItem>
          <ListItem>
            <Text fontWeight="semibold">SPDIF Output (ESP32 or ESP32-S3):</Text>
            <Text ml={5}>Connect to an SPDIF input on your audio equipment. Requires connecting to the designated SPDIF GPIO pin.</Text>
          </ListItem>
          <ListItem>
            <Text fontWeight="semibold">I2S DAC (Advanced users):</Text>
            <Text ml={5}>Direct I2S output is possible with custom firmware modifications for specific DAC chips.</Text>
          </ListItem>
        </UnorderedList>
      </DocSection>
      
      <DocSection title="Firmware Installation">
        <Text mb={4}>
          Choose one of the following methods to install the ESP32 Scream firmware:
        </Text>
        
        <Tabs variant="enclosed" mb={6}>
          <TabList>
            <Tab>Web Installer (Recommended)</Tab>
            <Tab>Pre-built Firmware</Tab>
            <Tab>Build from Source</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <OrderedList spacing={2}>
                <ListItem>Visit <Code>https://netham45.org/esp32-scream-receiver/</Code></ListItem>
                <ListItem>Connect your ESP32 device to your computer via USB</ListItem>
                <ListItem>
                  Select the appropriate firmware variant for your hardware:
                  <UnorderedList ml={5} mt={2}>
                    <ListItem><strong>ESP32 SPDIF</strong> - For ESP32 with SPDIF output</ListItem>
                    <ListItem><strong>ESP32-S3 SPDIF</strong> - For ESP32-S3 with SPDIF output</ListItem>
                    <ListItem><strong>ESP32-S3 USB</strong> - For ESP32-S3 with USB audio</ListItem>
                  </UnorderedList>
                </ListItem>
                <ListItem>Click "Download Firmware" for your selected variant</ListItem>
                <ListItem>Once downloaded, click "Install" to begin flashing</ListItem>
                <ListItem>Follow the browser prompts to select your device and complete the installation</ListItem>
              </OrderedList>
              
              <Alert status="info" mt={4}>
                <AlertIcon />
                The web installer uses ESP Web Tools to flash your device directly from the browser without
                requiring any additional software or drivers. Works with Chrome and Edge on PCs (not Firefox or mobile).
              </Alert>
            </TabPanel>
            <TabPanel>
              <OrderedList spacing={2}>
                <ListItem>
                  Download the firmware that matches your hardware:
                  <UnorderedList ml={5} mt={2}>
                    <ListItem><Code>firmware-esp32s3-usb.bin</Code> (ESP32-S3 with USB audio)</ListItem>
                    <ListItem><Code>firmware-esp32s3-spdif.bin</Code> (ESP32-S3 with SPDIF)</ListItem>
                    <ListItem><Code>firmware-esp32-spdif.bin</Code> (ESP32 with SPDIF)</ListItem>
                  </UnorderedList>
                </ListItem>
                <ListItem>
                  Flash using esptool:
                  <Box 
                    as="pre" 
                    p={4} 
                    bg={codeBlockBg} 
                    borderRadius="md" 
                    mt={2}
                    mb={4}
                    overflowX="auto"
                  >
                    <Code display="block" whiteSpace="pre">
                      esptool.py -p (PORT) write_flash 0x0 firmware-xxx.bin
                    </Code>
                  </Box>
                </ListItem>
              </OrderedList>
            </TabPanel>
            <TabPanel>
              <OrderedList spacing={2}>
                <ListItem>Install ESP-IDF (v5.4+)</ListItem>
                <ListItem>Clone the repository</ListItem>
                <ListItem>
                  Copy the template sdkconfig to \sdkconfig:
                  <Box 
                    as="pre" 
                    p={4} 
                    bg={codeBlockBg} 
                    borderRadius="md" 
                    mt={2}
                    mb={4}
                    overflowX="auto"
                  >
                    <Code display="block" whiteSpace="pre">
{`# For ESP32-S3 USB
cp sdkconfig.esp32s3_usb sdkconfig

# For ESP32-S3 SPDIF
cp sdkconfig.esp32s3_spdif sdkconfig

# For ESP32 SPDIF
cp sdkconfig.esp32_spdif sdkconfig`}
                    </Code>
                  </Box>
                </ListItem>
                <ListItem>
                  Build, flash, and monitor:
                  <Box 
                    as="pre" 
                    p={4} 
                    bg={codeBlockBg} 
                    borderRadius="md" 
                    mt={2}
                    mb={4}
                    overflowX="auto"
                  >
                    <Code display="block" whiteSpace="pre">
{`idf.py build
idf.py -p (PORT) flash
idf.py -p (PORT) monitor`}
                    </Code>
                  </Box>
                </ListItem>
              </OrderedList>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </DocSection>
      
      <DocSection title="First-Time Setup">
        <OrderedList spacing={3}>
          <ListItem>
            <Text fontWeight="semibold">Power on the device</Text>
            <UnorderedList ml={5} mt={1} mb={2}>
              <ListItem>Connect power to your ESP32/ESP32-S3</ListItem>
              <ListItem>For ESP32-S3 receiver, connect a USB DAC</ListItem>
              <ListItem>For ESP32 receiver, connect a SPDIF DAC to the output pin</ListItem>
              <ListItem>For ESP32-S3 sender, connect to a USB audio capable host</ListItem>
            </UnorderedList>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="semibold">Connect to initial WiFi access point</Text>
            <UnorderedList ml={5} mt={1} mb={2}>
              <ListItem>The device creates a WiFi network named "ESP32-Scream"</ListItem>
              <ListItem>Connect to this network with your phone/computer</ListItem>
              <ListItem>A captive portal should open (or navigate to http://192.168.4.1/)</ListItem>
            </UnorderedList>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="semibold">Configure your WiFi</Text>
            <UnorderedList ml={5} mt={1} mb={2}>
              <ListItem>Select your home network</ListItem>
              <ListItem>Enter the password</ListItem>
              <ListItem>Device will connect and restart</ListItem>
            </UnorderedList>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="semibold">Access the web interface</Text>
            <UnorderedList ml={5} mt={1} mb={2}>
              <ListItem>Find the device's IP on your network</ListItem>
              <ListItem>Or reconnect to "ESP32-Scream"</ListItem>
              <ListItem>Open the IP address in a browser</ListItem>
              <ListItem>Configure options based on your use case</ListItem>
            </UnorderedList>
          </ListItem>
        </OrderedList>
        
        <Alert status="info" mt={4} mb={4}>
          <AlertIcon />
          <Box>
            <Text fontWeight="semibold">Direct Connection Mode (No WiFi Network)</Text>
            <Text>
              You can use the receiver without connecting it to a WiFi network by keeping it in AP mode.
              In this mode, it will have the IP address 192.168.4.1 on its own "ESP32-Scream" network.
              Connect your sender device to this network and configure it to use the destination IP 192.168.4.1 and port 4010.
            </Text>
          </Box>
        </Alert>
      </DocSection>
      
      <DocSection title="Integrating with ScreamRouter">
        <Text mb={4}>
          Once your ESP32 device is set up, you can integrate it with ScreamRouter:
        </Text>
        
        <Tabs variant="enclosed" mb={6}>
          <TabList>
            <Tab>ESP32 as Sink (Receiver)</Tab>
            <Tab>ESP32 as Source (Sender)</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <OrderedList spacing={2}>
                <ListItem>Open the ScreamRouter web interface</ListItem>
                <ListItem>Navigate to the "Sinks" section</ListItem>
                <ListItem>Click "Add Sink"</ListItem>
                <ListItem>
                  Configure the sink:
                  <UnorderedList ml={5} mt={2}>
                    <ListItem><strong>Name:</strong> A descriptive name for your ESP32 device</ListItem>
                    <ListItem><strong>IP Address:</strong> The IP address of your ESP32 device</ListItem>
                    <ListItem><strong>Port:</strong> 4010 (default Scream port)</ListItem>
                    <ListItem><strong>Format:</strong> 16-bit, 48000Hz, 2 channels (default ESP32 settings)</ListItem>
                  </UnorderedList>
                </ListItem>
                <ListItem>Save the sink configuration</ListItem>
                <ListItem>Create a route from your desired audio source to this new sink</ListItem>
              </OrderedList>
            </TabPanel>
            <TabPanel>
              <OrderedList spacing={2}>
                <ListItem>Open the ScreamRouter web interface</ListItem>
                <ListItem>Navigate to the "Sources" section</ListItem>
                <ListItem>Click "Add Source" and select "Scream Source"</ListItem>
                <ListItem>
                  Configure the source:
                  <UnorderedList ml={5} mt={2}>
                    <ListItem><strong>Name:</strong> A descriptive name for your ESP32 sender</ListItem>
                    <ListItem><strong>Host:</strong> The IP address of your network (not needed for multicast)</ListItem>
                    <ListItem><strong>Port:</strong> The port you configured in the ESP32 sender settings</ListItem>
                  </UnorderedList>
                </ListItem>
                <ListItem>Save the source configuration</ListItem>
                <ListItem>Create routes from this source to your desired sinks</ListItem>
              </OrderedList>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </DocSection>
      
      <DocSection title="Advanced Features">
        <UnorderedList spacing={3}>
          <ListItem>
            <Text fontWeight="semibold">Smart WiFi Management</Text>
            <Text>
              The ESP32 firmware includes advanced WiFi management with roaming support, allowing devices
              to automatically connect to the strongest access point in mesh networks.
            </Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="semibold">Power Saving</Text>
            <Text>
              The device enters power-saving sleep modes when inactive, reducing energy consumption.
              It also features automatic wake-on-audio functionality.
            </Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="semibold">Buffer Management</Text>
            <Text>
              Dynamic buffer management balances between low latency and stable playback. This can be
              adjusted in the web interface to optimize for your specific network conditions.
            </Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="semibold">OTA Updates</Text>
            <Text>
              Firmware updates can be installed over-the-air through the web interface, making
              maintenance easy without needing to physically access the device.
            </Text>
          </ListItem>
        </UnorderedList>
      </DocSection>
      
      <DocSection title="Troubleshooting">
        <Heading as="h3" size="md" mb={2}>
          Factory Reset
        </Heading>
        <Text mb={4}>
          Hold GPIO pin 0 during the first 3 seconds of boot to reset all settings, including WiFi configuration.
        </Text>
        
        <Heading as="h3" size="md" mb={2} mt={4}>
          No Sound
        </Heading>
        <UnorderedList spacing={2} mb={4}>
          <ListItem>Verify the ESP32 is connected to your WiFi network</ListItem>
          <ListItem>Check that the audio source is properly configured to send to the correct IP/port</ListItem>
          <ListItem>Ensure your DAC is properly connected and powered</ListItem>
          <ListItem>Verify volume settings in both the ESP32 web interface and your audio system</ListItem>
        </UnorderedList>
        
        <Heading as="h3" size="md" mb={2} mt={4}>
          Choppy Audio
        </Heading>
        <UnorderedList spacing={2} mb={4}>
          <ListItem>Increase the buffer size in the web interface</ListItem>
          <ListItem>Improve WiFi signal strength or move the device closer to your router</ListItem>
          <ListItem>Reduce network congestion on your WiFi</ListItem>
          <ListItem>Consider using a wired Ethernet connection with an ESP32 Ethernet module</ListItem>
        </UnorderedList>
        
        <Heading as="h3" size="md" mb={2} mt={4}>
          Device Not Appearing on Network
        </Heading>
        <UnorderedList spacing={2} mb={4}>
          <ListItem>Verify the device is powered on</ListItem>
          <ListItem>Reconnect to the "ESP32-Scream" access point to reconfigure WiFi settings</ListItem>
          <ListItem>Check your router's connected devices list</ListItem>
          <ListItem>Try a factory reset and reconfigure from scratch</ListItem>
        </UnorderedList>
      </DocSection>
    </Box>
  );
}

export default ESP32Doc;