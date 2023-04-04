export default{
    props: ["wine","btn"],
    template: `
    <div class="item-component">
        <router-link :to="link">
            <h5>{{wine.title}}</h5>
        </router-link>
        <img v-bind:src="wine.imageUrl">
        <div class="info-item-component">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M437 75C388.7 26.6 324.4 0 256 0S123.3 26.6 75 75C26.6 123.3 0 187.6 0 256s26.6 132.7 75 181C123.3 485.4 187.6 512 256 512s132.7-26.6 181-75C485.4 388.7 512 324.4 512 256S485.4 123.3 437 75zM256 482C131.4 482 30 380.6 30 256S131.4 30 256 30s226 101.4 226 226S380.6 482 256 482z"/><path d="M272.1 241h-32.1c-18.3 0-33.2-14.9-33.2-33.2 0-18.3 14.9-33.2 33.2-33.2H304.2c8.3 0 15-6.7 15-15s-6.7-15-15-15H271v-33.2c0-8.3-6.7-15-15-15s-15 6.7-15 15v33.2h-1.1c-34.8 0-63.2 28.4-63.2 63.2 0 34.8 28.4 63.2 63.2 63.2h32.1c18.3 0 33.2 14.9 33.2 33.2 0 18.3-14.9 33.2-33.2 33.2h-64.3c-8.3 0-15 6.7-15 15s6.7 15 15 15H241v33.2c0 8.3 6.7 15 15 15s15-6.7 15-15V367.4h1.1c34.8 0 63.2-28.4 63.2-63.2S306.9 241 272.1 241z"/></svg>
                {{price}}
        </div>
        <span v-if="wine.quantity">x {{wine.quantity}} </span>
        <a v-if="btn=='add'" class="btn bg-red" v-on:click="addItem">Add to your party</a>
        <a v-if="btn=='remove'" class="btn bg-red" v-on:click="emitRemove">Delete wine</a>
        
    </div>
    `,
    data() {
        return {
            price: this.wine.price.substring(1),
            link: "/wines/"+this.wine.id
        }
    },
    methods: {
        addItem: function(){
            this.$emit("addItem",this.wine);
        },
        emitRemove: function(){
            this.$emit("removeWine",this.wine);
        }
    },
}