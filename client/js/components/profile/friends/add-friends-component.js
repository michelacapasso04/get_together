import addFriendComp from "./add-friend-component.js"
import { bus } from "../../../main.js";

export default {
  props: ["user"],
  data() {
    return {
      friends: null,
      newFriend: "",
      fb: false,
      fbFriends: null,
    };
  },
  watch: {
    newFriend: function (val) {
      if (val) {
        setTimeout(() => {
          this.wait(val);
        }, 1000);
      }
    },
  },
  template: `
        <div>
        <button v-on:click="switchComponent('friendsComp')" class="btn bg-blue" style="margin:10px">&#10094 Back </button>
        <h4>Search for a person to add to your friends: </h4>
        <input  id="newFriendInput" v-model="newFriend" > 
        <div v-if="friends">
            <addFriendComp v-for="user in friends" v-bind:key="user.id"
                v-bind:user="user">
            </addFriendComp>
        </div>
        <div v-if="fb && fbFriends.length > 0">
         <hr>
            <h4>People you might know</h4>
            <br>
             <addFriendComp v-for="user in fbFriends" v-bind:key="user.id"
                v-bind:user="user">
            </addFriendComp>
        </div>

        </div>
    `,
  created() {
    fetch("/friends/facebook", {
      credentials: "include",
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          this.fb = true;
          this.fbFriends = data;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
  methods: {
    wait: function (value) {
      if (this.newFriend == value) {
        this.search(this.newFriend);
        return;
      }
    },
    switchComponent: function(comp) {
      bus.$emit("switchComp", comp);
    },
    search: function (v) {
      this.friends = null;
      fetch("/user/search?query=" + this.newFriend, {
        credentials: "include",
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          this.friends = data;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },

  components: {
    addFriendComp
  },
};