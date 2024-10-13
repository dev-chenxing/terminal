import { request } from "urllib";

const url = "https://github.com/";
const res = await request(url);
const data = res.data.toString();
console.log(data);
