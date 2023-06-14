require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  //   const { cartItems, total } = JSON.parse(event.body);
  const calculateOrderAmount = () => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return total * 100;
  };

  try {
    const { amount } = JSON.parse(event.body);
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
      //   metadata: { integration_check: "accept_a_payment" },
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (err) {
    console.log({ err });
    return {
      statusCode: 400,
      body: JSON.stringify({ err }),
    };
  }
};
