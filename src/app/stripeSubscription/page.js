'use client';
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CreateSubscription from '@/components/StripeSubscription/StriptSubscription';

const Subscription = () => {
  const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_API_KEY}`);
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CreateSubscription />
      </Elements>
    </div>
  );
};

export default Subscription;
