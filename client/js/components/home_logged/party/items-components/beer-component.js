export default{
    props: ["beer","btn"],
    template: `
    <div class="item-component">
        <router-link :to="link">
            <h5>{{beer.name}}</h5>
        </router-link>
        <img v-bind:src="beer.image_url">
        <div class="info-item-component">
            <div>{{beer.tagline}}</div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M310.5 227.7c-16-20-24.8-44.8-26.3-73.9 -1.2-22.2 2.7-38.6 2.7-38.7l3.9-16.2 -16.3 3.2c-37.4 7.4-67.2 24-88.6 49.4 -17.7 21-29.8 48.4-36 81.5 -3.4-1.6-6.4-3.2-7.9-5.3l-11.8-15.4 -6.7 18.2c-9.6 26.1-13.1 51.2-10.6 74.6 2.3 21.4 9.5 40.9 21.5 58.1 12.1 17.3 28.7 31.6 48.2 41.5 18.4 9.3 38.4 14.3 57.9 14.3 0 0 0 0 0 0 0.1 0 0.1 0 0.2 0h0c0.1 0 0.1 0 0.2 0h10.6v-0.6c15.6-1.7 31.2-7 45.1-15.3 18-10.8 32-26 40.6-43.9C348.1 336.3 359.3 288.8 310.5 227.7zM317.9 349.9c-13.5 28.1-45.3 47.8-77.3 47.8 -34.2 0-69.1-18.3-88.9-46.6 -13.6-19.5-26.1-52.1-12.7-99.6 1.5 0.7 3 1.4 4.5 2.1 3.1 1.4 6.1 2.8 8.3 4.4l14.5 10.5 2.3-17.7c8.8-67.2 39.9-107.9 95-124 -0.8 7.4-1.2 16.8-0.7 27.5 1.6 33.5 12.3 63.5 31 86.8C324.6 279.6 333.2 318.2 317.9 349.9z"/><path d="M357.3 99.1c-23.6 0-42.7 19.1-42.7 42.7 0 23.6 19.1 42.7 42.7 42.7s42.7-19.1 42.7-42.7C400 118.2 380.9 99.1 357.3 99.1zM357.3 163.1c-11.8 0-21.3-9.6-21.3-21.3 0-11.8 9.6-21.3 21.3-21.3s21.3 9.6 21.3 21.3C378.7 153.5 369.1 163.1 357.3 163.1z"/></svg>
                <span>{{beer.abv}}</span>
            </div>
        </div>
        <span v-if="beer.quantity">x {{beer.quantity}} </span>
        <a v-if="btn=='add'" class="btn bg-yellow" v-on:click="emitAdd">Add to your party</a>
        <a v-if="btn=='remove'" class="btn bg-yellow" v-on:click="emitRemove">Delete beer</a>
    </div>
    `,
    data() {
        return {
            link: "/beers/"+this.beer.id
        }
    },
    methods: {
        emitAdd: function(){
            this.$emit("addItem",this.beer);
        },
        emitRemove: function(){
            this.$emit("removeBeer",this.beer);
        }
    },
}