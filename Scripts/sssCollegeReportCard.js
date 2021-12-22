


//var sessionId = '';
//$(document).ready(function () {
//    //debugger
//    var classId = $('#ClassId').val();
//    function getStudents(classId, sessionId) {
//        if (classId !== 0 && sessionId !== 0) {
//            //debugger
//            $.ajax({

//                //url: '@Url.Action("GetAllCollegeStudentIdsInaClass", "School")',
//                url: '/School/GetAllCollegeStudentIdsInaClass?ClassId=' + classId + '&SchSessionId=' + sessionId,
//                type: 'GET',

//                async: false,

//                data: { 'ClassId': classId, 'SchSessionId': sessionId },

//                success: function (data) {

//                    var items = '<option>SELECT STUDENT</option>';

//                    $.each(data, function (i, stu) {

//                        items += "<option value='" + stu.Value + "'>" + stu.Text + "</option>";

//                    });

//                    $('#UniqueId').html(items);

//                }

//            });

//        }

//        else {

//            var items = '<option>SELECT STUDENT</option>';

//            $('#UniqueId').html(items);

//        }

//    }
//    function getSubjects(classId) {
//        if (classId !== 0 && sessionId !== 0) {
//            $.ajax({

//                //url: '@Url.Action("GetAllCollegeStudentIdsInaClass", "School")',
//                url: '/School/GetAllSubjectBySchoolClasses?ClassId=' + parseInt(classId),
//                type: 'POST',

//                async: false,

//                data: { 'ClassId': classId },

//                success: function (data) {

//                    var items = '<option>SELECT SUBJECT</option>';

//                    $.each(data, function (i, sub) {

//                        items += "<option value='" + sub.Value + "'>" + sub.Text + "</option>";

//                    });

//                    $('#SubjectId').html(items);

//                }

//            });

//        }

//        else {

//            var items = '<option>SELECT SUBJECT</option>';

//            $('#SubjectId').html(items);

//        }

//    }
//    $("#SchSessionId").change(function () {
//        //debugger
//        if ($(this).val() !== '') {
//            sessionId = $(this).val();
//        }
//    });
//    $("#ClassId").change(function () {
//        if ($(this).val() !== '' && sessionId !== 0) {
//            getStudents($(this).val(), sessionId);
//            getSubjects($(this).val(), classId);
//        }
//    });
//});
var ca1Max = '';
var ca2Max = '';
var ca3Max = '';
var ca4Max = '';
var examMax = '';
var totalCAMax = '';
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

function classResult(schoolId, schSessionId, termId, classId) {
    getMaxScore();
    debugger
    $.ajax({
        url: '/School/GetClassReportCard?SchoolId=' + schoolId + '&SchSessionId=' + schSessionId + '&TermId=' + termId + '&ClassId=' + classId,
        type: 'POST',
        async: false,
        dataType: 'json',
        //success : function(obj){
        //    $.each(obj.data , function(key , value){ // First Level
        //        $.each(value.stars , function(k , v ){  // The contents inside stars
        //            var rows = '';
        //            console.log(v)
        //        });     
        //    });
        //}

        //$.each(tdata[i]['Countries'], function (index, value) {
        //    rows += '<li>' + value + '</li>';
        //});

        success: function (data) {
            var rows = '';
            for (var i = 0; i < data.length; i++) {

                $.each(data[i], function (j, item) {
                    ////////School logo, Name and student passport////////
                    rows += "<tr>"
                    rows += "<td colspan=2 rowspan=7 height='149' align='center' bgcolor='#FFFFFF'><font color='#000000'>" + "item.SchoolLogo" + "<br></font></td>"
                    rows += "<td colspan=7 align='center' sdval='0' sdnum='1033;'><b><font face='Arial Rounded MT Bold' size=3 color='#000000'>" + "item.SchoolName" + "</font></b></td>"
                    rows += "<td colspan=2 rowspan=7 height='149' align='center' width='200'><font color='#000000'>" + "item.StudentPassport " + "<br></font></td>"
                    rows += "</tr>";

                    rows += "<tr>"
                    rows += "<td colspan=2 align='right'><font color='#000000'>MOTTO: </font></td>"
                    rows += "<td colspan=5 align='left' sdval='0' sdnum='1033;'><b><font color='#000000'>" + "item.SchoolMotto" + "</font></b></td>"
                    rows += "</tr>";

                    rows += "<tr>"
                    rows += "<td colspan=7 align='center' sdval='0' sdnum='1033;'><b><font color='#000000'>" + "item.SchoolAddress" + "</font></b></td>"
                    rows += "</tr>";

                    rows += "<tr>"
                    rows += "<td colspan=7 align='center' sdval='0' sdnum='1033;'><b><font color='#000000'>" + "item.SchoolPosterAddress" + "</font></b></td>"
                    rows += "</tr>";

                    rows += "<tr>"
                    rows += "<td colspan=2 align='right'><font color='#000000'>NAME: </font></td>"
                    rows += "<td colspan=5 align='left' sdval='0' sdnum='1033;'><b><font color='#000000'>" + "item.StudentName" + "</font></b></td>"
                    rows += "</tr>";

                    rows += "<tr>"
                    rows += "<td colspan=2 align='right'><font color='#000000'>Class: </font></td>"
                    rows += "<td colspan=5 align='left' sdval='0' sdnum='1033;'><b><font color='#000000'>" + "item.Class" + "</font></b></td>"
                    rows += "</tr>";

                    rows += "<tr>"
                    rows += "<td colspan=2 align='right'><font color='#000000'>ADMIN. NO.: </font></td>"
                    rows += "<td colspan=5 align='left' sdval='0' sdnum='1033;'><b><font color='#000000'>" + item.UniqueId + "</font></b></td>"
                    rows += "</tr>";

                    rows += "<tr>"
                    rows += "<td height='81' align='left'><font color='#000000'><br></font></td>"
                    rows += "<td align='left'><font color='#000000'><br></font></td>"
                    rows += "<td align='left'><font color='#000000'><br></font></td>"
                    rows += "<td align='left'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'>CONTINUOUS ASSESSMENT</font></td>"
                    rows += "<td align='center'><font color='#000000'>EXAM</font></td>"
                    rows += "<td align='center'><font color='#000000'>TOTAL</font></td>"
                    rows += "<td align='center'><font color='#000000'>nth/SUB.</font></td>"
                    rows += "<td align='center'><font size=3 color='#000000'>GRADE</font></td>"
                    rows += "<td colspan=2 align='center'><font color='#000000'>REMARK</font></td>"
                    rows += "</tr>";

                    rows += "<tr>"
                    rows += "<td colspan=3 height='22' align='left'><b><font size=3 color='#000000'>  SUBJECT</font></b></td>"
                    rows += "<td align='left'><b><font color='#000000'>MAX MARK</font></b></td>"
                    rows += "<td align='center' sdval='40' sdnum='1033;'><font color='#000000'>" + totalCAMax + "</font></td>"
                    rows += "<td align='center' sdval='60' sdnum='1033;'><font color='#000000'>" + examMax + "</font></td>"
                    rows += "<td align='center' sdval='100' sdnum='1033;'><font color='#000000'>100</font></td>"
                    rows += "<td align='left' bgcolor='#000000'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=3 align='left' bgcolor='#000000'><font color='#000000'><br></font></td>"
                    rows += "</tr>"
                    //////////// Subject, Continous Assessment and Exam Score
                    if (item.SubjectId === 3) {
                        //// Enlglish////// 1
                        rows += "<tr>"
                        rows += "<td colspan=4 height='21' align='left'><font color='#000000'>ENGLISH<br></font></td>"
                        rows += "<td align='center'><font color='#000000'>" + item.CATotal + "<br></font></td>"
                        rows += "<td align='center'><font color='#000000'>" + item.Exam + "<br></font></td>"
                        rows += "<td align='center'><font color='#000000'>" + item.Total + "<br></font></td>"
                        rows += "<td align='center'><font color='#000000'>DD<br></font></td>"
                        rows += "<td align='center'><font color='#000000'>" + item.Grade + "<br></font></td>"
                        rows += "<td colspan=2 align='center'><font color='#000000'>" + item.Remark + "<br></font></td>"
                        rows += "</tr>"
                    }
                    if (item.SubjectId === 4) {
                        //// Maths////// 2
                        rows += "<tr>"
                        rows += "<td colspan=4 height='21' align='left'><font color='#000000'>MATHEMATICS<br></font></td>"
                        rows += "<td align='center'><font color='#000000'>" + item.CATotal + "<br></font></td>"
                        rows += "<td align='center'><font color='#000000'>" + item.Exam + "<br></font></td>"
                        rows += "<td align='center'><font color='#000000'>" + item.Total + "<br></font></td>"
                        rows += "<td align='center'><font color='#000000'><br></font></td>"
                        rows += "<td align='center'><font color='#000000'>" + item.Grade + "<br></font></td>"
                        rows += "<td colspan=2 align='center'><font color='#000000'>" + item.Remark + "<br></font></td>"
                        rows += "</tr>"
                    }

                    //// COMPUTER/IT////// 3
                    rows += "<tr>"
                    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>COMPUTER/IT<br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
                    rows += "</tr>"

                    //// Economics////// 4
                    rows += "<tr>"
                    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>ECONOMICS<br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
                    rows += "</tr>"


                    //// RELIGION AND MORAL EDUCATION (CRK/IRK)////// 5
                    rows += "<tr>"
                    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>RELIGION AND MORAL EDUCATION (CRK/IRK)<br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
                    rows += "</tr>"

                    //// PHYSICS////// 6
                    rows += "<tr>"
                    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>PHYSICS<br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
                    rows += "</tr>"

                    //// CHEMISTRY////// 7
                    rows += "<tr>"
                    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>CHEMISTRY<br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
                    rows += "</tr>"

                    //// BIOLOGY////// 8
                    rows += "<tr>"
                    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>BIOLOGY<br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
                    rows += "</tr>"

                    //// AGRICULTURAL SCIENCE////// 9
                    rows += "<tr>"
                    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>AGRICULTURAL SCIENCE<br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
                    rows += "</tr>"

                    //// FINANCIAL ACCOUNT////// 10
                    rows += "<tr>"
                    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>FINANCIAL ACCOUNT<br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
                    rows += "</tr>"

                    //// COMMERCE////// 11
                    rows += "<tr>"
                    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>COMMERCE<br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
                    rows += "</tr>"

                    //// GEOGRAPHY////// 12
                    rows += "<tr>"
                    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>GEOGRAPHY<br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
                    rows += "</tr>"


                    //// GOVERNMENT////// 13
                    rows += "<tr>"
                    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>GOVERNMENT<br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
                    rows += "</tr>"

                    //// HISTORY////// 14
                    rows += "<tr>"
                    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>HISTORY<br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
                    rows += "</tr>"

                    //// TECHNICAL DRAWING/ BUILDING CONTRUCTION////// 15
                    rows += "<tr>"
                    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>TECHNICAL DRAWING/ BUILDING CONTRUCTION<br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
                    rows += "</tr>"

                    //// WOOD/METAL WORK////// 16
                    rows += "<tr>"
                    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>WOOD/METAL WORK<br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
                    rows += "</tr>"

                    //// WOOD/METAL WORK////// 17
                    rows += "<tr>"
                    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>WOOD/METAL WORK<br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
                    rows += "</tr>"

                    //// LITERATURE IN ENGLISH////// 18
                    rows += "<tr>"
                    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>LITERATURE IN ENGLISH<br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
                    rows += "</tr>"

                    //// HOME MANAGEMENT////// 19
                    rows += "<tr>"
                    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>HOME MANAGEMENT<br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
                    rows += "</tr>"

                    //// CLOTH AND TEXTILE////// 20
                    rows += "<tr>"
                    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>CLOTH AND TEXTILE<br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
                    rows += "</tr>"

                    //// NIGERIAN LANGUAGE////// 21
                    rows += "<tr>"
                    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>NIGERIAN LANGUAGE<br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
                    rows += "</tr>"

                    //// MUSIC////// 22
                    rows += "<tr>"
                    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>MUSIC<br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
                    rows += "</tr>"

                    //// VISUAL ARTS////// 23
                    rows += "<tr>"
                    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>VISUAL ARTS<br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td align='center'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
                    rows += "</tr>"


                    rows += "<tr>"
                    rows += "<td colspan=2 height='21' align='left'><font color='#000000'>  GRAND TOTAL:</font></td>"
                    rows += "<td align='left'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=8 align='left'><font color='#000000'>nth/Sub. → Position Per Subject</font>"
                    rows += "</td>"
                    rows += "</tr>"

                    rows += "<tr>"
                    rows += "<td colspan=2 height='21' align='left'><font color='#000000'>  PERCENTAGE:</font></td>"
                    rows += "<td align='left'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=6 align='left'><font color='#000000'>POSITION IN CLASS:</font></td>"
                    rows += "<td colspan=2 align='left'><font color='#000000'><br></font></td>"
                    rows += "</tr>"

                    rows += "<tr>"
                    rows += "<td colspan=2 height='21' align='left'><font color='#000000'>  ATTENDANCE:</font></td>"
                    rows += "<td align='left'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=8 align='left'><font color='#000000'>TOTAL NO. OF STUDENTS IN CLASS:</font></td>"
                    rows += "</tr>"

                    rows += "<tr>"
                    rows += "<td colspan=3 height='22' align='center'><b><font size=3 color='#000000'>   AFFECTIVE DOMAIN</font></b></td>"
                    rows += "<td align='center'><b><font size=3 color='#000000'>RATING</font></b></td>"
                    rows += "<td colspan=5 align='center'><b><font size=3 color='#000000'>PSYCHOMOTOR DOMAIN</font></b></td>"
                    rows += "<td colspan=2 align='center'><b><font size=3 color='#000000'>RATING</font></b></td>"
                    rows += "</tr>"

                    rows += "<tr>"
                    rows += "<td colspan=3 height='20' align='left'><font color='#000000'>  PUNCTUALITY</font></td>"
                    rows += "<td align='left'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=5 align='left'><font color='#000000'>DRAWING AND PAINTING</font></td>"
                    rows += "<td colspan=2 align='left'><font color='#000000'><br></font></td>"
                    rows += "</tr>"

                    rows += "<tr>"
                    rows += "<td colspan=3 height='20' align='left'><font color='#000000'>  NEATNESS</font></td>"
                    rows += "<td align='left'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=5 align='left'><font color='#000000'>GAMES</font></td>"
                    rows += "<td colspan=2 align='left'><font color='#000000'><br></font></td>"
                    rows += "</tr>"

                    rows += "<tr>"
                    rows += "<td colspan=3 height='20' align='left'><font color='#000000'>  POLITENESS</font></td>"
                    rows += "<td align='left'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=5 align='left'><font color='#000000'>SPORTS</font></td>"
                    rows += "<td colspan=2 align='left'><font color='#000000'><br></font></td>"
                    rows += "</tr>"

                    rows += "<tr>"
                    rows += "<td colspan=3 height='20' align='left'><font color='#000000'>  INITIATIVE</font></td>"
                    rows += "<td align='left'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=5 align='left'><font color='#000000'>HANDLING TOOLS</font></td>"
                    rows += "<td colspan=2 align='left'><font color='#000000'><br></font></td>"
                    rows += "</tr>"

                    rows += "<tr>"
                    rows += "<td colspan=3 height='20' align='left'><font color='#000000'>  COOPERATION WITH OTHERS</font></td>"
                    rows += "<td align='left'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=5 align='left'><font color='#000000'>HAND WRITING</font></td>"
                    rows += "<td colspan=2 align='left'><font color='#000000'><br></font></td>"
                    rows += "</tr>"

                    rows += "<tr>"
                    rows += "<td colspan=3 height='20' align='left'><font color='#000000'>  LEADERSHIP TRAITS</font></td>"
                    rows += "<td align='left'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=5 align='left'><font color='#000000'>MUSICAL SKILLS</font></td>"
                    rows += "<td colspan=2 align='left'><font color='#000000'><br></font></td>"
                    rows += "</tr>"

                    rows += "<tr>"
                    rows += "<td colspan=3 height='21' align='left'><font color='#000000'>  HELPING OTHERS</font></td>"
                    rows += "<td align='left'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=5 align='left'><font color='#000000'>VERBAL FLUENCY</font></td>"
                    rows += "<td colspan=2 align='left'><font color='#000000'><br></font></td>"
                    rows += "</tr>"

                    rows += "<tr>"
                    rows += "<td colspan=3 height='21' align='left'><font color='#000000'>  EMOTIONAL STABILITY</font></td>"
                    rows += "<td align='left'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=7 align='center'><b><font color='#000000'>STUDENT'S CORE SUBJECTS ANALYSIS</font></b></td>"
                    rows += "</tr>"
                    ///////////////////////////////////////rowspan=9 
                    rows += "<tr>"
                    rows += "<td colspan=3 height='20' align='left'><font color='#000000'> HONESTY</font></td>"
                    rows += "<td align='left'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=7 rowspan=9 align='left'><font color='#000000'><br></font></td>"
                    rows += "</tr>"
                    ///////////////////////////////
                    rows += "<tr>"
                    rows += "<td colspan=3 height='20' align='left'><font color='#000000'>  ATTITUDE TO SCHOOL WORKS</font></td>"
                    rows += "<td align='left'><font color='#000000'><br></font></td>"
                    rows += "</tr>"

                    rows += "<tr>"
                    rows += "<td colspan=3 height='20' align='left'><font color='#000000'>  ATTENTIVENESS</font></td>"
                    rows += "<td align='left'><font color='#000000'><br></font></td>"
                    rows += "</tr>"


                    rows += "<tr>"
                    rows += "<td colspan=3 height='20' align='left'><font color='#000000'>  PERSEVERANCE</font></td>"
                    rows += "<td align='left'><font color='#000000'><br></font></td>"
                    rows += "</tr>"


                    rows += "<tr>"
                    rows += "<td colspan=3 height='21' align='left'><font color='#000000'>  RELATIONSHIP WITH OTHERS</font></td>"
                    rows += "<td align='left'><font color='#000000'><br></font></td>"
                    rows += "</tr>"


                    rows += "<tr>"
                    rows += "<td colspan=4 height='21' align='center'><b><font color='#000000'>SCALE (OF OBSERVABLE TRAIT)</font></b></td>"
                    rows += "</tr>"


                    rows += "<tr>"
                    rows += "<td colspan=2 height='21' align='left'><font color='#000000'>  5 - EXCELLENT DEGREE </font></td>"
                    rows += "<td colspan=2 align='left'><font color='#000000'>4 - GOOD LEVEL</font></td>"
                    rows += "</tr>"


                    rows += "<tr>"
                    rows += "<td colspan=2 height='21' align='left'><font color='#000000'>  3- FAIR BUT ACCEPTABLE</font></td>"
                    rows += "<td colspan=2 align='left'><font color='#000000'>2 - POOR LEVEL</font></td>"
                    rows += "</tr>"


                    rows += "<tr>"
                    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>  1 - NO OBSERVABLE TRAIT</font></td>"
                    rows += "</tr>"


                    rows += "<tr>"
                    rows += "<td colspan=4 height='21' align='center'><b><font color='#000000'><br></font></b></td>"
                    rows += "<td colspan=7 align='center'><b><font color='#000000'>PRINCIPAL'S REMARK</font></b></td>"
                    rows += "</tr>"


                    rows += "<tr>"
                    rows += "<td height='21' align='left'><font color='#000000'><br></font></td>"
                    rows += "<td align='left'><font color='#000000'><br></font></td>"
                    rows += "<td align='left'><font color='#000000'><br></font></td>"
                    rows += "<td align='left'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=7 rowspan=2 align='left'><font color='#000000'><br></font></td>"
                    rows += "</tr>"


                    rows += "<tr>"
                    rows += "<td height='21' align='left'><font color='#000000'><br></font></td>"
                    rows += "<td align='left'><font color='#000000'><br></font></td>"
                    rows += "<td align='left'><font color='#000000'><br></font></td>"
                    rows += "<td align='left'><font color='#000000'><br></font></td>"
                    rows += "</tr>"


                    rows += "<tr>"
                    rows += "<td height='21' align='left'><font color='#000000'><br></font></td>"
                    rows += "<td align='left'><font color='#000000'><br></font></td>"
                    rows += "<td align='left'><font color='#000000'><br></font></td>"
                    rows += "<td align='left'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=7 align='center'><b><font color='#000000'>CLASS TEACHER'S REMARK</font></b></td>"
                    rows += "</tr>"


                    rows += "<tr>"
                    rows += "<td height='21' align='left'><font color='#000000'><br></font></td>"
                    rows += "<td align='left'><font color='#000000'><br></font></td>"
                    rows += "<td align='left'><font color='#000000'><br></font></td>"
                    rows += "<td align='left'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=7 rowspan=2 align='left'><font color='#000000'><br></font></td>"
                    rows += "</tr>"


                    rows += "<tr>"
                    rows += "<td height='21' align='left'><font color='#000000'><br></font></td>"
                    rows += "<td align='left'><font color='#000000'><br></font></td>"
                    rows += "<td align='left'><font color='#000000'><br></font></td>"
                    rows += "<td align='left'><font color='#000000'><br></font></td>"
                    rows += "</tr>"


                    rows += "<tr>"
                    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>  TERM ENDED:</font></td>"
                    rows += "<td colspan=7 align='left'><font color='#000000'>NEXT TERM BEGINS:</font></td>"
                    rows += "</tr>"


                    rows += "<tr>"
                    rows += "<td rowspan=2 height='41' align='center'><font color='#000000'>  DATE ISSUED:</font></td>"
                    rows += "<td colspan=2 rowspan=2 align='left'><font color='#000000'><br></font></td>"
                    rows += "<td colspan=2 rowspan=2 align='left'><font color='#000000'>PRINCIPAL:………………………..</font></td>"
                    rows += "<td colspan=3 rowspan=2 align='left'><font color='#000000'>CLASS TEACHER:…………………..</font></td>"
                    rows += "<td colspan=3 rowspan=2 align='left'><font color='#000000'>PARENT:………………………….</font></td>"
                    rows += "</tr>"
                    rows += "<tr>" + "</tr>"
                    $("#reportCard").html(rows);

                });
            }


            console.log(items);
            //var rows = '';
            //$.each(data, function (i, item) {
            //    ////////School logo, Name and student passport////////
            //    rows += "<tr>"
            //    rows += "<td colspan=2 rowspan=7 height='149' align='center' bgcolor='#FFFFFF'><font color='#000000'>" + item.SchoolLogo + "<br></font></td>"
            //    rows += "<td colspan=7 align='center' sdval='0' sdnum='1033;'><b><font face='Arial Rounded MT Bold' size=3 color='#000000'>" + item.SchoolName + "</font></b></td>"
            //    rows += "<td colspan=2 rowspan=7 height='149' align='center' width='200'><font color='#000000'>" + item.StudentPassport + "<br></font></td>"
            //    rows += "</tr>";

            //    rows += "<tr>"
            //    rows += "<td colspan=2 align='right'><font color='#000000'>MOTTO: </font></td>"
            //    rows += "<td colspan=5 align='left' sdval='0' sdnum='1033;'><b><font color='#000000'>" + item.SchoolMotto + "</font></b></td>"
            //    rows += "</tr>";

            //    rows += "<tr>"
            //    rows += "<td colspan=7 align='center' sdval='0' sdnum='1033;'><b><font color='#000000'>" + item.SchoolAddress + "</font></b></td>"
            //    rows += "</tr>";

            //    rows += "<tr>"
            //    rows += "<td colspan=7 align='center' sdval='0' sdnum='1033;'><b><font color='#000000'>" + item.SchoolPosterAddress + "</font></b></td>"
            //    rows += "</tr>";

            //    rows += "<tr>"
            //    rows += "<td colspan=2 align='right'><font color='#000000'>NAME: </font></td>"
            //    rows += "<td colspan=5 align='left' sdval='0' sdnum='1033;'><b><font color='#000000'>" + item.StudentName + "</font></b></td>"
            //    rows += "</tr>";

            //    rows += "<tr>"
            //    rows += "<td colspan=2 align='right'><font color='#000000'>Class: </font></td>"
            //    rows += "<td colspan=5 align='left' sdval='0' sdnum='1033;'><b><font color='#000000'>" + item.Class + "</font></b></td>"
            //    rows += "</tr>";

            //    rows += "<tr>"
            //    rows += "<td colspan=2 align='right'><font color='#000000'>ADMIN. NO.: </font></td>"
            //    rows += "<td colspan=5 align='left' sdval='0' sdnum='1033;'><b><font color='#000000'>" + item.UniqueId + "</font></b></td>"
            //    rows += "</tr>";

            //    rows += "<tr>"
            //    rows += "<td height='81' align='left'><font color='#000000'><br></font></td>"
            //    rows +=   "<td align='left'><font color='#000000'><br></font></td>"
            //    rows +=   "<td align='left'><font color='#000000'><br></font></td>"
            //    rows +=   "<td align='left'><font color='#000000'><br></font></td>"
            //    rows +=   "<td align='center'><font color='#000000'>CONTINUOUS ASSESSMENT</font></td>"
            //    rows +=   "<td align='center'><font color='#000000'>EXAM</font></td>"
            //    rows +=  "<td align='center'><font color='#000000'>TOTAL</font></td>"
            //    rows +=  "<td align='center'><font color='#000000'>nth/SUB.</font></td>"
            //    rows +=  "<td align='center'><font size=3 color='#000000'>GRADE</font></td>"
            //    rows += "<td colspan=2 align='center'><font color='#000000'>REMARK</font></td>"
            //    rows += "</tr>";

            //    rows += "<tr>"
            //    rows += "<td colspan=3 height='22' align='left'><b><font size=3 color='#000000'>  SUBJECT</font></b></td>"
            //    rows += "<td align='left'><b><font color='#000000'>MAX MARK</font></b></td>"
            //    rows += "<td align='center' sdval='40' sdnum='1033;'><font color='#000000'>40</font></td>"
            //    rows += "<td align='center' sdval='60' sdnum='1033;'><font color='#000000'>60</font></td>"
            //    rows += "<td align='center' sdval='100' sdnum='1033;'><font color='#000000'>100</font></td>"
            //    rows += "<td align='left' bgcolor='#000000'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=3 align='left' bgcolor='#000000'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"
            //    //////////// Subject, Continous Assessment and Exam Score
            //    //// Enlglish////// 1
            //    rows += "<tr>"
            //    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>ENGLISH<br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"
            //    //// Maths////// 2
            //    rows += "<tr>"
            //    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>MATHEMATICS<br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"

            //    //// COMPUTER/IT////// 3
            //    rows += "<tr>"
            //    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>COMPUTER/IT<br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"

            //    //// Economics////// 4
            //    rows += "<tr>"
            //    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>ECONOMICS<br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"


            //    //// RELIGION AND MORAL EDUCATION (CRK/IRK)////// 5
            //    rows += "<tr>"
            //    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>RELIGION AND MORAL EDUCATION (CRK/IRK)<br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"

            //    //// PHYSICS////// 6
            //    rows += "<tr>"
            //    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>PHYSICS<br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"

            //    //// CHEMISTRY////// 7
            //    rows += "<tr>"
            //    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>CHEMISTRY<br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"

            //    //// BIOLOGY////// 8
            //    rows += "<tr>"
            //    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>BIOLOGY<br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"

            //    //// AGRICULTURAL SCIENCE////// 9
            //    rows += "<tr>"
            //    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>AGRICULTURAL SCIENCE<br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"

            //    //// FINANCIAL ACCOUNT////// 10
            //    rows += "<tr>"
            //    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>FINANCIAL ACCOUNT<br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"

            //    //// COMMERCE////// 11
            //    rows += "<tr>"
            //    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>COMMERCE<br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"

            //    //// GEOGRAPHY////// 12
            //    rows += "<tr>"
            //    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>GEOGRAPHY<br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"


            //    //// GOVERNMENT////// 13
            //    rows += "<tr>"
            //    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>GOVERNMENT<br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"

            //    //// HISTORY////// 14
            //    rows += "<tr>"
            //    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>HISTORY<br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"

            //    //// TECHNICAL DRAWING/ BUILDING CONTRUCTION////// 15
            //    rows += "<tr>"
            //    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>TECHNICAL DRAWING/ BUILDING CONTRUCTION<br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"

            //    //// WOOD/METAL WORK////// 16
            //    rows += "<tr>"
            //    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>WOOD/METAL WORK<br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"

            //    //// WOOD/METAL WORK////// 17
            //    rows += "<tr>"
            //    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>WOOD/METAL WORK<br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"

            //    //// LITERATURE IN ENGLISH////// 18
            //    rows += "<tr>"
            //    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>LITERATURE IN ENGLISH<br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"

            //    //// HOME MANAGEMENT////// 19
            //    rows += "<tr>"
            //    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>HOME MANAGEMENT<br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"

            //    //// CLOTH AND TEXTILE////// 20
            //    rows += "<tr>"
            //    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>CLOTH AND TEXTILE<br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"

            //    //// NIGERIAN LANGUAGE////// 21
            //    rows += "<tr>"
            //    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>NIGERIAN LANGUAGE<br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"

            //    //// MUSIC////// 22
            //    rows += "<tr>"
            //    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>MUSIC<br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"

            //    //// VISUAL ARTS////// 23
            //    rows += "<tr>"
            //    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>VISUAL ARTS<br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td align='center'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=2 align='center'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"


            //    rows += "<tr>"
            //    rows += "<td colspan=2 height='21' align='left'><font color='#000000'>  GRAND TOTAL:</font></td>"
            //    rows += "<td align='left'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=8 align='left'><font color='#000000'>nth/Sub. → Position Per Subject</font>"
            //    rows += "</td>"
            //    rows += "</tr>"

            //    rows += "<tr>"
            //    rows += "<td colspan=2 height='21' align='left'><font color='#000000'>  PERCENTAGE:</font></td>"
            //    rows += "<td align='left'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=6 align='left'><font color='#000000'>POSITION IN CLASS:</font></td>"
            //    rows += "<td colspan=2 align='left'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"

            //    rows += "<tr>"
            //    rows += "<td colspan=2 height='21' align='left'><font color='#000000'>  ATTENDANCE:</font></td>"
            //    rows += "<td align='left'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=8 align='left'><font color='#000000'>TOTAL NO. OF STUDENTS IN CLASS:</font></td>"
            //    rows += "</tr>"

            //    rows += "<tr>"
            //    rows += "<td colspan=3 height='22' align='center'><b><font size=3 color='#000000'>   AFFECTIVE DOMAIN</font></b></td>"
            //    rows += "<td align='center'><b><font size=3 color='#000000'>RATING</font></b></td>"
            //    rows += "<td colspan=5 align='center'><b><font size=3 color='#000000'>PSYCHOMOTOR DOMAIN</font></b></td>"
            //    rows += "<td colspan=2 align='center'><b><font size=3 color='#000000'>RATING</font></b></td>"
            //    rows += "</tr>"

            //    rows += "<tr>"
            //    rows += "<td colspan=3 height='20' align='left'><font color='#000000'>  PUNCTUALITY</font></td>"
            //    rows += "<td align='left'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=5 align='left'><font color='#000000'>DRAWING AND PAINTING</font></td>"
            //    rows += "<td colspan=2 align='left'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"

            //    rows += "<tr>"
            //    rows += "<td colspan=3 height='20' align='left'><font color='#000000'>  NEATNESS</font></td>"
            //    rows += "<td align='left'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=5 align='left'><font color='#000000'>GAMES</font></td>"
            //    rows += "<td colspan=2 align='left'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"

            //    rows += "<tr>"
            //    rows += "<td colspan=3 height='20' align='left'><font color='#000000'>  POLITENESS</font></td>"
            //    rows += "<td align='left'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=5 align='left'><font color='#000000'>SPORTS</font></td>"
            //    rows += "<td colspan=2 align='left'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"

            //    rows += "<tr>"
            //    rows += "<td colspan=3 height='20' align='left'><font color='#000000'>  INITIATIVE</font></td>"
            //    rows += "<td align='left'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=5 align='left'><font color='#000000'>HANDLING TOOLS</font></td>"
            //    rows += "<td colspan=2 align='left'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"

            //    rows += "<tr>"
            //    rows += "<td colspan=3 height='20' align='left'><font color='#000000'>  COOPERATION WITH OTHERS</font></td>"
            //    rows += "<td align='left'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=5 align='left'><font color='#000000'>HAND WRITING</font></td>"
            //    rows += "<td colspan=2 align='left'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"

            //    rows += "<tr>"
            //    rows += "<td colspan=3 height='20' align='left'><font color='#000000'>  LEADERSHIP TRAITS</font></td>"
            //    rows += "<td align='left'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=5 align='left'><font color='#000000'>MUSICAL SKILLS</font></td>"
            //    rows += "<td colspan=2 align='left'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"

            //    rows += "<tr>"
            //    rows += "<td colspan=3 height='21' align='left'><font color='#000000'>  HELPING OTHERS</font></td>"
            //    rows += "<td align='left'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=5 align='left'><font color='#000000'>VERBAL FLUENCY</font></td>"
            //    rows += "<td colspan=2 align='left'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"

            //    rows += "<tr>"
            //    rows += "<td colspan=3 height='21' align='left'><font color='#000000'>  EMOTIONAL STABILITY</font></td>"
            //    rows += "<td align='left'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=7 align='center'><b><font color='#000000'>STUDENT'S CORE SUBJECTS ANALYSIS</font></b></td>"
            //    rows += "</tr>"
            //    ///////////////////////////////////////rowspan=9 
            //    rows += "<tr>"
            //    rows += "<td colspan=3 height='20' align='left'><font color='#000000'> HONESTY</font></td>"
            //    rows += "<td align='left'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=7 rowspan=9 align='left'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"
            //    ///////////////////////////////
            //    rows += "<tr>"
            //    rows += "<td colspan=3 height='20' align='left'><font color='#000000'>  ATTITUDE TO SCHOOL WORKS</font></td>"
            //    rows += "<td align='left'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"

            //    rows += "<tr>"
            //    rows += "<td colspan=3 height='20' align='left'><font color='#000000'>  ATTENTIVENESS</font></td>"
            //    rows += "<td align='left'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"


            //    rows += "<tr>"
            //    rows += "<td colspan=3 height='20' align='left'><font color='#000000'>  PERSEVERANCE</font></td>"
            //    rows += "<td align='left'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"


            //    rows += "<tr>"
            //    rows += "<td colspan=3 height='21' align='left'><font color='#000000'>  RELATIONSHIP WITH OTHERS</font></td>"
            //    rows += "<td align='left'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"


            //    rows += "<tr>"
            //    rows += "<td colspan=4 height='21' align='center'><b><font color='#000000'>SCALE (OF OBSERVABLE TRAIT)</font></b></td>"
            //    rows += "</tr>"


            //    rows += "<tr>"
            //    rows += "<td colspan=2 height='21' align='left'><font color='#000000'>  5 - EXCELLENT DEGREE </font></td>"
            //    rows += "<td colspan=2 align='left'><font color='#000000'>4 - GOOD LEVEL</font></td>"
            //    rows += "</tr>"


            //    rows += "<tr>"
            //    rows += "<td colspan=2 height='21' align='left'><font color='#000000'>  3- FAIR BUT ACCEPTABLE</font></td>"
            //    rows += "<td colspan=2 align='left'><font color='#000000'>2 - POOR LEVEL</font></td>"
            //    rows += "</tr>"


            //    rows += "<tr>"
            //    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>  1 - NO OBSERVABLE TRAIT</font></td>"
            //    rows += "</tr>"


            //    rows += "<tr>"
            //    rows += "<td colspan=4 height='21' align='center'><b><font color='#000000'><br></font></b></td>"
            //    rows += "<td colspan=7 align='center'><b><font color='#000000'>PRINCIPAL'S REMARK</font></b></td>"
            //    rows += "</tr>"


            //    rows += "<tr>"
            //    rows += "<td height='21' align='left'><font color='#000000'><br></font></td>"
            //    rows += "<td align='left'><font color='#000000'><br></font></td>"
            //    rows += "<td align='left'><font color='#000000'><br></font></td>"
            //    rows += "<td align='left'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=7 rowspan=2 align='left'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"


            //    rows += "<tr>"
            //    rows += "<td height='21' align='left'><font color='#000000'><br></font></td>"
            //    rows += "<td align='left'><font color='#000000'><br></font></td>"
            //    rows += "<td align='left'><font color='#000000'><br></font></td>"
            //    rows += "<td align='left'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"


            //    rows += "<tr>"
            //    rows += "<td height='21' align='left'><font color='#000000'><br></font></td>"
            //    rows += "<td align='left'><font color='#000000'><br></font></td>"
            //    rows += "<td align='left'><font color='#000000'><br></font></td>"
            //    rows += "<td align='left'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=7 align='center'><b><font color='#000000'>CLASS TEACHER'S REMARK</font></b></td>"
            //    rows += "</tr>"


            //    rows += "<tr>"
            //    rows += "<td height='21' align='left'><font color='#000000'><br></font></td>"
            //    rows += "<td align='left'><font color='#000000'><br></font></td>"
            //    rows += "<td align='left'><font color='#000000'><br></font></td>"
            //    rows += "<td align='left'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=7 rowspan=2 align='left'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"


            //    rows += "<tr>"
            //    rows += "<td height='21' align='left'><font color='#000000'><br></font></td>"
            //    rows += "<td align='left'><font color='#000000'><br></font></td>"
            //    rows += "<td align='left'><font color='#000000'><br></font></td>"
            //    rows += "<td align='left'><font color='#000000'><br></font></td>"
            //    rows += "</tr>"


            //    rows += "<tr>"
            //    rows += "<td colspan=4 height='21' align='left'><font color='#000000'>  TERM ENDED:</font></td>"
            //    rows += "<td colspan=7 align='left'><font color='#000000'>NEXT TERM BEGINS:</font></td>"
            //    rows += "</tr>"


            //    rows += "<tr>"
            //    rows += "<td rowspan=2 height='41' align='center'><font color='#000000'>  DATE ISSUED:</font></td>"
            //    rows += "<td colspan=2 rowspan=2 align='left'><font color='#000000'><br></font></td>"
            //    rows += "<td colspan=2 rowspan=2 align='left'><font color='#000000'>PRINCIPAL:………………………..</font></td>"
            //    rows += "<td colspan=3 rowspan=2 align='left'><font color='#000000'>CLASS TEACHER:…………………..</font></td>"
            //    rows += "<td colspan=3 rowspan=2 align='left'><font color='#000000'>PARENT:………………………….</font></td>"
            //    rows += "</tr>"
            //    rows += "<tr>" + "</tr>"
            //    $("#reportCard").html(rows);

            //});

        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
}

$('#PullClassResult').on('click', function (e) {
    // debugger
    var schSessionId = $('#SchSessionId').val();
    var schoolId = $("#SchoolId").val();
    var termId = $("#TermId").val();
    var classId = $('#ClassId').val();

    classResult(schoolId, schSessionId, termId, classId);
});