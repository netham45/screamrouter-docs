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

function RasPiZeroSenderInstall() {
  const codeBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>Setting up RTP Sender on Raspberry Pi Zero</Heading>
      
      <Text mb={4}>
        This guide provides instructions for setting up an RTP sender on a Raspberry Pi Zero to forward USB audio to ScreamRouter.
        This setup allows you to use a Raspberry Pi Zero as a USB audio device that can send audio to ScreamRouter over the network using standard RTP protocol.
      </Text>

      <Alert status="success" mb={4}>
        <AlertIcon />
        <Box>
          <Text fontWeight="bold">Important: S16BE Format Support</Text>
          <Text>
            ScreamRouter now properly handles S16BE (big-endian) format, which is the standard for RTP audio.
            The system automatically detects and converts between big-endian and little-endian as needed.
          </Text>
        </Box>
      </Alert>

      <DocSection title="Prerequisites">
        <UnorderedList spacing={2}>
          <ListItem>Raspberry Pi Zero 2 W or Raspberry Pi Zero W</ListItem>
          <ListItem>Raspberry Pi OS Lite (32-bit) installed and configured</ListItem>
          <ListItem>Access to the Raspberry Pi via SSH or terminal</ListItem>
        </UnorderedList>
      </DocSection>

      <DocSection title="1. Configure USB Gadget">
        <Text mb={4}>
          Add the following line to <Code>/boot/config.txt</Code>:
        </Text>
        <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
          dtoverlay=dwc2
        </Box>

        <Text mb={4}>
          Add the following lines to <Code>/etc/modules</Code>:
        </Text>
        <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
          dwc2<br />
          libcomposite
        </Box>
      </DocSection>

      <DocSection title="2. Create USB Gadget Script">
        <Text mb={4}>
          Create a new file <Code>/usr/bin/usb_gadget_audio.sh</Code> with the following content:
        </Text>
        <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto" maxHeight="500px" overflow="auto">
          #!/bin/bash<br /><br />

          # ScreamRouter server configuration<br />
          IP_ADDRESS=192.168.3.114  # Your ScreamRouter IP<br />
          PORT=4011                  # RTP port (or use multicast like 239.1.1.1)<br />
          SAMPLE_RATE=48000<br />
          BIT_DEPTH=16<br />
          CHANNELS=2<br />
          FORMAT=S16_BE              # Use big-endian for RTP compliance<br /><br />

          cd /sys/kernel/config/usb_gadget/<br />
          mkdir -p audio_gadget<br />
          cd audio_gadget<br /><br />

          echo 0x1d6b {'>'} idVendor # Linux Foundation<br />
          echo 0x0104 {'>'} idProduct # Multifunction Composite Gadget<br />
          echo 0x0100 {'>'} bcdDevice # v1.0.0<br />
          echo 0x0200 {'>'} bcdUSB # USB2<br /><br />

          mkdir -p strings/0x409<br />
          echo "fedcba9876543210" {'>'} strings/0x409/serialnumber<br />
          echo "Scream Sender" {'>'} strings/0x409/manufacturer<br />
          echo "Scream Sender" {'>'} strings/0x409/product<br /><br />

          mkdir -p configs/c.1/strings/0x409<br />
          echo "Audio Config" {'>'} configs/c.1/strings/0x409/configuration<br />
          echo 250 {'>'} configs/c.1/MaxPower<br /><br />

          # Audio function<br />
          mkdir -p functions/uac1.usb0<br />
          ln -s functions/uac1.usb0 configs/c.1/<br /><br />

          # Set audio function parameters<br />
          echo $SAMPLE_RATE {'>'} functions/uac1.usb0/p_sampling_freq<br />
          echo $SAMPLE_RATE {'>'} functions/uac1.usb0/c_sampling_freq<br />
          echo $CHANNELS {'>'} functions/uac1.usb0/p_chmask<br />
          echo $CHANNELS {'>'} functions/uac1.usb0/c_chmask<br />
          echo $BIT_DEPTH {'>'} functions/uac1.usb0/p_ssize<br />
          echo $BIT_DEPTH {'>'} functions/uac1.usb0/c_ssize<br /><br />

          # Enable gadget<br />
          ls /sys/class/udc {'>'} UDC<br /><br />

          sleep 2<br />
          # Use ffmpeg for proper RTP with S16BE format<br />
          nohup bash -c "while true; do arecord -D hw:CARD=UAC1Gadget,DEV=0 -f S16_BE -r $SAMPLE_RATE -c $CHANNELS 2{'>'}/var/log/arecord | ffmpeg -f s16be -ar $SAMPLE_RATE -ac $CHANNELS -i - -acodec copy -f rtp rtp://$IP_ADDRESS:$PORT 2{'>'}/var/log/ffmpeg.log; done" &
        </Box>

        <Text mb={4}>
          Make the script executable:
        </Text>
        <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
          sudo chmod +x /usr/bin/usb_gadget_audio.sh
        </Box>
        
        <Alert status="info" mb={4}>
          <AlertIcon />
          <Box>
            <Text fontWeight="bold">Configuration Notes:</Text>
            <UnorderedList mt={2} ml={4}>
              <ListItem>Replace <Code>IP_ADDRESS</Code> with your ScreamRouter server IP</ListItem>
              <ListItem>Use port 4011 for standard RTP, or configure as needed</ListItem>
              <ListItem>For multicast, use an IP like <Code>239.1.1.1</Code></ListItem>
              <ListItem>The script now uses S16BE format for proper RTP compliance</ListItem>
            </UnorderedList>
          </Box>
        </Alert>
      </DocSection>

      <DocSection title="3. Configure Auto-start">
        <Text mb={4}>
          Add the following line to <Code>/etc/rc.local</Code> before the <Code>exit 0</Code> line:
        </Text>
        <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
          /usr/bin/usb_gadget_audio.sh
        </Box>
      </DocSection>

      <DocSection title="4. Install Dependencies">
        <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
          sudo apt-get update<br />
          sudo apt-get install -y g++ git ffmpeg alsa-utils
        </Box>
      </DocSection>

      <DocSection title="5. Alternative: Using Standard RTP Tools">
        <Text mb={4}>
          Instead of ScreamSender, you can use standard RTP streaming tools for better compatibility:
        </Text>
        
        <Heading as="h4" size="sm" mb={2}>Option A: Using FFmpeg (Recommended)</Heading>
        <Text mb={2}>FFmpeg is already installed in step 4 and provides standard RTP streaming:</Text>
        <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
          # The script above already uses ffmpeg for RTP streaming<br />
          # No additional setup needed
        </Box>

        <Heading as="h4" size="sm" mb={2} mt={4}>Option B: Using GStreamer</Heading>
        <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
          sudo apt-get install -y gstreamer1.0-tools gstreamer1.0-plugins-good<br /><br />
          # Then modify the script to use:<br />
          gst-launch-1.0 alsasrc device=hw:CARD=UAC1Gadget,DEV=0 ! \<br />
            audioconvert ! audioresample ! \<br />
            audio/x-raw,format=S16BE,rate=48000,channels=2 ! \<br />
            rtpL16pay ! udpsink host=$IP_ADDRESS port=$PORT
        </Box>
      </DocSection>

      <DocSection title="6. Reboot">
        <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
          sudo reboot
        </Box>
        <Text mb={4}>
          After rebooting, the Raspberry Pi should be configured as a USB audio device and start forwarding 
          audio using ScreamSender.
        </Text>
      </DocSection>

      <DocSection title="Integration with ScreamRouter">
        <Text mb={4}>
          To use this RTP sender with ScreamRouter:
        </Text>
        <OrderedList spacing={2}>
          <ListItem>In ScreamRouter, add a new RTP source (not Scream source)</ListItem>
          <ListItem>Configure the source with:
            <UnorderedList mt={2} ml={6}>
              <ListItem>IP: Your Raspberry Pi Zero's IP or multicast address</ListItem>
              <ListItem>Port: Match the PORT in the script (e.g., 4011)</ListItem>
              <ListItem>Format: S16BE (16-bit big-endian)</ListItem>
              <ListItem>Sample Rate: 48000 Hz</ListItem>
              <ListItem>Channels: 2 (stereo)</ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>Enable SAP discovery for automatic detection (optional)</ListItem>
        </OrderedList>
        
        <Alert status="success" mt={4}>
          <AlertIcon />
          <Text>
            ScreamRouter will automatically handle the S16BE format and convert it as needed for your audio outputs!
          </Text>
        </Alert>
      </DocSection>

      <DocSection title="Troubleshooting">
        <UnorderedList spacing={3}>
          <ListItem>
            If the USB audio device is not recognized, check the USB gadget configuration in 
            <Code>/boot/config.txt</Code> and <Code>/etc/modules</Code>.
          </ListItem>
          <ListItem>
            If audio is not being sent to ScreamRouter, verify the IP address and port in 
            the <Code>usb_gadget_audio.sh</Code> script.
          </ListItem>
          <ListItem>
            Ensure that your network allows UDP traffic on the specified port between the Raspberry Pi Zero 
            and ScreamRouter.
          </ListItem>
          <ListItem>
            Check the logs at <Code>/var/log/arecord</Code> for any error messages or issues with the audio capture.
          </ListItem>
        </UnorderedList>
      </DocSection>

      <DocSection title="Usage">
        <Text mb={4}>
          Once properly set up and connected to a host via USB:
        </Text>
        <UnorderedList spacing={3}>
          <ListItem>
            The Raspberry Pi Zero will appear as a USB audio device on PlayStation 4/5, Nintendo Switch, computers, and other compatible devices.
          </ListItem>
          <ListItem>
            Any audio played through this device will be captured and forwarded to ScreamRouter.
          </ListItem>
          <ListItem>
            You can then route this audio to any of your configured output devices through ScreamRouter.
          </ListItem>
        </UnorderedList>
        
        <Alert status="info" mt={4}>
          <AlertIcon />
          <Box>
            <Text fontWeight="bold">Perfect for Gaming Consoles!</Text>
            <Text mt={2}>
              This setup is ideal for adding wireless audio capabilities to:
            </Text>
            <UnorderedList mt={2} ml={4}>
              <ListItem>PlayStation 4/5</ListItem>
              <ListItem>Nintendo Switch</ListItem>
              <ListItem>Xbox consoles</ListItem>
              <ListItem>Older game consoles</ListItem>
              <ListItem>TVs without network audio</ListItem>
              <ListItem>Computers without network connectivity</ListItem>
            </UnorderedList>
            <Text mt={2}>
              The RTP protocol ensures compatibility with ScreamRouter's enhanced audio routing capabilities.
            </Text>
          </Box>
        </Alert>
      </DocSection>
    </Box>
  );
}

export default RasPiZeroSenderInstall;