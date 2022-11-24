import mongoose from 'mongoose';
import idPlugin from "mongoose-id";

const cartSchema = mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
      trim: true,
    },
    trainingId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

cartSchema.plugin(idPlugin);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
