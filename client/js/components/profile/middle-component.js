import infoComp from "./profile-info/info-component.js";
import notComp from "./notifications/notifications-component.js";
import friendsComp from "./friends/friends-component.js";
import editComp from "./profile-info/edit-component.js"
import { bus } from '../../main.js';
import addFriendsComp from "./friends/add-friends-component.js"

export default {
  
  template: `
    <div>
    <component :is="currentComp"></component>
    </div>
    `,

  data() {
    return {
      currentComp: "infoComp",
    };
  },
  created() {
    bus.$on("switchComp", (comp) => {
      this.currentComp = comp;
    });
  },
  methods: {},
  components: { 'infoComp': infoComp,
                'friendsComp': friendsComp,
                'notComp': notComp,
                'editComp': editComp,
                'addFriendsComp': addFriendsComp
            },
};
