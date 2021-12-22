$("#wrapper1").scroll(function () {
    $("#wrapper2").scrollLeft($("#wrapper1").scrollLeft());
});
$("#wrapper2").scroll(function () {
    $("#wrapper1").scrollLeft($("#wrapper2").scrollLeft());
});
var selectedItemCatId;
function whenItemCatChanged() {

    selectedItemCatId = $("#itemCat option:selected").val();

    var crit0 = {
        "ItemCategoryId": parseInt(selectedItemCatId)
    }
    var itemfilteredRows = filterResult(items, crit0);


    //var crit = {
    //    "ItemId": parseInt(selectedItemCatId)
    //}
    //var itemRowData = filterResult(itemfilteredRows, crit);
    var rw = "";
    $('#item option:not(:first)').remove();
    $.each(itemfilteredRows, function (i, stu) {
        var crit1 = {
            "Id": stu.Id
        }

        var itemTypeRow = filterResult(serviceTypes, crit1);
        let getValueFromOject1 = Object.fromEntries(
            Object.entries(itemTypeRow).map(([key, value]) => [key, value])
        );

        var type = getValueFromOject1[0].Name;

        rw += "<option value='" + stu.ItemId + "'>" + stu.ItemName + "(" + type + ")" + "</option>";
    });
    $("#item").append(rw);
}
function whenCenterChanged() {
   
    selectedCenter = $("#center option:selected").val();
   // alert(selectedCenter);
}
var selectedTagmode;
function whenTagingModeChanged() {
    $("#tag").html("");
   
    selectedTagmode = $("#tagMode option:selected").val();
    //<label class="lbb" id="ref">Refrence</label>
    if (selectedTagmode !== "") {
        if (selectedTagmode === "MANUAL") {
            $("#tag").append("<label class='lbb'>TAG CODE</label><input id='ref' class='form-control col-md-9 col-sm-9 col-xs-9' placeholder='TAG CODE'/>")
        } else if (selectedTagmode === "AUTOMATIC") {
            $("#tag").append("<label class='lbb'>TAG CODE</label><input id='ref' class='form-control col-md-9 col-sm-9 col-xs-9'/>");
            $("#ref").css("pointer-events", "none");

        }
    } else {
        $("#tag").append("<label class='lbb'>TAG CODE</label><input id='ref' class='form-control col-md-9 col-sm-9 col-xs-9'/>");
        $("#ref").css("pointer-events", "none");
    }
}
var selectedColor;
function whenColorChanged() {
   
    selectedColor = $("#itemColor").val();
}
var xCharges;
function whenLocationChanged() {
   
    selectedLocation = $("#location option:selected").val();
    var crit = {
        "Location": selectedLocation,
    }

    LocationRowData = filterResult(locations, crit);
    if (LocationRowData !== null && LocationRowData.length > 0) {
        let getValueFromOject = Object.fromEntries(
            Object.entries(LocationRowData).map(([key, value]) => [key, value])
        );

        xCharges = getValueFromOject[0].Charges;
        alert('LOCATION EXTRA CHARGES:' + xCharges);
    } else {
        alert('NO EXTRA CHARGES ATTACHED');

    }
}
var cName, cUId, cId, cPhoneNo, cEmail;
function whenCustomerChanged() {
   
    selectedCustomer = $("#customer option:selected").val();
    referenceCode = randomString();
    //alert(referenceCode);
    //$("#ref").text('TAG NO: ' + referenceCode + '');
    if (selectedTagmode === "AUTOMATIC") {
        $("#ref").val(referenceCode);
    }


    var crit = {
        "CustId": parseInt(selectedCustomer),
    }

    var customerRowData = filterResult(customers, crit);
    if (customerRowData !== null && customerRowData.length > 0) {
        let getValueFromOject = Object.fromEntries(
            Object.entries(customerRowData).map(([key, value]) => [key, value])
        );

        cName = getValueFromOject[0].Fullname;
        cId = getValueFromOject[0].CustId;
        cUId = getValueFromOject[0].UniqueId;
        cPhoneNo = getValueFromOject[0].PhoneNumber;
        cEmail = getValueFromOject[0].Email;
       
    }
}
var servicesByCategory;

function whenServiceCategoryChanged() {
   
    selectedCatId = $("#serviceCategory option:selected").val();
    var crit = {
        "ServiceCategoryId": parseInt(selectedCatId)
    }

    servicesByCategory = filterResult(services, crit);
    row1 = "";

    $('#service option:not(:first)').remove();
    $.each(servicesByCategory, function (i, stu) {
        var crit = {
            "ItemId": stu.ItemId
        }
        var itemRowData = filterResult(items, crit);
        let getValueFromOject = Object.fromEntries(
            Object.entries(itemRowData).map(([key, value]) => [key, value])
        );

        var name = getValueFromOject[0].ItemName;

        row1 += "<option value='" + stu.ServiceId + "'>" + stu.ServiceName + " (" + name + ")" + "</option>";

    });
    $('#service').append(row1);

}
var selectedService, selectedServiceText,selectedProgress;
function whenServiceChanged() {
    $("#serviceType").prop('selectedIndex', 0);
    selectedService = $("#service option:selected").val();
    selectedServiceText = $("#service option:selected").text();
}
function whenProgressChanged() {
   
    selectedProgress = $("#progessStatus option:selected").val();
    //alert(selectedProgress);
}
var selectedQty
function whenQuantityChanged() {
   
    selectedQty = $("#quantity").val();



    //alert(total);
    var qPrice = $("#itemPrice").text();
    var newPrice;
    if (qPrice.includes(":") === true) {
        newPrice = qPrice.split(':')[1];
    } else {
        newPrice = price;
    }
    if (serviceRowData !== null) {
        total = parseInt(newPrice) * parseInt(selectedQty);
        $("#total").text('TOTAL: ' + total + '');
    } else {
        $("#total").text('TOTAL: ERROR');
    }

}
function getItemName(itemId) {
    var itemName;
    var crit = {
        "ItemId": parseInt(itemId)
    }

   var itemRowData = filterResult(items, crit);
    if (itemRowData !== null && itemRowData.length > 0) {
        let getValueFromOject = Object.fromEntries(
            Object.entries(itemRowData).map(([key, value]) => [key, value])
        );

        itemName = getValueFromOject[0].ItemName;

    }
    return itemName;
}
var serviceRowData = null;
var serviceTypeId, serviceTypeText;
function whenRequestChanged() {
   
    serviceTypeId = $("#serviceType option:selected").val();
    serviceTypeText = $("#serviceType option:selected").text();
    debugger
    var crit = {
        "ServiceId": parseInt(selectedService),
        "ServiceCategoryId": parseInt(selectedCatId),
        "Id": parseInt(serviceTypeId),
    }

    serviceRowData = filterResult(services, crit);
    if (serviceRowData !== null && serviceRowData.length > 0) {
        let getValueFromOject = Object.fromEntries(
            Object.entries(serviceRowData).map(([key, value]) => [key, value])
        );

        price = getValueFromOject[0].Price;
        $("#itemPrice").text('PRICE:' + price + '');
    } else {
        $("#itemPrice").text('PRICE NOT FOUND');
    }
   
}
var customers, services, serviceTypes, serviceCategories, items, bizCenters, progessStatuses, locations, iCategories;
$(document).ready(function () {
    call4DropDownList();

    $('.demo2').colorpicker();

});
//
function getTextMessage(msg) {
    return msg;
}
function getEmailMessage(msg) {
    return msg;
}
$("#btnSendText").click(function () {
    alert(textMessage);
    var data = {
        "Destination": cPhoneNo,
        "Body": textMessage
    }
    var editedData = JSON.stringify(data);
    debugger
    try {

        $.ajax({
            url: '/Customer/SendText',
            type: 'POST',
            data: editedData,
            contentType: 'application/json;',
            dataType: 'json',
            success: function (result) {

            },
            error: function (err) {
                alert("Error: " + err.responseText);
            }
        });

    } catch (w) {
        debugger
        alert(w);
    }
});
$("#btnSendEmail").click(function () {
    var data = {
        "Destination": cEmail,
        "Body": mailMessage
    }
    var editedData = JSON.stringify(data);
    $.ajax({
        url: '/customer/SendMail',
        type: 'POST',
        data: editedData,
        contentType: 'application/json;',
        dataType: 'json',
        success: function (result) {

        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });

    //$("#summaryDetailsDiv").css("display", "none");
    //$("#create").css("display", "block");
});
$("#btoOrder").click(function () {
    $("#summaryDetailsDiv").css("display", "none");
    $("#create").css("display", "block");
});
$("#backToFirstChoice").click(function () {
    $("#firstCriteria").css("display", "block");
    $("#create").css("display", "none");
});
$("#btnLocation").click(function () {
    $("#firstCriteria").css("display", "none");
    $("#create").css("display", "block");
    debugger
    $('.double-scroll').doubleScroll();
});
var mailMessage = "";
var textMessage = "";
$("#orderSummary").click(function () {
    submitOfflineOrderData();
    var d = new Date();
    var strDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

    $("#create").css("display", "none");
    $("#summaryDetailsDiv").css("display", "block");
    
    var row = "";
    row += "<div style='width:100%;height:auto;background-color:white;padding:10px'>";

    row += "<div style='width:100%;height:180px;background-color:white;color:darkblue;font-size:15px;text-align:center;padding-top:5px'>";
    row += "<div class='col-md-2'><img src='../Content/images/laundryLogo.jpg'class='logo' /></div>";
    row += "<div class='col-md-9'>";
    row += "<div style='width:100%;text-align:center;font-size:20px;font-weight:bold'>TOLBEEL PROFESSIONAL LAUNDRY & DRY CLEANING SERVICES</div>";
    row += "<div style='width:100%;text-align:center;font-size:15px;margin-top:8px;border-bottom:4px solid darkblue;font-weight:bold'>ORDER SUMMARY</div>";
    row += "</div> ";

    row += "</div> ";

    row += "<p style='color:black;padding:10px;width:100%'>";
    row += "<span style='width:50%;font-weight:bold'>CUSTOMER NAME: </span>";
    row += "<span style='width:50%'>" + $("#customer option:selected").text()+"</span>";
    row += "</p>";

    row += "<p style='color:black;padding:10px;width:100%'>";
    row += "<span style='width:50%;font-weight:bold'>CUSTOMER ID: </span>";
    row += "<span style='width:50%'>" + cUId + "</span>";
    row += "</p>";

    row += "<p style='color:black;padding:10px;width:100%'>";
    row += "<span style='width:50%;font-weight:bold'>ORDER TAG: </span>";
    row += "<span style='width:50%'>" + referenceCode + "</span>";
    row += "</p>";

    row += "<p style='color:black;padding:10px;width:100%'>";
    row += "<span style='width:50%;font-weight:bold'>SERVICE CATEGORY: </span>";
    row += "<span style='width:50%'>" + $("#serviceCategory option:selected").text() + "</span>";
    row += "</p>";

    row += "<p style='color:black;padding:10px;width:100%'>";
    row += "<span style='width:50%;font-weight:bold'>ORDER DATE: </span>";
    row += "<span style='width:50%'>" + strDate + "</span>";
    row += "</p>";


    row += "<p style='color:black;padding:10px;width:100%'>";
    row += "<span style='width:50%;font-weight:bold'>PICK UP DATE: </span>";
    row += "<span style='width:50%'>" + $("#pickupDate").val() + "</span>";
    row += "</p>";

    row += "</div>";
    row += "<table class='table table-striped table-bordered  dt-responsive nowrap' id='tbOrderSummary' style='width:100%;height:auto;background-color:white;padding:10px;color:black'>";
    row += "<tr style='background-color:darkblue;color:white'>";
    row += "<td>ITEM</td>";
    row += "<td>PRICE</td>";
    row += "<td>QUATITY</td>";
    row += "<td>TOTAL</td>";
    row += "</tr>";
    $.each(persons, function (i, stu) {
       
        row += "<tr>";
        row += "<td>" + getItemName(stu.ItemId)+"</td>";
        row += "<td>"+stu.Price+"</td>";
        row += "<td>" + stu.Quantity +"</td>";
        row += "<td class='total'><input id='sumTotal' value='" + accounting.formatMoney(stu.Amount, "&#8358;") + "' class='form-control' disabled='disabled' /></td>";
        row += "</tr>";
    });
    row += "<tr>";
    row += "<td></td>";
    row += "<td></td>";
    row += "<td>TOTAL</td>";
    row += "<td><input id='sumTotal' value='" + accounting.formatMoney(sumTotal(), "&#8358;") + "' class='form-control' disabled='disabled' style='border-top:1px solid red'/></td>";
    row += "</tr>";

    row += "<tr>";
    row += "<td></td>";
    row += "<td></td>";
    row += "<td>EXTRA CHARGES</td>";
    row += "<td><input id='xCharges' value='" + accounting.formatMoney(xCharges, "&#8358;") + "' class='form-control' disabled='disabled' style='border-bottom:1px solid red' /></td>";
    row += "</tr>";

    row += "<tr>";
    row += "<td></td>";
    row += "<td></td>";
    row += "<td>GRAND TOTAL</td>";
    row += "<td><input id='gTotal' value='" + accounting.formatMoney(getGrandTotal(), "&#8358;") + "' class='form-control' disabled='disabled' style='border-top:1px solid red'/></td>";
    row += "</tr>";

    row += "<tr>";
    row += "<td></td>";
    row += "<td></td>";
    row += "<td>DISCOUNT</td>";
    row += "<td><input id='rDiscount' value='" + accounting.formatMoney($("#discountAmt").val(), "&#8358;") + "' class='form-control' disabled='disabled' style='border-bottom:1px double red'/></td>";
    row += "</tr>";

    row += "<tr>";
    row += "<td></td>";
    row += "<td></td>";
    row += "<td>AMOUNT TO PAY</td>";
    row += "<td><input id='finalT' value='" + accounting.formatMoney(getFinalTotal(), "&#8358;") + "' class='form-control' disabled='disabled' style='border-bottom:1px double red;border-top:1px double red'/></td>";
    row += "</tr>";

    row += "</table>";


    $("#summaryDetails").append(row);
    mailMessage = row;
    var finalT = $("#finalT").val();
    alert(finalT);
    textMessage = "DEAR " + cName + ", THANK YOU FOR PATRONISING US. YOUR ORDER SUMMARY ARE AS FOLLOWS:- CUSTOMER ID: " + cUId + ", TAG NO: " + referenceCode + ", ORDER DATE: " + strDate + ", PICK UP DATE: " + $("#pickupDate").val() + " TOTAL COST: " + finalT;
});
var tot = 0;
function sumTotal() {
    $.each(persons, function (i, stu) {
        tot += parseFloat(stu.Amount);      
    });
    return tot;
}
var gt = 0;
function getGrandTotal() {

    gt = tot + parseFloat(xCharges);
    return gt;
}
var ft = 0;
function getFinalTotal() {
    ft = gt - parseFloat($("#discountAmt").val());
    return ft;
}
function isNumberKey(evt, id) {
    try {

        var charCode = (evt.which) ? evt.which : event.keyCode;

        if (charCode === 46) {
            var txt = document.getElementById(id).value;
            if (!(txt.indexOf(".") > -1)) {

                return true;
            }

        }
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
    } catch (w) {
        alert(w);
    }
}


function call4DropDownList() {
    $.ajax({
        url: '/customer/GetAllDropDownList',
        type: 'GET',
        contentType: 'application/json;',
        dataType: 'json',
        success: function (result) {
            if (result !== null) {

                $.each(result, function (i, itm) {
 
                    if (i === "Center") {
                        bizCenters = itm;
                    }
                    if (i === "Item") {
                        items = itm;
                    }
                    if (i === "ProgressStatus") {
                        progessStatuses = itm;
                    }
                    if (i === "ServiceCategory") {
                        serviceCategories = itm;
                    }
                    if (i === "ServiceType") {
                        serviceTypes = itm;
                    }
                    if (i === "Customer") {
                        customers = itm;
                    }
                    if (i === "Service") {
                        services = itm;
                    }
                    if (i === "Location") {
                        locations = itm;
                    }
                    if (i === "ItemCat") {
                        iCategories = itm;
                    }
                });
            }
           
            var row = ""; row1 = ""; row2 = ""; row3 = ""; row4 = ""; row5 = ""; row6 = ""; row7 = ""; row8 = "";
            $.each(customers, function (i, stu) {
               
            row += "<option value='" + stu.CustId + "'>" + stu.Fullname + "</option>";

        });
        $('#customer').append(row);


            $.each(services, function (i, stu) {
                var crit = {
                    "ItemId": stu.ItemId
                }
                var itemRowData = filterResult(items, crit);
                let getValueFromOject = Object.fromEntries(
                    Object.entries(itemRowData).map(([key, value]) => [key, value])
                );

                var name = getValueFromOject[0].ItemName;

            row1 += "<option value='" + stu.ServiceId + "'>" + stu.ServiceName +" ("+name+")"+ "</option>";

        });
        $('#service').append(row1);

        $.each(serviceTypes, function (i, stu) {

            row2 += "<option value='" + stu.Id + "'>" + stu.Name + "</option>";

        });
        $('#serviceType').append(row2);

        $.each(serviceCategories, function (i, stu) {

            row3 += "<option value='" + stu.ServiceCategoryId + "'>" + stu.ServiceCategoryName + "</option>";

        });
            $('#serviceCategory').append(row3);

        $.each(items, function (i, stu) {
            var crit = {
                "ItemId": stu.ItemId
            }
            var itemRowData = filterResult(items, crit);
            let getValueFromOject = Object.fromEntries(
                Object.entries(itemRowData).map(([key, value]) => [key, value])
            );

            itemTypeId = getValueFromOject[0].Id;

            var crit1 = {
                "Id": itemTypeId
            }

            var itemTypeRow = filterResult(serviceTypes, crit1);
            let getValueFromOject1 = Object.fromEntries(
                Object.entries(itemTypeRow).map(([key, value]) => [key, value])
            );

            var type = getValueFromOject1[0].Name;

            row4 += "<option value='" + stu.ItemId + "'>" + type + "</option>";

        });
        $('#item').append(row4);

        $.each(bizCenters, function (i, stu) {

            row5 += "<option value='" + stu.Id + "'>" + stu.CenterName + "</option>";

        });
        $('#center').append(row5);
        $.each(locations, function (i, stu) {

            row7 += "<option value='" + stu.Location + "'>" + stu.Location + "</option>";

        });
        $('#location').append(row7);

        $.each(progessStatuses, function (i, stu) {

            row6 += "<option value='" + stu.Status + "'>" + stu.Status + "</option>";

        });
        $('#progessStatus').append(row6);

        $.each(iCategories, function (i, stu) {

            row8 += "<option value='" + stu.ItemCategoryId + "'>" + stu.ItemCategoryName + "</option>";

        });
        $('#itemCat').append(row8);
        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
}
function filterResult(data, criteria) {

    return data.filter(candidate =>
        Object.keys(criteria).every(key =>
            candidate[key] === criteria[key]
        )
    );
}
var selectedItemId,selectedCatId, price,total;

function randomString() {
    var chars = "0123456789";
    var string_length = 6;
    var randomstring = "";
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
}
var selectedCustomer,referenceCode,selectedCenter,selectedLocation;

var cnt = 0;
$("body").on("click", ".btnAddPerson", function () {
   
    cnt++;
    $("#rowReg").html(cnt + " record(s) added");
    var tBody = $("#registrationTable > TBODY")[0];


    var row = tBody.insertRow(-1);
    var btnRemov = $("<input />");
    btnRemov.attr("type", "button");
    btnRemov.attr("onclick", "RemoveReg(this);");
    btnRemov.val("-");
    btnRemov.addClass("form-control btn btn-danger");
    cell = $(row.insertCell(-1));
    cell.append(btnRemov);

    cell = $(row.insertCell(-1));
    cell.html(selectedCustomer);

    cell = $(row.insertCell(-1));

    cell.html(selectedProgress);

    cell = $(row.insertCell(-1));
    var pd = $("#pickupDate").val();
    cell.html(pd);



    cell = $(row.insertCell(-1));
    var tag = $("#ref").val();
    cell.html(tag);

    cell = $(row.insertCell(-1));
    cell.html(selectedServiceText + ":" + selectedService);

    cell = $(row.insertCell(-1));
    cell.html(serviceTypeText + ":" + serviceTypeId);



    cell = $(row.insertCell(-1));
    cell.html(price);

    cell = $(row.insertCell(-1));
    cell.html(selectedQty);

    cell = $(row.insertCell(-1));
    cell.html(total);


    cell = $(row.insertCell(-1));

    cell.html(selectedColor);
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
});

var records,persons;
function submitOfflineOrderData() {
    //Loop through the Table rows and build a JSON array.
    persons = new Array();
    var count = $("#registrationTable TBODY TR").length+1;

    $("#registrationTable TBODY TR").each(function () {
        count--;
        var row = $(this);
        var person = {};
        person.CustId = row.find("TD").eq(1).html();
        person.OrderStatus = row.find("TD").eq(2).html();
        person.PickupDate = row.find("TD").eq(3).html();
        person.ReferenceNo = row.find("TD").eq(4).html();
        var sv = row.find("TD").eq(5).html();
        var splitSV = sv.split(':');
        person.ServiceId = splitSV[1];

        var it = row.find("TD").eq(6).html();
        var splitIT = it.split(':');
        person.Id = splitIT[1];
        person.Price = row.find("TD").eq(7).html();
        person.Quantity = row.find("TD").eq(8).html();
        person.Amount = row.find("TD").eq(9).html();
        person.ItemColor = row.find("TD").eq(10).html();
        person.BizCenterId = $('#center').val();

        var crit = {
            "ServiceId": parseInt(splitSV[1])
        }
        var serviceRowData = filterResult(services, crit);
        let getValueFromOject = Object.fromEntries(
            Object.entries(serviceRowData).map(([key, value]) => [key, value])
        );

        var itemId = getValueFromOject[0].ItemId;
        person.ItemId = itemId;
        person.ServiceCategoryId = $("#serviceCategory option:selected").val();
        if (count > 1) {
            person.LocationExtraCharges = null;
            person.DiscountAmount = null;
            person.TotalAmount = null;
        } else {
            person.LocationExtraCharges = $('#location').val();
            person.DiscountAmount = $('#location').val();
            person.TotalAmount = $('#location').val();
        }
        persons.push(person);

    });
    var jsonData = JSON.stringify(persons);
    //$.ajax({
    //    url: '/Customer/OfflineOrder',
    //    data: jsonData,
    //    type: 'POST',
    //    contentType: 'application/json;',
    //    dataType: 'json',
    //    success: function (result) {
           
    //        $("#list").css("display", "block");
    //        $("#create").css("display", "none");

    //        if ($.fn.DataTable.isDataTable("#rListTable")) {
    //            oTable.draw();

    //        } else {
    //            oTable = $('#rListTable').DataTable({

    //                initComplete: function () {
    //                    var r = $('#rListTable tfoot tr');
    //                    r.find('th').each(function () {
    //                        $(this).css('padding', 8);
    //                    });
    //                    $('#rListTable thead').append(r);
    //                    $('#search_0').css('text-align', 'center');
    //                    // Setup - add a text input to each footer cell
    //                    $('#rListTable tfoot th').each(function () {
    //                        var title = $(this).text();
    //                        $(this).html('<input id="search_0" type="text" placeholder="Search ' + title + '" />');
    //                    });

    //                    // DataTable
    //                    var table = $('#rListTable').DataTable();

    //                    // Apply the search
    //                    table.columns().every(function () {
    //                        var that = this;

    //                        $('input', this.footer()).on('keyup change', function () {
    //                            if (that.search() !== this.value) {
    //                                that
    //                                    .search(this.value)
    //                                    .draw();
    //                            }
    //                        });
    //                    });
    //                },
    //                //"paging": true,
    //                //"scrollX": true,
    //                data: result,
    //                responsive: true,
    //                //keys: true,
    //                deferRender: true,
    //                //scrollY: 380,
    //                //scrollX: 200,               
    //                scrollCollapse: true,
    //                //scroller: true,
    //                //entries: true,
    //                "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
    //                //"lengthMenu": [[2, 5, 10, -1], [2, 5, 10, "All"]],
    //                //dom: "Bfrtip",
    //                dom: "lfrtiBp",
    //                buttons: [
    //                    {
    //                        extend: "copy",
    //                        className: "btn-sm"
    //                    },
    //                    {
    //                        extend: "csv",
    //                        className: "btn-sm"
    //                    },
    //                    {
    //                        extend: "excel",
    //                        className: "btn-sm"
    //                    },
    //                    {
    //                        extend: "print",
    //                        className: "btn-sm"
    //                    },
    //                    {
    //                        extend: "pdf",
    //                        className: "btn-sm"
    //                    },

    //                ],

    //                columns: [
    //                    {
    //                        'data': 'CustId',
    //                        'visible': false,
    //                        'render': function (id) {
    //                            Id = id;
    //                            return Id;
    //                        }
    //                    },
    //                    { 'data': 'UniqueId' },
    //                    { 'data': 'Fullname' },
    //                    { 'data': 'Company' },
    //                    { 'data': 'Email' },
    //                    { 'data': 'PhoneNumber' },
    //                    { 'data': 'WhatsappNumber' },
    //                    { 'data': 'RegisteredAs' },
    //                    { 'data': 'Gender' },
    //                    { 'data': 'DateOfBirth' },
    //                    { 'data': 'Password' },
    //                    {
    //                        "data": "CustId", "render": function (data) {
    //                            return "<div style='width:200px'><span style='float:left'><button type='button' id='btnEdit' class='btn btn-success glyphicon glyphicon-pencil editbtn' onclick='return editById(" + Id + ")'></span><span style='float:left'></button> <button type='button' id='btnDelete' class='btn btn-danger glyphicon glyphicon-trash' onclick='return deleteById(" + Id + ")'></button></span><span style='float:left'><button type='button' id='btnEdit' class='btn btn-primary glyphicon glyphicon-eye-open editbtn' onclick='return viewDetailsById(" + Id + ")'></button></span></div>";
    //                        },
    //                    }
    //                ],
    //            });

    //        }

    //    },
    //    error: function (err) {
    //        alert("Error: " + err.responseText);
    //    }
    //});

}