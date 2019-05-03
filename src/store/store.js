import localforage from "localforage";

const state = {
    credentials: {
        username: 'username',
        password: 'password'
    },
    accessToken: '',
    events: [],
    isSyncing: false,

    //Functions
    addEventToLocal
};

function addEventToLocal(eventListId, eventData) {
    localforage.setItem(eventListId, eventData).then(function (res) {
        state.events.push(res)
    }).catch(function (err) {
        console.error(err);
    });
}

export default state;