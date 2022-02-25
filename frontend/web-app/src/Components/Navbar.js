import React from "react";

import { Flex, Box, Heading } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Flex bgColor="blue.100" align="center" justify="space-between" p="14">
      <Box p="2">
        <img alt="logo" />
      </Box>
      <Box>
        <Heading as="h2" size="xl" color="gray.500" fontWeight="semi-bold">
          User's Dashboard
        </Heading>
      </Box>
      <Box
        as="button"
        p="2"
        border="1px"
        borderColor="black.200"
        borderRadius="md"
      >
        Logout
      </Box>
    </Flex>
  );
};
export default Navbar;
