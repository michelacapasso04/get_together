import friendComponent from "../profile/friend-component.js"
import recipeComponent from "../home_logged/party/items-components//recipe-component.js"
import wineComponent from "../home_logged/party/items-components/wine-component.js"
import beerComponent from "../home_logged/party/items-components/beer-component.js"
import cocktailComponent from "../home_logged/party/items-components/cocktail-component.js"
import comments from "./comments-component.js"
import pageNotFound from "../pageNotFound.js"

export default{
    name: "party",
    template:`
    <div>
        <div v-if="deleted">
            <pageNotFound></pageNotFound>
        </div>
        <div class="all" v-if="party&&!deleted">
    
        <div class="backsave">
            <a v-on:click="$router.go(-1)" class="btn lateralbutton bg-orange" style="color: white;">&#10094 Back </a>
            <button  v-on:click="save" class="btn lateralbutton bg-orange" v-if="party.isOwner && modify" > Save! </button>
            <button v-on:click="deleteparty" class="btn lateralbutton bg-orange" v-if="party.isOwner"> Delete Party </button>

            <div id="modifybutton">
                <button v-if="party.isOwner" v-on:click="editfunction" class="btn lateralbutton bg-orange" >
                    <svg  fill="white" viewBox="0 0 16 16"  xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
                        <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
                    </svg>
                </button>
            </div>
        </div>
        

        <div v-if="!modify" class="title">{{party.name}}</div>
        <div v-if="modify" class="title">
            <input class="elmod" v-model="edit.name" type="text"> </input>
        </div>
        <div class="info-bar">
            <div class="el" v-if="!modify">
                    <svg class="bi about bi-calendar" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M14 0H2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" clip-rule="evenodd"/>
                        <path fill-rule="evenodd" d="M6.5 7a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm-9 3a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm-9 3a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
                    </svg>
                <span class='value'>{{parsed}}</span>
            </div>
            <div v-if="modify" class="elmod">
                    <span class="modtxt">day:</span>
                    <DatePicker v-model="edit.datestart" value-type="date" type="date" />
            </div>

            <div class="el" v-if="!modify">
                    <svg class="bi about bi-watch" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M4 14.333v-1.86A5.985 5.985 0 012 8c0-1.777.772-3.374 2-4.472V1.667C4 .747 4.746 0 5.667 0h4.666C11.253 0 12 .746 12 1.667v1.86A5.985 5.985 0 0114 8a5.985 5.985 0 01-2 4.472v1.861c0 .92-.746 1.667-1.667 1.667H5.667C4.747 16 4 15.254 4 14.333zM13 8A5 5 0 103 8a5 5 0 0010 0z" clip-rule="evenodd"/>
                        <rect width="1" height="2" x="13.5" y="7" rx=".5"/>
                        <path fill-rule="evenodd" d="M8 4.5a.5.5 0 01.5.5v3a.5.5 0 01-.5.5H6a.5.5 0 010-1h1.5V5a.5.5 0 01.5-.5z" clip-rule="evenodd"/>
                    </svg> 
                <span class='value'>{{startTime}}</span>

                <span class='about'>  to: </span>
                <span class='value'>{{finishTime}}</span>
            </div>
            <div v-if="modify" class="elmod">
                <span class="modtxt">from</span> 
                <DatePicker v-model="edit.startTime" format="HH:mm" :minute-step="15" type="time" value-type="format">
                    <div slot="icon-calendar">
                        <svg id="Capa_1" enable-background="new 0 0 443.294 443.294" height="512" viewBox="0 0 443.294 443.294" width="512" xmlns="http://www.w3.org/2000/svg">
                        <path d="m221.647 0c-122.214 0-221.647 99.433-221.647 221.647s99.433 221.647 221.647 221.647 221.647-99.433 221.647-221.647-99.433-221.647-221.647-221.647zm0 415.588c-106.941 0-193.941-87-193.941-193.941s87-193.941 193.941-193.941 193.941 87 193.941 193.941-87 193.941-193.941 193.941z"/>
                        <path d="m235.5 83.118h-27.706v144.265l87.176 87.176 19.589-19.589-79.059-79.059z"/></svg>
                    </div>
                </DatePicker>
                <span class="modtxt">to</span> 
                <DatePicker v-model="edit.finishTime" format="HH:mm" :minute-step="15" type="time" value-type="format">
                    <div slot="icon-calendar">
                        <svg id="Capa_1" enable-background="new 0 0 443.294 443.294" height="512" viewBox="0 0 443.294 443.294" width="512" xmlns="http://www.w3.org/2000/svg">
                        <path d="m221.647 0c-122.214 0-221.647 99.433-221.647 221.647s99.433 221.647 221.647 221.647 221.647-99.433 221.647-221.647-99.433-221.647-221.647-221.647zm0 415.588c-106.941 0-193.941-87-193.941-193.941s87-193.941 193.941-193.941 193.941 87 193.941 193.941-87 193.941-193.941 193.941z"/>
                        <path d="m235.5 83.118h-27.706v144.265l87.176 87.176 19.589-19.589-79.059-79.059z"/></svg>
                    </div>
                </DatePicker>
            </div>


            <div class="el">
                    <svg class="bi about bi-person" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 00.014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 00.022.004zm9.974.056v-.002.002zM8 7a2 2 0 100-4 2 2 0 000 4zm3-2a3 3 0 11-6 0 3 3 0 016 0z" clip-rule="evenodd"/>
                    </svg>
                <span class='value'> {{party.owner.firstName}}</span>
            </div>
        </div>

        <div class="part-cont">
            <div class="middle">

                <div class="high-bar bar bg-main" > <span v-on:click="openContent('par')">Partecipants: </span></div>
                
                <div class="part" >
                    <friendComponent v-for="user in party.Users" v-if="par && (party.owner != user.id && user.UserParty.status=='accepted')"
                        v-bind:key="user.id"
                        v-bind:user="user"
                        v-bind:invited="true"
                    >
                    </friendComponent>
                </div>

                <div class="high-bar bar bg-main" > <span> About: </span></div>
                <div class="aboutcontent">

                    <div class="ptrecipes"  v-if="!(party.userRecipes.length==0 && party.apiRecipes.length==0)">   
                        <div class="high-bar barsmall bg-blue"> <span v-on:click="openContent('rec')"> Recipes: </span></div>
                        <recipeComponent v-for="(recipe,i) in party.apiRecipes" v-show="rec" v-if="(party.apiRecipes!=null)"
                            v-bind:recipe="recipe"
                            v-bind:key="recipe.id"
                            v-bind:btn="(party.isOwner && modify)? 'remove' : null"
                            type="api"
                            v-on:removeRecipe="removeapiRecipe(recipe.id)"
                        >
                        </recipeComponent>

                        <recipeComponent v-for="(recipe,i) in party.userRecipes" v-show="rec" v-if="(party.userRecipes!=null)"
                            v-bind:recipe="recipe"
                            v-bind:key="recipe.id"
                            v-bind:btn="(party.isOwner && modify)? 'remove' : null"
                            type="user"
                            v-on:removeRecipe="removeuserRecipe(recipe.id)"
                        >
                        </recipeComponent>
                    </div>

                    <div class="ptwines"  v-if="!(party.wines.length==0)">   
                        <div class="high-bar barsmall bg-red" > <span v-on:click="openContent('win')"> Wines: </span></div>
                        <wineComponent  v-for="(wine, i) in party.wines"  v-show="win" v-if="(party.wines!=null)"
                            v-bind:wine="wine"
                            v-bind:key="wine.id"
                            v-bind:btn="(party.isOwner && modify)? 'remove' : null"
                            v-on:removeWine="removeWine(wine.id)"
                        > 
                        </wineComponent>
                    </div>

                    <div class="ptbeers" v-if="!(party.beers.length==0)"> 
                        <div   class="high-bar barsmall bg-yellow" > <span v-on:click="openContent('be')"> Beers: </span></div>  
                        <beerComponent v-for="(beer, i) in party.beers" v-show="be" v-if=" (party.beers!=null)"
                            v-bind:beer="beer"
                            v-bind:key="beer.id"
                            v-bind:btn="(party.isOwner && modify)? 'remove' : null"
                            v-on:removeBeer="removeBeer(beer.id)"
                        > 
                        </beerComponent>
                    </div>

                    <div class="ptcocktail" v-if="!(party.cocktails.length==0)"> 
                        <div class="high-bar barsmall bg-green" > <span v-on:click="openContent('co')"> Cocktail: </span></div> 
                        <cocktailComponent v-for="(cocktail, i) in party.cocktails" v-show="co" v-if="(party.cocktails!=null)"
                            v-bind:cocktail="cocktail"
                            v-bind:key="cocktail.cocktailID"
                            v-bind:btn="(party.isOwner && modify)? 'remove' : null"
                            v-on:removeCocktail="removeCocktail(cocktail.cocktailID)"
                        > 
                        </cocktailComponent> 
                    </div>

                </div>
            </div>

            <div class="down">
                <div class="high-bar bar bg-main"> <span>Comments: </span></div>
                <comments
                    v-bind:comm="this.party.Comments">
                </comments>
            </div>
        </div>
        </div>
    </div>
    `,
    data(){
        return{
            party:null,
            date:null,
            parsed: null,
            startTime: null,
            finishTime: null,
            modify:false,
            deleted: false,

            par: false,
            rec:false,
            win:false,
            be:false,
            co:false,

            edit:{
                name:null,
                datestart:null,
                startTime:null,
                datefinish:null,
                finishTime:null,
                apiRecipes:null,
                userRecipes:null,
                wines:null,
                beers:null,
                cocktails:null
            }
        }
    },

    components:{
        friendComponent,
        recipeComponent,
        wineComponent,
        beerComponent,
        cocktailComponent,
        comments,
        pageNotFound
    },

    created() {
        fetch('/parties/'+this.$route.params.id,{
            method: "GET",
            credentials: "include"
        }).then(response =>{ 
            if(response.status==404){
                this.deleted=true;
            }
            else return response.json()
        })
        .then(data => {
                this.party=data;
                this.date= new Date(this.party.startDate);
                this.parsed= this.date.getDate()+"/"+(this.date.getMonth()+1)+"/"+this.date.getFullYear();
                this.startTime= this.date.getHours()+":";
                this.startTime+=(this.date.getMinutes() <'10')?'0'+this.date.getMinutes():this.date.getMinutes();
                this.finishTime= (new Date(this.party.finishDate)).getHours()+":";
                this.finishTime+=((new Date(this.party.finishDate)).getMinutes() <'10')?'0'+(new Date(this.party.finishDate)).getMinutes():(new Date(this.party.finishDate)).getMinutes();
            
        });
    },

    methods: {
        editfunction: function(){
            
            if(this.modify==true) this.modify=false;
            else this.modify=true;
            
            this.edit.name=this.party.name;

            this.edit.datestart=this.date;
            this.edit.startTime=this.startTime;
            this.edit.datefinish=new Date(this.party.finishDate);
            this.edit.finishTime=this.finishTime;


            this.edit.apiRecipes=this.party.apiRecipes;
            this.edit.userRecipes=this.party.userRecipes;
            this.edit.wines=this.party.wines;
            this.edit.beers=this.party.beers;
            this.edit.cocktails=this.party.cocktails;
        },
        openContent: function(el) {
            if(el=="par"){
             this.par=!this.par;
             this.rec=false;
             this.win=false;
             this.be=false;
             this.co=false;
            }
            else if(el=="win"){
                this.win=!this.win;
                this.rec=false;
                this.par=false;
                this.be=false;
                this.co=false;
            }
            else if(el=="be"){
                this.be=!this.be;
                this.rec=false;
                this.win=false;
                this.par=false;
                this.co=false;
            }
            else if(el=="co") {
                this.co=!this.co;
                this.rec=false;
                this.win=false;
                this.be=false;
                this.par=false;
            }
            else if(el=="rec"){
                this.rec=!this.rec;
                this.par=false;
                this.win=false;
                this.be=false;
                this.co=false;
            }
        },
        save: function(event){
            const timeStart=this.edit.startTime.split(":");
            this.edit.datestart.setHours(timeStart[0],timeStart[1]);
            this.edit.startTime=this.edit.datestart;
            if(this.edit.finishTime){
                const timeFinish=this.edit.finishTime.split(":");
                if(timeFinish[0]>=timeStart[0]) this.edit.datefinish.setHours(timeFinish[0],timeFinish[1]);
                else {
                    this.edit.datefinish.setDate(this.edit.datefinish.getDate()+1);
                    this.edit.datefinish.setHours(timeFinish[0],timeFinish[1]);
                }
                this.edit.finishTime=this.edit.datefinish;
            }

            this.party.name=this.edit.name;
            this.date=this.edit.datestart;
            this.parsed= this.date.getDate()+"/"+(this.date.getMonth()+1)+"/"+this.date.getFullYear();
            this.startTime= this.date.getHours()+":";
            this.startTime+=(this.date.getMinutes() <'10')?'0'+this.date.getMinutes():this.date.getMinutes();
            this.finishTime= (new Date(this.edit.datefinish)).getHours()+":";
            this.finishTime+=((new Date(this.edit.datefinish)).getMinutes() <'10')?'0'+(new Date(this.edit.datefinish)).getMinutes():(new Date(this.edit.datefinish)).getMinutes();
            fetch('/parties/'+this.$route.params.id,{
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                  },
                credentials: "include",
                body:JSON.stringify(this.edit)
            }).then(response => response.json())
            .then(result => {
              console.log('Success:', result);
            })
            .catch(error => {
              console.error('Error:', error);
            });

            this.modify=false;
        },
        removeapiRecipe:function(id){
            const index=this.edit.apiRecipes.findIndex(el=>el.id==id);
            if (index !== -1) {
                this.edit.apiRecipes.splice(index,1);
            }
        },
        removeuserRecipe:function(id){
            const index=this.edit.userRecipes.findIndex(el=>el.id==id);
            if (index !== -1) {
                this.edit.userRecipes.splice(index,1);
            }
        },
        removeWine:function(id){
            const index=this.edit.wines.findIndex(el=>el.id==id);
            if (index !== -1) {
                if(this.edit.wines[index].quantity==1)
                this.edit.wines.splice(index,1);
                else this.edit.wines[index].quantity--;
            }
        },
        removeBeer:function(id){
            const index=this.edit.beers.findIndex(el=>el.id==id);
            if (index !== -1) {
                if(this.edit.beers[index].quantity==1)
                this.edit.beers.splice(index,1);
                else this.edit.beers[index].quantity--;
            }
        },
        removeCocktail:function(id){
            const index=this.edit.cocktails.findIndex(el=>el.cocktailID==id);
            if (index !== -1) {
                if(this.edit.cocktails[index].quantity==1)
                this.edit.cocktails.splice(index,1);
                else this.edit.cocktails[index].quantity--;
            }
        },
        deleteparty:function(event){
            if(confirm("Are you sure you want to delete this party?")){
                fetch('/parties/'+this.$route.params.id,{
                    method: "DELETE",
                    credentials: "include",
                })
                .then(result => {
                console.log('Success:', result);
                })
                .catch(error => {
                console.error('Error:', error);
                });
                setTimeout(this.$router.push('/parties'),200);
            }
        }
            
    }
}