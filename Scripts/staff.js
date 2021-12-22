
var oTable = '';
var id = '';

$(document).ready(function () {
    getStaffList();
});


function getStaffList() {
    debugger
    $.ajax({
        url: '/Staffs/ShowStaff/',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            debugger
            if ($.fn.DataTable.isDataTable("#staffListTable")) {
                oTable.draw();

            } else {
                oTable = $('#staffListTable').DataTable({

                    initComplete: function () {
                        var r = $('#staffListTable tfoot tr');
                        r.find('th').each(function () {
                            $(this).css('padding', 8);
                        });
                        $('#staffListTable thead').append(r);
                        $('#search_0').css('text-align', 'center');
                        // Setup - add a text input to each footer cell
                        $('#staffListTable tfoot th').each(function () {
                            var title = $(this).text();
                            $(this).html('<input type="text" placeholder="Search ' + title + '" />');
                        });

                        // DataTable
                        var table = $('#staffListTable').DataTable();

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
                            'data': 'StaffId',
                            'render': function (data) {
                                id = data;
                                return "<button type='button' id='btnStaffToUser' class='btn btn-success /*glyphicon glyphicon-user*/ btn-sm' onclick='return getStaffById(" + data + ")'>Edit</button>";
                            }
                        },
                        { 'data': 'Name' },
                        { 'data': 'JubailiBranchId'},
                        //{
                        //    'data': 'JubailiBranchId',
                        //    'render': function GetBranchName(jubailiBranchId) {
                        //        //debugger
                        //        var branch = '';
                        //        $.ajax({
                        //            //url: '/Staffs/GetBranchName?JubailiBranchId=' + parseInt(jubailiBranchId),
                        //            url: '/Staffs/GetBranchName/'+ jubailiBranchId,
                        //            type: 'POST',
                        //            async: false,
                        //            success: function (data) {
                        //                debugger
                        //                branch = data;
                        //            },
                        //            error: function (err) {
                        //                alert("Error: " + err.responseText);
                        //            }

                        //        });
                        //        return branch;
                        //    },
                        //},
                        { 'data': 'DepartmentId'},
                        //{
                        //    'data': 'DepartmentId',
                        //    'render': function GetDepartmentName(departmentId) {
                        //        //debugger
                        //        var department = '';
                        //        $.ajax({
                        //            url: '/Departments/GetDepartmentName?DepartmentId=' + departmentId,
                        //            type: 'POST',
                        //            async: false,
                        //            success: function (data) {

                        //                department = data;
                        //            },
                        //            error: function (err) {
                        //                alert("Error: " + err.responseText);
                        //            }

                        //        });
                        //        return department;
                        //    },
                        //},
                        //{ 'data': 'RoleId' },
                        {
                            'data': 'RoleId',
                            'render': function GetRoleName(roleId) {
                                //debugger
                                var role = '';
                                $.ajax({
                                    url: '/Staffs/GetRoleName?Id=' + roleId,
                                    type: 'POST',
                                    async: false,
                                    success: function (data) {

                                        role = data;
                                    },
                                    error: function (err) {
                                        alert("Error: " + err.responseText);
                                    }

                                });
                                if (role === null) {
                                    return "No Role Assigned";
                                } else {
                                    return role;
                                }
                                
                            },
                        },
                        { 'data': 'HighestQualification' },
                        {
                            'data': 'HiredDate',
                            'render': function(jsonDate) {

                                if (jsonDate !== null) {
                                    var date = new Date(parseInt(jsonDate.substr(6)));
                                    var month = date.getMonth() + 1;
                                    return date.getDate() + "/" + month + "/" + date.getFullYear();
                                }
                            }
                        },
                        { 'data': 'PhoneNo' },
                        { 'data': 'Email' },
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
var staffName = '';
var email = '';
var roleId = '';
function getStaffDetailById(id) {
    debugger
    $.ajax({
        url: '/Staffs/GetStaffDetail/' + id,
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            window.location.href = "/Roles/RegisterRole";

            staffName = result.Name;
            email = result.Email;
            roleId = result.StaffRoleId;
        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
}
function getStaffById(id) {
    debugger
    $.ajax({
        url: '/Staffs/Edit/' + id,
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            //window.location.href = "/Staffs/Edit";
        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
}

$("#btnStaffToUser").click(function () {
    getStaffDetailById(id);


    $.ajax({
        url: "/Roles/Index",
        type: "POST",
        dataType: 'json',
        success: function (data) {


        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
});


// Close modal
$("#btnClose").click(function () {
    clear();
});




