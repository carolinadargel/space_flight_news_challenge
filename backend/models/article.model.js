import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ArticlesSchema = new Schema({
  id: { type: Number, required: true },
  featured: { type: Boolean, required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
  imageUrl: { type: String, required: true },
  newsSite: { type: String, required: true },
  summary: { type: String, required: true },
  publishedAt: { type: String, required: true },
  updatedAt: { type: String, required: true },
  launches: [
    {
      id: String,
      provider: String,
    },
  ],
  events: [
    {
      id: String,
      provider: String,
    },
  ],
});

export default mongoose.model("articles", ArticlesSchema);