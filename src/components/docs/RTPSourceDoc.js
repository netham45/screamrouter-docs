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
  Td,
  Badge,
  HStack,
  VStack,
} from '@chakra-ui/react';
import DocSection from './DocSection';

function RTPSourceDoc() {
  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>
        RTP Audio Sources
      </Heading>
      
      <Text fontSize="lg" mb={4}>
        Real-Time Transport Protocol (RTP) is a network protocol for delivering audio and video over IP networks. 
        ScreamRouter provides comprehensive RTP support with automatic format detection, multicast capabilities, 
        and compatibility with standard audio streaming tools.
      </Text>

      <Alert status="success" mb={6}>
        <AlertIcon />
        <Box>
          <Text fontWeight="bold">Enhanced RTP Support</Text>
          <Text>Now with S16BE format support, multicast transmission, SAP discovery, and RTCP synchronization!</Text>
        </Box>
      </Alert>
      
      <DocSection title="Supported Audio Formats">
        <Text mb={4}>
          ScreamRouter's RTP receiver automatically detects and handles multiple audio formats:
        </Text>
        
        <Table variant="simple" mb={6}>
          <Thead>
            <Tr>
              <Th>Format</Th>
              <Th>Description</Th>
              <Th>Endianness</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td><Code>S16BE</Code></Td>
              <Td>16-bit signed PCM</Td>
              <Td>Big-endian (Network byte order)</Td>
              <Td><Badge colorScheme="green">Recommended</Badge></Td>
            </Tr>
            <Tr>
              <Td><Code>S16LE</Code></Td>
              <Td>16-bit signed PCM</Td>
              <Td>Little-endian</Td>
              <Td><Badge colorScheme="blue">Supported</Badge></Td>
            </Tr>
            <Tr>
              <Td><Code>L24</Code></Td>
              <Td>24-bit linear PCM</Td>
              <Td>Big-endian</Td>
              <Td><Badge colorScheme="blue">Supported</Badge></Td>
            </Tr>
            <Tr>
              <Td><Code>L16</Code></Td>
              <Td>16-bit linear PCM</Td>
              <Td>Big-endian</Td>
              <Td><Badge colorScheme="blue">Supported</Badge></Td>
            </Tr>
          </Tbody>
        </Table>

        <Alert status="info" mb={4}>
          <AlertIcon />
          <Text>
            <strong>Automatic Endianness Detection:</strong> ScreamRouter automatically detects and converts between 
            big-endian and little-endian formats as needed. Raspberry Pi Zero and other RTP senders should use 
            S16BE for standard RTP compliance.
          </Text>
        </Alert>
      </DocSection>

      <DocSection title="Multicast Support">
        <Text mb={4}>
          ScreamRouter now fully supports RTP multicast transmission and reception:
        </Text>

        <VStack align="stretch" spacing={4} mb={6}>
          <Box>
            <Heading as="h4" size="sm" mb={2}>Multicast IP Ranges</Heading>
            <UnorderedList spacing={2}>
              <ListItem>
                <Code>224.0.0.0</Code> to <Code>239.255.255.255</Code> - Standard multicast range
              </ListItem>
              <ListItem>
                Automatic detection of multicast addresses
              </ListItem>
              <ListItem>
                TTL set to 64 for cross-subnet transmission
              </ListItem>
            </UnorderedList>
          </Box>

          <Box>
            <Heading as="h4" size="sm" mb={2}>Configuration Example</Heading>
            <Code display="block" whiteSpace="pre" p={3} borderRadius="md" bg="gray.50">
{`# Multicast RTP sender configuration
IP: 239.1.1.1
Port: 5004
TTL: 64
Interface: Auto-selected based on primary IP`}
            </Code>
          </Box>
        </VStack>

        <Alert status="success" mb={4}>
          <AlertIcon />
          <Text>
            When sending to multicast addresses, ScreamRouter also sends SAP announcements for automatic discovery!
          </Text>
        </Alert>
      </DocSection>

      <DocSection title="SAP Discovery Integration">
        <Text mb={4}>
          Session Announcement Protocol (SAP) enables automatic stream discovery:
        </Text>

        <UnorderedList spacing={3} mb={6}>
          <ListItem>
            <strong>Automatic Discovery:</strong> RTP streams announced via SAP are automatically detected
          </ListItem>
          <ListItem>
            <strong>Monitored Addresses:</strong>
            <UnorderedList mt={2} ml={6}>
              <ListItem><Code>224.2.127.254:9875</Code> - Standard SAP multicast</ListItem>
              <ListItem><Code>224.0.0.56:9875</Code> - Alternative SAP multicast</ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            <strong>SDP Parsing:</strong> Extracts sample rate, channels, bit depth, and format from announcements
          </ListItem>
          <ListItem>
            <strong>Dynamic Sessions:</strong> Automatically opens RTP receivers for discovered streams
          </ListItem>
        </UnorderedList>
      </DocSection>

      <DocSection title="RTCP Support">
        <Text mb={4}>
          Real-time Transport Control Protocol (RTCP) provides synchronization and quality feedback:
        </Text>

        <VStack align="stretch" spacing={4} mb={6}>
          <Box>
            <Heading as="h4" size="sm" mb={2}>RTCP Features</Heading>
            <UnorderedList spacing={2}>
              <ListItem>
                <strong>Sender Reports (SR):</strong> Sent every 5 seconds with NTP timestamps
              </ListItem>
              <ListItem>
                <strong>Receiver Reports (RR):</strong> Packet loss and jitter statistics
              </ListItem>
              <ListItem>
                <strong>Time Synchronization:</strong> NTP/RTP timestamp correlation for synchronized playback
              </ListItem>
              <ListItem>
                <strong>Automatic Port:</strong> Uses RTP port + 1 (standard convention)
              </ListItem>
            </UnorderedList>
          </Box>

          <Box>
            <Heading as="h4" size="sm" mb={2}>Supported RTCP Packet Types</Heading>
            <HStack spacing={2}>
              <Badge>200 (SR)</Badge>
              <Badge>201 (RR)</Badge>
              <Badge>202 (SDES)</Badge>
              <Badge>203 (BYE)</Badge>
              <Badge>204 (APP)</Badge>
            </HStack>
          </Box>
        </VStack>
      </DocSection>

      <DocSection title="Compatibility">
        <Text mb={4}>
          ScreamRouter's RTP implementation is compatible with major audio streaming applications:
        </Text>

        <VStack align="stretch" spacing={4} mb={6}>
          <Box>
            <Heading as="h4" size="sm" mb={2}>PulseAudio</Heading>
            <Text mb={2}>Works with PulseAudio's <Code>module-rtp-send</Code>:</Text>
            <Code display="block" whiteSpace="pre" p={3} borderRadius="md" bg="gray.50">
{`pactl load-module module-rtp-send \\
  source=@DEFAULT_SOURCE@ \\
  destination_ip=239.1.1.1 \\
  port=5004`}
            </Code>
          </Box>

          <Box>
            <Heading as="h4" size="sm" mb={2}>VLC Media Player</Heading>
            <Text mb={2}>Stream audio from VLC using RTP:</Text>
            <Code display="block" whiteSpace="pre" p={3} borderRadius="md" bg="gray.50">
{`vlc input.mp3 --sout '#rtp{dst=192.168.1.10,port=5004,mux=ts}'`}
            </Code>
          </Box>

          <Box>
            <Heading as="h4" size="sm" mb={2}>PipeWire</Heading>
            <Text mb={2}>Compatible with PipeWire's RTP modules:</Text>
            <Code display="block" whiteSpace="pre" p={3} borderRadius="md" bg="gray.50">
{`pw-cli load-module libpipewire-module-rtp-source \\
  sess.name="RTP Source" \\
  source.ip=0.0.0.0 \\
  source.port=5004`}
            </Code>
          </Box>

          <Box>
            <Heading as="h4" size="sm" mb={2}>FFmpeg</Heading>
            <Text mb={2}>Stream with FFmpeg using S16BE format:</Text>
            <Code display="block" whiteSpace="pre" p={3} borderRadius="md" bg="gray.50">
{`ffmpeg -re -i input.mp3 \\
  -acodec pcm_s16be \\
  -ar 48000 -ac 2 \\
  -f rtp rtp://192.168.1.10:5004`}
            </Code>
          </Box>
        </VStack>
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
              <Td>"Living Room Stream"</Td>
            </Tr>
            <Tr>
              <Td>Listen IP</Td>
              <Td>IP to listen on (0.0.0.0 for all, or multicast IP)</Td>
              <Td>239.1.1.1</Td>
            </Tr>
            <Tr>
              <Td>Port</Td>
              <Td>UDP port for RTP packets</Td>
              <Td>5004</Td>
            </Tr>
            <Tr>
              <Td>Format</Td>
              <Td>Audio format (auto-detected if via SAP)</Td>
              <Td>S16BE</Td>
            </Tr>
            <Tr>
              <Td>Sample Rate</Td>
              <Td>Sample rate in Hz</Td>
              <Td>48000</Td>
            </Tr>
            <Tr>
              <Td>Channels</Td>
              <Td>Number of audio channels</Td>
              <Td>2</Td>
            </Tr>
            <Tr>
              <Td>Time Sync</Td>
              <Td>Enable RTCP time synchronization</Td>
              <Td>Enabled</Td>
            </Tr>
          </Tbody>
        </Table>
        
        <Alert status="info" mb={4}>
          <AlertIcon />
          <Text>
            If using SAP discovery, many parameters are automatically configured from the SDP announcement!
          </Text>
        </Alert>
      </DocSection>

      <DocSection title="Advanced Configuration">
        <Heading as="h3" size="md" mb={2}>
          Network Optimization
        </Heading>
        
        <Text mb={4}>
          For optimal RTP streaming performance:
        </Text>
        
        <UnorderedList mb={4} spacing={2}>
          <ListItem>Use wired connections for critical audio paths</ListItem>
          <ListItem>Configure QoS to prioritize RTP traffic (DSCP EF for audio)</ListItem>
          <ListItem>Ensure sufficient bandwidth (1.5 Mbps per stereo 48kHz stream)</ListItem>
          <ListItem>Open UDP ports in firewalls (RTP port and RTP port + 1 for RTCP)</ListItem>
          <ListItem>For multicast, ensure IGMP snooping is properly configured on switches</ListItem>
        </UnorderedList>
        
        <Heading as="h3" size="md" mb={2} mt={4}>
          Jitter Buffer Settings
        </Heading>
        
        <Text mb={4}>
          ScreamRouter includes adaptive jitter buffering for network variations:
        </Text>
        
        <UnorderedList mb={4} spacing={2}>
          <ListItem><strong>Adaptive Mode:</strong> Automatically adjusts based on network conditions</ListItem>
          <ListItem><strong>Fixed Mode:</strong> Manual buffer size (20-200ms typical)</ListItem>
          <ListItem><strong>Low Latency:</strong> 20-50ms for LAN environments</ListItem>
          <ListItem><strong>High Stability:</strong> 100-200ms for WAN or WiFi</ListItem>
        </UnorderedList>
      </DocSection>
      
      <DocSection title="Troubleshooting">
        <Heading as="h3" size="md" mb={2}>
          No Audio Received
        </Heading>
        
        <UnorderedList mb={4} spacing={2}>
          <ListItem>Check if SAP announcements are being received (check logs)</ListItem>
          <ListItem>Verify firewall allows UDP traffic on RTP and RTCP ports</ListItem>
          <ListItem>For multicast, ensure IGMP join requests are working</ListItem>
          <ListItem>Confirm audio format matches (use S16BE for best compatibility)</ListItem>
          <ListItem>Use Wireshark to verify RTP packets are arriving</ListItem>
        </UnorderedList>
        
        <Heading as="h3" size="md" mb={2} mt={4}>
          Audio Dropouts or Glitches
        </Heading>
        
        <UnorderedList mb={4} spacing={2}>
          <ListItem>Check RTCP receiver reports for packet loss statistics</ListItem>
          <ListItem>Increase jitter buffer size for WiFi connections</ListItem>
          <ListItem>Verify network isn't congested (check bandwidth usage)</ListItem>
          <ListItem>Enable time synchronization for multiple synchronized streams</ListItem>
          <ListItem>Consider using multicast for one-to-many streaming scenarios</ListItem>
        </UnorderedList>

        <Alert status="warning" mt={4}>
          <AlertIcon />
          <Text>
            For Raspberry Pi Zero senders: Ensure you're sending S16BE format for proper RTP compliance. 
            The system will automatically handle endianness conversion if needed.
          </Text>
        </Alert>
      </DocSection>
    </Box>
  );
}

export default RTPSourceDoc;