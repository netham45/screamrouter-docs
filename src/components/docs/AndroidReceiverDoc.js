import React from 'react';
import { Typography, Link, Paper, Box } from '@mui/material';
import DocSection from './DocSection';

const AndroidReceiverDoc = () => {
  return (
    <DocSection title="Android Scream Receiver">
      <Typography paragraph>
        An Android application is available to act as a Scream receiver. This allows you to stream audio from ScreamRouter directly to your Android device.
      </Typography>
      <Typography paragraph>
        Currently, the application runs as a background service. When active, it adds an entry to the Android notification area, which includes an "Exit" button to stop the receiver service. There is no main user interface for the app at this time.
      </Typography>
      <Typography paragraph>
        The receiver listens for Scream audio streams on UDP port <strong>4010</strong>. Ensure your network configuration allows traffic on this port from your ScreamRouter server to your Android device.
      </Typography>
      <Typography paragraph>
        <strong>Installation:</strong>
      </Typography>
      <Typography component="div" paragraph>
        <ol>
          <li>Download the latest APK file from the GitHub releases page.</li>
          <li>You may need to enable installation from unknown sources in your Android settings to install the APK.</li>
          <li>Open the downloaded APK file to install the application.</li>
          <li>Once installed, launch the "Scream Receiver" app. The notification entry should appear, indicating the service is running.</li>
        </ol>
      </Typography>
      <Box mt={2}>
        <Link 
          href="https://github.com/netham45/android-scream-receiver/releases/latest" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Download Latest Android Receiver APK from GitHub Releases
        </Link>
      </Box>
    </DocSection>
  );
};

export default AndroidReceiverDoc;
