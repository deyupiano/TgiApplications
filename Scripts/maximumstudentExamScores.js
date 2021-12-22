
$(document).ready(function () {
    getAllDefaultMaxSores();
    $("#btnUpdate").hide();
    $("#btnSave").show();
});
function getAllDefaultMaxSores() {

    $.ajax({
        url: '/Backend/GetAllDefaultMaxSores/',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            var tb = $('#MaximumScore');

            tb.DataTable({
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
                    { 'data': 'CA1Max' },
                    { 'data': 'CA2Max' },
                    { 'data': 'CA3Max' },
                    { 'data': 'CA4Max' },
                    { 'data': 'ExamMax' },
                    { 'data': 'School' },
                    {
                        "data": "Id", "render": function (data) {
                            return "<button type='button' id='btnEdit' class='btn btn-default glyphicon glyphicon-pencil' onclick='return getMaxScoreById(" + data + ")'></button> <button type='button' id='btnDelete' class='btn btn-danger glyphicon glyphicon-trash' onclick='return deleteMaxScoreById(" + data + ")'></button>";
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

function deleteMaxScoreById(id) {
    $("#confirmModal #title").text("Remove Default Settings By Id");
    $("#confirmModal").modal('show');
    $("#confirmModal #btnOk").click(function (e) {
        $.ajax({
            url: "/Backend/DeleteMaxScoreById/" + id,
            type: "POST",
            dataType: 'json',
            success: function (data) {
                $("#confirmModal").modal('hide');
                $("#MaximumScore").dataTable().fnDestroy();
                getAllDefaultMaxSores();
            },
            error: function (err) {
                alert("Error: " + err.responseText);
            }
        });

        e.preventDefault();
    });
}

function getMaxScoreById(id) {
    $("#mSoreModal").modal('show');
    //debugger
    $.ajax({
        url: '/Backend/GetMaxScoreById/' + id,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            debugger
            $.each(data, function (key, value) {
                $("#Id").val(data.CA1Max);
                $("#CA1Max").val(data.CA2Max);
                $("#CA2Max").val(data.CA2Max);
                $("#CA3Max").val(data.CA3Max);
                $("#CA4Max").val(data.CA4Max);
                $("#ExamMax").val(data.ExamMax);
                $("#School").val(data.School);
            });
        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
}

function saveDefaultScore() {
    debugger
    data = {
        CA1Max: $("#CA1Max").val(),
        CA2Max: $("#CA2Max").val(),
        CA3Max: $("#CA3Max").val(),
        CA4Max: $("#CA4Max").val(),
        ExamMax: $("#ExamMax").val(),
        School: $("#School").val(),

    }
    $.ajax({
        type: 'POST',
        url: "/Backend/SaveMaxScore",
        dataType: 'json',
        data: data,
        success: function (r) {

            alert(r);
            $("#MaximumScore").dataTable().fnDestroy();
            getAllDefaultMaxSores();
            clear();
        }
    });
};

function updatetDefaultScore() {
    debugger
    data = {
        Id: Id,
        CA1Max: $("#CA1Max").val(),
        CA2Max: $("#CA2Max").val(),
        CA3Max: $("#CA3Max").val(),
        CA4Max: $("#CA4Max").val(),
        ExamMax: $("#ExamMax").val(),
        School: $("#School").val(),
    }
    $.ajax({
        type: 'POST',
        url: "/Backend/UpdateMaxScore",
        dataType: 'json',
        data: data,
        success: function (r) {

            alert(r);
            $("#MaximumScore").dataTable().fnDestroy();
            getAllDefaultMaxSores();
            clear();
        }
    });
};
// Set title for create new
$("#btnCreate").click(function () {
    $("#title").text("Set New Maximum Score");

})

// Close modal
$("#btnClose").click(function () {
    clear();
});


$("#btnSave").click(function () {

    saveDefaultScore();
});
$("#btnEdit").click(function () {
    $("#btnUpdate").show();
    $("#btnSave").hide();
    $("#title").text("Update Maximum Score");
    updatetDefaultScore();
});

function clear() {
    $("#Id").val("");
    $("#CA1Max").val("");
    $("#CA2Max").val("");
    $("#CA3Max").val("");
    $("#CA4Max").val("");
    $("#School").val("");
}
