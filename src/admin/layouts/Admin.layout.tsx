import React, { Suspense } from 'react'
import { Box, Drawer, DrawerContent, DrawerOverlay, Progress, useDisclosure } from "@chakra-ui/react";
import { Sidebar } from '../components/Sidebar/Sidebar';
import { Navbar } from '../components/Navbar/Navbar';
interface IAdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<IAdminLayoutProps> = ({ children }) => {

  const sidebar = useDisclosure();
  
  return (
    <Box as="section" bg={"#fff"} minH="100vh">
      <Sidebar display={{ base: "none", lg: "flex" }} />
      <Drawer isOpen={sidebar.isOpen} onClose={sidebar.onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <Sidebar w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, lg: 60 }} transition=".3s ease">
        <Navbar sidebar={sidebar} />
        <Suspense fallback={<Progress size="xs" isIndeterminate />}>
          <Box as="main" p="4">
            {children}
          </Box>
        </Suspense>
      </Box>
    </Box>
  );
}

