import mongoose from "mongoose";

//mongoose ashiglan database holbono
//blog gsn collection dotorh data yg ymar2 helbereer baihig n zaaj ogno interface tei adil java gaar bol
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
