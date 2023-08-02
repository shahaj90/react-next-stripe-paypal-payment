'use client';
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useElements } from '@stripe/react-stripe-js';

const CreateSubscription = () => {
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const stripe = await loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_API_KEY}`);


    // Send paymentMethod to your Laravel backend to create the subscription
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/createStripeSubscription`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: '51',
          number: 4242424242424242,
          expMonth: 12,
          expYear: 2024,
          cvc: 123,
          priceId: 'price_1N0hG7JTHhJnSz8Ne0CCA81n'
        }),
      }
    );

    const res = await response.json();
    const data = res.data;
    setLoading(false);


    const confirmPayment = await stripe.confirmCardPayment(data.clientSecret);
    const { paymentIntent } = confirmPayment;
    if (paymentIntent.status === 'succeeded') {
      alert(`Payment successful!`);
    } else {
      alert(`Payment failed!`);
    }
  };

  const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_API_KEY}`);
  
  return (
    <Elements stripe={stripePromise}>
      <form onSubmit={handleSubmit}>
        {/* Your subscription form inputs here */}
        {/* <CardElement /> */}
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Subscribe'}
        </button>
      </form>
    </Elements>
  );
};

export default CreateSubscription;
