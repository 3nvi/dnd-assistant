import React from 'react';
import { Formik, Field, FieldProps, Form } from 'formik';
import Select from 'src/components/Select';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Box,
  Button,
  useToast,
} from '@chakra-ui/core/dist';
import * as Yup from 'yup';
import { MutationCreateCampaignArgs } from 'src/graphql/schema';
import { useListUsers } from '../graphql/user/listUsers.generated';

const CampaignFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name's too short!")
    .max(50, "Name's too long!")
    .required('You must specify a name'),
  dungeonMaster: Yup.string().required('You must specify a DM'),
  players: Yup.array()
    .of(Yup.string())
    .required('You must some players'),
});

interface CampaignFormProps {
  initialValues: MutationCreateCampaignArgs;
  onSubmit: (values: MutationCreateCampaignArgs) => Promise<any>;
}

const CampaignForm: React.FC<CampaignFormProps> = ({ onSubmit, initialValues }) => {
  const toast = useToast();
  const { data } = useListUsers({
    onError: () =>
      toast({
        title: 'Failed to fetch user options',
        description: "We couldn't retrieve the DnD assistant users from our database",
        status: 'error',
        duration: 3000,
        isClosable: true,
      }),
  });

  const users = data?.listUserSummaries || [];
  const userOptions = React.useMemo(
    () => users.map(user => ({ label: user.name, value: user._id })),
    [users]
  );

  return (
    <Formik<MutationCreateCampaignArgs>
      enableReinitialize
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={CampaignFormSchema}
    >
      {({ isSubmitting, isValid, dirty, values, setFieldValue }) => (
        <Form>
          <Stack spacing={5} py={5}>
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
                  <FormControl
                    isInvalid={!!meta.error && meta.touched}
                    isRequired
                    isDisabled={Boolean(initialValues.dungeonMaster)}
                  >
                    <FormLabel htmlFor={field.name}>DM</FormLabel>
                    <Select
                      {...field}
                      onChange={value => setFieldValue(field.name, value)}
                      filterOption={o => !values.players.includes(o.value)}
                      options={userOptions}
                      placeholder="Who's your dungeon master..."
                    />
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
                    <Select
                      {...field}
                      onChange={value => setFieldValue(field.name, value)}
                      isMulti
                      filterOption={option => option.value !== values.dungeonMaster}
                      options={userOptions}
                      placeholder="Add some players..."
                    />
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Box>
            <Button
              type="submit"
              variantColor="teal"
              variant="solid"
              size="lg"
              isLoading={isSubmitting}
              isDisabled={isSubmitting || !isValid || !dirty}
            >
              Create
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default CampaignForm;
