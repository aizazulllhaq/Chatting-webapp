import { connect } from "mongoose";
import { MONGO_URL } from "../constant.js";

const dbConnection = async () => {
  try {
    const connectionInstance = await connect(MONGO_URL);
    console.log(`Mongodb Connected to : ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("DB Connection failed : ", error.message);
  }
};

export default dbConnection;
