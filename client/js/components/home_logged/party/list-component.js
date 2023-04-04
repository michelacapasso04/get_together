export default{
    props: ["list"],
    template:`
    <div class="list-component">
        <h4> Your List </h4>
        <div class="section-list">
            <h5> Recipes: </h5>
            <ul>
                <li v-for="recipe in list.recipes">
                    {{recipe.title}} x{{recipe.quantity}}
                    <a v-on:click="removeItem(recipe.id,'recipes')"> remove </a>
                </li>
            </ul>
        </div>
        <div class="section-list">
            <h5> Wines: </h5>
            <ul>
                <li v-for="wine in list.wines">
                    {{wine.title}} x{{wine.quantity}}
                    <a v-on:click="removeItem(wine.id,'wines')"> remove </a>
                </li>
            </ul>
        </div>
        <div class="section-list">
            <h5> Beers: </h5>
            <ul>
                <li v-for="beer in list.beers">
                    {{beer.name}} x{{beer.quantity}}
                    <a v-on:click="removeItem(beer.id,'beers')"> remove </a>
                </li>
            </ul>
        </div>
        <div class="section-list">
            <h5> Cocktails: </h5>
            <ul>
                <li v-for="cocktail in list.cocktails">
                    {{cocktail.cocktailName}} x{{cocktail.quantity}}
                    <a v-on:click="removeItem(cocktail.cocktailID,'cocktails')"> remove </a>
                </li>
            </ul>
        </div>
        <div class="btn-create">
            <a class="btn bg-orange" v-on:click="create">Create your party</a>
        </div>
    </div>
    `,
    methods: {
        removeItem: function(id,type){
            const index=this.list[type].findIndex(function(o){
                return (type==='cocktails')?o.cocktailID==id:o.id === id;
            })
            if (index !== -1) {
                if(this.list[type][index].quantity==1)
                    this.list[type].splice(index, 1);
                else this.list[type][index].quantity--;
            }
        },
        create: function(){
            console.log(JSON.stringify(this.list));
            fetch("/parties",{
                method:"POST",
                credentials: 'include', // include, *same-origin, omit
                headers: {
                'Content-Type': 'application/json'
                },
                body:JSON.stringify(this.list) 
            }).then(response=>{
                return response.json()
            }).then(data=>{
                this.$emit("reload");
                this.$router.push('/parties/'+data.id);
            });
        }
    },

}