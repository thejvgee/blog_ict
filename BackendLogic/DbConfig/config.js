import mongoose from "mongoose"


export const connectDB = async () => {
 await mongoose.connect(process.env.DB_LINK).then(()=>{
    console.log('database holbogdloo');
  })
  .catch((err)=>{
    console.log(err, "database holbogdohod aldaa garlaa");
  })
}