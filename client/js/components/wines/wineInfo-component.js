export default{
    name: "wineInfo",
    template: `
    <div class="itemInfo-component">
        <a class="btn bg-orange" v-on:click="back" style="color: white;"> &#10094 Back </a>
        <div v-if="wine.title" class="item-title">
            <h1>{{wine.title}}</h1>
        </div>
        <div class="itemInfo-conteiner">
            <div class="item-left"> 
                <div class="item-image">
                    <img :src="wine.image">
                </div>
            </div>
            <div class="item-right">
                <div class="item-specific">
                    <div class="item-field">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M437 75C388.7 26.6 324.4 0 256 0S123.3 26.6 75 75C26.6 123.3 0 187.6 0 256s26.6 132.7 75 181C123.3 485.4 187.6 512 256 512s132.7-26.6 181-75C485.4 388.7 512 324.4 512 256S485.4 123.3 437 75zM256 482C131.4 482 30 380.6 30 256S131.4 30 256 30s226 101.4 226 226S380.6 482 256 482z"/><path d="M272.1 241h-32.1c-18.3 0-33.2-14.9-33.2-33.2 0-18.3 14.9-33.2 33.2-33.2H304.2c8.3 0 15-6.7 15-15s-6.7-15-15-15H271v-33.2c0-8.3-6.7-15-15-15s-15 6.7-15 15v33.2h-1.1c-34.8 0-63.2 28.4-63.2 63.2 0 34.8 28.4 63.2 63.2 63.2h32.1c18.3 0 33.2 14.9 33.2 33.2 0 18.3-14.9 33.2-33.2 33.2h-64.3c-8.3 0-15 6.7-15 15s6.7 15 15 15H241v33.2c0 8.3 6.7 15 15 15s15-6.7 15-15V367.4h1.1c34.8 0 63.2-28.4 63.2-63.2S306.9 241 272.1 241z"/></svg>
                        {{wine.price/100}}
                    </div>
                </div>
                <div v-if="wine.description" class="item-more-info">
                    <h4> Description: </h4>
                    <div>
                        <p>
                            {{wine.description}}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            wine: null

        }
    },
    beforeMount() {
        fetch("/api/wines/"+this.$route.params.id,{
            credentials:"include"
        })
       .then(response=>response.json())
        .then(data=>{
            this.wine=data;
        });
    },
    methods: {
        back: function(){
            this.$router.back();
        }
    },
}