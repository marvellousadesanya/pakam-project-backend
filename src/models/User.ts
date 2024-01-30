import { Document, Schema, StringSchemaDefinition, model } from "mongoose";
// import { UserType } from "../types/user";
// import { OtpType } from "../types/otp";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  refreshToken: string;
}

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    default: null,
  },
  lastName: {
    type: String,
    default: null,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
});

export default model<IUser>("User", userSchema);
