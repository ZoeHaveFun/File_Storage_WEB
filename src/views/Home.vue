<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import ToolBar from "@/components/ToolBar.vue";
import fileStorage from "@/components/fileStorage.vue";
import { getAllFiles } from "../components-api";

export default {
  name: "Home",
  components: {
    Header,
    ToolBar,
    fileStorage,
  },
  setup() {
    const { filesData } = getAllFiles();
    const takeMeHome = () => {
      document.getElementsByClassName("search_bar")[0].value = "";
      getAllFiles();
    };
    return {
      filesData,
      takeMeHome,
    };
  },
};
</script>

<template>
  <Header />
  <ToolBar />
  <div class="content">
    <p>
      沒有這個標籤的檔案喔(´σ-`)<br /><span @click="takeMeHome"
        >我帶你回去</span
      >
    </p>
    <fileStorage :data="filesData" />
  </div>
</template>

<style lang="scss">
.content {
  width: 80%;
  margin: auto;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  > p:first-child {
    margin: 50px auto;
    font-size: 50px;
    color: #003249;
    display: none;
    > span {
      font-size: 25px;
      font-weight: 800;
      color: #5dbcc7;
      text-decoration: underline;
      opacity: 0.6;
      cursor: pointer;
      &:hover {
        opacity: 1;
      }
    }
  }
  > #catchNothing {
    font-size: 50px;
    margin: 50px auto;
  }
}
</style>
