
$(document).ready(function () {
    getStudentDetails();
    $("#studentDetailModal").modal('hide');
    //getStaffDetails();
    $("#ImageBrowse").change(function () {
        //debugger
        var File = this.files;
        if (File && File[0]) {
            ReadImage(File[0]);
        }
    })
    //var handleDataTableButtons = function () {
    //    if ($("#datatable-buttons").length) {
    //        $("#datatable-buttons").DataTable({
    //            dom: "Bfrtip",
    //            buttons: [
    //              {
    //                  extend: "copy",
    //                  className: "btn-sm"
    //              },
    //              {
    //                  extend: "csv",
    //                  className: "btn-sm"
    //              },
    //              {
    //                  extend: "excel",
    //                  className: "btn-sm"
    //              },
    //              {
    //                  extend: "print",
    //                  className: "btn-sm"
    //              },
    //              {
    //                  extend: "pdf",
    //                  className: "btn-sm"
    //              },
    //            ],
    //            responsive: true
    //        });
    //    }
    //};

    TableManageButtons = function () {
        "use strict";
        return {
            init: function () {
                handleDataTableButtons();
            }
        };
    }();

});
// Declare a variable to check when the action is Insert or Update
var isUpdateable = false;
var html = '';
var PersonId = '';
var SchoolAka = '';
var currency_symbols = {
    'USD': '$', // US Dollar
    'EUR': '€', // Euro
    'CRC': '₡', // Costa Rican Colón
    'GBP': '£', // British Pound Sterling
    'ILS': '₪', // Israeli New Sheqel
    'INR': '₹', // Indian Rupee
    'JPY': '¥', // Japanese Yen
    'KRW': '₩', // South Korean Won
    'NGN': '₦', // Nigerian Naira
    'PHP': '₱', // Philippine Peso
    'PLN': 'zł', // Polish Zloty
    'PYG': '₲', // Paraguayan Guarani
    'THB': '฿', // Thai Baht
    'UAH': '₴', // Ukrainian Hryvnia
    'VND': '₫', // Vietnamese Dong
};

var currency_name = 'NGN';

var ReadImg = function (file) {
    var reader = new FileReader;
    var image = new Image;

    reader.readAsDataURL(file);
    reader.onload = function (_file) {
        image.src = _file.target.result;

        image.onload = function () {
            var height = this.height;
            var width = this.width;
            var type = file.type;
            var size = ~~(file.size / 1024) + "KB";

            $("#targetImage").attr('src', _file.target.result);

            $("#descriptn").text("Size:" + size + "," + height + "x" + width + "")

            $("#imgPrev").show();
        }
    }
}

var ReadImage = function (file) {
    var reader = new FileReader;
    var image = new Image;

    reader.readAsDataURL(file);
    reader.onload = function (_file) {
        image.src = _file.target.result;

        image.onload = function () {
            var height = this.height;
            var width = this.width;
            var type = file.type;
            var size = ~~(file.size / 1024) + "KB";

            $("#targetImg").attr('src', _file.target.result);

            $("#description").text("Size:" + size + "," + height + "x" + width + "")

            $("#imgPreview").show();
        }
    }
}

var ClearPreview = function () {
    $("#ImageBrowse").val('');
    $("#description").text('');
    $("#imgPreview").hide();
}

var ClearPrvw = function () {
    $("#TellerBrowse").val('');
    $("#description").text('');
    $("#imgPreview").hide();
}
function getStudentDetails() {
    //debugger
    //var schoolSessionId = $('#SchSessionId').val();
    $.ajax({
        url: '/Backend/GetStudentDetails/',
        type: 'get',
        dataType: 'json',
        success: function (data) {

            $('#datatable-button').DataTable({  
                //"paging": true,
                //"scrollX": true,
                data: data,
                responsive: true,
                //keys: true,
                deferRender: true,
                //scrollY: 380,
                //scrollX: 200,               
                scrollCollapse: true,
                //scroller: true,
                //entries: true,
                "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
                //"lengthMenu": [[2, 5, 10, -1], [2, 5, 10, "All"]],
                //dom: "Bfrtip",
                dom: "lfrtiBp",
                buttons: [
                  {
                      extend: "copy",
                      className: "btn-sm"
                  },
                  {
                      extend: "csv",
                      className: "btn-sm"
                  },
                  {
                      extend: "excel",
                      className: "btn-sm"
                  },
                  {
                      extend: "print",
                      className: "btn-sm"
                  },
                  {
                      extend: "pdf",
                      className: "btn-sm"
                  },

                ],

                columns: [
                    {
                        'data': 'SchSessionId',
                        'render': function GetSessionName(sessionId) {
                            //debugger
                            var session = '';
                            $.ajax({
                                url: '/Backend/GetSessionName?SchSessionId=' + sessionId,
                                type: 'POST',
                                async: false,
                                success: function (data) {

                                    session = data.SessionName;
                                },
                                error: function (err) {
                                    alert("Error: " + err.responseText);
                                }

                            });
                            return session;
                        },
                        
                    },
                    { 'data': 'Surname'},
                    { 'data': 'FirstName' },
                    { 'data': 'LastName' },
                    { 'data': 'UniqueId' },
                    { 'data': 'DefaultPassword' },
                    { 'data': 'Gender' },
                    {
                        'data': 'DocumentDate',
                        'render': function (jsonDate) {
                            var date = new Date(parseInt(jsonDate.substr(6)));
                            var month = date.getMonth() + 1;
                            return date.getDate() + "/" + month + "/" + date.getFullYear();
                        }
                    },
                    {
                        "data": "Id", "render": function (data) {
                            return "<button type='button' id='btnEdit' class='btn btn-default glyphicon glyphicon-pencil' onclick='return getStudentById(" + data + ")'></button> <button type='button' id='btnDelete' class='btn btn-danger glyphicon glyphicon-trash' onclick='return deleteStudentById(" + data + ")'></button>";
                        },
                    },

                ],

            });
        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
}
//function getStudentDetails() {
//    //debugger
//    $.ajax({
//        url: '/Backend/GetStudentDetails/',
//        type: 'GET',
//        dataType: 'json',
//        success: function (data) {
//            //debugger
//            var rows = '';
//            $.each(data, function (i, item) {
//                rows += "<tr>"
//                rows += "<td>" + item.Surname + " " + item.FirstName + " " + item.LastName + "</td>"
//                rows += "<td>" + item.UniqueId + "</td>"
//                rows += "<td>" + item.Gender + "</td>"
//                rows += "<td><button type='button' id='btnEdit' class='btn btn-default glyphicon glyphicon-pencil' onclick='return http://localhost:2502/../Views/BackendgetStudentById(" + item.UniqueId + ")'></button> <button type='button' id='btnDelete' class='btn btn-danger glyphicon glyphicon-trash' onclick='return deleteStudentById(" + item.UniqueId + ")'></button></td>"
//                rows += "</tr>";
//                $("#StudentList").html(rows);
//            });


//        },
//        error: function (err) {
//            alert("Error: " + err.responseText);
//        }
//    });
//}
function getStaffDetails() {
    //debugger
    $.ajax({
        url: '/School/GetStaffDetails/',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            //debugger
            var rows = '';
            $.each(data, function (i, item) {
                rows += "<tr>"
                rows += "<td>" + item.Surname + " " + item.FirstName + " " + item.LastName + "</td>"
                rows += "<td>" + item.UniqueId + "</td>"
                rows += "<td>" + item.Gender + "</td>"
                rows += "<td><button type='button' id='btnEdit' class='btn btn-default glyphicon glyphicon-pencil' onclick='return getStudentById(" + item.UniqueId + ")'></button> <button type='button' id='btnDelete' class='btn btn-danger glyphicon glyphicon-trash' onclick='return deleteStudentById(" + item.UniqueId + ")'></button></td>"
                rows += "</tr>";
                $("#StaffList").html(rows);
            });            
        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
}

function getEnrollmentPaymentCodeForLoginUser() {
    // debugger
    $.ajax({
        url: '/School/GetEnrollmentPaymentCodeForLoginUser/',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // debugger
            var rows = '';
            rows += "<div class='col-md-12' style=' color:wheat;padding-top:5px;padding-bottom:5px; margin-top:15px; background:#333333; border:solid white 5px; border-radius:7px'><h5 style='padding-left:20px;'>Here is your payment code: " + data + "</h5></div>"

            $("#PaymentId").html(rows);
            $("#PaymentId").show();
            //window.location.replace("/#step-2");
        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
}

function getEnrollmentPaymentCostForLoginUser(EnrollmentTypeId) {
    debugger
    $.ajax({
        url: '/School/GetEnrollmentPaymentCostForLoginUser/' + EnrollmentTypeId,
        type: 'GET',
        dataType: 'json',
        success: function (data) {

            alert("The default cost for the selected enrollment is ₦" + data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
}
//var SaveAndUploadImage = function () {
//    debugger
//    var file = $("#imageBrowse").get(0).files;
//    var data = new FormData;
//    data.append("ImageFile", file[0]);


//    $.ajax({
//        type: "post",
//        url: '/School/AdmissionProcessCollege/',
//        data: data,
//        contentType: false,
//        processData: false,
//        success: function (response) {
//            //debugger
//            //getAccountDetails();
//            //$("#uploadedImage").append('<img src="/Images/' + response + '" class="img-responsive thumbnail"/>')

//            $("#ImageBrowes").val('');
//            $("#description").text('');
//            $("#imgPreview").hide();
//            clear();
//        }
//    })
//}



//// Insert/ Update a church account detail
$("#btnSave").click(function (e) {
    debugger
    var data = {
        Id: $("#Id").val(),
        Surname: $("#Surname").val(),
        FirstName: $("#FirstName").val(),
        LastName: $("#LastName").val(),
        Gender: $("#Gender").val(),
    }
    $.ajax({
        url: '/Backend/UpdateStudent/',
        type: 'POST',
        dataType: 'json',
        data: data,
        success: function (data) {
            getStudentDetails();
            isUpdateable = false;
            $("#studentDetailModal").modal('hide');
            $("#datatable-button").dataTable().fnDestroy();
            getStudentDetails();
            clear();
        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    })

});

//// Delete student by id
function deleteStudentById(id) {
    $("#confirmModal #title").text("Delete Student");
    $("#confirmModal").modal('show');
    $("#confirmModal #btnOk").click(function (e) {
        $.ajax({
            url: "/Backend/DeleteStudentById/" + id,
            type: "POST",
            dataType: 'json',
            success: function (data) {
                $("#confirmModal").modal('hide');
                $("#datatable-button").dataTable().fnDestroy();
                getStudentDetails();
            },
            error: function (err) {
                alert("Error: " + err.responseText);
            }
        });

        e.preventDefault();
    });
}
function getStudentById(id) {
    debugger
    $("#title").text("Student Details");

    $.ajax({
        url: '/Backend/GetStudentById/' + id,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $("#studentDetailModal").modal('show');
            $.each(data, function (i, item) {
                $("#Id").val(data.Id);
                $("#Surname").val(data.Surname);
                $("#FirstName").val(data.FirstName);
                $("#LastName").val(data.LastName);
                $("#Gender").val(data.Gender);

                isUpdateable = true;
    
            });
        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
}

// Get Student by id
//function getStudentById(id) {

//debugger
//$("#title").text("Student Details");

//    $.ajax({
//        url: '/Backend/GetStudentById/' + id,
//        type: 'GET',
//        dataType: 'json',

//        success: function (data) {
//            $("#Id").val(data.Id);
//            $("#Surname").val(data.Surname);
//            $("#FirstName").val(data.FirstName);
//            $("#LastName").val(data.LastName);
//            $("#Gender").val(data.Gender);

//            isUpdateable = true;
//            $("#studentDetailModal").modal('show');
//        },
//        error: function (err) {
//            alert("Error: " + err.responseText);
//        }
//    });
//}
function AjaxStudentUpdatePost(formData) {
    debugger
    $("#title").text("Student Details");
    var ajaxUpdateStudentConfig = {
        type: "post",
        url: '/Backend/UpdateStudent/' + id,
        data: new FormData(formData),
        contentType: false,
        processData: false,
        success: function (result) {
            alert(result);
            //window.location.href = '/Backend/Registration/';
            $("#studentDetailModal").modal('hide');
            $("#datatable-button").dataTable().fnDestroy();
            getStudentDetails();
        }
    }
    if ($(formData).attr('enctype') === "multipart/form-data") {
        ajaxUpdateStudentConfig["contentType"] = false
        ajaxUpdateStudentConfig["processData"] = false
    }
    //ShowEnrollmentCost();
    $.ajax(ajaxUpdateStudentConfig);
    return false;
}

//// Set title for create new
//$("#btnCreate").click(function () {
//    $("#title").text("Create New Bank Account Detail");
//})

// Close modal
$("#btnClose").click(function () {
    clear();
});

// Clear all items
function clear() {
    $("#ImageBrowse").val("");
    $("#FirstName").val("");
    $("#Surname").val("");
    $("#LastName").val("");
    $("#Gender").val("");
    $("#Male").val("");
    $("#Female").val("");
    $("#AdmissionYr").val("");
    $("#AdmissionClass").val("");
}

function AjaxRegistrationPost(formData) {
    //debugger
    var ajaxRegistrationConfig = {
        type: "post",
        url: '/Backend/Registration/',
        data: new FormData(formData),
        contentType: false,
        processData: false,
        success: function (result) {
            alert(result);
            window.location.href = '/Backend/Registration/';
            PersonId = $("#PersonId").val();
            SchoolAka = $("#SchoolAka").val();
            //ShowEnrollmentCost();
        }
    }
    if ($(formData).attr('enctype') === "multipart/form-data") {
        PersonId = $("#PersonId").val();
        SchoolAka = $("#SchoolAka").val();
        //ShowEnrollmentCost();
        ajaxRegistrationConfig["contentType"] = false
        ajaxRegistrationConfig["processData"] = false
    }
    //ShowEnrollmentCost();
    $.ajax(ajaxRegistrationConfig);
    return false;
}
function ShowPaymentDetailsForm() {
    $("#PaymentDetails").show();
}
function ShowEnrollmentCost() {
    $("#EnrollmentCost").show();
    getEnrollmentPaymentCostForLoginUser(EnrollmentTypeId);
}
var SendViaEmail = function () {
    //debugger
    $.ajax({
        url: '/School/SendViaEmail/',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            //debugger
            alert("Payment code has been sent to your email");
        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
}
var SendViaSms = function () {
    $.ajax({
        url: '/School/SendViaSms/',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            //debugger
            alert("Payment code has been sent to your gsm");
        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
}
function BankPaymentDetailsPost(formData) {
    //debugger
    var ajaxConfig = {
        type: "post",
        url: '/School/SavePaymentData/',
        data: new FormData(formData),
        contentType: false,
        processData: false,
        success: function (result) {
            alert(result);
            window.location.href = "/School/AdmissionProcessCollege";
        }
    }
    if ($(formData).attr('enctype') === "multipart/form-data") {
        ajaxConfig["contentType"] = false
        ajaxConfig["processData"] = false
    }
    $.ajax(ajaxConfig);
    return false;
}