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
import { useQuery, useMutation } from '@apollo/client';
import { LIST_USERS, ListUsers } from 'src/graphql/user';
import { CreateCampaign, CreateCampaignInput, CREATE_CAMPAIGN } from 'src/graphql/campaign';
import { User } from '../graphql/schema';

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

interface CampaignFormValues {
  name: string;
  dungeonMaster: User['_id'];
  players: User['_id'][];
}

const campaignFormInitialValues = {
  name: '',
  dungeonMaster: '',
  players: [],
};

const CampaignForm: React.FC = () => {
  const toast = useToast();
  const { data: listUsersData, error: listUsersError } = useQuery<ListUsers>(LIST_USERS);
  const [createCampaign, { data: createCampaignData, error: createCampaignError }] = useMutation<
    CreateCampaign,
    CreateCampaignInput
  >(CREATE_CAMPAIGN);

  React.useEffect(() => {
    if (listUsersError) {
      toast({
        title: 'Failed to fetch user options',
        description: "We couldn't retrieve the DnD assistant users from our database",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [listUsersError]);

  React.useEffect(() => {
    if (createCampaignError) {
      console.log(createCampaignError);
      toast({
        title: 'Failed to create campaign',
        description: "We couldn't retrieve the DnD assistant users from our database",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [createCampaignError]);

  React.useEffect(() => {
    if (createCampaignData) {
      alert('campaign created!');
    }
  }, [createCampaignData]);

  const users = listUsersData?.users || [];
  const userOptions = React.useMemo(
    () => users.map(user => ({ label: user.name, value: user._id })),
    [users]
  );

  return (
    <Formik<CampaignFormValues>
      onSubmit={async values =>
        createCampaign({
          variables: values,
        })
      }
      initialValues={campaignFormInitialValues}
      validationSchema={CampaignFormSchema}
    >
      {({ isSubmitting, isValid, dirty, values, setFieldValue }) => (
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
