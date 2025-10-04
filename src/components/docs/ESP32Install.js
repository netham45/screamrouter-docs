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
  Grid,
  Alert,
  AlertIcon,
  Code,
  OrderedList,
  Image
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaChevronRight, FaMicrochip } from 'react-icons/fa';
import DocSection from './DocSection';

function ESP32Install() {
  return (
    <Box>
      <Breadcrumb spacing="8px" separator={<FaChevronRight color="gray.500" />} mb={8}>
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to="/docs">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>ESP32 Device Installation</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      
      <Heading as="h1" size="xl" mb={6}>
        ESP32-S3 Audio Device Installation
      </Heading>
      
      <Text fontSize="lg" mb={8}>
        The ESP32-S3 RTP Audio Device turns an ESP32-S3 microcontroller into a versatile audio streaming device
        with unified firmware that supports both USB and SPDIF output modes.
        It can function as both a receiver to play audio and a sender to capture audio from connected devices.
      </Text>
      
      <DocSection title="ESP32-S3 Installation" icon={FaMicrochip}>
        <Text mb={4}>
          Turn a low-cost ESP32-S3 microcontroller into a wireless audio streaming device to extend
          your ScreamRouter system to more rooms and devices using the unified firmware.
        </Text>
        
        <Heading as="h3" size="md" mb={3}>Device Capabilities</Heading>
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6} mb={6}>
          <Box>
            <Heading as="h4" size="sm" mb={2}>Receiver Mode:</Heading>
            <List spacing={2} styleType="disc" ml={4}>
              <ListItem>Receives audio wirelessly from ScreamRouter</ListItem>
              <ListItem>Unified firmware supports both USB DAC and SPDIF output</ListItem>
              <ListItem>Supports 16-bit, 48kHz audio</ListItem>
              <ListItem>Dynamic buffer management for latency optimization</ListItem>
              <ListItem>Volume control through web interface</ListItem>
              <ListItem>Output mode selectable via web configuration</ListItem>
            </List>
          </Box>
          <Box>
            <Heading as="h4" size="sm" mb={2}>Sender Mode:</Heading>
            <List spacing={2} styleType="disc" ml={4}>
              <ListItem>Acts as a USB sound card and captures audio</ListItem>
              <ListItem>Transmits audio wirelessly to ScreamRouter</ListItem>
              <ListItem>Configurable destination IP and port</ListItem>
              <ListItem>Volume and mute controls via web interface</ListItem>
              <ListItem>Compatible with PlayStation 4/5, Nintendo Switch, computers, and other USB audio devices</ListItem>
              <ListItem>Same unified firmware as receiver mode</ListItem>
            </List>
          </Box>
        </Grid>
        
        <Heading as="h3" size="md" mb={3}>Hardware Requirements</Heading>
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6} mb={4}>
          <Box>
            <Text fontWeight="bold" mb={2}>For Receiver Mode:</Text>
            <List spacing={2} styleType="disc" ml={5}>
              <ListItem>ESP32-S3 development board</ListItem>
              <ListItem>USB DAC or SPDIF DAC (depending on desired output)</ListItem>
              <ListItem>5V power supply</ListItem>
              <ListItem>WiFi network</ListItem>
            </List>
          </Box>
          <Box>
            <Text fontWeight="bold" mb={2}>For Sender Mode:</Text>
            <List spacing={2} styleType="disc" ml={5}>
              <ListItem>ESP32-S3 development board</ListItem>
              <ListItem>USB audio input device</ListItem>
              <ListItem>WiFi network</ListItem>
            </List>
          </Box>
        </Grid>
        

        <Box my={4} display="flex" justifyContent="center">
          <Image 
            src="/images/ScreamRouter/esp32s3_receiver.jpg" 
            alt="ESP32-S3 Audio Receiver" 
            borderRadius="md" 
            shadow="md" 
            maxWidth="100%" 
            mb={4}
          />
        </Box>
        <Heading as="h3" size="md" mb={3}>Firmware Installation</Heading>
        <Text mb={3} fontWeight="bold">Web Installer (Recommended)</Text>
        <OrderedList spacing={2} ml={5} mb={4}>
          <ListItem>Visit <Link color="brand.500" href="https://screamrouter.net/esp32-flasher/" isExternal>https://screamrouter.net/esp32-flasher/</Link></ListItem>
          <ListItem>Connect your ESP32-S3 device to your computer via USB</ListItem>
          <ListItem>Download the unified firmware:
            <List ml={4} mt={1} spacing={1} styleType="circle">
              <ListItem><Text fontWeight="medium">ESP32-S3 Unified</Text> - Supports both USB and SPDIF output modes</ListItem>
            </List>
          </ListItem>
          <ListItem>Click "Download Firmware"</ListItem>
          <ListItem>Once downloaded, click "Install" to begin flashing</ListItem>
          <ListItem>Follow the browser prompts to select your device and complete the installation</ListItem>
        </OrderedList>
        
        <Text mb={2} fontStyle="italic" fontSize="sm">
          The web installer uses ESP Web Tools to flash your device directly from the browser without requiring 
          any additional software or drivers. The web installer works from Chrome and Edge on PCs, it does not support Firefox or Mobile.
        </Text>
        
        <Heading as="h3" size="md" mt={6} mb={3}>First-Time Setup</Heading>
        <OrderedList spacing={2} ml={5} mb={4}>
          <ListItem>
            <Text fontWeight="bold">Power on the device</Text>
            <Text>Connect power to your ESP32-S3 and any necessary peripherals</Text>
          </ListItem>
          <ListItem>
            <Text fontWeight="bold">Connect to initial WiFi access point</Text>
            <Text>The device creates a WiFi network named "ESP32-RTP"</Text>
            <Text>Connect to this network with your phone/computer</Text>
          </ListItem>
          <ListItem>
            <Text fontWeight="bold">Configure your WiFi</Text>
            <Text>A captive portal should open (or navigate to http://192.168.4.1/)</Text>
            <Text>Select your home network and enter the password</Text>
            <Text>Device will connect and restart</Text>
          </ListItem>
          <ListItem>
            <Text fontWeight="bold">Access the web interface</Text>
            <Text>Find the device's IP on your network or reconnect to "ESP32-RTP"</Text>
            <Text>Open the IP address in a browser to configure options and select output mode</Text>
          </ListItem>
        </OrderedList>
        
        <Alert status="info" borderRadius="md" mb={4}>
          <AlertIcon />
          <Box>
            <Text fontWeight="semibold">Direct Connection Mode (No WiFi Network)</Text>
            <Text>
              If you want to use the receiver without connecting it to a WiFi network, it will remain in AP mode with IP address 192.168.4.1.
              Connect your sender device to the "ESP32-RTP" AP network and configure the sender to use destination IP 192.168.4.1 and port 4010.
            </Text>
          </Box>
        </Alert>
        
        <Alert status="info" borderRadius="md">
          <AlertIcon />
          Hold GPIO pin 0 during the first 3 seconds of boot to reset all settings to factory defaults.
        </Alert>
      </DocSection>
    </Box>
  );
}

export default ESP32Install;