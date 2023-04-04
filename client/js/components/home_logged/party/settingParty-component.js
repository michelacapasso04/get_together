export default{
    template:`
        <div class="settingParty-component">
            <div class="high-bar bg-orange">
                    <span>Setting up your party</span>
            </div>
            <form @submit="nextStep" autocomplete="off">
                <div>   
                    <p class="label">Name of your party:</p>
                    <input v-model="name" class="mx-input" id="name_party" type="text">
                    <p class="error">{{errors.name}}</p>
                </div>
                <div class="select-date">
                    <p class="label">Select date:</p>
                    <DatePicker v-model="date" value-type="date" type="date" />
                    <p class="error">{{errors.date}}</p>
                </div>
                <div>
                    <p class="label"> Select time: </p>
                    from <DatePicker v-model="startTime" format="HH:mm" :minute-step="15" type="time" value-type="format">
                        <div slot="icon-calendar">
                        <svg id="Capa_1" enable-background="new 0 0 443.294 443.294" height="512" viewBox="0 0 443.294 443.294" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m221.647 0c-122.214 0-221.647 99.433-221.647 221.647s99.433 221.647 221.647 221.647 221.647-99.433 221.647-221.647-99.433-221.647-221.647-221.647zm0 415.588c-106.941 0-193.941-87-193.941-193.941s87-193.941 193.941-193.941 193.941 87 193.941 193.941-87 193.941-193.941 193.941z"/><path d="m235.5 83.118h-27.706v144.265l87.176 87.176 19.589-19.589-79.059-79.059z"/></svg>
                        </div>
                    </DatePicker>
                    to <DatePicker v-model="finishTime" format="HH:mm" :minute-step="15" type="time" value-type="format">
                        <div slot="icon-calendar">
                        <svg enable-background="new 0 0 443.294 443.294" height="512" viewBox="0 0 443.294 443.294" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m221.647 0c-122.214 0-221.647 99.433-221.647 221.647s99.433 221.647 221.647 221.647 221.647-99.433 221.647-221.647-99.433-221.647-221.647-221.647zm0 415.588c-106.941 0-193.941-87-193.941-193.941s87-193.941 193.941-193.941 193.941 87 193.941 193.941-87 193.941-193.941 193.941z"/><path d="m235.5 83.118h-27.706v144.265l87.176 87.176 19.589-19.589-79.059-79.059z"/></svg>
                        </div>
                    </DatePicker>
                    <p class="error">{{errors.startTime}}</p>
                    <p class="error">{{errors.finishTime}}</p>
                </div>
                <div>
                        <input type="submit" class="btn bg-orange" value="Next"> 
                </div>
            </form>
        </div>
        `,
        data() {
            return {
                mode: 'single',
                name: null,
                date:null,
                startTime:null,
                finishTime:null,
                errors:{
                    occure: false,
                    name: null,
                    date: null,
                    startTime: null,
                    finishTime: null
                }
            }
        },
        components:{
            DatePicker
        },
        methods: {
            addError(key,message){
                this.errors.occure=true;
                this.errors[key]=message;
            },
            resetErrors(){
                this.errors.occure=false;
                this.errors.name= null;
                this.errors.date=null;
                this.errors.startTime= null;
                this.errors.finishTime= null;
            },
            nextStep: function(e){
                e.preventDefault();
                this.resetErrors();
                if(this.name==null) this.addError("name","Name is required");
                if(this.date==null) this.addError("date","Date is required");
                if(this.date<(new Date()).setDate((new Date()).getDate()-1)) this.addError("date","Date has already passed");
                if(this.startTime==null) this.addError("startTime","Starting time is required");
                if(this.finishTime==null) this.addError("finishTime","Finish time is required");
                if(!this.errors.occure){
                    this.$emit("next",this.name,this.date,this.startTime,this.finishTime);
                }
            }
        }
}