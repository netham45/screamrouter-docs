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
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@chakra-ui/react';
import { FaChevronRight, FaDocker, FaLinux, FaWindows } from 'react-icons/fa';
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
        This guide provides instructions for installing the ScreamRouter system on various platforms.
        Choose the tab that matches your preferred deployment method.
      </Text>
      
      <Tabs variant="enclosed" colorScheme="brand">
        <TabList>
          <Tab>Docker (Linux)</Tab>
          <Tab>Docker (Windows)</Tab>
          <Tab>Linux</Tab>
        </TabList>
        
        <TabPanels>
          <TabPanel>
            <DocSection title="Docker Installation (Linux)" icon={FaDocker}>
              <Text mb={4}>
                The recommended way to run ScreamRouter is using Docker, which provides an isolated and consistent environment.
              </Text>
              
              <Heading as="h3" size="md" mb={3}>Using the Official Docker Image</Heading>
              <Code p={4} borderRadius="md" display="block" whiteSpace="pre" mb={6}>
{`docker run -d --network host \\
  -v ./config:/app/config \\
  -v ./logs:/app/logs \\
  -v ./cert:/app/cert \\
  --name screamrouter \\
  netham45/screamrouter:latest`}
              </Code>
              
              <Text mb={4}>
                This command pulls the latest image from Docker Hub and runs it with the appropriate volume mappings.
              </Text>
              
              <Heading as="h3" size="md" mb={3}>Environment Variables</Heading>
              <Text mb={2}>You can customize the container using environment variables:</Text>
              <List spacing={2} styleType="disc" ml={5} mb={4}>
                <ListItem><Code>TZ</Code>: Set the timezone (default: UTC)</ListItem>
                <ListItem><Code>API_PORT</Code>: HTTPS port for the web interface (default: 443)</ListItem>
                <ListItem><Code>HTTP_PORT</Code>: HTTP port for the web interface (default: 80)</ListItem>
                <ListItem><Code>SCREAM_RECEIVER_PORT</Code>: Port to receive Scream audio data (default: 16401)</ListItem>
              </List>
              
              <Heading as="h3" size="md" mb={3}>Managing the Container</Heading>
              <List spacing={2} styleType="disc" ml={5}>
                <ListItem>To view logs: <Code>docker logs screamrouter</Code></ListItem>
                <ListItem>To stop the container: <Code>docker stop screamrouter</Code></ListItem>
                <ListItem>To restart the container: <Code>docker restart screamrouter</Code></ListItem>
              </List>
            </DocSection>
          </TabPanel>
          
          <TabPanel>
            <DocSection title="Docker Installation (Windows)" icon={FaWindows}>
              <Heading as="h3" size="md" mb={3}>Installing Docker on Windows</Heading>
              <Text mb={4}>
                To run ScreamRouter in Docker on Windows, you first need to install Docker Desktop for Windows.
              </Text>
              
              <List spacing={3} styleType="decimal" ml={5} mb={6}>
                <ListItem>
                  <Text fontWeight="bold">Download Docker Desktop for Windows</Text>
                  <Text>Visit the <Link href="https://www.docker.com/products/docker-desktop/" color="brand.500" isExternal>Docker Desktop download page</Link> and download the installer.</Text>
                </ListItem>
                
                <ListItem>
                  <Text fontWeight="bold">Install Docker Desktop</Text>
                  <Text>Run the installer and follow the on-screen instructions. The installation will enable the required Windows features including WSL2 and Hyper-V (if needed).</Text>
                </ListItem>
                
                <ListItem>
                  <Text fontWeight="bold">Start Docker Desktop</Text>
                  <Text>After installation, start Docker Desktop from the Start menu. You may need to restart your computer to complete the setup.</Text>
                </ListItem>
                
                <ListItem>
                  <Text fontWeight="bold">Verify Installation</Text>
                  <Text>Open a command prompt or PowerShell window and run <Code>docker --version</Code> to verify that Docker is installed correctly.</Text>
                </ListItem>
              </List>
              
              <Text mb={4}>
                On Windows, Docker's host networking has limitations. The port mapping approach works for basic functionality,
                but multicast-based features won't work.
              </Text>
              
              <Heading as="h3" size="md" mb={3}>Using Docker on Windows</Heading>
              <Code p={4} borderRadius="md" display="block" whiteSpace="pre" mb={6}>
{`docker run -d \\
  -p 443:443 \\
  -p 16401:16401/udp \\
  -p 40001:40001/udp \\
  -p 4011-4020:4011-4020/udp \\
  -v ./config:/app/config \\
  -v ./logs:/app/logs \\
  -v ./cert:/app/cert \\
  --name screamrouter \\
  netham45/screamrouter:latest`}
              </Code>
              
              <Heading as="h3" size="md" mb={3}>Accessing ScreamRouter</Heading>
              <Text mb={4}>
                After starting the container, you can access the ScreamRouter web interface by opening
                a web browser and navigating to <Code>https://localhost</Code>.
              </Text>
              
              <Heading as="h3" size="md" mb={3}>Environment Variables</Heading>
              <Text mb={2}>You can customize the container using environment variables:</Text>
              <List spacing={2} styleType="disc" ml={5} mb={4}>
                <ListItem><Code>TZ</Code>: Set the timezone (default: UTC)</ListItem>
                <ListItem><Code>API_PORT</Code>: HTTPS port for the web interface (default: 443)</ListItem>
                <ListItem><Code>HTTP_PORT</Code>: HTTP port for the web interface (default: 80)</ListItem>
                <ListItem><Code>SCREAM_RECEIVER_PORT</Code>: Port to receive Scream audio data (default: 16401)</ListItem>
              </List>
            </DocSection>
          </TabPanel>
          
          <TabPanel>
            <DocSection title="Linux Installation" icon={FaLinux}>
              <Text mb={4}>
                This guide provides step-by-step instructions for installing ScreamRouter on various Linux distributions.
              </Text>
              
              <Heading as="h3" size="md" mb={3}>Prerequisites</Heading>
              <List spacing={2} styleType="disc" ml={5} mb={4}>
                <ListItem>Linux distribution (Debian/Ubuntu, RHEL/CentOS/Rocky Linux, etc.)</ListItem>
                <ListItem>Root or sudo access to your system</ListItem>
                <ListItem>Internet connection for downloading packages</ListItem>
              </List>
              
              <Heading as="h3" size="md" mb={3}>Distribution-Specific Instructions</Heading>
              <Tabs variant="soft-rounded" colorScheme="brand" size="sm" mb={6}>
                <TabList mb={4}>
                  <Tab>Debian/Ubuntu</Tab>
                  <Tab>RHEL/CentOS/Fedora</Tab>
                </TabList>
                
                <TabPanels>
                  <TabPanel px={0}>
                    <Text fontWeight="bold" mb={2}>1. Install required dependencies:</Text>
                    <Code p={4} borderRadius="md" display="block" whiteSpace="pre" my={2}>
{`sudo apt-get update -y
sudo apt-get install -y libmp3lame0 libmp3lame-dev gcc git g++ python3 python3-pip python3-venv libtool pkg-config cmake curl`}
                    </Code>
                    
                    <Text fontWeight="bold" mb={2}>2. Install Node.js 20.x:</Text>
                    <Code p={4} borderRadius="md" display="block" whiteSpace="pre" my={2}>
{`curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version`}
                    </Code>
                  </TabPanel>
                  
                  <TabPanel px={0}>
                    <Text fontWeight="bold" mb={2}>1. Install required dependencies:</Text>
                    <Code p={4} borderRadius="md" display="block" whiteSpace="pre" my={2}>
{`sudo yum update -y
sudo yum install -y lame lame-devel gcc git gcc-c++ python3 python3-pip python3-virtualenv libtool pkgconfig cmake curl`}
                    </Code>
                    
                    <Text fontWeight="bold" mb={2}>2. Install Node.js 20.x:</Text>
                    <Code p={4} borderRadius="md" display="block" whiteSpace="pre" my={2}>
{`curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version`}
                    </Code>
                  </TabPanel>
                </TabPanels>
              </Tabs>

              <Heading as="h3" size="md" mb={3}>Installation Steps</Heading>
              <List as="ol" styleType="decimal" spacing={3} ml={5} mb={4}>
                <ListItem>
                  <Text fontWeight="bold">Clone the ScreamRouter repository:</Text>
                  <Code p={4} borderRadius="md" display="block" whiteSpace="pre" my={2}>
{`cd ~
git clone --recurse-submodules -j8 https://github.com/netham45/screamrouter.git`}
                  </Code>
                </ListItem>
                
                <ListItem>
                  <Text fontWeight="bold">Set up Python virtual environment and install requirements:</Text>
                  <Code p={4} borderRadius="md" display="block" whiteSpace="pre" my={2}>
{`cd ~/screamrouter
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt`}
                  </Code>
                </ListItem>
                
                <ListItem>
                  <Text fontWeight="bold">Build C utilities:</Text>
                  <Code p={4} borderRadius="md" display="block" whiteSpace="pre" my={2}>
{`cd ~/screamrouter/c_utils
./build.sh`}
                  </Code>
                </ListItem>
                
                <ListItem>
                  <Text fontWeight="bold">Build the frontend (React UI):</Text>
                  <Code p={4} borderRadius="md" display="block" whiteSpace="pre" my={2}>
{`cd ~/screamrouter/screamrouter-react
npm install
npm run build`}
                  </Code>
                </ListItem>
                
                <ListItem>
                  <Text fontWeight="bold">Generate a certificate for HTTPS:</Text>
                  <Code p={4} borderRadius="md" display="block" whiteSpace="pre" my={2}>
{`mkdir -p ~/screamrouter/cert
openssl req -new -newkey rsa:4096 -days 365 -nodes -x509 \\
  -subj "/C=US/ST=State/L=City/O=Organization/CN=example.com" \\
  -keyout ~/screamrouter/cert/privkey.pem -out ~/screamrouter/cert/cert.pem`}
                  </Code>
                </ListItem>
                
                <ListItem>
                  <Text fontWeight="bold">Create a systemd service file:</Text>
                  <Code p={4} borderRadius="md" display="block" whiteSpace="pre" my={2}>
{`sudo tee /etc/systemd/system/screamrouter.service > /dev/null << EOL
[Unit]
Description=ScreamRouter Audio Streaming Service
After=network.target

[Service]
Type=simple
User=$(whoami)
WorkingDirectory=/home/$(whoami)/screamrouter
ExecStart=/home/$(whoami)/screamrouter/venv/bin/python /home/$(whoami)/screamrouter/screamrouter.py
Restart=on-failure
RestartSec=5
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
EOL`}
                  </Code>
                </ListItem>
                
                <ListItem>
                  <Text fontWeight="bold">Enable and start the service:</Text>
                  <Code p={4} borderRadius="md" display="block" whiteSpace="pre" my={2}>
{`sudo systemctl daemon-reload
sudo systemctl enable screamrouter.service
sudo systemctl start screamrouter.service
sudo systemctl status screamrouter.service  # Check if the service is running properly`}
                  </Code>
                </ListItem>
              </List>
              
              <Alert status="info" borderRadius="md" mb={4}>
                <AlertIcon />
                After installation, you can access the ScreamRouter web interface by opening a web browser and navigating to the host over HTTPS.
              </Alert>
            </DocSection>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default ScreamRouterInstall;