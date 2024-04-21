import axios from "axios";

const REST_API_BASEURL = 'https://localhost:443/api/v1/auth'

export const listUsers=()=>axios.get(REST_API_BASEURL);