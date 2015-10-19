/**
 * Created by ralekseyev on 10/16/2015.
 */


function Requests() {


    this.usersList = Array(
        {
            id: 1,
            name: "Ruslan",
            phone: "+994772011334",
            email: "ruslan.alekseyev",
            address: "Zahid Qasimov street",
            site: "siteurl.com"
        },
        {
            id: 2,
            name: "Aleks",
            phone: "+994772011334",
            email: "ruslan.alekseyev",
            address: "Zahid Qasimov street",
            site: "siteurl.com"
        },
        {
            id: 3,
            name: "James",
            phone: "+994772011334",
            email: "ruslan.alekseyev",
            address: "Zahid Qasimov street",
            site: "siteurl.com"
        },
        {
            id: 4,
            name: "Jesica",
            phone: "+994772011334",
            email: "ruslan.alekseyev",
            address: "Zahid Qasimov street",
            site: "siteurl.com"
        },
        {
            id: 5,
            name: "Michel",
            phone: "+994772011334",
            email: "ruslan.alekseyev",
            address: "Zahid Qasimov street",
            site: "siteurl.com"
        }
    );


    this.ajax = function (obj) {
        var response;

        switch (obj.url) {
            case  "users" :
                response = this.users(obj);
                break;
        }

        return obj.success(response);
    }


    this.users = function (obj) {

// GET single user Request
        if (obj.method == 'get' && obj.hasOwnProperty("data") && obj.data.hasOwnProperty("id")) {
            //console.log("GET single user Request");

            return $.extend({}, this.getUserById(obj.data.id) );
        }
// GET all users Request
        else if (obj.method == 'get') {
            //console.log("GET all users Request");

            return $.extend([], this.usersList);
        }
// POST Request
        else if (obj.method == 'post') {
            //console.log("POST Request");
            var newId = this.usersList[this.usersList.length-1].id+1;
            var newData = obj.data;
            newData.id = newId;
            this.usersList.push(newData);

            return $.extend({}, newData) ;

        }
// PUT Request
        else if (obj.method == 'put') {
            //console.log("PUT Request");
            obj.data.id  = parseInt(obj.data.id);
            var user = this.getUserById(obj.data.id);
            user = obj.data;

            this.mapUserList(function(value,index){

                if(value.id == obj.data.id){
                    return obj.data;
                }

                return value;

            });



            return $.extend({}, user);
        }
// DELETE Request
        else if (obj.method == 'delete') {
            //console.log("DELETE Request");

            user = this.getUserById(parseInt(obj.data.id));
            var index = this.usersList.indexOf(user);
            var deletedObj = $.extend({}, user);
            this.usersList.splice(index, 1);

            return deletedObj;
        }
    }

// Get User by Id
    this.getUserById = function (id) {
        for (var i = 0; i < this.usersList.length; i++) {
            if (this.usersList[i].id == id) {
                return this.usersList[i];
            }
        }
        return false;
    };

// Map User By Id
    this.mapUserList = function (func) {
        for (var i = 0; i < this.usersList.length; i++) {
            this.usersList[i] =  func(this.usersList[i],i);
        }
    }

}