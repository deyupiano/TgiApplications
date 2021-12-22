
$(document).ready(function () {
    //getAccountDetails();
    $("#ImageBrowse").change(function () {
        //debugger
        var File = this.files;
        if (File && File[0]) {
            ReadImage(File[0]);
        }
    })

    $("#TellerBrowse").change(function () {
        //debugger
        var File = this.files;
        if (File && File[0]) {
            ReadImg(File[0]);
        }
    })
    $("#PaymentId").hide();
    $("#SchoolAcctDetails").hide();
    $("#PaymentDetails").hide();
    $("#EnrollmentCost").hide();



});
// Declare a variable to check when the action is Insert or Update
var isUpdateable = false;
var html = '';
var EnrollmentTypeId = '';
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

function getAccountDetails() {
    getEnrollmentPaymentCodeForLoginUser();
    //debugger
    $.ajax({
        url: '/School/GetAccountDetails/',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            //debugger
            var rows = '';
            $.each(data, function (i, item) {
                rows += "<div class='col-md-12'>"
                rows += "<div class='col-md-2'>'<img src=/Content/Images/" + item.BankLogoPath + '  class="img-responsive" height="158" width="158"/>' + "</div>";

                rows += "<div class='col-md-10' style=' color:wheat;padding-top:5px;padding-bottom:5px; margin-top:15px; background:#333333; border:solid white 5px; border-radius:7px'><h5 style='padding-left:20px;'>BANK: " + item.Bankname + "</h5><br/><h5 style='padding-left:20px'>Account Number: " + item.AccountNumber + "</h5><br/><h5 style='padding-left:20px'>Account Purpose: " + item.Purpose + "</h5></div>"
                rows += "</div>";

                $("#SchoolAcctDetails").html(rows);
                $("#SchoolAcctDetails").show();
                
                //href = "#step-2"

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
//$("#btnSave").click(function (e) {
//    debugger
//    var data = {
//        StudentEnrolmentId: $("#StudentEnrolmentId").val(),
//        EnrollmentTypeId: $("#EnrollmentTypeId").val(),
//        FirstName: $("#FirstName").val(),
//        MiddleName: $("#MiddleName").val(),
//        LastName: $("#LastName").val(),
//        Dob: $("#Dob").val(),
//        Gender: $("#Gender").val(),
//        PrvSchool: $("#PrevSchool").val(),
//        PrvClass: $("#PrevClass").val(),
//        Address: $("#Address").val(),
//        ContactNumber: $("#ContactNumber").val(),
//        ContactEmail: $("#ContactEmail").val(),
//    }
//    $.ajax({
//        url: '/School/AdmissionProcessCollege/',
//        type: 'POST',
//        dataType: 'json',
//        data: data,
//        success: function (data) {
//            //getAccountDetails();
//            //isUpdateable = false;
//            //$("#accountDetailModal").modal('hide');
//            clear();
//        },
//        error: function (err) {
//            alert("Error: " + err.responseText);
//        }
//    })

//});

//// Delete category by id
//function deleteAccountDetailById(id) {
//    $("#confirmModal #title").text("Delete Bank Detail");
//    $("#confirmModal").modal('show');
//    $("#confirmModal #btnOk").click(function (e) {
//        $.ajax({
//            url: "/Giving/DeleteAccountDetailById/" + id,
//            type: "POST",
//            dataType: 'json',
//            success: function (data) {
//                getAccountDetails();
//                $("#confirmModal").modal('hide');
//            },
//            error: function (err) {
//                alert("Error: " + err.responseText);
//            }
//        });

//        e.preventDefault();
//    });
//}

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
    $("#MiddleName").val("");
    $("#LastName").val("");
    $("#PrevSchool").val("");
    $("#PrevClass").val("");
    $("#Gender").val("");
    $("#Address").val("");
    $("#ContactNumber").val("");
    $("#ContactEmail").val("");
    $("#Male").val("");
    $("#Female").val("");
}

function AjaxPost(formData) {
    //debugger
    var ajaxConfig = {
        type: "post",
        url: '/School/SaveData/',
        data: new FormData (formData),
        contentType: false,
        processData: false,
        success: function (result) {
            alert(result);
            window.location.href = "/School/AdmissionProcessCollege";
            EnrollmentTypeId = $("#EnrollmentTypeId").val()
            //ShowEnrollmentCost();
        }
    }
    if ($(formData).attr('enctype') === "multipart/form-data") {
        EnrollmentTypeId = $("#EnrollmentTypeId").val()
        //ShowEnrollmentCost();
        ajaxConfig["contentType"] = false
        ajaxConfig["processData"] = false
    }
    ShowEnrollmentCost();
    $.ajax(ajaxConfig);
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
var SendViaSms = function() {
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