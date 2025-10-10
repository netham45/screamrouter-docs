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
import { FaNetworkWired, FaBroadcastTower, FaSearch } from 'react-icons/fa';

function SAPDoc() {
  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>
        SAP (Session Announcement Protocol)
      </Heading>
      
      <Text fontSize="lg" mb={4}>
        ScreamRouter implements Session Announcement Protocol (SAP) for automatic discovery and announcement of RTP audio streams. 
        This enables zero-configuration networking where audio sources and sinks can automatically find each other on the network.
      </Text>

      <Alert status="success" mb={6}>
        <AlertIcon />
        <Box>
          <Text fontWeight="bold">Automatic Stream Discovery</Text>
          <Text>SAP enables ScreamRouter to automatically discover RTP streams from PulseAudio, VLC, PipeWire, and other SAP-compliant sources!</Text>
        </Box>
      </Alert>

      <DocSection title="What is SAP?" icon={FaBroadcastTower}>
        <Text mb={4}>
          Session Announcement Protocol (SAP) is a protocol for advertising multicast multimedia sessions. 
          It's commonly used in professional audio/video networks and is supported by many streaming applications.
        </Text>

        <VStack align="stretch" spacing={4} mb={6}>
          <Box>
            <Heading as="h4" size="sm" mb={2}>Key Features</Heading>
            <UnorderedList spacing={2}>
              <ListItem><strong>Automatic Discovery:</strong> No manual configuration needed</ListItem>
              <ListItem><strong>SDP Payloads:</strong> Rich session descriptions</ListItem>
              <ListItem><strong>Multicast Distribution:</strong> Efficient network usage</ListItem>
              <ListItem><strong>Industry Standard:</strong> RFC 2974 compliant</ListItem>
              <ListItem><strong>Wide Support:</strong> Works with many audio applications</ListItem>
            </UnorderedList>
          </Box>
        </VStack>
      </DocSection>

      <DocSection title="SAP Implementation" icon={FaNetworkWired}>
        <Text mb={4}>
          ScreamRouter's SAP implementation includes both listening and announcing capabilities:
        </Text>

        <VStack align="stretch" spacing={6} mb={6}>
          <Box>
            <Heading as="h3" size="md" mb={3}>SAP Listener</Heading>
            <Text mb={3}>
              The <Code>SapListener</Code> component actively monitors for SAP announcements on the network:
            </Text>
            
            <Table variant="simple" size="sm" mb={4}>
              <Thead>
                <Tr>
                  <Th>Multicast Group</Th>
                  <Th>Port</Th>
                  <Th>Purpose</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td><Code>224.2.127.254</Code></Td>
                  <Td>9875</Td>
                  <Td>Standard SAP multicast</Td>
                </Tr>
                <Tr>
                  <Td><Code>224.0.0.56</Code></Td>
                  <Td>9875</Td>
                  <Td>Alternative SAP multicast</Td>
                </Tr>
              </Tbody>
            </Table>

            <UnorderedList spacing={2}>
              <ListItem>Monitors both IPv4 multicast groups simultaneously</ListItem>
              <ListItem>Automatically opens RTP receiver sockets for discovered streams</ListItem>
              <ListItem>Parses SDP payloads to extract stream properties</ListItem>
              <ListItem>Handles both unicast and multicast RTP sessions</ListItem>
            </UnorderedList>
          </Box>

          <Box>
            <Heading as="h3" size="md" mb={3}>SAP Announcer</Heading>
            <Text mb={3}>
              When sending RTP streams to multicast addresses, ScreamRouter also sends SAP announcements:
            </Text>
            
            <UnorderedList spacing={2}>
              <ListItem>Announces streams every 5 seconds</ListItem>
              <ListItem>Includes complete SDP session description</ListItem>
              <ListItem>Supports deletion announcements when streams stop</ListItem>
              <ListItem>Compliant with RFC 2974 specifications</ListItem>
            </UnorderedList>
          </Box>
        </VStack>
      </DocSection>

      <DocSection title="SDP Parsing" icon={FaSearch}>
        <Text mb={4}>
          ScreamRouter extracts comprehensive information from SDP (Session Description Protocol) payloads in SAP announcements:
        </Text>

        <VStack align="stretch" spacing={4} mb={6}>
          <Box>
            <Heading as="h4" size="sm" mb={2}>Extracted Properties</Heading>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Property</Th>
                  <Th>SDP Field</Th>
                  <Th>Example</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Session Name</Td>
                  <Td><Code>s=</Code></Td>
                  <Td>"Living Room Audio"</Td>
                </Tr>
                <Tr>
                  <Td>Source IP</Td>
                  <Td><Code>o=</Code></Td>
                  <Td>192.168.1.100</Td>
                </Tr>
                <Tr>
                  <Td>Multicast IP</Td>
                  <Td><Code>c=</Code></Td>
                  <Td>239.1.1.1</Td>
                </Tr>
                <Tr>
                  <Td>Port</Td>
                  <Td><Code>m=</Code></Td>
                  <Td>5004</Td>
                </Tr>
                <Tr>
                  <Td>Sample Rate</Td>
                  <Td><Code>a=rtpmap</Code></Td>
                  <Td>48000</Td>
                </Tr>
                <Tr>
                  <Td>Channels</Td>
                  <Td><Code>a=rtpmap</Code></Td>
                  <Td>2</Td>
                </Tr>
                <Tr>
                  <Td>Format</Td>
                  <Td><Code>a=rtpmap</Code></Td>
                  <Td>L16, L24, S16LE</Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>

          <Box>
            <Heading as="h4" size="sm" mb={2}>Supported Audio Formats</Heading>
            <HStack spacing={2} wrap="wrap">
              <Badge colorScheme="green">L16 (16-bit linear)</Badge>
              <Badge colorScheme="green">L24 (24-bit linear)</Badge>
              <Badge colorScheme="green">S16LE (16-bit little-endian)</Badge>
              <Badge colorScheme="green">S16BE (16-bit big-endian)</Badge>
            </HStack>
          </Box>
        </VStack>

        <Alert status="info" mb={4}>
          <AlertIcon />
          <Text>
            ScreamRouter automatically detects the audio format from the SDP payload and configures the RTP receiver accordingly!
          </Text>
        </Alert>
      </DocSection>

      <DocSection title="Compatible Applications">
        <Text mb={4}>
          SAP discovery works with many popular audio streaming applications:
        </Text>

        <VStack align="stretch" spacing={4} mb={6}>
          <Box>
            <Heading as="h4" size="sm" mb={2}>PulseAudio</Heading>
            <Text mb={2}>Enable SAP announcements with <Code>module-rtp-send</Code>:</Text>
            <Code display="block" whiteSpace="pre" p={3} borderRadius="md" bg="gray.50">
{`pactl load-module module-rtp-send \\
  source=@DEFAULT_SOURCE@ \\
  destination_ip=239.1.1.1 \\
  port=5004 \\
  loop=1 \\
  enable_sap=1 \\
  sap_address=224.2.127.254`}
            </Code>
          </Box>

          <Box>
            <Heading as="h4" size="sm" mb={2}>VLC Media Player</Heading>
            <Text mb={2}>VLC automatically sends SAP announcements for RTP streams:</Text>
            <Code display="block" whiteSpace="pre" p={3} borderRadius="md" bg="gray.50">
{`vlc input.mp3 --sout '#rtp{dst=239.1.1.1,port=5004,sap,name="VLC Stream"}'`}
            </Code>
          </Box>

          <Box>
            <Heading as="h4" size="sm" mb={2}>PipeWire</Heading>
            <Text mb={2}>PipeWire's RTP module supports SAP:</Text>
            <Code display="block" whiteSpace="pre" p={3} borderRadius="md" bg="gray.50">
{`pw-cli load-module libpipewire-module-rtp-sink \\
  sink.name="RTP Sink" \\
  sess.name="PipeWire Audio" \\
  destination.ip=239.1.1.1 \\
  destination.port=5004 \\
  sess.sap=true`}
            </Code>
          </Box>

          <Box>
            <Heading as="h4" size="sm" mb={2}>FFmpeg</Heading>
            <Text mb={2}>Stream with SAP announcements using FFmpeg:</Text>
            <Code display="block" whiteSpace="pre" p={3} borderRadius="md" bg="gray.50">
{`ffmpeg -re -i input.mp3 \\
  -acodec pcm_s16be -ar 48000 -ac 2 \\
  -f rtp_mpegts \\
  -sdp_file stream.sdp \\
  "rtp://239.1.1.1:5004?announce=1&sap=1"`}
            </Code>
          </Box>
        </VStack>
      </DocSection>

      <DocSection title="Configuration">
        <Heading as="h3" size="md" mb={3}>
          Enabling SAP Discovery
        </Heading>

        <Text mb={4}>
          SAP discovery is enabled by default in ScreamRouter. You can configure it in the settings:
        </Text>

        <Code display="block" whiteSpace="pre" p={4} borderRadius="md" bg="gray.50" mb={6}>
{`# config.yaml
sap:
  enabled: true
  listener:
    multicast_groups:
      - "224.2.127.254"
      - "224.0.0.56"
    port: 9875
    auto_add_sources: true    # Automatically add discovered sources
    cleanup_timeout: 30       # Remove sources after 30s of no announcements
  
  announcer:
    enabled: true             # Send SAP for multicast streams
    interval: 5               # Announcement interval in seconds
    ttl: 64                   # Multicast TTL`}
        </Code>

        <Heading as="h3" size="md" mb={3} mt={6}>
          Manual SAP Source Addition
        </Heading>

        <Text mb={4}>
          While SAP sources are usually auto-discovered, you can also manually add them:
        </Text>

        <UnorderedList spacing={2} mb={6}>
          <ListItem>Navigate to Sources in the web interface</ListItem>
          <ListItem>Click "Add Source"</ListItem>
          <ListItem>Select "SAP/RTP Source"</ListItem>
          <ListItem>Enter the multicast address to monitor</ListItem>
          <ListItem>ScreamRouter will listen for SAP announcements on that address</ListItem>
        </UnorderedList>
      </DocSection>

      <DocSection title="Network Requirements">
        <Text mb={4}>
          For SAP discovery to work properly, ensure your network supports:
        </Text>

        <VStack align="stretch" spacing={4} mb={6}>
          <Box>
            <Heading as="h4" size="sm" mb={2}>Multicast Support</Heading>
            <UnorderedList spacing={2}>
              <ListItem>IGMP snooping enabled on switches</ListItem>
              <ListItem>Multicast routing configured if crossing subnets</ListItem>
              <ListItem>Firewall allows UDP port 9875</ListItem>
              <ListItem>Firewall allows multicast groups 224.0.0.0/4</ListItem>
            </UnorderedList>
          </Box>

          <Box>
            <Heading as="h4" size="sm" mb={2}>Docker Considerations</Heading>
            <Alert status="warning">
              <AlertIcon />
              <Text>
                SAP discovery requires host networking mode in Docker. Port mapping mode will not work for multicast traffic.
              </Text>
            </Alert>
          </Box>
        </VStack>
      </DocSection>

      <DocSection title="Troubleshooting">
        <Heading as="h3" size="md" mb={3}>
          No Sources Discovered
        </Heading>

        <UnorderedList spacing={2} mb={4}>
          <ListItem>Verify multicast is working: <Code>ping 224.2.127.254</Code></ListItem>
          <ListItem>Check firewall allows UDP port 9875</ListItem>
          <ListItem>Ensure IGMP snooping is configured on switches</ListItem>
          <ListItem>Verify source application has SAP enabled</ListItem>
          <ListItem>Check ScreamRouter logs for SAP listener errors</ListItem>
        </UnorderedList>

        <Heading as="h3" size="md" mb={3} mt={6}>
          Sources Appear and Disappear
        </Heading>

        <UnorderedList spacing={2} mb={4}>
          <ListItem>Check network stability and packet loss</ListItem>
          <ListItem>Increase cleanup timeout in configuration</ListItem>
          <ListItem>Verify source is sending announcements regularly</ListItem>
          <ListItem>Check for duplicate IP addresses on network</ListItem>
        </UnorderedList>

        <Heading as="h3" size="md" mb={3} mt={6}>
          Monitoring SAP Traffic
        </Heading>

        <Text mb={3}>Use tcpdump or Wireshark to monitor SAP announcements:</Text>
        <Code display="block" whiteSpace="pre" p={3} borderRadius="md" bg="gray.50" mb={4}>
{`# Monitor SAP announcements
tcpdump -i any -n port 9875

# Filter for SAP multicast
tcpdump -i any -n dst 224.2.127.254 and port 9875

# Capture to file for Wireshark analysis
tcpdump -i any -w sap.pcap port 9875`}
        </Code>

        <Alert status="info" mt={6}>
          <AlertIcon />
          <Text>
            SAP announcements should appear every 5-30 seconds. If you don't see any traffic, 
            check your multicast configuration and firewall rules.
          </Text>
        </Alert>
      </DocSection>

      <DocSection title="Benefits">
        <Text mb={4}>
          SAP discovery provides several advantages:
        </Text>

        <VStack align="stretch" spacing={3}>
          <HStack align="start">
            <Badge colorScheme="green" mt={1}>1</Badge>
            <Box>
              <Text fontWeight="bold">Zero Configuration</Text>
              <Text fontSize="sm">Audio sources are automatically discovered without manual setup</Text>
            </Box>
          </HStack>

          <HStack align="start">
            <Badge colorScheme="green" mt={1}>2</Badge>
            <Box>
              <Text fontWeight="bold">Dynamic Networks</Text>
              <Text fontSize="sm">Sources can join and leave without reconfiguration</Text>
            </Box>
          </HStack>

          <HStack align="start">
            <Badge colorScheme="green" mt={1}>3</Badge>
            <Box>
              <Text fontWeight="bold">Interoperability</Text>
              <Text fontSize="sm">Works with many existing audio streaming applications</Text>
            </Box>
          </HStack>

          <HStack align="start">
            <Badge colorScheme="green" mt={1}>4</Badge>
            <Box>
              <Text fontWeight="bold">Professional Standards</Text>
              <Text fontSize="sm">Used in broadcast and professional audio environments</Text>
            </Box>
          </HStack>
        </VStack>
      </DocSection>
    </Box>
  );
}

export default SAPDoc;