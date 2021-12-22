$(document).ready(function () {
    getCollegeStudentResultList();
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
var value = '';
var updatable = '';
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
                        {
                            'data': 'RId',
                            'render': function (result) {
                                resultId = result;
                                return resultId;
                            }
                        },
                        { 'data': 'School' },
                        { 'data': 'SchoolSession' },
                        { 'data': 'TermId' },
                        { 'data': 'ClassId' },
                         {
                             'data': 'UniqueId',
                             'render': function GetStudentName(uniqueId, type, row) {
                                 //debugger
                                 id = "UniqueId" + resultId;
                                 sId = "<input style='width:0px;border:hidden' class='uniqueId' value='" + row['UniqueId'] + "' name='uniqueId[]' type='text' id='" + id + "'/>";
                                 $.ajax({
                                     url: '/School/GetStudentName?UniqueId=' + uniqueId,
                                     type: 'POST',
                                     async: false,
                                     success: function (data) {

                                         student = data.Fullname;
                                     },
                                     error: function (err) {
                                         alert("Error: " + err.responseText);
                                     }

                                 });
                                 return sId + student;
                             },
                         },
                         {
                             'data': 'Updatable',
                             'render': function (data, type, row) {
                                 updatable = "Updatable" + resultId;
                                 $(document).on('change', '[type=checkbox]', function () {
                                     //debugger
                                     var checkbox = $(this).is(':checked');
                                    // alert(checkbox);
                                     value = checkbox;
                                 });
                                 //$("#" + updatable).prop('checked') === value;
                                 var dynamicCheckbox = '';
                                 if (data === true || value === true) {
                                     dynamicCheckbox = "<label><input style='width:20px; height:20px' type='checkbox'  id='" + updatable + "' name='chkItems' onclick='checkUnCheckParent();' checked /></label>";
                                     return dynamicCheckbox;
                                 }
                                 else if (data === false || value === false) {
                                     dynamicCheckbox = "<label><input style='width:20px; height:20px' type='checkbox'  id='" + updatable + "' name='chkItems' onclick='checkUnCheckParent();' /></label>";
                                     return dynamicCheckbox;
                                 }
                                return dynamicCheckbox;
                            }
                         },


                        {
                            "data": "RId", "render": function (data) {
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

$("#" + updatable).change(function () {
    //debugger
    checkUncheckAll(sender);
});
function checkUncheckAll(sender) {
    debugger
    var chkElements = document.getElementsByName('chkItems');
    for (var i = 0; i < chkElements.length; i++) {
        chkElements[i].checked = sender.checked;
        //if (chkElements[i].checked) {
        //    value = true;
        //}
        //else {
        //    value = false;
        //}
    }
}
function checkUnCheckParent() {
    debugger
    var chkHeader = document.getElementById('chkHeader');
    var chkElements = document.getElementsByName('chkItems');
    var checkedCount = 0;
    for (var i = 0; i < chkElements.length; i++) {
        //if (chkElements[i].checked) {
        //    value = true;
        //    //(chkElements[i].checked).val() === value;
        //}
        //else {
        //    //(chkElements[i].checked).val() === value;
        //    value = false;
        //}
    }
    chkHeader.checked = (checkedCount === chkElements.length);
}
function convertTableToArrayObject() {


    var students = new Array();
    $("#caListTable TBODY TR").each(function () {
        debugger
        var row = $(this);
        var student = {};
        student.RId = row.find("TD").eq(0).html();
        student.School = row.find("TD").eq(1).html();
        student.SchoolSession = row.find("TD").eq(2).html();
        student.TermId = row.find("TD").eq(3).html();
        student.ClassId = row.find("TD").eq(4).html();
        var uniqueId = "#UniqueId" + student.RId;
        student.UniqueId = $(uniqueId).val();
        var updatable = "#Updatable" + student.RId;
        student.Updatable = $(updatable).is(':checked');
        students.push(student);


    });

    $.ajax({
        type: "POST",
        url: "/Backend/MakeCollegeResultEditableByStudent",
        data: JSON.stringify(students),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            alert(r);
            $("#caListTable").dataTable().fnDestroy();
            getCollegeStudentResultList();

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

            url: '/School/GetAllCollegeUniqueIdInaClass?SchoolId=' + schoolId + '&SchoolSession=' + sessionId  + '&ClassId=' + classId,
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
$("#authUpdatable").click(function () {

    convertTableToArrayObject();
})

