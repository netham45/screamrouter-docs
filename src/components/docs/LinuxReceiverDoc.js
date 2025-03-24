import React from 'react';
import {
  Box,
  Heading,
  Text,
  OrderedList,
  ListItem,
  UnorderedList,
  Code,
  Divider,
  Alert,
  AlertIcon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Link,
  useColorModeValue
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import DocSection from './DocSection';

function LinuxReceiverDoc() {
  const codeBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>Linux and Raspberry Pi with ScreamRouter</Heading>
      
      <Text fontSize="lg" mb={6}>
        Linux and Raspberry Pi systems make excellent platforms for ScreamRouter, both as the main server
        and as audio receivers/endpoints. This guide covers both installing ScreamRouter on Linux systems
        and setting up Linux/Raspberry Pi devices as audio receivers in your network.
      </Text>
      
      <Alert status="info" mb={6}>
        <AlertIcon />
        <Text>
          While this guide covers direct installation, using Docker for ScreamRouter on Linux is
          often simpler and recommended for most users. See the <Link as={RouterLink} to="/docs/docker" color="brand.500">Docker documentation</Link> for details.
        </Text>
      </Alert>

      <Tabs variant="enclosed" colorScheme="blue" mt={4} mb={6}>
        <TabList>
          <Tab>Linux Receiver Setup</Tab>
          <Tab>ScreamRouter Installation</Tab>
        </TabList>
        <TabPanels>
          <TabPanel p={0} pt={4}>
            <DocSection title="Scream Receiver for Linux/Raspberry Pi">
              <Text mb={4}>
                Setting up a Linux system or Raspberry Pi as a Scream receiver allows it to play audio sent from
                ScreamRouter. This turns any Linux device with speakers into a networked audio endpoint.
              </Text>
            </DocSection>

            <DocSection title="Prerequisites">
              <UnorderedList spacing={2}>
                <ListItem>Raspberry Pi (any model) or Linux computer</ListItem>
                <ListItem>Debian-based Linux distribution (e.g., Raspberry Pi OS, Ubuntu, Debian)</ListItem>
                <ListItem>Internet connection</ListItem>
                <ListItem>Audio output capability (built-in audio, USB audio interface, or HAT)</ListItem>
                <ListItem>Basic knowledge of terminal commands</ListItem>
              </UnorderedList>
            </DocSection>

            <DocSection title="Installation">
              <OrderedList spacing={4}>
                <ListItem>
                  <Text mb={2}>Update your package list and install the required dependencies:</Text>
                  <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
                    sudo apt-get update<br />
                    sudo apt-get install libpulse-dev git g++ cmake
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
                  <Text mb={2}>Configure and build the receiver:</Text>
                  <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
                    cmake .<br />
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

            <DocSection title="Setting up as a Systemd Service">
              <Text mb={4}>
                To run the Scream receiver as a background service that starts automatically:
              </Text>
              
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
{`[Unit]
Description=Scream Audio Receiver
After=pulseaudio.service

[Service]
ExecStart=/usr/bin/scream -v -u -o pulse -t 60 -l 100

[Install]
WantedBy=default.target`}
                  </Box>
                  <Text fontSize="sm" fontStyle="italic">Note: Adjust the ExecStart line if you need different options for your setup.</Text>
                </ListItem>
                
                <ListItem>
                  <Text mb={2}>Enable and start the service:</Text>
                  <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
                    systemctl --user daemon-reload<br />
                    systemctl --user enable scream.service<br />
                    systemctl --user start scream.service
                  </Box>
                </ListItem>
                
                <ListItem>
                  <Text mb={2}>Enable linger for your user (to ensure it starts on boot):</Text>
                  <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
                    sudo loginctl enable-linger $USER
                  </Box>
                </ListItem>
              </OrderedList>
            </DocSection>

            <DocSection title="Audio Output Options">
              <Text mb={4}>
                The Scream receiver supports several audio output backends:
              </Text>
              
              <UnorderedList mb={4} spacing={2}>
                <ListItem>
                  <Code>pulse</Code> (Default) - PulseAudio, works well for desktop Linux systems
                </ListItem>
                <ListItem>
                  <Code>alsa</Code> - ALSA direct output, better for minimal systems like Raspberry Pi
                </ListItem>
                <ListItem>
                  <Code>jack</Code> - JACK Audio Connection Kit, for professional audio setups
                </ListItem>
              </UnorderedList>
              
              <Text mb={4}>
                You can change the audio backend by modifying the <Code>-o</Code> parameter in your service file.
                For example, to use ALSA:
              </Text>
              
              <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
                ExecStart=/usr/bin/scream -v -u -o alsa -t 60 -l 100
              </Box>
            </DocSection>

            <DocSection title="Integration with ScreamRouter">
              <Text mb={4}>
                To use your Linux/Raspberry Pi as a receiver with ScreamRouter:
              </Text>
              
              <OrderedList spacing={3}>
                <ListItem>Open the ScreamRouter web interface</ListItem>
                <ListItem>Navigate to the "Sinks" section</ListItem>
                <ListItem>Click "Add Sink"</ListItem>
                <ListItem>
                  Configure the sink:
                  <UnorderedList ml={5} mt={2}>
                    <ListItem><strong>Name:</strong> A descriptive name (e.g., "Living Room Pi")</ListItem>
                    <ListItem><strong>IP Address:</strong> The IP address of your Linux device</ListItem>
                    <ListItem><strong>Port:</strong> 4010 (default Scream port)</ListItem>
                    <ListItem><strong>Format:</strong> Match the settings of your receiver</ListItem>
                  </UnorderedList>
                </ListItem>
                <ListItem>Save the sink configuration</ListItem>
                <ListItem>Create a route from your desired audio source to this new sink</ListItem>
              </OrderedList>
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
                
                <ListItem>
                  <Text fontWeight="medium">Network issues:</Text>
                  <UnorderedList>
                    <ListItem>Ensure UDP port 4010 is open on your Linux device</ListItem>
                    <ListItem>Verify network connectivity between ScreamRouter and your receiver</ListItem>
                  </UnorderedList>
                </ListItem>
                
                <ListItem>
                  <Text fontWeight="medium">Audio issues:</Text>
                  <UnorderedList>
                    <ListItem>Try different audio backends (pulse, alsa, jack)</ListItem>
                    <ListItem>Check the audio output device is working with a test sound</ListItem>
                    <ListItem>Verify volume levels are up in the system mixer</ListItem>
                  </UnorderedList>
                </ListItem>
              </UnorderedList>
            </DocSection>
          </TabPanel>

          <TabPanel p={0} pt={4}>
            <DocSection title="Installing ScreamRouter on Linux">
              <Text mb={4}>
                This section covers installing ScreamRouter directly on a Debian-based Linux system.
                This method is for advanced users who need direct access to the system; for most users,
                the Docker installation method is simpler and recommended.
              </Text>
              
              <Alert status="warning" mb={4}>
                <AlertIcon />
                <Text>
                  The direct installation method requires more technical knowledge and maintenance than
                  the Docker method. Only use this if you have specific requirements that Docker can't meet.
                </Text>
              </Alert>
            </DocSection>

            <DocSection title="System Requirements">
              <UnorderedList spacing={2}>
                <ListItem>Debian-based Linux distribution (Ubuntu, Debian, Raspberry Pi OS, etc.)</ListItem>
                <ListItem>Root or sudo access to your system</ListItem>
                <ListItem>At least 1GB RAM (2GB+ recommended)</ListItem>
                <ListItem>At least 1GB free disk space</ListItem>
                <ListItem>Network connection</ListItem>
              </UnorderedList>
            </DocSection>

            <DocSection title="Installation Steps">
              <OrderedList spacing={4}>
                <ListItem>
                  <Text mb={2}>Update the package sources and install required dependencies:</Text>
                  <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
{`sudo apt-get update -y
sudo apt-get install -y libmp3lame0 libmp3lame-dev gcc git g++ python3 python3-pip libtool pkg-config cmake`}
                  </Box>
                </ListItem>
                
                <ListItem>
                  <Text mb={2}>Clone the ScreamRouter repository:</Text>
                  <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
{`cd ~
git clone --recurse-submodules -j8 https://github.com/netham45/screamrouter.git`}
                  </Box>
                </ListItem>
                
                <ListItem>
                  <Text mb={2}>Install Python requirements:</Text>
                  <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
                    pip3 install -r ~/screamrouter/requirements.txt
                  </Box>
                </ListItem>
                
                <ListItem>
                  <Text mb={2}>Build C utilities:</Text>
                  <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
{`cd ~/screamrouter/c_utils
./build.sh`}
                  </Box>
                </ListItem>
                
                <ListItem>
                  <Text mb={2}>Generate a certificate for HTTPS (or provide your own in the cert/ folder):</Text>
                  <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
{`mkdir -p ~/screamrouter/cert
openssl req -new -newkey rsa:4096 -days 365 -nodes -x509 \\
  -subj "/C=US/ST=State/L=City/O=Organization/CN=example.com" \\
  -keyout ~/screamrouter/cert/privkey.pem -out ~/screamrouter/cert/cert.pem`}
                  </Box>
                </ListItem>
              </OrderedList>
            </DocSection>
            
            <DocSection title="Running ScreamRouter">
              <Heading as="h3" size="md" mb={3}>
                Manual Execution
              </Heading>
              <Text mb={3}>
                To run ScreamRouter manually (for testing or development):
              </Text>
              <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
{`cd ~/screamrouter
./screamrouter.py`}
              </Box>

              <Heading as="h3" size="md" mb={3} mt={6}>
                Setting Up as a Systemd Service
              </Heading>
              <Text mb={3}>
                For a production setup, it's better to run ScreamRouter as a systemd service:
              </Text>
              <OrderedList spacing={3}>
                <ListItem>
                  <Text mb={2}>Create a systemd service file:</Text>
                  <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
                    sudo nano /etc/systemd/system/screamrouter.service
                  </Box>
                </ListItem>
                
                <ListItem>
                  <Text mb={2}>Add the following content:</Text>
                  <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
{`[Unit]
Description=ScreamRouter Audio System
After=network.target

[Service]
Type=simple
User=<your-username>
WorkingDirectory=/home/<your-username>/screamrouter
ExecStart=/usr/bin/python3 /home/<your-username>/screamrouter/screamrouter.py
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target`}
                  </Box>
                  <Text fontSize="sm" fontStyle="italic">Note: Replace {'<your-username>'} with your actual username.</Text>
                </ListItem>
                
                <ListItem>
                  <Text mb={2}>Enable and start the service:</Text>
                  <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
{`sudo systemctl daemon-reload
sudo systemctl enable screamrouter.service
sudo systemctl start screamrouter.service`}
                  </Box>
                </ListItem>
              </OrderedList>
            </DocSection>

            <DocSection title="Accessing ScreamRouter">
              <Text mb={4}>
                After installation, you can access the ScreamRouter web interface by opening a web browser 
                and navigating to:
              </Text>
              <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
                https://localhost
              </Box>
              <Text mb={4}>
                Or, if accessing from another device on your network, use your server's IP address.
                You will need to accept the self-signed certificate warning in your browser.
              </Text>
            </DocSection>

            <DocSection title="Troubleshooting">
              <UnorderedList spacing={3}>
                <ListItem>
                  <Text fontWeight="medium">Check the service status:</Text>
                  <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={2} overflowX="auto">
                    sudo systemctl status screamrouter.service
                  </Box>
                </ListItem>
                
                <ListItem>
                  <Text fontWeight="medium">View logs:</Text>
                  <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={2} overflowX="auto">
                    sudo journalctl -u screamrouter.service
                  </Box>
                </ListItem>
                
                <ListItem>
                  <Text fontWeight="medium">Check application logs:</Text>
                  <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={2} overflowX="auto">
                    cat ~/screamrouter/logs/screamrouter.log
                  </Box>
                </ListItem>
                
                <ListItem>
                  <Text fontWeight="medium">If dependencies are missing:</Text>
                  <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={2} overflowX="auto">
                    pip3 install -r ~/screamrouter/requirements.txt
                  </Box>
                </ListItem>
              </UnorderedList>
            </DocSection>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default LinuxReceiverDoc;