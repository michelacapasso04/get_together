export default {
  template: `
        <div class="item-component friend">
            <div class="conteiner-component">
                <h5>{{firstName}} {{lastName}}</h5>
                <img v-bind:src="image">
                <span v-if="user.status == 'pending'">Pending</span>
                <div class="bottomB">
                    <button class="btn btn-default btn-view" @click="view">View profile</button>
                    <button v-if="state" class="btn btn-default btn-view" @click="addFriend">Add friend</button>
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
      show: false,
      state: this.user.state,
    };
  },
  mounted() {
    if (!this.image) {
      this.image = "../../../../../image/no-profile-picture.jpg";
    }
  },
  methods: {
    view: function () {
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
      }
    },

    addFriend: function () {
      fetch("/friends", {
        credentials: "include",
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: this.id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            alert("Friend request sent!");
          } else alert("Sorry, user not found");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
  props: ["user"],
};