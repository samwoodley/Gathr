<template>
  <div class="col-sm-12 col-md-12 col-lg-12 pr-4.5">
    <div class="list-container">
      <div id="pageTitle">
        <h1>Add new event</h1>
      </div>

      <div class="container col-7">
        <form class="connection-form">
          <div class="input-wrap mb-5">
            <input
              class="form-input"
              type="text"
              name="eventname"
              v-model="eventName"
              :class="{hasVal: eventName.length > 0}"
            >
            <span class="form-input-label" label="EVENT NAME"></span>
          </div>
          <div class="input-wrap mb-5">
            <input
              class="form-input"
              type="text"
              name="eventdate"
              v-model="eventDate"
              :class="{hasVal: eventDate.length > 0}"
            >
            <span class="form-input-label" label="EVENT DATE (DD/MM/YY)"></span>
          </div>
          <div class="input-wrap mb-5">
            <input
              class="form-input"
              type="text"
              name="registeredListId"
              v-model="registeredListId"
              :class="{hasVal: registeredListId.length > 0}"
              maxlength="4"
            >
            <span class="form-input-label" label="MARKETO REGISTERED LIST ID"></span>
          </div>
          <div class="input-wrap mb-5">
            <input
              class="form-input"
              type="text"
              name="attendeeListId"
              v-model="attendeeListId"
              :class="{hasVal: attendeeListId.length > 0}"
              maxlength="4"
            >
            <span class="form-input-label" label="MARKETO ATTENDEE LIST ID"></span>
          </div>
          <div class="container-form-btn">
            <div class="form-btn-wrap">
              <div class="form-btn-bg"></div>
              <button class="con-form-btn" @click.prevent="addEvent">
                <i class="far fa-calendar-plus" style="margin-right:20px;"></i>Add Event
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <modal v-if="showModal" @close="showModal = false"></modal>
  </div>
</template>

<script>
import Marketo from "../store/marketo";
import Store from "../store/store";
import modal from "../components/FormValidation";

export default {
  components: {
    modal
  },
  data() {
    return {
      eventName: "",
      eventDate: "",
      registeredListId: "",
      attendeeListId: "",
      showModal: false
    };
  },
  methods: {
    addEvent() {
      if (
        !this.eventName ||
        !this.eventDate ||
        !this.registeredListId ||
        !this.attendeeListId
      ) {
        this.showModal = true;
        return;
      }
      const eventData = {
        eventName: this.eventName,
        eventDate: this.eventDate,
        registeredListId: this.registeredListId,
        attendeeListId: this.attendeeListId,
        registered: [],
        attended: [],
        synced: false,
        optInsGained: 0
      };
      Marketo.getContacts(eventData, eventData.registeredListId);
      this.$router.push("/dashboard");
    }
  }
};
</script>

<style scoped>
.list-container {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  padding: 40px 55px 90px 55px;
}

#pageTitle {
  text-align: center;
  margin: 0 0 40px 0;
}
</style>
