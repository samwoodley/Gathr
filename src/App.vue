<template>
  <div id="background-div">
    <div id="background-cover">
      <router-view name="nav-bar"></router-view>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import localforage from "localforage";
import Store from "./store/store";

export default {
  data() {
    return {
      state: Store
    };
  },
  created() {
    localforage.config({
      driver: localforage.INDEXEDDB,
      name: "Gathr",
      version: 1.0,
      size: 4980736,
      storeName: "Event Manager",
      description: "Event Manager data"
    });
  },
  mounted() {
    localforage
      .getItems()
      .then(function(res) {
        Store.events = Object.values(res);
      })
      .catch(err => console.log(err));
  }
};
</script>

<style src="./assets/css/styles.css"></style>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.5s;
}

.fade-enter-active {
  transition-delay: 0.5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>