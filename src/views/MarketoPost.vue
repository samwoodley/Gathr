<template>
  <div class="col-sm-12 col-md-12 col-lg-12 pr-4.5">
    <div class="list-container">
      <div id="pageTitle">
        <h2 class="mb-3">To sync your signed in contacts with marketo please make sure the event is over and no further changes are to be made.</h2>
        <h5 class="mb-5">If you wish to go to your event please <span @click.prevent="jumpToEvent(id)" style="color:green;cursor: pointer;" >click here</span></h5>
      </div>
      <div class="row">
        <div class="col-2 mb-5"></div>
          <div class="col-8 mb-5">
            <div class="card text-center shadow">
              <div class="card-header">
              </div>
              <div class="card-body">
                <h2 class="card-title mb-4">{{ currentEvent.eventName }}</h2>
                <div class="card-text" style="font-size: 20px;">
                  <p><b>No Shows</b>: {{ currentEvent.registered.length }} </p>
                  <p><b>Attended</b>: {{ currentEvent.attended.length }} </p>
                  <p><b>Opt-ins Gained</b>: {{ currentEvent.optInsGained }}</p>
                </div>

                <div class="input-wrap mb-5 mt-5" style="width: 300px; margin:auto">
                  <input class="form-input" type="text" name="eventdate" v-model="ListId" :class="{hasVal: ListId.length > 0}">
                  <span class="form-input-label" label="IS THIS THE CORRENT ATTENDEE LIST ID"></span>
                </div>

                <div v-if="!isSyncing" class="container-form-btn">
                  <div class="form-btn-wrap">
                    <div class="form-btn-bg"></div>
                    <button class="con-form-btn" style="min-width: 200px" @click.prevent="marketoSync(currentEvent.attended, ListId)">Confirm<i class="fas fa-check" style="margin-left: 10px;"></i></button>
                  </div>
                </div>

                <div v-else class="container-form-btn">
                  <div class="form-btn-wrap">
                    <div class="form-btn-bg"></div>
                    <button class="con-form-btn" style="min-width: 200px">Syncing...</button>
                  </div>
                </div>
                <div class="container-form-btn">
                  <div class="form-btn-wrap">
                    <div class="form-btn-bg"></div>
                  </div>
                </div>
              </div>
              <div class="card-footer text-muted">{{ currentEvent.eventDate }}</div>
            </div>
          </div>
        <div class="col-2 mb-5"></div>

      </div>
    </div>
  </div>
</template>

<script>
import Store from "../store/store";
import Marketo from "../store/marketo";
import localforage from "localforage";
import localforageGetitems from "localforage-getitems";

export default {
  data() {
    return {
      id: this.$route.params.id,
      state: Store.events,
      currentEvent: {},
      ListId: '',
      isSyncing: Store.isSyncing
    }
  },
  created() {
    this.state.forEach(event => {
      if (event.registeredListId == this.id) {
        this.currentEvent = event;
      }
    });    
    this.ListId = this.currentEvent.attendeeListId
  },
  methods: {
    jumpToEvent(id) {
      this.$router.push(`/list/${id}`);
    },
    async marketoSync(attended, id) {
      this.isSyncing = true
      await Marketo.startSync(attended, id)
      this.currentEvent.synced = true
      this.isSyncing = false
      localforage.setItem(this.id, this.currentEvent)
      this.$router.push('/dashboard');

    }
  }
};
</script>

<style scoped>
h1 {
  text-align: left;
  margin-bottom: 15px;
  font-size: 45px;
}

.list-container {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  padding: 40px 55px 90px 55px;
}

.form-input {
  text-align: center;
}
</style>