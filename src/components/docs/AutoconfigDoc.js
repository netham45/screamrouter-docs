import React from 'react';
import { Box, Heading, Text, Code, VStack, Divider } from '@chakra-ui/react';
import DocSection from './DocSection';

function AutoconfigDoc() {
  return (
    <Box>
      <Heading size="lg" mb={4}>Autoconfiguration via mDNS</Heading>
      <Text mb={4}>
        ScreamRouter utilizes mDNS (Multicast DNS) for automatic discovery and configuration of sinks (receivers) and sources (senders) on the local network. This allows devices to find the ScreamRouter instance and configure themselves without manual intervention.
      </Text>

      <DocSection title="Config ID">
        <Text mb={2}>
          All sinks and sources are assigned a unique <Code>config_id</Code>. This identifier is persistent for each sender/receiver instance and allows ScreamRouter to update their configuration even if their IP address or hostname changes.
        </Text>
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
          To ensure secure communication (HTTPS), devices also query the PTR record for the discovered IP address to get the fully qualified domain name (FQDN) that the ScreamRouter's SSL certificate is issued for:
        </Text>
        <Code display="block" whiteSpace="pre" p={3} mb={4}>
          $ dig +short PTR $(dig +short A screamrouter.local @224.0.0.251 -p 5353) @224.0.0.251 -p 5353
          <br />
          _sink._scream._udp.local.
        </Code>
        <Text>This FQDN is then used to construct the HTTPS URL for accessing ScreamRouter services, like the Desktop Menu API.</Text>
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

      <DocSection title="Sink Configuration via TXT Records">
        <Text mb={2}>
          ScreamRouter advertises configuration settings for specific sinks via mDNS TXT records associated with <Code>sink.settings.screamrouter.local</Code>. Sinks can query this record (either broadly via multicast or directly at the ScreamRouter's IP) to retrieve their settings, such as bit depth, sample rate, channel layout, and their unique <Code>config_id</Code>.
        </Text>
        <Code display="block" whiteSpace="pre" p={3} mb={4}>
          $ dig +short TXT sink.settings.screamrouter.local @224.0.0.251 -p 5353
          <br />
          "bit_depth=32;sample_rate=48000;channels=8;channel_layout=7.1;id=d6da54f4-78ac-444d-885a-51183edc09d5;ip=192.168.3.164"
        </Code>
        <Text>
          Sinks use the returned <Code>config_id</Code> to identify which configuration applies to them, allowing them to update settings even if their IP changes.
        </Text>
      </DocSection>

      <Divider my={6} />

      <DocSection title="Source Configuration via TXT Records">
        <Text mb={2}>
          Sources can retrieve their configuration, including IP address mapping, tag, VNC settings, and their <Code>config_id</Code>, by querying the TXT record for <Code>source.settings.screamrouter.local</Code>.
        </Text>
        <Code display="block" whiteSpace="pre" p={3} mb={4}>
          $ dig +short TXT source.settings.screamrouter.local @224.0.0.251 -p 5353
          <br />
          "id=d6da54f4-78ac-444d-885a-51183edc09d5;ip=192.168.3.164;type=source;version=1.0"
        </Code>
        <Text>
          Sources use their <Code>config_id</Code> to find the relevant configuration entry.
        </Text>
      </DocSection>
      
      <Divider my={6} />

      <DocSection title="Desktop Client Autoconfig Example">
        <Text mb={2}>The Windows Desktop client uses this mechanism:</Text>
        <VStack align="start" spacing={1} mb={4}>
          <Text>1. Starts up without a pre-defined configuration.</Text>
          <Text>2. Queries the A record for <Code>screamrouter.local</Code> via mDNS (224.0.0.251:5353).</Text>
          <Text>3. Uses the returned IP address as the default destination for sending audio.</Text>
          <Text>4. Queries the PTR record for the discovered IP to get the correct SSL hostname.</Text>
          <Text>5. Uses the hostname to form the secure URL (e.g., <Code>https://hostname.local/site/DesktopMenu</Code>) to fetch its menu configuration.</Text>
        </VStack>
      </DocSection>

    </Box>
  );
}

export default AutoconfigDoc;
