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
  Divider,
} from '@chakra-ui/react';
import DocSection from './DocSection';
import { FaChrome, FaFirefox, FaSafari, FaEdge } from 'react-icons/fa';

function WebRTCDoc() {
  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>
        WebRTC Streaming Support
      </Heading>
      
      <Text fontSize="lg" mb={4}>
        ScreamRouter now includes full WebRTC support, enabling low-latency audio streaming directly to web browsers. 
        This feature allows you to listen to your audio streams from any modern browser without installing additional software.
      </Text>

      <Alert status="success" mb={6}>
        <AlertIcon />
        <Box>
          <Text fontWeight="bold">Browser-Based Audio Streaming</Text>
          <Text>Stream audio directly to Chrome, Firefox, Safari, and Edge browsers using WebRTC technology!</Text>
        </Box>
      </Alert>

      <DocSection title="What is WebRTC?">
        <Text mb={4}>
          WebRTC (Web Real-Time Communication) is an open-source project that enables real-time communication 
          capabilities in web browsers. ScreamRouter implements WHEP (WebRTC-HTTP Egress Protocol) to deliver 
          low-latency audio streams to browsers.
        </Text>

        <VStack align="stretch" spacing={4} mb={6}>
          <Box>
            <Heading as="h4" size="sm" mb={2}>Key Features</Heading>
            <UnorderedList spacing={2}>
              <ListItem><strong>Low Latency:</strong> Sub-second audio delay</ListItem>
              <ListItem><strong>No Plugins:</strong> Works in modern browsers without extensions</ListItem>
              <ListItem><strong>Opus Codec:</strong> Efficient audio compression</ListItem>
              <ListItem><strong>NAT Traversal:</strong> Works through firewalls and NAT</ListItem>
              <ListItem><strong>Adaptive Bitrate:</strong> Adjusts to network conditions</ListItem>
            </UnorderedList>
          </Box>
        </VStack>
      </DocSection>

      <DocSection title="Architecture">
        <Text mb={4}>
          ScreamRouter's WebRTC implementation consists of several components:
        </Text>

        <VStack align="stretch" spacing={4} mb={6}>
          <Box>
            <Heading as="h4" size="sm" mb={2}>WebRTC Manager</Heading>
            <Text mb={2}>
              The <Code>WebRtcManager</Code> handles all WebRTC peer connections and manages the lifecycle of streaming sessions.
            </Text>
            <UnorderedList spacing={2} ml={6}>
              <ListItem>Creates and manages peer connections</ListItem>
              <ListItem>Handles ICE candidate negotiation</ListItem>
              <ListItem>Manages audio track routing</ListItem>
              <ListItem>Automatic cleanup of closed connections</ListItem>
            </UnorderedList>
          </Box>

          <Box>
            <Heading as="h4" size="sm" mb={2}>WHEP Server</Heading>
            <Text mb={2}>
              Implements the WebRTC-HTTP Egress Protocol for standardized streaming:
            </Text>
            <UnorderedList spacing={2} ml={6}>
              <ListItem>REST API endpoints for session management</ListItem>
              <ListItem>SDP offer/answer exchange</ListItem>
              <ListItem>ICE candidate trickle support</ListItem>
              <ListItem>Session statistics and monitoring</ListItem>
            </UnorderedList>
          </Box>

          <Box>
            <Heading as="h4" size="sm" mb={2}>Per-Sink Listeners</Heading>
            <Text mb={2}>
              Each audio sink can have multiple WebRTC listeners:
            </Text>
            <UnorderedList spacing={2} ml={6}>
              <ListItem>Independent volume control per listener</ListItem>
              <ListItem>Multiple browsers can listen to the same sink</ListItem>
              <ListItem>Automatic reconnection on network changes</ListItem>
              <ListItem>IP-based session management</ListItem>
            </UnorderedList>
          </Box>
        </VStack>
      </DocSection>

      <DocSection title="Browser Compatibility">
        <Text mb={4}>
          WebRTC streaming is supported in all modern browsers:
        </Text>

        <Table variant="simple" mb={6}>
          <Thead>
            <Tr>
              <Th>Browser</Th>
              <Th>Minimum Version</Th>
              <Th>Status</Th>
              <Th>Notes</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td><HStack><FaChrome /><Text>Chrome</Text></HStack></Td>
              <Td>90+</Td>
              <Td><Badge colorScheme="green">Fully Supported</Badge></Td>
              <Td>Best performance</Td>
            </Tr>
            <Tr>
              <Td><HStack><FaFirefox /><Text>Firefox</Text></HStack></Td>
              <Td>88+</Td>
              <Td><Badge colorScheme="green">Fully Supported</Badge></Td>
              <Td>Excellent compatibility</Td>
            </Tr>
            <Tr>
              <Td><HStack><FaSafari /><Text>Safari</Text></HStack></Td>
              <Td>14.1+</Td>
              <Td><Badge colorScheme="green">Fully Supported</Badge></Td>
              <Td>iOS and macOS</Td>
            </Tr>
            <Tr>
              <Td><HStack><FaEdge /><Text>Edge</Text></HStack></Td>
              <Td>90+</Td>
              <Td><Badge colorScheme="green">Fully Supported</Badge></Td>
              <Td>Chromium-based</Td>
            </Tr>
          </Tbody>
        </Table>
      </DocSection>

      <DocSection title="Using WebRTC Streams">
        <Heading as="h3" size="md" mb={3}>
          Accessing WebRTC Streams
        </Heading>
        
        <Text mb={4}>
          To listen to a WebRTC stream from ScreamRouter:
        </Text>

        <UnorderedList spacing={3} mb={6}>
          <ListItem>
            <strong>Step 1:</strong> Open the ScreamRouter web interface in your browser
          </ListItem>
          <ListItem>
            <strong>Step 2:</strong> Navigate to the sink you want to listen to
          </ListItem>
          <ListItem>
            <strong>Step 3:</strong> Click the "Listen in Browser" button
          </ListItem>
          <ListItem>
            <strong>Step 4:</strong> The browser will establish a WebRTC connection and start playing audio
          </ListItem>
        </UnorderedList>

        <Alert status="info" mb={4}>
          <AlertIcon />
          <Text>
            The first time you connect, your browser may ask for permission to play audio. 
            Make sure to allow audio playback for the ScreamRouter domain.
          </Text>
        </Alert>

        <Heading as="h3" size="md" mb={3} mt={6}>
          WebRTC API Endpoints
        </Heading>

        <Text mb={4}>
          For developers, ScreamRouter exposes WHEP-compliant API endpoints:
        </Text>

        <Table variant="simple" mb={6}>
          <Thead>
            <Tr>
              <Th>Endpoint</Th>
              <Th>Method</Th>
              <Th>Description</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td><Code>/api/whep/sink/{'{sink_id}'}</Code></Td>
              <Td>POST</Td>
              <Td>Create new WebRTC session</Td>
            </Tr>
            <Tr>
              <Td><Code>/api/whep/session/{'{session_id}'}</Code></Td>
              <Td>PATCH</Td>
              <Td>Add ICE candidates</Td>
            </Tr>
            <Tr>
              <Td><Code>/api/whep/session/{'{session_id}'}</Code></Td>
              <Td>DELETE</Td>
              <Td>Close WebRTC session</Td>
            </Tr>
            <Tr>
              <Td><Code>/api/whep/stats/{'{session_id}'}</Code></Td>
              <Td>GET</Td>
              <Td>Get session statistics</Td>
            </Tr>
          </Tbody>
        </Table>
      </DocSection>

      <DocSection title="Configuration">
        <Heading as="h3" size="md" mb={3}>
          WebRTC Settings
        </Heading>

        <Text mb={4}>
          WebRTC can be configured per sink in the ScreamRouter configuration:
        </Text>

        <Heading as="h3" size="md" mb={3} mt={6}>
          NAT Traversal
        </Heading>

        <Text mb={4}>
          ScreamRouter includes full ICE (Interactive Connectivity Establishment) support for NAT traversal:
        </Text>

        <UnorderedList spacing={2} mb={6}>
          <ListItem><strong>STUN:</strong> Discovers public IP address</ListItem>
          <ListItem><strong>TURN:</strong> Relay for symmetric NATs (optional)</ListItem>
          <ListItem><strong>ICE Candidates:</strong> Multiple connection paths tested</ListItem>
          <ListItem><strong>Trickle ICE:</strong> Faster connection establishment</ListItem>
        </UnorderedList>
      </DocSection>
    </Box>
  );
}

export default WebRTCDoc;