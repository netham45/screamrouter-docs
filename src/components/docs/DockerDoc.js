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
  Link,
  Divider
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import DocSection from './DocSection';
import { FaDocker, FaNetworkWired, FaDatabase, FaShieldAlt, FaCloudDownloadAlt } from 'react-icons/fa';

function DockerDoc() {
  const codeBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>ScreamRouter Docker Deployment</Heading>
      
      <Text fontSize="lg" mb={4}>
        ScreamRouter can be deployed in a Docker container, making it easy to install and maintain
        across different platforms. This guide covers how to set up and run ScreamRouter using Docker.
      </Text>

      <Alert status="info" mb={6}>
        <AlertIcon />
        <Text>
          Running ScreamRouter in Docker is the recommended method for most users, as it provides
          easy installation, automatic updates, and isolation from the host system.
        </Text>
      </Alert>

      <DocSection title="Quick Start" icon={FaCloudDownloadAlt}>
        <Text mb={4}>
          To quickly get ScreamRouter running with Docker, you can use one of these commands:
        </Text>

        <Tabs variant="enclosed" colorScheme="blue" mt={4} mb={6}>
          <TabList>
            <Tab>Linux/macOS (Host Network)</Tab>
            <Tab>Windows/Cross-Platform</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Text mb={3}>
                For Linux and macOS, using host networking mode is recommended for optimal audio streaming performance:
              </Text>
              <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto" whiteSpace="pre">
{`# Run with host networking (recommended for Linux/macOS)
docker run -d --network host \\
  -v ./config:/app/config \\
  -v ./logs:/app/logs \\
  -v ./cert:/app/cert \\
  --name screamrouter \\
  netham45/screamrouter:latest

# Access the web interface at https://localhost`}
              </Box>
              <Alert status="warning" mb={4} mt={4}>
                <AlertIcon />
                <Text>
                  Host networking mode is required for proper functioning of multicast-based protocols 
                  like Scream source auto-discovery.
                </Text>
              </Alert>
            </TabPanel>
            <TabPanel>
              <Text mb={3}>
                For Windows or cross-platform environments, use port mapping:
              </Text>
              <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto" whiteSpace="pre">
{`# Run with port forwards (compatible with Windows)
docker run -d \\
  -p 443:443 \\
  -p 16401:16401/udp \\
  -p 40001:40001/udp \\
  -p 4011-4020:4011-4020/udp \\
  -v ./config:/app/config \\
  -v ./logs:/app/logs \\
  -v ./cert:/app/cert \\
  --name screamrouter \\
  netham45/screamrouter:latest

# Access the web interface at https://localhost`}
              </Box>
              <Alert status="warning" mb={4} mt={4}>
                <AlertIcon />
                <Text>
                  When using port mapping, multicast-based features (like automatic Scream source discovery)
                  won't work. You'll need to manually configure sources.
                </Text>
              </Alert>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </DocSection>

      <DocSection title="Docker Compose Setup" icon={FaDocker}>
        <Text mb={4}>
          For more permanent deployments, Docker Compose is recommended. Create a docker-compose.yml file with the following content:
        </Text>

        <Tabs variant="enclosed" colorScheme="blue" mt={4} mb={6}>
          <TabList>
            <Tab>Linux/macOS (Host Network)</Tab>
            <Tab>Windows/Cross-Platform</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto" whiteSpace="pre">
{`version: '3'
services:
  screamrouter:
    image: netham45/screamrouter:latest
    container_name: screamrouter
    network_mode: host
    restart: unless-stopped
    volumes:
      - ./config:/app/config
      - ./logs:/app/logs
      - ./cert:/app/cert
    environment:
      - TZ=America/New_York  # Set your timezone here`}
              </Box>
            </TabPanel>
            <TabPanel>
              <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto" whiteSpace="pre">
{`version: '3'
services:
  screamrouter:
    image: netham45/screamrouter:latest
    container_name: screamrouter
    restart: unless-stopped
    ports:
      - 443:443
      - 16401:16401/udp
      - 40001:40001/udp
      - 4011-4020:4011-4020/udp
    volumes:
      - ./config:/app/config
      - ./logs:/app/logs
      - ./cert:/app/cert
    environment:
      - TZ=America/New_York  # Set your timezone here`}
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Text mb={4}>
          Then start the container using:
        </Text>
        <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={4} overflowX="auto">
          docker-compose up -d
        </Box>
      </DocSection>

      <DocSection title="Container Details" icon={FaDatabase}>
        <Heading as="h3" size="md" mb={3}>
          Persistent Volumes
        </Heading>
        <Text mb={3}>
          ScreamRouter uses several volume mounts to persist data:
        </Text>
        <UnorderedList spacing={2} mb={5}>
          <ListItem>
            <Code>/app/config</Code>: Configuration files (including config.yaml and equalizers.yaml)
          </ListItem>
          <ListItem>
            <Code>/app/logs</Code>: Application logs for troubleshooting
          </ListItem>
          <ListItem>
            <Code>/app/cert</Code>: SSL certificates (automatically generated if not present)
          </ListItem>
        </UnorderedList>

        <Heading as="h3" size="md" mb={3} mt={6}>
          SSL Certificates
        </Heading>
        <Text mb={3}>
          Self-signed SSL certificates are automatically generated on first run if not found in the mounted certificate volume.
          To use your own certificates, place them in the cert volume as:
        </Text>
        <UnorderedList spacing={2} mb={5}>
          <ListItem><Code>cert.pem</Code>: SSL certificate file</ListItem>
          <ListItem><Code>privkey.pem</Code>: SSL private key file</ListItem>
        </UnorderedList>
      </DocSection>

      <DocSection title="Network Configuration" icon={FaNetworkWired}>
        <Heading as="h3" size="md" mb={3}>
          Host Networking Mode (Linux/macOS)
        </Heading>
        <Text mb={4}>
          On Linux and macOS, it's recommended to use host networking mode for optimal audio streaming performance.
          This allows ScreamRouter to directly access the host's network interfaces, which is required for
          multicast-based protocols like Scream.
        </Text>
        <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mb={5} overflowX="auto">
          docker run -d --network host ...
        </Box>

        <Heading as="h3" size="md" mb={3} mt={6}>
          Port Mapping Mode (Windows/Cross-Platform)
        </Heading>
        <Text mb={3}>
          On Windows, Docker's host networking has limitations. You can use port mapping instead:
        </Text>
        <UnorderedList spacing={2} mb={5}>
          <ListItem><Code>-p 443:443</Code>: HTTPS web interface port</ListItem>
          <ListItem><Code>-p 16401:16401/udp</Code>: Port for receiving Scream audio</ListItem>
          <ListItem><Code>-p 40001:40001/udp</Code>: Port for receiving RTP audio</ListItem>
          <ListItem><Code>-p 4011-4020:4011-4020/udp</Code>: Ports for Scream Sinks</ListItem>
        </UnorderedList>
        <Alert status="warning" mb={4} mt={4}>
          <AlertIcon />
          <Text>
            When using port mapping, multicast features won't work. You'll need to manually configure sources
            in the web interface.
          </Text>
        </Alert>
      </DocSection>

      <DocSection title="Environment Variables" icon={FaShieldAlt}>
        <Text mb={4}>
          ScreamRouter's behavior can be customized using environment variables:
        </Text>

        <Heading as="h3" size="sm" mb={2} mt={4}>
          Core Settings
        </Heading>
        <UnorderedList spacing={2} mb={4}>
          <ListItem><Code>TZ</Code>: Set the timezone (default: UTC)</ListItem>
          <ListItem><Code>API_PORT</Code>: HTTPS port for the web interface (default: 443)</ListItem>
          <ListItem><Code>HTTP_PORT</Code>: HTTP port for the web interface (default: 80)</ListItem>
          <ListItem><Code>API_HOST</Code>: Host the web interface binds to (default: 0.0.0.0)</ListItem>
        </UnorderedList>

        <Heading as="h3" size="sm" mb={2} mt={4}>
          Network Ports
        </Heading>
        <UnorderedList spacing={2} mb={4}>
          <ListItem><Code>SCREAM_RECEIVER_PORT</Code>: Port to receive Scream audio data (default: 16401)</ListItem>
          <ListItem><Code>RTP_RECEIVER_PORT</Code>: Port to receive RTP audio data (default: 40000)</ListItem>
          <ListItem><Code>SINK_PORT</Code>: Base port for Scream Sink (default: 4010)</ListItem>
        </UnorderedList>

        <Heading as="h3" size="sm" mb={2} mt={4}>
          Audio Features
        </Heading>
        <UnorderedList spacing={2} mb={4}>
          <ListItem><Code>TIMESHIFT_DURATION</Code>: Audio time-shifting buffer duration in seconds (default: 300)</ListItem>
          <ListItem><Code>CONFIGURATION_RELOAD_TIMEOUT</Code>: Configuration reload timeout in seconds (default: 3)</ListItem>
        </UnorderedList>

        <Alert status="info" mb={4} mt={4}>
          <AlertIcon />
          <Text>
            Environment variables can be set in the docker run command using the -e flag or in docker-compose.yml
            using the environment section.
          </Text>
        </Alert>
      </DocSection>

      <DocSection title="Docker Audio Sources">
        <Text mb={4}>
          In addition to running ScreamRouter itself in Docker, you can also run various audio streaming services
          in Docker containers that integrate with ScreamRouter.
        </Text>

        <Text mb={4}>
          These Docker source containers include:
        </Text>
        <UnorderedList spacing={2} mb={5}>
          <ListItem>Amazon Music Docker Container</ListItem>
          <ListItem>Spotify Docker Container</ListItem>
          <ListItem>Firefox Docker Container (for web-based audio)</ListItem>
        </UnorderedList>

        <Link as={RouterLink} to="/docs/docker-sources" mb={4}>
          <Box p={3} borderWidth="1px" borderRadius="md" _hover={{ bg: "gray.50" }}>
            View the full Docker Audio Sources documentation
          </Box>
        </Link>
      </DocSection>

      <DocSection title="Troubleshooting">
        <Heading as="h3" size="md" mb={2}>
          Container Will Not Start
        </Heading>
        <UnorderedList spacing={2} mb={5}>
          <ListItem>Check the Docker logs for error messages: <Code>docker logs screamrouter</Code></ListItem>
          <ListItem>Verify that the required ports are not already in use on your host system</ListItem>
          <ListItem>Ensure the volume directories exist and have proper permissions</ListItem>
        </UnorderedList>

        <Heading as="h3" size="md" mb={2} mt={5}>
          No Audio Sources Detected
        </Heading>
        <UnorderedList spacing={2} mb={5}>
          <ListItem>If using port mapping (not host networking), multicast auto-discovery won't work</ListItem>
          <ListItem>Add sources manually in the web interface</ListItem>
          <ListItem>Check that your audio source is properly configured and sending to the right IP/port</ListItem>
        </UnorderedList>

        <Heading as="h3" size="md" mb={2} mt={5}>
          Web Interface Not Accessible
        </Heading>
        <UnorderedList spacing={2} mb={5}>
          <ListItem>Verify the container is running: <Code>docker ps</Code></ListItem>
          <ListItem>Check that the ports are correctly mapped: <Code>docker port screamrouter</Code></ListItem>
          <ListItem>When accessing via HTTPS, accept the self-signed certificate warning</ListItem>
          <ListItem>Try accessing via IP address instead of localhost</ListItem>
        </UnorderedList>

        <Box bg={codeBg} p={3} borderRadius="md" fontFamily="mono" mt={4} mb={4} overflowX="auto" whiteSpace="pre">
{`# Useful Docker commands for troubleshooting

# View container logs
docker logs screamrouter

# Check running containers
docker ps

# Restart the container
docker restart screamrouter

# Enter the container shell
docker exec -it screamrouter bash`}
        </Box>
      </DocSection>
    </Box>
  );
}

export default DockerDoc;