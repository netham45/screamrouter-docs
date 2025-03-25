import React from 'react';
import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { FaGithub, FaDiscord } from 'react-icons/fa';

const SocialButton = ({ children, label, href }) => {
  return (
    <Link
      href={href}
      isExternal
      _hover={{
        color: 'brand.500',
      }}
      aria-label={label}
      fontSize="lg"
      mr={4}
    >
      {children}
    </Link>
  );
};

function Footer() {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      mt="auto"
      boxShadow="0 -1px 2px rgba(0, 0, 0, 0.05)"
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        spacing={4}
      >
        <Divider />
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Text>© {new Date().getFullYear()} ScreamRouter. All rights reserved</Text>
          <Stack direction={'row'} spacing={6} mt={{ base: 2, md: 0 }}>
            <SocialButton label={'GitHub'} href={'https://github.com/netham45/screamrouter'}>
              <FaGithub />
            </SocialButton>
            <SocialButton label={'Discord'} href={'https://discord.gg/EXhF6pBhXT'}>
              <FaDiscord />
            </SocialButton>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
}

export default Footer;
