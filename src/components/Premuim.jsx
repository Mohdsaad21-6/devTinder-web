import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useState } from "react";

const Premuim = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);

  const verifypremiumUser = async () => {
    const res = await axios.post(
      BASE_URL + "/premium/verify",
      { withCredentials: true }
    );
    if (res.data.isPremium) {
      setIsUserPremium(true);
    }
  };

  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {
        membershipType: type,
      },
      { withCredentials: true }
    );

    const { amount, currency, keyId, notes, orderId } = order.data;

    //open razorpay payment dialog box

    const options = {
      key: keyId, // Replace with your Razorpay key_id
      amount,
      currency,
      name: " Dev Tinder",
      description: "Connect to another developer",
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.email,
        contact: "8081954303",
      },
      theme: {
        color: "#F37254",
      },
      handler: verifypremiumUser,
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  //it should open a razorpay payment dialogbox
  return isUserPremium ? (
    <h1> You are already a premium user</h1>
  ) : (
    <div className="mt-36">
      <div className="flex w-full">
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="font-bold text-3xl">Silver Membership</h1>
          <ul>
            <li>Chat with other people</li>
            <li>100 connections request per day</li>
            <li>blue tick</li>
            <li>3 Months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("silver")}
            className="btn btn-secondary"
          >
            Buy Silver
          </button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="font-bold text-3xl">Gold Membership</h1>
          <ul>
            <li>Chat with other people</li>
            <li>infinite connections request per day</li>
            <li>blue tick</li>
            <li>6 Months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("gold")}
            className="btn btn-primary"
          >
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premuim;
