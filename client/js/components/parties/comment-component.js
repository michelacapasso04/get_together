
export default{
    name: "Comments",
    props: ["comment","mine"],
    template:`
                
    <div v-if="comment!=null"  v-bind:class=" (this.mine)?'mycomm':'othercomm' ">

            <div  class="messup">
                <span v-if="!mine" class='name'> {{name}} {{lastname}}</span>
                <span class='date'> {{date}}</span>
            </div>

            <div class="messdown"> 
                <p class='commtxt'> {{text}} </p>
            </div>
    </div>
    `,
    data(){
        return{
            date: null,
            name: this.comment.User.firstName,
            lastname: this.comment.User.lastName,
            text: this.comment.text
        }
    },
    created(){
            const parsed=new Date(this.comment.createdAt);
            this.date=parsed.getFullYear()+'-'+parsed.getMonth()+'-'+parsed.getDay()+' '
                +parsed.getHours()+':';
            this.date+=(parsed.getMinutes() <'10')?'0'+parsed.getMinutes():parsed.getMinutes();       
    }
}