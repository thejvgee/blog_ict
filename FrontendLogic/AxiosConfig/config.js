import axios from "axios";
import Cookies from "js-cookie";

const Email = Cookies.get('MyEmail')

const BASEURL = 'https://blogjvgee.netlify.app/api'

// axios ashiglaad api ruu request yvuulahad baseURL, header ntrig ni awch uldeh heseg
export const api = axios.create({
  baseURL : BASEURL,
  headers : {
    "Authorization" : Email ? Email : null,
    "Content-Type" : "application/json"
  }
})

// cookie dotr hadgalsn email ni shinjilj awah heseg
// request yvuulah bur email awch uldeh
api.interceptors.request.use( async(req)=>{
  const Email =await Cookies.get('MyEmail')

  req.headers.Authorization = Email ? Email : null;

  return req
})
