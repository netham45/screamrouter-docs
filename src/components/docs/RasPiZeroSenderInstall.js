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
      <Heading as="h1" size="xl" mb={6}>Setting up ScreamSender on Raspberry Pi Zero</Heading>
      
      <Text mb={4}>
        This guide provides instructions for setting up ScreamSender on a Raspberry Pi Zero to forward USB audio to ScreamRouter. 
        This setup allows you to use a Raspberry Pi Zero as a USB audio device that can send audio to ScreamRouter over the network.
      </Text>

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

          IP_ADDRESS=192.168.3.114<br />
          PORT=16401<br />
          SAMPLE_RATE=48000<br />
          BIT_DEPTH=16<br />
          CHANNELS=2 # screamsender only supports two currently<br /><br />

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
          nohup bash -c "while x=x; do arecord -D hw:CARD=UAC1Gadget,DEV=0 -f dat 2{'>'}/var/log/arecord | screamsender -i $IP_ADDRESS -p $PORT -s $SAMPLE_RATE -b $BIT_DEPTH &{'>'} /var/log/arecord;done" &
        </Box>

        <Text mb={4}>
          Make the script executable:
        </Text>
        <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
          sudo chmod +x /usr/bin/usb_gadget_audio.sh
        </Box>
        
        <Alert status="warning" mb={4}>
          <AlertIcon />
          <Text>
            <strong>Note:</strong> Make sure to replace the <Code>IP_ADDRESS</Code> and <Code>PORT</Code> variables 
            in the script with the appropriate values for your ScreamRouter setup.
          </Text>
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
          sudo apt-get install -y g++ git
        </Box>
      </DocSection>

      <DocSection title="5. Download and Build ScreamSender">
        <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
          git clone https://github.com/netham45/screamsender.git<br />
          cd screamsender<br />
          ./build.sh<br />
          sudo cp screamsender /usr/bin/screamsender
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
          To use this ScreamSender with ScreamRouter:
        </Text>
        <OrderedList spacing={2}>
          <ListItem>In ScreamRouter, add a new source with the IP address of your Raspberry Pi Zero.</ListItem>
          <ListItem>Set the port to match the PORT value in the <Code>usb_gadget_audio.sh</Code> script (default is 16401).</ListItem>
          <ListItem>Configure the audio format settings (bit depth, sample rate, channels) to match the values in the script.</ListItem>
        </OrderedList>
        
        <Text mt={4}>
          ScreamRouter will then be able to receive audio from your Raspberry Pi Zero USB audio device.
        </Text>
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
          <Text>
            This setup is ideal for adding wireless audio capabilities to gaming consoles like PlayStation 4/5 and Nintendo Switch, 
            as well as other devices that only support wired audio output such as older game consoles, TVs, or computers without network connectivity.
          </Text>
        </Alert>
      </DocSection>
    </Box>
  );
}

export default RasPiZeroSenderInstall;