import axios from "axios";

export const initialize = async params => {
  console.log({key: process.env.TEST_SECRET_KEY});
  
  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      params,
      {
        headers: {
          Authorization: `Bearer ${process.env.TEST_SECRET_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );
    
    return response;
  } catch (error) {
    console.log({error});
    return null;
  }
};
