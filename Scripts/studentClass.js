var sessionId = '';
$(document).ready(function () {
    getCollegeStudentClassList();
    
    //$("#UniqueId").autocomplete({
    //    source: function (request, response) {
    //        //var searchTerm = $("#UniqueId").val();
    //        debugger
    //        $.ajax({
    //            type: 'GET',
    //            url: '/School/GetAllRegisteredStudent',
    //            data: { text: request.term },// or you can use data: { text: searchTerm }
    //            success: function (data) {
                    
    //                response($.map(data, function (item) {
    //                    return{label:item, value: item}
    //                }))
    //            }
    //        })
    //    }
    //})



    function getStudents() {
        if (classId !== 0 && sessionId !== 0 && arm !== 0) {
            debugger
            $.ajax({

                //url: '@Url.Action("GetAllCollegeStudentIdsInaClass", "School")',
                url: '/School/GetAllRegisteredStudent',
                type: 'POST',

                async: false,
                //dataType: JSON,
                //data: { 'ClassId': classId, 'SchSession': sessionId, 'ClassArm': arm },

                success: function (data) {

                    var items = '<option>SELECT STUDENT</option>';

                    $.each(data, function (i, stu) {

                        items += "<option value='" + stu.Value + "'>" + stu.Text + "</option>";

                    });

                    $('#UniqueId').html(items);

                }

            });

        }

        else {

            var items = '<option>SELECT STUDENT</option>';

            $('#UniqueId').html(items);

        }

    }
    //function getStudents(classId, sessionId, arm) {
    //    if (classId !== 0 && sessionId !== 0 && arm !== 0) {
    //        debugger
    //        $.ajax({

    //            //url: '@Url.Action("GetAllCollegeStudentIdsInaClass", "School")',
    //            url: '/School/GetAllCollegeStudentIdsInaClass?ClassId=' + classId + '&SchSession=' + sessionId + '&ClassArm=' + arm,
    //            type: 'POST',

    //            async: false,

    //            data: { 'ClassId': classId, 'SchSession': sessionId, 'ClassArm': arm },

    //            success: function (data) {

    //                var items = '<option>SELECT STUDENT</option>';

    //                $.each(data, function (i, stu) {

    //                    items += "<option value='" + stu.Value + "'>" + stu.Text + "</option>";

    //                });

    //                $('#UniqueId').html(items);

    //            }

    //        });

    //    }

    //    else {

    //        var items = '<option>SELECT STUDENT</option>';

    //        $('#UniqueId').html(items);

    //    }

    //}
    var arm = '';
    var classId = '';
    $("#SchSession").change(function () {
        if ($(this).val() !== '') {
            sessionId = $(this).val();
        }
    });
    $("#ClassId").change(function () {
        if ($(this).val() !== '') {
            classId = $(this).val();
        }
    });

    $("#ClassArm").change(function () {

        if ($(this).val() !== '' && sessionId !== 0 && classId !== 0) {
            debugger
            arm = $(this).val();
            //getStudents(classId, sessionId, arm);
            getStudents();
        }
    });
});

function getCollegeStudentClassList() {
    //debugger
    //var schoolSessionId = $('#SchSessionId').val();
    $.ajax({
        url: '/School/GetCollegeStudentClassList/',
        type: 'get',
        dataType: 'json',
        success: function (data) {

            $('#datatable-button').DataTable({
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
                     { 'data': 'School' },
                     {'data': 'SchSession'},
 
                    {'data': 'ClassId'},
                    {
                        'data': 'ClassArm',
                        'render': function (result) {
                            if (!result) {
                                return 'No Arm';
                            }
                            else {
                                return result;
                            }
                        }
                    },
                    { 'data': 'TotalSubjectRegistered' },

                    {
                        'data': 'UniqueId',
                        'render': function GetStudentName(uniqueId) {
                            debugger

                            $.ajax({
                                url: '/School/GetStudentName?UniqueId=' + uniqueId,
                                type: 'POST',
                                async: false,
                                success: function (data) {

                                    student = data;
                                },
                                error: function (err) {
                                    alert("Error: " + err.responseText);
                                }

                            });
                            return student;
                        },
                    },
                    {
                        "data": "Id", "render": function (data) {
                            return "<button type='button' id='btnEdit' class='btn btn-default glyphicon glyphicon-pencil' onclick='return getStudentById(" + data + ")'></button> <button type='button' id='btnDelete' class='btn btn-danger glyphicon glyphicon-trash' onclick='return deleteStudentById(" + data + ")'></button>";
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
$("body").on("click", "#btnAdd", function () {
    //Reference the Name and Country TextBoxes.
    var uniqueId = $("#UniqueId");
    var schSessionId = $("#SchSession");
    var classId = $("#ClassId");
    var classArm = $("#ClassArm");
    var totalSubjectRegistered = $("#TotalSubjectRegistered");
    //Get the reference of the Table's TBODY element.
    var tBody = $("#tb > TFOOT")[0];

    //Add Row.
    var row = tBody.insertRow(-1);

    //Add School sessionId cell.
    cell = $(row.insertCell(-1));
    cell.html(schSessionId.val());

    //Add ClassId cell.
    cell = $(row.insertCell(-1));
    cell.html(classId.val());

    //Add ClassArm cell.
    cell = $(row.insertCell(-1));
    cell.html(classArm.val());

    //Add Total Registered Subject cell.
    cell = $(row.insertCell(-1));
    cell.html(totalSubjectRegistered.val());

    //Add StudentId cell.
    var cell = $(row.insertCell(-1));
    cell.html(uniqueId.val());

    //Add Button cell.
    cell = $(row.insertCell(-1));
    var btnRemove = $("<input />");
    btnRemove.attr("type", "button");
    btnRemove.attr("onclick", "Remove(this);");
    btnRemove.val("Remove");
    cell.append(btnRemove);

    //Clear dropdown.
    schSessionId.index = -1;
    schSessionId.index = -1;
    classId.index = -1;

});
function Remove(button) {
    //Determine the reference of the Row using the Button.
    var row = $(button).closest("TR");
    var name = $("TD", row).eq(0).html();
    if (confirm("Do you want to delete: " + name)) {
        //Get the reference of the Table.
        var table = $("#tb")[0];

        //Delete the Table row using it's Index.
        table.deleteRow(row[0].rowIndex);
    }
};

$("#btnSave").click(function () {
    allocateClass();
});

function allocateClass() {
    //debugger
    //Loop through the Table rows and build a JSON array.
    var students = new Array();
    $("#tb TFOOT TR").each(function () {
        var row = $(this);
        var student = {};
        student.SchSession = row.find("TD").eq(0).html();
        student.Class = row.find("TD").eq(1).html();
        student.ClassArm = row.find("TD").eq(2).html();
        student.TotalSubjectRegistered = row.find("TD").eq(3).html();
        student.UniqueId = row.find("TD").eq(4).html();
        students.push(student);


    });

    //Send the JSON array to Controller using AJAX.
    $.ajax({
        type: "POST",
        url: "/School/AllocateCollegeStudentToClass",
        data: JSON.stringify(students.splice(1)),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            alert(r);
            $("#studentClassModal").modal('hide');
            $("#datatable-button").dataTable().fnDestroy();
            getCollegeStudentClassList();

        }
    });
};
// Set title for create new
$("#btnCreate").click(function () {
    $("#title").text("Add Student To Class");

})

// Close modal
$("#btnClose").click(function () {
    clear();
});



function deleteStudentById(id) {
    $("#confirmModal #title").text("Remove Student From Class");
    $("#confirmModal").modal('show');
    $("#confirmModal #btnOk").click(function (e) {
        $.ajax({
            url: "/School/DeleteStudentById/" + id,
            type: "POST",
            dataType: 'json',
            success: function (data) {
                $("#confirmModal").modal('hide');
                $("#datatable-button").dataTable().fnDestroy();
                getCollegeStudentClassList();
            },
            error: function (err) {
                alert("Error: " + err.responseText);
            }
        });

        e.preventDefault();
    });
}


var name = $(this).attr('id');
$(this).find('#subcat'+name).html('');
var that = this;
$.ajax({
    type: 'GET',
    url : '/subcategoryfetch',
    data: {"name": name},
    success: function(data) {
        console.log(data);
        // $('#subcat').append(data);
        $.each(data, function(key, value) {   
            $(that).find('#subcat'+name)
                .append($('<a tabindex="-1" href="#"></a>')
                .attr("value",key)
                .text(value)); 
        });
    },
});

var name = $(this).attr('uniqueId');
$(this).find('#UniqueId' + name).html('');
var that = this;
function getStudentById(id) {

    $("#title").text("Student Class Details");

    $.ajax({
        url: '/School/GetStudentById/' + id,
        type: 'GET',
        dataType: 'json',
        //data: { "name": name },
        success: function (data) {
            $("#studentClassModal").modal('show');
            $.each(data, function (key, value) {
                debugger
                var uId = data.UniqueId;
                function GetStudentName(uId) {

                    var student = '';
                    $.ajax({
                        url: '/School/GetStudentName?UniqueId=' + uId,
                        type: 'POST',
                        async: false,
                        success: function (result) {

                            student = (result.Surname + " " + result.FirstName + " " + result.LastName);
                            $(that).find('#UniqueId' + student)
                            .append($('<a tabindex="-1" href="#"></a>')
                            .attr("value", key)
                            .text(value));
                        },
                        error: function (err) {
                            alert("Error: " + err.responseText);
                        }

                    });
                    //return student;
                }

            });
        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
}

// Clear all items
function clear() {
    $("#InformationId").val("");
    $("#Content").val("");
    $("#IsValid").val("");
}