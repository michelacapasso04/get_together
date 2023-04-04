import partyItems from "./party/partyItems-component.js"
import partyProgram from "./party/partyProgram-component.js"
//COMPONENT PRINCIPALE DELLA HOME DEGLI UTENTI LOGGATI  
export default{
    name: "homeComponent",
    template:`
        <div>
            <partyProgram v-on:next="nextStep" v-bind:party="party" v-show="state"> </partyProgram>
            <partyItems v-on:back="nextStep" v-on:reload="reload" v-bind:party="party" v-show="!state"></partyItems>
        </div>
    `,

    data() {
        return {
            state:true,
            party:{                 //oggetto principale che conterrà tutte le informazioni di un party
                name:null,          
                startDate:null,
                finishDate: null,
                recipes:[],
                wines: [],
                cocktails: [],
                beers: [],
                partecipants: []
            }
        }
    },
    components:{                  //components che uso
        partyItems,
        partyProgram
    },
    methods: {
        nextStep: function(){    //funzione per nascondere il primo component e vedere il secondo
            this.state=!this.state;
        },
        reload(){               // funzione per distruggere il component
            this.$destroy();
        }
    },

}