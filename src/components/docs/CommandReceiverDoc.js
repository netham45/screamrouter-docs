import React from 'react';
import {
  Box,
  Heading,
  Text,
  Code,
  Alert,
  AlertIcon,
  UnorderedList,
  ListItem,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  useColorModeValue
} from '@chakra-ui/react';
import DocSection from './DocSection';

function CommandReceiverDoc() {
  const codeBlockBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>
        ScreamRouter Media Controls
      </Heading>
      
      <Text fontSize="lg" mb={6}>
        ScreamRouter provides remote media control functionality, allowing you to control your audio sources
        from anywhere in your network. This enhances the usability of your audio system by providing a seamless
        listening experience across multiple rooms and devices.
      </Text>

      <DocSection title="Overview">
        <Text mb={4}>
          The Command Receiver functionality enables ScreamRouter to send commands to audio sources via UDP packets.
          This allows you to control media playback on your audio sources directly from the ScreamRouter interface
          or through integration with other systems.
        </Text>
        
        <Alert status="info" mb={4}>
          <AlertIcon />
          Media control buttons are visible in the ScreamRouter user interface when a VNC host is configured for a source,
          providing convenient access to playback controls.
        </Alert>
      </DocSection>

      <DocSection title="Supported Commands">
        <Text mb={4}>
          ScreamRouter supports the following media control commands:
        </Text>

        <Table variant="simple" mb={4}>
          <Thead>
            <Tr>
              <Th>Function</Th>
              <Th>Command Character</Th>
              <Th>Description</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Next Track</Td>
              <Td><Code>n</Code></Td>
              <Td>Skip to the next track in the playlist</Td>
            </Tr>
            <Tr>
              <Td>Previous Track</Td>
              <Td><Code>p</Code></Td>
              <Td>Go back to the previous track</Td>
            </Tr>
            <Tr>
              <Td>Play/Pause</Td>
              <Td><Code>P</Code></Td>
              <Td>Toggle between play and pause states</Td>
            </Tr>
          </Tbody>
        </Table>

        <Text mb={4}>
          These commands are transmitted as UDP packets to the configured audio sources.
        </Text>
      </DocSection>

      <DocSection title="Technical Details">
        <Text mb={4}>
          The command receiver system operates using the following technical specifications:
        </Text>

        <UnorderedList spacing={2} mb={4}>
          <ListItem><strong>Port:</strong> Commands are sent to port 9999 on the configured VNC server</ListItem>
          <ListItem><strong>Protocol:</strong> UDP (User Datagram Protocol)</ListItem>
          <ListItem><strong>Packet Content:</strong> Single character representing the command</ListItem>
        </UnorderedList>

        <Text mb={4}>
          If a source with VNC is selected in the UI, the system's global media controls will control that source's 
          media playback. This feature is also integrated with Chrome App shortcuts when ScreamRouter is installed 
          as a Progressive Web App (PWA).
        </Text>
      </DocSection>

      <DocSection title="Implementation Scripts">
        <Text mb={4}>
          You can implement a command receiver on your audio source devices using the following scripts:
        </Text>

        <Heading as="h3" size="md" mb={3}>Bash Script (for Linux systems)</Heading>
        <Box 
          as="pre" 
          p={4} 
          bg={codeBlockBg} 
          borderRadius="md" 
          mb={6}
          overflowX="auto"
        >
          <Code display="block" whiteSpace="pre">
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
        </Box>

        <Heading as="h3" size="md" mb={3}>PowerShell Script (for Windows systems)</Heading>
        <Text mb={3}>
          For a complete solution with an installer to run on login, see the{' '}
          <Link href="https://github.com/netham45/win-scream-hotkey-receiver" color="brand.500" isExternal>
            win-scream-hotkey-receiver repository
          </Link>.
        </Text>
        
        <Box 
          as="pre" 
          p={4} 
          bg={codeBlockBg} 
          borderRadius="md" 
          mb={4}
          overflowX="auto"
        >
          <Code display="block" whiteSpace="pre">
{`$ShowWindowAsync = Add-Type -MemberDefinition '[DllImport("user32.dll")] public static extern bool ShowWindowAsync(IntPtr hWnd, int nCmdShow);' -name Win32ShowWindowAsync -namespace Win32Functions -PassThru
$KeybdEvent = Add-Type -MemberDefinition '[DllImport("user32.dll")] public static extern void keybd_event(byte bVk, byte bScan, uint dwFlags, int dwExtraInfo);' -name Win32KeybdEvent -namespace Win32Functions -PassThru

function SendKey($keyCode) {
    $KeybdEvent::keybd_event($keyCode, 0, 0x01, 0)  # KEYEVENTF_EXTENDEDKEY
    $KeybdEvent::keybd_event($keyCode, 0, 0x03, 0)  # KEYEVENTF_EXTENDEDKEY | KEYEVENTF_KEYUP
}

$ShowWindowAsync::ShowWindowAsync((Get-Process -PID $pid).MainWindowHandle, 0) # Hide the window
$socket = New-Object System.Net.Sockets.UdpClient # Create a new UDP Client
$socket.ExclusiveAddressUse = $false # Allow multiple sockets to bind to the port
$socket.Client.Bind((New-Object System.Net.IPEndPoint([System.Net.IPAddress]::Any, 9999))) # Bind to port 9999

while ($receivedData = [System.Text.Encoding]::ASCII.GetString($socket.Receive([ref]$null))) {
    if     ($receivedData -ceq 'n') {SendKey 0xB0} # VK_MEDIA_NEXT_TRACK
    elseif ($receivedData -ceq 'p') {SendKey 0xB1} # VK_MEDIA_PREV_TRACK
    elseif ($receivedData -ceq 'P') {SendKey 0xB3} # VK_MEDIA_PLAY_PAUSE
}`}
          </Code>
        </Box>
      </DocSection>

      <DocSection title="Setup Instructions">
        <Text mb={4}>
          To set up the command receiver functionality:
        </Text>

        <UnorderedList spacing={2} mb={4}>
          <ListItem>Choose the appropriate script for your operating system (Bash for Linux, PowerShell for Windows)</ListItem>
          <ListItem>Save the script to a file on your audio source device</ListItem>
          <ListItem>Make the script executable (for Linux: <Code>chmod +x script.sh</Code>)</ListItem>
          <ListItem>Configure the script to run at system startup</ListItem>
          <ListItem>In ScreamRouter, ensure the VNC host is properly configured for your audio source</ListItem>
        </UnorderedList>

        <Alert status="warning" mb={4}>
          <AlertIcon />
          Make sure port 9999 (UDP) is open in your firewall to allow commands to be received by your audio source devices.
        </Alert>
      </DocSection>

      <DocSection title="Troubleshooting">
        <Text mb={4}>
          If you encounter issues with the command receiver functionality:
        </Text>

        <UnorderedList spacing={2} mb={4}>
          <ListItem>Verify that the script is running on your audio source device</ListItem>
          <ListItem>Check firewall settings to ensure UDP traffic on port 9999 is allowed</ListItem>
          <ListItem>Confirm that the VNC host is correctly configured in ScreamRouter</ListItem>
          <ListItem>Test the commands manually using a UDP sender tool to verify the receiver is working</ListItem>
          <ListItem>For Windows, ensure you have administrator privileges when installing the script</ListItem>
        </UnorderedList>
      </DocSection>
    </Box>
  );
}

export default CommandReceiverDoc;