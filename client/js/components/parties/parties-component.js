
export default{
    name: "parties",
    template:`
    <div  class="parties-component">
        <div class="line">
            <div class="container-parties">
                <div  class="high-bar bar bg-yellow" >
                    <span> Your parties </span>
                </div>
                <div v-if="yourparties">
                    <div v-for="party in yourparties" class="parties-elements">
                        <router-link v-if="party!='null'" :to='"/parties/"+party.id' id="link">
                            <li> "{{party.name}}" on {{parsing(party.startDate)}}</li>
                        </router-link>
                    </div>
                </div>
            </div>

            <div class="container-parties">
                <div class="high-bar bar bg-red" >
                    <span> Parties you have been invited to </span>
                </div>
                <div v-if="otherparties">
                    <div v-for="party in otherparties" class="parties-elements">
                            <router-link v-if="party!='null'" :to='"/parties/"+party.id' id="link">
                                <li> "{{party.name}}" on {{parsing(party.startDate)}}</li>
                            </router-link>
                    </div>
                </div>
            </div>

        </div>


    </div>
    `,
    data() {
        return {
            yourparties: null,
            otherparties: null
        }
    },
    created() {
        fetch('/parties',{
            method: "GET",
            credentials: "include"
        }).then(response => response.json())
        .then(data => {
            this.yourparties=data
        });

        fetch('/parties/other',{
            method: "GET",
            credentials: "include"
        }).then(response => response.json())
        .then(data => this.otherparties=data);
    },
    methods:{
        parsing: function(d){
            let date=new Date(d);
            date=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
            return date
        }
    }
}
