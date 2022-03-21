import { Flex, Button, Heading } from "@chakra-ui/react";
import Link from "next/link";

const Navbar = () => (
  <Flex
    as={"nav"}
    alignItems={"center"}
    justifyContent={"space-between"}
    p={4}
    bg={"white"}
    borderBottom={"1px solid #f0f0f0"}
    marginTop={4}
    marginBottom={4}
  >
    <Flex alignItems={"center"}>
      <Heading as={"h1"} size={"md"}>
        <Link href={"/"}>
          <a>Users List</a>
        </Link>
      </Heading>
    </Flex>

    <Flex alignItems={"center"}>
      <Link href={"/add"} passHref>
        <Button colorScheme={"blue"} as={"a"} size={"sm"}>
          Add user
        </Button>
      </Link>
    </Flex>
  </Flex>
);

export default Navbar;
