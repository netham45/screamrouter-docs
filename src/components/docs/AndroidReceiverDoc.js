import React from 'react';
import { Box, Heading, Text, Link, List, ListItem, ListIcon } from '@chakra-ui/react';
import { FaDownload, FaGithub } from 'react-icons/fa'; // Import necessary icons
import DocSection from './DocSection'; // Assuming DocSection is compatible or generic

const AndroidReceiverDoc = () => {
  return (
    <DocSection title="Android Scream Receiver">
      <Text mb={4}>
        An Android application is available to act as a Scream receiver. This allows you to stream audio from ScreamRouter directly to your Android device.
      </Text>
      <Text mb={4}>
        Currently, the application runs as a background service. When active, it adds an entry to the Android notification area, which includes an "Exit" button to stop the receiver service. There is no main user interface for the app at this time.
      </Text>
      <Text mb={4}>
        The receiver listens for Scream audio streams on UDP port <Text as="strong">4010</Text>. Ensure your network configuration allows traffic on this port from your ScreamRouter server to your Android device.
      </Text>
      
      <Heading as="h3" size="md" mt={6} mb={3}>
        Installation
      </Heading>
      <List spacing={3} mb={4}>
        <ListItem>
          Download the latest APK file from the GitHub releases page (link below).
        </ListItem>
        <ListItem>
          You may need to enable installation from unknown sources in your Android settings to install the APK.
        </ListItem>
        <ListItem>
          Open the downloaded APK file to install the application.
        </ListItem>
        <ListItem>
          Once installed, launch the "Scream Receiver" app. The notification entry should appear, indicating the service is running.
        </ListItem>
      </List>
      
      <Box mt={6}>
        <Link 
          href="https://github.com/netham45/android-scream-receiver/releases/latest" 
          isExternal 
          color="brand.500"
          fontWeight="bold"
        >
          <ListIcon as={FaDownload} mr={2} />
          Download Latest Android Receiver APK from GitHub Releases
        </Link>
      </Box>
      <Box mt={3}>
         <Link 
          href="https://github.com/netham45/android-scream-receiver" 
          isExternal 
          color="blue.500"
        >
          <ListIcon as={FaGithub} mr={2} />
          View Source Code on GitHub
        </Link>
      </Box>
    </DocSection>
  );
};

export default AndroidReceiverDoc;
