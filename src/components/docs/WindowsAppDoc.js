import React from 'react';
import {
  Box,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Code,
  Alert,
  AlertIcon,
  Image,
  Divider,
  OrderedList,
  useColorModeValue
} from '@chakra-ui/react';
import DocSection from './DocSection';

function WindowsAppDoc() {
  const codeBlockBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>
        ScreamRouter Windows Desktop App
      </Heading>
      
      <Text fontSize="lg" mb={6}>
        ScreamRouter Windows Desktop is a native application that provides a convenient way to access and control
        your ScreamRouter system directly from your Windows desktop. It integrates with the system tray and provides
        global media key support for an enhanced user experience.
      </Text>
      
      <Alert status="info" mb={6}>
        <AlertIcon />
        The Windows Desktop App is the recommended way to use ScreamRouter on Windows systems, providing better integration
        with the operating system than the web interface alone.
      </Alert>
      
      <Image 
        src="/images/screamrouter/windows-desktop-screenshot.png" 
        alt="ScreamRouter Windows Desktop Screenshot" 
        borderRadius="md"
        mb={8}
        maxH="400px"
        fallback={<Box height="300px" bg="gray.100" borderRadius="md" display="flex" alignItems="center" justifyContent="center">ScreamRouter Windows Desktop Screenshot</Box>}
      />
      
      <DocSection title="Features">
        <UnorderedList spacing={3} mb={4}>
          <ListItem>
            <Text fontWeight="semibold">Streamlined Web Interface</Text>
            <Text>Opens the ScreamRouter UI in an embedded browser window with a native look and feel</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="semibold">System Tray Integration</Text>
            <Text>Always accessible through a notification area icon with context menu</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="semibold">Global Media Key Support</Text>
            <Text>Control your audio playback using your keyboard's media keys from anywhere</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="semibold">Start Menu Integration</Text>
            <Text>Pin to Start Menu for quick access</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="semibold">Modern UI</Text>
            <Text>Transparent background with blur effect for a sleek appearance</Text>
          </ListItem>
          
          <ListItem>
            <Text fontWeight="semibold">Auto-start Option</Text>
            <Text>Configure to start automatically when Windows boots</Text>
          </ListItem>
        </UnorderedList>
      </DocSection>
      
      <DocSection title="System Requirements">
        <UnorderedList spacing={2} mb={4}>
          <ListItem><strong>Operating System:</strong> Windows 10 or later</ListItem>
          <ListItem><strong>Runtime:</strong> .NET 8.0 or later</ListItem>
          <ListItem><strong>Browser Component:</strong> Microsoft Edge WebView2 Runtime</ListItem>
          <ListItem><strong>Disk Space:</strong> Approximately 50MB</ListItem>
          <ListItem><strong>Network:</strong> Internet connection for accessing your ScreamRouter server</ListItem>
        </UnorderedList>
        
        <Alert status="warning" mb={4}>
          <AlertIcon />
          The Microsoft Edge WebView2 Runtime is required and will be automatically installed if not already present on your system.
        </Alert>
      </DocSection>
      
      <DocSection title="Installation">
        <OrderedList spacing={3} mb={4}>
          <ListItem>
            <Text>Download the latest installer from the <strong>Downloads</strong> page</Text>
          </ListItem>
          
          <ListItem>
            <Text>Run the installer executable (ScreamRouterDesktopSetup.exe)</Text>
          </ListItem>
          
          <ListItem>
            <Text>Follow the on-screen instructions to complete the installation</Text>
          </ListItem>
          
          <ListItem>
            <Text>After installation completes, the app will start automatically</Text>
          </ListItem>
        </OrderedList>
        
        <Alert status="info" mb={4}>
          <AlertIcon />
          You may need administrator privileges to install the application, depending on your Windows settings.
        </Alert>
      </DocSection>
      
      <DocSection title="Usage">
        <Text mb={4}>
          Once installed, the ScreamRouter Windows Desktop app runs in the system tray:
        </Text>
        
        <UnorderedList spacing={3} mb={4}>
          <ListItem>
            <Text><strong>Left-click</strong> the tray icon to open the main ScreamRouter interface</Text>
          </ListItem>
          
          <ListItem>
            <Text><strong>Right-click</strong> the tray icon to access a context menu with options:</Text>
            <UnorderedList ml={5} spacing={2}>
              <ListItem>Open ScreamRouter</ListItem>
              <ListItem>Settings</ListItem>
              <ListItem>Auto-start with Windows</ListItem>
              <ListItem>About</ListItem>
              <ListItem>Exit</ListItem>
            </UnorderedList>
          </ListItem>
          
          <ListItem>
            <Text>Use your keyboard's <strong>media keys</strong> to control playback of the currently selected source</Text>
          </ListItem>
        </UnorderedList>
      </DocSection>
      
      <DocSection title="Configuration">
        <Text mb={4}>
          Configure the app through the Settings option in the tray menu:
        </Text>
        
        <UnorderedList spacing={3} mb={4}>
          <ListItem>
            <Text><strong>ScreamRouter URL:</strong> Set the URL of your ScreamRouter server</Text>
            <Text as="span" color="gray.600" fontSize="sm">Example: https://screamrouter.example.com or http://192.168.1.100:8080</Text>
          </ListItem>
          
          <ListItem>
            <Text><strong>Desktop Menu URL:</strong> Customize the URL for the desktop menu (advanced users)</Text>
            <Text as="span" color="gray.600" fontSize="sm">Example: https://screamrouter.netham45.org/site/desktopmenu</Text>
          </ListItem>
          
          <ListItem>
            <Text><strong>Auto-start:</strong> Toggle whether the app starts automatically with Windows</Text>
          </ListItem>
          
          <ListItem>
            <Text><strong>Minimize to tray:</strong> Toggle whether the app minimizes to the system tray when closed</Text>
          </ListItem>
          
          <ListItem>
            <Text><strong>Interface transparency:</strong> Adjust the transparency level of the app window</Text>
          </ListItem>
        </UnorderedList>
        
        <Alert status="info" mb={4}>
          <AlertIcon />
          All settings are saved automatically and will be remembered between application restarts.
        </Alert>
      </DocSection>
      
      <DocSection title="Troubleshooting">
        <Heading as="h3" size="md" mb={2}>
          App Doesn't Start
        </Heading>
        
        <UnorderedList spacing={2} mb={4}>
          <ListItem>Verify that the .NET 8.0 Runtime is installed</ListItem>
          <ListItem>Check that the WebView2 Runtime is installed</ListItem>
          <ListItem>Try running the app as administrator</ListItem>
          <ListItem>Check the Windows Event Viewer for application errors</ListItem>
        </UnorderedList>
        
        <Heading as="h3" size="md" mb={2} mt={4}>
          Can't Connect to ScreamRouter
        </Heading>
        
        <UnorderedList spacing={2} mb={4}>
          <ListItem>Verify that the ScreamRouter URL is correct in the settings</ListItem>
          <ListItem>Ensure that the ScreamRouter server is running and accessible</ListItem>
          <ListItem>Check your network connection and firewall settings</ListItem>
          <ListItem>Try accessing the ScreamRouter URL directly in a web browser</ListItem>
        </UnorderedList>
        
        <Heading as="h3" size="md" mb={2} mt={4}>
          Media Keys Not Working
        </Heading>
        
        <UnorderedList spacing={2} mb={4}>
          <ListItem>Ensure that a source with VNC is selected in the ScreamRouter interface</ListItem>
          <ListItem>Check that the Command Receiver is properly set up on your audio source</ListItem>
          <ListItem>Verify that no other application is capturing the media key events</ListItem>
        </UnorderedList>
      </DocSection>
      
      <DocSection title="Building From Source">
        <Text mb={4}>
          For developers who want to build the application from source:
        </Text>
        
        <OrderedList spacing={2} mb={4}>
          <ListItem>Clone the repository from GitHub</ListItem>
          <ListItem>Open the solution in Visual Studio 2022 or later</ListItem>
          <ListItem>Restore NuGet packages</ListItem>
          <ListItem>Build the solution</ListItem>
          <ListItem>Run the application</ListItem>
        </OrderedList>
        
        <Box 
          as="pre" 
          p={4} 
          bg={codeBlockBg} 
          borderRadius="md" 
          mb={4}
          overflowX="auto"
        >
          <Code display="block" whiteSpace="pre">
{`git clone https://github.com/yourusername/screamrouter-windows-desktop.git
cd screamrouter-windows-desktop
dotnet restore
dotnet build
dotnet run --project ScreamRouterDesktop`}
          </Code>
        </Box>
      </DocSection>
    </Box>
  );
}

export default WindowsAppDoc;