<script>
import { computed, ref } from "@vue/reactivity";
import { ApiDeletefile } from "@/api/index";
import { getAllFiles, imgSrcControl } from "@/components-api";
import { useStore } from "vuex";
import axios from "axios";

export default {
  props: {
    data: {
      type: Object,
    },
  },
  setup(props) {
    const imgSrc = ref("http://192.168.25.60:8000/files");
    const store = useStore();
    const filesData = computed(() => store.getters.filesData);

    //More Btn
    const handelMore = (e) => {
      const more_div = e.path[1].nextElementSibling;
      if (e.target.className === "icon-more icon") {
        if (e.target.classList[1] !== "active") {
          more_div.style.display = "flex";
          e.target.classList.add("active");
        }
      } else {
        more_div.style.display = "none";
        e.target.classList.remove("active");
      }
    };

    //刪除檔案
    const handelDelet = (e) => {
      const fileFullName = e.path[2].children[0].innerText;
      const data = { data: { files: [fileFullName] } };
      ApiDeletefile(data)
        .then((res) => {
          console.log(res);
          getAllFiles();
        })
        .catch((err) => {
          console.log(err.response);
        });
    };

    //編輯檔案
    const handelEdiet = (e) => {
      const moreArray = document.getElementsByClassName("icon-more");
      for (let i = 0; i < moreArray.length; i++) {
        moreArray[i].style.cursor = "not-allowed";
        moreArray[i].classList.remove("icon");
      }
      //檔案描述
      let p_innerText = e.path[3].children[3].innerText;
      const more_div = e.path[1];
      const discript_div = e.path[3].children[4];
      const moreBtn = e.path[2].children[1].children[0];
      moreBtn.classList.remove("active");
      more_div.style.display = "none";
      discript_div.style.display = "block";
      discript_div.children[1].value = p_innerText;
    };

    //Show tagInput
    const showInput = (e) => {
      const tag_input = e.path[1].getElementsByTagName("input")[0];
      tag_input.style.display = "block";
      tag_input.focus();
    };

    //Close tagInput
    const closeInput = (e) => {
      e.target.style.display = "none";
    };

    //新增標籤
    const AddTag = (e) => {
      const new_tag = e.path[1].children[0].value;
      const fileFullName = e.path[4].children[0].children[0].innerText;
      axios
        .post(`http://192.168.25.60:8105/api/tag/${new_tag}/${fileFullName}`)
        .then((res) => {
          console.log(res);
          e.target.value = "";
          getAllFiles();
        })
        .catch((err) => {
          console.error(err);
        });
    };

    //刪除標籤
    const deletTag = (e) => {
      const target_tag = e.path[1].innerText;
      const fileFullName = e.path[4].children[0].children[0].innerText;
      axios
        .delete(
          `http://192.168.25.60:8105/api/tag/${target_tag}/${fileFullName}`
        )
        .then((res) => {
          console.log(res);
          let old_span = e.path[1];
          let tag_Box = e.path[2];
          tag_Box.removeChild(old_span);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    //編輯-確定
    const edit_submit = (e) => {
      const fileName =
        e.path[3].children[0].children[0].innerText.split(".")[0];
      const descript_input = e.path[2].children[1].value;
      const moreArray = document.getElementsByClassName("icon-more");
      for (let i = 0; i < moreArray.length; i++) {
        moreArray[i].style.cursor = "pointer";
        moreArray[i].classList.add("icon");
      }
      axios
        .put("http://192.168.25.60:8105/api/file", {
          fileName: fileName,
          description: descript_input,
        })
        .then((res) => {
          console.log(res);
          const descript_div = e.path[2];
          descript_div.style.display = "none";
          getAllFiles();
        })
        .catch((err) => {
          console.error(err);
        });
    };

    //編輯-取消
    const edit_cancel = (e) => {
      const descript_div = e.path[2];
      descript_div.style.display = "none";
      const moreArray = document.getElementsByClassName("icon-more");
      for (let i = 0; i < moreArray.length; i++) {
        moreArray[i].style.cursor = "pointer";
        moreArray[i].classList.add("icon");
      }
    };

    //下載檔案
    const handelDownload = (e) => {
      const filefullname = e.path[3].children[0].children[0].innerText;
      window.open(`http://192.168.25.60:8105/api/download/${filefullname}`);
    };

    //複製link
    const handelCopy = (e) => {
      const copyUrl = e.path[2].children[0];
      copyUrl.select();
      copyUrl.setSelectionRange(0, 99999);
      document.execCommand("copy");
    };

    return {
      handelDelet,
      handelMore,
      handelEdiet,
      edit_submit,
      edit_cancel,
      handelDownload,
      handelCopy,
      imgSrcControl,
      showInput,
      closeInput,
      AddTag,
      deletTag,
      filesData,
      props,
      imgSrc,
    };
  },
};
</script>

<template>
  <div class="fileCard" v-for="item in props.data.data" :key="item.fileName">
    <div class="fileImg">
      <img :src="imgSrcControl(item.fileName, item.fileType)" alt="" />
    </div>
    <div class="fileContent">
      <div class="tittle_more">
        <h6>{{ item.fileName }}.{{ item.fileType }}</h6>
        <button id="more_btn" @click="handelMore($event)">
          <i class="icon-more icon"></i>
        </button>
        <div class="more_div">
          <i class="icon-edit" @click="handelEdiet($event)">編輯</i>
          <i class="icon-trash" @click="handelDelet($event)">刪除</i>
        </div>
      </div>
      <div class="link_input">
        <input
          readonly
          type="text"
          :value="`${imgSrc}/file_storage/${item.fileName}.${item.fileType}`"
        />
        <button class="copy_btn" @click="handelCopy($event)">
          <i class="icon-copy"></i>
        </button>
        <button class="download_btn" @click="handelDownload($event)">
          <i class="icon-download"></i>
        </button>
      </div>
      <div class="tag_Box">
        <span v-for="tag in item.tag" :key="tag.idx">{{ tag }}</span>
      </div>
      <p>{{ item.description }}</p>
      <div class="discript_div">
        <div class="tag_Box" @keyup.esc="closeInput($event)">
          <span v-for="tag in item.tag" :key="tag.idx"
            >{{ tag }}<i class="icon-delet" @click="deletTag($event)"></i
          ></span>
          <div class="add_tag_Box">
            <input type="text" @keyup.enter="AddTag($event)" />
            <i class="icon-add" @click="showInput($event)"></i>
          </div>
        </div>
        <input type="text" value="" />
        <div class="btn_Box">
          <button @click="edit_submit($event)">確定</button>
          <button @click="edit_cancel($event)">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.fileCard {
  width: 240px;
  margin: 12px 8px;
  background-color: #dcdede;
  box-shadow: 0px 0px 6px #666;
  border-radius: 8px;
  > .fileImg {
    width: 240px;
    height: 180px;
    display: block;
    position: relative;
    > img {
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
      -webkit-transform: translate3d(-50%, -50%, 0);
    }
  }
  > .fileContent {
    padding: 8px;
    position: relative;
    > .tittle_more {
      position: relative;
      display: flex;
      justify-content: space-between;
      > h6 {
        text-align: left;
        font-size: 16px;
        color: #71acc7;
      }
      > #more_btn {
        border: transparent;
        background-color: transparent;
        cursor: pointer;
        margin-right: 4px;
        > .icon-more {
          font-size: 24px;
        }
        > .icon-more.active::before {
          color: #86988f;
        }
        &:hover {
          > .icon-more::before {
            color: #86988f;
          }
        }
      }
      > .more_div {
        position: absolute;
        top: 24px;
        right: 0px;
        display: none;
        flex-direction: column;
        background-color: #fff;
        padding: 4px;
        box-shadow: 0px 0px 8px #666;
        border-radius: 4px;
        > i {
          font-size: 16px;
          padding: 4px 6px;
          cursor: pointer;
          &:hover {
            box-shadow: 0px 1px #003249;
          }
        }
      }
    }
    > .link_input {
      display: flex;
      margin: 8px 0px;
      > input {
        background-color: #bdafaf;
        color: #fff;
        border: transparent;
        outline: transparent;
        padding: 0px 8px;
        margin-right: 4px;
        border-radius: 4px;
        width: 100%;
      }
      > button {
        background-color: transparent;
        border: transparent;
        cursor: pointer;
        padding: 1px 6px;
        > i {
          font-size: 20px;
          font-weight: 800;
          color: #007ea7;
        }
        &:hover {
          background-color: #007ea7;
          border-radius: 4px;
          > i {
            font-weight: 500;
            color: #f9f9f9;
          }
        }
      }
    }
    > p {
      text-align: start;
      font-size: 14px;
      color: #003249;
    }
  }
}
.tag_Box {
  width: 100%;
  margin: 8px 0px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  > span {
    background-color: #5dbcc7;
    color: #fff;
    padding: 2px 8px;
    margin: 4px 4px 4px 0px;
    border-radius: 10px;
    font-size: 12px;
    display: flex;
    align-items: center;
    > .icon-delet {
      margin-left: 2px;
      font-size: 14px;
      color: rgba(249, 249, 249, 0.4);
      &:hover {
        color: #f9f9f9;
      }
    }
  }
  > .add_tag_Box {
    display: flex;
    align-items: center;
    > .icon-add {
      font-size: 22px;
      cursor: pointer;
      &:hover {
        color: #5dbcc7;
      }
    }
    > input {
      width: 80px;
      display: none;
      border: transparent;
      outline: transparent;
      padding: 2px 6px;
      caret-color: #5dbcc7;
      border-bottom: 1px rgba(93, 188, 199, 0.5) solid;
      &:focus {
        border-bottom: 1px #5dbcc7 solid;
      }
    }
  }
}
.discript_div {
  width: 260px;
  position: absolute;
  left: -10px;
  top: 70px;
  display: none;
  z-index: 10;
  padding: 8px;
  background-color: #f9f9f9;
  box-shadow: 0px 0px 8px #888;
  > input {
    width: 100%;
    border: transparent;
    outline: transparent;
    padding: 4px 2px;
    border-bottom: 1px rgba(93, 188, 199, 0.5) solid;
    font-size: 14px;
    color: #003249;
    caret-color: #5dbcc7;
    margin-bottom: 8px;
    &:focus {
      border-bottom: 1px #5dbcc7 solid;
    }
  }
  > .btn_Box {
    bottom: 10px;
    display: flex;
    justify-content: space-between;
    > button {
      border: transparent;
      padding: 4px 6px;
      border-radius: 4px;
      cursor: pointer;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
    > button:nth-child(1) {
      background-color: #5681c0;
      color: #f9f9f9;
    }
    > button:nth-child(2) {
      background-color: #bc4749;
      color: #f9f9f9;
    }
  }
}
</style>
