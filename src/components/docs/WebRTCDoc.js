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

        <Code display="block" whiteSpace="pre" p={4} borderRadius="md" bg="gray.50" mb={6}>
{`sinks:
  - name: "Living Room"
    type: "webrtc"
    webrtc:
      enabled: true
      codec: "opus"          # Audio codec (opus recommended)
      bitrate: 128000        # Bitrate in bits/second
      max_listeners: 10      # Maximum concurrent listeners
      ice_servers:           # STUN/TURN servers for NAT traversal
        - urls: "stun:stun.l.google.com:19302"
      session_timeout: 30    # Seconds before idle session cleanup`}
        </Code>

        <Heading as="h3" size="md" mb={3} mt={6}>
          Opus Codec Settings
        </Heading>

        <Text mb={4}>
          The Opus codec is optimized for different use cases:
        </Text>

        <Table variant="simple" mb={6}>
          <Thead>
            <Tr>
              <Th>Profile</Th>
              <Th>Bitrate</Th>
              <Th>Complexity</Th>
              <Th>Use Case</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Low Latency</Td>
              <Td>64 kbps</Td>
              <Td>5</Td>
              <Td>Gaming, real-time</Td>
            </Tr>
            <Tr>
              <Td>Balanced</Td>
              <Td>128 kbps</Td>
              <Td>8</Td>
              <Td>General streaming</Td>
            </Tr>
            <Tr>
              <Td>High Quality</Td>
              <Td>256 kbps</Td>
              <Td>10</Td>
              <Td>Music, audiophile</Td>
            </Tr>
          </Tbody>
        </Table>
      </DocSection>

      <DocSection title="Advanced Features">
        <Heading as="h3" size="md" mb={3}>
          Session Management
        </Heading>

        <VStack align="stretch" spacing={4} mb={6}>
          <Box>
            <Text fontWeight="bold" mb={2}>IP-Based Sessions</Text>
            <Text>
              ScreamRouter automatically manages sessions based on client IP addresses. When a new connection 
              from the same IP is established, old sessions are automatically closed to prevent resource leaks.
            </Text>
          </Box>

          <Box>
            <Text fontWeight="bold" mb={2}>Automatic Cleanup</Text>
            <Text>
              Closed or timed-out WebRTC connections are automatically removed. The system monitors connection 
              states and cleans up resources when connections are no longer active.
            </Text>
          </Box>

          <Box>
            <Text fontWeight="bold" mb={2}>Statistics Tracking</Text>
            <Text>
              WebRTC packet statistics are integrated into the ScreamRouter stats system, providing insights into:
            </Text>
            <UnorderedList mt={2} ml={6}>
              <ListItem>Packet loss rates</ListItem>
              <ListItem>Jitter measurements</ListItem>
              <ListItem>Round-trip time (RTT)</ListItem>
              <ListItem>Bandwidth usage</ListItem>
              <ListItem>Codec performance</ListItem>
            </UnorderedList>
          </Box>
        </VStack>

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

      <DocSection title="Troubleshooting">
        <Heading as="h3" size="md" mb={3}>
          No Audio in Browser
        </Heading>

        <UnorderedList spacing={2} mb={4}>
          <ListItem>Check browser console for errors (F12)</ListItem>
          <ListItem>Ensure browser has permission to play audio</ListItem>
          <ListItem>Verify HTTPS is being used (required for WebRTC)</ListItem>
          <ListItem>Check firewall allows WebRTC traffic</ListItem>
          <ListItem>Try a different browser to isolate issues</ListItem>
        </UnorderedList>

        <Heading as="h3" size="md" mb={3} mt={6}>
          Connection Failed
        </Heading>

        <UnorderedList spacing={2} mb={4}>
          <ListItem>Verify ScreamRouter is accessible via HTTPS</ListItem>
          <ListItem>Check STUN server is reachable</ListItem>
          <ListItem>Ensure UDP ports are not blocked</ListItem>
          <ListItem>Check browser WebRTC settings (some VPNs block WebRTC)</ListItem>
          <ListItem>Review ScreamRouter logs for connection errors</ListItem>
        </UnorderedList>

        <Heading as="h3" size="md" mb={3} mt={6}>
          Poor Audio Quality
        </Heading>

        <UnorderedList spacing={2} mb={4}>
          <ListItem>Increase Opus bitrate in configuration</ListItem>
          <ListItem>Check network bandwidth and latency</ListItem>
          <ListItem>Reduce number of concurrent listeners</ListItem>
          <ListItem>Use wired connection instead of WiFi</ListItem>
          <ListItem>Check CPU usage on server and client</ListItem>
        </UnorderedList>

        <Alert status="warning" mt={6}>
          <AlertIcon />
          <Text>
            <strong>Note:</strong> WebRTC requires a secure context (HTTPS). Make sure you're accessing 
            ScreamRouter via HTTPS, not HTTP, for WebRTC features to work.
          </Text>
        </Alert>
      </DocSection>

      <DocSection title="Performance Optimization">
        <Text mb={4}>
          For optimal WebRTC streaming performance:
        </Text>

        <VStack align="stretch" spacing={4}>
          <Box>
            <Text fontWeight="bold" mb={2}>Server-Side</Text>
            <UnorderedList ml={6}>
              <ListItem>Use hardware acceleration if available</ListItem>
              <ListItem>Allocate sufficient CPU for Opus encoding</ListItem>
              <ListItem>Ensure adequate network bandwidth</ListItem>
              <ListItem>Configure appropriate ICE servers</ListItem>
            </UnorderedList>
          </Box>

          <Box>
            <Text fontWeight="bold" mb={2}>Client-Side</Text>
            <UnorderedList ml={6}>
              <ListItem>Use latest browser versions</ListItem>
              <ListItem>Close unnecessary tabs to free resources</ListItem>
              <ListItem>Prefer wired connections for stability</ListItem>
              <ListItem>Disable browser extensions that may interfere</ListItem>
            </UnorderedList>
          </Box>
        </VStack>
      </DocSection>
    </Box>
  );
}

export default WebRTCDoc;