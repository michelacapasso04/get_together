export default{
    template: `
    <div>
        <h1>{{message}}</h1>
    </div>
    `,
    data() {
        return {
            path: this.$route.path
        }
    },
    computed: {
        message: function(){
            if(this.path.includes("/parties")){
                return "Party not found or deleted";
            }
            else{
                return "Page not found";
            }
        }
    },
}