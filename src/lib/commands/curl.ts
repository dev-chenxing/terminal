import { request } from "urllib";

const curl = (args: string[]) => {
  return args
    .map(async (url) => {
      const res = await request(url);
      const data = res.data.toString();
      // const data = url
      return data;
    })
    .join("<br/>");
};

export default curl;
