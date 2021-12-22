$(document).ready(function () {
    document.getElementById('body').style.display = 'none';

});
$("#btnTicket").click(function () {

    document.getElementById('body').style.display = 'block';

    document.getElementById('divTicket').style.display = 'none';
})

$("#btnGetResult").click(function () {

    debugger
    var schoolId = $('#SchoolId').val();
    var schSessionId = $('#SchSessionId').val();
    var termId = $('#TermId').val();
    var classId = $('#ClassId').val();
    var classArm = $('#ClassArm').val();
    getStudentResult(schoolId, schSessionId, termId, classId, classArm);
})

function getStudentResult(schoolId, schSessionId, termId, classId, classArm) {
    debugger
    $.ajax({
        url: '/Students/GetResult?School=' + schoolId + '&SchSessionId=' + schSessionId + '&TermId=' + termId + '&ClassId=' + classId + '&ClassArm=' + classArm,
        type: 'POST',

        async: false,

        data: { 'SchoolId': schoolId, 'SchSessionId': schSessionId, 'TermId=': termId, 'ClassId': classId, 'ClassArm': classArm },
        success: function (data) {
            var rows = '';
            rows += "<table id ='rCard' cellspacing='0' border='0'>"
            rows += "<colgroup span='11' width='73'></colgroup>"
            for (i = 0; i < data.length; i++) {
                rows += "<tr>"
                rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>SUBJECTS<br></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>CA1</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>CA2</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>CA3</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>CA4</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>SUM</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>EXAM</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>TOTAL</b></font></td>"
                rows += "</tr>"

                rows += "<tr>"
                rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>ENGLISH<br></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].englishCA1 + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].englishCA2 + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].englishCA3 + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].englishCA4 + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].englishCATotal + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].englishExam + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].englishTotal + "</b></font></td>"
                rows += "</tr>"

                rows += "<tr>"
                rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>MATHEMATICS<br></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].mathematicsCA1 + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].mathematicsCA2 + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].mathematicsCA3 + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].mathematicsCA4 + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].mathematicsCATotal + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].mathematicsExam + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].mathematicsTotal + "</b></font></td>"
                rows += "</tr>"

                rows += "<tr>"
                rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>ECONOMICS<br></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].economicsCA1 + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].economicsCA2 + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].economicsCA3 + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].economicsCA4 + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].economicsCATotal + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].economicsExam + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].economicsTotal + "</b></font></td>"
                rows += "</tr>"

                rows += "<tr>"
                rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>COMPUTER/ICT<br></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].computer_ictCA1 + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].computer_ictCA2 + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].computer_ictCA3 + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].computer_ictCA4 + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].computer_ictCATotal + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].computer_ictExam + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].computer_ictTotal + "</b></font></td>"
                rows += "</tr>"

                rows += "<tr>"
                rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>YOR/HAU/IGB<br></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].nigeria_languageCA1 + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].nigeria_languageCA2 + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].nigeria_languageCA3 + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].nigeria_languageCA4 + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].nigeria_languageCATotal + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].nigeria_languageExam + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].nigeria_languageTotal + "</b></font></td>"
                rows += "</tr>"

                rows += "<tr>"
                rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>CRK/IRK<br></b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].religion_knowledgeCA1 + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].religion_knowledgeCA2 + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].religion_knowledgeCA3 + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].religion_knowledgeCA4 + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].religion_knowledgeCATotal + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].religion_knowledgeExam + "</b></font></td>"
                rows += "<td align='center'><font color='#000000'><b>" + data[i].religion_knowledgeTotal + "</b></font></td>"
                rows += "</tr>"
                if (classArm === "Science" || classArm === "Technical") {
                    rows += "<tr>"
                    rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>GEOGRAPHY<br></b></font></td>"
                    rows += "<td align='center'><font color='#000000'><b>" + data[i].geographyCA1 + "</b></font></td>"
                    rows += "<td align='center'><font color='#000000'><b>" + data[i].geographyCA2 + "</b></font></td>"
                    rows += "<td align='center'><font color='#000000'><b>" + data[i].geographyCA3 + "</b></font></td>"
                    rows += "<td align='center'><font color='#000000'><b>" + data[i].geographyCA4 + "</b></font></td>"
                    rows += "<td align='center'><font color='#000000'><b>" + data[i].geographyCATotal + "</b></font></td>"
                    rows += "<td align='center'><font color='#000000'><b>" + data[i].geographyExam + "</b></font></td>"
                    rows += "<td align='center'><font color='#000000'><b>" + data[i].geographyTotal + "</b></font></td>"
                    rows += "</tr>"

                    rows += "<tr>"
                    rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>PHYSICS<br></b></font></td>"
                    rows += "<td align='center'><font color='#000000'><b>" + data[i].physicsCA1 + "</b></font></td>"
                    rows += "<td align='center'><font color='#000000'><b>" + data[i].physicsCA2 + "</b></font></td>"
                    rows += "<td align='center'><font color='#000000'><b>" + data[i].physicsCA3 + "</b></font></td>"
                    rows += "<td align='center'><font color='#000000'><b>" + data[i].physicsCA4 + "</b></font></td>"
                    rows += "<td align='center'><font color='#000000'><b>" + data[i].physicsCATotal + "</b></font></td>"
                    rows += "<td align='center'><font color='#000000'><b>" + data[i].physicsExam + "</b></font></td>"
                    rows += "<td align='center'><font color='#000000'><b>" + data[i].physicsTotal + "</b></font></td>"
                    rows += "</tr>"

                    rows += "<tr>"
                    rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>CHEMISTRY<br></b></font></td>"
                    rows += "<td align='center'><font color='#000000'><b>" + data[i].chemistryCA1 + "</b></font></td>"
                    rows += "<td align='center'><font color='#000000'><b>" + data[i].chemistryCA2 + "</b></font></td>"
                    rows += "<td align='center'><font color='#000000'><b>" + data[i].chemistryCA3 + "</b></font></td>"
                    rows += "<td align='center'><font color='#000000'><b>" + data[i].chemistryCA4 + "</b></font></td>"
                    rows += "<td align='center'><font color='#000000'><b>" + data[i].chemistryCATotal + "</b></font></td>"
                    rows += "<td align='center'><font color='#000000'><b>" + data[i].chemistryExam + "</b></font></td>"
                    rows += "<td align='center'><font color='#000000'><b>" + data[i].chemistryTotal + "</b></font></td>"
                    rows += "</tr>"

                    rows += "<tr>"
                    rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>BIOLOGY<br></b></font></td>"
                    rows += "<td align='center'><font color='#000000'><b>" + data[i].biologyCA1 + "</b></font></td>"
                    rows += "<td align='center'><font color='#000000'><b>" + data[i].biologyCA2 + "</b></font></td>"
                    rows += "<td align='center'><font color='#000000'><b>" + data[i].biologyCA3 + "</b></font></td>"
                    rows += "<td align='center'><font color='#000000'><b>" + data[i].biologyCA4 + "</b></font></td>"
                    rows += "<td align='center'><font color='#000000'><b>" + data[i].biologyCATotal + "</b></font></td>"
                    rows += "<td align='center'><font color='#000000'><b>" + data[i].biologyExam + "</b></font></td>"
                    rows += "<td align='center'><font color='#000000'><b>" + data[i].biologyTotal + "</b></font></td>"
                    rows += "</tr>"

                    rows += "<tr>"
                    rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>AGRIC<br></b></font></td>"
                    rows += "<td align='center'><font color='#000000'><b>" + data[i].agricCA1 + "</b></font></td>"
                    rows += "<td align='center'><font color='#000000'><b>" + data[i].agricCA2 + "</b></font></td>"
                    rows += "<td align='center'><font color='#000000'><b>" + data[i].agricCA3 + "</b></font></td>"
                    rows += "<td align='center'><font color='#000000'><b>" + data[i].agricCA4 + "</b></font></td>"
                    rows += "<td align='center'><font color='#000000'><b>" + data[i].agricCATotal + "</b></font></td>"
                    rows += "<td align='center'><font color='#000000'><b>" + data[i].agricExam + "</b></font></td>"
                    rows += "<td align='center'><font color='#000000'><b>" + data[i].agricTotal + "</b></font></td>"
                    rows += "</tr>"

                    if (classArm === "Science" || classArm === "Technical" || classArm === "Commercial") {
                        rows += "<tr>"
                        rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>FMATHS<br></b></font></td>"
                        rows += "<td align='center'><font color='#000000'><b>" + data[i].further_mathsCA1 + "</b></font></td>"
                        rows += "<td align='center'><font color='#000000'><b>" + data[i].further_mathsCA2 + "</b></font></td>"
                        rows += "<td align='center'><font color='#000000'><b>" + data[i].further_mathsCA3 + "</b></font></td>"
                        rows += "<td align='center'><font color='#000000'><b>" + data[i].further_mathsCA4 + "</b></font></td>"
                        rows += "<td align='center'><font color='#000000'><b>" + data[i].further_mathsCATotal + "</b></font></td>"
                        rows += "<td align='center'><font color='#000000'><b>" + data[i].further_mathsExam + "</b></font></td>"
                        rows += "<td align='center'><font color='#000000'><b>" + data[i].further_mathsTotal + "</b></font></td>"
                        rows += "</tr>"
                    }

                    if (classArm === "Technical") {
                        rows += "<tr>"
                        rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>TD<br></b></font></td>"
                        rows += "<td align='center'><font color='#000000'><b>" + data[i].technical_drawingCA1 + "</b></font></td>"
                        rows += "<td align='center'><font color='#000000'><b>" + data[i].technical_drawingCA2 + "</b></font></td>"
                        rows += "<td align='center'><font color='#000000'><b>" + data[i].technical_drawingCA3 + "</b></font></td>"
                        rows += "<td align='center'><font color='#000000'><b>" + data[i].technical_drawingCA4 + "</b></font></td>"
                        rows += "<td align='center'><font color='#000000'><b>" + data[i].technical_drawingCATotal + "</b></font></td>"
                        rows += "<td align='center'><font color='#000000'><b>" + data[i].technical_drawingExam + "</b></font></td>"
                        rows += "<td align='center'><font color='#000000'><b>" + data[i].technical_drawingTotal + "</b></font></td>"
                        rows += "</tr>"

                        rows += "<tr>"
                        rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>M/W WORK<br></b></font></td>"
                        rows += "<td align='center'><font color='#000000'><b>" + data[i].metal_wood_workCA1 + "</b></font></td>"
                        rows += "<td align='center'><font color='#000000'><b>" + data[i].metal_wood_workCA2 + "</b></font></td>"
                        rows += "<td align='center'><font color='#000000'><b>" + data[i].metal_wood_workCA3 + "</b></font></td>"
                        rows += "<td align='center'><font color='#000000'><b>" + data[i].metal_wood_workCA4 + "</b></font></td>"
                        rows += "<td align='center'><font color='#000000'><b>" + data[i].metal_wood_workCATotal + "</b></font></td>"
                        rows += "<td align='center'><font color='#000000'><b>" + data[i].metal_wood_workExam + "</b></font></td>"
                        rows += "<td align='center'><font color='#000000'><b>" + data[i].metal_wood_workTotal + "</b></font></td>"
                        rows += "</tr>"
                    }

                    if (classArm === "Commercial") {
                        rows += "<tr>"
                        rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>ACCOUNT<br></b></font></td>"
                        rows += "<td align='center'><font color='#000000'><b>" + data[i].financial_accountCA1 + "</b></font></td>"
                        rows += "<td align='center'><font color='#000000'><b>" + data[i].financial_accountCA2 + "</b></font></td>"
                        rows += "<td align='center'><font color='#000000'><b>" + data[i].financial_accountCA3 + "</b></font></td>"
                        rows += "<td align='center'><font color='#000000'><b>" + data[i].financial_accountCA4 + "</b></font></td>"
                        rows += "<td align='center'><font color='#000000'><b>" + data[i].financial_accountCATotal + "</b></font></td>"
                        rows += "<td align='center'><font color='#000000'><b>" + data[i].financial_accountExam + "</b></font></td>"
                        rows += "<td align='center'><font color='#000000'><b>" + data[i].financial_accountTotal + "</b></font></td>"
                        rows += "</tr>"

                        rows += "<tr>"
                        rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>COMMERCE<br></b></font></td>"
                        rows += "<td align='center'><font color='#000000'><b>" + data[i].commerceCA1 + "</b></font></td>"
                        rows += "<td align='center'><font color='#000000'><b>" + data[i].commerceCA2 + "</b></font></td>"
                        rows += "<td align='center'><font color='#000000'><b>" + data[i].commerceCA3 + "</b></font></td>"
                        rows += "<td align='center'><font color='#000000'><b>" + data[i].commerceCA4 + "</b></font></td>"
                        rows += "<td align='center'><font color='#000000'><b>" + data[i].commerceCATotal + "</b></font></td>"
                        rows += "<td align='center'><font color='#000000'><b>" + data[i].commerceExam + "</b></font></td>"
                        rows += "<td align='center'><font color='#000000'><b>" + data[i].commerceTotal + "</b></font></td>"
                        rows += "</tr>"
                        if (classArm === "Art") {
                            rows += "<tr>"
                            rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>GOVERNMENT<br></b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].governmentCA1 + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].governmentCA2 + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].governmentCA3 + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].governmentCA4 + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].governmentCATotal + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].governmentExam + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].governmentTotal + "</b></font></td>"
                            rows += "</tr>"

                            rows += "<tr>"
                            rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>HISTORY<br></b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].historyCA1 + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].historyCA2 + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].historyCA3 + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].historyCA4 + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].historyCATotal + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].historyExam + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].historyTotal + "</b></font></td>"
                            rows += "</tr>"

                            rows += "<tr>"
                            rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>LIENG<br></b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].literature_in_englishCA1 + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].literature_in_englishCA2 + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].literature_in_englishCA3 + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].literature_in_englishCA4 + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].literature_in_englishCATotal + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].literature_in_englishExam + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].literature_in_englishTotal + "</b></font></td>"
                            rows += "</tr>"
                        }

                        if (classId === "JSS1" || classId === "JSS2" || classId === "JSS3") {
                            rows += "<tr>"
                            rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>VISUAL ARTS<br></b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].visual_artsCA1 + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].visual_artsCA2 + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].visual_artsCA3 + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].visual_artsCA4 + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].visual_artsCATotal + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].visual_artsExam + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].visual_artsTotal + "</b></font></td>"
                            rows += "</tr>"

                            rows += "<tr>"
                            rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>HOME MGNT<br></b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].home_managementCA1 + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].home_managementCA2 + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].home_managementCA3 + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].home_managementCA4 + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].home_managementCATotal + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].home_managementExam + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].home_managementTotal + "</b></font></td>"
                            rows += "</tr>"
                            rows += "<tr>"
                            rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>CLOTH&TEXT<br></b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].cloth_and_textileCA1 + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].cloth_and_textileCA2 + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].cloth_and_textileCA3 + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].cloth_and_textileCA4 + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].cloth_and_textileCATotal + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].cloth_and_textileExam + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].cloth_and_textileTotal + "</b></font></td>"
                            rows += "</tr>"

                            rows += "<tr>"
                            rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>FOOD&NUTR<br></b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].food_and_nutritionCA1 + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].food_and_nutritionCA2 + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].food_and_nutritionCA3 + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].food_and_nutritionCA4 + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].food_and_nutritionCATotal + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].food_and_nutritionExam + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].food_and_nutritionTotal + "</b></font></td>"
                            rows += "</tr>"

                            rows += "<tr>"
                            rows += "<td colspan=4 height='21' align='left'><font color='#000000'><b>MUSIC<br></b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].musicCA1 + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].musicCA2 + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].musicCA3 + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].musicCA4 + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].musicCATotal + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].musicExam + "</b></font></td>"
                            rows += "<td align='center'><font color='#000000'><b>" + data[i].musicTotal + "</b></font></td>"
                            rows += "</tr>"
                        }
                    }

                }


            }
            rows += "</table>"

            $("#divResult").html(rows);
        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
}