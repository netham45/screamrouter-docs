import React from 'react';
import {
  Box,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Alert,
  AlertIcon,
  Code
} from '@chakra-ui/react';
import DocSection from './DocSection';

function PulseAudioCompatibilityDoc() {
  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>
        PulseAudio Compatibility
      </Heading>

      <Text fontSize="lg" mb={6}>
        ScreamRouter ships with an experimental PulseAudio server replacement. Instead of talking to the system
        PulseAudio daemon, ScreamRouter exposes its own PulseAudio socket and accepts client streams directly.
        Desktop applications can keep using their existing PulseAudio output paths while ScreamRouter captures
        the audio as part of your routing graph.
      </Text>

      <DocSection title="How It Works">
        <UnorderedList spacing={3}>
          <ListItem>
            ScreamRouter binds a PulseAudio-compatible UNIX socket and handles the playback stream negotiation itself.
          </ListItem>
          <ListItem>
            Applications discover the socket via the usual PulseAudio environment variables (for example, <Code>PULSE_SERVER</Code>)
            or by stopping the stock PulseAudio daemon so clients connect to ScreamRouter automatically.
          </ListItem>
          <ListItem>
            Once connected, each playback stream shows up inside ScreamRouter just like any other source, so you can route
            it out.
          </ListItem>
        </UnorderedList>
      </DocSection>

      <DocSection title="Getting Started">
        <UnorderedList spacing={2}>
          <ListItem>
            Stop or disable the regular PulseAudio daemon (for example, <Code>pulseaudio --kill</Code>) so applications fall back to the
            ScreamRouter socket, or export <Code>PULSE_SERVER</Code> to point directly at the ScreamRouter instance.
          </ListItem>
          <ListItem>
            Route the new PulseAudio stream to your preferred outputs using the normal ScreamRouter UI or configuration tools.
          </ListItem>
        </UnorderedList>
      </DocSection>

      <DocSection title="Current Limitations">
        <Alert status="warning" mb={4}>
          <AlertIcon />
          The compatibility layer only covers the basics of accepting playback streams. Advanced PulseAudio tooling such as
          <Code>pavucontrol</Code>, <Code>pactl</Code>, custom modules, or monitor devices are not supported.
        </Alert>
        <UnorderedList spacing={2}>
          <ListItem>No passthrough for PulseAudio module loading, source creation, or sink reconfiguration.</ListItem>
          <ListItem>Only standard playback streams are handled; capture and loopback monitoring remain unsupported.</ListItem>
          <ListItem>Per-stream properties beyond what clients negotiate automatically are ignored.</ListItem>
        </UnorderedList>
      </DocSection>
    </Box>
  );
}

export default PulseAudioCompatibilityDoc;
