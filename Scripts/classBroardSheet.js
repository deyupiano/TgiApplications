
function postClassBroardSheet(schoolId, schSessionId, termId, classId) {
    if (schoolId !== "" && schSessionId !== "" && termId !== "" && classId !== "") {
        debugger
        $.ajax({
            url: '/School/PostClassBroardSheet?SchoolId=' + schoolId + '&SchSessionId=' + schSessionId + '&TermId=' + termId + '&ClassId=' + classId,
            type: 'POST',

            async: false,

            data: { 'SchoolId': schoolId, 'SchSessionId': schSessionId,'TermId=' : termId, 'ClassId': classId },

            success: function (data) {
                debugger
                alert(data);
                //updateClassBroardSheet(schoolId, schSessionId, termId, classId);
            },
            error: function (err) {
                alert("Error: " + err.responseText);
            }

        });

    }

}

function updateClassBroardSheet(schoolId, schSessionId, termId, classId) {
    if (schoolId !== "" && schSessionId !== "" && termId !== "" && classId !== "") {
        debugger
        $.ajax({
            url: '/School/UpdateClassBroardSheet?SchoolId=' + schoolId + '&SchSessionId=' + schSessionId + '&TermId=' + termId + '&ClassId=' + classId,
            type: 'POST',

            async: false,

            data: { 'SchoolId': schoolId, 'SchSessionId': schSessionId, 'TermId=': termId, 'ClassId': classId },

            success: function (data) {
                alert(data);
            },
            error: function (err) {
                alert("Error: " + err.responseText);
            }

        });

    }

}
var SchoolName ='';
var SchoolLogo = '';
var SchoolMotto = '';
var SchoolPhoneNo = '';
var SchoolAddress = '';
var SchoolWebsite = '';
var SchoolEmail = '';
function getSchoolDetails(schoolId) {
    schoolId = $('#SchoolId').val();
    //debugger
    $.ajax({
        url: '/School/GetSchoolDetails?SchoolId=' + schoolId,
        type: 'POST',
        async: false,
        data: { 'SchoolId': schoolId},
        success: function (data) {
            for (var j = 0; j < data.length; j++) {
                SchoolName = data[j].SchoolName;
                SchoolLogo = data[j].SchoolLogo;
                SchoolPhoneNo = data[j].SchoolPhoneNo;
                SchoolAddress = data[j].SchoolAddresss;
                SchoolWebsite = data[j].SchoolWebsite;
                SchoolEmail = data[j].SchoolEmail;
                SchoolMotto = data[j].SchoolMotto;
            }
        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }

    });
}
$("#PullClassResult").click(function () {

    //debugger
    var schoolId = $('#SchoolId').val();
    var schSessionId = $('#SchSessionId').val();
    var termId = $('#TermId').val();
    var classId = $('#ClassId').val();
    var classArm= $('#ClassArm').val();
    getCollegeStudentResultList(schoolId, schSessionId, termId, classId, classArm);
    getSchoolDetails(schoolId);
})
var mybarChart = '';
var subj1 = 'Eng';
var subj2 = 'Maths';
var subj3 = 'Economics';
var subj4 = '';
var subj5 = '';
var subj6 = '';
var subj7 = '';

var subjv1 = '';
var subjv2 = '';
var subjv3 = '';
var subjv4 = '';
var subjv5 = '';
var subjv6 = '';
var subjv7 = '';
$("#GetClassReportCard").click(function () {
    var schoolId = $('#SchoolId').val();
    var schSessionId = $('#SchSessionId').val();
    var termId = $('#TermId').val();
    var classId = $('#ClassId').val();
    var classArm = $('#ClassArm').val();
    getSchoolDetails(schoolId);
    getClassReportCard(schoolId, schSessionId, termId, classId, classArm);
    if (classArm === "Science") {
        subj4 = "Physics";
        subj5 = "Chemistry";
        subj6 = "Biology";
    } else if (classArm === "Commercial") {
        subj4 = "Account";
        subj5 = "Commerce";
        subj6 = "Biology";
    } else if (classArm === "Art") {
        subj4 = "Goverment";
        subj5 = "History";
        subj6 = "Literature";
    } else if (classArm === "Technical") {
        subj4 = "Physics";
        subj5 = "Chemistry";
        subj6 = "T-Drawing";
    }
    //var k = i + 1;
    //for (var c = 0; c < k ; c++) {
    //    ctx = document.getElementById("Chart" + c);
    //    //drawBar();
    //    mybarChart = new Chart(ctx, {
    //        type: 'bar',
    //        data: {
    //            labels: [subj1, subj2, subj3, subj4, subj5, subj6],
    //            datasets: [{
    //                label: 'Lowest - Score',
    //                backgroundColor: "#26B99A",
    //                data: [51, 50, 41, 58, 45, 50]
    //            }, {
    //                label: 'Your - Score',
    //                backgroundColor: "#FF1493",
    //                data: [subjv1, subjv2, subjv3, subjv4, subjv5, subjv6]
    //            }, {
    //                label: 'Highest - Score',
    //                backgroundColor: "#007ACC",
    //                data: [95, 82, 98, 88, 72, 65]
    //            }]
    //        },


    //        options: {
    //            scales: {
    //                yAxes: [{
    //                    ticks: {
    //                        beginAtZero: true
    //                    }
    //                }]
    //            }
    //        }
    //    });
    //}

})

$(document).ready(function () {
    $(function () {

        function groupTable($rows, startIndex, total) {
            if (total === 0) {
                return;
            }
            var i, currentIndex = startIndex, count = 1, lst = [];
            var tds = $rows.find('td:eq(' + currentIndex + ')');
            var ctrl = $(tds[0]);
            lst.push($rows[0]);
            for (i = 1; i <= tds.length; i++) {
                if (ctrl.text() === $(tds[i]).text()) {
                    count++;
                    $(tds[i]).addClass('deleted');
                    lst.push($rows[i]);
                }
                else {
                    if (count > 1) {
                        ctrl.attr('rowspan', count);
                        groupTable($(lst), startIndex + 1, total - 1)
                    }
                    count = 1;
                    lst = [];
                    ctrl = $(tds[i]);
                    lst.push($rows[i]);
                }
            }
        }
        groupTable($('#result tr:has(td)'), 0, 3);
        $('#result .deleted').remove();
    });
});
var uniqueId ='';
var student = '';
var ctx = '';
function GetStudentName(uniqueId) {
    //debugger
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
}


function drawBar() {
    debugger
    ctx = document.getElementById("Chart");
    //drawBar();
    mybarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [subj1, subj2, subj3, subj4, subj5, subj6],
            datasets: [{
                label: 'Lowest - Score',
                backgroundColor: "#26B99A",
                data: [51, 50, 41, 58, 45, 50]
            }, {
                label: 'Your - Score',
                backgroundColor: "#FF1493",
                data: [subjv1, subjv2, subjv3, subjv4, subjv5, subjv6]
            }, {
                label: 'Highest - Score',
                backgroundColor: "#007ACC",
                data: [95, 82, 98, 88, 72, 65]
            }]
        },


        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    //var chart = new CanvasJS.Chart("chartContainer", {
    //    title: {
    //        text: "Fruits sold in First & Second Quarter"
    //    },

    //    data: [  //array of dataSeries     
    //    { //dataSeries - first quarter
    //        /*** Change type "column" to "bar", "area", "line" or "pie"***/
    //        type: "column",
    //        name: "First Quarter",
    //        dataPoints: [
    //        { label: "banana", y: 18 },
    //        { label: "orange", y: 29 },
    //        { label: "apple", y: 40 },
    //        { label: "mango", y: 34 },
    //        { label: "grape", y: 24 }
    //        ]
    //    },
    //   { //dataSeries - second quarter

    //       type: "column",
    //       name: "Second Quarter",
    //       dataPoints: [
    //       { label: "banana", y: 23 },
    //       { label: "orange", y: 33 },
    //       { label: "apple", y: 48 },
    //       { label: "mango", y: 37 },
    //       { label: "grape", y: 20 }
    //       ]
    //   }
    //    ]
    //});
    //chart.render();
}
var rank = 1;
var count = 1;
var currentMax = '';
var firstMax = '';
var lastMax = '';
var firsttRank = '';
var lastRank = '';
var currentRank = '';
var nextRank = '';
               
var r = '';
function getCollegeStudentResultList(schoolId, schSessionId, termId, classId,classArm) {
   // debugger
    $.ajax({
        url: '/School/GetClassBroardSheet?SchoolId=' + schoolId + '&SchSessionId=' + schSessionId + '&TermId=' + termId + '&ClassId=' + classId + '&ClassArm=' + classArm,
        type: 'POST',

        async: false,

        data: { 'SchoolId': schoolId, 'SchSessionId': schSessionId, 'TermId=': termId, 'ClassId': classId, 'ClassArm': classArm },
        success: function (data) {
            var rows = '';
            rows += "<table cellspacing='0' border='0'>"
            rows += "<colgroup span='108' width='94'></colgroup>"
            rows += "<tr>"
            rows += "<td class='tdSchool' align='left'><font color='#000000'><br>SCHOOL:</font></td>"
            rows += "<td class='tdSchool' align='left'><font color='#000000'><br>" + SchoolName + "</font></td>"
            rows += "<td class='tdSchool'  align='left'><font color='#000000'><br>SESSION:</font></td>"
            rows += "<td colspan=4 class='tdSchool'  align='left'><font color='#000000'><br>" + $('#SchSessionId').val() + "</font></td>"
            rows += "<td class='tdSchool' class='tdTerm' align='left'><font color='#000000'><br>TERM:</font></td>"
            rows += "<td colspan=4 class='tdSchool' class='tdTerm' align='left'><font color='#000000'><br>" + $('#TermId').val() + "</font></td>"
            rows += "<td class='tdSchool' class='tdClass'  align='left'><font color='#000000'><br>CLASS:</font></td>"
            rows += "<td colspan=4 class='tdSchool' class='tdClass'  align='left'><font color='#000000'><br>" + $('#ClassId').val() + "</font></td>"
            rows += "</tr>"

            rows += "<tr>"
            rows += "<td style='border-bottom: 1px solid #000000' rowspan=2 height='45' align='left'><u><font color='#0066CC'><br></font></u></td>"
            rows += "<td colspan=2 align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='center' sdval='1' sdnum='1033;'><font color='#FF0000'></font></td>"
            rows += "<td align='left'><b><font size=3 color='#000000'><br></font></b></td>"
            rows += "<td align='left'><b><font color='#000000'><br></font></b></td>"
            rows += "<td colspan=12 align='left'><b><font color='#000000'><br></font></b></td>"
            rows += "<td align='left'><font color='#000000'></font></td>"
            rows += "<td colspan=4 align='center'><font color='#000000'><br></font></td>"
            rows += "<td align='center'><font color='#FF0000'></font></td>"
            rows += "<td colspan=12 align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='left'><b><font color='#000000'><br></font></b></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='center' sdval='10' sdnum='1033;'><font color='#FF0000'></font></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='left'><b><font color='#000000'><br></font></b></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='center' sdval='11' sdnum='1033;'><font color='#FF0000'></font></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='left'><b><font color='#000000'><br></font></b></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='center' sdval='12' sdnum='1033;'><font color='#FF0000'></font></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='left'><b><font color='#000000'><br></font></b></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='center' sdval='13' sdnum='1033;'><font color='#FF0000'></font></td>"
            rows += "<td align='left'><b><font color='#000000'><br></font></b></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='center' sdval='14' sdnum='1033;'><font color='#FF0000'></font></td>"
            rows += "<td align='left'><b><font color='#000000'><br></font></b></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='center' sdval='15' sdnum='1033;'><font color='#FF0000'></font></td>"
            rows += "<td align='left'><b><font color='#000000'><br></font></b></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='center' sdval='15' sdnum='1033;'><font color='#FF0000'></font></td>"
            rows += "<td align='left'><b><font color='#000000'><br></font></b></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='center' sdval='15' sdnum='1033;'><font color='#FF0000'></font></td>"
            rows += "<td align='left'><b><font color='#000000'><br></font></b></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='center' sdval='15' sdnum='1033;'><font color='#FF0000'></font></td>"
            rows += "<td align='left'><b><font color='#000000'><br></font></b></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='center' sdval='15' sdnum='1033;'><font color='#FF0000'></font></td>"
            rows += "<td align='left'><b><font color='#000000'><br></font></b></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='center' sdval='15' sdnum='1033;'><font color='#FF0000'></font></td>"
            rows += "<td align='left'><b><font color='#000000'><br></font></b></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='center' sdval='15' sdnum='1033;'><font color='#FF0000'></font></td>"
            rows += "<td align='left'><b><font color='#000000'><br></font></b></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='center' sdval='15' sdnum='1033;'><font color='#FF0000'></font></td>"
            rows += "<td align='left'><b><font color='#000000'><br></font></b></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='left'><b><font color='#000000'><br></font></b></td>"
            rows += "<td align='left'><b><font color='#000000'><br></font></b></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "<td align='left'><font color='#000000'><br></font></td>"
            rows += "</tr>";

            rows += "<tr>"
            rows += "<td align='center' valign=top><b><font size=5 color='#FF0000'><br></font></b></td>"
            rows += "<td style='border-left: 1px solid #000000; border-right: 1px solid #000000' colspan=4 align='center'><b><font size=4 color='#000000'>ENGLISH</font></b></td>"
            rows += "<td style='border-left: 1px solid #000000; border-right: 1px solid #000000' colspan=4 align='center'><b><font size=4 color='#000000'>MATHEMATICS</font></b></td>"
            rows += "<td style='border-left: 1px solid #000000; border-right: 1px solid #000000' colspan=4 align='center'><b><font size=4 color='#000000'>ECONOMICS</font></b></td>"
            rows += "<td style='border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' colspan=4 align='center'><b><font size=4 color='#000000'>GEOGRAPHY</font></b></td>"
            rows += "<td style='border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' colspan=4 align='center'><b><font size=4 color='#000000'>COMPUTER/ICT</font></b></td>"
            rows += "<td style='border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' colspan=4 align='center'><b><font size=4 color='#000000'>PHYSICS</font></b></td>"
            rows += "<td style='border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' colspan=4 align='center'><b><font size=4 color='#000000'>CHEMISTRY</font></b></td>"
            rows += "<td style='border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' colspan=4 align='center'><b><font size=4 color='#000000'>BIOLOGY</font></b></td>"
            rows += "<td style='border-left: 1px solid #000000; border-right: 1px solid #000000' colspan=4 align='center'><b><font size=4 color='#000000'>FINACIAL ACCOUNT</font></b></td>"
            rows += "<td style='border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' colspan=4 align='center'><b><font size=4 color='#000000'>COMMERCE</font></b></td>"
            rows += "<td style='border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' colspan=4 align='center'><b><font size=4 color='#000000'>HISTORY</font></b></td>"
            rows += "<td style='border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' colspan=4 align='center'><b><font size=4 color='#000000'>LITERATURE IN ENGLISH</font></b></td>"
            rows += "<td style='border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' colspan=4 align='center'><b><font size=4 color='#000000'>HAUSA/IGBO/YORUBA</font></b></td>"
            rows += "<td style='border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' colspan=4 align='center'><b><font size=4 color='#000000'>RELIGION AND MORAL EDUCATION (CRK/IRK)</font></b></td>"
            rows += "<td style='border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' colspan=4 align='center'><b><font size=4 color='#000000'>MUSIC</font></b></td>"
            rows += "<td style='border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' colspan=4 align='center'><b><font size=4 color='#000000'>GOVERNMENT</font></b></td>"
            rows += "<td style='border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' colspan=4 align='center'><b><font size=4 color='#000000'>TECHNICAL DRAWING</font></b></td>"
            rows += "<td style='border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' colspan=4 align='center'><b><font size=4 color='#000000'>METAL/WOOD WORK</font></b></td>"
            rows += "<td style='border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' colspan=4 align='center'><b><font size=4 color='#000000'>VISUAL ARTS</font></b></td>"
            rows += "<td style='border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' colspan=4 align='center'><b><font size=4 color='#000000'>HOME MANAGEMENT</font></b></td>"
            rows += "<td style='border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' colspan=4 align='center'><b><font size=4 color='#000000'>CLOTH AND TEXTILE</font></b></td>"
            rows += "<td style='border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' colspan=4 align='center'><b><font size=4 color='#000000'>FOOD AND NUTRITION</font></b></td>"
            rows += "<td style='border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' colspan=4 align='center'><b><font size=4 color='#000000'>FURTHER MATHS</font></b></td>"
            rows += "<td style='border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000' colspan=4 align='center'><b><font size=4 color='#000000'>AGRICULTURAL SCIENCE</font></b></td>"
            rows += "<td style='border-right: 1px solid #000000' align='center'><b><font size=4 color='#000000'>TOTAL</font></b></td>"
            rows += "<td style='border-left: 1px solid #000000; border-right: 1px solid #000000' align='center'><b><font size=4 color='#000000'>PERCENTAGE</font></b></td>"
            rows += "<td style='border-left: 1px solid #000000' align='center'><b><font size=4 color='#000000'>POSITION</font></b></td>"
            rows += "<td colspan=6  style='border-bottom: 1px solid #000000; border-left: 1px solid #000000' align='center'><b><font size=4 color='#000000'>CLASS TEACHER'S REMARK</font></b></td>"
            rows += "</tr>";

            rows += "<tr>"
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" height="25" align="center"><b><font size=4 color="#FF0000">S/N</font></b></td>'
            rows += '<td class="tdName" style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left"><b><font size=4>NAME OF STUDENTS</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">40</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">60</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">100</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">nth/SUB.</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">40</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">60</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">100</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">nth/SUB.</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">40</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">60</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">100</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">nth/SUB.</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">40</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">60</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">100</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">nth/SUB.</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">40</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">60</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">100</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">nth/SUB.</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">40</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">60</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">100</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">nth/SUB.</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">40</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">60</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">100</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">nth/SUB.</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">40</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">60</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">100</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">nth/SUB.</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">40</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">60</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">100</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">nth/SUB.</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">40</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">60</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">100</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">nth/SUB.</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">40</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">60</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">100</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">nth/SUB.</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">40</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">60</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">100</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">nth/SUB.</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">40</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">60</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">100</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">nth/SUB.</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">40</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">60</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">100</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">nth/SUB.</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">40</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">60</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">100</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">nth/SUB.</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">40</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">60</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">100</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">nth/SUB.</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">40</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">60</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">100</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">nth/SUB.</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">40</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">60</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">100</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">nth/SUB.</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">40</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">60</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">100</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">nth/SUB.</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">40</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">60</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">100</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">nth/SUB.</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">40</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">60</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">100</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">nth/SUB.</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">40</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">60</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">100</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">nth/SUB.</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">40</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">60</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">100</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">nth/SUB.</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">40</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">60</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">100</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">nth/SUB.</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="1700" sdnum="1033;"><b><font size=4 color="#000000">1700</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdnum="1033;0;0%"><b><font size=4 color="#000000">%</font></b></td>'
            rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">nth</font></b></td>'
            rows += '<td colspan=6  style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><font color="#000000"><br></font></td>'
            rows += "</tr>"
            for (var i = 0; i < data.length; i++) {
                drawBar();
                rows += "<tr>"
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" height="25" align="center"><b><font size=4 color="#FF0000">' + (i + 1) + '</font></b></td>'
                rows += '<td class="tdName" style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="left"><b><font size=4>' + GetStudentName(data[i].UniqueId); +'</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].englishCATotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].englishExam + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].englishTotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">' + data[i].englishPerSubjPosition + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].mathematicsCATotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].mathematicsExam + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].mathematicsTotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">' + data[i].mathematicsPerSubjPosition + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].economicsCATotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].economicsExam + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].economicsTotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">' + data[i].economicsPerSubjPosition + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].geographyCATotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].geographyExam + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].geographyTotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">' + data[i].geographyPerSubjPosition + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].computer_ictCATotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].computer_ictExam + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].computer_ictTotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">' + data[i].computer_ictPerSubjPosition + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].physicsCATotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].physicsExam + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].physicsTotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">' + data[i].physicsPerSubjPosition + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].chemistryCATotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].chemistryExam + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].chemistryTotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">' + data[i].chemistryPerSubjPosition + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].biologyCATotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].biologyExam + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].biologyTotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">' + data[i].biologyPerSubjPosition + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].financial_accountCATotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].financial_accountExam + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].financial_accountTotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">' + data[i].financial_accountPerSubjPosition + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].commerceCATotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].commerceExam + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].commerceTotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">' + data[i].commercePerSubjPosition + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].historyCATotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].historyExam + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].historyTotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">' + data[i].historyPerSubjPosition + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].literature_in_englishCATotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].literature_in_englishExam + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].literature_in_englishTotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">' + data[i].literature_in_englishPerSubjPosition + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].nigeria_languageCATotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].nigeria_languageExam + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].nigeria_languageTotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">' + data[i].nigeria_languagePerSubjPosition + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].religion_knowledgeCATotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].religion_knowledgeExam + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].religion_knowledgeTotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">' + data[i].religion_knowledgePerSubjPosition + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].musicCATotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].musicExam + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].musicTotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">' + data[i].musicPerSubjPosition + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].governmentCATotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].governmentExam + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].governmentTotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">' + data[i].governmentPerSubjPosition + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].technical_drawingCATotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].technical_drawingExam + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].technical_drawingTotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">' + data[i].technical_drawingPerSubjPosition + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].metal_wood_workCATotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].metal_wood_workExam + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].metal_wood_workTotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">' + data[i].metal_wood_workPerSubjPosition + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].visual_artsCATotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].visual_artsExam + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].visual_artsTotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">' + data[i].visual_artsPerSubjPosition + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].home_managementCATotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].home_managementExam + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].home_managementTotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">' + data[i].home_managementPerSubjPosition + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].cloth_and_textileCATotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].cloth_and_textileExam + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].cloth_and_textileTotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">' + data[i].cloth_and_textilePerSubjPosition + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].food_and_nutritionCATotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].food_and_nutritionExam + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].food_and_nutritionTotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">' + data[i].food_and_nutritionPerSubjPosition + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].further_mathsCATotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].further_mathsExam + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].further_mathsTotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">' + data[i].further_mathsPerSubjPosition + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="40" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].agricCATotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="60" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].agricExam + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="100" sdnum="1033;"><b><font size=3 color="#000000">' + data[i].agricTotal + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">' + data[i].agricPerSubjPosition + '</font></b></td>'
                rows += '<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdval="1700" sdnum="1033;"><b><font size=4 color="#000000">' + data[i].FirstTermTotal + '</font></b></td>'

                ///////////////// RANKING FOR STUDENT POSITION  ////////////////////////////////
                currentMax = (Math.round(data[i].FirstTermPercentage * 10) / 10).toFixed(1);
                firstMax = (Math.round(data[0].FirstTermPercentage * 10) / 10).toFixed(1);

                if (i === 0) {
                    firstRank = 1;
                    r = firstRank;
                    lastMax = 0;
                } else {
                    lastMax = (Math.round(data[i - 1].FirstTermPercentage * 10) / 10).toFixed(1);
                    if (currentMax === lastMax) {
                       // debugger
                        count = count++;
                        lastRank = r;
                        r = lastRank;
                    } else {
                        count = count++;
                        if (count === 1) {
                            
                            r = count  + i;
                        } else {
                            r = count + 1 + i;
                        }
                        
                    }
                }
                

                rows += '<td class="total" style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" sdnum="1033;0;0%"><b><font size=4 color="#000000">' + currentMax + '</font></b></td>'
                rows += '<td  style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000">' + r + '</font></b></td>'
                rows += '<td colspan=6 style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center"><b><font size=3 color="#000000"></font></b></td>'
                rows += "</tr>"
            }
            rows += "</table>"
            $("#divBroardSheet").html(rows);
        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
}


var i = '';

var u = '';
function getClassReportCard(schoolId, schSessionId, termId, classId,classArm) {
    // debugger
    $.ajax({
        url: '/School/GetClassBroardSheet?SchoolId=' + schoolId + '&SchSessionId=' + schSessionId + '&TermId=' + termId + '&ClassId=' + classId + '&ClassArm=' + classArm,
        type: 'POST',

        async: false,

        data: { 'SchoolId': schoolId, 'SchSessionId': schSessionId, 'TermId=': termId, 'ClassId': classId, 'ClassArm': classArm },
        success: function (data) {
            var rows = '';
            for (i = 0; i < data.length; i++) {

                ///////////////// RANKING FOR STUDENT POSITION  ////////////////////////////////
                currentMax = (Math.round(data[i].FirstTermPercentage * 10) / 10).toFixed(1);
                firstMax = (Math.round(data[0].FirstTermPercentage * 10) / 10).toFixed(1);

                if (i === 0) {
                    firstRank = 1;
                    r = firstRank;
                    lastMax = 0;
                } else {
                    lastMax = (Math.round(data[i - 1].FirstTermPercentage * 10) / 10).toFixed(1);
                    if (currentMax === lastMax) {
                        //debugger
                        count = count++;
                        lastRank = r;
                        r = lastRank;
                    } else {
                        count = count++;
                        if (count === 1) {

                            r = count + i;
                        } else {
                            r = count + 1 + i;
                        }

                    }
                }


                u = data[i].UniqueId;
                subjv1 = data[i].englishTotal;
                subjv2 = data[i].mathematicsTotal;
                subjv3 = data[i].economicsTotal;
                if (classArm === "Science") {
                    subjv4 = data[i].physicsTotal;
                    subjv5 = data[i].chemistryTotal;
                    subjv6 = data[i].biologyTotal;
                } else if (classArm === "Commercial") {
                    subjv4 = data[i].financial_accountTotal;
                    subjv5 = data[i].commerceTotal;
                    subjv6 = data[i].biologyTotal;
                } else if (classArm === "Art") {
                    subjv4 = data[i].governmentTotal;
                    subjv5 = data[i].historyTotal;
                    subjv6 = data[i].literature_in_englishTotal;
                } else if (classArm === "Technical") {
                    subjv4 = data[i].physicsTotal;
                    subjv5 = data[i].chemistryTotal;
                    subjv6 = data[i].technical_drawingTotal;
                }
                rows += "<table id ='rCard' cellspacing='0' border='0'>"
                rows += "<colgroup span='11' width='73'></colgroup>"

                ////////School logo, Name and student passport////////
                rows += "<tr>"
                rows += "<td colspan=2 rowspan=7 height='149' align='center' bgcolor='#FFFFFF'><font color='#000000'><b><img class='logo' src=" + SchoolLogo + " /></b></font></td>"
                rows += "<td colspan=7 align='center' sdval='0' sdnum='1033;'><b><font face='Arial Rounded MT Bold' size=3 color='#000000'><b>" + SchoolName + "</b></font></b></td>"
                rows += "<td colspan=2 rowspan=7 height='149' align='center' width='200'><font color='#000000'><b><img class='img' src=" + data[i].StudentImgPath + " /><br></b></font></td>"
                rows += "</tr>";

                rows += "<tr>"
                rows += "<td colspan=2 align='right'><font color='#000000'><b>MOTTO: </b></font></td>"
                rows += "<td colspan=5 align='left' sdval='0' sdnum='1033;'><font color='#000000'><b>" + SchoolMotto + "</b></font></td>"
                rows += "</tr>";

                rows += "<tr>"
                rows += "<td colspan=7 align='center' sdval='0' sdnum='1033;'><font color='#000000'><b>" + SchoolAddress + "</b></font></td>"
                rows += "</tr>";

                rows += "<tr>"
                rows += "<td colspan=7 align='center' sdval='0' sdnum='1033;'><font color='#000000'><b>Website: " + SchoolWebsite + " | " + " Email: " + SchoolEmail + " </b></font></td>"
                rows += "</tr>";

                rows += "<tr>"
                rows += "<td colspan=2 align='right'><font color='#000000'><b>NAME: </b></font></td>"
                rows += "<td colspan=5 align='left' sdval='0' sdnum='1033;'><font color='#000000'><b>" + GetStudentName(data[i].UniqueId); +"</b></font></td>"
                rows += "</tr>";

                rows += "<tr>"
                rows += "<td colspan=2 align='right'><font color='#000000'><b>Class: </b></font></td>"
                rows += "<td colspan=5 align='left' sdval='0' sdnum='1033;'<font color='#000000'><b>" + data[i].ClassId + " " + data[i].ClassArm + "</b></font></td>"
                rows += "</tr>";

                rows += "<tr>"
                rows += "<td colspan=2 align='right'><font color='#000000'><b>ADMIN. NO.: </b></font></td>"
                rows += "<td colspan=5 align='left' sdval='0' sdnum='1033;'><font color='#000000'><b>" + data[i].UniqueId + "</b></font></td>"
                rows += "</tr>";

                rows += "<tr>"
                rows += "<td height='81' align='left'><font color='#000000'><b></b></font></td>"
                rows += "<td align='left'><font color='#000000'><b></b></font></td>"
                rows += "<td align='left'><font color='#000000'><b></b></font></td>"
                rows += "<td align='left'><font color='#000000'><b></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>CONTINUOUS ASSESSMENT</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>EXAM</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>TOTAL</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>nth/SUB.</b></font></td>"
                rows += "<td align='center'><font size=3 color='#000000'>GRADE</b></font></td>"
                rows += "<td colspan=2 align='center'><font color='#000000'><b>REMARK</b></font></td>"
                rows += "</tr>";

                rows += "<tr>"
                rows += "<td colspan=3 height='22' align='left'><b><font size=3 color='#000000'>  SUBJECT</b></font></b></td>"
                rows += "<td align='left'><b><font color='#000000'><b>MAX MARK</b></font></b></td>"
                rows += "<td align='center' sdval='40' sdnum='1033;'><font color='#000000'><b>40</b></font></td>"
                rows += "<td align='center' sdval='60' sdnum='1033;'><font color='#000000'><b>60</b></font></td>"
                rows += "<td align='center' sdval='100' sdnum='1033;'><font color='#000000'><b>100</b></font></td>"
                rows += "<td align='left' bgcolor='#000000'><font color='#000000'><b></b></font></td>"
                rows += "<td colspan=3 align='left' bgcolor='#000000'><font color='#000000'><b></b></font></td>"
                rows += "</tr>"



                //////////// Subject, Continous Assessment and Exam Score
                //// Enlglish////// 1
                rows += "<tr>"
                rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>ENGLISH<br></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].englishCATotal + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].englishExam + "</b></font></td>"
                var te = '';
                if (data[i].englishTotal === 0) {
                    te = null;
                } else {
                    te = data[i].englishTotal;
                }
                rows += "<td align='center'><font color='#000000'><b>" + te + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].englishGrade + "</b></font></td>"
                rows += "<td colspan=2 align='center'><font color='#000000'><b>" + data[i].englishRemark + "</b></font></td>"
                rows += "</tr>"


                //// Maths////// 2
                rows += "<tr>"
                rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>MATHEMATICS<br></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].mathematicsCATotal + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].mathematicsExam + "</b></font></td>"
                var tm = '';
                if (data[i].mathematicsTotal === 0) {
                    tm = null;
                } else {
                    tm = data[i].mathematicsTotal;
                }
                rows += "<td align='center'><font color='#000000'><b>" + tm + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].mathematicsGrade + "</b></font></td>"
                rows += "<td colspan=2 align='center'><font color='#000000'><b>" + data[i].mathematicsRemark + "</b></font></td>"
                rows += "</tr>"




                //// COMPUTER/IT////// 3
                rows += "<tr>"
                rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>COMPUTER/ICT<br></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].computer_ictCATotal + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].computer_ictExam + "</b></font></td>"
                var tict = '';
                if (data[i].computer_ictTotal === 0) {
                    tict = null;
                } else {
                    tict = data[i].computer_ictTotal;
                }
                rows += "<td align='center'><font color='#000000'><b>" + tict + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].computer_ictGrade + "</b></font></td>"
                rows += "<td colspan=2 align='center'><font color='#000000'><b>" + data[i].computer_ictRemark + "</b></font></td>"
                rows += "</tr>"

                //// Economics////// 4
                rows += "<tr>"
                rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>ECONOMICS<br></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].economicsCATotal + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].economicsExam + "</b></font></td>"
                var teco = '';
                if (data[i].economicsTotal === 0) {
                    teco = null;
                } else {
                    teco = data[i].economicsTotal;
                }
                rows += "<td align='center'><font color='#000000'><b>" + teco + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].economicsGrade + "</b></font></td>"
                rows += "<td colspan=2 align='center'><font color='#000000'><b>" + data[i].economicsRemark + "</b></font></td>"
                rows += "</tr>"


                //// RELIGION AND MORAL EDUCATION (CRK/IRK)////// 5
                rows += "<tr>"
                rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>RELIGION AND MORAL EDUCATION (CRK/IRK)<br></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].religion_knowledgeCATotal + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].religion_knowledgeExam + "</b></font></td>"
                var trk = '';
                if (data[i].religion_knowledgeTotal === 0) {
                    trk = null;
                } else {
                    trk = data[i].religion_knowledgeTotal;
                }
                rows += "<td align='center'><font color='#000000'><b>" + trk + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].religion_knowledgeGrade + "</b></font></td>"
                rows += "<td colspan=2 align='center'><font color='#000000'><b>" + data[i].religion_knowledgeRemark + "</b></font></td>"
                rows += "</tr>"

                //// PHYSICS////// 6
                rows += "<tr>"
                rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>PHYSICS<br></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].physicsCATotal + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].physicsExam + "</b></font></td>"
                var tp = '';
                if (data[i].physicsTotal === 0) {
                    tp = null;
                } else {
                    tp = data[i].physicsTotal;
                }
                rows += "<td align='center'><font color='#000000'><b>" + tp + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].physicsGrade + "</b></font></td>"
                rows += "<td colspan=2 align='center'><font color='#000000'><b>" + data[i].physicsRemark + "</b></font></td>"
                rows += "</tr>"

                //// CHEMISTRY////// 7
                rows += "<tr>"
                rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>CHEMISTRY<br></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].chemistryCATotal + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].chemistryExam + "</b></font></td>"
                var ch = '';
                if (data[i].chemistryTotal === 0) {
                    ch = null;
                } else {
                    ch = data[i].chemistryTotal;
                }
                rows += "<td align='center'><font color='#000000'><b>" + ch + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].chemistryGrade + "</b></font></td>"
                rows += "<td colspan=2 align='center'><font color='#000000'><b>" + data[i].chemistryRemark + "</b></font></td>"
                rows += "</tr>"

                //// BIOLOGY////// 8
                rows += "<tr>"
                rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>BIOLOGY<br></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].biologyCATotal + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].biologyExam + "</b></font></td>"
                var bi = '';
                if (data[i].biologyTotal === 0) {
                    bi = null;
                } else {
                    bi = data[i].biologyTotal;
                }
                rows += "<td align='center'><font color='#000000'><b>" + bi + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].biologyGrade + "</b></font></td>"
                rows += "<td colspan=2 align='center'><font color='#000000'><b>" + data[i].biologyRemark + "</b></font></td>"
                rows += "</tr>"

                //// AGRICULTURAL SCIENCE////// 9
                rows += "<tr>"
                rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>AGRICULTURAL SCIENCE<br></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].agricCATotal + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].agricExam + "</b></font></td>"
                var ag = '';
                if (data[i].agricTotal === 0) {
                    ag = null;
                } else {
                    ag = data[i].agricTotal;
                }
                rows += "<td align='center'><font color='#000000'><b>" + ag + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].agricGrade + "</b></font></td>"
                rows += "<td colspan=2 align='center'><font color='#000000'><b>" + data[i].agricRemark + "</b></font></td>"
                rows += "</tr>"

                //// FINANCIAL ACCOUNT////// 10
                rows += "<tr>"
                rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>FINANCIAL ACCOUNT<br></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].financial_accountCATotal + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].financial_accountExam + "</b></font></td>"
                var fa = '';
                if (data[i].financial_accountTotal === 0) {
                    fa = null;
                } else {
                    fa = data[i].financial_accountTotal;
                }
                rows += "<td align='center'><font color='#000000'><b>" + fa + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].financial_accountGrade + "</b></font></td>"
                rows += "<td colspan=2 align='center'><font color='#000000'><b>" + data[i].financial_accountRemark + "</b></font></td>"
                rows += "</tr>"

                //// COMMERCE////// 11
                rows += "<tr>"
                rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>COMMERCE<br></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].commerceCATotal + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].commerceExam + "</b></font></td>"
                var com = '';
                if (data[i].commerceTotal === 0) {
                    com = null;
                } else {
                    com = data[i].commerceTotal;
                }
                rows += "<td align='center'><font color='#000000'><b>" + com + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].commerceGrade + "</b></font></td>"
                rows += "<td colspan=2 align='center'><font color='#000000'><b>" + data[i].commerceRemark + "</b></font></td>"
                rows += "</tr>"

                //// GEOGRAPHY////// 12
                rows += "<tr>"
                rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>GEOGRAPHY<br></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].geographyCATotal + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].geographyExam + "</b></font></td>"
                var ge = '';
                if (data[i].geographyTotal === 0) {
                    ge = null;
                } else {
                    ge = data[i].geographyTotal;
                }
                rows += "<td align='center'><font color='#000000'><b>" + ge + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].geographyGrade + "</b></font></td>"
                rows += "<td colspan=2 align='center'><font color='#000000'><b>" + data[i].geographyRemark + "</b></font></td>"
                rows += "</tr>"


                //// GOVERNMENT////// 13
                rows += "<tr>"
                rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>GOVERNMENT<br></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].governmentCATotal + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].governmentExam + "</b></font></td>"
                var go = '';
                if (data[i].governmentTotal === 0) {
                    go = null;
                } else {
                    go = data[i].governmentTotal;
                }
                rows += "<td align='center'><font color='#000000'><b>" + go + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].governmentGrade + "</b></font></td>"
                rows += "<td colspan=2 align='center'><font color='#000000'><b>" + data[i].governmentRemark + "</b></font></td>"
                rows += "</tr>"

                //// HISTORY////// 14
                rows += "<tr>"
                rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>HISTORY<br></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].historyCATotal + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].historyExam + "</b></font></td>"
                var h = '';
                if (data[i].historyTotal === 0) {
                    h = null;
                } else {
                    h = data[i].historyTotal;
                }
                rows += "<td align='center'><font color='#000000'><b>" + h + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].historyGrade + "</b></font></td>"
                rows += "<td colspan=2 align='center'><font color='#000000'><b>" + data[i].historyRemark + "</b></font></td>"
                rows += "</tr>"

                //// TECHNICAL DRAWING/ BUILDING CONTRUCTION////// 15
                rows += "<tr>"
                rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>TECHNICAL DRAWING/BUILDING CONTRUCTION<br></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].technical_drawingCATotal + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].technical_drawingExam + "</b></font></td>"
                var td = '';
                if (data[i].technical_drawingTotal === 0) {
                    td = null;
                } else {
                    td = data[i].technical_drawingTotal;
                }
                rows += "<td align='center'><font color='#000000'><b>" + td + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].technical_drawingGrade + "</b></font></td>"
                rows += "<td colspan=2 align='center'><font color='#000000'><b>" + data[i].technical_drawingRemark + "</b></font></td>"
                rows += "</tr>"

                //// WOOD/METAL WORK////// 16
                rows += "<tr>"
                rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>WOOD/METAL WORK<br></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].metal_wood_workCATotal + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].metal_wood_workExam + "</b></font></td>"
                var mww = '';
                if (data[i].metal_wood_workTotal === 0) {
                    mww = null;
                } else {
                    mww = data[i].metal_wood_workTotal;
                }
                rows += "<td align='center'><font color='#000000'><b>" + mww + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].metal_wood_workGrade + "</b></font></td>"
                rows += "<td colspan=2 align='center'><font color='#000000'><b>" + data[i].metal_wood_workRemark + "</b></font></td>"
                rows += "</tr>"

                //// LITERATURE IN ENGLISH////// 18
                rows += "<tr>"
                rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>LITERATURE IN ENGLISH<br></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].literature_in_englishCATotal + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].literature_in_englishExam + "</b></font></td>"
                var lit = '';
                if (data[i].literature_in_englishTotal === 0) {
                    lit = null;
                } else {
                    lit = data[i].literature_in_englishTotal;
                }
                rows += "<td align='center'><font color='#000000'><b>" + lit + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].literature_in_englishGrade + "</b></font></td>"
                rows += "<td colspan=2 align='center'><font color='#000000'><b>" + data[i].literature_in_englishRemark + "</b></font></td>"
                rows += "</tr>"

                //// HOME MANAGEMENT////// 19
                rows += "<tr>"
                rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>HOME MANAGEMENT<br></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].home_managementCATotal + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].home_managementExam + "</b></font></td>"
                var hm = '';
                if (data[i].home_managementTotal === 0) {
                    hm = null;
                } else {
                    hm = data[i].home_managementTotal;
                }
                rows += "<td align='center'><font color='#000000'><b>" + hm + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].home_managementGrade + "</b></font></td>"
                rows += "<td colspan=2 align='center'><font color='#000000'><b>" + data[i].home_managementRemark + "</b></font></td>"
                rows += "</tr>"


                //// FOOD AND NUTRITION////// 23
                rows += "<tr>"
                rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>FOOD AND NUTRITION<br></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].food_and_nutritionCATotal + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].food_and_nutritionExam + "</b></font></td>"
                var fan = '';
                if (data[i].food_and_nutritionTotal === 0) {
                    fan = null;
                } else {
                    fan = data[i].food_and_nutritionTotal;
                }
                rows += "<td align='center'><font color='#000000'><b>" + fan + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].food_and_nutritionGrade + "</b></font></td>"
                rows += "<td colspan=2 align='center'><font color='#000000'><b>" + data[i].food_and_nutritionRemark + "</b></font></td>"
                rows += "</tr>"

                //// CLOTH AND TEXTILE////// 20
                rows += "<tr>"
                rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>CLOTH AND TEXTILE<br></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].cloth_and_textileCATotal + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].cloth_and_textileExam + "</b></font></td>"
                var cat = '';
                if (data[i].cloth_and_textileTotal === 0) {
                    cat = null;
                } else {
                    cat = data[i].cloth_and_textileTotal;
                }
                rows += "<td align='center'><font color='#000000'><b>" + cat + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].cloth_and_textileGrade + "</b></font></td>"
                rows += "<td colspan=2 align='center'><font color='#000000'><b>" + data[i].cloth_and_textileRemark + "</b></font></td>"
                rows += "</tr>"

                //// NIGERIAN LANGUAGE////// 21
                rows += "<tr>"
                rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>HAUSA/IGBO/YORUBA<br></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].nigeria_languageCATotal + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].nigeria_languageExam + "</b></font></td>"
                var ng = '';
                if (data[i].nigeria_languageTotal === 0) {
                    ng = null;
                } else {
                    ng = data[i].nigeria_languageTotal;
                }
                rows += "<td align='center'><font color='#000000'><b>" + ng + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].nigeria_languageGrade + "</b></font></td>"
                rows += "<td colspan=2 align='center'><font color='#000000'><b>" + data[i].nigeria_languageRemark + "</b></font></td>"
                rows += "</tr>"

                //// MUSIC////// 22
                rows += "<tr>"
                rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>MUSIC<br></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].musicCATotal + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].musicExam + "</b></font></td>"
                var m = '';
                if (data[i].musicTotal === 0) {
                    m = null;
                } else {
                    m = data[i].musicTotal;
                }
                rows += "<td align='center'><font color='#000000'><b>" + m + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].musicGrade + "</b></font></td>"
                rows += "<td colspan=2 align='center'><font color='#000000'><b>" + data[i].musicRemark + "</b></font></td>"
                rows += "</tr>"

                //// VISUAL ARTS////// 23
                rows += "<tr>"
                rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>VISUAL ARTS<br></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].visual_artsCATotal + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].visual_artsExam + "</b></font></td>"
                var va = '';
                if (data[i].visual_artsTotal === 0) {
                    va = null;
                } else {
                    va = data[i].visual_artsTotal;
                }
                rows += "<td align='center'><font color='#000000'><b>" + va + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].visual_artsGrade + "</b></font></td>"
                rows += "<td colspan=2 align='center'><font color='#000000'><b>" + data[i].visual_artsRemark + "</b></font></td>"
                rows += "</tr>"

                rows += "<tr>"
                rows += "<td colspan=2 height='21' align='left'><font color='#000000'><b>  GRAND TOTAL:</b></font></td>"
                rows += "<td align='center'><font size=3 color='#000000'><br><b>" + data[i].FirstTermTotal + " </b></font></b></td>"
                rows += "<td colspan=8 align='left'><font color='#000000'><b>nth/Sub. → Position Per Subject</b></font>"
                rows += "</td>"
                rows += "</tr>"

                rows += "<tr>"
                rows += "<td colspan=2 height='21' align='left'><font color='#000000'><b>  PERCENTAGE:</b></font></td>"
                rows += "<td align='center'><font size=3 color='#000000'><br><b>" + currentMax + "</b></font></b></td>"
                rows += "<td colspan=6 align='left'><font color='#000000'><b>POSITION IN CLASS:</b></font></td>"
                rows += "<td colspan=2 align='center'><b><font size=3 color='#000000'><b>" + r + "</b></font></b></td>"
                rows += "</tr>"

                rows += "<tr>"
                rows += "<td colspan=2 height='21' align='left'><font color='#000000'><b>  ATTENDANCE:</b></font></td>"
                rows += "<td align='left'><font color='#000000'><b></b></font></td>"
                rows += "<td colspan=8 align='left'><font color='#000000'><b>TOTAL NO. OF STUDENTS IN CLASS:</b></font></td>"
                rows += "</tr>"

                rows += "<tr>"
                rows += "<td colspan=3 height='22' align='center'><b><font size=3 color='#000000'>   AFFECTIVE DOMAIN</b></font></b></td>"
                rows += "<td align='center'><b><font size=3 color='#000000'>RATING</b></font></b></td>"
                rows += "<td colspan=5 align='center'><b><font size=3 color='#000000'>PSYCHOMOTOR DOMAIN</b></font></b></td>"
                rows += "<td colspan=2 align='center'><b><font size=3 color='#000000'>RATING</b></font></b></td>"
                rows += "</tr>"

                rows += "<tr>"
                rows += "<td colspan=3 height='20' align='left'><font color='#000000'><b>  PUNCTUALITY</b></font></td>"
                rows += "<td align='left'><font color='#000000'><b></b></font></td>"
                rows += "<td colspan=5 align='left'><font color='#000000'><b>DRAWING AND PAINTING</b></font></td>"
                rows += "<td colspan=2 align='left'><font color='#000000'><b></b></font></td>"
                rows += "</tr>"

                rows += "<tr>"
                rows += "<td colspan=3 height='20' align='left'><font color='#000000'><b>  NEATNESS</b></font></td>"
                rows += "<td align='left'><font color='#000000'><b></b></font></td>"
                rows += "<td colspan=5 align='left'><font color='#000000'><b>GAMES</b></font></td>"
                rows += "<td colspan=2 align='left'><font color='#000000'><b></b></font></td>"
                rows += "</tr>"

                rows += "<tr>"
                rows += "<td colspan=3 height='20' align='left'><font color='#000000'><b>  POLITENESS</b></font></td>"
                rows += "<td align='left'><font color='#000000'><b></b></font></td>"
                rows += "<td colspan=5 align='left'><font color='#000000'><b>SPORTS</b></font></td>"
                rows += "<td colspan=2 align='left'><font color='#000000'><b></b></font></td>"
                rows += "</tr>"

                rows += "<tr>"
                rows += "<td colspan=3 height='20' align='left'><font color='#000000'><b>  INITIATIVE</b></font></td>"
                rows += "<td align='left'><font color='#000000'><b></b></font></td>"
                rows += "<td colspan=5 align='left'><font color='#000000'><b>HANDLING TOOLS</b></font></td>"
                rows += "<td colspan=2 align='left'><font color='#000000'><b></b></font></td>"
                rows += "</tr>"

                rows += "<tr>"
                rows += "<td colspan=3 height='20' align='left'><font color='#000000'><b>  COOPERATION WITH OTHERS</b></font></td>"
                rows += "<td align='left'><font color='#000000'><b></b></font></td>"
                rows += "<td colspan=5 align='left'><font color='#000000'><b>HAND WRITING</b></font></td>"
                rows += "<td colspan=2 align='left'><font color='#000000'><b></b></font></td>"
                rows += "</tr>"

                rows += "<tr>"
                rows += "<td colspan=3 height='20' align='left'><font color='#000000'><b>  LEADERSHIP TRAITS</b></font></td>"
                rows += "<td align='left'><font color='#000000'><b></b></font></td>"
                rows += "<td colspan=5 align='left'><font color='#000000'><b>MUSICAL SKILLS</b></font></td>"
                rows += "<td colspan=2 align='left'><font color='#000000'><b></b></font></td>"
                rows += "</tr>"

                rows += "<tr>"
                rows += "<td colspan=3 height='21' align='left'><font color='#000000'><b>  HELPING OTHERS</b></font></td>"
                rows += "<td align='left'><font color='#000000'><b></b></font></td>"
                rows += "<td colspan=5 align='left'><font color='#000000'><b>VERBAL FLUENCY</b></font></td>"
                rows += "<td colspan=2 align='left'><font color='#000000'><b></b></font></td>"
                rows += "</tr>"

                rows += "<tr>"
                rows += "<td colspan=3 height='21' align='left'><font color='#000000'><b>  EMOTIONAL STABILITY</b></font></td>"
                rows += "<td align='left'><font color='#000000'><b></b></font></td>"
                rows += "<td colspan=7 align='center'><b><font color='#000000'><b>STUDENT'S CORE SUBJECTS ANALYSIS</b></font></b></td>"
                rows += "</tr>"
                ///////////////////////////////////////rowspan=9 
                rows += "<tr>"
                rows += "<td colspan=3 height='20' align='left'><font color='#000000'><b> HONESTY</b></font></td>"
                rows += "<td align='left'><font color='#000000'><b></b></font></td>"
                ///////////////////STUDENT'S CORE SUBJECTS ANALYSIS////////////////////
                rows += "<td colspan=7 rowspan=9 align='left'><font color='#000000'><b></b></font>"
                rows += "<div class='x_content'>"    
                rows += "<canvas id='Chart'></canvas>"

                rows += "</div>"
                //rows += "<div id='chartContainer' style='height: 200px; width: 100%;'>"

                //rows += "</div>"
                rows += "</td>"
                rows += "</tr>"

                ///////////////////////////////
                rows += "<tr>"
                rows += "<td colspan=3 height='20' align='left'><font color='#000000'><b>  ATTITUDE TO SCHOOL WORKS</b></font></td>"
                rows += "<td align='left'><font color='#000000'><b></b></font></td>"
                rows += "</tr>"

                rows += "<tr>"
                rows += "<td colspan=3 height='20' align='left'><font color='#000000'><b>  ATTENTIVENESS</b></font></td>"
                rows += "<td align='left'><font color='#000000'><b></b></font></td>"
                rows += "</tr>"


                rows += "<tr>"
                rows += "<td colspan=3 height='20' align='left'><font color='#000000'><b>  PERSEVERANCE</b></font></td>"
                rows += "<td align='left'><font color='#000000'><b></b></font></td>"
                rows += "</tr>"


                rows += "<tr>"
                rows += "<td colspan=3 height='21' align='left'><font color='#000000'><b>  RELATIONSHIP WITH OTHERS</b></font></td>"
                rows += "<td align='left'><font color='#000000'><b></b></font></td>"
                rows += "</tr>"


                rows += "<tr>"
                rows += "<td colspan=4 height='21' align='center'><b><font color='#000000'><b>SCALE (OF OBSERVABLE TRAIT)</b></font></b></td>"
                rows += "</tr>"


                rows += "<tr>"
                rows += "<td colspan=2 height='21' align='left'><font color='#000000'><b>  5 - EXCELLENT DEGREE </b></font></td>"
                rows += "<td colspan=2 align='left'><font color='#000000'><b>4 - GOOD LEVEL</b></font></td>"
                rows += "</tr>"


                rows += "<tr>"
                rows += "<td colspan=2 height='21' align='left'><font color='#000000'><b>  3- FAIR BUT ACCEPTABLE</b></font></td>"
                rows += "<td colspan=2 align='left'><font color='#000000'><b>2 - POOR LEVEL</b></font></td>"
                rows += "</tr>"


                rows += "<tr>"
                rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>  1 - NO OBSERVABLE TRAIT</b></font></td>"
                rows += "</tr>"


                rows += "<tr>"
                rows += "<td colspan=4 height='21' align='center'><b><font color='#000000'><b></b></font></b></td>"
                rows += "<td colspan=7 align='center'><b><font color='#000000'><b>PRINCIPAL'S REMARK</b></font></b></td>"
                rows += "</tr>"


                rows += "<tr>"
                rows += "<td height='21' align='left'><font color='#000000'><b></b></font></td>"
                rows += "<td align='left'><font color='#000000'><b></b></font></td>"
                rows += "<td align='left'><font color='#000000'><b></b></font></td>"
                rows += "<td align='left'><font color='#000000'><b></b></font></td>"
                rows += "<td colspan=7 rowspan=2 align='left'><font color='#000000'><b></b></font></td>"
                rows += "</tr>"


                rows += "<tr>"
                rows += "<td height='21' align='left'><font color='#000000'><b></b></font></td>"
                rows += "<td align='left'><font color='#000000'><b></b></font></td>"
                rows += "<td align='left'><font color='#000000'><b></b></font></td>"
                rows += "<td align='left'><font color='#000000'><b></b></font></td>"
                rows += "</tr>"


                rows += "<tr>"
                rows += "<td height='21' align='left'><font color='#000000'><b></b></font></td>"
                rows += "<td align='left'><font color='#000000'><b></b></font></td>"
                rows += "<td align='left'><font color='#000000'><b></b></font></td>"
                rows += "<td align='left'><font color='#000000'><b></b></font></td>"
                rows += "<td colspan=7 align='center'><b><font color='#000000'><b>CLASS TEACHER'S REMARK</b></font></b></td>"
                rows += "</tr>"


                rows += "<tr>"
                rows += "<td height='21' align='left'><font color='#000000'><b></b></font></td>"
                rows += "<td align='left'><font color='#000000'><b></b></font></td>"
                rows += "<td align='left'><font color='#000000'><b></b></font></td>"
                rows += "<td align='left'><font color='#000000'><b></b></font></td>"
                rows += "<td colspan=7 rowspan=2 align='left'><font color='#000000'><b></b></font></td>"
                rows += "</tr>"


                rows += "<tr>"
                rows += "<td height='21' align='left'><font color='#000000'><b></b></font></td>"
                rows += "<td align='left'><font color='#000000'><b></b></font></td>"
                rows += "<td align='left'><font color='#000000'><b></b></font></td>"
                rows += "<td align='left'><font color='#000000'><b></b></font></td>"
                rows += "</tr>"


                rows += "<tr>"
                rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>  TERM ENDED:</b></font></td>"
                rows += "<td colspan=7 align='left'><font color='#000000'><b>NEXT TERM BEGINS:</b></font></td>"
                rows += "</tr>"


                rows += "<tr>"
                rows += "<td rowspan=2 height='41' align='center'><font color='#000000'><b>  DATE ISSUED:</b></font></td>"
                rows += "<td colspan=2 rowspan=2 align='left'><font color='#000000'><b></b></font></td>"
                rows += "<td colspan=2 rowspan=2 align='left'><font color='#000000'><b>PRINCIPAL:………………………..</b></font></td>"
                rows += "<td colspan=3 rowspan=2 align='left'><font color='#000000'><b>CLASS TEACHER:…………………..</b></font></td>"
                rows += "<td colspan=3 rowspan=2 align='left'><font color='#000000'><b>PARENT:………………………….</b></font></td>"
                rows += "</tr>"
                rows += "<tr><b>" + "</tr>"
                rows += "<span></span><br/><br/><br/>"

            }

            rows += "</table>"

            $("#divReportCard").html(rows);
        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });

}

//// Rank

//$('.total').map(function () {
//    return $(this).text();
//}).get().sort(function (a, b) {
//    return a - b;
//}).reduce(function (a, b) {
//    if (b !== a[0])
//        a.unshift(b);
//    return a;
//}, []).forEach((v, i) => {
//    ('.total').filter(function () {
//        return $(this).text() === v;
//    }).next().text(i + 1);
//});

