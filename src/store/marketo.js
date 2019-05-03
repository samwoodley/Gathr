import Axios from 'axios'
import Store from '../store/store'

const baseUrl = "TAKEN OUT DUE TO PRIVATE DATA";
const clientId = "TAKEN OUT DUE TO PRIVATE DATA";
const clientSecret = "TAKEN OUT DUE TO PRIVATE DATA";

function getToken() {
   return Axios.get(`${baseUrl}/identity/oauth/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`)
      .then(function (res) {
         Store.accessToken = res.data.access_token
      })
      .catch(error => {
         console.log(error)
      })
};

function getContacts(eventData, listId) {
   getToken().then(function () {
      return Axios.get(`TAKEN OUT DUE TO PRIVATE DATA/rest/v1/list/${listId}/leads.json?fields=email,firstName,lastName,company,optIn`, {
         headers: {
            'Authorization': 'Bearer ' + Store.accessToken
         }
      })
   }).then(function (res) {
      res.data.result.forEach(function (lead) {
         lead.attended = false
         lead.optStatusChange = false
         eventData.registered.push(lead)
      })
      Store.addEventToLocal(listId, eventData)
   }).catch(err => console.log(err))
}

///////////////////////////////////////////////////////////////////////////////////////////

async function startSync(attended, id) {
   const allAttendees = attended
   const listId = id

   const walkIns = allAttendees.filter(contact => contact.id == null)

   if (walkIns.length > 0) {
      await walkInCheck(walkIns)
   }

   await optInChangeCheck(allAttendees);

   await listPush(allAttendees, listId)
}


async function walkInCheck(walkIns) {
   await getToken()

   for (let contact of walkIns) {
      const res = await Axios.get(`TAKEN OUT DUE TO PRIVATE DATA/rest/v1/leads.json?filterType=email&filterValues=${contact.email}`, {
         headers: {
            'Authorization': 'Bearer ' + Store.accessToken
         }
      })
      if (res.data.result.length == 0) {
         await createNewContact(contact)
      } else {
         contact.id = res.data.result[0].id
      }
   }
}


function optInChangeCheck(allAttendees) {
   allAttendees.forEach(contact => {
      const axiosConfig = {
         headers: {
            'Authorization': 'Bearer ' + Store.accessToken,
            'Content-Type': 'application/json'
         }
      }
      if (contact.optStatusChange || contact.walkIn == true) {
         const postData = {
            "action": "updateOnly",
            "lookupField": "id",
            "input": [{
               "id": contact.id,
               "optIn": contact.optIn
            }]
         }
         return Axios.post('TAKEN OUT DUE TO PRIVATE DATA/rest/v1/leads.json', postData, axiosConfig)
            .catch(err => console.log(err))
      }
   })
}


function createNewContact(contact) {
   const postData = {
      "action": "createOnly",
      "lookupField": "email",
      "input": [{
         "firstName": contact.firstName,
         "lastName": contact.lastName,
         "email": contact.email,
         "company": contact.company,
         "optIn": contact.optIn
      }]
   }
   const axiosConfig = {
      headers: {
         'Authorization': 'Bearer ' + Store.accessToken,
         'Content-Type': 'application/json'
      }
   }
   return Axios.post('TAKEN OUT DUE TO PRIVATE DATA/rest/v1/leads.json', postData, axiosConfig)
      .then(res => {
         contact.id = res.data.result[0].id
      })
      .catch(err => console.log(err))
}


function listPush(allAttendees, listId) {
   let promiseChain = Promise.resolve();

   allAttendees.forEach(contact => {

      const postData = {
         "input": [{
            "id": contact.id
         }]
      }
      const axiosConfig = {
         headers: {
            'Authorization': 'Bearer ' + Store.accessToken,
            'Content-Type': 'application/json'
         }
      }
      promiseChain = promiseChain.then(() => {
         return Axios.post(`TAKEN OUT DUE TO PRIVATE DATA/rest/v1/lists/${listId}/leads.json`, postData, axiosConfig)
            .catch(err => console.log(err))
      })
   });
   return promiseChain;
}

export default {
   getContacts,
   startSync
}