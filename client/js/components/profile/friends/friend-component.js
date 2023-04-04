import { bus } from "../../../main.js";


export default {
  template: `
        <div class="item-component friend" v-if="reveal">
            <div class="conteiner-component">
                <h5>{{firstName}} {{lastName}}</h5>
                <img v-bind:src="image"><br/>
                <span v-if="user.status == 'pending'">Pending</span>
                <div class="bottomB">
                    <button class="btn btn-default btn-view" @click="view">View profile</button>
                    <button class="btn btn-danger btn-remove" @click="remove">Remove friend</button>
                </div>
            </div>
            <div class="friendView" v-if="show">
              <div class="info finfo" >
                  <div class="data">
                    <p id="finfo" >Nome: {{ firstName }}</p>
                    <p id="finfo">Cognome: {{ lastName }}</p>
                    <p id="finfo">E-mail: {{ email }}</p>
                  </div>
              </div>
            </div>
        </div>
    `,
  data() {
    return {
      image: this.user.image,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      id: this.user.id,
      reveal: true,
      show: false
    };
  },
  mounted() {
    if (!this.image) {
      this.image = "../../../../../image/no-profile-picture.jpg";
    }
  },
  methods: {
    view: function(){
      this.show = !this.show;
    },
    remove: function () {
      if (
        confirm(
          "Are you sure you want to remove " +
            this.firstName +
            " " +
            this.lastName +
            " from your friends?"
        )
      ) {
        fetch("/friends/remove", {
          credentials: "include",
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ friendId: this.id }),
        })
          .catch((error) => {
            console.error("Error:", error);
          });
        this.reveal = false;
      }
    },
  },
  props: ["user"],
};