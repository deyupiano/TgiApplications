var ca1Max = '';
var ca2Max = '';
var ca3Max = '';
var ca4Max = '';
var examMax = '';
var totalCAMax = '';
var textboxInputValue = '';
function getMaxScore() {
    $.ajax({
        url: '/School/GetSecondaryDefaultMaxScore',
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (data) {
            debugger
            $.each(data, function (i, item) {
                debugger
                examMax = parseInt(item.ExamMax);
                if (item.CA1Max === null) {
                    ca1Max = 0;
                } else {
                    ca1Max = parseInt(item.CA1Max);
                }
                if (item.CA2Max === null) {
                    ca2Max = 0;
                } else {
                    ca2Max = parseInt(item.CA2Max);
                }
                if (item.CA3Max === null) {
                    ca3Max = 0;
                } else {
                    ca3Max = parseInt(item.CA3Max);
                }
                if (item.CA4Max === null) {
                    ca4Max = 0;
                } else {
                    ca4Max = parseInt(item.CA4Max);
                }
                totalCAMax = ca1Max + ca2Max + ca3Max + ca4Max;
            });
        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
}


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
                }
            });

        });
    });
    var classId = $('#ClassId').val();
    function getStudents(classId, sessionId) {
        if (classId !== 0 && sessionId !== 0) {
            //debugger
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
        }
    });
});

//--->make div editable > start
$(document).on('click', '.row_data', function (event) {
    event.preventDefault();

    if ($(this).attr('edit_type') === 'button') {
        return false;
    }

    //make div editable
    $(this).closest('div').attr('contenteditable', 'true');
    //add bg css
    $(this).addClass('bg-warning').css('padding', '5px');

    $(this).focus();
})
//--->make div editable > end
var student = '';
var resultId = '';
var uniq = '';
var id = '';
var sId = '';
var session = '';
var sessId = '';
var snId = '';
var cl = '';
var cla = '';
var clas = '';
var sub = '';
var subj = '';
var subjt = '';
var oTable = '';
function getCollegeStudentResultList() {
    getMaxScore();
    //debugger
    $.ajax({
        url: '/School/GetCollegeStudentResultList/',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            
            if ($.fn.DataTable.isDataTable("#datatable-button")) {
                oTable.draw();
            }
            else {
                oTable = $('#datatable-button').DataTable({

                    initComplete: function () {
                        var r = $('#datatable-button tfoot tr');
                        r.find('th').each(function () {
                            $(this).css('padding', 8);
                        });
                        $('#datatable-button thead').append(r);
                        $('#search_0').css('text-align', 'center');
                        // Setup - add a text input to each footer cell
                        $('#datatable-button tfoot th').each(function () {
                            var title = $(this).text();
                            $(this).html('<input type="text" placeholder="Search ' + title + '" />');
                        });

                        // DataTable
                        var table = $('#datatable-button').DataTable();

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
                    data: data,
                    responsive: true,
                    deferRender: true,
                    scrollCollapse: true,

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
                                'data': 'ResultId',
                                'render': function (result) {
                                    resultId = result;
                                    return resultId;
                                }
                            },
                            {
                                'data': 'SchSessionId',
                                'render': function GetSessionName(sessionId, type, row) {
                                    sessId = "SchSessionId" + resultId;
                                    snId = "<input style='width:0px;border:hidden' class='schSessionId' value=" + row['SchSessionId'] + " name='schSessionId[]' type='text' id='" + sessId + "'/>";

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
                                    return snId + session;
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
                            'render': function GetClassName(classId, type, row) {
                                cla = "ClassId" + resultId;
                                clas = "<input style='width:0px;border:hidden' class='classId' value=" + row['ClassId'] + " name='classId[]' type='text' id='" + cla + "'/>";

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
                                return clas + cl;
                            },
                        },
                        {
                            'data': 'SubjectId',
                            'render': function GetSubjectName(subjId, type, row) {
                                subj = "SubjectId" + resultId;
                                subjt = "<input style='width:0px;border:hidden' class='subjectId' value=" + row['SubjectId'] + " name='subjectId[]' type='text' id='" + subj + "'/>";

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
                                return subjt + sub;
                            },
                        },
                         {
                             'data': 'UniqueId',
                             'render': function GetStudentName(uniqueId, type, row) {
                                 id = "UniqueId" + resultId;
                                 sId = "<input style='width:0px;border:hidden' class='uniqueId' value=" + row['UniqueId'] + " name='uniqueId[]' type='text' id='" + id + "'/>";
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
                                 return sId + student;
                             },
                         },

                        {
                            'data': 'CATotal',
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
                            'data': 'Exam',
                            'render': function (data, type, row) {
                                debugger
                                var examId = "Exam" + resultId;
                                var editableDiv = "<input style='width:30px; padding-left:3px' class='exam' value=" + row['Exam'] + " max="+ examMax +" type='text' id='" + examId + "' name='exam[]' onkeypress='return isNumberKey(event,this.id)'/>";
                                if ((row['Exam']) === null) {
                                    $('#' + examId).prop("disabled", false);
                                }
                                else {
                                    $('#' + examId).prop("disabled", true);
                                }
                                return editableDiv;
                            }
                        },
                        {
                            'data': 'Total',
                            'render': function (result) {
                                if (!result) {
                                    return 'N/R';
                                }
                                else {
                                    return result;
                                }
                            }
                        },
                        { 'data': 'Grade' },
                         {
                             'data': 'Remark'
                         },
                        {
                            'data': 'CA1',
                            //'visible': false,
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
                             //'visible': false,
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
                             // 'visible': false,
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
                             //'visible': false,
                             'render': function (result) {
                                 if (!result) {
                                     return 'N/R';
                                 }
                                 else {
                                     return result;
                                 }
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

function convertTableToArrayObject() {


    var students = new Array();
    $("#datatable-button TBODY TR").each(function () {
        debugger
        var row = $(this);
        var student = {};
        student.ResultId = row.find("TD").eq(0).html();
        var ss = "#SchSessionId" + student.ResultId;
        student.SchSessionId = $(ss).val();
        //student.SchSessionId = row.find("TD").eq(1).html();
        student.TermId = (row.find("TD").eq(2).html()).substr(0, 1);
        var c = "#ClassId" + student.ResultId;
        student.ClassId = $(c).val();
        //student.ClassId = row.find("TD").eq(3).html();
        var s = "#SubjectId" + student.ResultId;
        student.SubjectId = $(s).val();
        //student.SubjectId = row.find("TD").eq(4).html();
        var u = "#UniqueId" + student.ResultId;
        student.UniqueId = $(u).val();
        var examId = "#Exam" + student.ResultId;
        student.Exam = $(examId).val();
        student.CATotal = row.find("TD").eq(6).html();
        student.Total = row.find("TD").eq(8).html();
        student.CA1 = row.find("TD").eq(9).html();
        student.CA2 = row.find("TD").eq(10).html();
        student.CA3 = row.find("TD").eq(11).html();
        student.CA4 = row.find("TD").eq(12).html();
        students.push(student);


    });

    $.ajax({
        type: "POST",
        url: "/School/UpdateAssessmentWithExamScore",
        data: JSON.stringify(students),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            alert(r);
            $("#caModal").modal('hide');
            $("#datatable-button").dataTable().fnDestroy();
            getCollegeStudentResultList();

        }
    });
}

var _fieldNodesFilter = false;
$('#btnUpdateCA').on('click', function (e) {
    //debugger
    var tb = convertTableToArrayObject();
    alert(JSON.stringify(tb));
});


//$('#btnUpdateCA').on('click', function (e) {
//    debugger
//    var data = ('#datatable-button').DataTable().serialize();

//    $.ajax({
//        url: '/School/UpdateAssessmentWithExamScore/',
//        data: data,
//        success: function () {
//            alert('success');
//        },
//        error: function () {
//            alert('failure');
//        }
//    });
//});

$("body").on("click", "#btnAdd", function () {
    //Reference all input control with their Ids.
    var schSessionId = $("#SchSessionId");
    var termId = $("#TermId");
    var classId = $("#ClassId");
    var subjectId = $("#SubjectId");
    var uniqueId = $("#UniqueId");
    var exam = $("#Exam");



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

    //Add Exam cell.
    cell = $(row.insertCell(-1));
    cell.html(exam.val());

    //Add Button cell.
    //var btnRemove = $("<input />");
    //btnRemove.attr("type", "button");
    //btnRemove.attr("onclick", "Remove(this);");
    //btnRemove.val("Remove");
    //cell.append(btnRemove);

    //Clear dropdown.
    schSessionId.index = -1;
    classId.index = -1;
    subjectId.index = -1;
    termId.index = -1;
    uniqueId.index = -1;
    exam.val("");


});
//function Remove(button) {
//    //Determine the reference of the Row using the Button.
//    var row = $(button).closest("TR");
//    var name = $("TD", row).eq(0).html();
//    if (confirm("Do you want to delete: " + name)) {
//        //Get the reference of the Table.
//        var table = $("#tb")[0];

//        //Delete the Table row using it's Index.
//        table.deleteRow(row[0].rowIndex);
//    }
//};

$("#btnSave").click(function () {
    submitAssessment();
});

function submitAssessment() {
    //debugger
    //Loop through the Table rows and build a JSON array.
    var students = new Array();
    $("#tb TFOOT TR").each(function () {
        debugger
        var row = $(this);
        var student = {};
        student.SchSessionId = row.find("TD").eq(0).html();
        student.TermId = row.find("TD").eq(1).html();
        student.ClassId = row.find("TD").eq(2).html();
        student.SubjectId = row.find("TD").eq(3).html();
        student.UniqueId = row.find("TD").eq(4).html();
        student.Exam = row.find("TD").eq(5).html();
        students.push(student);


    });

    //Send the JSON array to Controller using AJAX.
    $.ajax({
        type: "POST",
        url: "/School/UpdateAssessmentWithExamScore",
        data: JSON.stringify(students.splice(1)),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            alert(r);
            $("#caModal").modal('hide');
            //$("#datatable-button").dataTable().fnDestroy();
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
                //$("#datatable-button").dataTable().fnDestroy();
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
