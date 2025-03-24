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
  AlertIcon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Link
} from '@chakra-ui/react';
import DocSection from './DocSection';
import { FaDocker, FaSpotify, FaAmazon, FaFirefox } from 'react-icons/fa';

function DockerSourcesDoc() {
  const codeBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>Docker Audio Source Containers</Heading>
      
      <Text mb={4}>
        ScreamRouter can integrate with various audio streaming services using Docker containers. 
        These containers run audio streaming applications and output audio as RTP streams, which 
        can then be processed by ScreamRouter. This approach allows for easy setup and isolation of different audio sources.
      </Text>

      <Alert status="info" mb={6}>
        <AlertIcon />
        <Text>
          These Docker containers use RTP to stream audio. ScreamRouter's auto-detection should 
          recognize the streams in most cases.
        </Text>
      </Alert>

      <DocSection title="Available Docker Sources" icon={FaDocker}>
        <Text mb={4}>
          The following Docker sources are available for use with ScreamRouter:
        </Text>
        <UnorderedList spacing={2} mb={6}>
          <ListItem>
            <Link href="https://github.com/netham45/screamrouter-amazon-music-docker" isExternal color="brand.500">
              Amazon Music Docker Container
            </Link> - For streaming Amazon Music
          </ListItem>
          <ListItem>
            <Link href="https://github.com/netham45/screamrouter-spotify-docker" isExternal color="brand.500">
              Spotify Docker Container
            </Link> - For streaming Spotify
          </ListItem>
          <ListItem>
            <Link href="https://github.com/netham45/screamrouter-firefox-docker" isExternal color="brand.500">
              Firefox Docker Container
            </Link> - For streaming audio from websites
          </ListItem>
        </UnorderedList>
      </DocSection>

      <DocSection title="Common Features" icon={FaDocker}>
        <Text mb={4}>
          Most Docker sources share these characteristics:
        </Text>
        <UnorderedList spacing={2} mb={6}>
          <ListItem>Based on a lightweight Linux distribution (e.g., Debian)</ListItem>
          <ListItem>Include VNC server for remote GUI access</ListItem>
          <ListItem>Use Wine to run Windows applications when necessary</ListItem>
          <ListItem>Include PulseAudio for audio processing</ListItem>
          <ListItem>Output audio as 16-bit 48kHz PCM encapsulated in RTP streams</ListItem>
          <ListItem>Listen on specific ports for control commands (e.g., play, pause, next track)</ListItem>
        </UnorderedList>
      </DocSection>

      <DocSection title="Integration with ScreamRouter" icon={FaDocker}>
        <Text mb={4}>
          These Docker sources are designed to work seamlessly with ScreamRouter:
        </Text>
        <UnorderedList spacing={2} mb={6}>
          <ListItem>They output RTP streams to the Docker host (usually 172.17.0.1)</ListItem>
          <ListItem>ScreamRouter's auto-detection should recognize the streams</ListItem>
          <ListItem>Audio can be controlled via UDP packets sent to specific ports</ListItem>
        </UnorderedList>
      </DocSection>

      <DocSection title="Setting Up Docker Sources" icon={FaDocker}>
        <Text mb={4}>
          To set up a Docker source:
        </Text>

        <OrderedList spacing={3} mb={6}>
          <ListItem>
            <Text mb={2}>Clone the repository for the desired source:</Text>
            <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
              git clone https://github.com/netham45/screamrouter-[source-name]-docker.git
            </Box>
          </ListItem>
          <ListItem>
            <Text mb={2}>Navigate to the cloned directory:</Text>
            <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
              cd screamrouter-[source-name]-docker
            </Box>
          </ListItem>
          <ListItem>
            <Text mb={2}>Build the Docker image:</Text>
            <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
              ./build.sh
            </Box>
          </ListItem>
          <ListItem>
            <Text mb={2}>Run the Docker container:</Text>
            <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
              ./run.sh
            </Box>
          </ListItem>
          <ListItem>
            <Text mb={2}>Access the application interface via VNC (similar to 172.17.0.2:5900)</Text>
          </ListItem>
          <ListItem>
            <Text mb={2}>Configure ScreamRouter to recognize the new source (this should happen automatically in most cases)</Text>
          </ListItem>
        </OrderedList>
      </DocSection>

      <DocSection title="Audio Source Setup" icon={FaDocker}>
        <Tabs variant="enclosed" colorScheme="blue" mt={4}>
          <TabList>
            <Tab><Box mr={2}><FaAmazon /></Box> Amazon Music</Tab>
            <Tab><Box mr={2}><FaSpotify /></Box> Spotify</Tab>
            <Tab><Box mr={2}><FaFirefox /></Box> Firefox</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Text mb={4}>
                The Amazon Music Docker container runs the Amazon Music web player in an Xtigervnc session
                environment and captures its audio output for streaming to ScreamRouter.
              </Text>
              <Text mb={4}>
                <strong>Features:</strong>
              </Text>
              <UnorderedList spacing={2} mb={6}>
                <ListItem>Access Amazon Music via VNC</ListItem>
                <ListItem>Streams audio via RTP to ScreamRouter</ListItem>
                <ListItem>Supports login for Amazon Music accounts</ListItem>
              </UnorderedList>
              <Link href="https://github.com/netham45/screamrouter-amazon-music-docker" isExternal color="brand.500">
                View Amazon Music Docker on GitHub for detailed setup instructions
              </Link>
            </TabPanel>
            <TabPanel>
              <Text mb={4}>
                The Spotify Docker container runs the Spotify web player an Xtigervnc session
                environment and captures its audio output for streaming to ScreamRouter.
              </Text>
              <Text mb={4}>
                <strong>Features:</strong>
              </Text>
              <UnorderedList spacing={2} mb={6}>
                <ListItem>Access Spotify via VNC</ListItem>
                <ListItem>Streams audio via RTP to ScreamRouter</ListItem>
                <ListItem>Supports login for Spotify accounts</ListItem>
              </UnorderedList>
              <Link href="https://github.com/netham45/screamrouter-spotify-docker" isExternal color="brand.500">
                View Spotify Docker on GitHub for detailed setup instructions
              </Link>
            </TabPanel>
            <TabPanel>
              <Text mb={4}>
                The Firefox Docker container runs Firefox browser in an Xtigervnc session
                and captures its audio output for streaming to ScreamRouter. You can use this
                for general audio streaming from websites.
              </Text>
              <Text mb={4}>
                <strong>Features:</strong>
              </Text>
              <UnorderedList spacing={2} mb={6}>
                <ListItem>Access Firefox browser via VNC</ListItem>
                <ListItem>Browse to any audio streaming site</ListItem>
                <ListItem>Streams audio via RTP to ScreamRouter</ListItem>
              </UnorderedList>
              <Link href="https://github.com/netham45/screamrouter-firefox-docker" isExternal color="brand.500">
                View Firefox Docker on GitHub for detailed setup instructions
              </Link>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </DocSection>

      <DocSection title="Troubleshooting" icon={FaDocker}>
        <UnorderedList spacing={3}>
          <ListItem>
            <Text fontWeight="bold">No audio in ScreamRouter</Text>
            <UnorderedList ml={6} mt={1}>
              <ListItem>Verify that Docker network settings are properly configured</ListItem>
              <ListItem>Check that ScreamRouter is configured to listen for RTP streams</ListItem>
              <ListItem>Ensure there are no firewalls blocking the RTP stream from the Docker container to ScreamRouter</ListItem>
              <ListItem>Verify VNC is working to ensure the application inside the container is running properly</ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            <Text fontWeight="bold">VNC access issues</Text>
            <UnorderedList ml={6} mt={1}>
              <ListItem>Ensure the VNC port is properly exposed in the Docker container</ListItem>
              <ListItem>Use a VNC client to connect to the Docker container's IP address (usually 172.17.0.2:5900)</ListItem>
              <ListItem>If you're unable to connect, check the Docker container logs for any VNC server errors</ListItem>
            </UnorderedList>
          </ListItem>
        </UnorderedList>

        <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mt={4} mb={4} overflowX="auto">
          # View Docker container logs<br />
          docker logs container_name<br /><br />
          # Check running containers<br />
          docker ps<br /><br />
          # Restart a container<br />
          docker restart container_name
        </Box>
      </DocSection>

      <DocSection title="Additional Resources">
        <UnorderedList spacing={2}>
          <ListItem>
            <Link href="https://github.com/netham45/screamrouter-amazon-music-docker" isExternal color="brand.500">
              Amazon Music Docker GitHub Repository
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://github.com/netham45/screamrouter-spotify-docker" isExternal color="brand.500">
              Spotify Docker GitHub Repository
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://github.com/netham45/screamrouter-firefox-docker" isExternal color="brand.500">
              Firefox Docker GitHub Repository
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://github.com/netham45/screamrouter" isExternal color="brand.500">
              ScreamRouter GitHub Repository
            </Link>
          </ListItem>
        </UnorderedList>
      </DocSection>
    </Box>
  );
}

export default DockerSourcesDoc;