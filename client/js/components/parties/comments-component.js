import comment from "./comment-component.js"

export default{
    name: "Comments",
    props: ["comm"],
    template:`
    <div v-if="allcomments" class="comm-component">
        <div class='comments-container' id="scrollable">      
            <comment v-for="c in allcomments"
                        v-bind:comment="c"
                        v-bind:mine="c.mycomm"
            ></comment> 
        </div>        
        <div class="addmess">
            <input type="text" v-model="newcomment" @keyup="addmessenter" placeholder="add a comment" ></input>
            <button class="btn bg-main"  v-on:click="addmessfunc" >ADD</button>
        </div>

    </div>

    `,
    data(){
        return{
        newcomment:null,
        allcomments:null
        }
    },
    components:{
        comment
    },
    created(){
        this.allcomments=this.comm;
    },
    mounted() {
        this.scrolldown();
        this.$root.$data.socket.on("newComment",(msg)=>{
            if(msg!=null){
            this.allcomments.push(msg.comment);
            this.scrolldown();
        }})
    },
    methods:{
        scrolldown(){
            const id="scrollable";
            var div = document.getElementById(id);
            div.scrollTop = div.scrollHeight - div.clientHeight;
        },
        addmessenter:function(e){
            if(e!=null&&e.keyCode==13) this.addmessfunc();
        },
        addmessfunc:function(){
            if(this.newcomment!=null){
                fetch('/parties/'+this.$route.params.id+'/comment',{
                    method: "POST",
                    credentials: "include",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        commentTxt: this.newcomment
                    })
                })
                .then(response => response.json())
                .then(data => {
                    data.mycomm=true;
                    this.allcomments.push(data);
                    this.newcomment=null;
                    this.scrolldown();
                });
            }
        }
    }
}