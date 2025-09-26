import * as Yup from 'yup'


export const CreateBlogSchema = Yup.object({
  title : Yup.string().min(10).max(80).required('Please Enter Title'),
  about : Yup.string().min(20).max(200).required('Please Enter About'),
  description : Yup.string().min(200).required('Please Enter Description'),
  img : Yup.string().required('Please Enter Image Src'),
})