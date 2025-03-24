import React from 'react';
import {
  Box,
  Text,
  Heading,
  List,
  ListItem,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Code,
  Alert,
  AlertIcon,
  Image,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  OrderedList
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaChevronRight, FaNetworkWired, FaVolumeUp, FaHeadphones } from 'react-icons/fa';
import DocSection from './DocSection';

function ConfigurationDoc() {
  return (
    <Box>
      <Breadcrumb spacing="8px" separator={<FaChevronRight color="gray.500" />} mb={8}>
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to="/docs">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Configuration</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      
      <Heading as="h1" size="xl" mb={6}>
        ScreamRouter Configuration
      </Heading>
      
      <Text fontSize="lg" mb={8}>
        Learn how to configure ScreamRouter to create the perfect audio setup for your needs.
        This guide covers the main configuration components and how they interact with each other.
      </Text>
      
      <DocSection title="Configuration Overview" icon={FaNetworkWired}>
        <Text mb={4}>
          The ScreamRouter system manages audio routing between sources and sinks using three main components:
        </Text>
        
        <List spacing={4} styleType="decimal" ml={5} mb={6}>
          <ListItem>
            <Text fontWeight="bold">Sources</Text>
            <Text>Represent audio inputs to the system</Text>
          </ListItem>
          <ListItem>
            <Text fontWeight="bold">Sinks</Text>
            <Text>Represent audio outputs from the system</Text>
          </ListItem>
          <ListItem>
            <Text fontWeight="bold">Routes</Text>
            <Text>Define connections between sources and sinks</Text>
          </ListItem>
        </List>
        
        <Alert status="info" borderRadius="md" mb={6}>
          <AlertIcon />
          <Box>
            ScreamRouter uses a YAML-based configuration file to store all settings. The system automatically 
            saves changes to this file whenever configuration updates are made, ensuring that your setup is 
            always up-to-date and persistent across restarts.
          </Box>
        </Alert>
        
        <Text mb={4}>
          The ConfigurationSolver class handles the logic of resolving the connections between sources and sinks:
        </Text>
        <List spacing={2} styleType="disc" ml={5}>
          <ListItem>It expands source and sink groups into their individual components</ListItem>
          <ListItem>It applies volume, equalizer, and delay adjustments from routes, groups, and individual components</ListItem>
          <ListItem>It creates a final mapping of real (individual) sinks to lists of real sources</ListItem>
        </List>
      </DocSection>
      
      <DocSection title="Sources Configuration" icon={FaVolumeUp} mt={10}>
        <Text mb={4}>
          Sources represent audio inputs to the system. They can be individual sources or source groups.
        </Text>
        
        <Heading as="h3" size="md" mb={3}>Individual Sources</Heading>
        <Text mb={3}>
          Individual sources represent specific audio inputs, such as:
        </Text>
        <List spacing={2} styleType="disc" ml={5} mb={4}>
          <ListItem>A Windows PC running the Scream audio driver</ListItem>
          <ListItem>A Linux machine with RTP audio streaming</ListItem>
          <ListItem>An ESP32 device capturing audio from a USB source</ListItem>
          <ListItem>A Docker container running a streaming application</ListItem>
        </List>
        
        <Heading as="h3" size="md" mb={3}>Source Groups</Heading>
        <Text mb={3}>
          Source groups are collections of individual sources that can be managed together. This is useful for:
        </Text>
        <List spacing={2} styleType="disc" ml={5} mb={4}>
          <ListItem>Controlling volume for multiple sources at once</ListItem>
          <ListItem>Applying the same equalizer settings to a set of sources</ListItem>
          <ListItem>Creating logical groupings (e.g., "First Floor Music")</ListItem>
        </List>
        
        <Heading as="h3" size="md" mb={3}>Source Properties</Heading>
        <Accordion allowToggle mb={4}>
          <AccordionItem>
            <h3>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="semibold">
                  Basic Properties
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h3>
            <AccordionPanel pb={4}>
              <List spacing={2} styleType="disc" ml={5}>
                <ListItem><Text as="span" fontWeight="medium">Name:</Text> Unique identifier for the source</ListItem>
                <ListItem><Text as="span" fontWeight="medium">IP:</Text> Network address where the audio is coming from (for individual sources)</ListItem>
                <ListItem><Text as="span" fontWeight="medium">Tag:</Text> Optional identifier for matching audio streams</ListItem>
                <ListItem><Text as="span" fontWeight="medium">Is Group:</Text> Whether this source is a collection of other sources</ListItem>
                <ListItem><Text as="span" fontWeight="medium">Enabled:</Text> Whether the source is active and should receive audio</ListItem>
              </List>
            </AccordionPanel>
          </AccordionItem>
          
          <AccordionItem>
            <h3>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="semibold">
                  Audio Processing Properties
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h3>
            <AccordionPanel pb={4}>
              <List spacing={2} styleType="disc" ml={5}>
                <ListItem><Text as="span" fontWeight="medium">Volume:</Text> Level adjustment from 0.0 (mute) to 1.0 (full volume)</ListItem>
                <ListItem><Text as="span" fontWeight="medium">Delay:</Text> Time offset in milliseconds (0 to 5000ms)</ListItem>
                <ListItem><Text as="span" fontWeight="medium">Equalizer:</Text> 18-band equalizer settings for frequency adjustment</ListItem>
              </List>
            </AccordionPanel>
          </AccordionItem>
          
          <AccordionItem>
            <h3>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="semibold">
                  Remote Control Properties
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h3>
            <AccordionPanel pb={4}>
              <List spacing={2} styleType="disc" ml={5}>
                <ListItem><Text as="span" fontWeight="medium">VNC IP:</Text> IP address of the VNC server for remote control</ListItem>
                <ListItem><Text as="span" fontWeight="medium">VNC Port:</Text> Port number for the VNC server connection</ListItem>
              </List>
              <Text mt={2} fontSize="sm">
                These settings enable media control functionality (play/pause, next/previous track) for supported sources.
              </Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        
        <Heading as="h3" size="md" mb={3}>Source Configuration Example</Heading>
        <Code p={4} borderRadius="md" display="block" whiteSpace="pre" mb={4}>
{`# Example of individual source
sources:
  - name: "Windows PC"
    ip: "192.168.1.10"
    enabled: true
    volume: 0.8
    equalizer:
      b1: 1.0
      b2: 1.2
      # ...other bands...
      b18: 0.9
    
# Example of source group
  - name: "Media Players"
    is_group: true
    group_members:
      - "Windows PC"
      - "Spotify Docker"
    volume: 0.7
    
# Example of source with VNC control
  - name: "Spotify Docker"
    ip: "172.17.0.2"
    enabled: true
    vnc_ip: "172.17.0.2"
    vnc_port: 5900`}
        </Code>
      </DocSection>
      
      <DocSection title="Sinks Configuration" icon={FaHeadphones} mt={10}>
        <Text mb={4}>
          Sinks represent audio outputs from the system. They can be individual sinks or sink groups.
        </Text>
        
        <Heading as="h3" size="md" mb={3}>Individual Sinks</Heading>
        <Text mb={3}>
          Individual sinks represent specific audio outputs, such as:
        </Text>
        <List spacing={2} styleType="disc" ml={5} mb={4}>
          <ListItem>A Raspberry Pi running a Scream receiver</ListItem>
          <ListItem>An ESP32 device with a DAC connected to speakers</ListItem>
          <ListItem>A Windows PC running the Scream receiver application</ListItem>
          <ListItem>Network-connected speakers or amplifiers</ListItem>
        </List>
        
        <Heading as="h3" size="md" mb={3}>Sink Groups</Heading>
        <Text mb={3}>
          Sink groups are collections of individual sinks that can be managed together. This is useful for:
        </Text>
        <List spacing={2} styleType="disc" ml={5} mb={4}>
          <ListItem>Controlling volume for multiple outputs at once</ListItem>
          <ListItem>Creating zone-based audio systems (e.g., "Upstairs", "Downstairs")</ListItem>
          <ListItem>Synchronizing audio across multiple rooms</ListItem>
        </List>
        
        <Heading as="h3" size="md" mb={3}>Sink Properties</Heading>
        <Accordion allowToggle mb={4}>
          <AccordionItem>
            <h3>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="semibold">
                  Basic Properties
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h3>
            <AccordionPanel pb={4}>
              <List spacing={2} styleType="disc" ml={5}>
                <ListItem><Text as="span" fontWeight="medium">Name:</Text> Unique identifier for the sink</ListItem>
                <ListItem><Text as="span" fontWeight="medium">IP:</Text> Network address where the audio will be sent (for individual sinks)</ListItem>
                <ListItem><Text as="span" fontWeight="medium">Port:</Text> UDP port number (default: 4010)</ListItem>
                <ListItem><Text as="span" fontWeight="medium">Is Group:</Text> Whether this sink is a collection of other sinks</ListItem>
                <ListItem><Text as="span" fontWeight="medium">Enabled:</Text> Whether the sink is active and should receive audio</ListItem>
              </List>
            </AccordionPanel>
          </AccordionItem>
          
          <AccordionItem>
            <h3>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="semibold">
                  Audio Format Properties
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h3>
            <AccordionPanel pb={4}>
              <List spacing={2} styleType="disc" ml={5}>
                <ListItem><Text as="span" fontWeight="medium">Bit Depth:</Text> Audio resolution - 16, 24, or 32 bits</ListItem>
                <ListItem><Text as="span" fontWeight="medium">Sample Rate:</Text> Audio sampling frequency - 44100, 48000, 88200, 96000, or 192000 Hz</ListItem>
                <ListItem><Text as="span" fontWeight="medium">Channels:</Text> Number of audio channels (1 to 8)</ListItem>
                <ListItem><Text as="span" fontWeight="medium">Channel Layout:</Text> Arrangement of audio channels</ListItem>
              </List>
            </AccordionPanel>
          </AccordionItem>
          
          <AccordionItem>
            <h3>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="semibold">
                  Audio Processing Properties
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h3>
            <AccordionPanel pb={4}>
              <List spacing={2} styleType="disc" ml={5}>
                <ListItem><Text as="span" fontWeight="medium">Volume:</Text> Level adjustment from 0.0 (mute) to 1.0 (full volume)</ListItem>
                <ListItem><Text as="span" fontWeight="medium">Delay:</Text> Time offset in milliseconds (0 to 5000ms)</ListItem>
                <ListItem><Text as="span" fontWeight="medium">Equalizer:</Text> 18-band equalizer settings for frequency adjustment</ListItem>
                <ListItem><Text as="span" fontWeight="medium">Time Sync:</Text> Whether time synchronization is enabled NOTE: Not yet implemented</ListItem>
                <ListItem><Text as="span" fontWeight="medium">Time Sync Delay:</Text> Additional delay for time synchronization NOTE: Not yet implemented</ListItem>
              </List>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        
        <Heading as="h3" size="md" mb={3}>Sink Configuration Example</Heading>
        <Code p={4} borderRadius="md" display="block" whiteSpace="pre" mb={4}>
{`# Example of individual sink
sinks:
  - name: "Living Room Speakers"
    ip: "192.168.1.20"
    port: 4010
    enabled: true
    bit_depth: 24
    sample_rate: 48000
    channels: 2
    volume: 0.8
    
# Example of sink group
  - name: "Whole House"
    is_group: true
    group_members:
      - "Living Room Speakers"
      - "Kitchen Speaker"
      - "Bedroom Speakers"
    volume: 0.7
    
# Example of sink with special settings
  - name: "High-End System"
    ip: "192.168.1.30"
    port: 4010
    enabled: true
    bit_depth: 32
    sample_rate: 96000
    channels: 2
    equalizer:
      b1: 1.2
      b2: 1.1
      # ...other bands...
      b18: 0.8
    time_sync: true
    time_sync_delay: 20`}
        </Code>
      </DocSection>
      
      <DocSection title="Routes Configuration" icon={FaNetworkWired} mt={10}>
        <Text mb={4}>
          Routes define connections between sources and sinks. Each route specifies a source, a sink, and
          optional processing parameters.
        </Text>
        
        <Heading as="h3" size="md" mb={3}>Route Properties</Heading>
        <List spacing={2} styleType="disc" ml={5} mb={4}>
          <ListItem><Text as="span" fontWeight="medium">Name:</Text> Unique identifier for the route</ListItem>
          <ListItem><Text as="span" fontWeight="medium">Source:</Text> Name of the source (individual or group)</ListItem>
          <ListItem><Text as="span" fontWeight="medium">Sink:</Text> Name of the sink (individual or group)</ListItem>
          <ListItem><Text as="span" fontWeight="medium">Enabled:</Text> Whether the route is active</ListItem>
          <ListItem><Text as="span" fontWeight="medium">Volume:</Text> Level adjustment for this specific route</ListItem>
          <ListItem><Text as="span" fontWeight="medium">Delay:</Text> Additional delay for this route in milliseconds</ListItem>
          <ListItem><Text as="span" fontWeight="medium">Equalizer:</Text> Route-specific 18-band equalizer settings</ListItem>
        </List>
        
        <Heading as="h3" size="md" mb={3}>Route Configuration Example</Heading>
        <Code p={4} borderRadius="md" display="block" whiteSpace="pre" mb={4}>
{`# Basic route example
routes:
  - name: "Windows PC to Living Room"
    source: "Windows PC"
    sink: "Living Room Speakers"
    enabled: true
    volume: 0.8
    
# Route with group source to group sink
  - name: "Media to Whole House"
    source: "Media Players"
    sink: "Whole House"
    enabled: true
    volume: 0.7
    
# Route with specific audio processing
  - name: "Spotify to Kitchen"
    source: "Spotify Docker"
    sink: "Kitchen Speaker"
    enabled: true
    volume: 0.9
    delay: 50
    equalizer:
      b1: 1.0
      b2: 1.3
      # ...other bands...
      b18: 0.7`}
        </Code>
        
        <Alert status="info" borderRadius="md" mt={6}>
          <AlertIcon />
          <Box>
            <Text fontWeight="semibold">Processing Order:</Text>
            <Text>
              When audio flows through the system, adjustments are applied in this order:
            </Text>
            <OrderedList mt={2} spacing={1} ml={4}>
              <ListItem>Source-specific processing (volume, equalizer, delay)</ListItem>
              <ListItem>Source group processing (if the source belongs to a group)</ListItem>
              <ListItem>Route-specific processing (volume, equalizer, delay)</ListItem>
              <ListItem>Sink group processing (if the sink belongs to a group)</ListItem>
              <ListItem>Sink-specific processing (volume, equalizer, delay)</ListItem>
            </OrderedList>
          </Box>
        </Alert>
      </DocSection>
      
      <DocSection title="Advanced Configuration" icon={FaNetworkWired} mt={10}>
        <Tabs variant="enclosed" colorScheme="brand">
          <TabList>
            <Tab>Time Synchronization NOTE: Not yet implemented</Tab>
            <Tab>Equalization</Tab>
            <Tab>Channel Mapping</Tab>
          </TabList>
          
          <TabPanels>
            <TabPanel>
              <Heading as="h3" size="md" mb={3}> NOTE: Not yet implemented</Heading>
              <Text mb={3}>
                Time synchronization helps maintain consistent audio timing across multiple sinks,
                especially useful for multi-room audio systems. NOTE: Not yet implemented
              </Text>
              
              <List spacing={2} styleType="disc" ml={5} mb={4}>
                <ListItem><Text as="span" fontWeight="medium">time_sync:</Text> Enable/disable time synchronization NOTE: Not yet implemented (boolean)</ListItem>
                <ListItem><Text as="span" fontWeight="medium">time_sync_delay:</Text> Additional buffer time in milliseconds NOTE: Not yet implemented</ListItem>
              </List>
              
              <Text>
                When enabled, ScreamRouter will add timestamps to audio packets and receivers will buffer
                the audio to ensure synchronized playback across devices, at the cost of slightly increased latency.
              </Text>
            </TabPanel>
            
            <TabPanel>
              <Heading as="h3" size="md" mb={3}>Equalization</Heading>
              <Text mb={3}>
                ScreamRouter includes an 18-band equalizer that can be applied at the source, sink, or route level.
              </Text>
              
              <Text mb={3}>Each band represents a specific frequency range and can be adjusted from 0.0 (full attenuation)
                to 2.0 (200% volume). The default value is 1.0 (no change).</Text>
              
              <Code p={4} borderRadius="md" display="block" whiteSpace="pre" mb={4}>
{`equalizer:
  b1: 1.2   # Boost bass
  b2: 1.1
  b3: 1.0
  # ...
  b17: 0.9  # Reduce high frequencies
  b18: 0.8`}
              </Code>
              
              <Text>
                Adjustments applied at multiple levels (source, route, sink) will be cumulative,
                allowing for very precise audio tuning throughout your system.
              </Text>
            </TabPanel>
            
            <TabPanel>
              <Heading as="h3" size="md" mb={3}>Channel Mapping</Heading>
              <Text mb={3}>
                ScreamRouter supports audio with up to 8 channels and can perform channel mapping
                between sources and sinks with different channel counts.
              </Text>
              
              <Text mb={3}>For sinks, you can specify:</Text>
              <List spacing={2} styleType="disc" ml={5} mb={4}>
                <ListItem><Text as="span" fontWeight="medium">channels:</Text> Number of audio channels (1-8)</ListItem>
                <ListItem><Text as="span" fontWeight="medium">channel_layout:</Text> Arrangement of audio channels</ListItem>
              </List>
              
              <Text mb={3}>Common channel layouts include:</Text>
              <List spacing={2} styleType="disc" ml={5}>
                <ListItem><Text as="span" fontWeight="medium">Mono:</Text> Single channel</ListItem>
                <ListItem><Text as="span" fontWeight="medium">Stereo:</Text> Left and right channels</ListItem>
                <ListItem><Text as="span" fontWeight="medium">5.1:</Text> Front left, front right, center, LFE, surround left, surround right</ListItem>
                <ListItem><Text as="span" fontWeight="medium">7.1:</Text> Adds back left and back right channels</ListItem>
              </List>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </DocSection>
    </Box>
  );
}

export default ConfigurationDoc;