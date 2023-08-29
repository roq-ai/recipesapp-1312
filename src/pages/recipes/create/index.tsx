import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createRecipe } from 'apiSdk/recipes';
import { recipeValidationSchema } from 'validationSchema/recipes';
import { UserInterface } from 'interfaces/user';
import { CommunityInterface } from 'interfaces/community';
import { getUsers } from 'apiSdk/users';
import { getCommunities } from 'apiSdk/communities';
import { RecipeInterface } from 'interfaces/recipe';

function RecipeCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: RecipeInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createRecipe(values);
      resetForm();
      router.push('/recipes');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<RecipeInterface>({
    initialValues: {
      title: '',
      ingredients: '',
      instructions: '',
      cooking_time: 0,
      user_id: (router.query.user_id as string) ?? null,
      community_id: (router.query.community_id as string) ?? null,
    },
    validationSchema: recipeValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Recipes',
              link: '/recipes',
            },
            {
              label: 'Create Recipe',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Recipe
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.title}
            label={'Title'}
            props={{
              name: 'title',
              placeholder: 'Title',
              value: formik.values?.title,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.ingredients}
            label={'Ingredients'}
            props={{
              name: 'ingredients',
              placeholder: 'Ingredients',
              value: formik.values?.ingredients,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.instructions}
            label={'Instructions'}
            props={{
              name: 'instructions',
              placeholder: 'Instructions',
              value: formik.values?.instructions,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Cooking Time"
            formControlProps={{
              id: 'cooking_time',
              isInvalid: !!formik.errors?.cooking_time,
            }}
            name="cooking_time"
            error={formik.errors?.cooking_time}
            value={formik.values?.cooking_time}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('cooking_time', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <AsyncSelect<CommunityInterface>
            formik={formik}
            name={'community_id'}
            label={'Select Community'}
            placeholder={'Select Community'}
            fetcher={getCommunities}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/recipes')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'recipe',
    operation: AccessOperationEnum.CREATE,
  }),
)(RecipeCreatePage);
