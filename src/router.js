import SignIn from './views/SignIn.vue';
import Dashboard from './views/Dashboard.vue';
import NavBar from './components/NavBar.vue';
import FullList from './views/List.vue';
import AddNew from './views/AddNew.vue';
import AddNewLead from './views/AddNewLead.vue';
import MarketoPost from './views/MarketoPost.vue';


export const routes = [{
        path: '/',
        component: SignIn
    },
    {
        path: '/dashboard',
        components: {
            default: Dashboard,
            'nav-bar': NavBar
        }
    },
    {
        path: '/addnew',
        components: {
            default: AddNew,
            'nav-bar': NavBar
        }
    },
    {
        path: '/addnewlead/:eventId',
        components: {
            default: AddNewLead,
            'nav-bar': NavBar
        }
    },
    {
        path: '/list/:id',
        components: {
            default: FullList,
            'nav-bar': NavBar
        }
    },
    {
        path: '/marketoPost/:id',
        components: {
            default: MarketoPost,
            'nav-bar': NavBar
        }
    },

    {
        path: '*',
        redirect: '/'
    }
];