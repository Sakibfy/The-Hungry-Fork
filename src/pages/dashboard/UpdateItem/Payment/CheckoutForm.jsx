import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useCart from "../../../../hooks/useCart";
import useAuth from "../../../../hooks/useAuth";
import { use } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const CheckoutForm = () => {
  const stripe = useStripe();
  const [clintSecret, setClintSecret] = useState('');
  const [transactionId, settransactionId] = useState('');
  const [error, setError] = useState('')
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth()
  const navigate = useNavigate()
  const [cart, refetch] = useCart();
const totelPrice = cart.reduce((total, item) => total + item.price ,0)




  useEffect(() => {

    if (totelPrice > 0) {
      axiosSecure.post('/create-payment-intent', {price: totelPrice})
      .then(res => {
        console.log(res.data.clientSecret);
        setClintSecret(res.data.clientSecret);
      })
    }
    
  }, [totelPrice, axiosSecure])
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      setError(error.message);
    }
    else {
      console.log('[PaymentMethod]', paymentMethod);
      setError('');
    }

    // confirm payment 
    const {paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clintSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || "anonymous",
          name: user?.displayName || 'anonymous'
        }
      }
    })

    if (confirmError) {
      console.log('confirm error');
    }
    else {
      console.log('payment intent', paymentIntent)
      if (paymentIntent.status === 'succeeded') {
        console.log('transaction id', paymentIntent.id);
        settransactionId(paymentIntent.id)

        // now save the payment in the database
        const payment = {
          email: user.email,
          price: totelPrice,
          transactionId: paymentIntent.id,
          data: new Date(),
          cartIds: cart.map(item => item._id),
          menuItemIds: cart.map(item => item.menuId),
          statue: 'pending'
        }
        const res = await axiosSecure.post('/payments', payment)
        console.log('payment saved', res.data);
        refetch();
        if (res.data?.paymentResult?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Thank you for the payment",
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/dashboard/paymenthistory')
        }
      }
    }
  };



  return (
    <form onSubmit={handleSubmit}>
       <CardElement
        options={{
          style: {
            base: {
              fontSize: '19px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button  className="btn btn-sm btn-primary mt-5" type="submit" disabled={!stripe || !clintSecret}>
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {
        transactionId && <p className="text-green-600 ">Your transaction id : { transactionId}</p> 
      }
   </form>
  );
};

export default CheckoutForm;