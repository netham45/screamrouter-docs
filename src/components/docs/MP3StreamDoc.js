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
  AlertIcon,
  Link,
  Button,
  Flex,
  Icon
} from '@chakra-ui/react';
import { FaHeadphones, FaMusic, FaRss, FaCode, FaArrowRight } from 'react-icons/fa';
import DocSection from './DocSection';
import { Link as RouterLink } from 'react-router-dom';

function MP3StreamDoc() {
  const codeBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>MP3 Stream URLs in ScreamRouter</Heading>
      
      <Text mb={4}>
        ScreamRouter provides HTTP-based MP3 streaming functionality, allowing you to listen to your 
        audio sources from any MP3-compatible client or device. These MP3 streams are direct copies of the 
        Scream audio streams that are generated per real sink (not sink groups). This guide explains how the MP3 stream 
        URLs work and how to use them in various scenarios.
      </Text>

      <DocSection title="Understanding MP3 Stream URLs" icon={FaRss}>
        <Text mb={4}>
          ScreamRouter offers a simple yet powerful HTTP endpoint for streaming audio in MP3 format. 
          This allows you to:
        </Text>
        
        <UnorderedList spacing={2} mb={4}>
          <ListItem>Listen to ScreamRouter audio from any web browser</ListItem>
          <ListItem>Connect media players like VLC, Winamp, or mobile apps to your audio streams</ListItem>
          <ListItem>Integrate with home automation systems that support MP3 streams</ListItem>
        </UnorderedList>
        
        <Text fontWeight="bold" mb={2}>URL Structure</Text>
        <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
          http://&lt;screamrouter-server-address&gt;/stream/&lt;sink_ip&gt;/
        </Box>
        
        <Text mb={4}>
          Where:
        </Text>
        <UnorderedList spacing={2} mb={4}>
          <ListItem><Code>&lt;screamrouter-server-address&gt;</Code>: The hostname or IP address of your ScreamRouter server</ListItem>
          <ListItem><Code>&lt;sink_ip&gt;</Code>: The IP address of the real sink (destination) you want to stream</ListItem>
        </UnorderedList>

        <Alert status="info" mb={4}>
          <AlertIcon />
          <Text>
            Important: MP3 streams are only available for real physical sinks with specific IP addresses, not for sink groups. 
            Each MP3 stream is a direct copy of the Scream audio stream that is being sent to that particular sink.
          </Text>
        </Alert>
      </DocSection>

      <DocSection title="Using MP3 Streams" icon={FaHeadphones}>
        <Text mb={4}>
          Here are several ways to use ScreamRouter's MP3 streams:
        </Text>
        
        <Text fontWeight="bold" mb={2}>1. Web Browsers</Text>
        <Text mb={4}>
          Most modern web browsers can play MP3 streams directly. Simply enter the URL in your browser's address bar or use an HTML audio element:
        </Text>
        <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
          &lt;audio controls&gt;
            &lt;source src="http://screamrouter.local/stream/192.168.1.100/" type="audio/mpeg"&gt;
            Your browser does not support the audio element.
          &lt;/audio&gt;
        </Box>
        
        <Text fontWeight="bold" mb={2}>2. Media Players</Text>
        <Text mb={4}>
          Popular media players that support MP3 streams include:
        </Text>
        <UnorderedList spacing={2} mb={4}>
          <ListItem><strong>VLC Media Player</strong>: Media → Open Network Stream → Enter the MP3 stream URL</ListItem>
          <ListItem><strong>Winamp</strong>: File → Open URL → Enter the MP3 stream URL</ListItem>
          <ListItem><strong>MPV</strong>: Run <Code>mpv http://screamrouter.local/stream/192.168.1.100/</Code></ListItem>
          <ListItem><strong>Mobile Apps</strong>: Many mobile audio apps support streaming URLs directly</ListItem>
        </UnorderedList>
      </DocSection>

      <DocSection title="Technical Details" icon={FaMusic}>
        <Text mb={4}>
          The MP3 stream provided by ScreamRouter has the following characteristics:
        </Text>
        
        <UnorderedList spacing={2} mb={4}>
          <ListItem><strong>Format</strong>: MP3 (MPEG Layer III)</ListItem>
          <ListItem><strong>Bitrate</strong>: 384 kbps (constant bit rate)</ListItem>
          <ListItem><strong>Channels</strong>: Stereo (2 channels, always mixed to stereo)</ListItem>
        </UnorderedList>
      </DocSection>

      <DocSection title="Troubleshooting">
        <Text mb={4}>
          Common issues with MP3 streams and their solutions:
        </Text>
        
        <UnorderedList spacing={3}>
          <ListItem>
            <Text fontWeight="bold">Stream not playing</Text>
            <Text mb={2}>Check that the sink IP address is correct and that ScreamRouter is properly routing audio to that sink.</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="bold">Connection refused</Text>
            <Text mb={2}>Ensure ScreamRouter is running and that your network/firewall allows connections to the server.</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="bold">Audio stuttering or buffering</Text>
            <Text mb={2}>This may indicate network bandwidth issues or server CPU limitations. Try a wired connection instead of WiFi, or reduce the load on your ScreamRouter server.</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="bold">No audio</Text>
            <Text mb={2}>Verify that audio is properly routed in ScreamRouter and that the specified sink is receiving audio. The MP3 stream only works if there's an active Scream stream being sent to the real sink with the IP address you specified. Check volume levels in both ScreamRouter and your playback device.</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="bold">Invalid sink IP address</Text>
            <Text mb={2}>Ensure you're using the IP address of a real sink, not a sink group. The MP3 streaming functionality only works with real sinks that have specific IP addresses.</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="bold">Stream stops after a while</Text>
            <Text mb={2}>Some clients may time out if they don't receive data. Ensure there's continuous audio being sent to the sink.</Text>
          </ListItem>
        </UnorderedList>
      </DocSection>
    </Box>
  );
}

export default MP3StreamDoc;