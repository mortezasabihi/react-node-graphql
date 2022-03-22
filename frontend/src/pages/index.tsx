import type { NextPage, GetServerSideProps } from "next";
import { useQuery } from "@apollo/client";
import { initializeApollo, addApolloState } from "src/apollo/apolloClient";
import { Users } from "src/types/user";
import UsersTable from "src/components/page/index/UsersTable";
import { GET_ALL_USERS } from "src/apollo/queries";

const Home: NextPage<{ users: Users }> = () => {
  const { data } = useQuery<{ users: Users }>(GET_ALL_USERS);

  return <UsersTable list={data!.users} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_ALL_USERS,
  });

  return addApolloState(apolloClient, {
    props: {},
  });
};

export default Home;
