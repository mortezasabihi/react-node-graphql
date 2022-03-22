import { FC, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  ButtonGroup,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { User, Users } from "src/types/user";
import { DELETE_USER } from "src/apollo/mutations";
import { GET_ALL_USERS } from "src/apollo/queries";

interface IProps {
  list: Users;
}

const UsersTable: FC<IProps> = ({ list: users }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [removeUser, { loading }] = useMutation(DELETE_USER);

  const handleDelete = () => {
    removeUser({
      variables: {
        _id: selected,
      },
      update(cache) {
        const existingUsers = cache.readQuery<{ users: Users }>({
          query: GET_ALL_USERS,
        });
        const newUser = existingUsers!.users.filter(
          (u: User) => u._id !== selected
        );
        cache.writeQuery({
          query: GET_ALL_USERS,
          data: { users: newUser },
        });
      },
      onCompleted() {
        handleCloseButton();
      },
    });
  };

  const handleDeleteButton = (_id: string) => {
    setSelected(_id);
    onOpen();
  };
  const handleCloseButton = () => {
    setSelected(null);
    onClose();
  };

  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>

        <Tbody>
          {users.map((user, index) => (
            <Tr key={index}>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td textTransform={"capitalize"}>{user.role}</Td>
              <Td>
                <ButtonGroup size={"sm"} variant={"outline"}>
                  <Link href={`/edit/${user._id}`} passHref>
                    <IconButton
                      as={"a"}
                      aria-label="Edit user"
                      icon={<EditIcon />}
                    />
                  </Link>
                  <IconButton
                    onClick={() => handleDeleteButton(user._id)}
                    aria-label="Delete user"
                    icon={<DeleteIcon />}
                  />
                </ButtonGroup>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Delete Modal */}
      <Modal isOpen={isOpen} onClose={handleCloseButton}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this user?</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCloseButton}>
              Close
            </Button>
            <Button isLoading={loading} onClick={handleDelete} variant="ghost">
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UsersTable;
