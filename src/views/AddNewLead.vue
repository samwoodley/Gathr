<template>
  <div class="col-sm-12 col-md-12 col-lg-12 pr-4.5">
    <div class="list-container">
      <div id="pageTitle" class="mb-5">
        <h1>Add a new Lead to: {{ currentEvent.eventName }}</h1>
      </div>

      <div class="container col-7">
        <form class="connection-form">
          <div class="input-wrap mb-5">
            <input
              class="form-input"
              type="text"
              name="firstName"
              v-model="firstName"
              :class="{hasVal: firstName.length > 0}"
            >
            <span class="form-input-label" label="FIRST NAME"></span>
          </div>
          <div class="input-wrap mb-5">
            <input
              class="form-input"
              type="text"
              name="lastName"
              v-model="lastName"
              :class="{hasVal: lastName.length > 0}"
            >
            <span class="form-input-label" label="LAST NAME"></span>
          </div>
          <div class="input-wrap mb-5">
            <input
              class="form-input"
              type="text"
              name="email"
              v-model="email"
              :class="{hasVal: email.length > 0}"
            >
            <span class="form-input-label" label="EMAIL ADDRESS"></span>
          </div>
          <div class="input-wrap mb-5">
            <input
              class="form-input"
              type="text"
              name="company"
              v-model="company"
              :class="{hasVal: company.length > 0}"
            >
            <span class="form-input-label" label="COMPANY"></span>
          </div>
          <div class="mb-5">
            <button
              name="optInBtn"
              style="height:1px;"
              class="boxedBtn"
              :class="{tickBtn: optIn}"
              @click.prevent="optInChange()"
            ></button>
            <label
              style="margin-left: 15px;vertical-align: super; font-size:21px;"
              for="optInBtn"
            >{{ optIn ? 'Click to Opt Out' : 'Click to Opt In' }}</label>
            <p
              @click.prevent="showModal = true"
              style="text-decoration: underline; color: #169EAC; margin-left: 55px;"
            >Privacy Policy</p>
            <modal v-if="showModal" @close="showModal = false"></modal>
          </div>
          <div class="container-form-btn">
            <div class="form-btn-wrap">
              <div class="form-btn-bg"></div>
              <button class="con-form-btn" @click.prevent="addLeadToEvent()">
                <i class="fas fa-user-plus" style="margin-right: 15px"></i>Add to Event
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Marketo from "../store/marketo";
import Store from "../store/store";
import List from "./List";
import localforage from "localforage";
import modal from "../components/Privacy";

export default {
  components: {
    modal
  },
  data() {
    return {
      state: Store.events,
      currentEvent: {},
      eventId: this.$route.params.eventId,
      showModal: false,
      firstName: "",
      lastName: "",
      company: "",
      email: "",
      optIn: false
    };
  },
  created() {
    this.state.forEach(event => {
      if (event.registeredListId == this.eventId) {
        this.currentEvent = event;
      }
    });
  },
  methods: {
    optInChange() {
      this.optIn = !this.optIn;
    },
    addLeadToEvent() {
      const lead = {
        id: null,
        attended: true,
        firstName: this.firstName,
        lastName: this.lastName,
        company: this.company,
        email: this.email,
        optIn: this.optIn,
        optStatusChange: false,
        walkIn: true
      };
      if (lead.optIn == true) {
        this.currentEvent.optInsGained++;
      }
      this.currentEvent.attended.push(lead);
      localforage.setItem(this.eventId, this.currentEvent);
      this.$router.push(`/list/${this.eventId}`);
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

.boxedBtn:before {
  font-family: "Font Awesome 5 Free";
  content: "\f0c8";
  font-size: 40px;
  color: #a9a9a9;
  transition: 1s ease;
}

.tickBtn:before {
  font-family: "Font Awesome 5 Free";
  content: "\f14a";
  font-size: 40px;
  color: #169eac;
  transition: 1s ease;
}
</style>