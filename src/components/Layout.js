import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout() {
  return (
    <Flex 
      direction="column" 
      minHeight="100vh"
    >
      <Navbar />
      <Box 
        as="main" 
        flex="1" 
        py={8}
        px={[4, 6, 8]}
      >
        <Outlet />
      </Box>
      <Footer />
    </Flex>
  );
}

export default Layout;