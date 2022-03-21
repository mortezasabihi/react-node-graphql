import type { FC } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { Users } from "src/types/user";

interface IProps {
  list: Users;
}

const UsersTable: FC<IProps> = ({ list: users }) => {
  return (
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
            <Td>{user.role}</Td>
            <Td>
              <ButtonGroup size={"sm"} variant={"outline"}>
                <Link href={`/edit/${user._id}`} passHref>
                  <IconButton
                    as={"a"}
                    aria-label="Edit user"
                    icon={<EditIcon />}
                  />
                </Link>
                <IconButton aria-label="Delete user" icon={<DeleteIcon />} />
              </ButtonGroup>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default UsersTable;
