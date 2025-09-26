import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title : {
    type : String,
    required : true,
  },
  about : {
    type : String,
    required : true,
  },
  description : {
    type : String,
    required : true,
  },
  tags : [{
    type : String,
    // required : true,
  }],
  img : {
    type : String,
    required : true,
  },
  user : {
    type : String,
    required : true
  }
})

export default mongoose.models.blogs || mongoose.model('blogs', BlogSchema)