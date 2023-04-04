import wineComponent from "./wine-component.js"
export default{
    template: `
    <div class="conteiner-component">
        <div class="high-bar bg-red" >
            <span v-on:click="openContent">Select wines</span>
            <div>
                <a v-on:click="resetFilter">Remove filter</a>
                <input autocomplete="off" v-model="food" placeholder="food pairing" v-on:change="fetchWine">
                <select ref="option" v-model="type" v-on:change="fetchWine">
                    <option hidden selected>Wine type</option>
                    <option value="Chardonnay">Chardonnay</option>
                    <option value="Riesling">Riesling</option>
                    <option value="Pinot Gris">Pinot Gris</option>
                    <option value="Sauvignon Blanc">Sauvignon Blanc</option>
                    <option value="Cabernet Sauvignon">Cabernet Sauvignon</option>
                    <option value="Pinot Noir">Pinot Noir</option>
                    <option value="Syrah">Syrah</option>
                    <option value="Zinfandel">Zinfandel</option>
                    <option value="Malbec">Malbec</option>
                    <option value="Merlot">Merlot</option>
                    <option value="Sparkling Rose">Sparkling Rose</option>
                    <option value="Chenin Blanc">Chenin Blanc</option>
                    <option value="Nero d'Avola">Nero d'Avola</option>
                </select>
                <select  v-model="cuisines" v-on:change="fetchWine">
                    <option hidden selected>Cuisines pairing</option>
                    <option value="African">African</option>
                    <option value="Cajun">Cajun</option>
                    <option value="Caribbean">Caribbean</option>
                    <option value="Chinese">Chinese</option>
                    <option value="French">French</option>
                    <option value="Greek">Greek</option>
                    <option value="Indian">Indian</option>
                    <option value="Italian">Italian</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Korean">Korean</option>
                    <option value="Mexican">Mexican</option>
                    <option value="Spanish">Spanish</option>
                    <option value="Thai">Thai</option>
                    <option value="Vietnamese">Vietnamese</option>
                </select>
            </div>
        </div>
        <transition name="fade">
            <div v-show="focused" class="content">
                <div class="paired-text" v-if="pairingText!=null">
                    {{pairingText}}
                </div>
                <wineComponent v-for="(wine, index) in wines"
                v-bind:wine="wine"
                v-bind:key="wines.id"
                btn="add"
                v-on:addItem="addItem"
                > </wineComponent>
            </div>
        </transition>
    </div>`,
    data() {
        return {
            wines:null,
            focused: false,
            first: true,
            type: "Wine type",
            cuisines: "Cuisines pairing",
            food: null,
            pairingText:null
        }
    },

    methods: {
        checkOk: function(){
            let num=0;
            if(this.type!=="Wine type")num++;
            if(this.cuisines!=="Cuisines pairing") num++;
            if(this.food!==null) num++;
            if(num==1)return true;
            else false;
            console.log(num);
        },
        resetFilter: function(){
            this.food= null;
            this.cuisines="Cuisines pairing";
            this.type= "Wine type";
        },
        openContent: function() {
            if(this.first){
                this.first=false;
                this.fetchRandom();
            }
            else this.focused=!this.focused;
        },
        fetchRandom: function(){
            const max=13;
            const random=Math.floor(Math.random() * max);
            this.type=this.$refs.option[random+1].innerText;
            this.fetchWine();
        },
        fetchWine:function(param){
            if(this.checkOk()){
                let url, query;
                if(this.food||this.cuisines!="Cuisines pairing"){
                    url="/pairing";
                    query=new URLSearchParams(Object.assign({},
                        (this.food)?{food:this.food}:null,
                        (this.cuisines!="Cuisines pairing")?{food:this.cuisines}:null));
                }
                else{
                    url="/recommendation";
                    query=new URLSearchParams(Object.assign({},{wine:this.type}));
                }
                fetch(`/api/wines${url}?${query.toString()}&number=4`)
                .then(response => response.json())
                .then(data => {
                    this.wines=data.wines;
                    this.pairingText=data.pairingText
                    this.focused=true;
                });
            }else alert("You can't select more then 1 filter for wines search")
        },
        addItem: function(value){
            
            this.$emit("addWine",{
                description: value.description,
                id: value.id,
                imageUrl: value.imageUrl,
                link: value.link,
                price: value.price,
                title: value.title
            });
        }
    },
    components:{
        wineComponent
    }
}