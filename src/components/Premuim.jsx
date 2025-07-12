import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Premuim = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);

  useEffect(() => {
    verifypremiumUser();
  }, []);

  const verifypremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });
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
    <h1 className="flex justify-center align-middle my-48 text-2xl"> You are already a premium user</h1>
  ) : (
    <div className="mt-36 px-4 sm:px-6 md:px-10">
      <div className="flex flex-col md:flex-row w-full gap-4 md:gap-8">
        <div className="card bg-base-300 rounded-box grid min-h-[20rem] grow place-items-center p-4">
          <h1 className="font-bold text-2xl sm:text-3xl">Silver Membership</h1>
          <ul className="list-disc list-inside my-4 space-y-1 text-base sm:text-lg">
          
            <li>₹300</li>
            <li>Chat with other people</li>
            <li>100 connections request per day</li>
            <li>blue tick</li>
            <li>3 Months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("silver")}
            className="btn btn-secondary text-sm sm:text-base px-4 sm:px-6"
          >
            Buy Silver
          </button>
        </div>
        {/* <div className="divider divider-horizontal hidden md:block">OR</div> */}
        <div className="card bg-base-300 rounded-box grid min-h-[20rem] grow place-items-center p-4">
          <h1 className="font-bold text-2xl sm:text-3xl">Gold Membership</h1>
          <ul className="list-disc list-inside my-4 space-y-1 text-base sm:text-lg">
                        <li>₹700</li>

            <li>Chat with other people</li>
            <li>infinite connections request per day</li>
            <li>blue tick</li>
            <li>6 Months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("gold")}
            className="btn btn-primary text-sm sm:text-base px-4 sm:px-6"
          >
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premuim;
