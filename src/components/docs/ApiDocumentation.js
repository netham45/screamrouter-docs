import React from 'react';
import {
  Box,
  Text,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Code,
  Badge,
  Divider,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaChevronRight, FaNetworkWired } from 'react-icons/fa';
import DocSection from './DocSection';

function ApiDocumentation() {
  return (
    <Box>
      <Breadcrumb spacing="8px" separator={<FaChevronRight color="gray.500" />} mb={8}>
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to="/docs">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>API Reference</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      
      <Heading as="h1" size="xl" mb={6}>
        ScreamRouter API Reference
      </Heading>
      
      <Text fontSize="lg" mb={8}>
        ScreamRouter provides a comprehensive API for programmatic control of your audio routing system.
        This reference documents the available endpoints, parameters, and data formats.
      </Text>
      
      <Tabs variant="enclosed" colorScheme="brand">
        <TabList>
          <Tab>Sink API</Tab>
          <Tab>Source API</Tab>
          <Tab>Route API</Tab>
          <Tab>Streaming</Tab>
        </TabList>
        
        <TabPanels>
          <TabPanel>
            <Heading as="h2" size="lg" mb={4}>Sink Management Endpoints</Heading>
            
            <Box mb={6}>
              <Heading as="h3" size="md" mb={2}>GET /sinks</Heading>
              <Text mb={2}>Returns a list of all configured sinks.</Text>
              <Badge colorScheme="green" mr={2}>GET</Badge>
              <Badge colorScheme="blue">Returns: Array of SinkDescription objects</Badge>
            </Box>
            
            <Box mb={6}>
              <Heading as="h3" size="md" mb={2}>POST /sinks</Heading>
              <Text mb={2}>Adds a new sink or sink group.</Text>
              <Badge colorScheme="purple" mr={2}>POST</Badge>
              <Badge colorScheme="yellow">Body: SinkDescription object</Badge>
            </Box>
            
            <Box mb={6}>
              <Heading as="h3" size="md" mb={2}>PUT /sinks/{'{old_sink_name}'}</Heading>
              <Text mb={2}>Updates fields on an existing sink. Undefined fields are ignored.</Text>
              <Badge colorScheme="orange" mr={2}>PUT</Badge>
              <Badge colorScheme="yellow">Body: SinkDescription object with updated fields</Badge>
            </Box>
            
            <Box mb={6}>
              <Heading as="h3" size="md" mb={2}>DELETE /sinks/{'{sink_name}'}</Heading>
              <Text mb={2}>Deletes a sink by name.</Text>
              <Badge colorScheme="red" mr={2}>DELETE</Badge>
              <Badge colorScheme="blue">Returns: Boolean indicating success or failure</Badge>
            </Box>
            
            <Box mb={6}>
              <Heading as="h3" size="md" mb={2}>GET /sinks/{'{sink_name}'}/enable</Heading>
              <Text mb={2}>Enables a sink by name.</Text>
              <Badge colorScheme="green" mr={2}>GET</Badge>
              <Badge colorScheme="blue">Returns: Boolean indicating success or failure</Badge>
            </Box>
            
            <Box mb={6}>
              <Heading as="h3" size="md" mb={2}>GET /sinks/{'{sink_name}'}/disable</Heading>
              <Text mb={2}>Disables a sink by name.</Text>
              <Badge colorScheme="green" mr={2}>GET</Badge>
              <Badge colorScheme="blue">Returns: Boolean indicating success or failure</Badge>
            </Box>
            
            <Box mb={6}>
              <Heading as="h3" size="md" mb={2}>GET /sinks/{'{sink_name}'}/volume/{'{volume}'}</Heading>
              <Text mb={2}>Sets the volume for a sink or sink group.</Text>
              <Badge colorScheme="green" mr={2}>GET</Badge>
              <Badge colorScheme="blue">Returns: Boolean indicating success or failure</Badge>
            </Box>
            
            <Divider my={6} />
            
            <Heading as="h3" size="md" mb={4}>SinkDescription Object</Heading>
            <Code p={4} borderRadius="md" display="block" whiteSpace="pre" mb={4}>
{`{
  "name": "string",         // Name of the sink
  "ip": "string",           // IP address of the sink (nullable)
  "port": integer,          // Port number (default: 4010, nullable)
  "is_group": boolean,      // Whether the sink is a group
  "enabled": boolean,       // Whether the sink is enabled
  "group_members": [        // Names of group members (for group sinks)
    "string"
  ],
  "volume": float,          // Volume level (0.0 to 1.0)
  "bit_depth": integer,     // Bit depth (16, 24, or 32)
  "sample_rate": integer,   // Sample rate (44100, 48000, 88200, 96000, or 192000)
  "channels": integer,      // Number of audio channels (1 to 8)
  "channel_layout": "string", // Channel layout type
  "delay": integer,         // Delay in milliseconds (0 to 5000)
  "equalizer": {            // Equalizer settings
    // 18 float values (b1 to b18) representing gain for different frequency bands
    // Each value ranges from 0.0 (full attenuation) to 2.0 (200% volume)
  },
  "time_sync": boolean,     // Whether time synchronization is enabled NOTE: Not yet implemented
  "time_sync_delay": integer // Time synchronization delay NOTE: Not yet implemented
}`}
            </Code>
          </TabPanel>
          
          <TabPanel>
            <Heading as="h2" size="lg" mb={4}>Source Management Endpoints</Heading>
            
            <Box mb={6}>
              <Heading as="h3" size="md" mb={2}>GET /sources</Heading>
              <Text mb={2}>Returns a list of all configured sources.</Text>
              <Badge colorScheme="green" mr={2}>GET</Badge>
              <Badge colorScheme="blue">Returns: Array of SourceDescription objects</Badge>
            </Box>
            
            <Box mb={6}>
              <Heading as="h3" size="md" mb={2}>POST /sources</Heading>
              <Text mb={2}>Adds a new source or source group.</Text>
              <Badge colorScheme="purple" mr={2}>POST</Badge>
              <Badge colorScheme="yellow">Body: SourceDescription object</Badge>
            </Box>
            
            <Box mb={6}>
              <Heading as="h3" size="md" mb={2}>PUT /sources/{'{old_source_name}'}</Heading>
              <Text mb={2}>Updates fields on an existing source. Undefined fields are not changed.</Text>
              <Badge colorScheme="orange" mr={2}>PUT</Badge>
              <Badge colorScheme="yellow">Body: SourceDescription object with updated fields</Badge>
            </Box>
            
            <Box mb={6}>
              <Heading as="h3" size="md" mb={2}>DELETE /sources/{'{source_name}'}</Heading>
              <Text mb={2}>Deletes a source by name.</Text>
              <Badge colorScheme="red" mr={2}>DELETE</Badge>
              <Badge colorScheme="blue">Returns: Boolean indicating success or failure</Badge>
            </Box>
            
            <Box mb={6}>
              <Heading as="h3" size="md" mb={2}>GET /sources/{'{source_name}'}/play</Heading>
              <Text mb={2}>Send play command to the source.</Text>
              <Badge colorScheme="green" mr={2}>GET</Badge>
              <Badge colorScheme="blue">Returns: Boolean indicating success or failure</Badge>
            </Box>
            
            <Box mb={6}>
              <Heading as="h3" size="md" mb={2}>GET /sources/{'{source_name}'}/nexttrack</Heading>
              <Text mb={2}>Send next track command to the source.</Text>
              <Badge colorScheme="green" mr={2}>GET</Badge>
              <Badge colorScheme="blue">Returns: Boolean indicating success or failure</Badge>
            </Box>
            
            <Box mb={6}>
              <Heading as="h3" size="md" mb={2}>GET /sources/{'{source_name}'}/prevtrack</Heading>
              <Text mb={2}>Send previous track command to the source.</Text>
              <Badge colorScheme="green" mr={2}>GET</Badge>
              <Badge colorScheme="blue">Returns: Boolean indicating success or failure</Badge>
            </Box>
            
            <Divider my={6} />
            
            <Heading as="h3" size="md" mb={4}>SourceDescription Object</Heading>
            <Code p={4} borderRadius="md" display="block" whiteSpace="pre" mb={4}>
{`{
  "name": "string",         // Name of the source
  "ip": "string",           // IP address of the source (nullable)
  "tag": "string",          // Tag for the source (nullable)
  "is_group": boolean,      // Whether the source is a group
  "enabled": boolean,       // Whether the source is enabled
  "group_members": [        // Names of group members (for group sources)
    "string"
  ],
  "volume": float,          // Volume level (0.0 to 1.0)
  "delay": integer,         // Delay in milliseconds (0 to 5000)
  "equalizer": {            // Equalizer settings
    // 18 float values (b1 to b18)
  },
  "vnc_ip": "string",       // VNC server IP address
  "vnc_port": integer       // VNC server port
}`}
            </Code>
          </TabPanel>
          
          <TabPanel>
            <Heading as="h2" size="lg" mb={4}>Route Management Endpoints</Heading>
            
            <Box mb={6}>
              <Heading as="h3" size="md" mb={2}>GET /routes</Heading>
              <Text mb={2}>Returns a list of all configured routes.</Text>
              <Badge colorScheme="green" mr={2}>GET</Badge>
              <Badge colorScheme="blue">Returns: Array of RouteDescription objects</Badge>
            </Box>
            
            <Box mb={6}>
              <Heading as="h3" size="md" mb={2}>POST /routes</Heading>
              <Text mb={2}>Adds a new route.</Text>
              <Badge colorScheme="purple" mr={2}>POST</Badge>
              <Badge colorScheme="yellow">Body: RouteDescription object</Badge>
            </Box>
            
            <Box mb={6}>
              <Heading as="h3" size="md" mb={2}>PUT /routes/{'{old_route_name}'}</Heading>
              <Text mb={2}>Updates fields on an existing route. Undefined fields are ignored.</Text>
              <Badge colorScheme="orange" mr={2}>PUT</Badge>
              <Badge colorScheme="yellow">Body: RouteDescription object with updated fields</Badge>
            </Box>
            
            <Box mb={6}>
              <Heading as="h3" size="md" mb={2}>DELETE /routes/{'{route_name}'}</Heading>
              <Text mb={2}>Deletes a route by name.</Text>
              <Badge colorScheme="red" mr={2}>DELETE</Badge>
              <Badge colorScheme="blue">Returns: Boolean indicating success or failure</Badge>
            </Box>
            
            <Box mb={6}>
              <Heading as="h3" size="md" mb={2}>GET /routes/{'{route_name}'}/enable</Heading>
              <Text mb={2}>Enables a route by name.</Text>
              <Badge colorScheme="green" mr={2}>GET</Badge>
              <Badge colorScheme="blue">Returns: Boolean indicating success or failure</Badge>
            </Box>
            
            <Box mb={6}>
              <Heading as="h3" size="md" mb={2}>GET /routes/{'{route_name}'}/disable</Heading>
              <Text mb={2}>Disables a route by name.</Text>
              <Badge colorScheme="green" mr={2}>GET</Badge>
              <Badge colorScheme="blue">Returns: Boolean indicating success or failure</Badge>
            </Box>
            
            <Divider my={6} />
            
            <Heading as="h3" size="md" mb={4}>RouteDescription Object</Heading>
            <Code p={4} borderRadius="md" display="block" whiteSpace="pre" mb={4}>
{`{
  "name": "string",         // Name of the route
  "sink": "string",         // Name of the sink for this route
  "source": "string",       // Name of the source for this route
  "enabled": boolean,       // Whether the route is enabled
  "volume": float,          // Volume level (0.0 to 1.0)
  "delay": integer,         // Delay in milliseconds (0 to 5000)
  "equalizer": {            // Equalizer settings
    // 18 float values (b1 to b18)
  }
}`}
            </Code>
          </TabPanel>
          
          <TabPanel>
            <Heading as="h2" size="lg" mb={4}>Streaming Endpoints</Heading>
            
            <Box mb={6}>
              <Heading as="h3" size="md" mb={2}>GET /stream/{'{sink_ip}'}/</Heading>
              <Text mb={2}>Streams MP3 frames from ScreamRouter.</Text>
              <Badge colorScheme="green" mr={2}>GET</Badge>
              <Badge colorScheme="blue">Returns: MP3 audio stream</Badge>
              <Text mt={2}>
                This endpoint allows you to listen to audio from a specific sink in your browser or other MP3-compatible applications.
              </Text>
            </Box>
            
            <Alert status="info" borderRadius="md" mt={6}>
              <AlertIcon />
              The API also includes several endpoints for serving site resources and HTML dialogs for the web interface.
              These endpoints are primarily for internal use by the ScreamRouter web application.
            </Alert>
          </TabPanel>
        </TabPanels>
      </Tabs>
      
      <DocSection title="Authentication" icon={FaNetworkWired} mt={10}>
        <Text mb={4}>
          ScreamRouter API endpoints do not require authentication by default. It's recommended to 
          secure access to your ScreamRouter instance using network-level security, such as:
        </Text>
        <ul>
          <li>Running ScreamRouter on a secure local network</li>
          <li>Using a reverse proxy with basic authentication</li>
          <li>Implementing firewall rules to restrict access</li>
        </ul>
        
        <Alert status="warning" borderRadius="md" mt={4}>
          <AlertIcon />
          If your ScreamRouter instance is accessible from the internet, it's strongly recommended to implement
          additional security measures to prevent unauthorized access.
        </Alert>
      </DocSection>
      
      <DocSection title="API Examples" icon={FaNetworkWired} mt={10}>
        <Heading as="h3" size="md" mb={3}>cURL Examples</Heading>
        
        <Text mb={2}>Getting a list of all sinks:</Text>
        <Code p={3} borderRadius="md" display="block" whiteSpace="pre" mb={4}>
{`curl -X GET "http://screamrouter.local/sinks"`}
        </Code>
        
        <Text mb={2}>Creating a new sink:</Text>
        <Code p={3} borderRadius="md" display="block" whiteSpace="pre" mb={4}>
{`curl -X POST "http://screamrouter.local/sinks" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Living Room Speakers",
    "ip": "192.168.1.10",
    "port": 4010,
    "is_group": false,
    "enabled": true,
    "volume": 0.8,
    "bit_depth": 24,
    "sample_rate": 48000,
    "channels": 2
  }'`}
        </Code>
        
        <Text mb={2}>Adjusting volume:</Text>
        <Code p={3} borderRadius="md" display="block" whiteSpace="pre" mb={4}>
{`curl -X GET "http://screamrouter.local/sinks/Living%20Room%20Speakers/volume/0.5"`}
        </Code>
        
        <Heading as="h3" size="md" mb={3} mt={6}>JavaScript Examples</Heading>
        
        <Text mb={2}>Getting a list of all routes:</Text>
        <Code p={3} borderRadius="md" display="block" whiteSpace="pre" mb={4}>
{`// Using fetch API
fetch('http://screamrouter.local/routes')
  .then(response => response.json())
  .then(routes => console.log(routes))
  .catch(error => console.error('Error:', error));`}
        </Code>
        
        <Text mb={2}>Creating a new route:</Text>
        <Code p={3} borderRadius="md" display="block" whiteSpace="pre" mb={4}>
{`// Using async/await
const createRoute = async () => {
  try {
    const response = await fetch('http://screamrouter.local/routes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: "Spotify to Kitchen",
        source: "Spotify",
        sink: "Kitchen Speakers",
        enabled: true,
        volume: 0.7
      }),
    });
    const result = await response.json();
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
  }
};`}
        </Code>
      </DocSection>
    </Box>
  );
}

export default ApiDocumentation;