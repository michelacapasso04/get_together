import navBar from "./nav.js"

var fp=new Vue({
    el:"#fp",
    data:{
        bannerImage:"../../../image/Principal.jpg",
        errorFirstName: null,
        errorLastName: null,
        errorPassword: null,
        error: null,
    },
    components:{
        "nav-bar":navBar
    },
    created(){
        this.control=true;
    },
    methods: {
        login(e){
            e.preventDefault();
            const data={
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    email: $("#emailform").val(),
                    password: $("#pswform").val()
                })
            }
            fetch("/login",data).then(response=>{
                if(response.status==400){
                     this.error=("Invalid email or password");
                     $("#pswform").val("");
                     $("#emailform").val("");
                }
                else if (response.redirected) {
                    window.location.href = response.url;
                }
            })
        },
        checkInput(){
            const regName=/[a-zA-Z]+/;
            const regPassMed=/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
            const regPassStrong=/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}/;

            const firstName= $("#firstnameform").val();
            const lastName= $("#lastnameform").val();
            const email= $("#emailform").val();
            const password= $("#pswform").val();
            const con_password= $("#confirm_pswform").val();

            this.errorFirstName=null;
            this.errorLastName=null;
            this.errorPassword=null;

           if(firstName&&!regName.test(firstName)){
                this.errorFirstName="First Name must conteins at least one letter"
           }
           if(lastName&&!regName.test(lastName)){
                this.errorLastName="Last Name must conteins at least one letter"
           }
           if(password&&con_password){
            if(password!=con_password) this.errorPassword="Passwords are different";
            }
           if(password&&regPassStrong.test(password)){
                $("#pswform").css('background-color','lightgreen')
           }
           else if(password&&regPassMed.test(password)){
                $("#pswform").css('background-color','orange')
           }else if(password){
                this.errorPassword="Weak password: at least 8 character and one number!";
                $("#pswform").css('background-color','red');
           }
           
        },
        register(e){
            e.preventDefault();
            this.checkInput();
            if(!this.errorFirstName&&!this.errorLastName&&!this.errorPassword){
                const data={
                    method:"POST",
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        firstName: $("#firstnameform").val(),
                        lastName: $("#lastnameform").val(),
                        email: $("#emailform").val(),
                        password: $("#pswform").val()
                    })
                }
                fetch("/register",data)
                .then(response=>{
                    if(response.status==400){
                        this.error=("Email already used");
                        $("#pswform").val("");
                        $("#emailform").val("");
                    }
                    else if (response.redirected) {
                        window.location.href = response.url;
                    }
                })
            }
        },
    },
});
