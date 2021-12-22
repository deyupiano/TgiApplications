$(document).ready(function () {
    getAssessControlList();
})

var clickedBtn = '';
$("#authById").click(function () {
    clickedBtn = 'Student';
    document.getElementById('divAuthEditable').style.display = 'block';
    document.getElementById('divSchool').style.display = 'block';
    document.getElementById('divSession').style.display = 'block';
    document.getElementById('divTerm').style.display = 'block';
    document.getElementById('divClass').style.display = 'block';
    document.getElementById('divStudent').style.display = 'block';
    document.getElementById('divStatus').style.display = 'block';
});
$("#authByClass").click(function () {
    clickedBtn = 'Class';
    document.getElementById('divAuthEditable').style.display = 'block';
    document.getElementById('divSchool').style.display = 'block';
    document.getElementById('divSession').style.display = 'block';
    document.getElementById('divTerm').style.display = 'block';
    document.getElementById('divClass').style.display = 'block';
    document.getElementById('divStudent').style.display = 'none';
    document.getElementById('divStatus').style.display = 'block';
});
$("#authBySchool").click(function () {
    clickedBtn = 'School';
    document.getElementById('divAuthEditable').style.display = 'block';
    document.getElementById('divSchool').style.display = 'block';
    document.getElementById('divSession').style.display = 'block';
    document.getElementById('divTerm').style.display = 'block';
    document.getElementById('divClass').style.display = 'none';
    document.getElementById('divStudent').style.display = 'none';
    document.getElementById('divStatus').style.display = 'block';
});
//function switchVisible() {
//    if (document.getElementById('caListDiv')) {

//        if (document.getElementById('caListDiv').style.display === 'none') {
//            document.getElementById('caListDiv').style.display = 'block';
//            document.getElementById('caDiv').style.display = 'none';
//            $('#addCA').text("View Continous Assessment");
//            document.getElementById('addCA').style.backgroundColor = '#007ACC';//0x007ACC
//            document.getElementById('caListDiv').style.color = '#007ACC';
//        }
//        else {
//            document.getElementById('caListDiv').style.display = 'none';
//            document.getElementById('caDiv').style.display = 'block';
//            document.getElementById('caDiv').style.color = '#4EA300';
//            document.getElementById('addCA').style.backgroundColor = '#4EA300';//0x4EA300
//            $('#addCA').text("Add Continous Assessment");
//        }
//    }
//}
var oTable = '';
var student = '';
var resultId = '';
var uniq = '';
var id = '';
var ca1value = '';
var ca2value = '';
var ca3value = '';
var ca4value = '';
var examvalue = '';
var ca1 = '';
var ca2 = '';
var ca3 = '';
var ca4 = '';
var exam = '';
function getAssessControlList() {

    $.ajax({
        url: '/Backend/GetAllControlDefault/',
        type: 'get',
        dataType: 'json',
        success: function (data) {

            if ($.fn.DataTable.isDataTable("#caListTable")) {
                oTable.draw();

            } else {
                oTable = $('#caListTable').DataTable({


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
                            'data': 'Id',
                            'render': function (result) {
                                debugger
                                resultId = result;
                                return resultId;
                            }
                        },
                         {
                             'data': 'CA1',
                             'render': function (data, type, row) {
                                 ca1 = "CA1" + resultId;
                                 $(document).on('change', '[type=checkbox]', function () {
                                     //debugger
                                     var checkbox = $(this).is(':checked');
                                     // alert(checkbox);
                                     ca1value = checkbox;
                                 });
                                 //$("#" + updatable).prop('checked') === value;
                                 var dynamicCheckbox = '';
                                 if (data === true || ca1value === true) {
                                     dynamicCheckbox = "<label><input style='width:20px; height:20px' type='checkbox'  id='" + ca1 + "' name='chkItems' onclick='checkUnCheckParent();' checked /></label>";
                                     return dynamicCheckbox;
                                 }
                                 else if (data === false || ca1value === false) {
                                     dynamicCheckbox = "<label><input style='width:20px; height:20px' type='checkbox'  id='" + ca1 + "' name='chkItems' onclick='checkUnCheckParent();' /></label>";
                                     return dynamicCheckbox;
                                 }
                                 return dynamicCheckbox;
                             }
                         },
                         {
                             'data': 'CA2',
                             'render': function (data, type, row) {
                                 ca2 = "CA2" + resultId;
                                 $(document).on('change', '[type=checkbox]', function () {
                                     //debugger
                                     var checkbox = $(this).is(':checked');
                                     // alert(checkbox);
                                     ca2value = checkbox;
                                 });
                                 //$("#" + updatable).prop('checked') === value;
                                 var dynamicCheckbox = '';
                                 if (data === true || ca2value === true) {
                                     dynamicCheckbox = "<label><input style='width:20px; height:20px' type='checkbox'  id='" + ca2 + "' name='chkItems' onclick='checkUnCheckParent();' checked /></label>";
                                     return dynamicCheckbox;
                                 }
                                 else if (data === false || ca2value === false) {
                                     dynamicCheckbox = "<label><input style='width:20px; height:20px' type='checkbox'  id='" + ca2 + "' name='chkItems' onclick='checkUnCheckParent();' /></label>";
                                     return dynamicCheckbox;
                                 }
                                 return dynamicCheckbox;
                             }
                         },
                         {
                             'data': 'CA3',
                             'render': function (data, type, row) {
                                 ca3 = "CA3" + resultId;
                                 $(document).on('change', '[type=checkbox]', function () {
                                     //debugger
                                     var checkbox = $(this).is(':checked');
                                     // alert(checkbox);
                                     ca3value = checkbox;
                                 });
                                 //$("#" + updatable).prop('checked') === value;
                                 var dynamicCheckbox = '';
                                 if (data === true || ca3value === true) {
                                     dynamicCheckbox = "<label><input style='width:20px; height:20px' type='checkbox'  id='" + ca3 + "' name='chkItems' onclick='checkUnCheckParent();' checked /></label>";
                                     return dynamicCheckbox;
                                 }
                                 else if (data === false || ca3value === false) {
                                     dynamicCheckbox = "<label><input style='width:20px; height:20px' type='checkbox'  id='" + ca3 + "' name='chkItems' onclick='checkUnCheckParent();' /></label>";
                                     return dynamicCheckbox;
                                 }
                                 return dynamicCheckbox;
                             }
                         },
                         {
                             'data': 'CA4',
                             'render': function (data, type, row) {
                                 ca4 = "CA4" + resultId;
                                 $(document).on('change', '[type=checkbox]', function () {
                                     //debugger
                                     var checkbox = $(this).is(':checked');
                                     // alert(checkbox);
                                     ca4value = checkbox;
                                 });
                                 //$("#" + updatable).prop('checked') === value;
                                 var dynamicCheckbox = '';
                                 if (data === true || ca4value === true) {
                                     dynamicCheckbox = "<label><input style='width:20px; height:20px' type='checkbox'  id='" + ca4 + "' name='chkItems' onclick='checkUnCheckParent();' checked /></label>";
                                     return dynamicCheckbox;
                                 }
                                 else if (data === false || ca4value === false) {
                                     dynamicCheckbox = "<label><input style='width:20px; height:20px' type='checkbox'  id='" + ca4 + "' name='chkItems' onclick='checkUnCheckParent();' /></label>";
                                     return dynamicCheckbox;
                                 }
                                 return dynamicCheckbox;
                             }
                         },
                         {
                             'data': 'Exam',
                             'render': function (data, type, row) {
                                 exam = "Exam" + resultId;
                                 $(document).on('change', '[type=checkbox]', function () {
                                     //debugger
                                     var checkbox = $(this).is(':checked');
                                     // alert(checkbox);
                                     examvalue = checkbox;
                                 });
                                 //$("#" + updatable).prop('checked') === value;
                                 var dynamicCheckbox = '';
                                 if (data === true || examvalue === true) {
                                     dynamicCheckbox = "<label><input style='width:20px; height:20px' type='checkbox'  id='" + exam + "' name='chkItems' onclick='checkUnCheckParent();' checked /></label>";
                                     return dynamicCheckbox;
                                 }
                                 else if (data === false || examvalue === false) {
                                     dynamicCheckbox = "<label><input style='width:20px; height:20px' type='checkbox'  id='" + exam + "' name='chkItems' onclick='checkUnCheckParent();' /></label>";
                                     return dynamicCheckbox;
                                 }
                                 return dynamicCheckbox;
                             }
                         },
                        //{
                        //    'data': 'Category',
                        //    'render': function (data, type, row) {
                        //        debugger
                        //        var categoryId = "Category" + resultId;
                        //        var editableDiv = "<input style='width:200px; padding-left:3px' class='category' value=" + row['Category'] + " type='text' id='" + categoryId + "' name='category[]')'/>";
                        //        return editableDiv;
                        //    }
                        //},

                    ],
                });

            }


        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
}

$("#" + ca1).change(function () {
    //debugger
    checkUncheckAll(sender);
});

$("#" + ca2).change(function () {
    //debugger
    checkUncheckAll(sender);
});
$("#" + ca3).change(function () {
    //debugger
    checkUncheckAll(sender);
});
$("#" + ca4).change(function () {
    //debugger
    checkUncheckAll(sender);
});
$("#" + exam).change(function () {
    //debugger
    checkUncheckAll(sender);
});
function checkUncheckAll(sender) {
    debugger
    var chkElements = document.getElementsByName('chkItems');
    for (var i = 0; i < chkElements.length; i++) {
        chkElements[i].checked = sender.checked;
    }
}
function checkUnCheckParent() {
    debugger
    var chkHeader = document.getElementById('chkHeader');
    var chkElements = document.getElementsByName('chkItems');
    var checkedCount = 0;
    for (var i = 0; i < chkElements.length; i++) {
        
    }
    chkHeader.checked = (checkedCount === chkElements.length);
}
function convertTableToArrayObject() {


    var students = new Array();
    $("#caListTable TBODY TR").each(function () {
        debugger
        var row = $(this);
        var student = {};
        student.Id = row.find("TD").eq(0).html();
        var ca1 = "#CA1" + student.Id;
        student.CA1 = $(ca1).is(':checked');
        var ca2 = "#CA2" + student.Id;
        student.CA2 = $(ca2).is(':checked');
        var ca3 = "#CA3" + student.Id;
        student.CA3 = $(ca3).is(':checked');
        var ca4 = "#CA4" + student.Id;
        student.CA4 = $(ca4).is(':checked');
        var exam = "#Exam" + student.Id;
        student.Exam = $(exam).is(':checked');
        var categoryId = "#Category" + student.Id;
        student.category = $(categoryId).val();
        students.push(student);


    });

    $.ajax({
        type: "POST",
        url: "/Backend/UpdateAssessControlDefault",
        data: JSON.stringify(students),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            alert(r);
            $("#caListTable").dataTable().fnDestroy();
            getAssessControlList();

        }
    });

}

var classId = $('#ClassId').val();
var sessionId = '';
var schoolId = '';
var termId = '';

function getStudents(schoolId, sessionId, classId) {
    if (schoolId !== "" && sessionId !== "" && classId !== "") {
        debugger
        $.ajax({

            url: '/School/GetAllCollegeUniqueIdInaClass?SchoolId=' + schoolId + '&SchoolSession=' + sessionId + '&ClassId=' + classId,
            type: 'POST',

            async: false,

            data: { 'SchoolId': schoolId, 'SchoolSession': sessionId, 'ClassId': classId },

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

$("#School").change(function () {
    if ($(this).val() !== '') {
        schoolId = $(this).val();
    }
});
$("#TermId").change(function () {
    if ($(this).val() !== '') {
        termId = $(this).val();
    }
});
$("#SchoolSession").change(function () {
    if ($(this).val() !== '') {
        sessionId = $(this).val();
    }
});
$("#ClassId").change(function () {
    debugger
    if (schoolId !== '' && sessionId !== '' && $(this).val() !== '') {
        termId = $('TermId').val();

        getStudents(schoolId, sessionId, $(this).val());
    }
});
$("#setAssessControl").click(function () {

    convertTableToArrayObject();
})

