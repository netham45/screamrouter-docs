import React from 'react';
import {
  Box,
  Heading,
  Text,
  OrderedList,
  ListItem,
  UnorderedList,
  Code,
  CodeBlock,
  Divider,
  Alert,
  AlertIcon,
  useColorModeValue
} from '@chakra-ui/react';
import DocSection from './DocSection';

function LinuxReceiverInstall() {
  const codeBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>Setting up Scream Unix Receiver on Linux/Raspberry Pi</Heading>
      
      <Text mb={4}>
        This guide explains how to set up a Scream Unix receiver on a Raspberry Pi or other Linux systems. 
        This receiver can be used as an audio output destination for ScreamRouter, allowing you to play 
        audio from ScreamRouter on your Linux device.
      </Text>

      <DocSection title="Prerequisites">
        <UnorderedList spacing={2}>
          <ListItem>Raspberry Pi running a Debian-based Linux distribution (e.g., Raspberry Pi OS)</ListItem>
          <ListItem>Internet connection</ListItem>
          <ListItem>Basic knowledge of terminal commands</ListItem>
        </UnorderedList>
      </DocSection>

      <DocSection title="Installation">
        <OrderedList spacing={4}>
          <ListItem>
            <Text mb={2}>Update your package list and install the required dependencies:</Text>
            <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
              sudo apt-get update<br />
              sudo apt-get install libpulse-dev git g++
            </Box>
          </ListItem>
          
          <ListItem>
            <Text mb={2}>Clone the Scream repository:</Text>
            <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
              git clone https://github.com/duncanthrax/scream.git
            </Box>
          </ListItem>
          
          <ListItem>
            <Text mb={2}>Navigate to the Unix receiver directory:</Text>
            <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
              cd scream/Receivers/unix/
            </Box>
          </ListItem>
          
          <ListItem>
            <Text mb={2}>Configure the build:</Text>
            <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
              cmake .
            </Box>
          </ListItem>
          
          <ListItem>
            <Text mb={2}>Build the receiver:</Text>
            <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
              make
            </Box>
          </ListItem>
          
          <ListItem>
            <Text mb={2}>Copy the built executable to a system-wide location:</Text>
            <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
              sudo cp scream /usr/bin/scream
            </Box>
          </ListItem>
        </OrderedList>
      </DocSection>

      <DocSection title="Setting up Scream as a Systemd User Service">
        <OrderedList spacing={4}>
          <ListItem>
            <Text mb={2}>Create a systemd user service file:</Text>
            <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
              mkdir -p ~/.config/systemd/user/<br />
              nano ~/.config/systemd/user/scream.service
            </Box>
          </ListItem>
          
          <ListItem>
            <Text mb={2}>Add the following content to the file:</Text>
            <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
              [Unit]<br />
              Description=scream<br />
              After=pulseaudio.service<br />
              <br />
              [Service]<br />
              ExecStart=/usr/bin/scream -v -u -o pulse -t 60 -l 100<br />
              <br />
              [Install]<br />
              WantedBy=default.target
            </Box>
            <Text fontSize="sm" fontStyle="italic">Note: Adjust the ExecStart line if you need different options for your setup.</Text>
          </ListItem>
          
          <ListItem>
            <Text mb={2}>Save and exit the editor (in nano, press Ctrl+X, then Y, then Enter).</Text>
          </ListItem>
          
          <ListItem>
            <Text mb={2}>Reload the systemd user daemon:</Text>
            <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
              systemctl --user daemon-reload
            </Box>
          </ListItem>
          
          <ListItem>
            <Text mb={2}>Enable and start the Scream service:</Text>
            <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
              systemctl --user enable scream.service<br />
              systemctl --user start scream.service
            </Box>
          </ListItem>
        </OrderedList>
      </DocSection>

      <DocSection title="Enabling Linger for Your User">
        <Text mb={4}>
          To ensure that the user service starts on boot, even if the user is not logged in, enable linger for your user:
        </Text>
        <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
          sudo loginctl enable-linger $USER
        </Box>
      </DocSection>

      <DocSection title="Audio Output Configuration">
        <Text mb={4}>
          By default, the Scream receiver uses PulseAudio for audio output. You can change the audio output method by modifying 
          the <Code>-o</Code> option in the ExecStart line of the scream.service file. Available options include:
        </Text>
        <UnorderedList mb={4}>
          <ListItem><Code>pulse</Code>: PulseAudio (default)</ListItem>
          <ListItem><Code>alsa</Code>: ALSA</ListItem>
          <ListItem><Code>jack</Code>: JACK Audio Connection Kit</ListItem>
        </UnorderedList>
        <Text mb={4}>
          For example, to use ALSA instead of PulseAudio, change the ExecStart line to:
        </Text>
        <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
          ExecStart=/usr/bin/scream -v -u -o alsa -t 60 -l 100
        </Box>
        <Text mb={4}>
          Remember to reload the systemd user daemon and restart the service after making changes.
        </Text>
      </DocSection>

      <DocSection title="Network Configuration">
        <Text mb={4}>
          Ensure that your network allows UDP traffic on port 4010 (default for Scream) between ScreamRouter and your 
          Raspberry Pi. You may need to configure your router or firewall to allow this traffic.
        </Text>
      </DocSection>

      <DocSection title="Integration with ScreamRouter">
        <Text mb={4}>
          To use this Scream receiver with ScreamRouter:
        </Text>
        <OrderedList spacing={2}>
          <ListItem>In ScreamRouter, add a new sink with the IP address of your Raspberry Pi.</ListItem>
          <ListItem>Set the port to 4010 (default for Scream).</ListItem>
          <ListItem>Configure the audio format settings (bit depth, sample rate, channels) to match your receiver's capabilities.</ListItem>
        </OrderedList>
        <Text mt={4}>
          ScreamRouter will then be able to route audio to your Raspberry Pi using this Scream receiver.
        </Text>
      </DocSection>

      <DocSection title="Troubleshooting">
        <UnorderedList spacing={3}>
          <ListItem>
            <Text fontWeight="medium">Check the service status:</Text>
            <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={2} overflowX="auto">
              systemctl --user status scream.service
            </Box>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="medium">View logs:</Text>
            <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={2} overflowX="auto">
              journalctl --user -u scream.service
            </Box>
          </ListItem>
          
          <ListItem>Ensure that your Raspberry Pi's audio output is properly configured.</ListItem>
          <ListItem>Verify that your network settings allow the Scream traffic to reach your Raspberry Pi.</ListItem>
        </UnorderedList>
      </DocSection>

    </Box>
  );
}

export default LinuxReceiverInstall;