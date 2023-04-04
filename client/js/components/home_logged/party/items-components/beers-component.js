import beerComponent from "./beer-component.js";
export default {
  template: `
    <div class="conteiner-component">
        <div class="high-bar bg-yellow" >
            <span v-on:click="openContent">Select beers</span>
            <div>
                <a v-on:click="resetFilter">Remove filter</a>
                <input autocomplete="off" v-model="beer_name" placeholder="beer name" v-on:change="fetchBeer">
                <input autocomplete="off" v-model="food" placeholder="food pairing" v-on:change="fetchBeer">
                <input autocomplete="off" v-model="abv_lt" placeholder="alcool max" v-on:change="fetchBeer">
                <input autocomplete="off" v-model="abv_gt" placeholder="alcool min" v-on:change="fetchBeer">
            </div>
        </div>
        <transition name="fade">
            <div v-show="focused" class="content">
                <beerComponent v-for="(beerIt, index) in beers"
                    v-bind:beer="beerIt"
                    v-bind:key="beerIt.id"
                    btn="add"
                    v-on:addItem="addItem"
                > </beerComponent>
            </div>
        </transition>
    </div>
    `,
  data() {
    return {
      focused: false,
      beers: null,
      beer_name: null,
      food: null,
      abv_gt: null,
      abv_lt: null,
    };
  },

    methods: {
        openContent: function() {
            this.focused=!this.focused;
        },
        fetchBeer: function(){
            this.focused=true;
            const url= new URLSearchParams(Object.assign({},
                this.beer_name?{beer_name:this.beer_name}:null,
                this.food?{food:this.food}:null,
                this.abv_lt?{abv_lt:this.abv_lt}:null,
                this.abv_gt?{abv_gt:this.abv_gt}:null
                ));
            console.log(url.toString());
            
            fetch(`/api/beers?`+url.toString())
            .then(response => response.json())
            .then(data => this.beers=data.slice(0,8));
        },
        resetFilter: function(){
            this.beer_name= null;
            this.food= null;
            this.abv_gt= null;
            this.abv_lt= null;        
        },
        addItem: function(value){
            this.$emit("addBeer",{
                id: value.id,
                name:value.name,
                abv:value.abv,
                image_url:value.image_url,
                description:value.description,
            });
        }
    },
    beforeCreate() {
        fetch('/api/beers/random?number=8',{
            method: "GET"
        }).then(response => response.json())
        .then(data => this.beers=data);
    }
    ,
    components:{
        beerComponent
    }
}

