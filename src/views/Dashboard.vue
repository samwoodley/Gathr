<template>
  <div class="col-sm-12 col-md-12 col-lg-12 pr-4.5">
    <div id="container">
      <div id="event-name">
        <h1>Saved Events</h1>
        <div class="container-form-btn mt-4 mb-5">
          <div class="form-btn-wrap">
            <div class="other-btn-bg"></div>
            <button class="con-form-btn" @click.prevent="addNew">
              <i class="fas fa-plus" style="margin-right: 20px"></i>Add new Event
            </button>
          </div>
        </div>
      </div>

      <div class="row">
        <div v-for="event in state.events" :key="state.events.registeredListId" class="col-4 mb-5">
          <div class="card text-center shadow">
            <div class="card-header">
              <div id="cardHeadLeft" @click="removeEvent(event.registeredListId, event.eventName)">
                <i class="far fa-trash-alt" style="margin-right: 10px; color: grey;"></i>Remove Event
              </div>

              <div v-if="event.synced == true" class="cardHeadRightS">This event has been synced</div>

              <div v-else class="cardHeadRightNS" @click="marketoPost(event.registeredListId)">
                <i class="fas fa-sync" style="margin-right: 10px; color: grey;"></i>Sync With Marketo
              </div>
            </div>
            <div class="card-body">
              <h2 class="card-title mb-4">{{ event.eventName }}</h2>
              <div class="card-text" style="font-size: 20px;">
                <p>
                  <b>No Shows</b>
                  : {{ event.registered.length }}
                </p>
                <p>
                  <b>Attended</b>
                  : {{ event.attended.length }}
                </p>
                <p>
                  <b>Opt-ins Gained</b>
                  : {{ event.optInsGained }}
                </p>
              </div>
              <div class="container-form-btn">
                <div class="form-btn-wrap">
                  <div class="form-btn-bg"></div>
                  <button class="con-form-btn" @click.prevent="goToList(event.registeredListId)">
                    <i
                      class="fas fa-sign-in-alt fa-lg"
                      style="margin-right: 20px; margin-top: 3px;"
                    ></i>Go to Event
                  </button>
                </div>
              </div>
            </div>
            <div class="card-footer text-muted">{{ event.eventDate }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Store from "../store/store";
import localforage from "localforage";
import localforageGetitems from "localforage-getitems";

export default {
  data() {
    return {
      state: Store
    };
  },
  methods: {
    goToList(id) {
      this.$router.push(`/list/${id}`);
    },
    addNew() {
      this.$router.push("/addnew");
    },
    marketoPost(id) {
      this.$router.push(`/marketoPost/${id}`);
    },
    removeEvent(id, eventName) {
      if (confirm("Are you sure you wish to delete: " + eventName)) {
        localforage.removeItem(id, () => {
          this.updateStore();
        });
      }
    },
    updateStore() {
      localforage
        .getItems()
        .then(function(res) {
          Store.events = Object.values(res);
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
#container {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  padding: 40px 55px 90px 55px;
}

.cardHeadRightNS {
  float: right;
  width: 50%;
  background-color: rgba(253, 145, 9, 0.18);
  border-left: 1px solid rgba(0, 0, 0, 0.125);
  padding: 3px;
}

.cardHeadRightS {
  float: right;
  width: 50%;
  background-color: rgba(107, 253, 9, 0.18);
  border-left: 1px solid rgba(0, 0, 0, 0.125);
  padding: 3px;
}

.cardHeadRightS:hover {
  cursor: default;
}

#cardHeadLeft {
  float: left;
  width: 50%;
  background: #ffeeee;
  padding: 3px;
}

#event-name {
  text-align: center;
  margin: 0 0 40px 0;
}

.card-text {
  margin-bottom: 20px;
  font-weight: 300;
}
.card-header {
  cursor: pointer;
  padding: 0px;
}

#cardHeadLeft:hover {
  background: #f3dada;
  transition: 0.5s;
}

.cardHeadRightNS:hover {
  background: rgb(255, 220, 176);
  transition: 0.5s;
}
</style>