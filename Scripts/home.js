
$(document).ready(function () {
    getInformation();

});
// Declare a variable to check when the action is Insert or Update
var isUpdateable = false;
var html = '';

function getInformation() {
    //debugger
    $.ajax({
        url: '/Pages/News/',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            //debugger
            var rows = '';
            $.each(data, function (i, item) {
                var obj = JSON.stringify(data);
                // Remove all instance of square bracket from json string 
                obj = obj.replace(/[\[\]']+/g, '');
                // Remove all instance of comma and replace with <<<<<<<<<<<<
                obj = obj.replace(/,/g, " <<<<<<<< ");
                // Remove all instance of quotation mark and replace with space
                obj = obj.replace(/"/g, " ");
                rows += '<span>';
                rows += '<<<<<<<<<<' + obj + '<<<<<<<<<<< '
                rows += '</span>'
                $('#news').html(rows);

            });


        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });

    //function getInformation() {
    //    debugger
    //    $.ajax({
    //        url: '/Pages/News/',
    //        type: 'GET',
    //        dataType: 'json',
    //        success: function (data) {
    //            //debugger
    //            var rows = '';
    //            rows += "<<<<<<<<<<" + data + "<<<<<<<<<<< ";
    //            $("#news").html(rows);
    //        },
    //        error: function (err) {
    //            alert("Error: " + err.responseText);
    //        }
    //    });
    //}
}