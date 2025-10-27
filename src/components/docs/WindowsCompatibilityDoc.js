import React from 'react';
import {
  Box,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Alert,
  AlertIcon,
  useColorModeValue
} from '@chakra-ui/react';
import DocSection from './DocSection';

function WindowsCompatibilityDoc() {
  const infoBg = useColorModeValue('blue.50', 'blue.900');

  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>
        Windows Audio Compatibility
      </Heading>

      <Text fontSize="lg" mb={6}>
        ScreamRouter integrates with Windows audio through the WASAPI subsystem, allowing you to stream both
        playback and capture devices directly into your routing graph. The Windows implementation mirrors what you
        already see in the native sound control panel, so the devices available to ScreamRouter stay familiar. Loopback
        capture of any playback device is supported, making it easy to monitor or record system output alongside
        microphone inputs.
      </Text>

      <DocSection title="Supported Device Types">
        <UnorderedList spacing={3}>
          <ListItem>
            <Text fontWeight="semibold">Playback (Render) Devices</Text>
            <Text>
              Any WASAPI output device that appears in the Windows sound settings is available for streaming or monitoring.
            </Text>
          </ListItem>
          <ListItem>
            <Text fontWeight="semibold">Capture (Record) Devices</Text>
            <Text>
              Microphones, line-in ports, virtual loopbacks, and other WASAPI capture sources can be captured and mixed.
            </Text>
          </ListItem>
        </UnorderedList>
      </DocSection>

      <DocSection title="Discovering Devices in the UI">
        <Text mb={4}>
          Open the <strong>System Devices</strong> page inside ScreamRouter to browse every WASAPI endpoint the application
          can use. The list includes friendly names, device IDs, and stream direction so you can quickly add the right device
          to a source or sink.
        </Text>

        <Alert status="info" bg={infoBg}>
          <AlertIcon />
          Device availability is live: updates in Windows (plug/unplug, disable) automatically flow into the System Devices list.
        </Alert>
      </DocSection>

      <DocSection title="Best Practices">
        <UnorderedList spacing={2}>
          <ListItem>
            Keep device sample rates aligned with your ScreamRouter streams to avoid unnecessary resampling.
          </ListItem>
          <ListItem>
            Rename devices in Windows if you manage many inputs—ScreamRouter shows the same friendly names.
          </ListItem>
        </UnorderedList>
      </DocSection>
    </Box>
  );
}

export default WindowsCompatibilityDoc;
