/**
 * Created by ralekseyev on 10/16/2015.
 */


function Requests (){


    this.users = [

        {id:1, name:"Ruslan", phone:"+994772011334", email:"ruslan.alekseyev", address:"Zahid Qasimov street", site:"siteurl.com" },
        {id:1, name:"Aleks", phone:"+994772011334", email:"ruslan.alekseyev", address:"Zahid Qasimov street", site:"siteurl.com" },
        {id:1, name:"James", phone:"+994772011334", email:"ruslan.alekseyev", address:"Zahid Qasimov street", site:"siteurl.com" },
        {id:1, name:"Jesica", phone:"+994772011334", email:"ruslan.alekseyev", address:"Zahid Qasimov street", site:"siteurl.com" },
        {id:1, name:"Michel", phone:"+994772011334", email:"ruslan.alekseyev", address:"Zahid Qasimov street", site:"siteurl.com" }
    ];



    this.ajax(obj){



        switch(obj.url){

            case  "users" : this.users; break;
            case  "user" : this.users[obj.data.id]; break;


        }


    }



}