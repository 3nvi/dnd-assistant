import React from 'react';
import { Formik, Field, FieldProps, Form } from 'formik';
import { Select } from '@chakra-ui/core/dist';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Box,
  useToast,
} from '@chakra-ui/core/dist';
import * as Yup from 'yup';
import { useQuery } from '@apollo/client';
import { Campaign } from 'src/graphql/schema';
import { LIST_USERS, ListUsers } from 'src/graphql/user';

const CampaignFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name's too short!")
    .max(50, "Name's too long!")
    .required('You must specify a name'),
});

interface CampaignFormValues {
  name: string;
}

const campaignFormInitialValues = {
  name: '',
};

const CampaignForm: React.FC = () => {
  const toast = useToast();
  const { data, error } = useQuery<ListUsers>(LIST_USERS);

  React.useEffect(() => {
    if (error) {
      toast({
        title: 'Failed to fetch user options',
        description: "We couldn't retrieve the DnD assistant users from our database",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [error]);

  const users = data?.users || [];
  return (
    <Formik<CampaignFormValues>
      onSubmit={alert}
      initialValues={campaignFormInitialValues}
      validationSchema={CampaignFormSchema}
    >
      {() => (
        <Form>
          <Stack spacing={5} p={5}>
            <Box>
              <Field name="name">
                {({ field, meta }: FieldProps<string>) => (
                  <FormControl isInvalid={!!meta.error && meta.touched} isRequired>
                    <FormLabel htmlFor={field.name}>Campaign Name</FormLabel>
                    <Input {...field} id={field.name} placeholder="i.e. Succ of succs" size="lg" />
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Box>
            <Box>
              <Field name="dungeonMaster">
                {({ field, meta }: FieldProps<string>) => (
                  <FormControl isInvalid={!!meta.error && meta.touched} isRequired>
                    <FormLabel htmlFor={field.name}>DM</FormLabel>
                    <Select {...field} placeholder="Who's your dungeon master...">
                      {users.map(user => (
                        <option value={user._id}>{user.name}</option>
                      ))}

                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </Select>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Box>
            <Box>
              <Field name="players">
                {({ field, meta }: FieldProps<string>) => (
                  <FormControl isInvalid={!!meta.error && meta.touched} isRequired>
                    <FormLabel htmlFor={field.name}>Players</FormLabel>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="i.e. Aggelos, Kostas"
                      size="lg"
                    />
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Box>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default CampaignForm;
