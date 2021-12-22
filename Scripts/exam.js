var c1 = '';
var c2 = '';
var c3 = '';
var c4 = '';
var exam = '';
var ca1Max = '';
var ca2Max = '';
var ca3Max = '';
var ca4Max = '';
var examMax = '';
var totalCAMax = '';
var textboxInputValue = '';
var textboxValue = '';
var oTable = '';
function getMaxScore() {
    $.ajax({
        url: '/School/GetSecondaryDefaultMaxScore',
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (data) {
            //debugger
            $.each(data, function (i, item) {
                //debugger
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
document.addEventListener("keyup", function (event) {

    if (event.which >= 48 && event.which < 58) {
        exam = $('#Exam').val();

        $('#Exam').change(function () {
            exam = $('#Exam').val();
        });
    }
    var charExam = $('#Exam').val().replace(/\s/g, '').length;
    if (charExam >= 1) {
        if (exam > examMax) {
            alert("Value entered for Exam score is greater than the maximum of " + examMax);
            $('#Exam').val('');
        }
    }
})

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
        else {

        }
        return true;
    } catch (w) {
        alert(w);
    }
}
function switchVisible() {
    if (document.getElementById('caListDiv')) {

        if (document.getElementById('caListDiv').style.display === 'none') {
            document.getElementById('caListDiv').style.display = 'block';
            document.getElementById('caDiv').style.display = 'none';
            $('#addCA').text("View Continous Assessment");
            document.getElementById('addCA').style.backgroundColor = '#007ACC';//0x007ACC
            document.getElementById('caListDiv').style.color = '#007ACC';
        }
        else {
            document.getElementById('caListDiv').style.display = 'none';
            document.getElementById('caDiv').style.display = 'block';
            document.getElementById('caDiv').style.color = '#4EA300';
            document.getElementById('addCA').style.backgroundColor = '#4EA300';//0x4EA300
            $('#addCA').text("Add Continous Assessment");
        }
    }
}
$(document).ready(function () {
    getMaxScore();
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
    var sessionId = '';
    function getStudents(classId, sessionId) {
        if (classId !== "" && sessionId !== "") {
            debugger
            $.ajax({

                //url: '@Url.Action("GetAllCollegeStudentIdsInaClass", "School")',
                url: '/School/GetAllCollegeStudentIdsInaClass?ClassId=' + classId + '&SchSession=' + sessionId,
                type: 'POST',

                async: false,

                data: { 'ClassId': classId, 'SchoolSession': sessionId },

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
    //function getSubjects(classId) {
    //    if (classId !== 0 && sessionId !== 0) {
    //        debugger
    //        $.ajax({

    //            //url: '@Url.Action("GetAllCollegeStudentIdsInaClass", "School")',
    //            url: '/School/GetAllSubjectBySchoolClasses?ClassId=' + parseInt(classId),
    //            type: 'POST',

    //            async: false,

    //            data: { 'ClassId': classId },

    //            success: function (data) {

    //                var items = '<option>SELECT SUBJECT</option>';

    //                $.each(data, function (i, sub) {

    //                    items += "<option value='" + sub.Value + "'>" + sub.Text + "</option>";

    //                });

    //                $('#SubjectId').html(items);

    //            }

    //        });

    //    }

    //    else {

    //        var items = '<option>SELECT SUBJECT</option>';

    //        $('#SubjectId').html(items);

    //    }

    //}
    $("#SchooSession").change(function () {
        if ($(this).val() !== '') {
            sessionId = $(this).val();
        }
    });
    $("#ClassId").change(function () {
        debugger
        if ($(this).val() !== '' && sessionId !== 0) {
            getStudents($(this).val(), sessionId);
            //getSubjects($(this).val(), classId);
        }
    });
});



function getCollegeStudentResultList() {

    $.ajax({
        url: '/School/GetCollegeStudentCAList/',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            if ($.fn.DataTable.isDataTable("#caListTable")) {
                oTable.draw();

            } else {
                oTable = $('#caListTable').DataTable({

                    initComplete: function () {
                        var r = $('#caListTable tfoot tr');
                        r.find('th').each(function () {
                            $(this).css('padding', 8);
                        });
                        $('#caListTable thead').append(r);
                        $('#search_0').css('text-align', 'center');
                        // Setup - add a text input to each footer cell
                        $('#caListTable tfoot th').each(function () {
                            var title = $(this).text();
                            $(this).html('<input type="text" placeholder="Search ' + title + '" />');
                        });

                        // DataTable
                        var table = $('#caListTable').DataTable();

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
                            'data': 'UniqueId',
                            'render': function GetStudentName(uniqueId) {
                                //debugger
                                var student = '';
                                $.ajax({
                                    url: '/School/GetStudentName?UniqueId=' + uniqueId,
                                    type: 'POST',
                                    async: false,
                                    success: function (data) {

                                        student = (data.Fullname);
                                    },
                                    error: function (err) {
                                        alert("Error: " + err.responseText);
                                    }

                                });
                                return student;
                            },
                        },

                         { 'data': 'Subject' },
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
                         { 'data': 'SchooSession' },
                         { 'data': 'TermId' },

                         { 'data': 'ClassId' },

                        {
                            "data": "CAId", "render": function (data) {
                                return "<button type='button' id='btnDelete' class='btn btn-danger glyphicon glyphicon-trash' onclick='return deleteStudentAssessmentById(" + data + ")'></button>";
                            },
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

$("body").on("click", "#btnAdd", function () {
    debugger
    //Reference all input control with their Ids.
    var schooSession = $("#SchooSession");
    var termId = $("#TermId");
    var classId = $("#ClassId");
    var subject = $("#Subject");
    var uniqueId = $("#UniqueId");
    var ex = $("#Exam");


    //Get the reference of the Table's TFOOT element.
    var tBody = $("#caTable > TBODY")[0];

    //Add Row.
    var row = tBody.insertRow(-1);

    //Add School sessionId cell.
    cell = $(row.insertCell(-1));
    cell.html(schooSession.val());

    //Add TermId cell.
    cell = $(row.insertCell(-1));
    cell.html(termId.val());

    //Add ClassId cell.
    cell = $(row.insertCell(-1));
    cell.html(classId.val());

    //Add SubjectId cell.
    cell = $(row.insertCell(-1));
    cell.html(subject.val());

    //Add StudentId cell.
    cell = $(row.insertCell(-1));
    cell.html(uniqueId.val());

    //Add Exam cell.
    var cell = $(row.insertCell(-1));
    cell.html(ex.val());

    //Add Button cell.
    var btnRemove = $("<input />");
    btnRemove.attr("type", "button");
    btnRemove.attr("onclick", "Remove(this);");
    btnRemove.val("Remove");
    cell = $(row.insertCell(-1));
    cell.append(btnRemove);

    //Clear dropdown.
    schooSession.index = -1;
    classId.index = -1;
    subject.index = -1;
    termId.index = -1;
    uniqueId.index = -1;
    ex.val("");

});
var name = '';
function Remove(button) {
    //Determine the reference of the Row using the Button.
    debugger
    var row = $(button).closest("TR");
    name = $("TD", row).eq(0).html();
    if (confirm("Do you realy want to delete " + name + "continous assessment ")) {
        //Get the reference of the Table.
        var table = $("#caTable")[0];
        //Delete the Table row using it's Index.
        table.deleteRow(row[0].rowIndex);
    }
};

$("#btnSave").click(function () {
    submitAssessment();
});

function submitAssessment() {
    debugger
    //Loop through the Table rows and build a JSON array.
    var students = new Array();
    $("#caTable TBODY TR").each(function () {
        var row = $(this);
        var student = {};
        student.schooSession = row.find("TD").eq(0).html();
        student.TermId = row.find("TD").eq(1).html();
        student.ClassId = row.find("TD").eq(2).html();
        student.Subject = row.find("TD").eq(3).html();
        student.UniqueId = row.find("TD").eq(4).html();
        student.Exam = row.find("TD").eq(5).html();
        students.push(student);


    });

    //Send the JSON array to Controller using AJAX.
    $.ajax({
        type: "POST",
        url: "/School/SubmitStudentExam",
        data: JSON.stringify(students.splice(1)),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            alert(r);
            $("#caListTable").dataTable().fnDestroy();
            getCollegeStudentResultList();

        }
    });
};
// Set title for create new
$("#addCA").click(function () {
    switchVisible();
})


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

