import React from 'react';
import { Formik, Field, FieldProps, Form } from 'formik';
import { FormControl, FormErrorMessage, FormLabel, Input, Stack, Box } from '@chakra-ui/core/dist';
import * as Yup from 'yup';

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
                    <Input {...field} id={field.name} placeholder="i.e. Stefanos" size="lg" />
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
