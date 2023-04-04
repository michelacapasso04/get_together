import navBar from "./components/navBar.js"
import PageNotFound from "./components/pageNotFound.js"
import profile from "./components/profile/profile-component.js"
import recipesPage from "./components/recipes/recipesPage-component.js"
import recipeInfo from "./components/recipes/recipeInfo-component.js"
import parties from "./components/parties/parties-component.js"
import homeComponent from "./components/home_logged/home-component.js";
import party from "./components/parties/party-component.js";
import wineInfo from "./components/wines/wineInfo-component.js";
import beerInfo from "./components/beers/beerInfo-component.js";
import cocktailInfo from "./components/cocktails/cocktailInfo-component.js";

const router = new VueRouter({
		routes:[
				{path:"/",name:"Home", component: homeComponent },
				{path:"/_=_",redirect: '/'},
				{path:"/profile",name:"Profile", component: profile},
				{path:"/recipes",name:"recipesPage", component: recipesPage},
				{path:"/recipes/:id",name:"recipeInfo", component: recipeInfo},

				{path:"/parties",name:"Parties", component: parties},
				{path:"/parties/:id",name:"PartyInfo", component: party},
				

				{path:"/wines/:id",name:"wineInfo", component: wineInfo},
				{path:"/beers/:id",name:"beerInfo", component: beerInfo},
				{path:"/cocktails/:id",name:"cocktailInfo", component: cocktailInfo},
				{ path: "*", component: PageNotFound }
		]
	});

const getUrl = window.location;
const baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];

export const bus = new Vue();
Vue.use(DatePicker);
var app = new Vue({
	el: "#app",
	data: {
		bannerImage: "../image/Principal.jpg",
		regexPat: /(homeComponent)/,
		socket: io(baseUrl),
		router: router,
	},
	components: {
	"nav-bar": navBar,
	},
	router
});
