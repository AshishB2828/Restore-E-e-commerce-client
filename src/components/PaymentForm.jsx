import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useFormContext } from 'react-hook-form';
import AppTextInput from './AppTextInput';
import { CardCvcElement, CardExpiryElement, CardNumberElement } from '@stripe/react-stripe-js';
import { StripeInput } from './StripeInput';

export default function PaymentForm() {

  const { control } = useFormContext();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <AppTextInput
            name="nameOnCard"
            label="Name on card"
            control ={control}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            // required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            InputProps = {{
              inputComponent: StripeInput,
              inputProps: {component: CardNumberElement}
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
        <TextField
            // required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            InputProps = {{
              inputComponent: StripeInput,
              inputProps: {component: CardExpiryElement}
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
        <TextField
            // required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            InputProps = {{
              inputComponent: StripeInput,
              inputProps: {component: CardCvcElement}
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}