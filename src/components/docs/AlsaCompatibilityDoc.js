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

function AlsaCompatibilityDoc() {
  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>
        ALSA Audio Compatibility
      </Heading>

      <Text fontSize="lg" mb={6}>
        On Linux, ScreamRouter talks directly to ALSA so you can route system audio from both playback and capture
        hardware. If the device shows up in tools like <Code>aplay -l</Code> or your desktop control panel, it should be
        visible to ScreamRouter as well.
      </Text>

      <DocSection title="Supported Device Types">
        <UnorderedList spacing={3}>
          <ListItem>
            <Text fontWeight="semibold">Playback Devices</Text>
            <Text>
              Cards and virtual sinks exposed through ALSA can be targeted for output from any stream in your graph.
            </Text>
          </ListItem>
          <ListItem>
            <Text fontWeight="semibold">Capture Devices</Text>
            <Text>
              Microphones, line inputs, loopback devices, and other ALSA capture sources can feed ScreamRouter sources.
            </Text>
          </ListItem>
        </UnorderedList>
      </DocSection>

      <DocSection title="Finding Devices">
        <Text mb={4}>
          The ScreamRouter <strong>System Devices</strong> page lists every ALSA device detected on the host. Friendly card names,
          hardware IDs, and stream direction help you match what you see in the terminal or desktop environment.
        </Text>
        <Alert status="info">
          <AlertIcon />
          Newly attached audio devices appear automatically, so you don't need to restart the service after plugging in hardware.
        </Alert>
      </DocSection>
    </Box>
  );
}

export default AlsaCompatibilityDoc;
