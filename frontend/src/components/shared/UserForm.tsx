import type { FC } from "react";
import { useFormik } from "formik";
import { string, object } from "yup";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  VStack,
  Input,
  Radio,
  RadioGroup,
  Button,
} from "@chakra-ui/react";
import { IUser } from "src/types/user";

interface IProps {
  onSubmit: (values: IUser) => void;
  loading: boolean;
  data?: Omit<IUser, "password">;
}

const UserForm: FC<IProps> = ({ onSubmit, loading, data }) => {
  const validationSchema = object().shape({
    name: string().required("Name is required"),
    email: string().email("Invalid email").required("Email is required"),
    role: string().oneOf(["admin", "user"], "Invalid role"),
    ...(!data
      ? {
          password: string()
            .min(8, "Password must be at least 8 characters long")
            .required("Password is required"),
        }
      : {}),
  });

  const formik = useFormik({
    validationSchema,
    enableReinitialize: true,
    initialValues: {
      name: data ? data.name : "",
      email: data ? data.email : "",
      password: "",
      role: data ? data.role : "user",
    },
    onSubmit: (values: IUser) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <VStack spacing={3}>
        {/* name */}
        <FormControl
          isInvalid={(formik.errors.name && formik.touched.name) || undefined}
        >
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            value={formik.values.name}
            onChange={formik.handleChange}
            autoFocus
            id="name"
            placeholder="name"
            autoComplete="off"
          />
          <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
        </FormControl>

        {/* email */}
        <FormControl
          isInvalid={(formik.errors.email && formik.touched.email) || undefined}
        >
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            value={formik.values.email}
            onChange={formik.handleChange}
            id="email"
            placeholder="email"
            autoComplete="off"
          />
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </FormControl>

        {/* password */}
        {!data && (
          <FormControl
            isInvalid={
              (formik.errors.password && formik.touched.password) || undefined
            }
          >
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              value={formik.values.password}
              onChange={formik.handleChange}
              type={"password"}
              id="password"
              placeholder="password"
              autoComplete="off"
            />
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </FormControl>
        )}

        {/* role */}
        <FormControl as="fieldset">
          <FormLabel as="legend">Role</FormLabel>
          <RadioGroup
            value={formik.values.role}
            onChange={(e) => formik.setFieldValue("role", e)}
          >
            <HStack spacing="24px">
              <Radio value="admin">Admin</Radio>
              <Radio value="user">User</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
      </VStack>

      <Button
        isLoading={loading}
        type="submit"
        colorScheme={"green"}
        marginTop={6}
      >
        Submit
      </Button>
    </form>
  );
};

export default UserForm;
