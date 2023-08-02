'use client';
import { CardElement, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import './StripePayment.css';

export default function StripePaymentCheckout() {
  const stripe = useStripe();

  const pay = async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/payment/createStripePaymentIntent`;

    const requestData = {
      userId: '51',
      number: 4242424242424242,
      expMonth: 12,
      expYear: 2024,
      cvc: 123,
      currency: 'usd',
      amount: 100,
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    };

    try {
      let response = await fetch(apiUrl, requestOptions);
      response = await response.json();
      const data = response.data;
      const confirmPayment = await stripe.confirmCardPayment(data.clientSecret);
      const { paymentIntent } = confirmPayment;
      if (paymentIntent.status === 'succeeded') {
        alert(`Payment successful!`);
      } else {
        alert(`Payment failed!`);
      }
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error('Error:', error);
      // You may want to throw the error or handle it in a different way based on your use case
    }
  };

  return (
    <div className="checkout" style={{ width: '25%' }}>
      <button onClick={pay}>Pay</button>
    </div>
  );
}
