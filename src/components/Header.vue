<script>
import { getAllFiles } from "@/components-api";
export default {
  setup() {
    const takeMeHome = () => {
      document.getElementsByClassName("search_bar")[0].value = "";
      getAllFiles();
    };
    return { takeMeHome };
  },
};
</script>
<template>
  <div id="header">
    <img src="../assets/image/upload.png" alt="" />
    <h1 @click="takeMeHome">Web File Storage</h1>
  </div>
</template>

<style lang="scss">
#header {
  width: 100%;
  height: 40px;
  background-color: #4b4a4a;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;

  > img {
    width: 26px;
  }
  > h1 {
    padding-left: 6px;
    color: #f9f9f9;
    font-size: 18px;
    font-weight: 400;
    cursor: pointer;
    &:hover {
      color: #cd873a;
    }
  }
}
</style>
