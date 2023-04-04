import friendComponent from "../../../profile/friend-component.js"
export default{
    props:["partecipants","error"],
    template:`
    <div class="friends-component">
        <div class="high-bar bg-blue">
                <span v-on:click="">Select your friends</span>
        </div>
        <p class="error">{{error}}</p>
        <div class="content">
                <friendComponent v-for="user in friends"
                    v-bind:key="user.id"
                    v-bind:user="user"
                    v-on:invited="addInvited"
                    v-on:uninvited="removeInvited"
                    btn="add"
                    >
                </friendComponent>
        </div>
    </div>
    `,
    data() {
        return {
            friends:[]
        }
    },
    components:{
        friendComponent
    },
    methods: {
        addInvited: function(id){
            this.partecipants.push(id);
        },
        removeInvited: function(id){
            const index=this.partecipants.findIndex((o)=>{
                return o === id;
            })
            if (index !== -1) {
                    this.partecipants.splice(index, 1);
            }
        },
        fetchFriends(){
            fetch(`/friends`,{
                method: "GET",
                credentials: "include"
            })
                .then(response => response.json())
                .then(data => {
                        this.friends=data.filter(x=>x.status=="accepted");
                }).catch(e=>{
                    console.error(e);
                });
        },
        objectsAreSame(x, y) {
            var objectsAreSame = true;
            for(var propertyName in x) {
               if(x[propertyName] !== y[propertyName]) {
                  objectsAreSame = false;
                  break;
               }
            }
            return objectsAreSame;
         }
    },
    created() {
        this.fetchFriends();
    },
    watch: {
        error:function(val){
            this.errorText=val;
        },
            $route: function(val){
                //funxione per capire quando aggiornare i friends
                const regex=/(\/recipes\/[0-9]+)|(\/beers\/[0-9]+)|(\/cocktails\/[0-9]+)|(\/wines\/[0-9]+)/;
                if(!regex.test(val.path)){
                    fetch(`/friends`,{
                        method: "GET",
                        credentials: "include"
                        })
                        .then(response => response.json())
                        .then(data => {
                                const new_friends=data.filter(x=>x.status=="accepted");
                                let same=true;
                                if(new_friends.length!==this.friends) same=false;
                                else{
                                    for(i=0;i<new_friend.length;i++){
                                        if(!this.objectsAreSame(new_friend[i],this.friends[i])){
                                            same=false;
                                            break;
                                        }
                                    }
                                }
                                if(!same) this.friends=new_friends;
                        }).catch(e=>{
                            console.error(e);
                        });
                }    
            }
    },  
}