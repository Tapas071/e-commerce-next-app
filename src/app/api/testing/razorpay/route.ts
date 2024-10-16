import Razorpay from "razorpay";
import shortid from "shortid";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Initialize razorpay object
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY as string,
      key_secret: process.env.RAZORPAY_SECRET as string,
    });

    // Create an order -> generate the OrderID -> Send it to the Front-end
    const payment_capture = 1;
    const amount = 499; // Amount in INR
    const currency = "INR";
    const options = {
      amount: (amount * 100).toString(), // Razorpay accepts amount in paise
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };

    const response = await razorpay.orders.create(options);

    return NextResponse.json(
      {
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Error creating order" },
      { status: 400 }
    );
  }
}
