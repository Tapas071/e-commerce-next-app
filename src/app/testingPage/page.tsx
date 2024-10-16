import RazorpayPayment from '@/components/testComponent/RazorpayPayment';
import ImageUploader from '@/components/testComponent/SimpleImageUploader';
import React from 'react'

const page = () => {
  return (
    <div>
      <h1>Testing Payment</h1>
      <RazorpayPayment/>
    </div>
  );
}

export default page