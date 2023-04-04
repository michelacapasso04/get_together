import { bus } from "../../../main.js";
export default {
  data() {
    return {
      name: null,
      lastName: null,
      email: null,
      reveal: false,
    };
  },
  template: `
    <div class="high-bar edit" v-if="reveal">

            <label for="fname">First name:</label><br/>
            <input class="input" style="font-size:13px;" type="text" id="fname" placeholder="Name" v-model="name" /><br/>
            <label for="flast">Last name:</label><br/>
            <input class="input" style="font-size:13px;" type="text" id="flast" placeholder="Lastname" value="" v-model="lastName"/><br/>
            <label for="femail">E-mail:</label><br/>
            <input class="input" style="font-size:13px; " type="email" id="femail" placeholder="E-mail" value="" v-model="email"/><br/>
            <button class="btn btn-default leftB" @click="submit" v-bind:disabled="name.length < 2 || lastName.length < 2 || email.length < 2">Submit</button>
    </div>
    `,
  created() {
    fetch("/user/info", {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.name = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.reveal = true;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
  methods: {
    switchComponent(comp) {
      bus.$emit("switchComp", comp);
    },
    submit: function () {
      fetch("/user/update", {
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.name,
          lastName: this.lastName,
          email: this.email,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.switchComponent("infoComp");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
};
