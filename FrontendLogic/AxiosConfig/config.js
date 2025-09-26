import axios from "axios";
import Cookies from "js-cookie";

const Email = Cookies.get('MyEmail')

const BASEURL = 'http://localhost:3000/api'


export const api = axios.create({
  baseURL : BASEURL,
  headers : {
    "Authorization" : Email ? Email : null,
    "Content-Type" : "application/json"
  }
})


api.interceptors.request.use( async(req)=>{
  const Email =await Cookies.get('MyEmail')

  req.headers.Authorization = Email ? Email : null;

  return req
})