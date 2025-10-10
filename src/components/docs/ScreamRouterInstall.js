import React from 'react';
import {
  Box,
  Text,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Code,
  List,
  ListItem,
  Alert,
  AlertIcon,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  VStack,
  UnorderedList,
  Link,
  Badge,
  HStack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaChevronRight, FaDocker, FaPython, FaWindows, FaLinux } from 'react-icons/fa';
import DocSection from './DocSection';

function ScreamRouterInstall() {
  return (
    <Box>
      <Breadcrumb spacing="8px" separator={<FaChevronRight color="gray.500" />} mb={8}>
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to="/docs">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>ScreamRouter Installation</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      
      <Heading as="h1" size="xl" mb={6}>
        ScreamRouter Installation
      </Heading>
      
      <Text fontSize="lg" mb={8}>
        ScreamRouter can be installed using Python pip (recommended) or Docker. Choose the installation method that best suits your needs.
      </Text>

      <Alert status="info" mb={6}>
        <AlertIcon />
        <Box>
          <Text fontWeight="bold">Recommended: Python pip Installation</Text>
          <Text>Simple installation via pip with support for Windows and Linux. Just run: <Code>pip install screamrouter</Code></Text>
        </Box>
      </Alert>
      
      <Tabs variant="enclosed" colorScheme="brand" defaultIndex={0}>
        <TabList>
          <Tab><FaPython style={{ marginRight: '8px', display: 'inline' }} />Python pip (Recommended)</Tab>
          <Tab><FaDocker style={{ marginRight: '8px', display: 'inline' }} />Docker</Tab>
        </TabList>
        
        <TabPanels>
          <TabPanel>
            <DocSection title="Python pip Installation" icon={FaPython}>
              <Text mb={4}>
                ScreamRouter is available as a Python package on PyPI, supporting Windows and Linux systems.
              </Text>

              <Alert status="info" mb={4}>
                <AlertIcon />
                <Box>
                  <Text><strong>Python Requirements:</strong> Python 3.10 or higher</Text>
                  <Text><strong>Supported OS:</strong> Windows, Linux</Text>
                  <Text><strong>Package Name:</strong> screamrouter</Text>
                </Box>
              </Alert>
              
              <Heading as="h3" size="md" mb={3}>Installation</Heading>
              <Code p={4} borderRadius="md" display="block" whiteSpace="pre" mb={4}>
{`# Install ScreamRouter from PyPI
pip install screamrouter

# Or upgrade to the latest version
pip install --upgrade screamrouter`}
              </Code>

              <Heading as="h3" size="md" mb={3}>Running ScreamRouter</Heading>
              <Text mb={3}>After installation, run ScreamRouter using:</Text>
              <Code p={4} borderRadius="md" display="block" whiteSpace="pre" mb={4}>
{`# Run ScreamRouter
screamrouter

# Or with custom config path
screamrouter --config /path/to/config.yaml`}
              </Code>

              <Heading as="h3" size="md" mb={3}>Build Requirements</Heading>
              <Text mb={3}>If building from source or if pip needs to compile dependencies:</Text>
              
              <Tabs variant="soft-rounded" colorScheme="green" size="sm" mb={6}>
                <TabList mb={4}>
                  <Tab><FaLinux style={{ marginRight: '4px', display: 'inline' }} />Linux</Tab>
                  <Tab><FaWindows style={{ marginRight: '4px', display: 'inline' }} />Windows</Tab>
                </TabList>
                
                <TabPanels>
                  <TabPanel px={0}>
                    <UnorderedList spacing={2}>
                      <ListItem>GCC or Clang compiler</ListItem>
                      <ListItem>CMake {'>='} 3.14</ListItem>
                      <ListItem>Python development headers</ListItem>
                      <ListItem>OpenSSL development libraries</ListItem>
                      <ListItem>Node.js and npm (for React frontend)</ListItem>
                    </UnorderedList>
                    <Code p={3} borderRadius="md" display="block" whiteSpace="pre" mt={3}>
{`# Ubuntu/Debian
sudo apt-get install build-essential cmake python3-dev libssl-dev nodejs npm

# Fedora/RHEL
sudo dnf install gcc gcc-c++ cmake python3-devel openssl-devel nodejs npm`}
                    </Code>
                  </TabPanel>
                  
                  <TabPanel px={0}>
                    <UnorderedList spacing={2}>
                      <ListItem>Microsoft Visual C++ 14.0 or greater</ListItem>
                      <ListItem>CMake {'>='} 3.14</ListItem>
                      <ListItem>Node.js and npm</ListItem>
                    </UnorderedList>
                    <Text mt={3}>
                      Install Visual Studio Build Tools from{' '}
                      <Link href="https://visualstudio.microsoft.com/downloads/" color="brand.500" isExternal>
                        Microsoft's website
                      </Link>
                    </Text>
                  </TabPanel>
                </TabPanels>
              </Tabs>

              <Heading as="h3" size="md" mb={3}>Python Version Support</Heading>
              <HStack spacing={2} mb={4}>
                <Badge colorScheme="green">Python 3.10</Badge>
                <Badge colorScheme="green">Python 3.11</Badge>
                <Badge colorScheme="green">Python 3.12</Badge>
                <Badge colorScheme="green">Python 3.13</Badge>
                <Badge colorScheme="green">Python 3.14</Badge>
              </HStack>

              <Alert status="success" mb={4}>
                <AlertIcon />
                <Text>
                  The pip package includes all necessary components including the C++ audio engine and React frontend.
                </Text>
              </Alert>

              <Heading as="h3" size="md" mb={3}>Virtual Environment (Recommended)</Heading>
              <Text mb={3}>It's recommended to use a virtual environment:</Text>
              <Code p={4} borderRadius="md" display="block" whiteSpace="pre" mb={4}>
{`# Create virtual environment
python -m venv screamrouter-env

# Activate (Linux/macOS)
source screamrouter-env/bin/activate

# Activate (Windows)
screamrouter-env\\Scripts\\activate

# Install ScreamRouter
pip install screamrouter`}
              </Code>
            </DocSection>
          </TabPanel>
          
          <TabPanel>
            <DocSection title="Docker Installation" icon={FaDocker}>
              <Text mb={4}>
                Docker provides an isolated and consistent environment with automatic SSL certificate generation.
              </Text>

              <Alert status="success" mb={4}>
                <AlertIcon />
                <Text>Docker automatically generates SSL certificates if not provided!</Text>
              </Alert>
              
              <Heading as="h3" size="md" mb={3}>Quick Start</Heading>
              
              <Tabs variant="soft-rounded" colorScheme="blue" size="sm" mb={6}>
                <TabList mb={4}>
                  <Tab>Linux/macOS (Host Network)</Tab>
                  <Tab>Windows/Cross-Platform</Tab>
                </TabList>
                
                <TabPanels>
                  <TabPanel px={0}>
                    <Text mb={3}>For Linux and macOS, use host networking for optimal performance:</Text>
                    <Code p={4} borderRadius="md" display="block" whiteSpace="pre" mb={4}>
{`docker run -d --network host \\
  -v ./config:/app/config \\
  -v ./logs:/app/logs \\
  -v ./cert:/app/cert \\
  --name screamrouter \\
  netham45/screamrouter:latest`}
                    </Code>
                    <Alert status="info" mb={4}>
                      <AlertIcon />
                      <Text>Host networking is required for multicast and mDNS discovery features.</Text>
                    </Alert>
                  </TabPanel>
                  
                  <TabPanel px={0}>
                    <Text mb={3}>For Windows or when host networking isn't available:</Text>
                    <Code p={4} borderRadius="md" display="block" whiteSpace="pre" mb={4}>
{`docker run -d \\
  -p 443:443 \\
  -p 80:80 \\
  -p 4010-4020:4010-4020/udp \\
  -p 4011:4011/udp \\
  -v ./config:/app/config \\
  -v ./logs:/app/logs \\
  -v ./cert:/app/cert \\
  --name screamrouter \\
  netham45/screamrouter:latest`}
                    </Code>
                    <Alert status="warning" mb={4}>
                      <AlertIcon />
                      <Text>Port mapping mode doesn't support multicast/mDNS features. Manual configuration required.</Text>
                    </Alert>
                  </TabPanel>
                </TabPanels>
              </Tabs>

              <Heading as="h3" size="md" mb={3}>Docker Compose</Heading>
              <Text mb={3}>For production deployments, use Docker Compose:</Text>
              <Code p={4} borderRadius="md" display="block" whiteSpace="pre" mb={4}>
{`version: '3'
services:
  screamrouter:
    image: netham45/screamrouter:latest
    container_name: screamrouter
    network_mode: host  # Or use ports section for Windows
    restart: unless-stopped
    volumes:
      - ./config:/app/config
      - ./logs:/app/logs
      - ./cert:/app/cert
    environment:
      - API_PORT=443
      - HTTP_PORT=80
      - CERTIFICATE=/app/cert/cert.pem
      - CERTIFICATE_KEY=/app/cert/privkey.pem
      - CONFIG_PATH=/app/config/config.yaml
      - EQUALIZER_CONFIG_PATH=/app/config/equalizers.yaml`}
              </Code>

              <Heading as="h3" size="md" mb={3}>Environment Variables</Heading>
              <UnorderedList spacing={2} mb={4}>
                <ListItem><Code>API_PORT</Code> - HTTPS port (default: 443)</ListItem>
                <ListItem><Code>HTTP_PORT</Code> - HTTP port (default: 80)</ListItem>
                <ListItem><Code>CERTIFICATE</Code> - SSL certificate path</ListItem>
                <ListItem><Code>CERTIFICATE_KEY</Code> - SSL private key path</ListItem>
                <ListItem><Code>CONFIG_PATH</Code> - Configuration file path</ListItem>
                <ListItem><Code>EQUALIZER_CONFIG_PATH</Code> - Equalizer settings path</ListItem>
              </UnorderedList>

              <Alert status="info" mb={4}>
                <AlertIcon />
                <Text>
                  <strong>Base Image:</strong> Python 3.12-trixie<br/>
                  <strong>Auto-SSL:</strong> Certificates are auto-generated if not provided
                </Text>
              </Alert>
            </DocSection>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <DocSection title="Post-Installation">
        <Heading as="h3" size="md" mb={3}>Accessing the Web Interface</Heading>
        <Text mb={4}>
          After installation, access ScreamRouter at:
        </Text>
        <UnorderedList spacing={2} mb={4}>
          <ListItem><Code>https://localhost</Code> - HTTPS (recommended)</ListItem>
          <ListItem><Code>http://localhost</Code> - HTTP (redirects to HTTPS)</ListItem>
        </UnorderedList>

        <Alert status="warning" mb={4}>
          <AlertIcon />
          <Text>
            On first access, you'll need to accept the self-signed certificate warning in your browser.
          </Text>
        </Alert>

        <Heading as="h3" size="md" mb={3}>Next Steps</Heading>
        <UnorderedList spacing={2}>
          <ListItem>
            <Link as={RouterLink} to="/docs/configuration" color="brand.500">
              Configure your audio sources and sinks
            </Link>
          </ListItem>
          <ListItem>
            <Link as={RouterLink} to="/docs/ui" color="brand.500">
              Learn about the web interface
            </Link>
          </ListItem>
          <ListItem>
            <Link as={RouterLink} to="/docs/autoconfig" color="brand.500">
              Set up automatic device discovery via mDNS
            </Link>
          </ListItem>
        </UnorderedList>
      </DocSection>
    </Box>
  );
}

export default ScreamRouterInstall;