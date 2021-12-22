
var oTable = '';
var qTable = '';
var ls;
var res = '';
$(document).ready(function () {


    document.getElementById('customerOnMap').style.display = 'none';
    document.getElementById('divCreateCustomer').style.display = 'none';
    document.getElementById('customerListDiv').style.display = 'block';
    getCustomerList();
    getCustList();

    //ls = [
    //    ['Bondi Beach', -33.890542, 151.274856, 4],
    //    ['Coogee Beach', -33.923036, 151.259052, 5],
    //    ['Cronulla Beach', -34.028249, 151.157507, 3],
    //    ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
    //    ['Maroubra Beach', -33.950198, 151.259302, 1]
    //];

    var map = new google.maps.Map(document.getElementById('custMap'), {
        zoom: 10,
        center: new google.maps.LatLng(-33.92, 151.25),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < ls.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(ls[i][1], ls[i][2]),
            map: map
        });

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent(ls[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
});
$("#btnCreate").click(function () {
    document.getElementById('customerOnMap').style.display = 'none';
    document.getElementById('divCreateCustomer').style.display = 'block';
    document.getElementById('customerListDiv').style.display = 'none';
});
$("#btnMap").click(function () {
    $.ajax({
        type: "GET",
        url: "/Customers/MarkerInfo",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            //$.each(data, function (i, item) {
            //    debugger
            //    res = item;
            //    res = res.replace(/"/g, "");
            //    ls = [res];
            //});
            ls = [data];
        }
    });
    document.getElementById('customerOnMap').style.display = 'block';
    document.getElementById('divCreateCustomer').style.display = 'none';
    document.getElementById('customerListDiv').style.display = 'none';
});
$("#btnList").click(function () {
    document.getElementById('customerOnMap').style.display = 'none';
    document.getElementById('divCreateCustomer').style.display = 'none';
    document.getElementById('customerListDiv').style.display = 'block';
});
var custName = '';
var lat = '';
var long = '';

function DisplayOnMap() {
    debugger

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (p) {
            //var LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
            //var LatLng = new google.maps.LatLng("6.43891199", "3.4357248");
            var LatLng = new google.maps.LatLng(lat, long);
            var mapOptions = {
                center: LatLng,
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById("custMap"), mapOptions);
            var marker = new google.maps.Marker({
                position: LatLng,
                map: map,
                title: custName,
            });
            google.maps.event.addListener(marker, "click", function (e) {
                var infoWindow = new google.maps.InfoWindow();
                infoWindow.setContent(marker.title);
                infoWindow.open(map, marker);
            });
        });
    } else {
        alert('Geo Location feature is not supported in this browser.');
    }
}
function getCustomerList() {
    $.ajax({
        url: '/Customers/ShowCustomers/',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            debugger
            if ($.fn.DataTable.isDataTable("#customerListTable")) {
                oTable.draw();

            } else {
                oTable = $('#customerListTable').DataTable({

                    initComplete: function () {
                        var r = $('#customerListTable tfoot tr');
                        r.find('th').each(function () {
                            $(this).css('padding', 8);
                        });
                        $('#customerListTable thead').append(r);
                        $('#search_0').css('text-align', 'center');
                        // Setup - add a text input to each footer cell
                        $('#customerListTable tfoot th').each(function () {
                            var title = $(this).text();
                            $(this).html('<input type="text" placeholder="Search ' + title + '" />');
                        });

                        // DataTable
                        var table = $('#customerListTable').DataTable();

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
                        { 'data': 'CustomerId' },
                        { 'data': 'Name' },
                        { 'data': 'CustomerPhoneNo' },
                        { 'data': 'Email' },
                        { 'data': 'Longitude' },
                        { 'data': 'Latitude' },
                        { 'data': 'GeoBizLocation' },                       
                        { 'data': 'CustomerApplicationCode' },
                        { 'data': 'Address' },
                    ],
                });
            }


        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
}

function getCustList() {
    $.ajax({
        url: '/Customers/ShowCustomers/',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            debugger
            if ($.fn.DataTable.isDataTable("#custListTb")) {
                qTable.draw();

            } else {
                qTable = $('#custListTb').DataTable({

                    initComplete: function () {
                        var r = $('#custListTb tfoot tr');
                        r.find('th').each(function () {
                            $(this).css('padding', 8);
                        });
                        $('#custListTb thead').append(r);
                        $('#search_0').css('text-align', 'center');
                        // Setup - add a text input to each footer cell
                        $('#custListTb tfoot th').each(function () {
                            var title = $(this).text();
                            $(this).html('<input type="text" placeholder="Search ' + title + '" />');
                        });

                        // DataTable
                        var table = $('#custListTb').DataTable();

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
                    "paging": false,
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
                    searching: true,
                    dom: 't'  ,
                    info: false,

                    columns: [

                        {
                            'data': 'Name',
                            'render': function (customerName) {
                                custName = customerName;
                                return '<a href="#" onclick="DisplayOnMap();">' + customerName + '</a>';
                                }
                                                      
                            
                        },
                        {
                            'data': 'Longitude',
                            visible: false,
                            'render': function (longitude) {
                                long = longitude;
                                return longitude;
                            }
                        },
                        {
                            'data': 'Latitude',
                            visible: false,
                            'render': function (latitude) {
                                lat = latitude;
                                return latitude;
                            }
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


    //var customerId = $("#CustomerId");
    var name = $("#Name");
    var customerPhoneNo = $("#CustomerPhoneNo");
    var email = $("#Email");
    var longitude = $("#Longitude");
    var latitude = $("#Latitude");
    var geoBizLocation = $("#GeoBizLocation");
    var customerApplicationCode = $("#CustomerApplicationCode");
    var address = $("#Address");
    //Get the reference of the Table's TFOOT element.
    var tBody = $("#customerTable > TBODY")[0];

    //Add Row.
    var row = tBody.insertRow(-1);

    //Add customer name cell;
    cell = $(row.insertCell(-1));
    cell.html(name.val());

    //Add customerPhoneNo cell;
    cell = $(row.insertCell(-1));
    cell.html(customerPhoneNo.val());

    //Add email cell;
    cell = $(row.insertCell(-1));
    cell.html(email.val());

    //Add longitude cell;
    cell = $(row.insertCell(-1));
    cell.html(longitude.val());

    //Add latitude cell;
    cell = $(row.insertCell(-1));
    cell.html(latitude.val());

    //Add geoBizLocation cell.
    cell = $(row.insertCell(-1));
    cell.html(geoBizLocation.val());


    //Add customerApplicationCode cell.
    cell = $(row.insertCell(-1));
    cell.html(customerApplicationCode.val());


    //Add address cell.
    cell = $(row.insertCell(-1));
    cell.html(address.val());

    var cell = $(row.insertCell(-1));


    //Add Button cell.
    var btnRemove = $("<input />");
    btnRemove.attr("type", "button");
    btnRemove.attr("onclick", "Remove(this);");
    btnRemove.val("Remove");
    cell = $(row.insertCell(-1));
    cell.append(btnRemove);


});
var n = '';
function Remove(button) {
    //Determine the reference of the Row using the Button.
    //debugger
    var row = $(button).closest("TR");
    n = $("TD", row).eq(0).html();
    if (confirm("Do you realy want to delete  " + n + " record from list? ")) {
        //Get the reference of the Table.
        var table = $("#customerTable")[0];
        //Delete the Table row using it's Index.
        table.deleteRow(row[0].rowIndex);
    }
};

$("#btnSave").click(function () {
    registerAllCustomers();
});

function registerAllCustomers() {
    debugger
    //Loop through the Table rows and build a JSON array.
    var customers = new Array();
    $("#customerTable TBODY TR").each(function () {
        var row = $(this);
        var customer = {};
        customer.Name = row.find("TD").eq(0).html();
        customer.CustomerPhoneNo = row.find("TD").eq(1).html();
        customer.Email = row.find("TD").eq(2).html();
        customer.Longitude = row.find("TD").eq(3).html();
        customer.Latitude = row.find("TD").eq(4).html();
        customer.GeoBizLocation = row.find("TD").eq(5).html();
        customer.CustomerApplicationCode = row.find("TD").eq(6).html();
        customer.Address = row.find("TD").eq(7).html();
        customers.push(customer);


    });

    //Send the JSON array to Controller using AJAX.
    $.ajax({
        type: "POST",
        url: "/Customers/Create",
        data: JSON.stringify(customers.splice(1)),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            window.location.href = "/Customers/Create";
            alert(r);
            $("#customerListTable").dataTable().fnDestroy();
            getCustomerList();

        }
    });
};
// Set title for create new



// Close modal
$("#btnClose").click(function () {
    clear();
});
var d = '';
var student = '';
function getCustomerById(id) {
    debugger
    $.ajax({
        url: '/Customers/GetCustomerById/' + id,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            d = data.Name;
            var dd = "Do you realy want to delete customer name " + d + " from database?";
            $("#del").html(dd);

        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
}


function deleteCustomerById(id) {
    getCustomerId(id);
    $("#confirmModal #title").text("Remove Customer");
    $("#confirmModal").modal('show');
    //debugger

    $("#confirmModal #btnOk").click(function (e) {
        $.ajax({
            url: "/Customers/DeleteCustomerById/" + id,
            type: "POST",
            dataType: 'json',
            success: function (data) {

                $("#confirmModal").modal('hide');

                $("#customerListTable").dataTable().fnDestroy();
                getCustomerList();
            },
            error: function (err) {
                alert("Error: " + err.responseText);
            }
        });

        e.preventDefault();
    });
}

