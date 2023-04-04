import cocktailComponent from "./cocktail-component.js"
export default{
    template: `
    <div class="conteiner-component">
        <div class="high-bar bg-green" >
            <span v-on:click="openContent">Select cocktails</span>
            <div>
                <a v-on:click="resetFilter">Remove filter</a>
                <input autocomplete="off" v-model="name" placeholder="cocktail name" v-on:change="fetchCocktail">
                <select v-model="category" v-on:change="fetchCocktail">
                    <option selected>Category</option>
                    <option value="Ordinary Drink">Ordinary Drink</option>
                    <option value="Cocktail">Cocktail</option>
                    <option value="Milk / Float / Shake">Milk / Float / Shake</option>
                    <option value="Other/Unknown">Other/Unknown</option>
                    <option value="Cocoa">Cocoa</option>
                    <option value="Shot">Shot</option>
                    <option value="Coffee / Tea">Coffee / Tea</option>
                    <option value="Homemade Liqueur">Homemade Liqueur</option>
                    <option value="Punch / Party Drink">Punch / Party Drink</option>
                    <option value="Beer">Beer</option>
                    <option value="Soft Drink / Soda">Soft Drink / Soda</option>
                </select>
                <select v-model="ingredient" v-on:change="fetchCocktail">
                    <option selected hidden>Ingredient</option>
                    <option value="Light rum">Light rum</option>
                    <option value="Applejack">Applejack</option>
                    <option value="Gin">Gin</option>
                    <option value="Dark rum">Dark rum</option>
                    <option value="Sweet Vermouth">Sweet Vermouth</option>
                    <option value="Strawberry schnapps">Strawberry schnapps</option>
                    <option value="Scotch">Scotch</option>
                    <option value="Apricot brandy">Apricot brandy</option>
                    <option value="Triple sec">Triple sec</option>
                    <option value="Southern Comfort">Southern Comfort</option>
                    <option value="Orange bitters">Orange bitters</option>
                    <option value="Brandy">Brandy</option>
                    <option value="Lemon vodka">Lemon vodka</option>
                    <option value="Blended whiskey">Blended whiskey</option>
                    <option value="Dry Vermouth">Dry Vermouth</option>
                    <option value="Amaretto">Amaretto</option>
                    <option value="Tea">Tea</option>
                    <option value="Champagne">Champagne</option>
                    <option value="Coffee liqueur">Coffee liqueur</option>
                    <option value="Bourbon">Bourbon</option>
                    <option value="Tequila">Tequila</option>
                    <option value="Vodka">Vodka</option>
                    <option value="Añejo rum">Añejo rum</option>
                    <option value="Bitters">Bitters</option>
                    <option value="Sugar">Sugar</option>
                    <option value="Kahlua">Kahlua</option>
                    <option value="demerara Sugar">demerara Sugar</option>
                    <option value="Dubonnet Rouge">Dubonnet Rouge</option>
                    <option value="Lime juice">Lime juice</option>
                    <option value="Irish whiskey">Irish whiskey</option>
                    <option value="Apple brandy">Apple brandy</option>
                    <option value="Carbonated water">Carbonated water</option>
                    <option value="Cherry brandy">Cherry brandy</option>
                    <option value="Creme de Cacao">Creme de Cacao</option>
                    <option value="Grenadine">Grenadine</option>
                    <option value="Port">Port</option>
                    <option value="Coffee brandy">Coffee brandy</option>
                    <option value="Red wine">Red wine</option>
                    <option value="Rum">Rum</option>
                    <option value="Grapefruit juice">Grapefruit juice</option>
                    <option value="Ricard">Ricard</option>
                    <option value="Sherry">Sherry</option>
                    <option value="Cognac">Cognac</option>
                    <option value="Sloe gin">Sloe gin</option>
                    <option value="Apple juice">Apple juice</option>
                    <option value="Pineapple juice">Pineapple juice</option>
                    <option value="Lemon juice">Lemon juice</option>
                    <option value="Sugar syrup">Sugar syrup</option>
                    <option value="Milk">Milk</option>
                    <option value="Strawberries">Strawberries</option>
                    <option value="Chocolate syrup">Chocolate syrup</option>
                    <option value="Yoghurt">Yoghurt</option>
                    <option value="Mango">Mango</option>
                    <option value="Ginger">Ginger</option>
                    <option value="Lime">Lime</option>
                    <option value="Cantaloupe">Cantaloupe</option>
                    <option value="Berries">Berries</option>
                    <option value="Grapes">Grapes</option>
                    <option value="Kiwi">Kiwi</option>
                    <option value="Tomato juice">Tomato juice</option>
                    <option value="Cocoa powder">Cocoa powder</option>
                    <option value="Chocolate">Chocolate</option>
                    <option value="Heavy cream">Heavy cream</option>
                    <option value="Galliano">Galliano</option>
                    <option value="Peach Vodka">Peach Vodka</option>
                    <option value="Ouzo">Ouzo</option>
                    <option value="Coffee">Coffee</option>
                    <option value="Spiced rum">Spiced rum</option>
                    <option value="Water">Water</option>
                    <option value="Espresso">Espresso</option>
                    <option value="Angelica root">Angelica root</option>
                    <option value="Orange">Orange</option>
                    <option value="Cranberries">Cranberries</option>
                    <option value="Johnnie Walker">Johnnie Walker</option>
                    <option value="Apple cider">Apple cider</option>
                    <option value="Everclear">Everclear</option>
                    <option value="Cranberry juice">Cranberry juice</option>
                    <option value="Egg yolk">Egg yolk</option>
                    <option value="Egg">Egg</option>
                    <option value="Grape juice">Grape juice</option>
                    <option value="Peach nectar">Peach nectar</option>
                    <option value="Lemon">Lemon</option>
                    <option value="Firewater">Firewater</option>
                    <option value="Lemonade">Lemonade</option>
                    <option value="Lager">Lager</option>
                    <option value="Whiskey">Whiskey</option>
                    <option value="Absolut Citron">Absolut Citron</option>
                    <option value="Pisco">Pisco</option>
                    <option value="Irish cream">Irish cream</option>
                    <option value="Ale">Ale</option>
                    <option value="Chocolate liqueur">Chocolate liqueur</option>
                    <option value="Midori melon liqueur">Midori melon liqueur</option>
                    <option value="Sambuca">Sambuca</option>
                    <option value="Cider">Cider</option>
                    <option value="Sprite">Sprite</option>
                    <option value="7-Up">7-Up</option>
                    <option value="Blackberry brandy">Blackberry brandy</option>
                    <option value="Peppermint schnapps">Peppermint schnapps</option>
                    <option value="Creme de Cassis">Creme de Cassis</option>
                    <option value="Jack Daniels">Jack Daniels</option>
                </select>
                <select v-model="type" v-on:change="fetchCocktail">
                    <option selected hidden>Alcoholic Filter</option>
                    <option value="Alcoholic">Alcoholic</option>
                    <option value="Non alcoholic">Non alcoholic</option>
                    <option value="Optional alcohol">Optional alcohol</option>
                </select>
            </div>
        </div>
        <transition name="fade">
            <div v-show="focused" class="content">
                <cocktailComponent v-for="(cocktail, index) in cocktails"
                v-bind:cocktail="cocktail"
                v-bind:key="cocktail.cocktailID"
                btn="add"
                v-on:addItem="addItem"
                > </cocktailComponent>
            </div>
        </transition>
    </div>
    `,
    data() {
        return {
            focused: false,
            cocktails: null,
            name: null,
            category:"Category",
            ingredient: "Ingredient",
            type: "Alcoholic Filter"
        }
    },
    methods: {
        openContent: function() {
            this.focused=!this.focused;
        },
        fetchCocktail: function(){
            this.focused=true;
            if(this.checkOk()){
                let url,query;
                if(this.category!="Category"){
                    url="/category";
                    query=new URLSearchParams(Object.assign({},{category: this.category}));
                }
                else if(this.name){
                    url="/name";
                    query=new URLSearchParams(Object.assign({},{name: this.name}));
                }
                else if(this.ingredient!="Ingredient"){
                    url="/ingredient";
                    query=new URLSearchParams(Object.assign({},{ingredient: this.ingredient}));
                }
                else if(this.type){
                    url="/type";
                    query=new URLSearchParams(Object.assign({},{type: this.type}));
                }
            
                fetch(`/api/cocktails${url}?${query.toString()}&number=8`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.cocktails=data["drinks"];
                });
            }
            else alert("You can't select more then 1 filter for cocktail search")
        },
        checkOk: function(){
            let num=0;
            if(this.category!=="Category")num++;
            if(this.name!==null) num++;
            if(this.type!=="Alcoholic Filter") num++;
            if(this.ingredient!=="Ingredient")num++;
            if(num==1)return true;
            else false;
        },
        resetFilter: function(){
            this.name= null;
            this.category="Category";
            this.ingredient= "Ingredient";
            this.type= "Alcoholic Filter";
        },
        addItem: function(value){
            this.$emit("addCocktail",{
                Ingredients: value.Ingredients,
                Quantity: value.Quantity,
                cocktailCat: value.cocktailCat,
                cocktailID: value.cocktailID,
                cocktailName: value.cocktailName,
                cocktailType: value.cocktailType,
                instructions: value.instructions,
                photo: value.photo,
            });
        }
    },
    beforeCreate() {
        fetch('/api/cocktails/random?number=8',{
            method: "GET"
        }).then(response => response.json())
        .then(data => this.cocktails=data["drinks"]);
    }
    ,
    components:{
        cocktailComponent
    }
}