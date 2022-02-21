<script>
import { AllFiles } from "../components-api/getAllFiles";
import { ApiPostfile } from "../api/index";

export default {
  setup() {
    //搜尋bar
    const handelSearch = (e) => {
      const searchTag = e.target.value;
      AllFiles(searchTag);
    };

    //上傳檔案
    const fileUploader = (e) => {
      const uploadFiles = e.target.files;
      const pop = document.getElementById("pop");
      let formData = new FormData();
      for (var i = 0; i < uploadFiles.length; i++) {
        formData.append("files", uploadFiles[i], uploadFiles.name);
        //#1 對接dom中的input
        //#2 將資料吐進formData中
        //#3 如果沒有第三個參數，傳出去的將是空包彈；第三參數像給每個檔案貼名字，囑名內容和名字的關聯性
      }
      ApiPostfile(formData)
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            pop.style.display = "block";
            pop.classList.add("success");
            pop.innerText = "上傳成功";
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        })
        .catch((err) => {
          console.error(err.response.status);
          if (err.response.status === 406) {
            pop.style.display = "block";
            pop.classList.add("error");
            pop.innerText = "檔案不能超過十個喔";
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else if (err.response.status === 413) {
            pop.style.display = "block";
            pop.classList.add("error");
            pop.innerText = "單檔大小不能超過10M喔";
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        });
    };

    //篩選圖檔
    const filterImage = (e) => {
      if (e.path[1].classList[0] === undefined) {
        let searchTag = "toggel_image";
        AllFiles(searchTag);
        e.path[1].classList.add("active");
        e.path[1].nextElementSibling.classList.remove("active");
      } else {
        let searchTag = "";
        AllFiles(searchTag);
        e.path[1].classList.remove("active");
      }
    };

    //篩選其他檔案
    const filterOther = (e) => {
      if (e.path[1].classList[0] === undefined) {
        let searchTag = "toggel_other";
        AllFiles(searchTag);
        e.path[1].classList.add("active");
        e.path[1].previousElementSibling.classList.remove("active");
      } else {
        let searchTag = "";
        AllFiles(searchTag);
        e.path[1].classList.remove("active");
      }
    };

    return { fileUploader, handelSearch, filterImage, filterOther };
  },
};
</script>

<template>
  <div id="toolBox">
    <span id="pop"></span>
    <input
      type="text"
      class="search_bar"
      placeholder="search..."
      @keyup.enter="handelSearch($event)"
    />
    <div id="uploadDiv">
      <form class="uploadForm" enctype="multipart/form-data">
        <input
          type="file"
          name="files"
          multiple="multiple"
          id="file_input"
          accept=".jpg,.jpeg,.png,.svg,.gif,.pdf,.rtf,.mp4,.txt,.csv,.xlsx,.xlsm,.docx,.docm,.doc,.odt,.ppt,.pptx,.pptm"
          @change="fileUploader"
        />
        <button id="upload_btn"><i class="icon-upload"></i>上傳檔案</button>
      </form>

      <div id="toggel">
        <button id="image_btn" @click="filterImage($event)">
          <i class="icon-Image"></i>
        </button>
        <button id="others_btn" @click="filterOther($event)">
          <i class="icon-files"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
i {
  font-size: 32px;
}
#pop {
  position: absolute;
  bottom: -8rem;
  left: 50%;
  z-index: 99;
  padding: 20px 30px;
  color: #f9f9f9;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  display: none;
  letter-spacing: 0.4rem;
  font-weight: 800;
  font-size: 22px;
}
.success {
  background-color: rgba(82, 183, 136, 0.8);
  border: solid rgb(82, 183, 136) 0.2px;
}
.error {
  background-color: rgba(188, 71, 73, 0.8);
  border: solid rgb(188, 71, 73) 0.2px;
}
#toolBox {
  width: 60%;
  height: 32px;
  margin: 32px auto 40px;
  display: flex;
  align-items: center;
  position: relative;
  > input {
    width: 100%;
    height: 32px;
    outline: transparent;
    border-radius: 16px;
    margin-right: 16px;
    padding-left: 16px;
    border: #d4d2d2 0.2px solid;
    box-shadow: 0px 0px 0px #007ea7;
    caret-color: #007ea7;
    color: #8f8e8e;
    font-size: 16px;
    &:focus {
      box-shadow: 0px 0px 4px rgba(0, 126, 167, 0.4);
      transition: box-shadow ease-in 0.1s;
    }
  }
  > #uploadDiv {
    display: flex;
    align-items: center;
    justify-content: center;
    > .uploadForm {
      position: relative;
      > #upload_btn {
        display: flex;
        align-items: center;
        width: 100px;
        height: 32px;
        line-height: 36px;
        border: transparent;
        border-radius: 10px;
        padding: 4px 0px 4px 6px;
        box-shadow: 0px 0px 0px #d4d2d2;
        margin-right: 8px;
        font-size: 14px;
        font-weight: 500;
        color: #5681c0;
        background-color: #f9f9f9;
        > .icon-upload {
          color: #f9f9f9;
          background-color: #5681c0;
          border-radius: 4px;
          margin-right: 6px;
          font-size: 24px;
        }
      }
      > #file_input {
        width: 120px;
        height: 36px;
        position: absolute;
        left: -10px;
        top: 0;
        z-index: 1;
        -moz-opacity: 0;
        -ms-opacity: 0;
        -webkit-opacity: 0;
        opacity: 0;
        filter: alpha(opacity=0);
        cursor: pointer;
        &:hover {
          ~ #upload_btn {
            box-shadow: 0px 0px 2px #5681c0;
          }
        }
      }
    }
    > #toggel {
      display: flex;
      justify-content: center;
      margin-right: 8px;
      padding: 4px;
      border-radius: 10px;
      > button {
        border: transparent;
        outline: transparent;
        cursor: pointer;
        opacity: 0.8;
        &:hover {
          opacity: 1;
        }
      }
      > #image_btn {
        border-radius: 8px 0px 0px 8px;
      }
      > #others_btn {
        border-radius: 0px 8px 8px 0px;
      }
      > #image_btn.active,
      #others_btn.active {
        background-color: #c2bfbf;
        opacity: 1;
      }
    }
  }
}
</style>
