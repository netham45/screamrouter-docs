import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  OrderedList,
  ListItem,
  Button,
  Flex,
  Stack,
  useToast,
  Alert,
  AlertIcon,
  useColorModeValue,
  Icon,
  Badge,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Image,
  UnorderedList
} from '@chakra-ui/react';
import { FaChevronDown, FaChevronUp, FaGithub, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';
import { InstallButton } from 'esp-web-tools/dist/web/install-button';

// Register custom element for ESPInstallButton
// This needs to be done outside the component to avoid multiple registrations
if (typeof window !== 'undefined' && !customElements.get('esp-web-install-button')) {
  customElements.define('esp-web-install-button', InstallButton);
}

const ESP32Flasher = () => {
  const [releases, setReleases] = useState([]);
  const [error, setError] = useState(null);
  const toast = useToast();
  const [expandedReleases, setExpandedReleases] = useState([0]); // Start with first release expanded
  
  // Colors
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const headerBg = useColorModeValue('gray.50', 'gray.800');
  const hoverHeaderBg = useColorModeValue('gray.100', 'gray.700');
  const variantBg = useColorModeValue('gray.50', 'gray.800');
  const infoBg = useColorModeValue('blue.50', 'blue.900');
  const infoBorderColor = useColorModeValue('blue.200', 'blue.700');
  const tipBg = useColorModeValue('purple.50', 'purple.900');
  const tipBorderColor = useColorModeValue('purple.200', 'purple.700');

  // Define variants
  const variants = {
    'esp32-spdif': { 
      name: 'ESP32 SPDIF',
      manifestUrl: '/esp32-metadata.json',
      paths: {
        'bootloader.bin': 'firmware-esp32_spdif/bootloader/bootloader.bin',
        'partition-table.bin': 'firmware-esp32_spdif/partition_table/partition-table.bin',
        'firmware.bin': 'firmware-esp32_spdif/usb_audio_player.bin'
      }
    },
    'esp32s3-spdif': { 
      name: 'ESP32-S3 SPDIF',
      manifestUrl: '/esp32s3-metadata.json',
      paths: {
        'bootloader.bin': 'firmware-esp32s3_spdif/bootloader/bootloader.bin',
        'partition-table.bin': 'firmware-esp32s3_spdif/partition_table/partition-table.bin',
        'firmware.bin': 'firmware-esp32s3_spdif/usb_audio_player.bin'
      }
    },
    'esp32s3-usb': { 
      name: 'ESP32-S3 USB',
      manifestUrl: '/esp32s3-metadata.json',
      paths: {
        'bootloader.bin': 'firmware-esp32s3_usb/bootloader/bootloader.bin',
        'partition-table.bin': 'firmware-esp32s3_usb/partition_table/partition-table.bin',
        'firmware.bin': 'firmware-esp32s3_usb/usb_audio_player.bin'
      }
    }
  };

  useEffect(() => {
    loadReleases();
  }, []);

  const loadReleases = async () => {
    try {
      const response = await fetch('https://netham45.org/esp32-scream-receiver/proxy.php?url=' + 
        encodeURIComponent('https://api.github.com/repos/netham45/esp32-scream-receiver/releases'));
      
      if (!response.ok) {
        throw new Error(`Failed to fetch releases: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Sort releases by publish date, newest first
      data.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
      setReleases(data);
    } catch (error) {
      console.error('Error loading releases:', error);
      setError(error.message);
      toast({
        title: 'Error loading releases',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const toggleRelease = (index) => {
    setExpandedReleases(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  // This would be implemented with JSZip in a real environment
  const downloadFirmware = async (variantKey, releaseIndex) => {
    // In a real implementation, this would download and process the ZIP file
    // For now, we'll just simulate the behavior
    const variantId = `${variantKey}-${releaseIndex}`;
    const statusElement = document.getElementById(`${variantId}-status`);
    const downloadBtn = document.getElementById(`${variantId}-download`);
    const installBtn = document.getElementById(`${variantId}-button-container`);
    
    if (statusElement) statusElement.textContent = 'Downloading firmware...';
    if (downloadBtn) downloadBtn.disabled = true;
    
    try {
      // Simulate download delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (statusElement) statusElement.textContent = 'Ready to flash!';
      if (downloadBtn) downloadBtn.style.display = 'none';
      if (installBtn) installBtn.style.display = 'block';
      
      toast({
        title: 'Firmware downloaded',
        description: 'Ready to flash to your device',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error downloading firmware:', error);
      if (statusElement) statusElement.textContent = `Error: ${error.message}`;
      if (downloadBtn) downloadBtn.disabled = false;
      
      toast({
        title: 'Download failed',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="4xl" py={10}>
      <Box textAlign="center" mb={6}>
        <Heading as="h1" mb={4}>ESP32 Scream Sender/Receiver Flasher</Heading>
        <Text fontSize="lg" color="gray.600" maxW="800px" mx="auto">
          Flash your ESP32 or ESP32-S3 device with Scream audio streaming firmware directly from your browser. 
        </Text>
      </Box>
      
      <Box mb={8}>
        <Accordion allowToggle defaultIndex={[0]}>
          <AccordionItem border="none">
            <AccordionButton 
              bg={headerBg} 
              _hover={{ bg: hoverHeaderBg }}
              borderRadius="md"
              mb={2}
            >
              <Box flex="1" textAlign="left">
                <Heading as="h2" size="md">Flashing Instructions</Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Stack spacing={4}>
                <Box 
                  p={4} 
                  bg={useColorModeValue('green.50', 'green.900')} 
                  borderRadius="md"
                  borderWidth="1px"
                  borderColor={useColorModeValue('green.200', 'green.700')}
                >
                  <Heading as="h3" size="sm" mb={3}>Step-by-Step Flashing Guide</Heading>
                  <OrderedList spacing={4}>
                    <ListItem>
                      <Text fontWeight="medium">Connect your ESP32 device to your computer via USB</Text>
                      <Text fontSize="sm" color="gray.600" mt={1}>
                        Use a data-capable USB cable. Some cables are charge-only and won't work for flashing.
                      </Text>
                    </ListItem>
                    
                    <ListItem>
                      <Text fontWeight="medium">Put your ESP32 into Download Mode</Text>
                      <Box 
                        bg={infoBg} 
                        p={3} 
                        borderRadius="md" 
                        borderWidth="1px" 
                        borderColor={infoBorderColor}
                        mt={2}
                      >
                        <Flex align="center" mb={2}>
                          <Icon as={FaInfoCircle} mr={2} color="blue.500" />
                          <Text fontWeight="bold">How to enter Firmware Download Mode</Text>
                        </Flex>
                        <OrderedList pl={6} spacing={2} fontSize="sm">
                          <ListItem>Press and hold the BOOT button (sometimes labeled IO0)</ListItem>
                          <ListItem>While holding BOOT, press and release the RESET button (or disconnect and reconnect USB)</ListItem>
                          <ListItem>After resetting, release the BOOT button</ListItem>
                        </OrderedList>
                        
                        <Box mt={3}>
                          <Text fontSize="sm">
                            <strong>Note:</strong> If your board doesn't have dedicated BOOT and RESET buttons, 
                            you'll need to temporarily connect GPIO0 to GND while powering on or resetting the board.
                          </Text>
                        </Box>
                      </Box>
                    </ListItem>
                    
                    <ListItem>
                      <Text fontWeight="medium">Select and download your firmware variant</Text>
                      <Text fontSize="sm" color="gray.600" mt={1}>
                        Choose the correct variant below based on your ESP32 model and desired output type.
                      </Text>
                    </ListItem>
                    
                    <ListItem>
                      <Text fontWeight="medium">Click "Install Firmware" when ready</Text>
                      <Text fontSize="sm" color="gray.600" mt={1}>
                        The ESP Web Installer will guide you through connecting and flashing your device.
                      </Text>
                    </ListItem>
                    
                    <ListItem>
                      <Text fontWeight="medium">After flashing is complete, reset your device</Text>
                      <Text fontSize="sm" color="gray.600" mt={1}>
                        Press the Reset button or disconnect and reconnect the USB cable.
                      </Text>
                    </ListItem>
                  </OrderedList>
                </Box>
                
                <Box 
                  p={4} 
                  bg={tipBg} 
                  borderRadius="md"
                  borderWidth="1px"
                  borderColor={tipBorderColor}
                >
                  <Heading as="h3" size="sm" mb={3}>Troubleshooting Tips</Heading>
                  <UnorderedList spacing={2}>
                    <ListItem>
                      <Text fontWeight="medium">Connection Issues</Text>
                      <Text fontSize="sm">
                        If your device isn't detected, try a different USB cable or port. Make sure 
                        you have the correct drivers installed for your ESP32 board.
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text fontWeight="medium">Download Mode</Text>
                      <Text fontSize="sm">
                        If flashing fails, ensure your device is properly in Download Mode by following 
                        the boot mode instructions carefully. The timing can be important.
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text fontWeight="medium">Browser Compatibility</Text>
                      <Text fontSize="sm">
                        The ESP Web Installer works best with Chrome, Edge, and browsers that support WebUSB. 
                        If using Firefox, you'll need to enable the "dom.usb.enabled" flag in about:config.
                      </Text>
                    </ListItem>
                  </UnorderedList>
                </Box>
                <Box mt={3}>
                  <Flex align="center" mb={2}>
                    <Icon as={FaInfoCircle} mr={2} color="blue.500" />
                    <Text fontWeight="bold">USB Sender/Receiver</Text>
                  </Flex>
                  <Text fontSize="sm">
                    <strong>Note:</strong> The USB Sender and Receiver are in the same image. Sender mode can be configured through the web interface once flashed.
                  </Text>
                </Box>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
      
      {error && (
        <Alert status="error" mb={6}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      
      <Heading as="h2" size="md" mb={4}>Available Firmware</Heading>
      <Stack spacing={4}>
        {releases.map((release, index) => {
          const isExpanded = expandedReleases.includes(index);
          const releaseDate = new Date(release.published_at).toLocaleString();
          const commitHash = release.tag_name.replace('build-', '');
          const changelogUrl = release.body?.match(/https:\/\/github\.com\/.*?compare\/.*?\.\.\.(.+?)(?:\s|$)/)?.[0];
          const fromCommit = changelogUrl?.match(/compare\/(.+?)\.\.\./)?.["1"]?.replace('build-', '');
          const toCommit = commitHash;
          const changelogText = fromCommit ? 
            `Changes from ${fromCommit} to ${toCommit}` : 
            'Initial release';
            
          return (
            <Box 
              key={index} 
              borderWidth="1px" 
              borderRadius="lg" 
              borderColor={borderColor}
              mb={4}
              overflow="hidden"
            >
              <Flex
                p={4}
                bg={headerBg}
                justifyContent="space-between"
                alignItems="center"
                onClick={() => toggleRelease(index)}
                cursor="pointer"
                _hover={{ bg: hoverHeaderBg }}
              >
                <Flex alignItems="center">
                  <Heading as="h2" size="md">
                    Build {commitHash}
                  </Heading>
                  <Text ml={3} color="gray.500" fontSize="sm">
                    {releaseDate}
                  </Text>
                </Flex>
                <Icon as={isExpanded ? FaChevronUp : FaChevronDown} />
              </Flex>
              
              {isExpanded && (
                <Box p={4} bg={cardBg}>
                  {Object.entries(variants).map(([key, variant]) => (
                    <Box 
                      key={key}
                      mb={4}
                      p={4}
                      borderWidth="1px"
                      borderRadius="md"
                      borderColor={borderColor}
                      bg={variantBg}
                    >
                      <Heading as="h3" size="sm" mb={3}>
                        {variant.name}
                      </Heading>
                      <Flex alignItems="center" flexWrap="wrap" gap={4}>
                        <Badge
                          id={`${key}-${index}-status`}
                          px={3}
                          py={1}
                          borderRadius="full"
                          colorScheme="blue"
                        >
                          Ready
                        </Badge>
                        <Button
                          id={`${key}-${index}-download`}
                          colorScheme="blue"
                          onClick={() => downloadFirmware(key, index)}
                          size="sm"
                        >
                          Download {commitHash}
                        </Button>
                        <Box 
                          id={`${key}-${index}-button-container`}
                          style={{display: 'none'}}
                        >
                          <esp-web-install-button
                            manifest={variant.manifestUrl}
                            id={`${key}-${index}-button`}
                          >
                            <Button colorScheme="green" size="sm">
                              Install Firmware
                            </Button>
                          </esp-web-install-button>
                        </Box>
                      </Flex>
                    </Box>
                  ))}
                  
                  {release.body && (
                    <Box mt={4} pt={4} borderTopWidth="1px" borderColor={borderColor}>
                      <Heading as="h3" size="sm" mb={2}>
                        Changelog
                      </Heading>
                      <Text fontWeight="bold" mb={2}>
                        {changelogText}
                      </Text>
                      {changelogUrl && (
                        <Button
                          as="a"
                          href={changelogUrl}
                          target="_blank"
                          size="sm"
                          leftIcon={<FaGithub />}
                          variant="outline"
                        >
                          View changes on GitHub
                        </Button>
                      )}
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          );
        })}
      </Stack>
    </Container>
  );
};

export default ESP32Flasher;