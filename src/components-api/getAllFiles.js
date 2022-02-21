import { ApiGetAllfiles } from "@/api/index";
import axios from "axios";
import { reactive } from "@vue/reactivity";
const filesData = reactive({
  data: [],
});

export function AllFiles(searchTag) {
  //取得所有檔案
  if (
    searchTag === undefined ||
    searchTag === "" ||
    searchTag === "toggel_image" ||
    searchTag === "toggel_other"
  ) {
    ApiGetAllfiles()
      .then((res) => {
        document.getElementsByClassName(
          "content"
        )[0].children[0].style.display = "none";
        if (searchTag === "toggel_image") {
          let newFilesData = res.data.data.filter((item) => {
            return (
              item.fileType === "png" ||
              item.fileType === "jpg" ||
              item.fileType === "jpeg" ||
              item.fileType === "gif"
            );
          });
          filesData.data = newFilesData;
        } else if (searchTag === "toggel_other") {
          let newFilesData = res.data.data.filter((item) => {
            return (
              item.fileType === "svg" ||
              item.fileType === "pdf" ||
              item.fileType === "rtf" ||
              item.fileType === "mp4" ||
              item.fileType === "txt" ||
              item.fileType === "csv" ||
              item.fileType === "xlsx" ||
              item.fileType === "xlsm" ||
              item.fileType === "docx" ||
              item.fileType === "docm" ||
              item.fileType === "doc" ||
              item.fileType === "odt" ||
              item.fileType === "pptx" ||
              item.fileType === "pptm" ||
              item.fileType === "ppt"
            );
          });
          filesData.data = newFilesData;
        } else {
          filesData.data = res.data.data;
        }
      })
      .catch((error) => {
        console.log(error.response);
        let catchNothing = `<p id="catchNothing">我撈不到資料呀(ㆆᴗㆆ)<br />請確認伺服器是否開啟~~</p>`;
        document
          .getElementsByClassName("content")[0]
          .insertAdjacentHTML("beforeend", catchNothing);
      });
  } else {
    //搜尋標籤
    axios
      .get(`http://192.168.25.60:8105/api/file/search/${searchTag}`)
      .then((res) => {
        filesData.data = res.data.data;
        if (res.data.data.length !== 0) {
          filesData.data = res.data.data;
          document.getElementsByClassName(
            "content"
          )[0].children[0].style.display = "none";
        } else {
          document.getElementsByClassName(
            "content"
          )[0].children[0].style.display = "block";
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return {
    filesData,
  };
}
