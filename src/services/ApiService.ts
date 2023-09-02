import axios from "axios";

export const Post = async (url: string, body: any) => {
  try {
    const result = await axios.post(url, body);
    return result.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export const Get = async (url: string) => {
  try {
    const result = await axios.get(url);
    return result.data;
  } catch (error: any) {
    return error.response.data;
  }
}