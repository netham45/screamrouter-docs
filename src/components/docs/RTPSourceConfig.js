import React from 'react';
import {
  Box,
  Heading,
  Text,
  OrderedList,
  ListItem,
  UnorderedList,
  Code,
  useColorModeValue,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import DocSection from './DocSection';

function RTPSourceConfig() {
  const codeBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>RTP Audio Streaming with ScreamRouter</Heading>
      
      <Text mb={4}>
        This guide explains how to set up and use RTP (Real-time Transport Protocol) audio streaming 
        as a source for ScreamRouter. RTP allows you to send audio over a network, which ScreamRouter 
        can then receive and process.
      </Text>

      <Alert status="warning" mb={4}>
        <AlertIcon />
        <Text>
          The MTU (Maximum Transmission Unit) value MUST be set to exactly 1152 for ScreamRouter.
        </Text>
      </Alert>

      <DocSection title="How it Works">
        <OrderedList spacing={2}>
          <ListItem>ScreamRouter acts as an RTP receiver, listening for incoming audio data.</ListItem>
          <ListItem>PulseAudio or Pipewire is configured to send audio to ScreamRouter over RTP.</ListItem>
          <ListItem>ScreamRouter processes the received audio and routes it to the appropriate output.</ListItem>
          <ListItem>ScreamRouter listens for incoming RTP packets with the correct format on port 40000 by default.</ListItem>
        </OrderedList>
      </DocSection>

      <DocSection title="Configuring PulseAudio">
        <Text mb={4}>
          To send audio from PulseAudio to ScreamRouter via RTP:
        </Text>
        
        <OrderedList spacing={4}>
          <ListItem>
            <Text mb={2}>Load the RTP sender module in PulseAudio:</Text>
            <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
              pactl load-module module-rtp-send format=s16le source=&lt;source_name&gt; destination=&lt;ScreamRouter_IP&gt; port=&lt;ScreamRouter_Port&gt; mtu=1152
            </Box>
          </ListItem>
        </OrderedList>
        
        <Text mb={4}>
          Replace <Code>&lt;source_name&gt;</Code> with your audio source, <Code>&lt;ScreamRouter_IP&gt;</Code> with 
          the IP address of your ScreamRouter instance, and <Code>&lt;ScreamRouter_Port&gt;</Code> with the port number 
          (default is 40000).
        </Text>
      </DocSection>

      <DocSection title="Configuring Pipewire">
        <Text mb={4}>
          To set up RTP streaming with Pipewire:
        </Text>
        
        <OrderedList spacing={4}>
          <ListItem>
            <Text mb={2}>Create a directory for your custom Pipewire configuration:</Text>
            <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
              mkdir -p ~/.config/pipewire/pipewire.conf.d/
            </Box>
          </ListItem>
          
          <ListItem>
            <Text mb={2}>Create a new configuration file for the RTP module:</Text>
            <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
              nano ~/.config/pipewire/pipewire.conf.d/99-rtp-sender.conf
            </Box>
          </ListItem>
          
          <ListItem>
            <Text mb={2}>Add the following content to the file:</Text>
            <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
              context.modules = [<br />
              &nbsp;&nbsp;&#123;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;name = libpipewire-module-rtp-sink<br />
              &nbsp;&nbsp;&nbsp;&nbsp;args = &#123;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sink.props = &#123;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;node.name = "rtp-sink"<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;node.description = "RTP Sink"<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;media.class = "Audio/Sink"<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;audio.position = [ FL FR ]<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;destination.ip = "&lt;ScreamRouter_IP&gt;"<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;destination.port = &lt;ScreamRouter_Port&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;session.name = "PipeWire RTP Stream"<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;encoding.name = "L16"<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;audio.rate = 48000<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;audio.channels = 2<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;payload.type = 10<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ttl = 32<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mtu = 1152<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
              &nbsp;&nbsp;&#125;<br />
              ]
            </Box>
            <Text mb={4}>
              Replace <Code>&lt;ScreamRouter_IP&gt;</Code> with the IP address of your ScreamRouter instance 
              and <Code>&lt;ScreamRouter_Port&gt;</Code> with the port number (default is 40000).
            </Text>
          </ListItem>
          
          <ListItem>
            <Text mb={2}>Restart PipeWire to apply the changes:</Text>
            <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
              systemctl --user restart pipewire pipewire-pulse
            </Box>
          </ListItem>
          
          <ListItem>
            <Text mb={2}>The RTP sink should now appear in your audio outputs. You can play audio to this sink to send it to ScreamRouter.</Text>
          </ListItem>
        </OrderedList>

        <Alert status="info" mt={4}>
          <AlertIcon />
          With this configuration, a new audio output device called "RTP Sink" will appear in your system's sound settings. 
          Any audio played through this output will be sent to ScreamRouter via RTP.
        </Alert>
        
        <DocSection title="Checking the RTP Sink Status" mt={4}>
          <Text mb={3}>
            To verify that the RTP sink is properly created:
          </Text>
          <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
            pw-cli list-objects | grep "rtp-sink"
          </Box>
          
          <Text mb={3}>
            To check detailed properties:
          </Text>
          <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
            pw-dump | grep -A 20 "rtp-sink"
          </Box>
        </DocSection>
      </DocSection>

      <DocSection title="Integration with ScreamRouter">
        <Text mb={4}>
          To use the RTP stream in ScreamRouter:
        </Text>
        <OrderedList spacing={2}>
          <ListItem>
            In your ScreamRouter configuration, add a new source with the following details:
            <UnorderedList ml={8} mt={2}>
              <ListItem>Type: RTP</ListItem>
              <ListItem>IP: The IP address of the machine sending the RTP stream</ListItem>
              <ListItem>Port: The port used for RTP streaming (default is 40000)</ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>Create a route in ScreamRouter to connect this RTP source to your desired sink.</ListItem>
        </OrderedList>
      </DocSection>

      <DocSection title="Troubleshooting">
        <UnorderedList spacing={3}>
          <ListItem>
            If ScreamRouter is not receiving audio, check that the IP addresses and port numbers match in both the 
            sender (PulseAudio/Pipewire) and receiver (ScreamRouter) configurations.
          </ListItem>
          <ListItem>
            Ensure that your firewall allows UDP traffic on the specified port.
          </ListItem>
          <ListItem>
            For PulseAudio, you can use <Code>pactl list short modules</Code> to verify that the RTP module is loaded.
          </ListItem>
          <ListItem>
            For Pipewire, use <Code>pw-cli list-objects</Code> to ensure the RTP sink is created.
          </ListItem>
          <ListItem>
            If the audio is choppy or has dropouts, try adjusting the buffer settings in ScreamRouter or changing audio format settings.
          </ListItem>
          <ListItem>
            Verify the MTU value: Ensure you're using the EXACT MTU value of 1152 in your configuration. Any other value will cause corrupted audio.
          </ListItem>
        </UnorderedList>

        <Alert status="info" mt={4}>
          <AlertIcon />
          If you're experiencing issues with audio quality or latency, try adjusting the buffer settings in ScreamRouter's 
          configuration or the TTL value in your Pipewire RTP configuration.
        </Alert>
      </DocSection>
    </Box>
  );
}

export default RTPSourceConfig;