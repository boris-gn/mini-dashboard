import React from 'react';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import Button from './Button';
import Input from './Input';

import type { FieldApi } from '@tanstack/react-form';

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(',')}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  );
}

const userSchema = z.object({
  firstName: z.string().refine((val) => val !== 'John', {
    message: '[Form] First name cannot be John',
  }),
  lastName: z.string().min(3, '[Form] Last name must be at least 3 characters'),
});

type User = z.infer<typeof userSchema>;

const ContactForm = ({ onSubmit, initialValues, setIsEdit }: any) => {
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
    } as User,
    onSubmit: async ({ value }) => {
      setIsEdit(false)
      console.log(value);
      if (onSubmit) {
        await onSubmit(value);
      }
    },
    validators: {
      onChange: userSchema,
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div>
          <form.Field
            name="firstName"
            validators={{
              onChange: z
                .string()
                .min(3, '[Field] First name must be at least 3 characters'),
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: z.string().refine(
                async (value) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  return !value.includes('error');
                },
                {
                  message: "[Field] No 'error' allowed in first name",
                },
              ),
            }}
            children={(field) => {
              return (
                <>
                  <label htmlFor={field.name}>First Name:</label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              );
            }}
          />
        </div>
        <div>
          <form.Field
            name="lastName"
            children={(field) => (
              <>
                <label htmlFor={field.name}>Last Name:</label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" className='mt-4' disabled={!canSubmit} text="Submit" />
          )}
        />
      </form>
    </div>
  );
};

export default ContactForm;