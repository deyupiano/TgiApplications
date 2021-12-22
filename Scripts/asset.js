
var oTable = '';
var id = '';
var customer = '';
$(document).ready(function () {
    $("#assetDetailModal").modal('hide');
    $("#confirmModal").modal('hide');
    getAssetList();
});
var custName = '';
var branch = '';
var userIdentity = '';
$("#CustomerNameUpd").change(function () {
    debugger
    if ($(this).val() !== '') {
        customer = $(this).val();
    }
    ///////// get text of the selected value of dropdownlist on it change event ///////////////
    custName = $(this).find("option:selected").text();

    //GetUserId(custName);
});
$("#JubailiBranchIdUpd").change(function () {
    debugger
    if ($(this).val() !== '') {
        branch = $(this).val();
    }
    ///////// get text of the selected value of dropdownlist on it change event ///////////////
    branch = $(this).find("option:selected").text();

    //GetUserId(custName);
});
//function GetUserId(custName) {
//    debugger
//    $.ajax({
//        url: '/Asset/GetUserIdentity?UserName=' + custName,
//        type: 'POST',
//        data: { 'UserName': custName},
//        async: false,
//        success: function (data) {
//            debugger
//            userIdentity = data;
//        },
//        error: function (err) {
//            alert("Error: " + err.responseText);
//        }

//    });
//};



function getAssetList() {
    $.ajax({
        url: '/Asset/ShowAssets/',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            debugger
            if ($.fn.DataTable.isDataTable("#assetListTable")) {
                oTable.draw();

            } else {
                oTable = $('#assetListTable').DataTable({

                    initComplete: function () {
                        var r = $('#assetListTable tfoot tr');
                        r.find('th').each(function () {
                            $(this).css('padding', 8);
                        });
                        $('#assetListTable thead').append(r);
                        $('#search_0').css('text-align', 'center');
                        // Setup - add a text input to each footer cell
                        $('#assetListTable tfoot th').each(function () {
                            var title = $(this).text();
                            $(this).html('<input type="text" placeholder="Search ' + title + '" />');
                        });

                        // DataTable
                        var table = $('#assetListTable').DataTable();

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
                        { 'data': 'SerialNo' },
                        {
                            'data': 'InstallDate',
                            "type": "date ",
                            "render": function (value) {
                                if (value === null) return "";

                                var pattern = /Date\(([^)]+)\)/;
                                var results = pattern.exec(value);
                                var dt = new Date(parseFloat(results[1]));

                                return (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear() + "<b style='color:red'> Time: " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds()+ "</b>";
                            }
                        },
                        { 'data': 'CustomerName' },
                        { 'data': 'JubailiBranchId' },
                        //{
                        //    'data': 'JubailiBranchId',
                        //    'render': function GetBranchName(jubailiBranchId) {
                        //        debugger
                        //        var branchName = '';
                        //        $.ajax({
                        //            url: '/Asset/GetBranchName/' + jubailiBranchId,
                        //            type: 'POST',
                        //            async: false,
                        //            success: function (data) {
                        //                debugger
                        //                branchName = data;
                        //            },
                        //            error: function (err) {
                        //                alert("Error: " + err.responseText);
                        //            }

                        //        });
                        //        return branchName;
                        //    },
                        //},
                        { 'data': 'GeoLocation' },
                        { 'data': 'AssetModel' },
                        { 'data': 'ProductKey' },
                        { 'data': 'EngineSerial' },
                        { 'data': 'Kva' },
                        { 'data': 'SiteAddress' },
                        {
                            "data": "AssetId", "render": function (data) {
                                id === data;
                                return "<button type='button' id='btnEdit' class='btn btn-default glyphicon glyphicon-pencil' onclick='return getAssetById(" + data + ")'></button> <button type='button' id='btnDelete' class='btn btn-danger glyphicon glyphicon-trash' onclick='return deleteAssetById(" + data + ")'></button>";
                            },
                        },
                    ],
                });
            }


        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
}
var code = '';
$("body").on("click", "#btnAdd", function () {

    //Reference all input control with their Ids.


    var serialPrefix = $("#SerialPrefix");
    var serialNo = $("#SerialNo");
    var engineSerial = $("#EngineSerial");
    var model = $("#AssetModel");
    var productKey = $("#ProductKey");
    var kva = $("#Kva");
    var branch = $("#JubailiBranchId");
    //Get the reference of the Table's TFOOT element.
    var tBody = $("#assetTable > TBODY")[0];

    //Add Row.
    var row = tBody.insertRow(-1);

    //Add serialPrefix cell;
    cell = $(row.insertCell(-1));
    cell.html(serialPrefix.val());

    //Add serialNo cell;
    cell = $(row.insertCell(-1));
    cell.html(serialNo.val());

    //Add engineSerial cell;
    cell = $(row.insertCell(-1));
    cell.html(engineSerial.val());

    //Add model cell.
    cell = $(row.insertCell(-1));
    cell.html(model.val());


    //Add productKey cell.
    cell = $(row.insertCell(-1));
    cell.html(productKey.val());


    //Add kva cell.
    cell = $(row.insertCell(-1));
    cell.html(kva.val());

    //Add Branch cell.
    cell = $(row.insertCell(-1));
    cell.html(branch.val());


    ////Add CustomerId cell.
    //cell = $(row.insertCell(-1));
    //cell.html(customer);
    //var cell = $(row.insertCell(-1));


    //Add Button cell.
    var btnRemove = $("<input />");
    btnRemove.attr("type", "button");
    btnRemove.attr("onclick", "Remove(this);");
    btnRemove.val("Remove");
    cell = $(row.insertCell(-1));
    cell.append(btnRemove);


});
var name = '';
function Remove(button) {
    //Determine the reference of the Row using the Button.
    //debugger
    var row = $(button).closest("TR");
    name = $("TD", row).eq(2).html();
    if (confirm("Do you realy want to delete engine number " + name + " from list? ")) {
        //Get the reference of the Table.
        var table = $("#assetTable")[0];
        //Delete the Table row using it's Index.
        table.deleteRow(row[0].rowIndex);
    }
};

$("#btnSave").click(function () {
    registerAllAsset();
});

function registerAllAsset() {
    debugger
    //Loop through the Table rows and build a JSON array.
    var assets = new Array();
    $("#assetTable TBODY TR").each(function () {
        var row = $(this);
        var asset = {};
        asset.SerialPrefix = row.find("TD").eq(0).html();
        asset.SerialNo = row.find("TD").eq(1).html();
        asset.EngineSerial = row.find("TD").eq(2).html();
        asset.AssetModel = row.find("TD").eq(3).html();
        asset.ProductKey = row.find("TD").eq(4).html();
        asset.Kva = row.find("TD").eq(5).html();
        asset.JubailiBranchId = row.find("TD").eq(6).html();
        assets.push(asset);


    });

    //Send the JSON array to Controller using AJAX.
    $.ajax({
        type: "POST",
        url: "/Asset/Create",
        data: JSON.stringify(assets.splice(1)),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            window.location.href = "/Asset/Create";
            //alert(r);
            $("#assetListTable").dataTable().fnDestroy();
            getAssetList();

        }
    });
};
// Set title for create new



// Close modal
$("#btnClose").click(function () {
    clear();
});
var d = '';
var assetId = '';
var assetModel = '';
var serialNo = '';
var engineSerial = '';
var kva = '';
var productKey = '';
var customerName = '';
var branchId = '';
function getAssetById(id) {
    debugger
    $.ajax({
        url: '/Asset/GetAssetById/' + id,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            debugger
            d = data.EngineSerial;
            assetId = data.AssetId;
            assetModel = data.AssetModel;
            serialNo = data.SerialNo;
            engineSerial = data.EngineSerial;
            kva = data.Kva;
            productKey = data.ProductKey;
            customerName = data.CustomerName;
            branchId = data.JubailiBranchId;
            $("#assetDetailModal").modal('show');
            $("#AssetModelUpd").val(data.AssetModel);
            $("#AssetIdUpd").val(data.AssetId);
            $("#SerialNoUpd").val(data.SerialNo);
            $("#EngineSerialUpd").val(data.EngineSerial);
            $("#KvaUpd").val(data.Kva);
            $("#ProductKeyUpd").val(data.ProductKey);
            $("#ProductKeyUpd").val(data.ProductKey);
            $("#CustomerNameUpd").val(data.customerName);
            $("#JubailiBranchIdUpd").val(data.branchId);
        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
}
//function AjaxAssetUpdatePost(formData) {
//    debugger
//    $("#title").text("Asset Details");
//    var ajaxUpdateAssetConfig = {
//        type: "post",
//        url: '/Asset/Edit/' + id,
//        data: new FormData(formData),
//        contentType: false,
//        processData: false,
//        success: function (result) {
//            alert(result);
//            //window.location.href = '/Backend/Registration/';
//            $("#assetDetailModal").modal('hide');
//            $("#assetListTable").dataTable().fnDestroy();
//            getAssetList();
//        }
//    }
//    if ($(formData).attr('enctype') === "multipart/form-data") {
//        ajaxUpdateAssetConfig["contentType"] = false
//        ajaxUpdateAssetConfig["processData"] = false
//    }
//    //ShowEnrollmentCost();
//    $.ajax(ajaxUpdateAssetConfig);
//    return false;
//}
var data;
$("#btnUpdate").click(function () {
    debugger
    var customerNameUpd = customer;
    var siteAddress = $("#SiteAddressUpd").val();
    var geoLocation = $("#GeoLocationUpd").val();
    data = {
        "AssetId": assetId,
        "AssetModel": assetModel,
        "SerialNo": serialNo,
        "EngineSerial": engineSerial,
        "Kva": kva,
        "ProductKey": productKey,
        "CustomerId": customerIdUpd,
        "SiteAddress": siteAddress,
        "GeoLocation": geoLocation,
        "CustomerName": customer,
        "JubailiBranchId": branchId,
    };
    UpdateAsset();
});

function UpdateAsset() {
    $("#title").text("Asset Details");
    debugger
    $.ajax({
        type: "POST",
        url: "/Asset/Edit",
        data: data,
        dataType: "json",
        success: function (r) {
            window.location.href = "/Asset/Create";
            //alert(r);
            $("#assetListTable").dataTable().fnDestroy();
            getAssetList();

        }
    });
}

function deleteAssetById(id) {
    getAssetId(id);
    $("#confirmModal #title").text("Remove Asset");
    $("#confirmModal").modal('show');
    //debugger
    
    var dd = "Do you realy want to delete this record with " + d + " engine serial number?";
    $("#del").html(dd);
    $("#confirmModal #btnOk").click(function (e) {
        $.ajax({
            url: "/Asset/DeleteAssetById/" + id,
            type: "POST",
            dataType: 'json',
            success: function (data) {

                $("#confirmModal").modal('hide');

                $("#assetListTable").dataTable().fnDestroy();
                getAssetList();
            },
            error: function (err) {
                alert("Error: " + err.responseText);
            }
        });

        e.preventDefault();
    });
}

