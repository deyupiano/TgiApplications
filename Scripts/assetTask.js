var id = '';
var oTable = '';
$(document).ready(function () {
    getAssignTaskList();

});

function getAssignTaskList() {
    $.ajax({
        url: '/AssignTasks/ShowAssignTask/',
        type: 'get',
        dataType: 'json',
        success: function (data) {
           // debugger
            if ($.fn.DataTable.isDataTable("#atListTable")) {
                oTable.draw();

            } else {
                oTable = $('#atListTable').DataTable({

                    initComplete: function () {
                        var r = $('#atListTable tfoot tr');
                        r.find('th').each(function () {
                            $(this).css('padding', 8);
                        });
                        $('#atListTable thead').append(r);
                        $('#search_0').css('text-align', 'center');
                        // Setup - add a text input to each footer cell
                        $('#atListTable tfoot th').each(function () {
                            var title = $(this).text();
                            $(this).html('<input type="text" placeholder="Search ' + title + '" />');
                        });

                        // DataTable
                        var table = $('#atListTable').DataTable();

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
                        {
                            'data': 'AssignDate',
                            "type": "date ",
                            "render": function (value) {
                                if (value === null) return "";

                                var pattern = /Date\(([^)]+)\)/;
                                var results = pattern.exec(value);
                                var dt = new Date(parseFloat(results[1]));

                                return (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear() + "<b style='color:red'> Time: " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds() + "</b>";
                            }
                        },
                        { 'data': 'AssignedStatus' },
                        {
                            'data': 'AssignStatusDate',
                            "type": "date ",
                            "render": function (value) {
                                if (value === null) return "";

                                var pattern = /Date\(([^)]+)\)/;
                                var results = pattern.exec(value);
                                var dt = new Date(parseFloat(results[1]));

                                return (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear() + "<b style='color:red'> Time: " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds() + "</b>";
                            }
                        },
                        {
                            'data': 'StaffId',
                            'render': function GetStaffName(staffId) {
                                debugger
                                var staffName = '';
                                $.ajax({
                                    //url: '/Staffs/GetStaffName?StaffId=' + parseInt(staffId),
                                    url: '/Staffs/GetStaffName/'+ parseInt(staffId),
                                    type: 'POST',
                                    async: false,
                                    success: function (data) {
                                        //debugger
                                        staffName = data;
                                    },
                                    error: function (err) {
                                        alert("Error: " + err.responseText);
                                    }

                                });
                                return staffName;
                            },
                        },
                        {
                            'data': 'AssetId',
                            'render': function GetCustomerName(assetId) {
                                //debugger
                                var customerName = '';
                                $.ajax({
                                    url: '/Asset/CustomerName?AssetId=' + assetId,
                                    type: 'POST',
                                    async: false,
                                    success: function (data) {
                                        //debugger
                                        customerName = data;
                                    },
                                    error: function (err) {
                                        alert("Error: " + err.responseText);
                                    }

                                });
                                return customerName;
                            },
                        },
                        {
                            'data': 'AssetId',
                            'render': function GetAssetLocation(assetId) {
                                debugger
                                var latitude = '';
                                var longitude = '';
                                var googleMap = 'http://www.google.com/maps/place/';
                                $.ajax({
                                    url: '/Asset/GetLocation?AssetId=' + assetId,
                                    type: 'POST',
                                    async: false,
                                    success: function (data) {
                                        debugger
                                        latitude = data.Latitude;
                                        longitude = data.Longitude;
                                    },
                                    error: function (err) {
                                        alert("Error: " + err.responseText);
                                    }

                                });
                                var href = '<a href=' + googleMap + latitude + ',' + longitude + '  target="_blank">Location' + '</a>';                            
                                return href;
                            },
                        },
                        {
                            'data': 'AssetId',
                            'render': function AssetSummary(assetId) {
                                // debugger
                                var asset = '';
                                $.ajax({
                                    url: '/Asset/AssetSummary?AssetId=' + assetId,
                                    type: 'POST',
                                    async: false,
                                    success: function (data) {
                                        // debugger
                                        asset = data;
                                    },
                                    error: function (err) {
                                        alert("Error: " + err.responseText);
                                    }

                                });
                                return asset;
                            },
                        },
                        { 'data': 'TaskDetail' },
                    ],
                });
            }


        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
}


