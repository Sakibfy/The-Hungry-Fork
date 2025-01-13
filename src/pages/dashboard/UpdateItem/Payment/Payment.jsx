import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../../component/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

// add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Geteway_PK);

const Payment = () => {
  return (
    <div>
      <SectionTitle subHeading="Please pay to eat" heading="Payment "></SectionTitle>
      <div>
        <Elements stripe={stripePromise}>
         <CheckoutForm></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;