import React from 'react';
import { TextField, Grid } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

function FormInput({ name, label, required }) {
  const { control } = useFormContext();
  const isError = false;

  return (
    <Grid item xs={12} sm={6}>
      {/* <Controller
        as={TextField}
        name={name}
        control={control}
        label={label}
        fullWidth
        required={required}
        error={isError}
      /> */}

      <Controller
        render={({ field }) => ( 
        <TextField {...field} label={label} required={required}/>)}
        control={control}
        fullWidth
        name={name}
        error={isError}
      />

        {/* <Controller

        defaultValue=""

        control={control}

        name={name}

        render={({ field }) => (

          <TextField

            {...field}

            name={name}

            label={label}

            required={required}

            fullWidth

          />

        )}

        /> */}


    </Grid>
  );
}

export default FormInput;