<template>
  <div class="col-sm-12 col-md-12 col-lg-12 pr-4.5">
    <div class="list-container">
      <div id="event-name">
        <h1>{{ currentEvent.eventName }}</h1>
        <select id="viewOption" class="form-control" v-model="selected">
           <option disabled value="">View type</option>
          <option value="View All">View all</option>
          <option value="Attended">Signed In</option>
          <option value="Registered">Still to come</option>
        </select>
        <input v-model="search" class="form-control search" placeholder="Filter by surname">
        <button class="btn privBtn" @click.prevent="showModal = true"><i class="fas fa-gavel" style="margin-right: 15px"></i>Privacy Policy</button>
        <button class="btn addNewBtn" @click.prevent="addNewLead()"><i class="fas fa-user-plus" style="margin-right: 15px"></i>Add new Attendee</button>
      </div>

      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Email</th>
              <th scope="col">Company</th>
              <th scope="col" style="text-align:center; width: 200px">Opt in</th>
              <th scope="col" style="width:230px;"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contact in filteredList">
              <td>{{ contact.firstName }}</td>
              <td>{{ contact.lastName }}</td>

              <td>{{ contact.email }}</td>
              <td>{{ contact.company}}</td>
              <td style="text-align:center">
                <button
                  style="height:1px;"
                  class="boxedBtn"
                  :class="{tickBtn: contact.optIn}"
                  @click.prevent="optInContact(contact)"
                ></button>
              </td>

              <td style="text-align: right;">
                <button
                v-if="contact.attended"
                  class="signedInBtn"
                  @click.prevent="signIn(contact)"
                  :class="{signedIn: contact.attended}"
                ><i class="fas fa-sign-out-alt" style="margin-right: 10px;"></i>Sign Out </button>

                <button
                  v-else
                  class="signedInBtn"
                  @click.prevent="signIn(contact)"
                  :class="{signedIn: contact.attended}"
                ><i class="fas fa-sign-in-alt" style="margin-right: 10px; margin-left: -16px;"></i>Sign In</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
          <modal v-if="showModal" @close="showModal = false">
          </modal>
  </div>
</template>

<script>
import Store from "../store/store";
import localforage from "localforage";
import localforageGetitems from "localforage-getitems";
import modal from '../components/Privacy';

export default {
    components: {
      modal
  },
  data() {
    return {
      id: this.$route.params.id,
      state: Store.events,
      currentEvent: {},
      allLeads: [],
      search: "",
      selected: "",
      showModal: false
    };
  },
  created() {
    this.state.forEach(event => {
      if (event.registeredListId == this.id) {
        this.currentEvent = event;
        this.allLeads.push(...event.attended);
        this.allLeads.push(...event.registered);
      }
    });
  },
  methods: {
    addNewLead() {
      this.$router.push(`/addnewlead/${this.id}`);
    },
    signIn(contact) {
      contact.attended = !contact.attended;
      let contactRegIndex = this.currentEvent.registered.indexOf(contact);
      let contactAttIndex = this.currentEvent.attended.indexOf(contact);

      if (contactRegIndex >= 0) {
        this.currentEvent.registered.splice(contactRegIndex, 1);
        this.currentEvent.attended.push(contact);
      } 
      else if (contactAttIndex >= 0) {
        this.currentEvent.attended.splice(contactAttIndex, 1);
        this.currentEvent.registered.push(contact);
      }
      localforage.setItem(this.id, this.currentEvent);
    },
    optInContact(contact) {
      if(contact.optIn == false){
        contact.optIn = true
        contact.optStatusChange = true
        this.currentEvent.optInsGained++
      }
      else {
        contact.optIn = false
        contact.optStatusChange = true
        this.currentEvent.optInsGained--
      }
    }
  },
  computed: {
    filteredList() {
      return this.allLeads.filter(contact => {
        return contact.lastName
          .toLowerCase()
          .includes(this.search.toLowerCase());
      }).filter(contact => {
        if (this.selected == 'Attended') {
          return contact.attended === true
        }
        if (this.selected == 'Registered') {
          return contact.attended === false
        }
        return true
      })
    }
  }
};
</script>

<style scoped>
td {
  vertical-align: middle !important;
}

h1 {
  text-align: left;
  float: left;
  margin-bottom: 40px;
  font-size: 45px;
}

.signedIn {
  background-color: #007189 !important;
  border-color: #007189 !important;
}

.search {
  width: 300px;
  float: right;
  margin-top: 8px;
}

#viewOption {
  float: right;
  margin-top: 8px;
  width: 150px;
  margin-left: 15px;
}

.signedInBtn {
  background-color: #08a0c2;
  border-color: #08a0c2;
  color: #fff;
  width: 175px;
  padding: 5px;
  font-size: 19px;
  cursor: pointer;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  line-height: 1.5;
  border-radius: 0.25rem;
}

.signedInBtn:hover {
  background-color: #007189;
  border-color: #007189;
    transition: 1s ease;
}

.table {
  font-size: 25px;
}

.list-container {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  padding: 40px 55px 90px 55px;
}

#event-name {
  text-align: center;
  margin: 0 0 40px 0;
}

.privBtn {
  float: right;
  width: 165px;
  margin-right: 15px;
  margin-top: 8px;
  color: #fff;
  background-color: #bfd177;
}

.privBtn:hover {
  background-color: #9fc01e;
}

.addNewBtn {
  float: right;
  width: 215px;
  margin-right: 15px;
  margin-top: 8px;
  color: #fff;
  background-color: #bfd177;
}

.addNewBtn:hover {
  background-color: #9fc01e;
}

.boxedBtn:before {
  font-family: "Font Awesome 5 Free";
  content: '\f0c8';
  font-size: 40px; 
  color: #a9a9a9;
  transition: 1s ease;
}

.tickBtn:before {
  font-family: "Font Awesome 5 Free";
  content: '\f14a';
  font-size: 40px;
  color: #009e00;
  transition: 1s ease;
}
</style>