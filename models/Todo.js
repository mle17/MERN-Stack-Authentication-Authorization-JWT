import { Schema, model } from "mongoose";

const TodoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

export default model("Todo", TodoSchema);
