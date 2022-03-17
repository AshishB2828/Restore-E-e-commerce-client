import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {  useForm, useFormContext } from "react-hook-form";
import AppTextInput from './AppTextInput';
import AppCheckBox from './AppCheckBox';


export default function AddressForm() {


  const {control} = useFormContext();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <AppTextInput
              control = {control}
              name ="fullName"
              label ="Full Name"
            />
          </Grid>
        
          <Grid item xs={12}>
          <AppTextInput
              control = {control}
              name ="address1"
              label ="Address 1"
            />
          </Grid>
          <Grid item xs={12}>
          <AppTextInput
              control = {control}
              name ="address2"
              label ="Address 2"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <AppTextInput
              control = {control}
              name ="city"
              label ="City"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <AppTextInput
              control = {control}
              name ="state"
              label ="state"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <AppTextInput
              control = {control}
              name ="zip"
              label ="zip"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <AppTextInput
              control = {control}
              name ="country"
              label ="Country"
            />
          </Grid>
          <Grid item xs={12}>
            <AppCheckBox
              name="saveAddress"
              label="default Address"
              control={control}
            />
          </Grid>
        </Grid>
    </React.Fragment>
  );
}