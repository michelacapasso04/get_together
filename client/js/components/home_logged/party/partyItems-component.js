import recipesComponent from "./items-components/recipes-component.js"
import beersComponent from "./items-components/beers-component.js"
import cocktailsComponent from "./items-components/cocktails-component.js"
import winesComponent from "./items-components/wines-component.js"
import listComponent from "./list-component.js"

export default{
    props: ["party"],
    template: `
    <div class="party-component">
        <div>
        <a class="btn bg-orange" v-on:click="backStep" style="color: white;"> &#10094 Back </a>
        </div>
        <div class="items-conteiner">
            <div class="left-side">
            <recipesComponent v-on:addRecipe="addRecipe"></recipesComponent>
            <winesComponent v-on:addWine="addWine"></winesComponent>
            <beersComponent v-on:addBeer="addBeer"></beersComponent>
            <cocktailsComponent v-on:addCocktail="addCocktail"></cocktailsComponent>
            </div>
            <div class="right-side" v-bind:class="{ active: isActive }">
                <listComponent v-bind:list="party" v-on:reload="$emit('reload')"> </listComponent>
            </div>
            <div class="list" v-on:click="toggle">
                <svg enable-background="new 0 0 480 480" height="512" viewBox="0 0 480 480" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m480 192.5v34c0 17.645-14.355 32-32 32h-366.333c-4.418 0-8-3.582-8-8s3.582-8 8-8h366.333c8.822 0 16-7.178 16-16v-34c0-8.822-7.178-16-16-16h-416c-8.822 0-16 7.178-16 16v34c0 8.822 7.178 16 16 16 8.252 0 10.945-.625 13.9 2.611 2.208 2.413.142-5.285 36.842 180.051 2.219 11.206 12.119 19.338 23.543 19.338h267.43c11.424 0 21.324-8.133 23.543-19.338l26.983-136.265c.857-4.334 5.073-7.153 9.401-6.293 4.334.858 7.152 5.067 6.294 9.402l-26.983 136.264c-3.697 18.675-20.199 32.23-39.238 32.23h-267.43c-19.039 0-35.541-13.555-39.238-32.23l-33.618-169.77c-20.449 0-33.429-15.268-33.429-32v-34c0-17.645 14.355-32 32-32h24v-40c0-17.645 14.355-32 32-32h112c17.645 0 32 14.355 32 32v15c0 4.418-3.582 8-8 8s-8-3.582-8-8v-15c0-8.822-7.178-16-16-16h-112c-8.822 0-16 7.178-16 16v40h376c17.645 0 32 14.355 32 32zm-248 111v96c0 4.418 3.582 8 8 8s8-3.582 8-8v-96c0-4.418-3.582-8-8-8s-8 3.582-8 8zm-80 15v66c0 4.418 3.582 8 8 8s8-3.582 8-8v-66c0-4.418-3.582-8-8-8s-8 3.582-8 8zm160 0v66c0 4.418 3.582 8 8 8s8-3.582 8-8v-66c0-4.418-3.582-8-8-8s-8 3.582-8 8zm-124-251c4.418 0 8-3.582 8-8v-8c0-8.822 7.178-16 16-16h172c8.822 0 16 7.178 16 16v81.5c0 4.418 3.582 8 8 8s8-3.582 8-8v-81.5c0-17.645-14.355-32-32-32h-172c-17.645 0-32 14.355-32 32v8c0 4.418 3.582 8 8 8z"/></svg>
                <span v-if="number>0" class="number-item"> <strong>{{number}}</strong> </span>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            isActive: false,
            cocktails: this.party.cocktails,
            recipes: this.party.recipes,
            beers: this.party.beers,
            wines: this.party.wines,
            number: 0,
            cocktails_len: this.party.cocktails.length,
            recipes_len: this.party.recipes.length,
            beers_len: this.party.beers.length,
            wines_len: this.party.wines.length
        }
    },
    methods: {
        toggle(){
            this.number=0;
            this.isActive=!this.isActive;
        },
        //methods to add to the party an item
        addBeer: function(value){
            const index=this.party.beers.findIndex(x=>x.id===value.id);
            if(index==-1){
                value.quantity=1;
                this.party.beers.push(value);
            }
            else{
                this.party.beers[index].quantity++;
            }
        },
        addRecipe: function(value){
            const index=this.party.recipes.findIndex(x=>x.id===value.id);
            if(index==-1){
                value.quantity=1;
                this.party.recipes.push(value);
            }
        },
        addWine: function(value){
            const index=this.party.wines.findIndex(x=>x.id===value.id);
            console.log(this.party.wines);
            if(index==-1){
                value.quantity=1;
                this.party.wines.push(value);
            }
            else{
                this.party.wines[index].quantity++;
            }
            ;
            
        },
        addCocktail: function(value){
            const index=this.party.cocktails.findIndex(x=>x.cocktailID===value.cocktailID);
            if(index==-1){
                value.quantity=1;
                this.party.cocktails.push(value);
            }
            else{
                this.party.cocktails[index].quantity++;
            }
        },
        backStep: function(){
            this.$emit("back");
        }
    },
    components:{
        recipesComponent,
        beersComponent,
        cocktailsComponent,
        winesComponent,
        listComponent
    },
    watch: {
        cocktails: function(val){
            console.log(this.cocktails_len,this.cocktails.length);
            
            if(this.cocktails_len<this.cocktails.length){
                this.cocktails_len=this.cocktails.length;
                this.number++;}
        },
        beers: function(val){
            if(this.beers_len<this.beers.length){
                this.beers_len=this.beers.length;
                this.number++;}
        },
        wines: function(val){
            if(this.wines_len<this.wines.length){
                this.wines_len=this.wines.length;
                this.number++;}
        },
        recipes: function(val){
            if(this.recipes_len<this.recipes.length){
                this.recipes_len=this.recipes.length;
                this.number++;}
        },
        
    },
}