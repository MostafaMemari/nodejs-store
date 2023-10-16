const mongoose = require("mongoose");
const { CommentSchema } = require("./public.schema");

const EpisodesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  type: { type: String, default: "unlock" },
  video: { type: String, required: true },
});

const ChapterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, default: "" },
  episodes: { type: [EpisodesSchema], default: [] },
});

const CourseSchema = new mongoose.Schema(
  {
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
    chapters: { type: [ChapterSchema], default: [] },
    students: { type: [mongoose.Types.ObjectId], ref: "user", default: [] },
    status: { type: String, default: "notStarted" /* notStarted , Completed , Holding */ },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

CourseSchema.index({ title: "text", short_text: "text", text: "text" });
module.exports = {
  CoursesModel: mongoose.model("course", CourseSchema),
};
