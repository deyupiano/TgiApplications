var editor; // use a global for the submit and return data rendering in the examples
var ddl = '';
$(document).ready(function () {
    getCollegeStudentResultList();
    var classId = $('#ClassId').val();
    function getStudents(classId, sessionId) {
        if (classId !== 0 && sessionId !== 0) {
            debugger
            $.ajax({

                //url: '@Url.Action("GetAllCollegeStudentIdsInaClass", "School")',
                url: '/School/GetAllCollegeStudentIdsInaClass?ClassId=' + classId + '&SchSessionId=' + sessionId,
                type: 'POST',

                async: false,

                data: { 'ClassId': classId, 'SchSessionId': sessionId },

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
    function getSubjects(classId) {
        if (classId !== 0 && sessionId !== 0) {
            $.ajax({

                //url: '@Url.Action("GetAllCollegeStudentIdsInaClass", "School")',
                url: '/School/GetAllSubjectBySchoolClasses?ClassId=' + parseInt(classId),
                type: 'POST',

                async: false,

                data: { 'ClassId': classId },

                success: function (data) {

                    var items = '<option>SELECT SUBJECT</option>';

                    $.each(data, function (i, sub) {

                        items += "<option value='" + sub.Value + "'>" + sub.Text + "</option>";

                    });

                    $('#SubjectId').html(items);

                }

            });

        }

        else {

            var items = '<option>SELECT SUBJECT</option>';

            $('#SubjectId').html(items);

        }

    }
    $("#SchSessionId").change(function () {
        if ($(this).val() !== '') {
            sessionId = $(this).val();
        }
    });
    $("#ClassId").change(function () {
        if ($(this).val() !== '' && sessionId !== 0) {
            getStudents($(this).val(), sessionId);
            getSubjects($(this).val(), classId);
            $("#SubjectId").prop("disabled", false);
        }
    });

});
function getCollegeStudentResultList() {

    $.ajax({
        url: '/School/GetCollegeStudentResultList/',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            var tb = $('#datatable-button');

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

                    {
                        'data': 'SubjectId',
                        'render': function GetSubjectName(subjId) {
                            debugger
                            var sub = '';
                            $.ajax({
                                url: '/School/GetSubjectName?SubjectId=' + subjId,
                                type: 'POST',
                                async: false,
                                success: function (data) {

                                    sub = data.Subject;
                                },
                                error: function (err) {
                                    alert("Error: " + err.responseText);
                                }

                            });
                            return sub;
                        },
                    },
                     {
                         'data': 'UniqueId',
                         'render': function GetStudentName(uniqueId) {
                             //debugger
                             var student = '';
                             $.ajax({
                                 url: '/School/GetStudentName?UniqueId=' + uniqueId,
                                 type: 'POST',
                                 async: false,
                                 success: function (data) {

                                     student = (data.Surname + " " + data.FirstName + " " + data.LastName);
                                 },
                                 error: function (err) {
                                     alert("Error: " + err.responseText);
                                 }

                             });
                             return student;
                         },
                     },
                     {
                         'data': 'CA1',
                         'render': function (result) {
                             if (!result) {
                                 return 'N/R';
                             }
                             else {
                                 return result;
                             }
                         }
                     },
                     {
                         'data': 'CA2',
                         'render': function (result) {
                             if (!result) {
                                 return 'N/R';
                             }
                             else {
                                 return result;
                             }
                         }
                     },
                     {
                         'data': 'CA3',
                         'render': function (result) {
                             if (!result) {
                                 return 'N/R';
                             }
                             else {
                                 return result;
                             }
                         }
                     },
                     {
                         'data': 'CA4',
                         'render': function (result) {
                             if (!result) {
                                 return 'N/R';
                             }
                             else {
                                 return result;
                             }
                         }
                     },
                                 //{
                                 //    'data': 'SchSessionId',
                                 //    'render': function (data, type, row) {
                                 //        debugger
                                 //        ddl = "<select name='schSessionId[]' class='form-control' id='SchSessionId'>";
                                 //        $.ajax({
                                 //            url: '/School/DllGetSession/',
                                 //            type: 'POST',
                                 //            dataType: 'json',
                                 //            success: function (data) {

                                 //                $.each(data, function (i, sub) {
                                 //                    ddl += "<option value='" + sub.Value + "'>" + sub.Text + "</option>";
                                 //                });
                                 //                $('#SchSessionId').html(ddl);
                                 //            }

                                 //        });
                                 //        ddl += "</select>";
                                 //        return ddl;
                                 //    }
                                    

                                 //},

                            {
                                'data': 'SchSessionId',
                                'render': function GetSessionName(sessionId) {
                                    var cl = '';
                                    $.ajax({
                                        url: '/School/GetSessionName?SchSessionId=' + sessionId,
                                        type: 'POST',
                                        async: false,
                                        success: function (data) {

                                            cl = data.SessionName;
                                        },
                                        error: function (err) {
                                            alert("Error: " + err.responseText);
                                        }

                                    });
                                    return cl;
                                },
                            },
                      {
                          'data': 'TermId',
                          'render': function (result) {
                              if (result === 1) {
                                  return '1st';
                              }
                              else if (result === 2) {
                                  return '2nd';
                              }
                              else if (result === 3) {
                                  return '3rd';
                              }
                          }
                      },

                    {
                        'data': 'ClassId',
                        'render': function GetClassName(classId) {
                            var cl = '';
                            $.ajax({
                                url: '/School/GetClassName?ClassId=' + classId,
                                type: 'POST',
                                async: false,
                                success: function (data) {

                                    cl = data.Name;
                                },
                                error: function (err) {
                                    alert("Error: " + err.responseText);
                                }

                            });
                            return cl;
                        },
                    },
                    {
                        "data": "ResultId", "render": function (data) {
                            return "<button type='button' id='btnEdit' class='btn btn-default glyphicon glyphicon-pencil' onclick='return getStudentAssessmentById(" + data + ")'></button> <button type='button' id='btnDelete' class='btn btn-danger glyphicon glyphicon-trash' onclick='return deleteStudentAssessmentById(" + data + ")'></button>";
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
//$(document).ready(function () {
//    var table = $('#datatable-button').DataTable();

//    // Handle form submission event 
//    $('#frm-student-assessment').on('submit', function (e) {
//        // Prevent actual form submission
//        e.preventDefault();

//        // Serialize form data
//        var data = table.$('input,select,textarea').serialize();

//        // Submit form data via Ajax
//        $.ajax({
//            url: '/School/SubmitUpdatedStudentAssessment/',
//            data: data,
//            success: function (data) {
//                console.log('Server response', data);
//            }
//        });

//        // FOR DEMONSTRATION ONLY
//        // The code below is not needed in production

//        // Output form data to a console     
//        $('#frm-student-assessment').text(data);
//    });
//});

function deleteStudentAssessmentById(id) {
    $("#confirmModal #title").text("Remove Student Assessment");
    $("#confirmModal").modal('show');
    $("#confirmModal #btnOk").click(function (e) {
        $.ajax({
            url: "/School/DeleteStudentAssessmentById/" + id,
            type: "POST",
            dataType: 'json',
            success: function (data) {
                $("#confirmModal").modal('hide');
                $("#datatable-button").dataTable().fnDestroy();
                getCollegeStudentResultList();
            },
            error: function (err) {
                alert("Error: " + err.responseText);
            }
        });

        e.preventDefault();
    });
}

var uId = '';
var sessionId = '';
var termId = '';
var subjectId = '';
var classId = '';
var ca1 = '';
var ca2 = '';
var ca3 = '';
var ca4 = '';
var student = '';
var subject = '';
var resultId = '';
function GetStudentName(uId) {
    //debugger
    $.ajax({
        url: '/School/GetStudentName?UniqueId=' + uId,
        type: 'POST',
        async: false,
        success: function (data) {

            student = (data.Surname + " " + data.FirstName + " " + data.LastName);
        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }

    });
    return student;
}

function GetSubject(classId, subjectId) {
    //debugger
    $.ajax({
        url: '/School/GetSubjectByCollegeSchClasses?ClassId=' + classId + '&SubjectId=' + subjectId,
        type: 'POST',
        async: false,
        success: function (data) {

            subject = data.Subject;
        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }

    });
    return subject;
}
function getStudentAssessmentById(id) {
    $("#caModal").modal('show');
    //debugger
    $.ajax({
        url: '/School/GetStudentAssessmentById/' + id,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $.each(data, function (key, value) {
                var items = '';
                GetStudentName(data.UniqueId);
                GetSubject(data.ClassId, data.SubjectId);
                //debugger
                uId = data.UniqueId;
                resultId = data.ResultId;
                sessionId = data.SchSessionId;
                termId = data.TermId;
                subjectId = data.SubjectId;
                classId = data.ClassId;
                ca1 = data.CA1;
                ca2 = data.CA2;
                ca3 = data.CA3;
                ca4 = data.CA4;

                $("#StudentName").val(student);
                $("#UniqueId").val(data.UniqueId);
                $("#SchSessionId").val(sessionId);
                $("#TermId").val(termId);
                
                items += "<option value='" + data.SubjectId + "'>" + subject + "</option>";
                $("#SubjectId").html(items).prop("disabled", true);
                $("#ClassId").val(classId);
                if (data.CA1 !== null)
                {
                    $('#CA1').val(ca1).prop("disabled", true);
                }
                else {
                    $("#CA1").val(ca1).prop("disabled", false);
                }
                if (data.CA2 !== null) {
                    $('#CA2').val(ca2).prop("disabled", true);
                }
                else {
                    $("#CA2").val(ca2).prop("disabled", false);
                }
                if (data.CA3 !== null) {
                    $('#CA3').val(ca3).prop("disabled", true);
                }
                else {
                    $("#CA3").val(ca3).prop("disabled", false);
                }
                if (data.CA4 !== null) {
                    $('#CA4').val(ca4).prop("disabled", true);
                }
                else {
                    $("#CA4").val(ca4).prop("disabled", false);
                }
            });
        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
}



function updatetAssessment() {
    debugger
    data = {
        ResultId: resultId,
        UniqueId: $("#UniqueId").val(),
        ClassId: $("#ClassId").val(),
        SchSessionId: $("#SchSessionId").val(),
        TermId: $("#TermId").val(),
        SubjectId: $("#SubjectId").val(),
        CA1: $("#CA1").val(),
        CA2: $("#CA2").val(),
        CA3: $("#CA3").val(),
        CA4: $("#CA4").val(),
    }
    //var formData = $("#assessment-update-form").serialize();
    $.ajax({
        type: 'POST',
        url: "/School/UpdateStudentAssessmentById",
        dataType: 'json',
        data: data,
        success: function (r) {
            
            alert(r);
            //window.location.href = "/School/updateStudentAssessment";
            $("#datatable-button").dataTable().fnDestroy();
            getCollegeStudentResultList();

        }
    });
};
// Set title for create new
$("#btnUpdate").click(function () {
    $("#title").text("Update Student Assessment");
    updatetAssessment();
    $("#caModal").modal('hide');

})

// Close modal
$("#btnClose").click(function () {
    clear();
});

$("body").on("click", "#btnAdd", function () {
    //Reference all input control with their Ids.
    var schSessionId = $("#SchSessionId");
    var termId = $("#TermId");
    var classId = $("#ClassId");
    var subjectId = $("#SubjectId");
    var uniqueId = $("#UniqueId");
    var ca1 = $("#CA1");
    var ca2 = $("#CA2");
    var ca3 = $("#CA3");
    var ca4 = $("#CA4");


    //Get the reference of the Table's TFOOT element.
    var tBody = $("#datatable-button> TBODY")[0];

    //Add Row.
    var row = tBody.insertRow(-1);

    //Add School sessionId cell.
    cell = $(row.insertCell(-1));
    cell.html(schSessionId.val());

    //Add TermId cell.
    cell = $(row.insertCell(-1));
    cell.html(termId.val());

    //Add ClassId cell.
    cell = $(row.insertCell(-1));
    cell.html(classId.val());

    //Add SubjectId cell.
    cell = $(row.insertCell(-1));
    cell.html(subjectId.val());

    //Add StudentId cell.
    cell = $(row.insertCell(-1));
    cell.html(uniqueId.val());

    //Add CA1 cell.
    cell = $(row.insertCell(-1));
    cell.html(ca1.val());

    //Add CA2 cell.
    cell = $(row.insertCell(-1));
    cell.html(ca2.val());

    //Add CA3 cell.
    cell = $(row.insertCell(-1));
    cell.html(ca3.val());

    //Add CA4 cell.
    var cell = $(row.insertCell(-1));
    cell.html(ca4.val());

    //Add Button cell.
    var btnRemove = $("<input />");
    btnRemove.attr("type", "button");
    btnRemove.attr("onclick", "Remove(this);");
    btnRemove.val("Remove");
    cell.append(btnRemove);

    //Add Button cell.
    var btnEdit = $("<input />");
    btnEdit.attr("type", "button");
    btnEdit.attr("onclick", "Edit(this);");
    btnEdit.val("Edit");
    cell.append(btnEdit);

    //Clear dropdown.
    schSessionId.index = -1;
    classId.index = -1;
    subjectId.index = -1;
    termId.index = -1;
    uniqueId.index = -1;
    ca1.val("");
    ca2.val("");
    ca3.val("");
    ca4.val("");

});
function Remove(button) {
    //Determine the reference of the Row using the Button.
    var row = $(button).closest("TR");
    var name = $("TD", row).eq(0).html();
    if (confirm("Do you want to delete: " + name)) {
        //Get the reference of the Table.
        var table = $("#datatable-button")[0];

        //Delete the Table row using it's Index.
        table.deleteRow(row[0].rowIndex);
    }
};
function Edit(button) {
    debugger
    //Determine the reference of the Row using the Button.
    var row = $(button).closest("TR");
    var table = $("#datatable-button")[0];
    table.insertCell
    table.edit(row[0].rowIndex);
};

$("#btnSave").click(function () {

    submitAssessment();
});
$("#btnEdit").click(function () {
    updateAssessment();
});

function submitAssessment() {
    //debugger
    //Loop through the Table rows and build a JSON array.
    var students = new Array();
    $("#datatable-button TBODY TR").each(function () {
        var row = $(this);
        var student = {};
        student.SchSessionId = row.find("TD").eq(0).html();
        student.TermId = row.find("TD").eq(1).html();
        student.ClassId = row.find("TD").eq(2).html();
        student.SubjectId = row.find("TD").eq(3).html();
        student.UniqueId = row.find("TD").eq(4).html();
        student.CA1 = row.find("TD").eq(5).html();
        student.CA2 = row.find("TD").eq(6).html();
        student.CA3 = row.find("TD").eq(7).html();
        student.CA4 = row.find("TD").eq(8).html();
        students.push(student);


    });

    //Send the JSON array to Controller using AJAX.
    $.ajax({
        type: "POST",
        url: "/School/SubmitStudentAssessment",
        data: JSON.stringify(students.splice(1)),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            alert(r);
            //$("#caModal").modal('hide');
            $("#datatable-button").dataTable().fnDestroy();
            getCollegeStudentResultList();

        }
    });
};