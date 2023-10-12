const mongoose = require("mongoose");
const { CommentSchema } = require("./public.schema");

const Episodes = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  type: { type: String, default: "free" },
  time: { type: String, required: true },
});

const Chapter = new mongoose.Schema({
  title: { type: String, required: true },
  text: { text: String, default: "" },
  episodes: { type: [Episodes], default: [] },
});

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  short_text: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String, required: true },
  tags: { type: [String], default: [] },
  category: { type: mongoose.Types.ObjectId, ref: "category", required: true },
  comments: { type: [CommentSchema], default: [] },
  likes: { type: [mongoose.Types.ObjectId], default: [] },
  deslikes: { type: [mongoose.Types.ObjectId], default: [] },
  bookmarks: { type: [mongoose.Types.ObjectId], default: [] },
  price: { type: Number, default: 0 },
  discount: { type: Number, required: true },
  type: { type: String, default: "free" } /* free , chash , special */,
  time: { type: String, default: "00:00:00" },
  teacher: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  chapters: { type: [Chapter], default: [] },
  students: { type: [mongoose.Types.ObjectId], ref: "user", default: [] },
});

module.exports = {
  CoursesModel: mongoose.model("product", CourseSchema),
};
