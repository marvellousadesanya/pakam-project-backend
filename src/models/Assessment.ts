import { Document, Schema, StringSchemaDefinition, model } from "mongoose";

interface IAssessment extends Document {
  fullName: string;
  description: string;
  quantity: number;
}

const assessmentSchema = new Schema<IAssessment>({
  fullName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: null,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

export default model<IAssessment>("Assessment", assessmentSchema);
