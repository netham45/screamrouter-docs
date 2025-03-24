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
  Grid,
  Link
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaChevronRight, FaNetworkWired, FaHome } from 'react-icons/fa';
import DocSection from './DocSection';

function HomeAssistantDoc() {
  return (
    <Box>
      <Breadcrumb spacing="8px" separator={<FaChevronRight color="gray.500" />} mb={8}>
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to="/docs">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Home Assistant Integration</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      
      <Heading as="h1" size="xl" mb={6}>
        Home Assistant Integration
      </Heading>
      
      <Text fontSize="lg" mb={8}>
        ScreamRouter integrates with Home Assistant, allowing you to control your audio system through your 
        smart home setup. This guide explains how to set up and use the ScreamRouter Home Assistant component.
      </Text>
      
      <DocSection title="Introduction" icon={FaHome}>
        <Text mb={4}>
          The ScreamRouter Home Assistant integration allows you to control your ScreamRouter instance directly 
          from your Home Assistant setup. This integration brings the power and flexibility of ScreamRouter's 
          audio routing system into your smart home environment, enabling seamless control of audio sources, 
          routes, and sinks through Home Assistant's interface and automation capabilities.
        </Text>
        
        <Alert status="info" borderRadius="md" mb={6}>
          <AlertIcon />
          <Box>
            The integration is available as a custom component that you can install in your 
            Home Assistant instance. Visit the <Link color="brand.500" href="https://github.com/netham45/screamrouter_ha_component" isExternal>component's repository</Link> for the latest version.
          </Box>
        </Alert>
        
        <Heading as="h3" size="md" mb={3}>Features</Heading>
        <Text mb={3}>
          The integration provides different control options depending on the type of ScreamRouter entry:
        </Text>
        
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} mb={6}>
          <Box p={4} borderWidth="1px" borderRadius="md">
            <Heading as="h4" size="sm" mb={3}>Sources</Heading>
            <List spacing={2} styleType="disc" ml={4}>
              <ListItem>Volume control</ListItem>
              <ListItem>Enable/disable functionality</ListItem>
              <ListItem>Play/Pause controls</ListItem>
              <ListItem>Previous/Next track controls (if media control configured)</ListItem>
            </List>
          </Box>
          
          <Box p={4} borderWidth="1px" borderRadius="md">
            <Heading as="h4" size="sm" mb={3}>Routes</Heading>
            <List spacing={2} styleType="disc" ml={4}>
              <ListItem>Volume control</ListItem>
              <ListItem>Enable/disable functionality</ListItem>
              <ListItem>Apply pre-defined equalizer settings</ListItem>
            </List>
          </Box>
          
          <Box p={4} borderWidth="1px" borderRadius="md">
            <Heading as="h4" size="sm" mb={3}>Sinks</Heading>
            <List spacing={2} styleType="disc" ml={4}>
              <ListItem>Volume control</ListItem>
              <ListItem>Enable/disable functionality</ListItem>
              <ListItem>Play Home Assistant media to sinks</ListItem>
            </List>
          </Box>
        </Grid>
      </DocSection>
      
      <DocSection title="Installation" icon={FaNetworkWired} mt={10}>
        <Text mb={4}>
          To install the ScreamRouter integration in Home Assistant:
        </Text>
        
        <Heading as="h3" size="md" mb={3}>Manual Installation</Heading>
        <List as="ol" styleType="decimal" spacing={2} ml={5} mb={6}>
          <ListItem>Download the <Link color="brand.500" href="https://github.com/netham45/screamrouter_ha_component" isExternal>ScreamRouter Home Assistant component</Link> from GitHub</ListItem>
          <ListItem>Copy the <Code>screamrouter_ha_component</Code> folder to your Home Assistant <Code>custom_components</Code> directory</ListItem>
          <ListItem>Restart Home Assistant</ListItem>
          <ListItem>Go to Configuration {'->'} Integrations in the Home Assistant UI</ListItem>
          <ListItem>Click the "+ ADD INTEGRATION" button and search for "ScreamRouter"</ListItem>
          <ListItem>Follow the setup wizard to configure your ScreamRouter instance</ListItem>
        </List>
        
        <Heading as="h3" size="md" mb={3}>HACS Installation</Heading>
        <Text mb={3}>
          If you use the Home Assistant Community Store (HACS), you can add the ScreamRouter repository:
        </Text>
        
        <List as="ol" styleType="decimal" spacing={2} ml={5} mb={4}>
          <ListItem>Open HACS in your Home Assistant instance</ListItem>
          <ListItem>Go to "Integrations"</ListItem>
          <ListItem>Click the three dots in the top right and select "Custom repositories"</ListItem>
          <ListItem>Add <Code>https://github.com/netham45/screamrouter_ha_component</Code> as a new repository with category "Integration"</ListItem>
          <ListItem>Click "Add"</ListItem>
          <ListItem>Search for "ScreamRouter" in HACS and install it</ListItem>
          <ListItem>Restart Home Assistant</ListItem>
          <ListItem>Add the integration through the Home Assistant UI as described above</ListItem>
        </List>
      </DocSection>
      
      <DocSection title="Configuration" icon={FaNetworkWired} mt={10}>
        <Text mb={4}>
          The integration is configurable through the Home Assistant UI during setup. You'll need to provide:
        </Text>
        
        <List spacing={2} styleType="disc" ml={5} mb={6}>
          <ListItem><Text as="span" fontWeight="medium">IP address or hostname:</Text> The address of your ScreamRouter instance</ListItem>
          <ListItem><Text as="span" fontWeight="medium">Port (optional):</Text> The port of your ScreamRouter instance (default is 80 for HTTP, 443 for HTTPS)</ListItem>
          <ListItem><Text as="span" fontWeight="medium">Use HTTPS:</Text> Whether to use a secure connection</ListItem>
          <ListItem><Text as="span" fontWeight="medium">Verify SSL certificate:</Text> Whether to verify the SSL certificate for HTTPS connections</ListItem>
        </List>
        
        <Alert status="warning" borderRadius="md" mb={6}>
          <AlertIcon />
          <Box>
            <Text fontWeight="semibold">Authentication</Text>
            <Text>
              The current version of the integration does not support authentication. If your ScreamRouter
              instance requires authentication, you'll need to set up a reverse proxy with authentication
              or use another method to secure access.
            </Text>
          </Box>
        </Alert>
      </DocSection>
      
      <DocSection title="Using in Home Assistant" icon={FaHome} mt={10}>
        <Text mb={4}>
          Once configured, ScreamRouter entities will appear in your Home Assistant dashboard. 
        </Text>
        
        <Heading as="h3" size="md" mb={3}>Available Entity Types</Heading>
        <List spacing={2} styleType="disc" ml={5} mb={6}>
          <ListItem><Text as="span" fontWeight="medium">Media Player:</Text> Sources with media control capabilities appear as media players</ListItem>
          <ListItem><Text as="span" fontWeight="medium">Number:</Text> Volume controls for sources, sinks, and routes</ListItem>
          <ListItem><Text as="span" fontWeight="medium">Switch:</Text> Enable/disable toggles for sources, sinks, and routes</ListItem>
          <ListItem><Text as="span" fontWeight="medium">Select:</Text> For selecting predefined equalizer settings (if configured)</ListItem>
        </List>
        
        <Heading as="h3" size="md" mb={3}>Using ScreamRouter Entities</Heading>
        <Text mb={3}>
          With the integration in place, you can:
        </Text>
        
        <List spacing={2} styleType="disc" ml={5} mb={6}>
          <ListItem>Control volume using sliders or number entities</ListItem>
          <ListItem>Toggle play/pause for sources</ListItem>
          <ListItem>Use media player controls for sources (if configured)</ListItem>
          <ListItem>Play Home Assistant media to ScreamRouter sinks</ListItem>
          <ListItem>Enable or disable routes with switches</ListItem>

        <Box my={4} display="flex" justifyContent="center">
          <Image 
            src="/images/ScreamRouter/HAMediaPlayer.png" 
            alt="ScreamRouter Media Player in Home Assistant" 
            borderRadius="md" 
            shadow="md" 
            maxWidth="100%" 
          />
        </Box>
        </List>
        
        <Heading as="h3" size="md" mb={3}>Adding to Your Dashboard</Heading>
        <Text mb={3}>
          To add ScreamRouter controls to your Home Assistant dashboard:
        </Text>
        
        <List as="ol" styleType="decimal" spacing={2} ml={5} mb={4}>
          <ListItem>Edit your dashboard</ListItem>
          <ListItem>Click "+ Add Card"</ListItem>
          <ListItem>Search for "Media Control" or "Entities" depending on what you want to add</ListItem>
          <ListItem>Select the appropriate ScreamRouter entities</ListItem>
          <ListItem>Configure the card as desired</ListItem>
          <ListItem>Save the card and dashboard</ListItem>
        </List>
      </DocSection>
      
      <DocSection title="Automation Examples" icon={FaNetworkWired} mt={10}>
        <Text mb={4}>
          You can use ScreamRouter entities in your automations, scripts, and scenes. Here are some examples:
        </Text>
        
        <Heading as="h3" size="md" mb={3}>Example: Automatic Volume Control</Heading>
        <Text mb={3}>
          Lower the volume when someone opens the front door:
        </Text>
        
        <Code p={4} borderRadius="md" display="block" whiteSpace="pre" mb={6}>
{`alias: "Lower Audio When Door Opens"
description: "Reduces audio volume when the front door is opened"
trigger:
  - platform: state
    entity_id: binary_sensor.front_door
    from: "off"
    to: "on"
action:
  - service: number.set_value
    target:
      entity_id: number.screamrouter_living_room_speakers_volume
    data:
      value: 0.3
  - delay:
      minutes: 2
  - service: number.set_value
    target:
      entity_id: number.screamrouter_living_room_speakers_volume
    data:
      value: 0.7`}
        </Code>
        
        <Heading as="h3" size="md" mb={3}>Example: Movie Night Scene</Heading>
        <Text mb={3}>
          Set up your audio system for movie night:
        </Text>
        
        <Code p={4} borderRadius="md" display="block" whiteSpace="pre" mb={6}>
{`alias: "Movie Night"
description: "Configure audio for movie watching"
sequence:
  - service: switch.turn_on
    target:
      entity_id: switch.screamrouter_tv_to_surround_route
  - service: switch.turn_off
    target:
      entity_id: switch.screamrouter_music_to_living_room_route
  - service: number.set_value
    target:
      entity_id: number.screamrouter_home_theater_volume
    data:
      value: 0.6
  - service: select.select_option
    target:
      entity_id: select.screamrouter_home_theater_eq
    data:
      option: "Movie Mode"`}
        </Code>
        
        <Heading as="h3" size="md" mb={3}>Example: Voice Commands</Heading>
        <Text mb={3}>
          Use voice assistants to control your audio:
        </Text>
        
        <Code p={4} borderRadius="md" display="block" whiteSpace="pre" mb={4}>
{`# Define in your configuration.yaml:
script:
  play_music_in_kitchen:
    alias: "Play Music in Kitchen"
    sequence:
      - service: switch.turn_on
        target:
          entity_id: switch.screamrouter_spotify_to_kitchen_route
      - service: media_player.media_play
        target:
          entity_id: media_player.screamrouter_spotify

# Then in your voice assistant configuration:
# "Hey Google, play music in the kitchen" -> runs the script`}
        </Code>
      </DocSection>
      
      <DocSection title="Troubleshooting" icon={FaNetworkWired} mt={10}>
        <Text mb={4}>
          If you encounter issues with the Home Assistant integration:
        </Text>
        
        <List spacing={3} styleType="decimal" ml={5}>
          <ListItem>
            <Text fontWeight="bold">Check connectivity</Text>
            <Text>Ensure your ScreamRouter instance is running and accessible from your Home Assistant server.</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="bold">Check component installation</Text>
            <Text>Verify that the component is correctly installed in your <Code>custom_components</Code> directory.</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="bold">Review Home Assistant logs</Text>
            <Text>Look for any error messages related to ScreamRouter in the Home Assistant logs.</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="bold">Check network settings</Text>
            <Text>Ensure there are no firewall rules blocking communication between Home Assistant and ScreamRouter.</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="bold">Version compatibility</Text>
            <Text>Make sure you're using compatible versions of ScreamRouter and the Home Assistant component.</Text>
          </ListItem>
        </List>
      </DocSection>
    </Box>
  );
}

export default HomeAssistantDoc;