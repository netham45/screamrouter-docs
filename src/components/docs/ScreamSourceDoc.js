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
  Image,
  Link,
  Divider
} from '@chakra-ui/react';
import DocSection from './DocSection';

function ScreamSourceDoc() {
  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>
        Scream Audio Source
      </Heading>
      
      <Text fontSize="lg" mb={4}>
        Scream is a virtual audio device that enables streaming audio from Windows to other devices through your network. It's particularly useful for virtual machines and for creating whole-house audio systems.
      </Text>
      
      <DocSection title="What is Scream?">
        <Text mb={4}>
          Scream functions as a Windows audio driver that creates a virtual device in the Windows audio mixer. When audio is played through this device, it's sent over the network via UDP multicast or unicast, allowing other computers or devices to receive and play it.
        </Text>
        
        <Text mb={4}>
          Key features of Scream include:
        </Text>
        
        <UnorderedList mb={4} spacing={2}>
          <ListItem>Low latency audio streaming over LAN/WLAN</ListItem>
          <ListItem>Support for multiple audio formats (16/24/32-bit PCM)</ListItem>
          <ListItem>Multiple sample rates up to 192kHz</ListItem>
          <ListItem>Multicast or unicast network modes</ListItem>
          <ListItem>Seamless integration with ScreamRouter's audio routing system</ListItem>
        </UnorderedList>
      </DocSection>
      
      <DocSection title="Installing Scream on Windows">
        <Text mb={4}>
          To set up a Scream source on Windows:
        </Text>
        
        <UnorderedList mb={4} spacing={2}>
          <ListItem>Download the latest Scream release from GitHub or the ScreamRouter downloads page</ListItem>
          <ListItem>Run the installer for your version of Windows (32-bit or 64-bit)</ListItem>
          <ListItem>During installation, choose whether to install the desktop application for controlling Scream</ListItem>
          <ListItem>Restart your computer to complete the installation</ListItem>
          <ListItem>After restart, you should see "Scream" as an audio output device in your Windows sound settings</ListItem>
        </UnorderedList>
        
        <Alert status="info" mb={4}>
          <AlertIcon />
          For Windows VMs, you may need to adjust the VM settings to pass through audio to the Scream device. Check your VM software's documentation for details on audio configuration.
        </Alert>
      </DocSection>
      
      <DocSection title="Configuring Scream">
        <Text mb={4}>
          Scream can be configured in several ways:
        </Text>
        
        <Heading as="h3" size="md" mb={2}>
          Network Mode
        </Heading>
        
        <Text mb={4}>
          By default, Scream uses multicast UDP to transmit audio. This works well for local networks but may not traverse network segments or VLANs.
        </Text>
        
        <Text mb={4}>
          To change to unicast mode or alter the target IP/port:
        </Text>
        
        <UnorderedList mb={4} spacing={2}>
          <ListItem>Open the Scream desktop application (if installed)</ListItem>
          <ListItem>Select "Settings" from the menu</ListItem>
          <ListItem>Switch between Multicast and Unicast mode as needed</ListItem>
          <ListItem>For unicast, enter the target IP address and port</ListItem>
        </UnorderedList>
        
        <Heading as="h3" size="md" mb={2} mt={4}>
          Audio Format
        </Heading>
        
        <Text mb={4}>
          Scream supports various audio formats and sample rates. The default is 16-bit PCM at 44.1kHz, but you can change this in Windows sound settings:
        </Text>
        
        <UnorderedList mb={4} spacing={2}>
          <ListItem>Open Windows Sound Settings</ListItem>
          <ListItem>Select the Scream output device</ListItem>
          <ListItem>Click "Properties" and navigate to the "Advanced" tab</ListItem>
          <ListItem>Select your desired format from the dropdown list</ListItem>
        </UnorderedList>
        
        <Alert status="warning" mb={4}>
          <AlertIcon />
          Higher sample rates and bit depths will increase network bandwidth usage. Ensure your network can handle the increased data rate.
        </Alert>
      </DocSection>
      
      <DocSection title="Integrating with ScreamRouter">
        <Text mb={4}>
          Once your Scream source is set up, you can add it to ScreamRouter:
        </Text>
        
        <UnorderedList mb={4} spacing={2}>
          <ListItem>Open the ScreamRouter web interface</ListItem>
          <ListItem>Navigate to the "Sources" section</ListItem>
          <ListItem>Click "Add Source" and select "Scream Source"</ListItem>
          <ListItem>Configure the source name and network parameters to match your Scream configuration</ListItem>
          <ListItem>Save the configuration</ListItem>
        </UnorderedList>
        
        <Text mb={4}>
          After adding the source, you can create routes to direct the audio to one or more sinks in your ScreamRouter setup.
        </Text>
      </DocSection>
      
      <DocSection title="Troubleshooting">
        <Text mb={4}>
          Common issues with Scream sources:
        </Text>
        
        <Heading as="h3" size="md" mb={2}>
          No Audio Received
        </Heading>
        
        <UnorderedList mb={4} spacing={2}>
          <ListItem>Ensure Scream is set as the default playback device in Windows</ListItem>
          <ListItem>Check that your network allows UDP multicast traffic (ports 4010-4013)</ListItem>
          <ListItem>Verify firewall settings on both the sending and receiving devices</ListItem>
          <ListItem>For VMs, ensure audio passthrough is correctly configured</ListItem>
        </UnorderedList>
        
        <Heading as="h3" size="md" mb={2} mt={4}>
          Audio Dropouts or Latency
        </Heading>
        
        <UnorderedList mb={4} spacing={2}>
          <ListItem>Reduce network congestion by lowering the audio format quality</ListItem>
          <ListItem>Ensure your network has sufficient bandwidth for audio streaming</ListItem>
          <ListItem>For wireless connections, try to improve signal strength or switch to a wired connection</ListItem>
          <ListItem>Adjust buffer settings in the ScreamRouter configuration</ListItem>
        </UnorderedList>
      </DocSection>
    </Box>
  );
}

export default ScreamSourceDoc;