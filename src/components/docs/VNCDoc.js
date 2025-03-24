import React from 'react';
import {
  Box,
  Text,
  Heading,
  List,
  ListItem,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Code,
  Alert,
  AlertIcon,
  Image,
  Grid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Link,
  Button
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaChevronRight, FaNetworkWired, FaDesktop, FaWindows, FaLinux, FaGithub } from 'react-icons/fa';
import DocSection from './DocSection';

function VNCDoc() {
  return (
    <Box>
      <Breadcrumb spacing="8px" separator={<FaChevronRight color="gray.500" />} mb={8}>
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to="/docs">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>VNC Integration</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      
      <Heading as="h1" size="xl" mb={6}>
        VNC Integration
      </Heading>
      
      <Text fontSize="lg" mb={8}>
        ScreamRouter incorporates VNC (Virtual Network Computing) functionality to allow remote viewing and 
        control of source devices. This feature enables users to manage their audio sources directly from 
        the ScreamRouter interface.
      </Text>
      
      <DocSection title="Overview" icon={FaDesktop}>
        <Text mb={4}>
          VNC integration allows you to view and control the interface of your audio source devices directly
          within the ScreamRouter web interface. This is particularly useful for sources like Docker containers
          running streaming services, allowing you to browse and select content without switching applications.
        </Text>
        
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6} mb={6}>
          <Box>
            <Heading as="h3" size="md" mb={3}>Key Features</Heading>
            <List spacing={2} styleType="disc" ml={5}>
              <ListItem>View source device screens directly in the ScreamRouter interface</ListItem>
              <ListItem>Control source devices with mouse and keyboard</ListItem>
              <ListItem>Access media controls like play, pause, next, and previous</ListItem>
              <ListItem>Browse content libraries without leaving ScreamRouter</ListItem>
              <ListItem>Integrated with ScreamRouter's media key support</ListItem>
            </List>
          </Box>
          <Box>
            <Alert status="info" borderRadius="md" p={4}>
              <AlertIcon />
              <Box>
                <Text fontWeight="bold">How It Works</Text>
                <Text>
                  VNC connections are initiated when the interface is loaded in the UI for a configured source.
                  A WebSocket proxy is started on-demand to bridge the VNC connection from the ScreamRouter server.
                  The VNC viewer runs in the browser using noVNC.
                </Text>
              </Box>
            </Alert>
          </Box>
        </Grid>
      </DocSection>
      
      <DocSection title="Configuration" icon={FaNetworkWired} mt={10}>
        <Text mb={4}>
          To enable VNC for a source, you need to add VNC details to the source configuration:
        </Text>
        
        <Heading as="h3" size="md" mb={3}>Source Configuration</Heading>
        <Code p={4} borderRadius="md" display="block" whiteSpace="pre" mb={6}>
{`# Example of source with VNC control
sources:
  - name: "Spotify Docker"
    ip: "172.17.0.2"
    enabled: true
    vnc_ip: "172.17.0.2"  # IP address of the VNC server
    vnc_port: 5900        # Port of the VNC server`}
        </Code>
        
        <Text mb={4}>
          For Docker-based sources, the VNC IP is typically the container's IP address. You can find this using
          the <Code>docker inspect</Code> command:
        </Text>
        
        <Code p={3} borderRadius="md" display="block" whiteSpace="pre" mb={4}>
{`docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container_name`}
        </Code>
        
        <Heading as="h3" size="md" mb={3}>Web Interface Configuration</Heading>
        <Text mb={3}>
          Once VNC is configured for a source, the 'VNC' button will appear in the source's control panel
          in the ScreamRouter web interface. No additional configuration is needed in the web interface.
        </Text>
      </DocSection>
      
      <DocSection title="Using VNC in ScreamRouter" icon={FaDesktop} mt={10}>
        <Text mb={4}>
          Once VNC is configured for a source, you can use it from the ScreamRouter interface:
        </Text>
        
        <List as="ol" styleType="decimal" spacing={2} ml={5} mb={6}>
          <ListItem>Navigate to the ScreamRouter web interface</ListItem>
          <ListItem>Locate the source with VNC configured in the Sources panel</ListItem>
          <ListItem>Click the 'VNC' button that appears on the source's control panel</ListItem>
          <ListItem>A new window or tab will open with the noVNC viewer</ListItem>
          <ListItem>Use your mouse and keyboard to control the remote device</ListItem>
        </List>
        
        <Heading as="h3" size="md" mb={3}>Media Control</Heading>
        <Text mb={3}>
          When VNC is enabled for a source, media control buttons appear under the source card:
        </Text>
        
        <List spacing={2} styleType="disc" ml={5} mb={4}>
          <ListItem><Text as="span" fontWeight="medium">Play/Pause:</Text> Start or stop playback</ListItem>
          <ListItem><Text as="span" fontWeight="medium">Next Track:</Text> Skip to the next item in the playlist</ListItem>

        <Box my={4} display="flex" justifyContent="center">
          <Image 
            src="/images/ScreamRouter/vnc.png" 
            alt="VNC Integration in ScreamRouter" 
            borderRadius="md" 
            shadow="md" 
            maxWidth="100%" 
          />
        </Box>
          <ListItem><Text as="span" fontWeight="medium">Previous Track:</Text> Go back to the previous item in the playlist</ListItem>
        </List>
        
        <Text mb={3}>
          These controls send commands to the source via UDP on port 9999, which can be captured by a command
          receiver script running on the source device.
        </Text>
        
        <Heading as="h3" size="md" mb={3}>Keyboard Shortcuts</Heading>
        <Text mb={3}>
          When the VNC viewer is in focus, you can use keyboard shortcuts for common actions:
        </Text>
        
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4} mb={4}>
          <Box p={3} borderWidth="1px" borderRadius="md">
            <Text fontWeight="bold" mb={2}>Playback Control</Text>
            <List spacing={1} fontSize="sm">
              <ListItem><Code>Space</Code>: Play/Pause</ListItem>
              <ListItem><Code>Right Arrow</Code>: Next track</ListItem>
              <ListItem><Code>Left Arrow</Code>: Previous track</ListItem>
            </List>
          </Box>
          <Box p={3} borderWidth="1px" borderRadius="md">
            <Text fontWeight="bold" mb={2}>VNC Viewer Controls</Text>
            <List spacing={1} fontSize="sm">
              <ListItem><Code>Ctrl+Alt+Del</Code>: Send Ctrl+Alt+Del</ListItem>
              <ListItem><Code>Alt+F4</Code>: Send Alt+F4</ListItem>
              <ListItem><Code>F11</Code>: Toggle fullscreen</ListItem>
            </List>
          </Box>
        </Grid>
      </DocSection>
      
      <DocSection title="Technical Details" icon={FaNetworkWired} mt={10}>
        <Text mb={4}>
          Understanding how the VNC integration works can help with troubleshooting and advanced usage:
        </Text>
        
        <Heading as="h3" size="md" mb={3}>Connection Flow</Heading>
        <List as="ol" styleType="decimal" spacing={2} ml={5} mb={6}>
          <ListItem>When you click the VNC button for a source, ScreamRouter starts a WebSocket proxy</ListItem>
          <ListItem>The proxy connects to the VNC server specified in the source configuration</ListItem>
          <ListItem>Your browser loads the noVNC client, which connects to the WebSocket proxy</ListItem>
          <ListItem>The noVNC client renders the VNC server's display in your browser</ListItem>
          <ListItem>Mouse and keyboard input is captured by noVNC and sent to the VNC server</ListItem>
        </List>
        
        <Heading as="h3" size="md" mb={3}>Media Control Implementation</Heading>
        <Text mb={3}>
          Media controls work by sending UDP packets to the source device:
        </Text>
        
        <Code p={4} borderRadius="md" display="block" whiteSpace="pre" mb={6}>
{`Commands:
- Next Track: 'n'
- Previous Track: 'p'
- Play/Pause: 'P'

These commands are transmitted as UDP packets to port 9999 on the configured VNC server.`}
        </Code>
        
        <Text mb={3}>
          For this to work, the source device needs to be running a command receiver script that listens for
          these UDP packets and translates them into appropriate media key commands.
        </Text>
      </DocSection>
      
      <DocSection title="Command Receiver Scripts" icon={FaNetworkWired} mt={10}>
        <Text mb={4}>
          ScreamRouter uses UDP commands to control media playback on different platforms. To enable this functionality,
          you need to install the appropriate command receiver script on your source devices.
        </Text>
        
        <Tabs variant="enclosed" colorScheme="brand" mb={6}>
          <TabList>
            <Tab><FaWindows mr={2} /> Windows</Tab>
            <Tab><FaLinux mr={2} /> Linux</Tab>
          </TabList>
          
          <TabPanels>
            <TabPanel>
              <Box mb={4}>
                <Heading as="h3" size="md" mb={3}>Win-Scream Hotkey Receiver</Heading>
                <Text mb={3}>
                  The Windows Hotkey Receiver (hotkeyreceiver.ps1) is a PowerShell script that listens for UDP commands 
                  and triggers media control hotkeys on Windows computers.
                </Text>
                
                <Link href="https://github.com/netham45/win-scream-hotkey-receiver" isExternal>
                  <Button leftIcon={<FaGithub />} size="sm" colorScheme="blue" mb={3}>
                    GitHub Repository
                  </Button>
                </Link>
                
                <Box p={4} borderWidth="1px" borderRadius="md" mb={4}>
                  <Heading as="h4" size="sm" mb={2}>Features</Heading>
                  <List spacing={2} styleType="disc" ml={5}>
                    <ListItem>Listens on UDP port 9999 for incoming commands</ListItem>
                    <ListItem>Interprets received commands and triggers corresponding media control hotkeys</ListItem>
                    <ListItem>Runs in the background without interfering with the user's desktop</ListItem>
                    <ListItem>Automatically starts when the user logs in (when installed as a task)</ListItem>
                  </List>
                </Box>
                
                <Heading as="h4" size="sm" mb={2}>Command Support</Heading>
                <List spacing={1} ml={5} mb={4}>
                  <ListItem><Code>n</Code>: Next Track</ListItem>
                  <ListItem><Code>p</Code>: Previous Track</ListItem>
                  <ListItem><Code>P</Code>: Play/Pause</ListItem>
                </List>
                
                <Heading as="h4" size="sm" mb={2}>Installation</Heading>
                <Text mb={2}>To install the Win-Scream Hotkey Receiver:</Text>
                <List as="ol" styleType="decimal" spacing={1} ml={5} mb={4}>
                  <ListItem>Ensure both <Code>hotkeyreceiver.ps1</Code> and <Code>install_task.bat</Code> are in the same directory</ListItem>
                  <ListItem>Run <Code>install_task.bat</Code></ListItem>
                  <ListItem>Follow any prompts that appear</ListItem>
                </List>
                <Text mb={3}>
                  After installation, the hotkey receiver will start automatically each time you log in to your Windows account.
                </Text>
                
                <Heading as="h4" size="sm" mb={2}>Uninstallation</Heading>
                <Text mb={2}>To uninstall, simply run <Code>uninstall_task.bat</Code>.</Text>
              </Box>
            </TabPanel>
            
            <TabPanel>
              <Box mb={4}>
                <Heading as="h3" size="md" mb={3}>Linux Media Key Controller</Heading>
                <Text mb={3}>
                  For Linux systems, a bash script can be used to listen for UDP commands and trigger media keys using xdotool.
                </Text>
                
                <Heading as="h4" size="sm" mb={2}>Prerequisites</Heading>
                <Text mb={2}>Make sure you have the following packages installed:</Text>
                <Code p={2} borderRadius="md" display="block" whiteSpace="pre" mb={4}>
{`sudo apt install netcat-openbsd xdotool`}
                </Code>
                
                <Heading as="h4" size="sm" mb={2}>Script</Heading>
                <Text mb={2}>
                  Create a file named <Code>media_key_controller.sh</Code> with the following content:
                </Text>
                <Code p={4} borderRadius="md" display="block" whiteSpace="pre" mb={4}>
{`#!/bin/bash

netcat_command="nc -l -u -p 9999"
while x=x
do
  command=$(head -c 1 <($netcat_command))
  pkill -f "$netcat_command"
  echo Got command $command
  if [[ $command == "n" ]]
  then
    echo "Next song"
    xdotool key XF86AudioNext
  elif [[ $command == "p" ]]
  then
    echo "Previous song"
    xdotool key XF86AudioPrev 
  elif [[ $command == "P" ]]
  then
    echo "Play/Pause"
    xdotool key XF86AudioPlay  
  else
    echo "Unknown Command"
  fi
done`}
                </Code>
                
                <Heading as="h4" size="sm" mb={2}>Installation</Heading>
                <Text mb={2}>Make the script executable and set it to run at startup:</Text>
                <Code p={4} borderRadius="md" display="block" whiteSpace="pre" mb={4}>
{`chmod +x media_key_controller.sh

# Add to startup (for desktop environments)
mkdir -p ~/.config/autostart
cat > ~/.config/autostart/media-key-controller.desktop << EOF
[Desktop Entry]
Type=Application
Name=Media Key Controller
Exec=/path/to/your/media_key_controller.sh
Hidden=false
NoDisplay=false
X-GNOME-Autostart-enabled=true
EOF`}
                </Code>
                
                <Heading as="h4" size="sm" mb={2}>Manual Testing</Heading>
                <Text mb={2}>You can test your setup by sending UDP packets manually:</Text>
                <Code p={4} borderRadius="md" display="block" whiteSpace="pre" mb={4}>
{`# In one terminal, run the script
./media_key_controller.sh

# In another terminal, send commands
echo -n "P" | nc -u localhost 9999  # Play/Pause
echo -n "n" | nc -u localhost 9999  # Next track
echo -n "p" | nc -u localhost 9999  # Previous track`}
                </Code>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </DocSection>
      
      <DocSection title="Troubleshooting" icon={FaNetworkWired} mt={10}>
        <Text mb={4}>
          If you encounter issues with the VNC feature:
        </Text>
        
        <List spacing={3} styleType="decimal" ml={5}>
          <ListItem>
            <Text fontWeight="bold">Connection Issues</Text>
            <Text>Ensure the VNC server is running on the source device and accessible from the ScreamRouter server.</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="bold">Configuration Problems</Text>
            <Text>Check that the <Code>vnc_ip</Code> and <Code>vnc_port</Code> are correctly configured in the source settings.</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="bold">Browser Compatibility</Text>
            <Text>Verify that your browser supports WebSockets and is up to date. noVNC works best in Chrome, Firefox, and Edge.</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="bold">Performance Issues</Text>
            <Text>If the VNC connection is slow or laggy, try reducing the resolution or color depth on the VNC server.</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="bold">Media Control Issues</Text>
            <Text>Ensure the command receiver script is running on the source device and listening on port 9999. For Windows, check that the Win-Scream Hotkey Receiver is installed and running; for Linux, verify that the media key controller script is running and xdotool is installed.</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="bold">UDP Connectivity</Text>
            <Text>Make sure UDP port 9999 is not blocked by firewalls between the ScreamRouter server and the source device.</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="bold">Check Logs</Text>
            <Text>Check the ScreamRouter logs for any VNC-related error messages. Look for WebSocket proxy errors or connection failures.</Text>
          </ListItem>
        </List>
      </DocSection>
    </Box>
  );
}

export default VNCDoc;