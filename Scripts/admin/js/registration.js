var company1, regAs1, mode1, gender1,selectedRole;
function selectedMode(mode) {
    $("#btnSelectedMode").text(mode);
    company1 = mode;
};
$("#roles").change(function () {
    regAs1 = $(this).val();
});

function selectedCompany(company) {
    $("#btnSelectedCompany").text(company);
    company1 = company;
};
function selectedGender(gender) {
    $("#btnSelectedGender").text(gender);
    gender1 = gender;
};
function randomString() {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 4;
    var randomstring = "";
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
}
var cnt = 0;
$("body").on("click", ".btnAddPerson", function () {
    mode1 = $("#btnSelectedMode").text();
    company1 = $("#btnSelectedCompany").text();
    regAs1 = $("#roles option:selected").val();

    gender1 = $("#btnSelectedGender").text();
    debugger
    if (company1 === "COMPANY" || gender1 === "GENDER" || regAs1 === "REGISTER AS" || mode1 === "REGISTRATION MODE") {
        alert("YOU ARE YET TO SELECT ONE OF THE FOLLOWING: COMPANY, REGISTER AS, REGISTRATION MODE OR GENDER.")
    }
    else {
        cnt++;
        $("#rowReg").html(cnt + " record(s) added");
        var tBody = $("#registrationTable > TBODY")[0];
        var name = $("#name").val();
        var email = $("#email").val();
        var phoneNumber = $("#phoneNumber").val();
        var whatsappeNumber = $("#whatsappeNumber").val();
        var dob = $("#dob").val();
        var row = tBody.insertRow(-1);
        var btnRemove = $("<input />");
        btnRemove.attr("type", "button");
        btnRemove.attr("onclick", "RemoveReg(this);");
        btnRemove.val("-");
        btnRemove.addClass("form-control btn btn-danger");
        cell = $(row.insertCell(-1));
        cell.append(btnRemove);

        cell = $(row.insertCell(-1));
        cell.html(name.toUpperCase());

        cell = $(row.insertCell(-1));

        cell.html(email.toLowerCase());

        cell = $(row.insertCell(-1));
        cell.html(phoneNumber);



        cell = $(row.insertCell(-1));
        cell.html(whatsappeNumber);

        cell = $(row.insertCell(-1));
        cell.html(dob);

        cell = $(row.insertCell(-1));
        cell.html(gender1);
        var password = "@" + randomString() + "#";
        cell = $(row.insertCell(-1));
        cell.html(password);
        //Add Button cell.
        var btnRemove = $("<input />");
        btnRemove.attr("type", "button");
        btnRemove.attr("onclick", "RemoveReg(this);");
        btnRemove.val("-");
        btnRemove.addClass("form-control btn btn-danger");
        //btnRemove.css({ "color": "white", "backgroundColor": "red", "width": "100%", "height":"100%" });
        cell = $(row.insertCell(-1));
        cell.append(btnRemove);

        var cell = $(row.insertCell(-1));
    }
});
var records;
function submitBulkRegPersonData() {
    //Loop through the Table rows and build a JSON array.
    var persons = new Array();
    $("#registrationTable TBODY TR").each(function () {
        debugger
        var row = $(this);
        var person = {};
        person.Fullname = row.find("TD").eq(1).html();
        person.Email = row.find("TD").eq(2).html();
        person.PhoneNumber = row.find("TD").eq(3).html();
        person.WhatsappNumber = row.find("TD").eq(4).html();
        person.DateOfBirth = row.find("TD").eq(5).html();
        person.Gender = row.find("TD").eq(6).html();
        person.Password = row.find("TD").eq(7).html();
        person.CustomerMode = $("#btnSelectedMode").text();
        person.Company = $("#btnSelectedCompany").text();
        person.RegisteredAs = $("#roles option:selected").val();
        //alert($("#btnSelectedRole").text());
        debugger
        persons.push(person);

    });
    var jsonData = JSON.stringify(persons);
    $.ajax({
        url: '/Admin/SaveCustomer',
        data: jsonData,
        type: 'POST',
        contentType: 'application/json;',
        dataType: 'json',
        success: function (result) {
            debugger
            $("#list").css("display", "block");
            $("#create").css("display", "none");

            if ($.fn.DataTable.isDataTable("#rListTable")) {
                oTable.draw();

            } else {
                oTable = $('#rListTable').DataTable({

                    initComplete: function () {
                        var r = $('#rListTable tfoot tr');
                        r.find('th').each(function () {
                            $(this).css('padding', 8);
                        });
                        $('#rListTable thead').append(r);
                        $('#search_0').css('text-align', 'center');
                        // Setup - add a text input to each footer cell
                        $('#rListTable tfoot th').each(function () {
                            var title = $(this).text();
                            $(this).html('<input id="search_0" type="text" placeholder="Search ' + title + '" />');
                        });

                        // DataTable
                        var table = $('#rListTable').DataTable();

                        // Apply the search
                        table.columns().every(function () {
                            var that = this;

                            $('input', this.footer()).on('keyup change', function () {
                                if (that.search() !== this.value) {
                                    that
                                        .search(this.value)
                                        .draw();
                                }
                            });
                        });
                    },
                    //"paging": true,
                    //"scrollX": true,
                    data: result,
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
                            'data': 'CustId',
                            'visible': false,
                            'render': function (id) {
                                Id = id;
                                return Id;
                            }
                        },
                        { 'data': 'UniqueId' },
                        { 'data': 'Fullname' },
                        { 'data': 'Company' },
                        { 'data': 'Email' },
                        { 'data': 'PhoneNumber' },
                        { 'data': 'WhatsappNumber' },
                        { 'data': 'RegisteredAs' },
                        { 'data': 'Gender' },
                        { 'data': 'DateOfBirth' },
                        { 'data': 'Password' },
                        {
                            "data": "CustId", "render": function (data) {
                                return "<div style='width:200px'><span style='float:left'><button type='button' id='btnEdit' class='btn btn-success glyphicon glyphicon-pencil editbtn' onclick='return editById(" + Id + ")'></span><span style='float:left'></button> <button type='button' id='btnDelete' class='btn btn-danger glyphicon glyphicon-trash' onclick='return deleteById(" + Id + ")'></button></span><span style='float:left'><button type='button' id='btnEdit' class='btn btn-primary glyphicon glyphicon-eye-open editbtn' onclick='return viewDetailsById(" + Id + ")'></button></span></div>";
                            },
                        }
                    ],
                });

            }

        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });

}
var nameReg = '';
var oTable, Id, editedData;
function RemoveReg(button) {
    //Determine the reference of the Row using the Button.
    cnt--;
    var row = $(button).closest("TR");
    nameReg = $("TD", row).eq(1).html();
    if (confirm("Do you realy want to delete " + nameReg + " from list? ")) {
        //Get the reference of the Table.
        var table = $("#registrationTable")[0];
        //Delete the Table row using it's Index.
        table.deleteRow(row[0].rowIndex);
        $("#rowReg").html(cnt + " record(s) left");
    }
}
function EditedRecord() {
    //var image = convertCanvasToImage(canvas);
    //var encodedImg = image.src;
    var dob = document.getElementById("EditedDob").value;
    if (picStatus === "Camera") {
        var eData = {
            UserId: $("#UserId").val(),
            CustId: $("#CustId").val(),
            UniqueId: $("#EditedUniqueId").val(),
            CustomerMode: $("#EditedMode").val(),
            StateOfResidence: $("#EditedStateOfResidence").val(),
            NearestBusStop: $("#EditedNearestBusStop").val(),
            RegisteredAs: $("#EditedRegisteredAs").val(),
            LGA: $("#EditedLGA").val(),
            WhatsappNumber: $("#EditedWhatsappNumber").val(),
            PhoneNumber: $("#EditedPhoneNumber").val(),
            AddressDescription: $("#EditedAddressDescription").val(),
            Address1: $("#EditedAddress1").val(),
            Address2: $("#EditedAddress2").val(),
            Email: $("#EditedEmail").val(),
            Gender: $("#EditedGender").val(),
            Fullname: $("#EditedFullname").val(),
            Passport: croppedImageDataURL,
            DateOfBirth: dob,
            Password: $("#EditedPassword").val(),
            Company: $("#EditedCompany").val(),
            EndDate: $("#EditedEndDate").val(),
            StartDate: $("#EditedStartDate").val()
        };
    } else {
        var eData = {
            UserId: $("#UserId").val(),
            CustId: $("#CustId").val(),
            UniqueId: $("#EditedUniqueId").val(),
            StateOfResidence: $("#EditedStateOfResidence").val(),
            NearestBusStop: $("#EditedNearestBusStop").val(),
            RegisteredAs: $("#EditedRegisteredAs").val(),
            LGA: $("#EditedLGA").val(),
            CustomerMode: $("#EditedMode").val(),
            WhatsappNumber: $("#EditedWhatsappNumber").val(),
            PhoneNumber: $("#EditedPhoneNumber").val(),
            AddressDescription: $("#EditedAddressDescription").val(),
            Address1: $("#EditedAddress1").val(),
            Address2: $("#EditedAddress2").val(),
            Email: $("#EditedEmail").val(),
            Gender: $("#EditedGender").val(),
            Fullname: $("#EditedFullname").val(),
            Passport: encodedImgFromFileUpload,
            DateOfBirth: dob,
            Password: $("#EditedPassword").val(),
            Company: $("#EditedCompany").val(),
            EndDate: $("#EditedEndDate").val(),
            StartDate: $("#EditedStartDate").val()
        };
    }

    editedData = JSON.stringify(eData);

}

function reloadAndShowList() {
    location.reload();
    getList();
}
$("#SubmitEditedRecord").click(function () {
    EditedRecord();
    debugger
    $.ajax({
        url: '/Admin/SaveEditedCustomer?CustId=' + idToUpdate,
        type: 'POST',
        data: editedData,
        contentType: 'application/json;',
        dataType: 'json',
        success: function (result) {
            debugger
            alert("Record successfully updated.");

        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
});
$("#btnOkDelete").click(function () {
    debugger
    $.ajax({
        url: '/Admin/Delete?Id=' + idToDelete,
        type: 'GET',
        contentType: 'application/json;',
        dataType: 'json',
        success: function (result) {
            if (result === true) {
                alert("Record successfully deleted.");
                reloadAndShowList();
            }
            else {
                alert("Record was not deleted.");
            }

        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
});
$("#btnCancel").click(function () {
    $("#list").css("display", "block");
    $("#create").css("display", "none");
});
$("#clearList").click(function () {
    cnt = 0;
    $("#rowReg").html("");
    $("#registrationTable").find("tr:gt(0)").remove();
});
$(document).ready(function () {
    $('.double-scroll').doubleScroll();
});
$("#gotoCreate").click(function () {
    $("#list").css("display", "none");
    $("#create").css("display", "block");
});
function getList() {
    $.ajax({
        url: '/Admin/GetAllCustomer',
        type: 'GET',
        contentType: 'application/json;',
        dataType: 'json',
        success: function (result) {
            debugger
            $("#list").css("display", "block");
            $("#create").css("display", "none");

            if ($.fn.DataTable.isDataTable("#rListTable")) {
                oTable.draw();

            } else {
                oTable = $('#rListTable').DataTable({

                    initComplete: function () {
                        var r = $('#rListTable tfoot tr');
                        r.find('th').each(function () {
                            $(this).css('padding', 8);
                        });
                        $('#rListTable thead').append(r);
                        $('#search_0').css('text-align', 'center');
                        // Setup - add a text input to each footer cell
                        $('#rListTable tfoot th').each(function () {
                            var title = $(this).text();
                            $(this).html('<input id="search_0" type="text" placeholder="Search ' + title + '" />');
                        });

                        // DataTable
                        var table = $('#rListTable').DataTable();

                        // Apply the search
                        table.columns().every(function () {
                            var that = this;

                            $('input', this.footer()).on('keyup change', function () {
                                if (that.search() !== this.value) {
                                    that
                                        .search(this.value)
                                        .draw();
                                }
                            });
                        });
                    },
                    //"paging": true,
                    //"scrollX": true,
                    data: result,
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
                            'data': 'CustId',
                            'visible': false,
                            'render': function (id) {
                                Id = id;
                                return Id;
                            }
                        },
                        { 'data': 'UniqueId' },
                        { 'data': 'Fullname' },
                        { 'data': 'Company' },
                        { 'data': 'Email' },
                        { 'data': 'PhoneNumber' },
                        { 'data': 'WhatsappNumber' },
                        { 'data': 'RegisteredAs' },
                        { 'data': 'Gender' },
                        { 'data': 'DateOfBirth' },
                        { 'data': 'Password' },
                        {
                            "data": "CustId", "render": function (data) {
                                return "<div style='width:200px'><span style='float:left'><button type='button' id='btnEdit' class='btn btn-success glyphicon glyphicon-pencil editbtn' onclick='return editById(" + Id + ")'></span><span style='float:left'></button> <button type='button' id='btnDelete' class='btn btn-danger glyphicon glyphicon-trash' onclick='return deleteById(" + Id + ")'></button></span><span style='float:left'><button type='button' id='btnEdit' class='btn btn-primary glyphicon glyphicon-eye-open editbtn' onclick='return viewDetailsById(" + Id + ")'></button></span></div>";
                            },
                        }
                    ],
                });

            }

        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });

}
$("#gotoList").click(function () {
    $("#list").css("display", "block");
    $("#create").css("display", "none");
    getList();
});
$(".backToList").click(function () {
    $("#list").css("display", "block");
    $("#create").css("display", "none");
    $("#delete").css("display", "none");
    $("#details").css("display", "none");
    $("#edit").css("display", "none");
});
var idToUpdate;
function editById(id) {
    idToUpdate = id;
    $("#list").css("display", "none");
    $("#create").css("display", "none");
    $("#delete").css("display", "none");
    $("#details").css("display", "none");
    $("#edit").css("display", "block");
    $.ajax({
        url: '/Admin/GetCustomerById?Id=' + id,
        type: 'GET',
        contentType: 'application/json;',
        dataType: 'json',
        success: function (result) {
            debugger
            var pics = '';
            pics = result.Passport;
            //alert(result.Company);
            if (pics !== '' || pics !== null) {
                document.getElementById('crpImg').style.display = 'block';
                document.getElementById('canv').src = pics;
                //document.getElementById('divFileUpload').style.display = 'none';
                document.getElementById('stage').style.display = 'none';
                document.getElementById('controls').style.display = 'none';
                document.getElementById('divCanvas').style.display = 'none';

            } else {
                document.getElementById('crpImg').style.display = 'none';
                showCameraBox();
            }
            $("#UserId").val(result.UserId),
            $("#CustId").val(result.CustId);
            $("#EditedCompany").val(result.Company);
            $("#EditedFullname").val(result.Fullname);
            //$("#EditedDob").val(result.DateOfBirth);
            document.getElementById("EditedDob").value = result.DateOfBirth;
            //var dateControl = document.querySelector('input[type="date"]');
            //dateControl.value = result.DateOfBirth;
            debugger
            $("#EditedLGA").val(result.LGA);
            $("#EditedPhoneNumber").val(result.PhoneNumber);
            $("#EditedMode").val(result.CustomerMode);
            $("#EditedRegisteredAs").val(result.RegisteredAs);
            $("#EditedPassword").val(result.Password);
            $("#EditedWhatsappNumber").val(result.WhatsappNumber);
            $("#EditedUniqueId").val(result.UniqueId);
            $("#EditedGender").val(result.Gender);
            $("#EditedNerarestBusStop").val(result.NerarestBusStop);
            $("#EditedEmail").val(result.Email);
            $("#EditedAddress1").val(result.Address1);
            $("#EditedAddress2").val(result.Address2);
            $("#EditedAddressDescription").val(result.AddressDescription);
            $("#EditedAddress2").val(result.Address2);
            $("#EditedStateOfResidence").val(result.StateOfResidence);
        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
}
var idToDelete;
function deleteById(id) {
    $("#list").css("display", "none");
    $("#create").css("display", "none");
    $("#delete").css("display", "block");
    $("#details").css("display", "none");
    $("#edit").css("display", "none");
    idToDelete = id;
}
function viewDetailsById(id) {
    $("#list").css("display", "none");
    $("#create").css("display", "none");
    $("#delete").css("display", "none");
    $("#details").css("display", "block");
    $("#edit").css("display", "none");
}
$('#btnShowCamBox').click(function () {
    showCameraBox();
    $('#crpImg').css('display', 'block');
    $('#crpImg2').css('display', 'none');
    $('#divFileUpload').css('display', 'none');
});
$('#btnHideCamBox').click(function () {
    hideCameraBox();
    $('#crpImg').css('display', 'none');
    $('#crpImg2').css('display', 'block');
    $('#divFileUpload').css('display', 'block');
});
function showCameraBox() {
    document.getElementById('divFileUpload').style.display = 'hide';
    document.getElementById('stage').style.display = 'block';
    document.getElementById('controls').style.display = 'block';
    document.getElementById('divCanvas').style.display = 'block';
    picStatus = "Camera";
}
function hideCameraBox() {
    document.getElementById('divFileUpload').style.display = 'block';
    document.getElementById('stage').style.display = 'none';
    document.getElementById('controls').style.display = 'none';
    document.getElementById('divCanvas').style.display = 'none';
    picStatus = "File";
}
var encodedImgFromFileUpload = '';
var img;
var height = "";
var width = "";
var type = "";
var size = "";
var picStatus = "";
var ReadImage = function (file) {
    debugger
    var reader = new FileReader;
    var image = new Image;

    reader.readAsDataURL(file);
    reader.onload = function (_file) {
        image.src = _file.target.result;
        encodedImgFromFileUpload = _file.target.result;
        image.onload = function () {
            debugger
            height = this.height;
            width = this.width;
            type = file.type;
            size = ~~(file.size / 1024) + " KB";
            debugger
            img = new Image();
            img.onload = draw;
            img.onerror = failed;
            img.src = encodedImgFromFileUpload;
            $('#crpImg').css('display', 'none');
            $('#crpImg2').css('display', 'block');
            $('#crpImg2').append($("<img/>", { src: encodedImgFromFileUpload }));
            picStatus = "File";
            var detail = "Filesize: " + size + " | Image width: " + width + " PX | Image height: " + height + " PX";
            $('#ImgDetail').append(detail);
        };
    };
};
document.getElementById('ImageBrowse').onchange = function (e) {
    $('#canv').html('');
    $('#ImgDetail').html("");
    var File = this.files;
    if (File && File[0]) {
        ReadImage(File[0]);
    }
};

var screenwidth = 400;
function rotate_cw() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var img = new Image();
    img.src = imgurl;

    var maxsize = screenwidth;
    var w = maxsize;
    var ratio = (img.width / w);
    var h = (img.height / ratio);
    canvas.width = h;
    canvas.height = w;

    ctx.translate(w - h, w);
    ctx.rotate((-90 * Math.PI) / 180);
    ctx.translate(0, -(w - h));
    ctx.drawImage(img, 0, 0, w, h);

    ctx.save();
}

function rotate_ccw() {
    canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var img = new Image();
    img.src = imgurl;

    var maxsize = screenwidth;
    var w = maxsize;
    var ratio = (img.width / w);
    var h = (img.height / ratio);
    canvas.width = h;
    canvas.height = w;

    ctx.translate(h, 0);
    ctx.rotate((90 * Math.PI) / 180);
    ctx.drawImage(img, 0, 0, w, h);
    ctx.save();
}

function loadImage() {
    debugger
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    context.setTransform(1, 0, 0, 1, 0, 0);

    var img = new Image();
    if (imgurl === null || imgurl === "") {
        imgurl = defaultimgurl;
    }
    img.src = imgurl;

    var maxsize = screenwidth;
    var w = maxsize;
    var ratio = (img.width / w);
    var h = (img.height / ratio);
    canvas.width = w;
    canvas.height = h;

    img.onload = function () {
        context.drawImage(img, 0, 0, w, h);
    };

    context.save();
}
//var angleInDegrees = 0;



function draw() {
    if (cv === "") {
        $('#divCanvas').html("");
        cv += '<canvas id="canvas" width="300" height="250"></canvas>';
        $('#divCanvas').append(cv);
        debugger;
        canvas = $("#canvas");
        context = canvas.get(0).getContext("2d");
    } else {

        debugger;
        canvas = $("#canvas");
        context = canvas.get(0).getContext("2d");
    }
    crop(this, "imageData");

    //context.drawImage(this, 0, 0, 565, 380);
}
function failed() {
    console.error("The provided file couldn't be loaded as an Image media");
}

$('#rotate_ccw').click(function () {
    rotate_ccw();
    loadImage();
});
$('#rotate_cw').click(function () {
    rotate_cw();
    loadImage();
});
function crop(img, data) {
    context.canvas.height = img.height;
    context.canvas.width = img.width;
    if (data === "videoData") {
        context.drawImage(img, 0, 0, 640, 480);
    } else {
        context.drawImage(img, 0, 0, 2500, 2000);
    }

    var cropper = canvas.cropper({
        aspectRatio: 1 / 1,
        rotatable: true,

        minCanvasWidth: 640,

        minCanvasHeight: 340,
        checkOrientation: true,
        responsive: true
    });

    $('#btnCrop').click(function () {
        debugger
        // Get a string base 64 data url
        croppedImageDataURL = canvas.cropper('getCroppedCanvas').toDataURL("image/png");
        document.getElementById('crpImg').style.display = 'block';
        document.getElementById('crpImg2').style.display = 'none';
        document.getElementById('divCanvas').style.display = 'none';
        document.getElementById('canv').src = croppedImageDataURL;
        document.getElementById('divFileUpload').style.display = 'none';
        document.getElementById('stage').style.display = 'none';
        document.getElementById('controls').style.display = 'none';
        picStatus = "Camera";

    });
    $('#btnRestore').click(function () {
        debugger
        canvas.cropper('reset');
        $result.empty();
    });
    $("#btnRotate").click(function () {
        debugger
        $('#divCanvas').html("");
        cv += '<canvas id="canvas" width="300" height="250"></canvas>';
        $('#divCanvas').append(cv);

        canvas = document.getElementById("canvas");
        context = canvas.getContext("2d");

        var image = document.createElement("img");
        image.onload = function () {
            context.drawImage(image, canvas.width / 2 - image.width / 2, canvas.height / 2 - image.width / 2);
        };
        image.src = img;

        drawRotated(angleInDegrees, image);
    });
    cv = '';
};

// Put event listeners into place
var video;
var cv;
window.addEventListener("DOMContentLoaded", function () {
    cv = '';
    cv += '<canvas id="canvas" width="300" height="250"></canvas>';
    $('#divCanvas').append(cv);
    // Grab elements, create settings, etc.
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    video = document.getElementById('video');
    var mediaConfig = { video: true };
    var errBack = function (e) {
        console.log('An error has occurred!', e);
    };

    // Put video listeners into place
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(mediaConfig).then(function (stream) {
            //video.src = window.URL.createObjectURL(stream);
            video.srcObject = stream;
            video.play();
        });
    }

    /* Legacy code below! */
    else if (navigator.getUserMedia) { // Standard
        navigator.getUserMedia(mediaConfig, function (stream) {
            video.src = stream;
            video.play();
        }, errBack);
    } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
        navigator.webkitGetUserMedia(mediaConfig, function (stream) {
            video.src = window.webkitURL.createObjectURL(stream);
            video.play();
        }, errBack);
    } else if (navigator.mozGetUserMedia) { // Mozilla-prefixed
        navigator.mozGetUserMedia(mediaConfig, function (stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
        }, errBack);
    }

    // Trigger photo take
    document.getElementById('snap').addEventListener('click', function () {
        document.getElementById('divCanvas').style.display = 'block';
        document.getElementById('crpImg').style.display = 'none';
        if (cv === "") {
            $('#divCanvas').html("");
            cv += '<canvas id="canvas" width="300" height="250"></canvas>';
            $('#divCanvas').append(cv);
            debugger;
            canvas = $("#canvas");
            context = canvas.get(0).getContext("2d");
        } else {

            debugger;
            canvas = $("#canvas");
            context = canvas.get(0).getContext("2d");
        }

        imgurl = video;
        crop(video, "videoData");
    });
}, false);
var croppedImageDataURL = null;
var ImageEncodedString1 = '';
var ImageEncodedString2 = '';
var ImageEncodedString3 = '';
var ImageEncodedString4 = '';
