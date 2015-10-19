/**
 * Created by ralekseyev on 10/16/2015.
 */
$(function() {
    "use strict";

    var requests = new Requests();

    //requests.ajax({
    //    url:"users",
    //    method:"get",
    //    data:{id:1},
    //    success:function(data){
    //        console.log(data);
    //    }
    //});
    //
    //requests.ajax({
    //    url:"users",
    //    method:"post",
    //    data:  {
    //        name: "Sem",
    //        phone: "+994772011334",
    //        email: "sem.alekseyev",
    //        address: "Zahid Qasimov street",
    //        site: "siteurl.com"
    //    },
    //    success:function(data){
    //        console.log(data);
    //    }
    //});
    //
    //requests.ajax({
    //    url:"users",
    //    method:"put",
    //    data: {
    //        id:2,
    //        name: "Alexis",
    //        phone: "+994772011334",
    //        email: "sem.alekseyev",
    //        address: "Zahid Qasimov street",
    //        site: "site-url.com"
    //    },
    //    success:function(data){
    //        console.log(data);
    //    }
    //});
    //
    //requests.ajax({
    //    url:"users",
    //    method:"delete",
    //    data: {id:3},
    //    success:function(data){
    //        console.log(data);
    //    }
    //});
    //
    //requests.ajax({
    //    url:"users",
    //    method:"get",
    //    success:function(data){
    //        console.log(data);
    //    }
    //});

    drawList();

    $(document).on("click",".edit",function(){
        console.log("Edit",$(this).data("user-id"));
        $(this).data("user-id");



        requests.ajax({
            url:"users",
            method:"get",
            data:{id:$(this).data("user-id")},
            success:function(data){
                $.each(data,function(index,value){
                    $('#user-form #'+index).val(value);
                });

                $('#modal-id').modal();
            }
        });
    });


    $(document).on("click",".create",function(){
        console.log("Edit",$(this).data("user-id"));
        $(this).data("user-id");

        $('#modal-id').modal();

        $("#user-form input, #user-form textarea, #user-form select").each(function(index,value){
            $(value).val('');
        });

    });




    $(document).on('click','.save',function(){
       var method,formData = [],serializedData;
        serializedData =  $('form#user-form').serializeArray();

        $.each(serializedData,function(index,value){
             formData[value.name] = value.value;
        });

        if(formData.hasOwnProperty('id') && formData.id ){
            method = "put";
        }else{
            method = "post";
        }

        console.log(method);

           requests.ajax({
            url:"users",
            method:method,
            data:formData,
            success:function(data){
               console.log("Added");
                $('#myModal').modal('hide');
                drawList();
            }
        });
    });



    $(document).on("click",".delete",function(){
        requests.ajax({
            url:"users",
            method:"delete",
            data: {id:$(this).data("user-id")},
            success:function(data){
               drawList();
            }
        });
    });




    function drawList(){
       var el = "#user-list";
        requests.ajax({
            url:"users",
            method:"get",
            success:function(data){
                $(el+" > tbody").empty();

                if(data.length == 0 ){ $(el).hide(); }else{ $(el).show(); }

                data.forEach(function(value){
                    $(el).append("<tr>" +
                        "<td>"+value.name+"</td>" +
                        "<td>"+value.phone+"</td>" +
                        "<td>"+value.email+"</td>" +
                        "<td>"+value.address+"</td>" +
                        "<td>"+value.site+"</td>" +
                        "<td><button class='edit center-block btn-warning' data-user-id='"+value.id+"' > <span class='glyphicon glyphicon-edit'  ></span></td>" +
                        "<td><button class='delete center-block btn-danger' data-user-id='"+value.id+"' ><span class='glyphicon glyphicon-remove' ></span></td>" +
                        "</tr>");
                });
            }
        });

    }



});