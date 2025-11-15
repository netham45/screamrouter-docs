import React from 'react';
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  Flex,
  SimpleGrid,
  List,
  ListItem,
  ListIcon,
  Image,
  Link
} from '@chakra-ui/react';
import { FaDownload, FaWindows, FaLinux, FaBook, FaGithub, FaDiscord, FaVolumeUp, FaNetworkWired, FaDesktop, FaMicrochip, FaCheckCircle, FaAndroid } from 'react-icons/fa'; // Import FaAndroid
import { Link as RouterLink } from 'react-router-dom';

const Feature = ({ title, text, icon }) => {
  return (
    <Stack align={'center'} textAlign={'center'}>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'brand.500'}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
    </Stack>
  );
};

function Home() {
  return (
    <Box>
      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 10, md: 20 }}
          justifyContent="center"
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            ScreamRouter <br />
            <Text as={'span'} color={'brand.500'}>
              Whole-House Audio Solution
            </Text>
          </Heading>
          <Text color={'gray.600'} fontSize={'xl'}>
            ScreamRouter is a versatile network audio routing and management system that enables you to stream and control audio across multiple devices. 
            Perfect for whole-house audio, multi-room setups, and custom audio routing solutions.
          </Text>
          <Box my={6}>
            <Link href="/images/screamrouter/ScreamRouter.png">
              <Image src="/images/screamrouter/ScreamRouter.png" alt="ScreamRouter Logo" mx="auto" maxW="80vh" />
            </Link>
          </Box>
          <Box my={6}>
            <Heading as="h1">Creating an Audio Route</Heading>
            <iframe style={{"width": "80vh", "height": "45vh"}} src="https://www.youtube.com/embed/CHLmpD-kiYk?si=EkYC4qfhF_O_H9NP" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </Box>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}
          >
            <Button
              colorScheme={'brand'}
              bg={'brand.500'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'brand.600',
              }}
              as={RouterLink}
              to={'/downloads'}
              leftIcon={<FaDownload />}
            >
              Download Now
            </Button>
            <Button
              variant={'link'}
              colorScheme={'blue'}
              size={'sm'}
              as={RouterLink}
              to={'/docs'}
              leftIcon={<FaBook />}
            >
              Read Documentation
            </Button>
            <Button
              as={'a'}
              href={'https://github.com/netham45/screamrouter'}
              target="_blank"
              variant={'link'}
              colorScheme={'blue'}
              size={'sm'}
              leftIcon={<FaGithub />}
            >
              View on GitHub
            </Button>
            <Button
              as={'a'}
              href={'https://discord.gg/EXhF6pBhXT'}
              target="_blank"
              variant={'link'}
              colorScheme={'blue'}
              size={'sm'}
              leftIcon={<FaDiscord />}
            >
              Join our Discord
            </Button>
          </Stack>
        </Stack>
      </Container>

      <Box p={4} bg={useColorModeValue('gray.50', 'gray.800')}>
        <Container maxW={'6xl'} mt={10}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <Feature
              icon={<Icon as={FaVolumeUp} w={10} h={10} />}
              title={'Audio Routing'}
              text={'Create flexible audio paths between sources and sinks with volume control, and equalization.'}
            />
            <Feature
              icon={<Icon as={FaNetworkWired} w={10} h={10} />}
              title={'Network Streaming'}
              text={'Stream audio wirelessly across your network with support for multiple protocols including Scream and RTP.'}
            />
            <Feature
              icon={<Icon as={FaDesktop} w={10} h={10} />}
              title={'Web Interface'}
              text={'Control your entire audio system through an intuitive web dashboard with visual routing and media controls.'}
            />
          </SimpleGrid>
        </Container>
      </Box>

      <Container maxW={'5xl'} py={12}>
        <Box mb={12}>
          <Heading as="h2" size="xl" mb={6} textAlign="center">
            What Can ScreamRouter Do?
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            <Box>
              <Heading as="h3" size="md" mb={4} color="brand.500">
                For Home Audio Enthusiasts
              </Heading>
              <List spacing={3}>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="brand.500" />
                  Stream audio from any device to any room in your house
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="brand.500" />
                  Group speakers for synchronized whole-house audio
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="brand.500" />
                  Control volume and playback from a single interface
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="brand.500" />
                  Integrate with Home Assistant for smart home control
                </ListItem>
              </List>
            </Box>
            <Box>
              <Heading as="h3" size="md" mb={4} color="brand.500">
                For Audio Professionals
              </Heading>
              <List spacing={3}>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="brand.500" />
                  Route audio between multiple sources and destinations
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="brand.500" />
                  Apply equalization and audio processing on the fly
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="brand.500" />
                  Create complex audio routing scenarios with fine-grained control
                </ListItem>
              </List>
            </Box>
          </SimpleGrid>
        </Box>

        <Box>
          <Heading as="h2" size="xl" mb={6} textAlign="center">
            Supported Platforms
          </Heading>
          {/* Adjust grid columns for better layout */}
          <SimpleGrid columns={{ base: 2, md: 3 }} spacing={10} textAlign="center" justifyItems="center"> 
            <Box>
              <Icon as={FaWindows} w={12} h={12} color="brand.500" mb={2} />
              <Text fontWeight="bold">Windows</Text>
              <Text fontSize="sm">WASAPI input/output/loopback support</Text>
            </Box>
            <Box>
              <Icon as={FaLinux} w={12} h={12} color="brand.500" mb={2} />
              <Text fontWeight="bold">Linux</Text>
              <Text fontSize="sm">Alsa, PulseAudio support</Text>
            </Box>
            <Box>
              <Icon as={FaMicrochip} w={12} h={12} color="brand.500" mb={2} />
              <Text fontWeight="bold">ESP32</Text>
              <Text fontSize="sm">Sender/Reciever</Text>
              <Text fontSize="sm">Sends from PC, PS4/PS5, Switch</Text>
            </Box>
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
}

export default Home;
