import recipeComponent from "../home_logged/party/items-components/recipe-component.js"
export default{
    name:"recipesPage",
    template:`
    <div class="recipePage-component">
        <div class="recipe-add">
            <div class="high-bar bg-green"> 
                <span>Add your recipe:</span>
            </div>
            <form 
                @submit="addRecipe"
                method="post">
                <div>   
                    <p class="label">Recipe Url:</p>
                    <div class="description-info">Insert here the url of your favorite recipes finded on <a href="https://ricette.giallozafferano.it/" target="_blank">giallozafferano</a> </div>
                    <input v-model="data.sourceUrl" class="mx-input" type="text" placeholder="URL of recipe">
                    <span class="error">{{errors.sourceUrl}}</span>
                </div>
                <div>   
                    <p class="label">Dish Type:</p>
                    <select v-model="data.dishTypes" class="mx-input"">
                        <option value="main course">Main Course</option>
                        <option value="side dish">Side Dish</option>
                        <option value="dessert">Dessert</option>
                        <option value="appetizer">Appetizer</option>
                        <option value="salad">Salad</option>
                        <option value="bread">Bread</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="soup">Soup</option>
                        <option value="beverage">Beverage</option>
                        <option value="sauce">Sauce</option>
                        <option value="marinade">Marinade</option>
                        <option value="fingerfood">Fingerfood</option>
                        <option value="snack">Snack</option>
                        <option value="drink">Drink</option>
                    </select>
                    <span class="error">{{errors.dishTypes}}</span>
                </div>
                <div>   
                    <p class="label">Cuisines:</p>
                    <select v-model="data.cuisines" class="mx-input">
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
                    <span class="error">{{errors.cuisines}}</span>
                </div>
                <div>
                    <p class="label">Diets:</p>
                    <div class="description-info">Insert here the diets type of your recipes, if you are not sure leave it blank.<br>For more <a href="https://en.wikipedia.org/wiki/List_of_diets" target="_blank">info. </a> </div>
                    <select v-model="data.diets" class="mx-input">
                        <option value="Whole30">Whole30</option>
                        <option value="Gluten Free">Gluten Free</option>
                        <option value="Ketogenic">Ketogenic</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Lacto-Vegetarian">Lacto-Vegetarian</option>
                        <option value="Ovo-Vegetarian">Ovo-Vegetarian</option>
                        <option value="Vegan">Vegan</option>
                        <option value="Pescetarian">Pescetarian</option>
                        <option value="Paleo">Paleo</option>
                        <option value="Primal">Primal</option> 
                    </select>
                </div>
                <div>
                    <p class="label">Language:</p>
                    <select v-model="data.leng" class="mx-input">
                        <option value="en">English</option>
                        <option value="it">Italian</option>
                        <option value="es">Spanish</option>
                        <option value="zh">Chinese</option>
                    </select>
                    <span class="error">{{errors.leng}}</span>
                </div>
                <input type="submit" id="add-recipe" class="btn bg-green" value="Add recipe">
            </form>
        </div>
        <div class="user-recipes">
            <div class="high-bar bg-blue"> 
                <span>Your Recipes:</span>
            </div>
            <div class="content">
                <recipe-component v-for="recipe in myRecipes"
                            v-bind:recipe="recipe"
                            v-bind:key="recipe.id"
                            v-on:removeRecipe="removeRecipe"
                            type="user"
                            btn="remove"
                ></recipe-component>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            myRecipes:[],
            data: {
                sourceUrl: "",
                dishTypes:null,
                cuisines: null,
                diets: null,
                leng: null
            },
            errors:{
                occure: false,
                sourceUrl: null,
                dishTypes:null,
                cuisines: null,
                leng: null
            }
               
        }
    },
    components:{
        "recipe-component": recipeComponent
    },
    methods: {
        addError(key,message){
            this.errors.occure=true;
            this.errors[key]=message;
        },
        resetErrors(){
            this.errors.occure=false;
            this.errors.sourceUrl= null;
            this.errors.dishTypes=null;
            this.errors.cuisines= null;
            this.errors.diets= null;
            this.errors.leng=null;
        },
        addRecipe(e){
            e.preventDefault();
            this.resetErrors();
            const regexUrl=/^https:\/\/ricette.giallozafferano.it/;
            if(this.data.sourceUrl==="") this.addError("sourceUrl","Source url is required");
            if(!regexUrl.test(this.data.sourceUrl)) this.addError("sourceUrl","We only support giallozafferano recipes for now");
            if(this.data.dishTypes==null) this.addError("dishTypes","Dysh Type is required");
            if(this.data.cuisines==null) this.addError("cuisines","Cuisines is required");
            if(this.data.leng==null) this.addError("leng","Lenguage is required");
            if(!this.errors.occure){
                fetch("/recipes",{
                    method: "POST",
                    credentials:"include",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.data)
                })
                .then(async response=>{
                    console.log(response.status);
                    
                    if(response.status==200){
                        const data=await response.json();
                        this.$router.push("/recipes/"+data.id+"?type=user");
                    }
                    else{
                        this.resetErrors();
                        console.log("error");
                        
                        this.errors.sourceUrl="Error adding recipe";
                    }
                }).catch(e=>console.error(e));
            }
        },
        removeRecipe(recipe){
            fetch("/recipes/"+recipe.id,{
                method: "DELETE",
                credentials:"include"
            })
            .then(response=>{
                if(response.status==200){
                    console.log("Reloding");
                    this.fetchRecipes();
                }
                else {
                    console.error("error");
                }
            }).catch(e=>console.error(e));
        },
        fetchRecipes(){
            fetch("/recipes", {
                method: 'GET',
                credentials: 'include'
                })
            .then((response) => response.json())
            .then((json) => {
                this.myRecipes=json;
            }).catch((err) => {
                 console.log(err);
            });
        }
    },
    beforeMount() {
        this.fetchRecipes();
    }   
}