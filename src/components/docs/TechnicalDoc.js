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
  Grid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaChevronRight, FaNetworkWired, FaCogs, FaMicrochip, FaExchangeAlt } from 'react-icons/fa';
import DocSection from './DocSection';

function TechnicalDoc() {
  return (
    <Box>
      <Breadcrumb spacing="8px" separator={<FaChevronRight color="gray.500" />} mb={8}>
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to="/docs">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Technical Details</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      
      <Heading as="h1" size="xl" mb={6}>
        ScreamRouter Technical Details
      </Heading>
      
      <Text fontSize="lg" mb={8}>
        This document provides a technical overview of ScreamRouter's architecture, components, and audio processing 
        capabilities. It is intended for developers and advanced users who want to understand the inner workings of the system.
      </Text>
      
      <DocSection title="Architecture Overview" icon={FaCogs}>
        <Text mb={4}>
          ScreamRouter is a multi-process audio routing and mixing system designed to receive audio streams, 
          process them, and output them to multiple destinations. It uses a combination of Python for high-level 
          management and C++ for performance-critical audio processing tasks.
        </Text>
        
        <Heading as="h3" size="md" mb={3}>System Architecture</Heading>
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6} mb={6}>
          <Box>
            <Heading as="h4" size="sm" mb={2}>Key Components</Heading>
            <List spacing={2} styleType="decimal" ml={5}>
              <ListItem><Text as="span" fontWeight="medium">Configuration Manager</Text> (<Code>configuration_manager.py</Code>)</ListItem>
              <ListItem><Text as="span" fontWeight="medium">Audio Controller</Text> (<Code>audio_controller.py</Code>)</ListItem>
              <ListItem><Text as="span" fontWeight="medium">Scream Receiver</Text> (<Code>scream_receiver.cpp</Code>)</ListItem>
              <ListItem><Text as="span" fontWeight="medium">RTP Receiver</Text> (<Code>rtp_receiver.cpp</Code>)</ListItem>
              <ListItem><Text as="span" fontWeight="medium">Source Input Processor</Text> (<Code>source_input_processor.cpp</Code>)</ListItem>
              <ListItem><Text as="span" fontWeight="medium">Sink Output Mixer</Text> (<Code>sink_audio_mixer.cpp</Code>)</ListItem>
            </List>
          </Box>
          <Box>
            <Alert status="info" borderRadius="md" p={4}>
              <AlertIcon />
              <Box>
                <Text fontWeight="bold">Multi-Process Design</Text>
                <Text>
                  ScreamRouter uses a multi-process architecture rather than multi-threading. This provides several benefits:
                </Text>
                <List spacing={1} styleType="disc" ml={5} mt={2} fontSize="sm">
                  <ListItem>Better isolation between components</ListItem>
                  <ListItem>Improved stability (a crash in one process doesn't bring down the whole system)</ListItem>
                  <ListItem>More efficient use of multiple CPU cores</ListItem>
                  <ListItem>Clearer separation of concerns</ListItem>
                </List>
              </Box>
            </Alert>
          </Box>
        </Grid>
        
        <Heading as="h3" size="md" mb={3}>Data Flow</Heading>
        <Text mb={3}>
          The system follows this general data flow:
        </Text>
        <List as="ol" styleType="decimal" spacing={2} ml={5} mb={4}>
          <ListItem>The Configuration Manager (Python) orchestrates the entire system</ListItem>
          <ListItem>Scream Receiver and RTP Receiver (C++) listen for incoming audio streams</ListItem>
          <ListItem>Source Input Processor (C++) handles audio processing for each active source</ListItem>
          <ListItem>Sink Output Mixer (C++) combines audio from multiple sources for each sink</ListItem>
          <ListItem>Processed audio is output to the configured destination (UDP, TCP, or MP3 stream)</ListItem>
        </List>
        
        <Divider my={6} />
        
        <Heading as="h3" size="md" mb={3}>Inter-Process Communication</Heading>
        <Text mb={3}>
          ScreamRouter components communicate using:
        </Text>
        <List spacing={2} styleType="disc" ml={5}>
          <ListItem><Text as="span" fontWeight="medium">Unix Pipes:</Text> For high-speed data transfer between processes</ListItem>
          <ListItem><Text as="span" fontWeight="medium">Shared Memory:</Text> For efficient sharing of large audio buffers</ListItem>
          <ListItem><Text as="span" fontWeight="medium">Network Sockets:</Text> For communication between distributed components</ListItem>
        </List>
      </DocSection>
      
      <DocSection title="Audio Processing Capabilities" icon={FaMicrochip} mt={10}>
        <Text mb={4}>
          ScreamRouter includes sophisticated audio processing capabilities to handle various formats, 
          sample rates, and channel configurations.
        </Text>
        
        <Tabs variant="enclosed" colorScheme="brand">
          <TabList>
            <Tab>Format Support</Tab>
            <Tab>Audio Processing</Tab>
            <Tab>Optimization</Tab>
          </TabList>
          
          <TabPanels>
            <TabPanel>
              <Heading as="h3" size="md" mb={3}>Supported Formats and Configurations</Heading>
              
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6} mb={4}>
                <Box>
                  <Heading as="h4" size="sm" mb={2}>Input Formats</Heading>
                  <List spacing={2} styleType="disc" ml={5}>
                    <ListItem><Text as="span" fontWeight="medium">Scream:</Text> Windows virtual audio driver protocol</ListItem>
                    <ListItem><Text as="span" fontWeight="medium">RTP:</Text> Real-time Transport Protocol audio</ListItem>
                  </List>
                </Box>
                <Box>
                  <Heading as="h4" size="sm" mb={2}>Output Formats</Heading>
                  <List spacing={2} styleType="disc" ml={5}>
                    <ListItem><Text as="span" fontWeight="medium">PCM:</Text> Raw audio data over UDP/TCP</ListItem>
                    <ListItem><Text as="span" fontWeight="medium">MP3:</Text> Compressed audio stream for browser playback</ListItem>
                  </List>
                </Box>
              </Grid>
              
              <Heading as="h4" size="sm" mb={2}>Audio Parameters</Heading>
              <List spacing={2} styleType="disc" ml={5}>
                <ListItem><Text as="span" fontWeight="medium">Sample Rates:</Text> 44.1kHz, 48kHz, 88.2kHz, 96kHz, 192kHz</ListItem>
                <ListItem><Text as="span" fontWeight="medium">Bit Depths:</Text> 16-bit, 24-bit, 32-bit LPCM</ListItem>
                <ListItem><Text as="span" fontWeight="medium">Channels:</Text> 1-8 (mono, stereo, up to 7.1 surround)</ListItem>
              </List>
            </TabPanel>
            
            <TabPanel>
              <Heading as="h3" size="md" mb={3}>Audio Processing Capabilities</Heading>
              <List spacing={3} styleType="disc" ml={5} mb={4}>
                <ListItem>
                  <Text fontWeight="bold">Format Conversion</Text>
                  <Text>Conversion between different bit depths and sample formats</Text>
                </ListItem>
                
                <ListItem>
                  <Text fontWeight="bold">Resampling</Text>
                  <Text>High-quality sample rate conversion using a multi-stage process</Text>
                </ListItem>
                
                <ListItem>
                  <Text fontWeight="bold">Channel Mixing</Text>
                  <Text>Intelligent up-mixing and down-mixing between different channel configurations</Text>
                </ListItem>
                
                <ListItem>
                  <Text fontWeight="bold">18-band Equalizer</Text>
                  <Text>Detailed frequency adjustments with 18 configurable bands</Text>
                </ListItem>
                
                <ListItem>
                  <Text fontWeight="bold">Volume Adjustment</Text>
                  <Text>Precise volume control with high-quality digital gain</Text>
                </ListItem>
                
                <ListItem>
                  <Text fontWeight="bold">Buffering and Delay</Text>
                  <Text>Configurable buffer sizes for latency vs. stability tradeoffs</Text>
                </ListItem>
                
                <ListItem>
                  <Text fontWeight="bold">Time Synchronization</Text>
                  <Text>Mechanism to synchronize audio playback across multiple sinks NOTE: Not yet implemented</Text>
                </ListItem>
              </List>
            </TabPanel>
            
            <TabPanel>
              <Heading as="h3" size="md" mb={3}>Performance Optimizations</Heading>
              <Text mb={3}>
                ScreamRouter employs several key optimizations to ensure low-latency, high-quality audio processing:
              </Text>
              
              <List spacing={3} styleType="disc" ml={5}>
                <ListItem>
                  <Text fontWeight="bold">C++ for Performance-Critical Paths</Text>
                  <Text>Core audio processing is implemented in C++ to minimize latency and maximize throughput</Text>
                </ListItem>
                
                <ListItem>
                  <Text fontWeight="bold">SIMD Instructions</Text>
                  <Text>AVX2, SSE2, and other SIMD instruction sets are used where available for faster processing</Text>
                </ListItem>
                
                <ListItem>
                  <Text fontWeight="bold">Vectorized Operations</Text>
                  <Text>Audio processing operations are vectorized for parallel execution</Text>
                </ListItem>
                
                <ListItem>
                  <Text fontWeight="bold">Lock-Free Data Structures</Text>
                  <Text>Specialized lock-free algorithms for audio buffer management</Text>
                </ListItem>
                
                <ListItem>
                  <Text fontWeight="bold">Memory Management</Text>
                  <Text>Pre-allocated buffers and memory pools to reduce allocation overhead</Text>
                </ListItem>
                
                <ListItem>
                  <Text fontWeight="bold">Compiler Optimizations</Text>
                  <Text>Compiled with platform-specific optimizations for maximum performance</Text>
                </ListItem>
              </List>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </DocSection>
      
      <DocSection title="Component Details" icon={FaExchangeAlt} mt={10}>
        <Tabs variant="enclosed" colorScheme="brand">
          <TabList>
            <Tab>Configuration Manager</Tab>
            <Tab>Audio Receivers</Tab>
            <Tab>Audio Processing</Tab>
          </TabList>
          
          <TabPanels>
            <TabPanel>
              <Heading as="h3" size="md" mb={3}>Configuration Manager</Heading>
              <Text mb={3}>
                The Configuration Manager (<Code>configuration_manager.py</Code>) is the central orchestrator of the 
                ScreamRouter system. It handles:
              </Text>
              
              <List spacing={2} styleType="disc" ml={5} mb={4}>
                <ListItem>Loading and parsing the YAML configuration file</ListItem>
                <ListItem>Resolving source and sink groups into individual components</ListItem>
                <ListItem>Managing the lifecycle of other system components</ListItem>
                <ListItem>Handling API requests and providing real-time system status</ListItem>
                <ListItem>Saving configuration changes to disk</ListItem>
              </List>
              
              <Heading as="h4" size="sm" mb={2}>Configuration Solver</Heading>
              <Text mb={3}>
                The ConfigurationSolver class handles the complex logic of resolving relationships between sources and sinks:
              </Text>
              
              <List spacing={2} styleType="disc" ml={5}>
                <ListItem>Expanding source and sink groups into individual components</ListItem>
                <ListItem>Applying volume, equalizer, and delay adjustments from routes, groups, and individual components</ListItem>
                <ListItem>Creating a final mapping of real (individual) sinks to lists of real sources</ListItem>
                <ListItem>Resolving conflicts and validating the configuration</ListItem>
              </List>
            </TabPanel>
            
            <TabPanel>
              <Heading as="h3" size="md" mb={3}>Audio Receivers</Heading>
              
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6} mb={6}>
                <Box>
                  <Heading as="h4" size="sm" mb={2}>Scream Receiver</Heading>
                  <Text mb={3}>
                    The Scream Receiver (<Code>scream_receiver.cpp</Code>) is responsible for capturing audio data 
                    from the Scream virtual audio driver protocol.
                  </Text>
                  <List spacing={1} styleType="disc" ml={5}>
                    <ListItem>Listens on UDP port 16401 by default</ListItem>
                    <ListItem>Parses Scream protocol headers</ListItem>
                    <ListItem>Handles auto-detection of new sources</ListItem>
                    <ListItem>Forwards audio data to the Source Input Processor</ListItem>
                  </List>
                </Box>
                <Box>
                  <Heading as="h4" size="sm" mb={2}>RTP Receiver</Heading>
                  <Text mb={3}>
                    The RTP Receiver (<Code>rtp_receiver.cpp</Code>) captures audio data from 
                    RTP (Real-time Transport Protocol) streams.
                  </Text>
                  <List spacing={1} styleType="disc" ml={5}>
                    <ListItem>Listens on UDP port 40000 by default</ListItem>
                    <ListItem>Parses RTP headers and payload formats</ListItem>
                    <ListItem>Handles packet loss and reordering</ListItem>
                    <ListItem>Supports various RTP audio encodings</ListItem>
                  </List>
                </Box>
              </Grid>
              
              <Alert status="info" borderRadius="md" mb={4}>
                <AlertIcon />
                <Box>
                  <Text fontWeight="semibold">Dynamic Source Discovery</Text>
                  <Text>
                    Both receivers support automatic discovery of new audio sources based on IP address 
                    and protocol specifics. This allows "plug and play" functionality when new audio 
                    sources come online.
                  </Text>
                </Box>
              </Alert>
            </TabPanel>
            
            <TabPanel>
              <Heading as="h3" size="md" mb={3}>Audio Processing Components</Heading>
              
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6} mb={6}>
                <Box>
                  <Heading as="h4" size="sm" mb={2}>Source Input Processor</Heading>
                  <Text mb={3}>
                    The Source Input Processor (<Code>source_input_processor.cpp</Code>) handles audio 
                    processing for each active source.
                  </Text>
                  <List spacing={1} styleType="disc" ml={5}>
                    <ListItem>Buffers incoming audio data</ListItem>
                    <ListItem>Applies source-specific processing (volume, EQ, delay)</ListItem>
                    <ListItem>Manages source lifecycle events</ListItem>
                    <ListItem>Forwards processed audio to the Sink Output Mixer</ListItem>
                  </List>
                </Box>
                <Box>
                  <Heading as="h4" size="sm" mb={2}>Sink Output Mixer</Heading>
                  <Text mb={3}>
                    The Sink Output Mixer (<Code>sink_audio_mixer.cpp</Code>) combines audio from 
                    multiple sources for each sink.
                  </Text>
                  <List spacing={1} styleType="disc" ml={5}>
                    <ListItem>Mixes audio from multiple sources</ListItem>
                    <ListItem>Applies sink-specific processing (volume, EQ, delay)</ListItem>
                    <ListItem>Handles format conversion for the sink</ListItem>
                    <ListItem>Streams processed audio to the destination</ListItem>
                  </List>
                </Box>
              </Grid>
              
              <Heading as="h4" size="sm" mb={2}>Audio Controller</Heading>
              <Text mb={3}>
                The Audio Controller (<Code>audio_controller.py</Code>) manages the various audio 
                processing components and their interactions.
              </Text>
              <List spacing={2} styleType="disc" ml={5}>
                <ListItem>Instantiates and manages audio processing components</ListItem>
                <ListItem>Handles routing of audio between sources and sinks</ListItem>
                <ListItem>Provides real-time monitoring of audio flow</ListItem>
                <ListItem>Manages audio processing resources</ListItem>
              </List>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </DocSection>
      
      <DocSection title="Troubleshooting" icon={FaCogs} mt={10}>
        <Text mb={4}>
          Common issues and solutions for ScreamRouter's audio processing:
        </Text>
        
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
          <Box p={4} borderWidth="1px" borderRadius="md">
            <Heading as="h3" size="sm" mb={3}>High Latency</Heading>
            <List spacing={1} styleType="disc" ml={5}>
              <ListItem>Check network conditions</ListItem>
              <ListItem>Reduce buffer sizes if possible</ListItem>
              <ListItem>Ensure SIMD instructions are enabled</ListItem>
              <ListItem>Verify that real-time priority is set</ListItem>
              <ListItem>Check for system overload</ListItem>
            </List>
          </Box>
          
          <Box p={4} borderWidth="1px" borderRadius="md">
            <Heading as="h3" size="sm" mb={3}>Audio Distortion</Heading>
            <List spacing={1} styleType="disc" ml={5}>
              <ListItem>Verify input audio quality</ListItem>
              <ListItem>Check for clipping in the audio chain</ListItem>
              <ListItem>Adjust equalizer settings</ListItem>
              <ListItem>Verify that format conversion is correct</ListItem>
              <ListItem>Check for buffer underruns or overruns</ListItem>
            </List>
          </Box>
          
          <Box p={4} borderWidth="1px" borderRadius="md">
            <Heading as="h3" size="sm" mb={3}>Missing Audio Streams</Heading>
            <List spacing={1} styleType="disc" ml={5}>
              <ListItem>Confirm network connectivity</ListItem>
              <ListItem>Verify source and sink configurations</ListItem>
              <ListItem>Check firewall settings</ListItem>
              <ListItem>Ensure routes are properly configured</ListItem>
              <ListItem>Check that audio sources are active</ListItem>
            </List>
          </Box>
        </Grid>
        
        <Alert status="info" borderRadius="md" mt={6}>
          <AlertIcon />
          <Box>
            <Text fontWeight="semibold">Diagnostic Tools</Text>
            <Text>
              ScreamRouter includes several diagnostic tools to help troubleshoot audio processing issues:
            </Text>
            <List spacing={1} styleType="disc" ml={5} mt={2}>
              <ListItem><Code>stats</Code> endpoint provides real-time performance metrics</ListItem>
              <ListItem>Log files contain detailed information about audio flow</ListItem>
              <ListItem>Audio visualization in the web interface can help identify issues</ListItem>
              <ListItem>Built-in debug modes for detailed analysis</ListItem>
            </List>
          </Box>
        </Alert>
      </DocSection>
    </Box>
  );
}

export default TechnicalDoc;