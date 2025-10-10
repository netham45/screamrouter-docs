import React from 'react';
import {
  Box,
  Heading,
  Text,
  Code,
  VStack,
  Divider,
  Alert,
  AlertIcon,
  UnorderedList,
  ListItem,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  HStack
} from '@chakra-ui/react';
import DocSection from './DocSection';
import { FaNetworkWired, FaBroadcastTower, FaCog, FaSync } from 'react-icons/fa';

function AutoconfigDoc() {
  return (
    <Box>
      <Heading size="lg" mb={4}>Autoconfiguration via mDNS</Heading>
      <Text mb={4}>
        ScreamRouter provides comprehensive mDNS (Multicast DNS) support for automatic discovery and configuration of audio devices on the local network.
        Multiple specialized mDNS components work together to create a zero-configuration audio network.
      </Text>

      <Alert status="success" mb={6}>
        <AlertIcon />
        <Box>
          <Text fontWeight="bold">Zero-Configuration Networking</Text>
          <Text>Devices automatically discover ScreamRouter and sync their settings without manual configuration!</Text>
        </Box>
      </Alert>

      <DocSection title="Config ID">
        <Text mb={2}>
          All sinks and sources are assigned a unique <Code>config_id</Code>. This identifier is persistent for each sender/receiver instance and allows ScreamRouter to update their configuration even if their IP address or hostname changes.
        </Text>
      </DocSection>

      <Divider my={6} />

      <DocSection title="mDNS Components" icon={FaNetworkWired}>
        <Text mb={4}>
          ScreamRouter includes four specialized mDNS components that work together:
        </Text>

        <Table variant="simple" size="sm" mb={6}>
          <Thead>
            <Tr>
              <Th>Component</Th>
              <Th>Purpose</Th>
              <Th>Service Type</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td><Code>MDNSPinger</Code></Td>
              <Td>Discovers Scream sources and sinks</Td>
              <Td><Code>_scream._udp.local</Code></Td>
            </Tr>
            <Tr>
              <Td><Code>MDNSResponder</Code></Td>
              <Td>Responds to hostname queries</Td>
              <Td><Code>screamrouter.local</Code></Td>
            </Tr>
            <Tr>
              <Td><Code>ScreamAdvertiser</Code></Td>
              <Td>Advertises as Scream receiver</Td>
              <Td><Code>_scream._udp</Code></Td>
            </Tr>
            <Tr>
              <Td><Code>MDNSSettingsPinger</Code></Td>
              <Td>Syncs settings between devices</Td>
              <Td><Code>*.settings.screamrouter.local</Code></Td>
            </Tr>
          </Tbody>
        </Table>
      </DocSection>

      <DocSection title="MDNSPinger - Device Discovery" icon={FaBroadcastTower}>
        <Text mb={4}>
          The MDNSPinger component continuously discovers Scream-compatible devices on the network:
        </Text>

        <VStack align="stretch" spacing={4} mb={6}>
          <Box>
            <Heading as="h4" size="sm" mb={2}>Features</Heading>
            <UnorderedList spacing={2}>
              <ListItem>Browses for <Code>_scream._udp.local</Code> services</ListItem>
              <ListItem>Sends periodic discovery queries every 5 seconds</ListItem>
              <ListItem>Maintains a list of discovered sources and sinks</ListItem>
              <ListItem>Automatically adds new devices to configuration</ListItem>
              <ListItem>Removes devices that stop responding</ListItem>
            </UnorderedList>
          </Box>

          <Box>
            <Heading as="h4" size="sm" mb={2}>Discovered Properties</Heading>
            <UnorderedList spacing={2}>
              <ListItem>Device name and type</ListItem>
              <ListItem>IP address and port</ListItem>
              <ListItem>Audio format (channels, sample rate)</ListItem>
              <ListItem>Device capabilities</ListItem>
            </UnorderedList>
          </Box>
        </VStack>
      </DocSection>

      <DocSection title="MDNSResponder - Hostname Resolution" icon={FaCog}>
        <Text mb={4}>
          The MDNSResponder makes ScreamRouter discoverable on the network:
        </Text>

        <VStack align="stretch" spacing={4} mb={6}>
          <Box>
            <Heading as="h4" size="sm" mb={2}>Functionality</Heading>
            <UnorderedList spacing={2}>
              <ListItem>Registers <Code>screamrouter.local</Code> hostname</ListItem>
              <ListItem>Responds to A and PTR record queries</ListItem>
              <ListItem>Supports multiple network interfaces</ListItem>
              <ListItem>Handles both IPv4 and IPv6 queries</ListItem>
              <ListItem>Provides reverse DNS lookups</ListItem>
            </UnorderedList>
          </Box>

          <Box>
            <Heading as="h4" size="sm" mb={2}>Query Examples</Heading>
            <Code display="block" whiteSpace="pre" p={3} borderRadius="md" bg="gray.50">
{`# Discover ScreamRouter IP
$ dig +short A screamrouter.local @224.0.0.251 -p 5353
192.168.1.100

# Get hostname from IP
$ dig +short PTR 192.168.1.100 @224.0.0.251 -p 5353
screamrouter.local`}
            </Code>
          </Box>
        </VStack>
      </DocSection>

      <DocSection title="ScreamAdvertiser - Receiver Advertisement">
        <Text mb={4}>
          The ScreamAdvertiser announces ScreamRouter as a Scream receiver to compatible devices:
        </Text>

        <VStack align="stretch" spacing={4} mb={6}>
          <Box>
            <Heading as="h4" size="sm" mb={2}>Advertisement Details</Heading>
            <UnorderedList spacing={2}>
              <ListItem>Service type: <Code>_scream._udp</Code></ListItem>
              <ListItem>Port: 4011 (default RTP receiver port)</ListItem>
              <ListItem>Compatible with ESP32-Scream devices</ListItem>
              <ListItem>Works with Scream virtual audio driver</ListItem>
              <ListItem>Announces receiver availability</ListItem>
            </UnorderedList>
          </Box>

          <Box>
            <Heading as="h4" size="sm" mb={2}>Service Properties</Heading>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Property</Th>
                  <Th>Value</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>name</Td>
                  <Td>ScreamRouter</Td>
                </Tr>
                <Tr>
                  <Td>port</Td>
                  <Td>4011</Td>
                </Tr>
                <Tr>
                  <Td>channels</Td>
                  <Td>2-8</Td>
                </Tr>
                <Tr>
                  <Td>sample_rate</Td>
                  <Td>44100/48000</Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </VStack>
      </DocSection>

      <DocSection title="MDNSSettingsPinger - Settings Synchronization" icon={FaSync}>
        <Text mb={4}>
          The MDNSSettingsPinger enables automatic settings synchronization between ScreamRouter instances and devices:
        </Text>

        <VStack align="stretch" spacing={4} mb={6}>
          <Box>
            <Heading as="h4" size="sm" mb={2}>Synchronized Settings</Heading>
            <UnorderedList spacing={2}>
              <ListItem><strong>Volume levels:</strong> Per-sink volume settings</ListItem>
              <ListItem><strong>Equalizer settings:</strong> EQ presets and custom curves</ListItem>
              <ListItem><strong>Route configurations:</strong> Audio routing rules</ListItem>
              <ListItem><strong>Device names:</strong> Friendly names for sources/sinks</ListItem>
              <ListItem><strong>Group assignments:</strong> Device grouping information</ListItem>
            </UnorderedList>
          </Box>

          <Box>
            <Heading as="h4" size="sm" mb={2}>TXT Record Exchange</Heading>
            <Text mb={2}>Settings are exchanged via mDNS TXT records:</Text>
            <Code display="block" whiteSpace="pre" p={3} borderRadius="md" bg="gray.50">
{`# Query sink settings
$ dig +short TXT sink.settings.screamrouter.local @224.0.0.251 -p 5353
"volume=75;eq_preset=flat;name=Living Room"

# Query source settings
$ dig +short TXT source.settings.screamrouter.local @224.0.0.251 -p 5353
"format=S16LE;rate=48000;channels=2;name=Desktop PC"`}
            </Code>
          </Box>

          <Box>
            <Heading as="h4" size="sm" mb={2}>Automatic Sync Process</Heading>
            <UnorderedList spacing={2}>
              <ListItem>Queries for settings every 10 seconds</ListItem>
              <ListItem>Compares with local configuration</ListItem>
              <ListItem>Updates changed settings automatically</ListItem>
              <ListItem>Broadcasts own settings for other instances</ListItem>
            </UnorderedList>
          </Box>
        </VStack>
      </DocSection>

      <Divider my={6} />

      <DocSection title="Discovering ScreamRouter">
        <Text mb={2}>Devices first need to find the IP address of the ScreamRouter instance. This is done by querying the A record for <Code>screamrouter.local</Code> via mDNS:</Text>
        <Code display="block" whiteSpace="pre" p={3} mb={4}>
          $ dig +short A screamrouter.local @224.0.0.251 -p 5353
          <br />
          192.168.3.114
        </Code>
        <Text mb={2}>
          Query PTR over mdns to get fqdn for domain uvicorn ssl is for:
        </Text>
        <Code display="block" whiteSpace="pre" p={3} mb={4}>
          $ dig +short PTR $(dig +short A screamrouter.local @224.0.0.251 -p 5353) @224.0.0.251 -p 5353
          <br />
          screamrouter.netham45.org
        </Code>
        {/* Removed the extra explanatory text */}
      </DocSection>

      <Divider my={6} />

      <DocSection title="Discovering Sinks (Receivers)">
        <Text mb={2}>To find all available sinks on the network, devices query the A record for <Code>sink.screamrouter.local</Code>:</Text>
        <Code display="block" whiteSpace="pre" p={3} mb={4}>
          $ dig +short A sink.screamrouter.local @224.0.0.251 -p 5353
          <br />
          192.168.3.164
        </Code>
      </DocSection>

      <Divider my={6} />

      <DocSection title="Discovering Sources (Senders)">
        <Text mb={2}>Similarly, to find all available sources, devices query the A record for <Code>source.screamrouter.local</Code>:</Text>
        <Code display="block" whiteSpace="pre" p={3} mb={4}>
          $ dig +short A source.screamrouter.local @224.0.0.251 -p 5353
          <br />
          192.168.3.164
        </Code>
      </DocSection>

      <Divider my={6} />

      <DocSection title="Sink Configuration Discovery via TXT Records">
        <Text mb={2}>
          Sinks (receivers) advertise their current configuration and capabilities via mDNS TXT records. ScreamRouter queries the <Code>sink.settings.screamrouter.local</Code> hostname (either via multicast or directly at a sink's IP if known) to discover these settings. The TXT record typically includes details like bit depth, sample rate, channel layout, the sink's IP address, and its unique <Code>config_id</Code>.
        </Text>
        <Text mb={2}>Example query performed by ScreamRouter (querying all sinks via multicast):</Text>
        <Code display="block" whiteSpace="pre" p={3} mb={4}>
          $ dig +short TXT sink.settings.screamrouter.local @224.0.0.251 -p 5353
          <br />
          "bit_depth=32;sample_rate=48000;channels=8;channel_layout=7.1;id=d6da54f4-78ac-444d-885a-51183edc09d5;ip=192.168.3.164"
        </Code>
        <Text>
          ScreamRouter uses the <Code>config_id</Code> from the TXT record to uniquely identify the sink, allowing it to manage and potentially update the sink's configuration later, even if the sink's IP address changes.
        </Text>
      </DocSection>

      <Divider my={6} />

      <DocSection title="Source Configuration Discovery via TXT Records">
        <Text mb={2}>
          Similarly, sources (senders) advertise their configuration via TXT records. ScreamRouter queries <Code>source.settings.screamrouter.local</Code> to discover source details like IP address, type, version, and the source's unique <Code>config_id</Code>. This allows ScreamRouter to identify and manage sources.
        </Text>
         <Text mb={2}>Example query performed by ScreamRouter (querying all sources via multicast):</Text>
       <Code display="block" whiteSpace="pre" p={3} mb={4}>
          $ dig +short TXT source.settings.screamrouter.local @224.0.0.251 -p 5353
          <br />
          "id=d6da54f4-78ac-444d-885a-51183edc09d5;ip=192.168.3.164;type=source;version=1.0"
        </Code>
        <Text>
          ScreamRouter uses the <Code>config_id</Code> to track the source and can use this information to configure routing or other settings related to this source.
        </Text>
      </DocSection>

      <Divider my={6} />

      <DocSection title="Network Requirements">
        <Text mb={4}>
          For mDNS discovery to work properly:
        </Text>

        <VStack align="stretch" spacing={4} mb={6}>
          <Box>
            <Heading as="h4" size="sm" mb={2}>Network Configuration</Heading>
            <UnorderedList spacing={2}>
              <ListItem>mDNS uses multicast address <Code>224.0.0.251</Code> port 5353</ListItem>
              <ListItem>Firewall must allow UDP port 5353</ListItem>
              <ListItem>Devices must be on the same network segment</ListItem>
              <ListItem>IGMP snooping should be configured on switches</ListItem>
            </UnorderedList>
          </Box>

          <Box>
            <Heading as="h4" size="sm" mb={2}>Docker Considerations</Heading>
            <Alert status="warning">
              <AlertIcon />
              <Text>
                mDNS requires host networking mode in Docker. Port mapping mode will not work for multicast mDNS traffic.
              </Text>
            </Alert>
          </Box>
        </VStack>
      </DocSection>
      
      <Divider my={6} />

      <DocSection title="Desktop Client Autodiscovery Example">
        <Text mb={2}>The Windows Desktop client uses this mechanism:</Text>
        <VStack align="start" spacing={1} mb={4}>
          <Text>1. Starts up without a pre-defined configuration.</Text>
          <Text>2. Queries the A record for <Code>screamrouter.local</Code> via mDNS (224.0.0.251:5353).</Text>
          <Text>3. Uses the returned IP address as the default destination for sending audio.</Text>
          <Text>4. Queries the PTR record for the discovered IP to get the correct SSL hostname.</Text>
          <Text>5. Uses the hostname to form the secure URL (e.g., <Code>https://hostname.local/site/DesktopMenu</Code>) to fetch its menu configuration.</Text>
        </VStack>

        <Alert status="success" mt={4}>
          <AlertIcon />
          <Text>
            This zero-configuration approach means the Windows Desktop client can automatically find and connect to ScreamRouter without any manual setup!
          </Text>
        </Alert>
      </DocSection>

      <DocSection title="Benefits of mDNS">
        <Text mb={4}>
          The comprehensive mDNS implementation provides:
        </Text>

        <VStack align="stretch" spacing={3}>
          <HStack align="start">
            <Badge colorScheme="green" mt={1}>1</Badge>
            <Box>
              <Text fontWeight="bold">Zero Configuration</Text>
              <Text fontSize="sm">Devices automatically discover and configure themselves</Text>
            </Box>
          </HStack>

          <HStack align="start">
            <Badge colorScheme="green" mt={1}>2</Badge>
            <Box>
              <Text fontWeight="bold">Dynamic Updates</Text>
              <Text fontSize="sm">Settings sync automatically between devices</Text>
            </Box>
          </HStack>

          <HStack align="start">
            <Badge colorScheme="green" mt={1}>3</Badge>
            <Box>
              <Text fontWeight="bold">Cross-Platform</Text>
              <Text fontSize="sm">Works with Windows, Linux, macOS, and embedded devices</Text>
            </Box>
          </HStack>

          <HStack align="start">
            <Badge colorScheme="green" mt={1}>4</Badge>
            <Box>
              <Text fontWeight="bold">Industry Standard</Text>
              <Text fontSize="sm">Uses Zeroconf/Bonjour protocols supported everywhere</Text>
            </Box>
          </HStack>
        </VStack>
      </DocSection>

      <DocSection title="Troubleshooting">
        <Heading as="h4" size="sm" mb={2}>Devices Not Discovered</Heading>
        <UnorderedList spacing={2} mb={4}>
          <ListItem>Check firewall allows UDP port 5353</ListItem>
          <ListItem>Verify devices are on same network segment</ListItem>
          <ListItem>Test mDNS with: <Code>avahi-browse -a</Code> (Linux) or <Code>dns-sd -B _services._dns-sd._udp</Code> (macOS)</ListItem>
          <ListItem>Check Docker is using host networking mode</ListItem>
        </UnorderedList>

        <Heading as="h4" size="sm" mb={2} mt={4}>Settings Not Syncing</Heading>
        <UnorderedList spacing={2}>
          <ListItem>Verify MDNSSettingsPinger is enabled in config</ListItem>
          <ListItem>Check network allows multicast traffic</ListItem>
          <ListItem>Review ScreamRouter logs for sync errors</ListItem>
          <ListItem>Ensure devices have unique config_ids</ListItem>
        </UnorderedList>
      </DocSection>

    </Box>
  );
}

export default AutoconfigDoc;
