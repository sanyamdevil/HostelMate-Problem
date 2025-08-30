import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roomNumber: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  options: { type: [String], required: true },
  message: { type: String, required: true },
});

export default mongoose.models.Complaint || mongoose.model("Complaint", ComplaintSchema);