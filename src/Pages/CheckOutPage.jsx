import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from '../components/AddressForm';
import PaymentForm from '../components/PaymentForm';
import Review from '../components/Review';
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '../utils/checkOutValidation';
import agent from '../api/agent';
import {  clearBasket } from '../store/slices/basketSlice'
import { CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';



function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Shipping address','Payment details'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    // case 1:
    //   return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function CheckOutPage() {


  const [orderNumber, setOrderNumber] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const [paymentMessage, setPaymentMessage] = React.useState("");
  const [paymentSucceded, setPaymentSucceded] = React.useState(false);

  const { basket } = useSelector(s => s.basket);

  const stripe = useStripe();
  const elements = useElements();


  const dispatch = useDispatch();

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(currentValidationSchema)
  });

  React.useEffect(()=>{
    agent.Account.fetchAddress()
          .then(res => {
            if(res){
              methods.reset({...methods.getValues(), ...res, saveAddress: false});
            }
          })
  }, [methods]);

  const submitOrder = async(data) =>{

    setLoading(true);
    const { nameOnCard, saveAddress, ...shippingAddress } = data;
    if(!stripe || !elements) return;
    try {
      
      const cardElement = elements.getElement(CardNumberElement);
      const paymentResult = await stripe.confirmCardPayment(basket?.clientSecret,{
        payment_method: {
          card: cardElement,
          billing_details:{
            name: nameOnCard
          }
        }
      });
      console.log(paymentResult)
      if(paymentResult.paymentIntent?.status === "succeeded"){
        const orderNumber = await agent.Order.create({saveAddress, shippingAddress});
        setOrderNumber(orderNumber);
        setPaymentSucceded(true);
        setOrderNumber(orderNumber);
        setPaymentMessage("Thank you");
        setActiveStep(activeStep + 1);
        dispatch(clearBasket());
        setLoading(false);
      }else{
        setPaymentMessage(paymentResult.error?.message);
        setPaymentSucceded(false);
        setLoading(false);
        setActiveStep(activeStep + 1);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

  }

  const handleNext = async(data) => {


    if(activeStep === steps.length-1) {
    await submitOrder(data)
    }
    else
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <FormProvider {...methods}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  {paymentMessage}
                </Typography>
                {
                  paymentSucceded && (<Typography variant="subtitle1">
                  Your order number is #{orderNumber}.
                </Typography>)
                }
              </React.Fragment>
            ) : (
              <>
                <form onSubmit={methods.handleSubmit(handleNext)}>
                  {getStepContent(activeStep)}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      type ="submit"
                      sx={{ mt: 3, ml: 1 }}
                    >
                      {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                    </Button>
                  </Box>
                </form>
              </>
            )}
          </React.Fragment>
        </Paper>
    </FormProvider>
  );
}