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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaChevronRight, FaNetworkWired, FaPuzzlePiece, FaCode } from 'react-icons/fa';
import DocSection from './DocSection';

function PluginsDoc() {
  return (
    <Box>
      <Breadcrumb spacing="8px" separator={<FaChevronRight color="gray.500" />} mb={8}>
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to="/docs">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Plugins</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      
      <Heading as="h1" size="xl" mb={6}>
        ScreamRouter Plugins
      </Heading>
      
      <Text fontSize="lg" mb={8}>
        ScreamRouter's plugin system allows users to extend its functionality by adding custom input sources and 
        processing logic. Plugins can generate PCM audio data and send it to ScreamRouter for routing and playback,
        enabling integration with various audio sources and services.
      </Text>
      
      <DocSection title="Plugin Architecture" icon={FaPuzzlePiece}>
        <Text mb={4}>
          The plugin system consists of three main components:
        </Text>
        
        <List spacing={4} styleType="decimal" ml={5} mb={6}>
          <ListItem>
            <Text fontWeight="bold">ScreamRouterPlugin:</Text>
            <Text>Base class for all plugins</Text>
          </ListItem>
          <ListItem>
            <Text fontWeight="bold">PluginManager:</Text>
            <Text>Manages plugin lifecycle</Text>
          </ListItem>
          <ListItem>
            <Text fontWeight="bold">ScreamRouterPluginSender:</Text>
            <Text>Handles audio data transmission</Text>
          </ListItem>
        </List>
        
        <Alert status="info" borderRadius="md" mb={6}>
          <AlertIcon />
          <Box>
            Plugins run as separate processes to maintain stability and isolation. This ensures that
            a misbehaving plugin won't affect the core ScreamRouter system.
          </Box>
        </Alert>
        
        <Heading as="h3" size="md" mb={3}>ScreamRouterPlugin</Heading>
        <Text mb={3}>
          This is the base class that all plugins must extend. It provides:
        </Text>
        <List spacing={2} styleType="disc" ml={5} mb={4}>
          <ListItem>Methods for adding temporary and permanent sources</ListItem>
          <ListItem>Handlers for lifecycle events</ListItem>
          <ListItem>Communication with ScreamRouter via pipes</ListItem>
          <ListItem>Audio data transmission capabilities</ListItem>
        </List>
        
        <Text mb={3}>
          Important methods to implement:
        </Text>
        <List spacing={2} styleType="disc" ml={5} mb={4}>
          <ListItem><Text as="span" fontWeight="medium">start_plugin():</Text> Plugin initialization</ListItem>
          <ListItem><Text as="span" fontWeight="medium">stop_plugin():</Text> Cleanup tasks</ListItem>
          <ListItem><Text as="span" fontWeight="medium">load_plugin():</Text> Configuration (re)loading</ListItem>
          <ListItem><Text as="span" fontWeight="medium">unload_plugin():</Text> Configuration unloading</ListItem>
        </List>
        
        <Heading as="h3" size="md" mb={3}>PluginManager</Heading>
        <Text mb={3}>
          The PluginManager is responsible for:
        </Text>
        <List spacing={2} styleType="disc" ml={5} mb={4}>
          <ListItem>Registering, starting, and stopping plugins</ListItem>
          <ListItem>Loading and unloading plugins on configuration changes</ListItem>
          <ListItem>Collecting temporary and permanent sources</ListItem>
          <ListItem>Managing plugin lifecycle events</ListItem>
        </List>
        
        <Heading as="h3" size="md" mb={3}>ScreamRouterPluginSender</Heading>
        <Text mb={3}>
          This component handles audio data transmission from plugins to ScreamRouter in a separate process. It:
        </Text>
        <List spacing={2} styleType="disc" ml={5} mb={4}>
          <ListItem>Buffers audio data</ListItem>
          <ListItem>Formats data for transmission</ListItem>
          <ListItem>Manages data flow between the plugin and ScreamRouter</ListItem>
        </List>
      </DocSection>
      
      <DocSection title="Creating a Plugin" icon={FaCode} mt={10}>
        <Text mb={4}>
          To create a plugin, you need to extend the <Code>ScreamRouterPlugin</Code> class and implement
          the required methods.
        </Text>
        
        <Heading as="h3" size="md" mb={3}>Plugin Structure</Heading>
        <Code p={4} borderRadius="md" display="block" whiteSpace="pre" mb={6}>
{`from screamrouter.plugins import ScreamRouterPlugin, AudioFormat

class MyCustomPlugin(ScreamRouterPlugin):
    def __init__(self, manager):
        super().__init__(manager)
        self.name = "MyCustomPlugin"
        self.tag = "mycustomplugin"
        
    def start_plugin(self):
        # Initialize your plugin here
        # Add sources, set up audio processing, etc.
        self.add_permanent_source(
            "My Audio Source",
            "mycustom_source",
            AudioFormat(sample_rate=48000, bit_depth=16, channels=2)
        )
        
    def stop_plugin(self):
        # Clean up resources when the plugin is stopped
        pass
        
    def load_plugin(self, config):
        # Load or reload configuration
        self.config = config
        
    def unload_plugin(self):
        # Unload configuration
        pass
        
    def write_audio_data(self, source_tag, data):
        # Send audio data to ScreamRouter
        self.write_data(source_tag, data)
`}
        </Code>
        
        <Heading as="h3" size="md" mb={3}>Plugin Installation</Heading>
        <Text mb={3}>
          To install a plugin:
        </Text>
        <List as="ol" styleType="decimal" spacing={2} ml={5} mb={4}>
          <ListItem>Place your plugin code in the <Code>plugins</Code> directory of ScreamRouter</ListItem>
          <ListItem>Make sure your main plugin class extends <Code>ScreamRouterPlugin</Code></ListItem>
          <ListItem>Register your plugin in the ScreamRouter configuration</ListItem>
          <ListItem>Restart ScreamRouter or reload plugins</ListItem>
        </List>
      </DocSection>
      
      <DocSection title="Audio Sources" icon={FaNetworkWired} mt={10}>
        <Text mb={4}>
          Plugins can add two types of sources to ScreamRouter:
        </Text>
        
        <Tabs variant="enclosed" colorScheme="brand">
          <TabList>
            <Tab>Temporary Sources</Tab>
            <Tab>Permanent Sources</Tab>
          </TabList>
          
          <TabPanels>
            <TabPanel>
              <Heading as="h3" size="md" mb={3}>Temporary Sources</Heading>
              <Text mb={3}>
                Temporary sources are volatile and do not persist across plugin reloads. They are useful for:
              </Text>
              <List spacing={2} styleType="disc" ml={5} mb={4}>
                <ListItem>Short-lived audio streams</ListItem>
                <ListItem>Dynamic audio generation</ListItem>
                <ListItem>Testing and debugging</ListItem>
              </List>
              
              <Text mb={3}>
                To add a temporary source:
              </Text>
              <Code p={4} borderRadius="md" display="block" whiteSpace="pre" mb={4}>
{`def add_temporary_source(self, name, tag, audio_format):
    # Example usage
    self.add_temporary_source(
        "Temporary Audio",
        "temp_audio_1",
        AudioFormat(sample_rate=48000, bit_depth=16, channels=2)
    )
`}
              </Code>
              <Text>
                Temporary sources will not appear in the ScreamRouter API and will not be saved to 
                the configuration file. They exist only in memory.
              </Text>
            </TabPanel>
            
            <TabPanel>
              <Heading as="h3" size="md" mb={3}>Permanent Sources</Heading>
              <Text mb={3}>
                Permanent sources are saved to the configuration and persist across plugin reloads. They:
              </Text>
              <List spacing={2} styleType="disc" ml={5} mb={4}>
                <ListItem>Appear in the ScreamRouter API</ListItem>
                <ListItem>Can be used in routes</ListItem>
                <ListItem>Persist across system restarts</ListItem>
                <ListItem>Can be managed through the ScreamRouter interface</ListItem>
              </List>
              
              <Text mb={3}>
                To add a permanent source:
              </Text>
              <Code p={4} borderRadius="md" display="block" whiteSpace="pre" mb={4}>
{`def add_permanent_source(self, name, tag, audio_format):
    # Example usage
    self.add_permanent_source(
        "Streaming Radio",
        "streaming_radio",
        AudioFormat(sample_rate=44100, bit_depth=16, channels=2)
    )
`}
              </Code>
              <Text>
                Permanent sources are fully integrated into the ScreamRouter system and can be used
                just like any other audio source.
              </Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </DocSection>
      
      <DocSection title="Example Plugins" icon={FaCode} mt={10}>
        <Text mb={4}>
          ScreamRouter includes several example plugins that demonstrate various use cases:
        </Text>
        
        <Heading as="h3" size="md" mb={3}>PluginPlayURL</Heading>
        <Text mb={3}>
          This plugin adds an API endpoint to play audio from a URL on a specified sink.
        </Text>
        <Code p={4} borderRadius="md" display="block" whiteSpace="pre" mb={6}>
{`# Example API usage
GET /plugins/playurl/play?url=http://example.com/audio.mp3&sink=Living%20Room

# This will play the audio file at the URL on the "Living Room" sink
`}
        </Code>
        
        <Heading as="h3" size="md" mb={3}>PluginPlayURLMultiple</Heading>
        <Text mb={3}>
          An extension of PluginPlayURL that can play multiple URLs simultaneously.
        </Text>
        <Code p={4} borderRadius="md" display="block" whiteSpace="pre" mb={6}>
{`# Example API usage
POST /plugins/playurlmultiple/play
Content-Type: application/json

{
  "urls": [
    "http://example.com/audio1.mp3",
    "http://example.com/audio2.mp3"
  ],
  "sink": "Living Room"
}
`}
        </Code>
        
        <Text mb={3}>
          These plugins demonstrate:
        </Text>
        <List spacing={2} styleType="disc" ml={5}>
          <ListItem>Setting up API endpoints</ListItem>
          <ListItem>Managing external processes (ffmpeg)</ListItem>
          <ListItem>Handling audio streaming</ListItem>
          <ListItem>Interacting with ScreamRouter's routing system</ListItem>
        </List>
      </DocSection>
      
      <DocSection title="Best Practices" icon={FaNetworkWired} mt={10}>
        <Text mb={4}>
          When developing plugins for ScreamRouter, follow these best practices:
        </Text>
        
        <List spacing={3} styleType="decimal" ml={5}>
          <ListItem>
            <Text fontWeight="bold">Use unique tags for your plugin and sources</Text>
            <Text>Ensure that your plugin tag and source tags are unique to avoid conflicts with other plugins.</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="bold">Handle cleanup properly</Text>
            <Text>In <Code>stop_plugin()</Code> and <Code>unload_plugin()</Code>, make sure to properly clean up resources like external processes, file handles, and network connections.</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="bold">Use the provided logging system</Text>
            <Text>Use the <Code>self.log</Code> method for logging to ensure your plugin's messages are properly captured in the ScreamRouter logs.</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="bold">Be mindful of resource usage</Text>
            <Text>Plugins run as separate processes but share system resources. Be careful with memory usage, CPU utilization, and external processes.</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="bold">Error handling</Text>
            <Text>Implement proper error handling to prevent plugin crashes. Catch exceptions and log errors appropriately.</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="bold">Thread safety</Text>
            <Text>If your plugin uses multiple threads, ensure that shared resources are accessed in a thread-safe manner.</Text>
          </ListItem>
        </List>
      </DocSection>
      
      <DocSection title="Troubleshooting" icon={FaNetworkWired} mt={10}>
        <Text mb={4}>
          If you encounter issues with plugins:
        </Text>
        
        <List spacing={3} styleType="decimal" ml={5}>
          <ListItem>
            <Text fontWeight="bold">Check the logs</Text>
            <Text>The ScreamRouter logs contain detailed information about plugin initialization, errors, and operation.</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="bold">Verify installation</Text>
            <Text>Ensure that the plugin is correctly installed in the <Code>plugins</Code> directory and is being loaded by ScreamRouter.</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="bold">Check configuration</Text>
            <Text>Verify that the plugin is properly configured in the ScreamRouter configuration file.</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="bold">External dependencies</Text>
            <Text>If your plugin uses external dependencies (e.g., ffmpeg), make sure they are installed and accessible.</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="bold">Test in isolation</Text>
            <Text>Try testing your plugin in isolation to identify any issues specific to the plugin code.</Text>
          </ListItem>
        </List>
        
        <Alert status="info" borderRadius="md" mt={6}>
          <AlertIcon />
          <Box>
            <Text fontWeight="semibold">Plugin API Changes</Text>
            <Text>
              The plugin API may evolve over time. Check the latest documentation or the ScreamRouter
              source code if you encounter compatibility issues with newer versions.
            </Text>
          </Box>
        </Alert>
      </DocSection>
    </Box>
  );
}

export default PluginsDoc;