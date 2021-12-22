var c1 = '';
var c2 = '';
var c3 = '';
var c4 = '';
var ca1Max = '';
var ca2Max = '';
var ca3Max = '';
var ca4Max = '';
var examMax = '';

var ca1Control = '';
var ca2Control = '';
var ca3Control = '';
var ca4Control = '';
var examControl = '';
var totalCAMax = '';
var textboxInputValue = '';
var textboxValue = '';
var oTable = '';
var subject = '';
$("#Subject").change(function () {

    if ($(this).val() !== '') {
        document.getElementById('caTable').style.display = 'block';
        subject = $(this).val();
    }
    else {
        document.getElementById('caTable').style.display = 'none';
    }
});
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

function getControlDefault() {
    $.ajax({
        url: '/Backend/GetAllControlDefault',
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (data) {
            //debugger
            $.each(data, function (i, item) {
                //debugger
                examControl = item.Exam;
                ca1Control = item.CA1;
                ca2Control = item.CA2;
                ca3Control = item.CA3;
                ca4Control = item.CA4;

            });
        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
}
document.addEventListener("keyup", function (event) {

    if (event.which >= 48 && event.which < 58) {
        c1 = $('#CA1').val();
        c2 = $('#CA2').val();
        c3 = $('#CA3').val();
        c4 = $('#CA4').val();

        $('#CA1').change(function () {
            c1 = $('#CA1').val();
        });
        $('#CA2').change(function () {
            c2 = $('#CA2').val();
        });
        $('#CA3').change(function () {
            c3 = $('#CA3').val();
        });
        $('#CA4').change(function () {
            c4 = $('#CA4').val();
        });
    }
    var charCount1 = $('#CA1').val().replace(/\s/g, '').length;
    var charCount2 = $('#CA2').val().replace(/\s/g, '').length;
    var charCount3 = $('#CA3').val().replace(/\s/g, '').length;
    var charCount4 = $('#CA4').val().replace(/\s/g, '').length;
    if (charCount1 >= 1) {
        if (c1 > ca1Max) {
            alert("Value entered for CA1 is greater than the maximum of " + ca1Max);
            $('#CA1').val('');
        }
    }

    if (charCount2 >= 1) {
        if (c2 > ca2Max) {
            alert("Value entered for CA2 is greater than the maximum of " + ca2Max);
            $('#CA2').val('');
        }
    }
    if (charCount3 >= 1) {
        if (c3 > ca3Max) {
            alert("Value entered for CA3 is greater than the maximum of " + ca3Max);
            $('#CA3').val('');
        }
    }
    if (charCount4 >= 1) {
        if (c4 > ca4Max) {
            alert("Value entered for CA4 is greater than the maximum of " + ca4Max);
            $('#CA4').val('');
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
        //else {
        //    return true;
        //}
        return true;
    } catch (w) {
        alert(w);
    }
}


function switchVisible() {
    if (document.getElementById('addCA')) {
        if (document.getElementById('caListDiv').style.display === 'block') {
            document.getElementById('caListDiv').style.display = 'none';
            document.getElementById('divShowCA').style.display = 'none';
            document.getElementById('caDiv').style.color = '#4EA300';
            document.getElementById('caDiv').style.display = 'block';
            $("#addCA").text("View Continous Assessment");
            document.getElementById('addCA').style.background = '#4EA300';
        }
        else {

            document.getElementById('caListDiv').style.display = 'block';
            document.getElementById('divShowCA').style.display = 'block';
            document.getElementById('caListDiv').style.color = '#007ACC';
            document.getElementById('caDiv').style.display = 'none';
            $("#addCA").text("Add Continous Assessment");
            document.getElementById('addCA').style.background = '#286090';
        }
    }
}
$("#addCA").click(function () {
    switchVisible();
});
$("#btnGetCA").click(function () {
    getCollegeStudentResultList();
});
var subj = '';
$("#Subject2").change(function () {
    $("#caListTable").dataTable().fnDestroy();
    debugger
    subj = $("#Subject2").val();
    subj = subj.toLowerCase()
    subj = subj.replace(/\s+/g, "_");

    if ($(this).val() !== '') {
        document.getElementById('caListDiv').style.display = 'block';
    }
    else {
        document.getElementById('caListDiv').style.display = 'none';
    }
});

$(document).ready(function () {
    document.getElementById('caListDiv').style.display = 'block';
    getMaxScore();
    getControlDefault();

    if (ca1Control === true) {
        document.getElementById('divCa1').style.display = 'block';
        $('#caTable th:nth-child(' + 6 + ')').show();
        $('#caTable td:nth-child(' + 6 + ')').show();

    }
    else {

        document.getElementById('divCa1').style.display = 'none';
        $('#caTable th:nth-child(' + 6 + ')').hide();
        $('#caTable td:nth-child(' + 6 + ')').hide();
    }

    if (ca2Control === true) {
        document.getElementById('divCa2').style.display = 'block';
        $('#caTable th:nth-child(' + 7 + ')').show();
        $('#caTable td:nth-child(' + 7 + ')').show();
    }
    else {

        document.getElementById('divCa2').style.display = 'none';
        $('#caTable th:nth-child(' + 7 + ')').hide();
        $('#caTable td:nth-child(' + 7 + ')').hide();
    }
    if (ca3Control === true) {
        document.getElementById('divCa3').style.display = 'block';
        $('#caTable th:nth-child(' + 8 + ')').show();
        $('#caTable td:nth-child(' + 8 + ')').show();
    }
    else {

        document.getElementById('divCa3').style.display = 'none';
        $('#caTable th:nth-child(' + 8 + ')').hide();
        $('#caTable td:nth-child(' + 8 + ')').hide();
    }
    if (ca4Control === true) {
        document.getElementById('divCa4').style.display = 'block';
        $('#caTable th:nth-child(' + 9 + ')').show();
        $('#caTable td:nth-child(' + 9 + ')').show();
    }
    else {

        document.getElementById('divCa4').style.display = 'none';
        $('#caTable th:nth-child(' + 9 + ')').hide();
        $('#caTable td:nth-child(' + 9 + ')').hide();
    }

    if (examControl === true) {
        document.getElementById('divExam').style.display = 'block';
        $('#caTable th:nth-child(' + 10 + ')').show();
        $('#caTable td:nth-child(' + 10 + ')').show();
    }
    else {

        document.getElementById('divExam').style.display = 'none';
        $('#caTable th:nth-child(' + 10 + ')').hide();
        $('#caTable td:nth-child(' + 10 + ')').hide();
    }

    //var table = $('#caTable').DataTable({
    //    "scrollY": "200px",
    //    "paging": false
    //});

    //$('a.toggle-vis').on('click', function (e) {
    //    debugger
    //    e.preventDefault();

    //    // Get the column API object
    //    var column = table.column($(this).attr('data-column'));

    //    // Toggle the visibility
    //    column.visible(!column.visible());

       
    //});
    $("#btnCa1").click(function () {
        if (document.getElementById('btnCa1').style.color === 'blue') {
            document.getElementById('btnCa1').style.background = 'black';
            document.getElementById('btnCa1').style.color = 'red';
            $('#caTable th:nth-child(' + 5 + ')').show();
            $('#caTable th:nth-child(' + 6 + ')').hide();
            $('#caTable th:nth-child(' + 7 + ')').hide();
            $('#caTable th:nth-child(' + 8 + ')').hide();
            $('#caTable th:nth-child(' + 9 + ')').hide();

            $('#caTable td:nth-child(' + 5 + ')').show();
            $('#caTable td:nth-child(' + 6 + ')').hide();
            $('#caTable td:nth-child(' + 7 + ')').hide();
            $('#caTable td:nth-child(' + 8 + ')').hide();
            $('#caTable td:nth-child(' + 9 + ')').hide();
        }
        else {
            $('#caTable th:nth-child(' + 5 + ')').hide();
            $('#caTable th:nth-child(' + 6 + ')').hide();
            $('#caTable th:nth-child(' + 7 + ')').hide();
            $('#caTable th:nth-child(' + 8 + ')').hide();
            $('#caTable th:nth-child(' + 9 + ')').hide();

            $('#caTable td:nth-child(' + 5 + ')').hide();
            $('#caTable td:nth-child(' + 6 + ')').hide();
            $('#caTable td:nth-child(' + 7 + ')').hide();
            $('#caTable td:nth-child(' + 8 + ')').hide();
            $('#caTable td:nth-child(' + 9 + ')').hide();
            document.getElementById('btnCa1').style.background = 'white';
            document.getElementById('btnCa1').style.color = 'blue';

        }
    })
    $("#btnCa2").click(function () {
        if (document.getElementById('btnCa2').style.color === 'blue') {
            document.getElementById('btnCa2').style.background = 'black';
            document.getElementById('btnCa2').style.color = 'red';
            $('#caTable th:nth-child(' + 5 + ')').hide();
            $('#caTable th:nth-child(' + 6 + ')').show();
            $('#caTable th:nth-child(' + 7 + ')').hide();
            $('#caTable th:nth-child(' + 8 + ')').hide();
            $('#caTable th:nth-child(' + 9 + ')').hide();

            $('#caTable td:nth-child(' + 5 + ')').hide();
            $('#caTable td:nth-child(' + 6 + ')').show();
            $('#caTable td:nth-child(' + 7 + ')').hide();
            $('#caTable td:nth-child(' + 8 + ')').hide();
            $('#caTable td:nth-child(' + 9 + ')').hide();
        }
        else {

            document.getElementById('btnCa2').style.background = 'white';
            document.getElementById('btnCa2').style.color = 'blue';
            $('#caTable th:nth-child(' + 5 + ')').hide();
            $('#caTable th:nth-child(' + 6 + ')').hide();
            $('#caTable th:nth-child(' + 7 + ')').hide();
            $('#caTable th:nth-child(' + 8 + ')').hide();
            $('#caTable th:nth-child(' + 9 + ')').hide();

            $('#caTable td:nth-child(' + 5 + ')').hide();
            $('#caTable td:nth-child(' + 6 + ')').hide();
            $('#caTable td:nth-child(' + 7 + ')').hide();
            $('#caTable td:nth-child(' + 8 + ')').hide();
            $('#caTable td:nth-child(' + 9 + ')').hide();
        }
    })
    $("#btnCa3").click(function () {
        if (document.getElementById('btnCa3').style.color === 'blue') {
            document.getElementById('btnCa3').style.background = 'black';
            document.getElementById('btnCa3').style.color = 'red';
            $('#caTable th:nth-child(' + 5 + ')').hide();
            $('#caTable th:nth-child(' + 6 + ')').hide();
            $('#caTable th:nth-child(' + 7 + ')').show();
            $('#caTable th:nth-child(' + 8 + ')').hide();
            $('#caTable th:nth-child(' + 9 + ')').hide();

            $('#caTable td:nth-child(' + 5 + ')').hide();
            $('#caTable td:nth-child(' + 6 + ')').hide();
            $('#caTable td:nth-child(' + 7 + ')').show();
            $('#caTable td:nth-child(' + 8 + ')').hide();
            $('#caTable td:nth-child(' + 9 + ')').hide();
        }
        else {

            document.getElementById('btnCa3').style.background = 'white';
            document.getElementById('btnCa3').style.color = 'blue';
            $('#caTable th:nth-child(' + 5 + ')').hide();
            $('#caTable th:nth-child(' + 6 + ')').hide();
            $('#caTable th:nth-child(' + 7 + ')').hide();
            $('#caTable th:nth-child(' + 8 + ')').hide();
            $('#caTable th:nth-child(' + 9 + ')').hide();

            $('#caTable td:nth-child(' + 5 + ')').hide();
            $('#caTable td:nth-child(' + 6 + ')').hide();
            $('#caTable td:nth-child(' + 7 + ')').hide();
            $('#caTable td:nth-child(' + 8 + ')').hide();
            $('#caTable td:nth-child(' + 9 + ')').hide();

        }
    })
    $("#btnCa4").click(function () {
        if (document.getElementById('btnCa4').style.color === 'blue') {
            document.getElementById('btnCa4').style.background = 'black';
            document.getElementById('btnCa4').style.color = 'red';
            $('#caTable th:nth-child(' + 5 + ')').hide();
            $('#caTable th:nth-child(' + 6 + ')').hide();
            $('#caTable th:nth-child(' + 7 + ')').hide();
            $('#caTable th:nth-child(' + 8 + ')').show();
            $('#caTable th:nth-child(' + 9 + ')').hide();

            $('#caTable td:nth-child(' + 5 + ')').hide();
            $('#caTable td:nth-child(' + 6 + ')').hide();
            $('#caTable td:nth-child(' + 7 + ')').hide();
            $('#caTable td:nth-child(' + 8 + ')').show();
            $('#caTable td:nth-child(' + 9 + ')').hide();
        }
        else {

            document.getElementById('btnCa4').style.background = 'white';
            document.getElementById('btnCa4').style.color = 'blue';
            $('#caTable th:nth-child(' + 5 + ')').hide();
            $('#caTable th:nth-child(' + 6 + ')').hide();
            $('#caTable th:nth-child(' + 7 + ')').hide();
            $('#caTable th:nth-child(' + 8 + ')').hide();
            $('#caTable th:nth-child(' + 9 + ')').hide();

            $('#caTable td:nth-child(' + 5 + ')').hide();
            $('#caTable td:nth-child(' + 6 + ')').hide();
            $('#caTable td:nth-child(' + 7 + ')').hide();
            $('#caTable td:nth-child(' + 8 + ')').hide();
            $('#caTable td:nth-child(' + 9 + ')').hide();

        }
    })
    $("#btnExam").click(function () {
        if (document.getElementById('btnExam').style.color === 'white') {
            document.getElementById('btnExam').style.background = 'black';
            document.getElementById('btnExam').style.color = 'red';
            $('#caTable th:nth-child(' + 5 + ')').hide();
            $('#caTable th:nth-child(' + 6 + ')').hide();
            $('#caTable th:nth-child(' + 7 + ')').hide();
            $('#caTable th:nth-child(' + 8 + ')').hide();
            $('#caTable th:nth-child(' + 9 + ')').show();

            $('#caTable td:nth-child(' + 5 + ')').hide();
            $('#caTable td:nth-child(' + 6 + ')').hide();
            $('#caTable td:nth-child(' + 7 + ')').hide();
            $('#caTable td:nth-child(' + 8 + ')').hide();
            $('#caTable td:nth-child(' + 9 + ')').show();
        }
        else {

            document.getElementById('btnExam').style.background = '#169F85';
            document.getElementById('btnExam').style.color = 'white';
            $('#caTable th:nth-child(' + 5 + ')').hide();
            $('#caTable th:nth-child(' + 6 + ')').hide();
            $('#caTable th:nth-child(' + 7 + ')').hide();
            $('#caTable th:nth-child(' + 8 + ')').hide();
            $('#caTable th:nth-child(' + 9 + ')').hide();

            $('#caTable td:nth-child(' + 5 + ')').hide();
            $('#caTable td:nth-child(' + 6 + ')').hide();
            $('#caTable td:nth-child(' + 7 + ')').hide();
            $('#caTable td:nth-child(' + 8 + ')').hide();
            $('#caTable td:nth-child(' + 9 + ')').hide();

        }
    })
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
    var arm = $('#ClassArm').val();
    var sessionId = '';
    function getStudents(classId, sessionId,arm) {
        if (classId !== "" && sessionId !== "") {
            debugger
            $.ajax({

                //url: '@Url.Action("GetAllCollegeStudentIdsInaClass", "School")',
                url: '/School/GetAllCollegeStudentIdsInaClass?ClassId=' + classId + '&SchSession=' + sessionId + '&ClassArm=' + arm,
                type: 'POST',

                async: false,

                data: { 'ClassId': classId, 'SchoolSession': sessionId,'ClassArm':arm },

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

    $("#ClassArm").change(function () {
        if ($(this).val() !== '') {

            if ($(this).val() !== '' && sessionId !== 0 && classId !== 0) {
                getStudents(classId, sessionId, $(this).val());
                //getSubjects($(this).val(), classId);
            }
        }
    });
    $("#SchoolSession").change(function () {
        if ($(this).val() !== '') {
            sessionId = $(this).val();
        }
    });
    $("#ClassId").change(function () {
        debugger
        classId = $(this).val();
    });
});



function getCollegeStudentResultList() {

    $.ajax({
        url: '/School/AuthorizeCollegeResultForUpdatable/',
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
                         { 'data': 'SchoolSession' },
                         { 'data': 'TermId' },
                         { 'data': 'ClassId' },
                         { 'data': 'ClassArm' },
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
                             'data': subj+"CA1",
                             'render': function (result) {
                                 debugger
                                 if (!result) {
                                     return 'N/R';
                                 }
                                 else {
                                     return result;
                                 }
                             }
                         },
                         {
                             'data': subj +"CA2",
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
                             'data': subj +"CA3",
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
                             'data': subj +"CA4",
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
                            'data': subj + "Exam",
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
                         //   'data': 'Exam',
                         //   'render': function (data, type, row) {
                         //       debugger
                         //       var examId = "Exam" + resultId;
                         //       var editableDiv = "<input style='width:30px; padding-left:3px' class='exam' value=" + row['Exam'] + " max=" + examMax + " type='text' id='" + examId + "' name='exam[]' onkeypress='return isNumberKey(event,this.id)'/>";
                         //       return editableDiv;
                         //   }
                         //},

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
    var schoolSession = $("#SchoolSession");
    var termId = $("#TermId");
    var classId = $("#ClassId");
    var arm = $("#ClassArm");
    var uniqueId = $("#UniqueId");
    var ca1 = $("#CA1");
    var ca2 = $("#CA2");
    var ca3 = $("#CA3");
    var ca4 = $("#CA4");
    var exam = $("#Exam");

    //Get the reference of the Table's TFOOT element.
    var tBody = $("#caTable > TBODY")[0];

    //Add Row.
    var row = tBody.insertRow(-1);

    //Add School sessionId cell.
    cell = $(row.insertCell(-1));
    cell.html(schoolSession.val());

    //Add TermId cell.
    cell = $(row.insertCell(-1));
    cell.html(termId.val());

    //Add ClassId cell.
    cell = $(row.insertCell(-1));
    cell.html(classId.val());

    //Add ClassArm cell.
    cell = $(row.insertCell(-1));
    cell.html(arm.val());

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
    cell = $(row.insertCell(-1));
    cell.html(ca4.val());

    //Add Exam cell.
    var cell = $(row.insertCell(-1));
    cell.html(exam.val());
    //Add Button cell.
    var btnRemove = $("<input />");
    btnRemove.attr("type", "button");
    btnRemove.attr("onclick", "Remove(this);");
    btnRemove.val("Remove");
    cell = $(row.insertCell(-1));
    cell.append(btnRemove);

    //Clear dropdown.
    schoolSession.index = -1;
    classId.index = -1;
    arm.index = -1;
    termId.index = -1;
    uniqueId.index = -1;
    ca1.val("");
    ca2.val("");
    ca3.val("");
    ca4.val("");
    exam.val("");

});
var name = '';
function Remove(button) {
    //Determine the reference of the Row using the Button.
    debugger
    var row = $(button).closest("TR");
    name = $("TD", row).eq(3).html();
    if (confirm("Do you realy want to delete " + name + " continous assessment ")) {
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
        student.SchoolSession = row.find("TD").eq(0).html();
        student.TermId = row.find("TD").eq(1).html();
        student.ClassId = row.find("TD").eq(2).html();
        student.ClassArm = row.find("TD").eq(3).html();
        student.UniqueId = row.find("TD").eq(4).html();
        student.subject = $("#Subject").val();
        student.School = $("#School").val();
        if (subject === "ENGLISH") {
            student.englishCA1 = row.find("TD").eq(5).html();
            student.englishCA2 = row.find("TD").eq(6).html();
            student.englishCA3 = row.find("TD").eq(7).html();
            student.englishCA4 = row.find("TD").eq(8).html();
            student.englishExam = row.find("TD").eq(9).html();
        }
        else if (subject === "MATHEMATICS") {
            student.mathematicsCA1 = row.find("TD").eq(5).html();
            student.mathematicsCA2 = row.find("TD").eq(6).html();
            student.mathematicsCA3 = row.find("TD").eq(7).html();
            student.mathematicsCA4 = row.find("TD").eq(8).html();
            student.mathematicsExam = row.find("TD").eq(9).html();
        }
        else if (subject === "ECONOMICS") {
            student.economicsCA1 = row.find("TD").eq(5).html();
            student.economicsCA2 = row.find("TD").eq(6).html();
            student.economicsCA3 = row.find("TD").eq(7).html();
            student.economicsCA4 = row.find("TD").eq(8).html();
            student.economicsExam = row.find("TD").eq(9).html();
        }
        else if (subject === "GEOGRAPHY") {
            student.geographyCA1 = row.find("TD").eq(5).html();
            student.geographyCA2 = row.find("TD").eq(6).html();
            student.geographyCA3 = row.find("TD").eq(7).html();
            student.geographyCA4 = row.find("TD").eq(8).html();
            student.geographyExam = row.find("TD").eq(9).html();
        }
        else if (subject === "COMPUTER/ICT") {
            student.computer_ictCA1 = row.find("TD").eq(5).html();
            student.computer_ictCA2 = row.find("TD").eq(6).html();
            student.computer_ictCA3 = row.find("TD").eq(7).html();
            student.computer_ictCA4 = row.find("TD").eq(8).html();
            student.computer_ictExam = row.find("TD").eq(9).html();
        }
        else if (subject === "PHYSICS") {
            student.physicsCA1 = row.find("TD").eq(5).html();
            student.physicsCA2 = row.find("TD").eq(6).html();
            student.physicsCA3 = row.find("TD").eq(7).html();
            student.physicsCA4 = row.find("TD").eq(8).html();
            student.physicsExam = row.find("TD").eq(9).html();
        }
        else if (subject === "CHEMISTRY") {
            student.chemistryCA1 = row.find("TD").eq(5).html();
            student.chemistryCA2 = row.find("TD").eq(6).html();
            student.chemistryCA3 = row.find("TD").eq(7).html();
            student.chemistryCA4 = row.find("TD").eq(8).html();
            student.chemistryExam = row.find("TD").eq(9).html();
        }
        else if (subject === "BIOLOGY") {
            student.biologyCA1 = row.find("TD").eq(5).html();
            student.biologyCA2 = row.find("TD").eq(6).html();
            student.biologyCA3 = row.find("TD").eq(7).html();
            student.biologyCA4 = row.find("TD").eq(8).html();
            student.biologyExam = row.find("TD").eq(9).html();
        }
        else if (subject === "FINANCIAL ACCOUNT") {
            student.financial_accountCA1 = row.find("TD").eq(5).html();
            student.financial_accountCA2 = row.find("TD").eq(6).html();
            student.financial_accountCA3 = row.find("TD").eq(7).html();
            student.financial_accountCA4 = row.find("TD").eq(8).html();
            student.financial_accountExam = row.find("TD").eq(9).html();
        }
        else if (subject === "COMMERCE") {
            student.commerceCA1 = row.find("TD").eq(5).html();
            student.commerceCA2 = row.find("TD").eq(6).html();
            student.commerceCA3 = row.find("TD").eq(7).html();
            student.commerceCA4 = row.find("TD").eq(8).html();
            student.commerceExam = row.find("TD").eq(9).html();
        }
        else if (subject === "HISTORY") {
            student.historyCA1 = row.find("TD").eq(5).html();
            student.historyCA2 = row.find("TD").eq(6).html();
            student.historyCA3 = row.find("TD").eq(7).html();
            student.historyCA4 = row.find("TD").eq(8).html();
            student.historyExam = row.find("TD").eq(9).html();
        }
        else if (subject === "LITERATURE IN ENGLISH") {
            student.literature_in_englishCA1 = row.find("TD").eq(5).html();
            student.literature_in_englishCA2 = row.find("TD").eq(6).html();
            student.literature_in_englishCA3 = row.find("TD").eq(7).html();
            student.literature_in_englishCA4 = row.find("TD").eq(8).html();
            student.literature_in_englisExam = row.find("TD").eq(9).html();
        }
        else if (subject === "NIGERIA LANGUAGE") {
            student.nigeria_languageCA1 = row.find("TD").eq(5).html();
            student.nigeria_languageCA2 = row.find("TD").eq(6).html();
            student.nigeria_languageCA3 = row.find("TD").eq(7).html();
            student.nigeria_languageCA4 = row.find("TD").eq(8).html();
            student.nigeria_languageExam = row.find("TD").eq(9).html();
        }
        else if (subject === "RELIGION KNOWLEDGE") {
            student.religion_knowledgeCA1 = row.find("TD").eq(5).html();
            student.religion_knowledgeCA2 = row.find("TD").eq(6).html();
            student.religion_knowledgeCA3 = row.find("TD").eq(7).html();
            student.religion_knowledgeCA4 = row.find("TD").eq(8).html();
            student.religion_knowledgeExam = row.find("TD").eq(9).html();
        }
        else if (subject === "MUSIC") {
            student.musicCA1 = row.find("TD").eq(5).html();
            student.musicCA2 = row.find("TD").eq(6).html();
            student.musicCA3 = row.find("TD").eq(7).html();
            student.musicCA4 = row.find("TD").eq(8).html();
            student.musicExam = row.find("TD").eq(9).html();
        }
        else if (subject === "GOVERNMENT") {
            student.governmentCA1 = row.find("TD").eq(5).html();
            student.governmentCA2 = row.find("TD").eq(6).html();
            student.governmentCA3 = row.find("TD").eq(7).html();
            student.governmentCA4 = row.find("TD").eq(8).html();
            student.governmentExam = row.find("TD").eq(9).html();
        }
        else if (subject === "TECHNICAL DRAWING") {
            student.technical_drawingCA1 = row.find("TD").eq(5).html();
            student.technical_drawingCA2 = row.find("TD").eq(6).html();
            student.technical_drawingCA3 = row.find("TD").eq(7).html();
            student.technical_drawingCA4 = row.find("TD").eq(8).html();
            student.technical_drawingExam = row.find("TD").eq(9).html();
        }

        else if (subject === "METAL/WOOD WORK") {
            student.metal_wood_workCA1 = row.find("TD").eq(5).html();
            student.metal_wood_workCA2 = row.find("TD").eq(6).html();
            student.metal_wood_workCA3 = row.find("TD").eq(7).html();
            student.metal_wood_workCA4 = row.find("TD").eq(8).html();
            student.metal_wood_workExam = row.find("TD").eq(9).html();
        }
        else if (subject === "VISUAL ARTS") {
            student.visual_artsCA1 = row.find("TD").eq(5).html();
            student.visual_artsCA2 = row.find("TD").eq(6).html();
            student.visual_artsCA3 = row.find("TD").eq(7).html();
            student.visual_artsCA4 = row.find("TD").eq(8).html();
            student.visual_artsExam = row.find("TD").eq(9).html();
        }
        else if (subject === "HOME MANAGEMENT") {
            student.home_managementCA1 = row.find("TD").eq(5).html();
            student.home_managementCA2 = row.find("TD").eq(6).html();
            student.home_managementCA3 = row.find("TD").eq(7).html();
            student.home_managementCA4 = row.find("TD").eq(8).html();
            student.home_managementExam = row.find("TD").eq(9).html();
        }
        else if (subject === "CLOTH AND TEXTILE") {
            student.cloth_and_textileCA1 = row.find("TD").eq(5).html();
            student.cloth_and_textileCA2 = row.find("TD").eq(6).html();
            student.cloth_and_textileCA3 = row.find("TD").eq(7).html();
            student.cloth_and_textileCA4 = row.find("TD").eq(8).html();
            student.cloth_and_textileExam = row.find("TD").eq(9).html();
        }
        else if (subject === "FOOD AND NUTRITION") {
            student.food_and_nutritionCA1 = row.find("TD").eq(5).html();
            student.food_and_nutritionCA2 = row.find("TD").eq(6).html();
            student.food_and_nutritionCA3 = row.find("TD").eq(7).html();
            student.food_and_nutritionCA4 = row.find("TD").eq(8).html();
            student.food_and_nutritionExam = row.find("TD").eq(9).html();
        }
        else if (subject === "FURTHER MATHS") {
            student.further_mathsCA1 = row.find("TD").eq(5).html();
            student.further_mathsCA2 = row.find("TD").eq(6).html();
            student.further_mathsCA3 = row.find("TD").eq(7).html();
            student.further_mathsCA4 = row.find("TD").eq(8).html();
            student.further_mathsExam = row.find("TD").eq(9).html();
        }
        else if (subject === "AGRICULTURAL SCIENCE") {
            student.agricCA1 = row.find("TD").eq(5).html();
            student.agricCA2 = row.find("TD").eq(6).html();
            student.agricCA3 = row.find("TD").eq(7).html();
            student.agricCA4 = row.find("TD").eq(8).html();
            student.agricExam = row.find("TD").eq(9).html();
        }
        students.push(student);


    });

    //Send the JSON array to Controller using AJAX.
    $.ajax({
        type: "POST",
        url: "/School/SubmitStudentAssessmentAndExam",
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
    myDeleteFunction()
})