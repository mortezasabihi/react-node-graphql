import type { NextPage, GetServerSideProps } from "next";
import { gql } from "@apollo/client";
import client from "src/apollo-client";
import { Users } from "src/types/user";
import UsersTable from "src/components/page/index/UsersTable";

const Home: NextPage<{ users: Users }> = ({ users }) => {
  return <UsersTable list={users} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query({
    query: gql`
      query UsersList {
        users {
          _id
          name
          email
          role
        }
      }
    `,
  });

  return {
    props: {
      users: data.users,
    },
  };
};

export default Home;
