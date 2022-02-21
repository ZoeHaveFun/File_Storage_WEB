import axios from "axios";

const fileRequest = axios.create({
  baseURL: "http://192.168.25.60:8105/api",
});

// 取得檔案列表
export const getAllfilesRequest = () => fileRequest.get("/files");
// 上傳檔案
export const postfileRequest = (data) => fileRequest.post("/file", data);
// 刪除檔案
export const deletefileRequest = (data) => fileRequest.delete("/file", data);
// 下載檔案
export const getfileRequest = () => fileRequest.get(`/download/`);
