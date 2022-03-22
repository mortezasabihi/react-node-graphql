import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { GET_USER } from "src/apollo/queries";
import { UPDATE_USER } from "src/apollo/mutations";
import UserForm from "src/components/shared/UserForm";

const EditPage: NextPage = () => {
  const router = useRouter();
  const [getUser, { data, loading }] = useLazyQuery(GET_USER, {
    onError: () => router.push("/404"),
  });
  const [updateUser, { loading: updating }] = useMutation(UPDATE_USER, {
    onError: (error) => alert(error.message),
    onCompleted: () => router.push("/"),
  });

  useEffect(() => {
    if (router.query.id) {
      getUser({ variables: { id: router.query.id } });
    }
  }, [getUser, router.query.id]);

  return (
    <div>
      <Flex alignItems={"center"} marginBottom={4}>
        <EditIcon marginRight={2} fontSize={"sm"} />
        <Text as={"h2"} fontSize={"lg"}>
          Edit User
        </Text>
      </Flex>

      {loading ? (
        <Flex justifyContent={"center"}>
          <Spinner />
        </Flex>
      ) : (
        <UserForm
          onSubmit={({ name, email, role }) =>
            updateUser({
              variables: { id: router.query.id, name, email, role },
            })
          }
          loading={updating}
          data={data?.user}
        />
      )}
    </div>
  );
};

export default EditPage;
