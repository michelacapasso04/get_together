import recipeComponent from "./recipe-component.js"
export default{
    template: `
    <div class="conteiner-component">
        <div class="high-bar bg-blue" >
            <span v-on:click="openContent">Select recipes</span>
            <div>
            <a v-on:click="resetFilter">Remove filter</a>
            <input autocomplete="off" v-model="query" placeholder="recipe name" v-on:change="fetchRecipe">
            
            <select v-model="diets" v-on:change="fetchRecipe">
                <option selected hidden>Diets type</option>
                <option value="Gluten Free">Gluten Free</option>
                <option value="Ketogenic">Ketogenic</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Lacto-Vegetarian">Lacto-Vegetarian</option>
                <option value="Ovo-Vegetarian">Ovo-Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Pescetarian">Pescetarian</option>
                <option value="Paleo">Paleo</option>
                <option value="Primal">Primal</option>
                <option value="Whole30">Whole30</option>
            </select>
            <select v-model="cuisine" v-on:change="fetchRecipe">
                <option selected hidden>Cuisine type</option>
                <option value="African">African</option>
                <option value="American">American</option>
                <option value="British">British</option>
                <option value="Cajun">Cajun</option>
                <option value="Caribbean">Caribbean</option>
                <option value="Chinese">Chinese</option>
                <option value="Eastern European">Eastern European</option>
                <option value="European">European</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Greek">Greek</option>
                <option value="Indian">Indian</option>
                <option value="Irish">Irish</option>
                <option value="Italian">Italian</option>
                <option value="Japanese">Japanese</option>
                <option value="Jewish">Jewish</option>
                <option value="Korean">Korean</option>
                <option value="Latin American">Latin American</option>
                <option value="Mediterranean">Mediterranean</option>
                <option value="Mexican">Mexican</option>
                <option value="Middle Eastern">Middle Eastern</option>
                <option value="Nordic">Nordic</option>
                <option value="Southern">Southern</option>
                <option value="Spanish">Spanish</option>
                <option value="Thai">Thai</option>
                <option value="Vietnamese">Vietnamese</option>
            </select>
            <select v-model="intolerances" v-on:change="fetchRecipe">
                <option selected hidden>Intolerance</option>
                <option label="None"></option>
                <option value="Dairy">Dairy</option>
                <option value="Egg">Egg</option>
                <option value="Gluten">Gluten</option>
                <option value="Grain">Grain</option>
                <option value="Peanut">Peanut</option>
                <option value="Seafood">Seafood</option>
                <option value="Sesame">Sesame</option>
                <option value="Shellfish">Shellfish</option>
                <option value="Soy">Soy</option>
                <option value="Sulfite">Sulfite</option>
                <option value="Tree Nut">Tree Nut</option>
                <option value="Wheat">Wheat</option>
             </select>
             </div>
        </div>
        <transition name="fade">
            <div v-show="focused" class="content">
                <div class="separator"> <h4> Discover new recipes </h4> </div>
                <recipe-component v-for="recipe in recipes"
                    v-bind:recipe="recipe"
                    v-bind:key="recipe.id"
                    type="api"
                    btn="add"
                    v-on:addItem="addItem"
                > </recipe-component>
                <div class="separator"> 
                    <h4> Your recipes </h4>
                    <p v-if="myRecipes.length==0"> You haven't add any recipe! </p>
                 </div>
                <recipe-component v-for="recipe in myRecipes"
                    v-bind:recipe="recipe"
                    type="user"
                    btn="add"
                    v-bind:key="recipe.id"
                    v-on:addItem="addItem"
                ></recipe-component>
            </div>
        </transition>
        
        
    </div>
    `,
    data() {
        return {
            focused: false,
            first: true,
            recipes: null,
            myRecipes:[],
            query: null,
            cuisine: "Cuisine type",
            diets: "Diets type",
            intolerances:"Intolerance"
        }
    },
    methods: {
        openContent: function() {
            if(this.first){
                this.first=false;
                this.fetchRandom();
            }
            this.focused=!this.focused;
        },
        fetchRecipe: function(){
            this.focused=true;
            const url= new URLSearchParams(Object.assign({},
                this.query?{query:this.query}:null,
                this.cuisine&&this.cuisine!="Cuisine type"?{cuisine:this.cuisine}:null,
                this.diets&&this.intolerances!="Diets type"?{diets:this.diets}:null,
                this.intolerances&&this.intolerances!="Intolerance"?{intolerances:this.intolerances}:null,
                {number: 4}
                ));
            fetch(`/api/recipes?`+url.toString())
            .then(response => response.json())
            .then(data => {
                this.recipes=data;
            });
        },
        fetchRandom: function(){
            fetch('/api/recipes/random?number=4',{
                method: "GET"
            }).then(response => response.json())
            .then(data => this.recipes=data);
            //my Recipes
            fetch('/recipes',{
                method: "GET",
                credentials: "include"
            }).then(response => response.json())
            .then(data =>this.myRecipes=data);
        },
        resetFilter: function(){
            this.recipes=null;
            this.query=null;
            this.cuisine= "Cuisine type";
            this.diets="Diets type";
            this.intolerances= "Intolerance";
        },
        addItem: function(value){
            this.$emit("addRecipe",{
                analyzedInstructions: value.analyzedInstructions,
                cuisines: value.cuisines,
                diets: value.diets,
                dishTypes: value.dishTypes,
                extendedIngredients: value.extendedIngredients,
                id: value.id,
                image: value.image,
                leng: value.leng,
                quantity: value.quantity,
                readyInMinutes: value.readyInMinutes,
                servings: value.servings,
                sourceUrl: value.sourceUrl,
                summary: value.summary,
                title: value.title,
                type: value.type
            });
        }
    },
    components:{
        'recipe-component': recipeComponent
    },
    beforeMount() {
        //this.fetchRandom();
    }
};