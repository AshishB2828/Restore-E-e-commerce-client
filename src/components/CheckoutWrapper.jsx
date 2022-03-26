import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import agent from "../api/agent";
import CheckOutPage from "../Pages/CheckOutPage";
import { setBasket } from "../store/slices/basketSlice";


const stripePromise = loadStripe("pk_test_51KhDiBSJ73XsdaDuZNcbJOAdNO69skzugNTcYMcJLGka1JfEmFFA5ZyKbwsr6mWhwBLEQXrgd1mua6002hwhr3gn004gi22iKs");

export default function CheckoutWrapper(){

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        agent.Payments.createPaymentIntent()
        .then( basket => dispatch(setBasket(basket)))
        .catch( error => console.log(error))
        .finally( () => setLoading(false) )
    },[dispatch]);

    if(loading) return <h1>Loading....</h1>

    return(
        <Elements stripe={stripePromise}>
            <CheckOutPage />
        </Elements>
    )
}