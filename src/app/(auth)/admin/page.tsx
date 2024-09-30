"use client"
import Navbar from '@/components/shared/Navbar'
import React from 'react'
import { ProfileForm } from '@/components/AddItemsForm';
import WhyNot from '@/components/AddItemsModal';




const page = () => {
  return (
    <>
      <div className="">
        <div className="">
          <Navbar />
        </div>
        <div className="">
            <WhyNot/>
          
        </div>
      </div>
    </>
  );
}

export default page