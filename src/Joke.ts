import { Schema, Types, model } from "mongoose";

export interface IJoke {
  id: string;
  value: string;
  categories: string;
  url: string;
  icon_url: string;
  created_at: string;
  updated_at: string;
}

const schema = new Schema<IJoke>({
  id: { type: String, default: "" },
  value: { type: String, required: true },
  categories: [{ type: String, default: [""] }],
  url: { type: String, default: "" },
  icon_url: { type: String, default: "" },
  created_at: { type: String, default: "" },
  updated_at: { type: String, default: "" },
});

export const JokeModel = model<IJoke>("Joke", schema);
