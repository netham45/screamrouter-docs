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
  useColorModeValue,
  Link
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import DocSection from './DocSection';

function WindowsAppDoc() {
  const codeBlockBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>
        ScreamRouter Windows Desktop
      </Heading>
      
      <Text fontSize="lg" mb={6}>
        ScreamRouter on Windows provides a menu in the notification area that allows for quick and easy control of all of your ScreamRouter instances
      </Text>
      
      <Text fontSize="lg" mb={4}>
        The Windows desktop experience now ships inside the main ScreamRouter installation, so a standard Windows setup automatically includes the
        native tray UI, per-application routing, ScreamSender, and ScreamReceiver.
      </Text>
      
      <Alert status="success" mb={8}>
        <AlertIcon />
        Install ScreamRouter via <Code>pip install screamrouter</Code> or download the Windows standalone executable from the <Link as={RouterLink} to="/downloads" color="brand.500">Downloads page</Link>—both paths deliver the complete Windows Desktop experience with no extra installers.
      </Alert>
      
      <Image 
        src="/images/screamrouter/windows-desktop-screenshot.png" 
        alt="ScreamRouter Windows Desktop Screenshot" 
        borderRadius="md"
        mb={8}
        maxH="400px"
        fallback={<Box height="300px" bg="gray.100" borderRadius="md" display="flex" alignItems="center" justifyContent="center">ScreamRouter Windows Desktop Screenshot</Box>}
      />
      
    
      <DocSection title="Installation">
        <OrderedList spacing={3} mb={4}>
          <ListItem>
            <Text>Install the main ScreamRouter package on Windows using one of the following methods:</Text>
            <UnorderedList spacing={1} ml={5}>
              <ListItem><Code>pip install screamrouter</Code> for a Python-based install that stays up to date</ListItem>
              <ListItem>Download the Windows standalone executable from the <Link as={RouterLink} to="/downloads" color="brand.500">Downloads page</Link></ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            <Text>Launch ScreamRouter from the Start Menu or by running <Code>screamrouter</Code> in PowerShell</Text>
          </ListItem>
          <ListItem>
            <Text>The native Windows window and tray icon start automatically when ScreamRouter runs</Text>
          </ListItem>
          <ListItem>
            <Text>Open Settings only if you need to point the desktop UI at a remote ScreamRouter server—the default is your local instance</Text>
          </ListItem>
        </OrderedList>

        <Text mb={4}>
          Need help installing or upgrading? Visit the <Link as={RouterLink} to="/docs/install-screamrouter" color="brand.500">ScreamRouter installation guide</Link>.
        </Text>
        
        <Alert status="info">
          <AlertIcon />
          Some environments may require administrator privileges to install Python dependencies or run the standalone executable the first time.
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
    </Box>
  );
}

export default WindowsAppDoc;
