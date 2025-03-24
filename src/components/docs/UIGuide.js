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
  Image,
  Grid,
  Flex,
  Code,
  Alert,
  AlertIcon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaChevronRight, FaNetworkWired, FaVolumeUp, FaDesktop, FaCog } from 'react-icons/fa';
import DocSection from './DocSection';

function UIGuide() {
  return (
    <Box>
      <Breadcrumb spacing="8px" separator={<FaChevronRight color="gray.500" />} mb={8}>
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to="/docs">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>UI Guide</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      
      <Heading as="h1" size="xl" mb={6}>
        ScreamRouter UI Guide
      </Heading>
      
      <Text fontSize="lg" mb={8}>
        Learn how to navigate and use the ScreamRouter web interface effectively to manage your audio system.
        This guide explains the key components of the interface and how to perform common tasks.
      </Text>
      
      <DocSection title="Interface Overview" icon={FaDesktop}>
        <Text mb={6}>
          The ScreamRouter interface is designed to be user-friendly and intuitive. It consists of several main sections:
        </Text>
        
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6} mb={6}>
          <Box>
            <Heading as="h3" size="md" mb={3}>Dashboard Layout</Heading>
            <List spacing={2} styleType="disc" ml={5} mb={4}>
              <ListItem><Text as="span" fontWeight="medium">Sources (left panel):</Text> Manage your audio inputs</ListItem>
              <ListItem><Text as="span" fontWeight="medium">Routes (center panel):</Text> Control how audio flows from sources to sinks</ListItem>
              <ListItem><Text as="span" fontWeight="medium">Sinks (right panel):</Text> Manage your audio outputs</ListItem>
              <ListItem><Text as="span" fontWeight="medium">Active Source (top):</Text> Quick access to the currently selected source</ListItem>
              <ListItem><Text as="span" fontWeight="medium">Visualizer (bottom):</Text> Real-time visual representation of your audio</ListItem>
              <ListItem><Text as="span" fontWeight="medium">Search bar (top):</Text> Quickly find sources, sinks, or routes</ListItem>
              <ListItem><Text as="span" fontWeight="medium">Favorites:</Text> Quick access to your most-used components</ListItem>
            </List>
          </Box>
          <Box>
            <Alert status="info" borderRadius="md" p={4}>
              <AlertIcon />
              <Box>
                <Text fontWeight="bold">Responsive Design</Text>
                <Text>ScreamRouter adapts to your device:</Text>
                <List spacing={1} styleType="disc" ml={5} mt={2}>
                  <ListItem>On desktop: See all sections at once for easy management</ListItem>
                  <ListItem>On mobile: Collapsible sections keep things tidy on smaller screens</ListItem>
                </List>
              </Box>
            </Alert>
            <Box mt={4} p={4} borderWidth="1px" borderRadius="md">
              <Text fontWeight="bold" mb={2}>Keyboard Shortcuts</Text>
              <List spacing={1} fontSize="sm">
                <ListItem><Code>Space</Code>: Play/Pause the active source</ListItem>
                <ListItem><Code>Left/Right Arrow</Code>: Previous/Next track</ListItem>
                <ListItem><Code>Up/Down Arrow</Code>: Adjust volume</ListItem>
                <ListItem><Code>M</Code>: Mute/Unmute</ListItem>
                <ListItem><Code>H</Code>: Cycle visualizer styles</ListItem>

            <Box mt={4}>
              <Heading as="h4" size="sm" mb={2}>Dark Mode Support</Heading>
              <Text mb={2}>
                ScreamRouter offers a dark mode option for comfortable viewing in low-light environments. Toggle between light and dark mode using the theme switch in the top navigation bar.
              </Text>
              <Box my={4} display="flex" justifyContent="center">
                <Image 
                  src="/images/ScreamRouter/Dark Mode.png" 
                  alt="ScreamRouter Dark Mode" 
                  borderRadius="md" 
                  shadow="md" 
                  maxWidth="100%" 
                />
              </Box>
            </Box>
              </List>
            </Box>
          </Box>
        </Grid>
        
        <Box my={4} display="flex" justifyContent="center">
          <Image 
            src="/images/ScreamRouter/ScreamRouter.png" 
            alt="ScreamRouter Main Interface" 
            borderRadius="md" 
            shadow="md" 
            maxWidth="100%" 
          />
        </Box>
        <Text>
          The dashboard provides a comprehensive view of your active sources, sinks, and routes,
          allowing you to monitor and control your entire audio system from a single screen.
        </Text>
      </DocSection>
      
      <DocSection title="Managing Audio Components" icon={FaVolumeUp} mt={10}>
        <Tabs variant="enclosed" colorScheme="brand">
          <TabList>
            <Tab>Sources</Tab>
            <Tab>Sinks</Tab>
            <Tab>Routes</Tab>
            <Tab>Groups</Tab>
          </TabList>
          
          <TabPanels>
            <TabPanel>
              <Heading as="h3" size="md" mb={3}>Sources</Heading>
              <Text mb={3}>
                Sources are where your audio comes from. They appear in the left panel of the dashboard.
              </Text>
              
              <Heading as="h4" size="sm" mb={2}>Adding a Source</Heading>
              <List as="ol" styleType="decimal" spacing={2} ml={5} mb={4}>
                <ListItem>Click the "Add Source" button in the sources panel</ListItem>
                <ListItem>Fill in the required information:
                  <List spacing={1} styleType="disc" ml={5} mt={1}>
                    <ListItem><Text as="span" fontWeight="medium">Name:</Text> A descriptive name for the source</ListItem>
                    <ListItem><Text as="span" fontWeight="medium">IP address:</Text> The network address of the audio source</ListItem>
                    <ListItem><Text as="span" fontWeight="medium">Tag:</Text> Optional identifier for matching audio streams</ListItem>
                  </List>
                </ListItem>
                <ListItem>Adjust volume and equalizer settings as needed</ListItem>

                <Box my={4} display="flex" justifyContent="center">
                  <Image 
                    src="/images/ScreamRouter/AddSource.png" 
                    alt="Adding a new source in ScreamRouter" 
                    borderRadius="md" 
                    shadow="md" 
                    maxWidth="100%" 
                  />
                </Box>
                <ListItem>Click "Save" to create the source</ListItem>
              </List>
              
              <Heading as="h4" size="sm" mb={2}>Source Controls</Heading>
              <Text mb={2}>Each source card in the interface provides several controls:</Text>
              
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4} mb={4}>
                <Box p={3} borderWidth="1px" borderRadius="md">
                  <Text fontWeight="bold" mb={2}>Basic Controls</Text>
                  <List spacing={1} styleType="disc" ml={4}>
                    <ListItem><Text as="span" fontWeight="medium">Enable/Disable:</Text> Toggle to turn the source on or off</ListItem>
                    <ListItem><Text as="span" fontWeight="medium">Volume Slider:</Text> Adjust the source volume</ListItem>
                    <ListItem><Text as="span" fontWeight="medium">Edit Button:</Text> Modify source settings</ListItem>
                    <ListItem><Text as="span" fontWeight="medium">Delete Button:</Text> Remove the source</ListItem>
                  </List>
                </Box>
                <Box p={3} borderWidth="1px" borderRadius="md">
                  <Text fontWeight="bold" mb={2}>Media Controls</Text>
                  <List spacing={1} styleType="disc" ml={4}>
                    <ListItem><Text as="span" fontWeight="medium">Play/Pause:</Text> Start or stop audio playback</ListItem>
                    <ListItem><Text as="span" fontWeight="medium">Next/Previous:</Text> Skip between tracks</ListItem>
                    <ListItem><Text as="span" fontWeight="medium">Equalizer:</Text> Open detailed equalizer controls</ListItem>
                    <ListItem><Text as="span" fontWeight="medium">VNC Button:</Text> Open remote control interface</ListItem>
                  </List>
                </Box>
              </Grid>
              
              <Alert status="info" borderRadius="md">
                <AlertIcon />
                Media control buttons appear when VNC is enabled for a source. This allows you to
                control playback directly from the ScreamRouter interface.
              </Alert>
            </TabPanel>
            
            <TabPanel>
              <Heading as="h3" size="md" mb={3}>Sinks</Heading>
              <Text mb={3}>
                Sinks are where your audio goes. They appear in the right panel of the dashboard.
              </Text>
              
              <Heading as="h4" size="sm" mb={2}>Adding a Sink</Heading>
              <List as="ol" styleType="decimal" spacing={2} ml={5} mb={4}>
                <ListItem>Click the "Add Sink" button in the sinks panel</ListItem>
                <ListItem>Fill in the required information:
                  <List spacing={1} styleType="disc" ml={5} mt={1}>
                    <ListItem><Text as="span" fontWeight="medium">Name:</Text> A descriptive name for the sink</ListItem>
                    <ListItem><Text as="span" fontWeight="medium">IP address:</Text> The network address where audio will be sent</ListItem>
                    <ListItem><Text as="span" fontWeight="medium">Port:</Text> The network port (default is 4010)</ListItem>
                  </List>
                </ListItem>
                <ListItem>Configure audio format settings if required:
                  <List spacing={1} styleType="disc" ml={5} mt={1}>
                    <ListItem><Text as="span" fontWeight="medium">Bit depth:</Text> 16, 24, or 32 bits</ListItem>
                    <ListItem><Text as="span" fontWeight="medium">Sample rate:</Text> 44100, 48000, 88200, 96000, or 192000 Hz</ListItem>
                    <ListItem><Text as="span" fontWeight="medium">Channels:</Text> Number of audio channels (1-8)</ListItem>
                  </List>
                </ListItem>
                <ListItem>Adjust volume and equalizer settings as needed</ListItem>

                <Box my={4} display="flex" justifyContent="center">
                  <Image 
                    src="/images/ScreamRouter/AddSink.png" 
                    alt="Adding a new sink in ScreamRouter" 
                    borderRadius="md" 
                    shadow="md" 
                    maxWidth="100%" 
                  />
                </Box>
                <ListItem>Click "Save" to create the sink</ListItem>
              </List>
              
              <Heading as="h4" size="sm" mb={2}>Sink Controls</Heading>
              <Text mb={2}>Each sink card in the interface provides several controls:</Text>
              
              <Box p={3} borderWidth="1px" borderRadius="md" mb={4}>
                <Text fontWeight="bold" mb={2}>Available Controls</Text>
                <List spacing={1} styleType="disc" ml={4}>
                  <ListItem><Text as="span" fontWeight="medium">Enable/Disable:</Text> Toggle to turn the sink on or off</ListItem>
                  <ListItem><Text as="span" fontWeight="medium">Volume Slider:</Text> Adjust the sink volume</ListItem>
                  <ListItem><Text as="span" fontWeight="medium">Edit Button:</Text> Modify sink settings</ListItem>
                  <ListItem><Text as="span" fontWeight="medium">Delete Button:</Text> Remove the sink</ListItem>
                  <ListItem><Text as="span" fontWeight="medium">Equalizer:</Text> Open detailed equalizer controls</ListItem>
                  <ListItem><Text as="span" fontWeight="medium">Stream Button:</Text> Open direct stream to this sink in browser</ListItem>
                </List>
              </Box>
              
              <Alert status="info" borderRadius="md">
                <AlertIcon />
                The Stream button allows you to listen to the sink's audio directly in your web browser
                using the built-in MP3 streaming capability.
              </Alert>
            </TabPanel>
            
            <TabPanel>
              <Heading as="h3" size="md" mb={3}>Routes</Heading>
              <Text mb={3}>
                Routes determine how audio flows from sources to sinks. They appear in the center panel of the dashboard.
              </Text>
              
              <Heading as="h4" size="sm" mb={2}>Creating a Route</Heading>
              <List as="ol" styleType="decimal" spacing={2} ml={5} mb={4}>
                <ListItem>Click the "Add Route" button in the routes panel</ListItem>
                <ListItem>Fill in the required information:
                  <List spacing={1} styleType="disc" ml={5} mt={1}>
                    <ListItem><Text as="span" fontWeight="medium">Name:</Text> A descriptive name for the route</ListItem>
                    <ListItem><Text as="span" fontWeight="medium">Source:</Text> Select a source from the dropdown</ListItem>
                    <ListItem><Text as="span" fontWeight="medium">Sink:</Text> Select a sink from the dropdown</ListItem>
                  </List>
                </ListItem>
                <ListItem>Adjust volume, equalizer, and delay settings as needed</ListItem>

                <Box my={4} display="flex" justifyContent="center">
                  <Image 
                    src="/images/ScreamRouter/AddRoute.png" 
                    alt="Adding a new route in ScreamRouter" 
                    borderRadius="md" 
                    shadow="md" 
                    maxWidth="100%" 
                  />
                </Box>
                <ListItem>Click "Save" to create the route</ListItem>
              </List>
              
              <Heading as="h4" size="sm" mb={2}>Route Controls</Heading>
              <Text mb={2}>Each route card in the interface provides several controls:</Text>
              
              <Box p={3} borderWidth="1px" borderRadius="md" mb={4}>
                <Text fontWeight="bold" mb={2}>Available Controls</Text>
                <List spacing={1} styleType="disc" ml={4}>
                  <ListItem><Text as="span" fontWeight="medium">Enable/Disable:</Text> Toggle to turn the route on or off</ListItem>
                  <ListItem><Text as="span" fontWeight="medium">Volume Slider:</Text> Adjust the route volume</ListItem>
                  <ListItem><Text as="span" fontWeight="medium">Edit Button:</Text> Modify route settings</ListItem>
                  <ListItem><Text as="span" fontWeight="medium">Delete Button:</Text> Remove the route</ListItem>
                  <ListItem><Text as="span" fontWeight="medium">Equalizer:</Text> Open detailed equalizer controls</ListItem>
                </List>
              </Box>
              
              <Text>
                Routes provide independent control over the audio connection between a specific source and sink,
                allowing you to fine-tune each audio path in your system.
              </Text>
            </TabPanel>
            
            <TabPanel>
              <Heading as="h3" size="md" mb={3}>Groups</Heading>
              <Text mb={3}>
                Groups allow you to manage multiple sources or sinks together as a single entity.
              </Text>
              
              <Heading as="h4" size="sm" mb={2}>Creating a Group</Heading>
              <List as="ol" styleType="decimal" spacing={2} ml={5} mb={4}>
                <ListItem>In either the Sources or Sinks panel, click the "Create Group" button</ListItem>
                <ListItem>Fill in the required information:
                  <List spacing={1} styleType="disc" ml={5} mt={1}>
                    <ListItem><Text as="span" fontWeight="medium">Name:</Text> A descriptive name for the group</ListItem>
                    <ListItem><Text as="span" fontWeight="medium">Group Members:</Text> Select the individual components to include</ListItem>
                  </List>
                </ListItem>

                <Box my={4} display="flex" justifyContent="center">
                  <Image 
                    src="/images/ScreamRouter/AddGroup.png" 
                    alt="Adding a new group in ScreamRouter" 
                    borderRadius="md" 
                    shadow="md" 
                    maxWidth="100%" 
                  />
                </Box>
                <ListItem>Adjust volume and equalizer settings as needed</ListItem>
                <ListItem>Click "Save" to create the group</ListItem>
              </List>
              
              <Heading as="h4" size="sm" mb={2}>Group Management</Heading>
              <Text mb={2}>
                Group controls are similar to individual component controls, but apply to all members at once:
              </Text>
              
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4} mb={4}>
                <Box p={3} borderWidth="1px" borderRadius="md">
                  <Text fontWeight="bold" mb={2}>Source Groups</Text>
                  <List spacing={1} styleType="disc" ml={4}>
                    <ListItem>Control volume for all sources at once</ListItem>
                    <ListItem>Enable/disable all sources together</ListItem>
                    <ListItem>Apply the same equalizer settings to all sources</ListItem>
                    <ListItem>Create logical categorization (e.g., "Media Players")</ListItem>
                  </List>
                </Box>
                <Box p={3} borderWidth="1px" borderRadius="md">
                  <Text fontWeight="bold" mb={2}>Sink Groups</Text>
                  <List spacing={1} styleType="disc" ml={4}>
                    <ListItem>Control volume for all sinks at once</ListItem>
                    <ListItem>Enable/disable all sinks together</ListItem>
                    <ListItem>Create zone-based audio systems (e.g., "Upstairs")</ListItem>
                    <ListItem>Synchronize audio across multiple rooms</ListItem>
                  </List>
                </Box>
              </Grid>
              
              <Box my={4} display="flex" justifyContent="center">
                <Image 
                  src="/images/ScreamRouter/Groups.png" 
                  alt="Group management in ScreamRouter" 
                  borderRadius="md" 
                  shadow="md" 
                  maxWidth="100%" 
                />
              </Box>
              
              <Alert status="info" borderRadius="md">
                <AlertIcon />
                When you create a route using a group as the source or sink, audio will flow between all
                individual components in those groups. This allows for complex audio routing with minimal configuration.
              </Alert>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </DocSection>
      
      <DocSection title="Audio Enhancement Features" icon={FaCog} mt={10}>
        <Tabs variant="enclosed" colorScheme="brand">
          <TabList>
            <Tab>Equalizer</Tab>
            <Tab>Visualizer</Tab>
            <Tab>Audio Controls</Tab>
          </TabList>
          
          <TabPanels>
            <TabPanel>
              <Heading as="h3" size="md" mb={3}>Equalizer</Heading>
              <Text mb={4}>
                The equalizer allows you to fine-tune your audio by adjusting different frequency ranges.
              </Text>
              
              <Heading as="h4" size="sm" mb={2}>Using the Equalizer</Heading>
              <List as="ol" styleType="decimal" spacing={2} ml={5} mb={4}>
                <ListItem>Find the equalizer controls on source, sink, or route cards</ListItem>
                <ListItem>Click the equalizer button to open the detailed controls</ListItem>
                <ListItem>Adjust the sliders to boost or cut different frequency ranges:
                  <List spacing={1} styleType="disc" ml={5} mt={1}>
                    <ListItem>Left sliders: Low frequencies (bass)</ListItem>
                    <ListItem>Middle sliders: Mid-range frequencies</ListItem>
                    <ListItem>Right sliders: High frequencies (treble)</ListItem>
                  </List>
                </ListItem>
                <ListItem>Values range from 0.0 (full attenuation) to 2.0 (200% volume)</ListItem>
                <ListItem>The default value is 1.0 (no change)</ListItem>
              </List>
              
              <Heading as="h4" size="sm" mb={2}>Equalizer Presets</Heading>
              <Text mb={2}>
                You can save and load equalizer presets for common audio adjustments:
              </Text>
              
              <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={3} mb={4}>

              <Box my={4} display="flex" justifyContent="center">
                <Image 
                  src="/images/ScreamRouter/Equalizer.png" 
                  alt="Equalizer in ScreamRouter" 
                  borderRadius="md" 
                  shadow="md" 
                  maxWidth="100%" 
                  mb={4}
                />
              </Box>
                <Box p={3} borderWidth="1px" borderRadius="md">
                  <Text fontWeight="bold" mb={1}>Bass Boost</Text>
                  <Text fontSize="sm">Enhances low frequencies for more powerful bass</Text>
                </Box>
                <Box p={3} borderWidth="1px" borderRadius="md">
                  <Text fontWeight="bold" mb={1}>Vocal Clarity</Text>
                  <Text fontSize="sm">Emphasizes mid-range frequencies for clearer vocals</Text>
                </Box>
                <Box p={3} borderWidth="1px" borderRadius="md">
                  <Text fontWeight="bold" mb={1}>Treble Boost</Text>
                  <Text fontSize="sm">Enhances high frequencies for more detail and brightness</Text>
                </Box>
              </Grid>

              <Box my={4} display="flex" justifyContent="center" flexDirection="column">
                <Image 
                  src="/images/ScreamRouter/Equalizer Light Presets.png" 
                  alt="Equalizer presets in ScreamRouter" 
                  borderRadius="md" 
                  shadow="md" 
                  maxWidth="100%" 
                  mb={4}
                />
                <Image 
                  src="/images/ScreamRouter/Equalizer Dark.png" 
                  alt="Equalizer in dark mode" 
                  borderRadius="md" 
                  shadow="md" 
                  maxWidth="100%" 
                />
              </Box>
            </TabPanel>
            
            <TabPanel>
              <Heading as="h3" size="md" mb={3}>Visualizer</Heading>
              <Text mb={4}>
                The audio visualizer provides a real-time visual representation of your audio.
              </Text>
              
              <Heading as="h4" size="sm" mb={2}>Using the Visualizer</Heading>
              <List spacing={2} styleType="disc" ml={5} mb={4}>
                <ListItem>Look for the visualizer at the bottom of the dashboard</ListItem>
                <ListItem>Click on the visualizer to enter fullscreen mode</ListItem>
                <ListItem>Press 'H' to cycle through different visualization styles:
                  <List spacing={1} styleType="circle" ml={5} mt={1}>
                    <ListItem>Waveform: Shows the audio wave pattern</ListItem>
                    <ListItem>Spectrum: Displays frequency distribution</ListItem>
                    <ListItem>Bars: Vertical bars representing frequency bands</ListItem>
                  </List>
                </ListItem>
                <ListItem>Press 'Esc' to exit fullscreen mode</ListItem>
              </List>
              
              <Text>
                The visualizer is not only visually appealing but also useful for identifying audio characteristics
                and troubleshooting issues with your sound.

              <Box my={4} display="flex" justifyContent="center">
                <Image 
                  src="/images/ScreamRouter/MediaKeys.png" 
                  alt="Media control keys in ScreamRouter" 
                  borderRadius="md" 
                  shadow="md" 
                  maxWidth="100%" 
                />
              </Box>
              </Text>
            </TabPanel>
            
            <TabPanel>
              <Heading as="h3" size="md" mb={3}>Audio Controls</Heading>
              <Text mb={4}>
                ScreamRouter provides comprehensive audio control options for sources and routes.
              </Text>
              
              <Heading as="h4" size="sm" mb={2}>Playback Controls</Heading>
              <List spacing={2} styleType="disc" ml={5} mb={4}>
                <ListItem><Text as="span" fontWeight="medium">Play/Pause:</Text> Start or stop audio playback</ListItem>
                <ListItem><Text as="span" fontWeight="medium">Next/Previous:</Text> Skip between tracks (if supported by the source)</ListItem>
                <ListItem><Text as="span" fontWeight="medium">Volume:</Text> Adjust the loudness using the slider</ListItem>
                <ListItem><Text as="span" fontWeight="medium">Timeshift:</Text> Rewind or fast-forward through the audio buffer (up to 5 minutes)</ListItem>
              </List>
              
              <Heading as="h4" size="sm" mb={2}>Active Source Controls</Heading>
              <Text mb={2}>
                The Active Source section at the top of the dashboard provides quick access to controls
                for the currently selected audio source:
              </Text>
              
              <List spacing={2} styleType="disc" ml={5}>
                <ListItem>Larger volume control for precise adjustments</ListItem>
                <ListItem>Media transport controls (play, pause, next, previous)</ListItem>
                <ListItem>Source information display</ListItem>
                <ListItem>Quick access to equalizer settings</ListItem>
              </List>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </DocSection>
      
      <DocSection title="Additional Features" icon={FaNetworkWired} mt={10}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
          <Box>
            <Heading as="h3" size="md" mb={3}>Search Functionality</Heading>
            <Text mb={3}>
              Use the search bar at the top of the dashboard to quickly find sources, sinks, or routes by name.
              This is especially useful when you have many audio components configured.
            </Text>
            <List spacing={2} styleType="disc" ml={5}>
              <ListItem>Type any part of a name to find matching components</ListItem>
              <ListItem>Results update in real-time as you type</ListItem>
              <ListItem>Click on a result to quickly navigate to that component</ListItem>
            </List>
          </Box>
          
          <Box>
            <Heading as="h3" size="md" mb={3}>Connection View</Heading>
            <Text mb={3}>
              See how your audio is routed through the system:
            </Text>
            <List spacing={2} styleType="disc" ml={5}>
              <ListItem>On desktop: Lines connect sources to sinks in the dashboard, showing active connections</ListItem>
              <ListItem>On mobile: A list view displays connections</ListItem>
              <ListItem>Hover over lines to see connection details</ListItem>
              <ListItem>Click on lines to quickly activate that source and sink</ListItem>
            </List>
          </Box>
          
          <Box>
            <Heading as="h3" size="md" mb={3}>VNC Integration</Heading>
            <Text mb={3}>
              Control your sources remotely:
            </Text>
            <List spacing={2} styleType="disc" ml={5}>
              <ListItem>Set up VNC for a source in its settings</ListItem>
              <ListItem>Click the 'VNC' button that appears to open the remote control window</ListItem>
              <ListItem>Interact with the source device directly through your browser</ListItem>
              <ListItem>Control playback, browse media libraries, and adjust settings</ListItem>
            </List>
          </Box>
          
          <Box>
            <Heading as="h3" size="md" mb={3}>Favorites</Heading>
            <Text mb={3}>
              The Favorites feature allows you to bookmark your most-used sources, sinks, or routes for quick access:
            </Text>
            <List spacing={2} styleType="disc" ml={5}>
              <ListItem>Look for the star icon next to the item you want to favorite</ListItem>
              <ListItem>Click the star to add it to your favorites</ListItem>
              <ListItem>Access your favorites from the dedicated Favorites section for easy management</ListItem>
              <ListItem>Reorder favorites by dragging and dropping</ListItem>
            </List>
          </Box>
        </Grid>
      </DocSection>
      
      <DocSection title="Troubleshooting" icon={FaCog} mt={10}>
        <Text mb={4}>
          If you encounter issues with the ScreamRouter UI, try these troubleshooting steps:
        </Text>
        
        <List spacing={3} styleType="decimal" ml={5}>
          <ListItem>
            <Text fontWeight="bold">Refresh the browser</Text>
            <Text>Try refreshing your browser or reloading the ScreamRouter application.</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="bold">Clear cache and cookies</Text>
            <Text>Clear your browser cache and cookies, then reload the page.</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="bold">Check network connection</Text>
            <Text>Ensure your internet connection is stable and ScreamRouter server is running.</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="bold">Verify device connections</Text>
            <Text>Check that all your audio devices are properly connected and powered on.</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="bold">Check status indicators</Text>
            <Text>Verify that the status indicators on sources and sinks show they're online and configured correctly.</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="bold">Disable/re-enable components</Text>
            <Text>If you're having issues with a specific route, try disabling and re-enabling it.</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="bold">Check error logs</Text>
            <Text>Consult the error logs in the application settings for more detailed information about any issues.</Text>
          </ListItem>
        </List>
      </DocSection>
    </Box>
  );
}

export default UIGuide;