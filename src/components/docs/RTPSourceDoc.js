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
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
} from '@chakra-ui/react';
import DocSection from './DocSection';

function RTPSourceDoc() {
  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>
        RTP Audio Sources
      </Heading>
      
      <Text fontSize="lg" mb={4}>
        Real-Time Transport Protocol (RTP) is a network protocol for delivering audio and video over IP networks. ScreamRouter supports RTP audio sources, allowing you to integrate various streaming audio sources into your network audio system.
      </Text>
      
      <DocSection title="What is RTP?">
        <Text mb={4}>
          Real-Time Transport Protocol (RTP) is a standardized packet format for delivering audio and video over IP networks. It's widely used in communication and entertainment systems that involve streaming media, such as Voice over IP (VoIP), video teleconferencing applications, and audio streaming platforms.
        </Text>
      </DocSection>
      
      <DocSection title="RTP Sources in ScreamRouter">
        <Text mb={4}>
          ScreamRouter can receive audio from any device or application that outputs 16-bit 48kHz RTP audio streams.
        </Text>
      </DocSection>
      
      <DocSection title="Configuring RTP Sources">
        <Text mb={4}>
          To add an RTP source to ScreamRouter:
        </Text>
        
        <UnorderedList mb={4} spacing={2}>
          <ListItem>Open the ScreamRouter web interface</ListItem>
          <ListItem>Navigate to the "Sources" section</ListItem>
          <ListItem>Click "Add Source" and select "RTP Source"</ListItem>
          <ListItem>Configure the following parameters:</ListItem>
        </UnorderedList>
        
        <Table variant="simple" mb={4}>
          <Thead>
            <Tr>
              <Th>Parameter</Th>
              <Th>Description</Th>
              <Th>Example</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Name</Td>
              <Td>A descriptive name for the source</Td>
              <Td>"Living Room IP Phone"</Td>
            </Tr>
            <Tr>
              <Td>Listen IP</Td>
              <Td>The IP address to listen on (usually your server's IP or 0.0.0.0 for all interfaces)</Td>
              <Td>192.168.1.10</Td>
            </Tr>
            <Tr>
              <Td>Port</Td>
              <Td>The UDP port to listen on for RTP packets</Td>
              <Td>5004</Td>
            </Tr>
            <Tr>
              <Td>Format</Td>
              <Td>Audio format of the RTP stream</Td>
              <Td>PCM 16-bit</Td>
            </Tr>
            <Tr>
              <Td>Sample Rate</Td>
              <Td>Sample rate of the audio</Td>
              <Td>44100 Hz</Td>
            </Tr>
            <Tr>
              <Td>Channels</Td>
              <Td>Number of audio channels</Td>
              <Td>2 (stereo)</Td>
            </Tr>
          </Tbody>
        </Table>
        
        <Alert status="info" mb={4}>
          <AlertIcon />
          You must know the audio format details of your RTP stream to configure it correctly. Incorrect format settings will result in no audio or distorted audio.
        </Alert>
      </DocSection>
      
      <DocSection title="Common RTP Source Applications">
        <Heading as="h3" size="md" mb={2}>
          Streaming from VLC Media Player
        </Heading>
        
        <Text mb={4}>
          VLC can be used to stream audio as an RTP source:
        </Text>
        
        <UnorderedList mb={4} spacing={2}>
          <ListItem>Open VLC and go to Media {'>'} Stream</ListItem>
          <ListItem>Add the file you want to stream and click "Stream"</ListItem>
          <ListItem>Choose "RTP/MPEG Transport Stream" as the output</ListItem>
          <ListItem>Set the destination address to your ScreamRouter server IP</ListItem>
          <ListItem>Set the port to match your RTP source configuration</ListItem>
          <ListItem>Configure transcoding options if needed (PCM audio recommended)</ListItem>
        </UnorderedList>
        
        <Heading as="h3" size="md" mb={2} mt={4}>
          Using FFmpeg
        </Heading>
        
        <Text mb={4}>
          FFmpeg can stream audio files as RTP:
        </Text>
        
        <Code display="block" whiteSpace="pre" p={3} mb={4} borderRadius="md" bg="gray.50">
{`ffmpeg -re -i input.mp3 -acodec pcm_s16le -ar 44100 -ac 2 \\
-f rtp rtp://192.168.1.10:5004`}
        </Code>
        
        <Heading as="h3" size="md" mb={2} mt={4}>
          IP Phones and VoIP Systems
        </Heading>
        
        <Text mb={4}>
          Many IP phones and VoIP systems can be configured to stream audio to an RTP endpoint. Consult your device's documentation for specific instructions on setting up RTP streaming.
        </Text>
      </DocSection>
      
      <DocSection title="Advanced Configuration">
        <Heading as="h3" size="md" mb={2}>
          Network Considerations
        </Heading>
        
        <Text mb={4}>
          For reliable RTP streaming:
        </Text>
        
        <UnorderedList mb={4} spacing={2}>
          <ListItem>Ensure sufficient network bandwidth (uncompressed PCM audio can require 1-2 Mbps)</ListItem>
          <ListItem>Minimize network congestion and interference</ListItem>
          <ListItem>Configure firewalls to allow UDP traffic on your RTP ports</ListItem>
          <ListItem>Consider using Quality of Service (QoS) settings to prioritize RTP traffic</ListItem>
        </UnorderedList>
        
        <Heading as="h3" size="md" mb={2} mt={4}>
          Jitter Buffer Settings
        </Heading>
        
        <Text mb={4}>
          ScreamRouter includes jitter buffer settings for RTP sources to handle network timing variations:
        </Text>
        
        <UnorderedList mb={4} spacing={2}>
          <ListItem>Smaller buffer size: Lower latency but more susceptible to stuttering</ListItem>
          <ListItem>Larger buffer size: Higher latency but smoother playback</ListItem>
          <ListItem>Typical values range from 20ms to 100ms depending on network quality</ListItem>
        </UnorderedList>
        
        <Text mb={4}>
          Adjust the jitter buffer settings in the advanced source configuration section of the web interface.
        </Text>
      </DocSection>
      
      <DocSection title="Troubleshooting">
        <Heading as="h3" size="md" mb={2}>
          No Audio Received
        </Heading>
        
        <UnorderedList mb={4} spacing={2}>
          <ListItem>Verify the RTP stream is actually being sent (use Wireshark or similar to capture traffic)</ListItem>
          <ListItem>Check firewall settings to ensure UDP traffic is allowed</ListItem>
          <ListItem>Confirm the audio format settings match the actual RTP stream format</ListItem>
          <ListItem>Verify the correct IP and port configuration on both sending and receiving ends</ListItem>
        </UnorderedList>
        
        <Heading as="h3" size="md" mb={2} mt={4}>
          Poor Audio Quality
        </Heading>
        
        <UnorderedList mb={4} spacing={2}>
          <ListItem>Increase the jitter buffer size to accommodate network variability</ListItem>
          <ListItem>Check for network congestion or interference</ListItem>
          <ListItem>Consider using a wired connection instead of WiFi for critical audio paths</ListItem>
          <ListItem>Lower the audio quality (sample rate/bit depth) if bandwidth is limited</ListItem>
        </UnorderedList>
      </DocSection>
    </Box>
  );
}

export default RTPSourceDoc;