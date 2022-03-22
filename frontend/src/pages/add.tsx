import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Text, Flex } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useMutation } from "@apollo/client";
import UserForm from "src/components/shared/UserForm";
import { ADD_USER } from "src/apollo/mutations";

const Add: NextPage = () => {
  const router = useRouter();

  const [addUser, { loading }] = useMutation(ADD_USER, {
    onCompleted: () => router.push("/"),
    onError: (error) => alert(error.message),
  });

  return (
    <div>
      <Flex alignItems={"center"} marginBottom={4}>
        <AddIcon marginRight={2} fontSize={"sm"} />
        <Text as={"h2"} fontSize={"lg"}>
          Add User
        </Text>
      </Flex>

      <UserForm
        onSubmit={(values) => addUser({ variables: { ...values } })}
        loading={loading}
      />
    </div>
  );
};

export default Add;
