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
import { FaChevronDown, FaChevronUp, FaGithub, FaInfoCircle, FaExclamationTriangle, FaCheckCircle, FaUsb, FaMicrochip } from 'react-icons/fa';
import { InstallButton } from 'esp-web-tools/dist/web/install-button';
import JSZip from 'jszip';

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
  const [isCompatibleBrowser, setIsCompatibleBrowser] = useState(true);
  
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
  const successBg = useColorModeValue('green.50', 'green.900');
  const successBorderColor = useColorModeValue('green.200', 'green.700');

  // Define variant - ESP32-S3 binary with both USB and SPDIF support
  const variants = {
    'esp32s3-firmware': {
      name: 'ESP32-S3 Audio Firmware',
      description: 'Supports both USB and SPDIF output modes',
      manifestUrl: '/esp32s3-metadata.json',
      paths: {
        'bootloader.bin': 'build/bootloader/bootloader.bin',
        'partition-table.bin': 'build/partition_table/partition-table.bin',
        'ota_data_initial.bin': 'build/ota_data_initial.bin',
        'esp32-rtp.bin': 'build/esp32-rtp.bin'
      }
    }
  };

  useEffect(() => {
    // Check browser compatibility
    const userAgent = navigator.userAgent.toLowerCase();
    const isChrome = userAgent.includes('chrome') && !userAgent.includes('edg');
    const isEdge = userAgent.includes('edg');
    setIsCompatibleBrowser(isChrome || isEdge);
    
    loadReleases();
  }, []);

  const loadReleases = async () => {
    try {
      const response = await fetch('https://netham45.org/esp32-scream-receiver/proxy.php?url=' +
        encodeURIComponent('https://api.github.com/repos/netham45/esp32-rtp/releases'));
      
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

  // Download and prepare firmware for flashing
  const downloadFirmware = async (variantKey, releaseIndex) => {
    const release = releases[releaseIndex];
    const variantId = `${variantKey}-${releaseIndex}`;
    const statusElement = document.getElementById(`${variantId}-status`);
    const downloadBtn = document.getElementById(`${variantId}-download`);
    const installBtn = document.getElementById(`${variantId}-button-container`);
    const installButton = document.getElementById(`${variantId}-button`);
    
    if (statusElement) statusElement.textContent = 'Downloading firmware...';
    if (downloadBtn) downloadBtn.disabled = true;
    
    try {
      // Get the commit hash from the tag name
      const commitHash = release.tag_name.replace('build-', '');
      
      // Find the firmware asset - try both naming conventions
      const asset = release.assets.find(a =>
        a.name === `esp32s3-unified-${commitHash}.zip` ||
        a.name === `esp32s3-firmware-${commitHash}.zip`
      );
      
      if (!asset) {
        throw new Error('Firmware asset not found in release');
      }
      
      // Download the ZIP file through the proxy
      const proxyUrl = 'https://netham45.org/esp32-scream-receiver/proxy.php?url=' +
        encodeURIComponent(asset.browser_download_url);
      
      if (statusElement) statusElement.textContent = 'Downloading ZIP archive...';
      
      const response = await fetch(proxyUrl);
      if (!response.ok) {
        throw new Error(`Failed to download firmware: ${response.status} ${response.statusText}`);
      }
      
      const zipData = await response.arrayBuffer();
      
      if (statusElement) statusElement.textContent = 'Extracting firmware files...';
      
      // Extract the ZIP file
      const zip = new JSZip();
      const zipContent = await zip.loadAsync(zipData);
      
      // Extract the required files from the correct paths in the ZIP
      const files = {
        'bootloader.bin': await zipContent.file('firmware/bootloader/bootloader.bin')?.async('blob'),
        'partition-table.bin': await zipContent.file('firmware/partition_table/partition-table.bin')?.async('blob'),
        'ota_data_initial.bin': await zipContent.file('firmware/ota_data_initial.bin')?.async('blob'),
        'esp32-rtp.bin': await zipContent.file('firmware/esp32-rtp.bin')?.async('blob')
      };
      
      // Check if all files were extracted successfully
      for (const [name, blob] of Object.entries(files)) {
        if (!blob) {
          throw new Error(`Failed to extract ${name} from ZIP archive`);
        }
      }
      
      // Create object URLs for the extracted files
      const fileUrls = {};
      for (const [name, blob] of Object.entries(files)) {
        fileUrls[name] = URL.createObjectURL(blob);
      }
      
      // Create a custom manifest with the blob URLs
      const customManifest = {
        name: "ESP32-S3 RTP Audio Device",
        version: "1.0",
        builds: [
          {
            chipFamily: "ESP32-S3",
            parts: [
              { path: fileUrls['bootloader.bin'], offset: 0 },
              { path: fileUrls['partition-table.bin'], offset: 32768 },
              { path: fileUrls['ota_data_initial.bin'], offset: 36864 },
              { path: fileUrls['esp32-rtp.bin'], offset: 65536 }
            ],
            flashMode: "dio",
            flashFreq: "80m",
            flashSize: "4MB"
          }
        ]
      };
      
      // Create a blob URL for the manifest
      const manifestBlob = new Blob([JSON.stringify(customManifest)], { type: 'application/json' });
      const manifestUrl = URL.createObjectURL(manifestBlob);
      
      // Update the install button with the custom manifest
      if (installButton) {
        installButton.setAttribute('manifest', manifestUrl);
      }
      
      if (statusElement) statusElement.textContent = 'Ready to flash!';
      if (downloadBtn) downloadBtn.style.display = 'none';
      if (installBtn) installBtn.style.display = 'block';
      
      toast({
        title: 'Firmware ready',
        description: 'Firmware extracted and ready to flash to your device',
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
        <Heading as="h1" mb={4}>
          <Icon as={FaMicrochip} mr={2} />
          ESP32-S3 Audio Firmware Flasher
        </Heading>
        <Text fontSize="lg" color="gray.600" maxW="800px" mx="auto">
          Flash your ESP32-S3 device with RTP audio streaming firmware directly from your browser.
          This firmware supports both USB and SPDIF audio output modes.
        </Text>
      </Box>

      {/* Browser compatibility warning - only show for non-Chrome/Edge browsers */}
      {!isCompatibleBrowser && (
        <Alert status="warning" mb={6} borderRadius="md">
          <AlertIcon />
          <Box>
            <Text fontWeight="bold">Browser Compatibility Notice</Text>
            <Text fontSize="sm">
              For the best experience, we recommend using Chrome or Edge browsers which have full WebUSB support.
              Other browsers may require additional configuration or may not work at all.
            </Text>
          </Box>
        </Alert>
      )}
      
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
                <Heading as="h2" size="md">
                  <Icon as={FaInfoCircle} mr={2} />
                  Quick Start Guide
                </Heading>
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
                  <Heading as="h3" size="sm" mb={3}>
                    <Icon as={FaCheckCircle} mr={2} />
                    Easy Step-by-Step Instructions
                  </Heading>
                  <OrderedList spacing={4}>
                    <ListItem>
                      <Flex align="start">
                        <Icon as={FaUsb} mt={1} mr={2} color="green.500" />
                        <Box>
                          <Text fontWeight="medium">Connect your ESP32-S3 to your computer</Text>
                          <Text fontSize="sm" color="gray.600" mt={1}>
                            Use a USB data cable (not a charge-only cable). The device should appear as a serial port.
                          </Text>
                        </Box>
                      </Flex>
                    </ListItem>
                    
                    <ListItem>
                      <Text fontWeight="medium">Enter Firmware Download Mode</Text>
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
                          <Text fontWeight="bold">Simple Boot Mode Instructions</Text>
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
                      <Text fontWeight="medium">Download the firmware package</Text>
                      <Text fontSize="sm" color="gray.600" mt={1}>
                        Click "Download Firmware" below. The firmware supports both USB and SPDIF audio output -
                        you can choose your preferred mode after installation.
                      </Text>
                    </ListItem>
                    
                    <ListItem>
                      <Text fontWeight="medium">Flash the firmware</Text>
                      <Text fontSize="sm" color="gray.600" mt={1}>
                        Click "Install Firmware" and follow the on-screen prompts. The process takes about 1-2 minutes.
                      </Text>
                    </ListItem>
                    
                    <ListItem>
                      <Text fontWeight="medium">All done! Reset your device</Text>
                      <Text fontSize="sm" color="gray.600" mt={1}>
                        Press the Reset button or unplug and reconnect USB. Your device is now ready to stream audio!
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
                  <Heading as="h3" size="sm" mb={3}>
                    <Icon as={FaExclamationTriangle} mr={2} />
                    Common Issues & Solutions
                  </Heading>
                  <UnorderedList spacing={2}>
                    <ListItem>
                      <Text fontWeight="medium">Device not detected?</Text>
                      <Text fontSize="sm">
                        Try a different USB cable or port. Some cables are charge-only.
                        Windows users may need to install CP210x or CH340 drivers.
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text fontWeight="medium">Flashing fails?</Text>
                      <Text fontSize="sm">
                        Make sure you're in Download Mode (hold BOOT while pressing RESET).
                        The timing matters - hold BOOT for a second after releasing RESET.
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text fontWeight="medium">Still having trouble?</Text>
                      <Text fontSize="sm">
                        Some boards auto-enter download mode. Try flashing without pressing any buttons first.
                        If that doesn't work, follow the manual boot mode steps above.
                      </Text>
                    </ListItem>
                  </UnorderedList>
                </Box>
                
                <Box
                  p={4}
                  bg={successBg}
                  borderRadius="md"
                  borderWidth="1px"
                  borderColor={successBorderColor}
                >
                  <Heading as="h3" size="sm" mb={3}>
                    <Icon as={FaCheckCircle} mr={2} />
                    After Installation
                  </Heading>
                  <Text fontSize="sm" mb={2}>
                    Once your device is flashed and reset, it will:
                  </Text>
                  <UnorderedList spacing={2} fontSize="sm" pl={4}>
                    <ListItem>Create a WiFi hotspot for initial configuration</ListItem>
                    <ListItem>Allow you to choose between USB or SPDIF audio output</ListItem>
                    <ListItem>Let you configure network settings and audio preferences</ListItem>
                    <ListItem>Start streaming audio from your configured sources</ListItem>
                  </UnorderedList>
                  <Text fontSize="sm" mt={3}>
                    <strong>Tip:</strong> The device's web interface is accessible at its IP address once connected to your network. If you open the console this website provides you can see the IP it is connected with. 
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
      
      <Heading as="h2" size="md" mb={4}>
        <Icon as={FaGithub} mr={2} />
        Available Firmware Versions
      </Heading>
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
                    Version {commitHash.substring(0, 7)}
                  </Heading>
                  {index === 0 && (
                    <Badge ml={2} colorScheme="green">Latest</Badge>
                  )}
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
                      <Flex justify="space-between" align="start" mb={3}>
                        <Box>
                          <Heading as="h3" size="sm">
                            {variant.name}
                          </Heading>
                          <Text fontSize="xs" color="gray.500" mt={1}>
                            {variant.description}
                          </Text>
                        </Box>
                      </Flex>
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
                          leftIcon={<Icon as={FaChevronDown} />}
                        >
                          Download Firmware
                        </Button>
                        <Box 
                          id={`${key}-${index}-button-container`}
                          style={{display: 'none'}}
                        >
                          <esp-web-install-button
                            manifest={variant.manifestUrl}
                            id={`${key}-${index}-button`}
                          >
                            <Button colorScheme="green" size="sm" leftIcon={<Icon as={FaMicrochip} />}>
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
                        What's New
                      </Heading>
                      <Text fontSize="sm" mb={2}>
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