import React from 'react';
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  SimpleGrid,
  Icon,
  useColorModeValue,
  Stack,
  Flex,
  Divider,
  Badge,
  Link,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  IconButton
} from '@chakra-ui/react';
import { 
  FaWindows, 
  FaLinux, 
  FaRaspberryPi, 
  FaDocker, 
  FaDownload, 
  FaGithub,
  FaMicrochip,
  FaChrome,
  FaHome,
  FaBook
} from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

const DownloadCard = ({ title, icon, description, version, link, githubLink, docLink, stable }) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const docBtnColor = useColorModeValue('blue.500', 'blue.300');

  return (
    <Box
      maxW={'330px'}
      w={'full'}
      bg={cardBg}
      boxShadow={'md'}
      rounded={'lg'}
      p={6}
      textAlign={'center'}
      borderWidth="1px"
      borderColor={borderColor}
    >
      <Icon as={icon} w={10} h={10} color="brand.500" mb={4} />
      <Heading fontSize={'2xl'} fontFamily={'body'}>
        {title}
      </Heading>
      {stable ? (
        <Badge colorScheme="green" my={2}>
          Stable
        </Badge>
      ) : (
        <Badge colorScheme="orange" my={2}>
          Beta
        </Badge>
      )}
      <Text fontWeight={600} color={'gray.500'} mb={4}>
        v{version}
      </Text>
      <Text
        textAlign={'center'}
        color={useColorModeValue('gray.700', 'gray.400')}
        px={3}
        height="100px"
        overflow="hidden"
      >
        {description}
      </Text>

      <Stack mt={8} direction={'row'} spacing={2} justifyContent="center">
        <IconButton
          flex={1}
          fontSize={'sm'}
          rounded={'full'}
          bg={'brand.500'}
          color={'white'}
          boxShadow={'md'}
          _hover={{
            bg: 'brand.600',
          }}
          _focus={{
            bg: 'brand.600',
          }}
          as="a"
          href={link}
          icon={<FaDownload />}
        />
        <Button
          flex={1}
          fontSize={'sm'}
          rounded={'full'}
          variant="outline"
          as="a"
          href={githubLink}
          target="_blank"
          leftIcon={<FaGithub />}
        >
          Source
        </Button>
        {docLink && (
          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            color={docBtnColor}
            variant="outline"
            as={RouterLink}
            to={docLink}
            leftIcon={<FaBook />}
          >
            Docs
          </Button>
        )}
      </Stack>
    </Box>
  );
};

function Downloads() {
  const mainDownloads = [
    {
      title: 'Docker',
      icon: FaDocker,
      description: 'Official Docker image for easy deployment in containerized environments with minimal setup.',
      version: '1.0.0',
      link: 'https://hub.docker.com/r/netham45/screamrouter',
      githubLink: 'https://github.com/netham45/screamrouter',
      docLink: '/docs/install-screamrouter',
      stable: true
    },
    {
      title: 'Debian/Linux',
      icon: FaLinux,
      description: 'ScreamRouter for Debian-based Linux distributions with web interface and command-line tools.',
      version: '1.0.0',
      link: 'https://github.com/netham45/screamrouter/releases/latest',
      githubLink: 'https://github.com/netham45/screamrouter',
      docLink: '/docs/install-screamrouter',
      stable: true
    }
  ];
  
  const receiverDownloads = [
    {
      title: 'ESP32 Receiver',
      icon: FaMicrochip,
      description: 'ESP32 firmware that turns microcontrollers into wireless audio streaming devices with USB or SPDIF output.',
      version: '1.0.0',
      link: '/esp32-flasher',
      githubLink: 'https://github.com/netham45/esp32-scream-receiver',
      docLink: '/docs/install-esp32',
      stable: true
    },
    {
      title: 'Windows Receiver',
      icon: FaWindows,
      description: 'Windows Scream Receiver for playing Scream audio streams through Windows audio devices.',
      version: '1.0.0',
      link: 'https://github.com/netham45/windows-scream-receiver/releases/latest',
      githubLink: 'https://github.com/netham45/windows-scream-receiver',
      docLink: '/docs/install-windows-receiver',
      stable: true
    },
    {
      title: 'Raspberry Pi Receiver',
      icon: FaRaspberryPi,
      description: 'Turn your Raspberry Pi into a networked audio receiver with PulseAudio, ALSA or JACK output.',
      version: '1.0.0',
      link: 'https://github.com/duncanthrax/scream/releases/latest',
      githubLink: 'https://github.com/duncanthrax/scream',
      docLink: '/docs/install-linux-receiver',
      stable: true
    }
  ];
  
  const senderDownloads = [
    {
      title: 'Windows Sender',
      icon: FaWindows,
      description: 'Windows Scream Sender for capturing audio from Windows and sending it to ScreamRouter.',
      version: '1.0.0',
      link: 'https://github.com/netham45/windows-scream-sender/releases/latest',
      githubLink: 'https://github.com/netham45/windows-scream-sender',
      docLink: '/docs/install-windows-sender',
      stable: true
    },
    {
      title: 'Raspberry Pi Zero Sender',
      icon: FaRaspberryPi,
      description: 'Turn a Raspberry Pi Zero into a USB audio device that forwards audio to ScreamRouter.',
      version: '1.0.0',
      link: 'https://github.com/netham45/screamsender/releases/latest',
      githubLink: 'https://github.com/netham45/screamsender',
      docLink: '/docs/install-rpi-sender',
      stable: true
    },
    {
      title: 'ESP32 USB Sender',
      icon: FaMicrochip,
      description: 'Part of the ESP32S3 USB Receiver. The ESP32-S3 can capture USB audio from PlayStation 4/5, Nintendo Switch, and other devices.',
      version: '1.0.0',
      link: '/esp32-flasher',
      githubLink: 'https://github.com/netham45/esp32-scream-receiver',
      docLink: '/docs/install-esp32',
      stable: true
    }
  ];

  const addOns = [
    {
      title: 'Windows App',
      icon: FaWindows,
      description: 'Remote interface for ScreamRouter that sits in the notification area like a web browser. It provides a desktop interface with global media key support but is not the full ScreamRouter.',
      version: '1.0.0',
      link: 'https://github.com/netham45/screamrouter-windows-desktop/releases/latest',
      githubLink: 'https://github.com/netham45/screamrouter-windows-desktop/',
      docLink: '/docs/install-windows-app',
      stable: true
    },
    {
      title: 'Home Assistant Integration',
      icon: FaHome,
      description: 'Control ScreamRouter directly from Home Assistant with custom component integration.',
      version: '1.0.0',
      link: 'https://github.com/netham45/screamrouter_ha_component/releases/latest',
      githubLink: 'https://github.com/netham45/screamrouter_ha_component',
      docLink: '/docs/homeassistant',
      stable: true
    }
  ];

  return (
    <Container maxW={'7xl'} py={10}>
      <Stack spacing={10}>
        <Box textAlign="center">
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '2xl' }}
          >
            <Text as={'span'}>
              Download ScreamRouter
            </Text>
          </Heading>
          <Text
            color={useColorModeValue('gray.500', 'gray.200')}
            maxW={'3xl'}
            mx="auto"
            mt={5}
          >
            Download ScreamRouter and its components for your platform. All downloads are free and open source.
            For installation instructions, please refer to the documentation.
          </Text>
        </Box>

        <Divider />
        
        <Box>
          <Heading as="h2" size="lg" mb={6}>
            ScreamRouter Server
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} justifyItems="center">
            {mainDownloads.map((download, index) => (
              <DownloadCard key={index} {...download} />
            ))}
          </SimpleGrid>
        </Box>
        
        <Divider />
        
        <Accordion allowToggle defaultIndex={[0]}>
          <AccordionItem>
            <h2>
              <AccordionButton py={4}>
                <Box flex="1" textAlign="left">
                  <Heading as="h2" size="lg">
                    Receivers (Audio Output Devices)
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text mb={6}>
                Receivers are devices that can play audio from ScreamRouter. Install these on the devices where you want audio output.
              </Text>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} justifyItems="center">
                {receiverDownloads.map((download, index) => (
                  <DownloadCard key={index} {...download} />
                ))}
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton py={4}>
                <Box flex="1" textAlign="left">
                  <Heading as="h2" size="lg">
                    Senders (Audio Input Devices)
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text mb={6}>
                Senders are devices that capture audio and send it to ScreamRouter. Install these on the devices where you want audio input.
              </Text>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} justifyItems="center">
                {senderDownloads.map((download, index) => (
                  <DownloadCard key={index} {...download} />
                ))}
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton py={4}>
                <Box flex="1" textAlign="left">
                  <Heading as="h2" size="lg">
                    Add-ons & Integrations
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text mb={6}>
                Enhance your ScreamRouter setup with these add-ons and integrations.
              </Text>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} justifyItems="center">
                {addOns.map((download, index) => (
                  <DownloadCard key={index} {...download} />
                ))}
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        
        <Divider />
        
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Configuration Guides
          </Heading>
          <Text mb={4}>
            Set up audio streaming and sources with these configuration guides.
          </Text>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <Button 
              size="lg" 
              width="100%" 
              leftIcon={<FaBook />} 
              colorScheme="blue" 
              variant="outline"
              as={RouterLink}
              to="/docs/rtp-configuration"
            >
              RTP Audio Streaming
            </Button>
            <Button 
              size="lg" 
              width="100%" 
              leftIcon={<FaBook />} 
              colorScheme="blue" 
              variant="outline"
              as={RouterLink}
              to="/docs/configuration"
            >
              General Configuration
            </Button>
          </SimpleGrid>
        </Box>
        
        <Divider />
        
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Docker Sources
          </Heading>
          <Text mb={4}>
            These Docker containers run audio streaming applications and output audio as RTP streams, which can then be processed by ScreamRouter.
          </Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <Button 
              size="lg" 
              width="100%" 
              leftIcon={<FaBook />} 
              colorScheme="blue" 
              variant="outline"
              as={RouterLink}
              to="/docs/docker-sources"
            >
              Docker Sources Guide
            </Button>
            <Link href="https://github.com/netham45/screamrouter-amazon-music-docker" isExternal>
              <Button size="lg" width="100%" leftIcon={<FaDocker />} variant="outline">
                Amazon Music Docker
              </Button>
            </Link>
            <Link href="https://github.com/netham45/screamrouter-spotify-docker" isExternal>
              <Button size="lg" width="100%" leftIcon={<FaDocker />} variant="outline">
                Spotify Docker
              </Button>
            </Link>
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mt={4}>
            <Link href="https://github.com/netham45/screamrouter-firefox-docker" isExternal>
              <Button size="lg" width="100%" leftIcon={<FaDocker />} variant="outline">
                Firefox Docker
              </Button>
            </Link>
          </SimpleGrid>
        </Box>
        
        <Divider />

      </Stack>
    </Container>
  );
}

export default Downloads;