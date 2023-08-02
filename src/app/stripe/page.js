'use client'
import StripePaymentCheckout from '@/components/StripePayment/StripePayment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';

export default function Stripe() {
  const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_API_KEY}`);
  return (
    <div>
      <Elements stripe={stripePromise}>
        <StripePaymentCheckout />
      </Elements>
    </div>
  );
}
