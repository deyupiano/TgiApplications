
var oTable = '';


$(document).ready(function () {
    getTicketList();
});


function getActivationCode() {
    debugger

    $.ajax({

        url: '/ClassRoomCodes/GenerateClassCode',
        type: 'GET',
        async: false,

        success: function (data) {
            //debugger
            code = data;
        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }

    });
};

function getTicketList() {
    $.ajax({
        url: '/ClassRoomCodes/ShowClassCode/',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            debugger
            if ($.fn.DataTable.isDataTable("#ticketListTable")) {
                oTable.draw();

            } else {
                oTable = $('#ticketListTable').DataTable({
                    initComplete: function () {
                        var r = $('#ticketListTable tfoot tr');
                        r.find('th').each(function () {
                            $(this).css('padding', 8);
                        });
                        $('#ticketListTable thead').append(r);
                        $('#search_0').css('text-align', 'center');
                        // Setup - add a text input to each footer cell
                        $('#ticketListTable tfoot th').each(function () {
                            var title = $(this).text();
                            $(this).html('<input type="text" placeholder="Search ' + title + '" />');
                        });

                        // DataTable
                        var table = $('#ticketListTable').DataTable();

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
                        { 'data': 'Id' },
                        { 'data': 'ClassCode' },
                        { 'data': 'TeacherId' },
                        { 'data': 'ActivationStatus' },
                        { 'data': 'AdminPermit' },
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

    getActivationCode();
    //Get the reference of the Table's TFOOT element.
    var tBody = $("#ticketTable > TBODY")[0];

    //Add Row.
    var row = tBody.insertRow(-1);


    //Add ActivationCode cell.
    cell = $(row.insertCell(-1));
    cell.html(code);


    var cell = $(row.insertCell(-1));


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
    name = $("TD", row).eq(1).html();
    if (confirm("Do you realy want to delete " + name + " generated ticket code ")) {
        //Get the reference of the Table.
        var table = $("#ticketTable")[0];
        //Delete the Table row using it's Index.
        table.deleteRow(row[0].rowIndex);
    }
};

$("#btnSave").click(function () {
    saveAllGeneratedTickets();
});

function saveAllGeneratedTickets() {
    debugger
    //Loop through the Table rows and build a JSON array.
    var tickets = new Array();
    $("#ticketTable TBODY TR").each(function () {
        var row = $(this);
        var ticket = {};
        ticket.ClassCode = row.find("TD").eq(0).html();
        tickets.push(ticket);


    });

    //Send the JSON array to Controller using AJAX.
    $.ajax({
        type: "POST",
        url: "/ClassRoomCodes/Create",
        data: JSON.stringify(tickets.splice(1)),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            window.location.href = "/ClassRoomCodes/Index";
            alert(r);
            $("#ticketListTable").dataTable().fnDestroy();
            getTicketList();

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
function getStudentAssesmentId(id) {
    debugger
    $.ajax({
        url: '/School/GetStudentAssessmentById/' + id,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            d = data.UniqueId;
            var dd = "Do you realy want to delete continous assessment for " + d;
            $("#del").html(dd);
            //function GetStudentName(d) {
            //    //debugger
            //    $.ajax({
            //        url: '/School/GetFullname?UniqueId=' + d,
            //        type: 'POST',
            //        async: false,
            //        success: function (name) {

            //            student = name.Fullname;

            //        },
            //        error: function (err) {
            //            alert("Error: " + err.responseText);
            //        }

            //    });
            //    return student;

            //}

        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
}


function deleteStudentAssessmentById(id) {
    getStudentAssesmentId(id);
    $("#confirmModal #title").text("Remove Student Assessment");
    $("#confirmModal").modal('show');
    //debugger

    $("#confirmModal #btnOk").click(function (e) {
        $.ajax({
            url: "/School/DeleteStudentAssessmentById/" + id,
            type: "POST",
            dataType: 'json',
            success: function (data) {

                $("#confirmModal").modal('hide');

                $("#caListTable").dataTable().fnDestroy();
                getCollegeStudentResultList();
            },
            error: function (err) {
                alert("Error: " + err.responseText);
            }
        });

        e.preventDefault();
    });
}
function myDeleteFunction() {
    //document.getElementById("caTable").deleteRow(0);
    //Get the reference of the Table.
    var table = $("#caTable")[0];
    //Delete the Table row using it's Index.
    table.deleteRow(row[0].rowIndex)
}
$("#btnClear").click(function () {
    myDeleteFunction();
})