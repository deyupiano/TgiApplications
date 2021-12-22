var sessionId = '';
$(document).ready(function () {

    getCollegeStudentResultList();


    $(".hidecol").click(function () {
        debugger
        var id = this.id;
        var splitid = id.split("_");
        var colno = splitid[1];
        var checked = true;

        // Checking Checkbox state
        if ($(this).is(":checked")) {
            checked = true;
        } else {
            checked = false;
        }
        setTimeout(function () {
            if (checked) {
                $('#tb td:nth-child(' + colno + ')').show();
                $('#tb th:nth-child(' + colno + ')').show();
            } else {
                $('#tb td:nth-child(' + colno + ')').hide();
                $('#tb th:nth-child(' + colno + ')').hide();
            }

        }, 500);

    });

    $(function () {
        // add multiple select / deselect functionality
        $("#all").click(function () {
           // debugger
            $('.a').attr('checked', this.checked);
            // add multiple select / deselect functionality
            $("#all").click(function () {
                //debugger
                var checked = true;

                // Checking Checkbox state
                if ($(this).is(":checked")) {
                    checked = true;
                } else {
                    checked = false;
                }
                if (checked) {
                    $(".a").prop("checked", false);

                    $('#tb td:nth-child(' + 1 + ')').show();
                    $('#tb td:nth-child(' + 2 + ')').show();
                    $('#tb td:nth-child(' + 3 + ')').show();
                    $('#tb td:nth-child(' + 4 + ')').show();

                    $('#tb th:nth-child(' + 1 + ')').show();
                    $('#tb th:nth-child(' + 2 + ')').show();
                    $('#tb th:nth-child(' + 3 + ')').show();
                    $('#tb th:nth-child(' + 4 + ')').show();

                } else {
                    $(".a").prop("checked", true);
                    $('#tb td:nth-child(' + 1 + ')').hide();
                    $('#tb td:nth-child(' + 2 + ')').hide();
                    $('#tb td:nth-child(' + 3 + ')').hide();
                    $('#tb td:nth-child(' + 4 + ')').hide();

                    $('#tb th:nth-child(' + 1 + ')').hide();
                    $('#tb th:nth-child(' + 2 + ')').hide();
                    $('#tb th:nth-child(' + 3 + ')').hide();
                    $('#tb th:nth-child(' + 4 + ')').hide();
                }
            });

        });
    });

    $(function () {

        $("#all2").click(function () {
            // debugger
            $('.b').attr('checked', this.checked);
            $("#all2").click(function () {
                //debugger
                var checked = true;

                // Checking Checkbox state
                if ($(this).is(":checked")) {
                    checked = true;
                } else {
                    checked = false;
                }
                if (checked) {
                    $(".b").prop("checked", false);

                    $('#tb td:nth-child(' + 5 + ')').show();
                    $('#tb td:nth-child(' + 6 + ')').show();
                    $('#tb td:nth-child(' + 7 + ')').show();
                    $('#tb td:nth-child(' + 8 + ')').show();
                    $('#tb td:nth-child(' + 9 + ')').show();

                    $('#tb th:nth-child(' + 5 + ')').show();
                    $('#tb th:nth-child(' + 6 + ')').show();
                    $('#tb th:nth-child(' + 7 + ')').show();
                    $('#tb th:nth-child(' + 8 + ')').show();
                    $('#tb th:nth-child(' + 9 + ')').show();

                } else {
                    $(".b").prop("checked", true);
                    $('#tb td:nth-child(' + 5 + ')').hide();
                    $('#tb td:nth-child(' + 6 + ')').hide();
                    $('#tb td:nth-child(' + 7 + ')').hide();
                    $('#tb td:nth-child(' + 8 + ')').hide();
                    $('#tb td:nth-child(' + 9 + ')').hide();

                    $('#tb th:nth-child(' + 5 + ')').hide();
                    $('#tb th:nth-child(' + 6 + ')').hide();
                    $('#tb th:nth-child(' + 7 + ')').hide();
                    $('#tb th:nth-child(' + 8 + ')').hide();
                    $('#tb th:nth-child(' + 9 + ')').hide();
                }
            });

        });
    });
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
            debugger
            $.ajax({

                //url: '@Url.Action("GetAllCollegeStudentIdsInaClass", "School")',
                url: '/School/GetAllSubjectBySchoolClasses?ClassId=' + parseInt(classId),
                type: 'POST',

                async: false,

                data: { 'ClassId': classId},

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
        }
    });
});



function getCollegeStudentResultList() {

    $.ajax({
        url: '/School/GetCollegeStudentResultList/',
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
                    {
                        'data': 'SubjectId',
                        'render': function GetSubjectName(subjId) {
                            //debugger
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
                     {
                         'data': 'SchSessionId',
                         'render': function GetSessionName(sessionId) {
                             var session = '';
                             $.ajax({
                                 url: '/School/GetSessionName?SchSessionId=' + sessionId,
                                 type: 'POST',
                                 async: false,
                                 success: function (data) {

                                     session = data.SessionName;
                                 },
                                 error: function (err) {
                                     alert("Error: " + err.responseText);
                                 }

                             });
                             return session;
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
    var tBody = $("#tb > TFOOT")[0];

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
        var table = $("#tb")[0];

        //Delete the Table row using it's Index.
        table.deleteRow(row[0].rowIndex);
    }
};

$("#btnSave").click(function () {
    submitAssessment();
});

function submitAssessment() {
    //debugger
    //Loop through the Table rows and build a JSON array.
    var students = new Array();
    $("#tb TFOOT TR").each(function () {
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
            $("#caModal").modal('hide');
            $("#datatable-button").dataTable().fnDestroy();
            getCollegeStudentResultList();

        }
    });
};
// Set title for create new
$("#btnCreate").click(function () {
    $("#title").text("Add Student Assessment");

})

// Close modal
$("#btnClose").click(function () {
    clear();
});



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



var name = $(this).attr('uniqueId');
$(this).find('#UniqueId' + name).html('');
var that = this;
function getStudentAssessmentById(id) {

    $("#title").text("Student Assessment Details");

    $.ajax({
        url: '/School/GetStudentAssessmentById/' + id,
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
