
$(function () {
    $("#loaderbody").addClass('hide');


    $(document).bind('ajaxStart', function () {
        $("#loaderbody").removeClass('hide');
    }).bind('ajaxStop', function () {
        $("#loaderbody").addClass('hide');
    });
});
$(document).ready(function () {

    getNews();

    $("#valid").on({
        mouseover: function () {
            //debugger
            $(this).css({
                'cursor': 'pointer',
                'background-color': 'green',
                'border':'none',
                'border-bottom':'1px solid #fff',
                'background':'green',
                'outline':'none',
                'height':'30px',
                'width':'30px',
                'color':'#fff',
                'font-size':'16px',

            });
        },
        mouseout: function () {
            $(this).css({
                'cursor': 'default',
                'border-Color': 'grey',
                'background-color': '#007ACC',
                'border':'none',
                'border-bottom':'1px solid #fff',
                'background':'green',
                'outline':'none',
                'height':'30px',
                'width':'30px',
                'color':'#fff',
                'font-size':'16px',
            });
        },
        click: function () {

            $(this).css({
                'background-color': 'orange',
            });

        }
    });
    $("#inValid").on({
        mouseover: function () {
            //debugger
            $(this).css({
                'cursor': 'pointer',
                'background-color': 'red',
                'border': 'none',
                'border-bottom': '1px solid #fff',
                'background': 'green',
                'outline': 'none',
                'height': '30px',
                'width': '30px',
                'color': '#fff',
                'font-size': '16px',

            });
        },
        mouseout: function () {
            $(this).css({
                'cursor': 'default',
                'border-Color': 'grey',
                'background-color': '#007ACC',
                'border': 'none',
                'border-bottom': '1px solid #fff',
                'background': 'green',
                'outline': 'none',
                'height': '30px',
                'width': '30px',
                'color': '#fff',
                'font-size': '16px',
            });
        },
        click: function () {

            $(this).css({
                'background-color': 'orange',
            });

        }
    });

});
// Declare a variable to check when the action is Insert or Update
var isUpdateable = false;
var html = '';

var value = '';

function getNews() {
    //debugger
    $.ajax({
        url: '/Backend/GetAllNews/',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            //debugger
            var rows = '';
            $.each(data, function (i, item) {
                rows += "<tr>"
                rows += "<td>" + item.Content + "</td>"

                if (item.IsValid === true) {
                    rows += "<td><input style='cursor: pointer;background: green;border:none;border-bottom:1px solid #fff;outline:none;height:30px;width:30px;color:#fff;font-size:16px;' class='valid' type='checkbox' value='true' checked></input>"
                }
                else if (item.IsValid === false) {
                    rows += "<td><input style='cursor: pointer;background: red;border:none;border-bottom:1px solid #fff;outline:none;height:30px;width:30px;color:#fff;font-size:16px;' type='checkbox' value='false'></input>"

                }
                rows += "</td>"
                rows += "<td><button type='button' id='btnEdit' class='btn btn-default glyphicon glyphicon-pencil' onclick='return getNewsById(" + item.InformationId + ")'></button> <button type='button' id='btnDelete' class='btn btn-danger glyphicon glyphicon-trash' onclick='return deleteNewsById(" + item.InformationId + ")'></button></td>"

                rows += "</tr>";

                $("#NewsList").html(rows);

            });


        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
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
var SearchResult = function () {
    $("#search").val(function () {
        var searchtext = $(this).val();
        $.ajax({
            url: "/Backend/NewsSearchRecord?search=" + searchtext,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var rows = '';
                $.each(data, function (i, item) {
                    rows += "<tr>"
                    rows += "<td>" + item.Content + "</td>"

                    if (item.IsValid === true) {
                        rows += "<td><input style='cursor: pointer;background: green;border:none;border-bottom:1px solid #fff;outline:none;height:30px;width:30px;color:#fff;font-size:16px;' class='valid' type='checkbox' value='true' checked></input>"
                    }
                    else if (item.IsValid === false) {
                        rows += "<td><input style='cursor: pointer;background: red;border:none;border-bottom:1px solid #fff;outline:none;height:30px;width:30px;color:#fff;font-size:16px;' type='checkbox' value='false'></input>"

                    }
                    rows += "</td>"
                    rows += "<td><button type='button' id='btnEdit' class='btn btn-default glyphicon glyphicon-pencil' onclick='return getNewsById(" + item.InformationId + ")'></button> <button type='button' id='btnDelete' class='btn btn-danger glyphicon glyphicon-trash' onclick='return deleteNewsById(" + item.InformationId + ")'></button></td>"

                    rows += "</tr>";
                    $("#NewsList").html(rows);
                });

            },
            error: function (err) {
                alert("Error: " + err.responseText);
            }
        });

    })
}


function NewsPost(formData) {
    debugger
    var ajaxConfig = {
        type: "post",
        url: '/Backend/SaveNews/',
        data: new FormData(formData),
        contentType: false,
        processData: false,
        success: function (result) {
            alert(result);
            window.location.href = "/Backend/News";
        }
    }
    if ($(formData).attr('enctype') === "multipart/form-data") {
        ajaxConfig["contentType"] = false
        ajaxConfig["processData"] = false
    }
    $.ajax(ajaxConfig);
    return false;
}

//var SaveAndUploadImage = function () {

//    var file = $("#imageBrowes").get(0).files;
//    var data = new FormData;
//    data.append("ImageFile", file[0]);
//    data.append("Bankname", $("#Bankname").val());
//    data.append("AccountNumber", $("#AccountNumber").val());
//    data.append("AccountType", $("#AccountType").val());
//    data.append("Purpose", $("#Purpose").val());
//    data.append("BankLogoPath", $("#BankLogoPath").val());

//    $.ajax({
//        type: "post",
//        url: "/Giving/Create",
//        data: data,
//        contentType: false,
//        processData: false,
//        success: function (response) {
//            getAccountDetails();
//            $("#uploadedImage").append('<img src="/Images/' + response + '" class="img-responsive thumbnail"/>')
//            $("#imageBrowes").val('');
//            $("#description").text('');
//            $("#imgPreview").hide();
//            clear();
//        }
//    })
//}







// Get Account Detail by id
function getNewsById(id) {

    $("#title").text("News Detail");
    $("#btnSave").text("Update");
    $.ajax({
        url: '/Backend/GetNewsById/' + id,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $("#InformationId").val(data.InformationId);
            $("#Content").val(data.Content);
            debugger
            if (data.IsValid === true) {
                //$('#IsValid').prop('checked', true);
                $("#IsValid").attr("checked", "checked");
            } else {
               // $('#IsValid').prop('checked', false);
                $("#IsValid").removeAttr("checked");
            }

            isUpdateable = true;
            $("#newsDetailModal").modal('show');
        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
}


$("#btnSave").click(function (e) {
    if ($('#IsValid').prop('checked')) {
        value = "True";
    } else {
        value = "False";
    }
    //debugger
    data = {
        InformationId: $("#InformationId").val(),
        Content: $("#Content").val(),
        IsValid: value,
    }


    if (!isUpdateable) {
        debugger
        $.ajax({
            url: '/Backend/SaveNews/',
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function (data) {
                getNews();
                $("#newsDetailModal").modal('hide');
                alert(data);
                clear();
            },
            error: function (err) {
                alert("Error: " + err.responseText);
            }
        })
    }
    else {
        debugger
        $.ajax({
            url: '/Backend/UpdateNews/',
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function (data) {
                getNews();
                alert(data);
                isUpdateable = false;
                $("#newsDetailModal").modal('hide');
                clear();
            },
            error: function (err) {
                alert("Error: " + err.responseText);
            }
        })
    }
});
//function CreateOrUpdateNews(formData) {
//    debugger
//    if (!isUpdateable) {

//        var ajaxSaveConfig = {
//            type: "post",
//            url: '/Backend/SaveNews/',
//            data: new FormData(formData),
//            contentType: false,
//            processData: false,
//            success: function (result) {
//                alert(result);
//                window.location.href = "/Backend/News";
//            }
//        }
//        if ($(formData).attr('enctype') === "multipart/form-data") {
//            ajaxSaveConfig["contentType"] = false
//            ajaxSaveConfig["processData"] = false
//        }
//        $.ajax(ajaxSaveConfig);
//        return false;
//    }
//    else {
//        //debugger
//        var ajaxUpdateConfig = {
//            type: "post",
//            url: '/Backend/UpdateNews/',
//            data: new FormData(formData),
//            contentType: false,
//            processData: false,
//            success: function (result) {
//                alert(result);
//                window.location.href = "/Backend/News";
//            }
//        }
//        if ($(formData).attr('enctype') === "multipart/form-data") {
//            ajaxUpdateConfig["contentType"] = false
//            ajaxUpdateConfig["processData"] = false
//        }
//        $.ajax(ajaxUpdateConfig);
//        return false;
//    }
//}

// Delete category by id
function deleteNewsById(id) {
    $("#confirmModal #title").text("Delete News Detail");
    $("#confirmModal").modal('show');
    $("#confirmModal #btnOk").click(function (e) {
        $.ajax({
            url: "/Backend/DeleteNewById/" + id,
            type: "POST",
            dataType: 'json',
            success: function (data) {
                getNews();
                $("#confirmModal").modal('hide');
                clear();
            },
            error: function (err) {
                alert("Error: " + err.responseText);
            }
        });

        e.preventDefault();
    });
}

// Set title for create new
$("#btnCreate").click(function () {
    $("#btnSave").text("Save");
    $("#title").text("Add News Details");
    clear();
})

// Close modal
$("#btnClose").click(function () {
    clear();
});

// Clear all items
function clear() {
    $("#InformationId").val("");
    $("#Content").val("");
    $("#IsValid").val("");
}
