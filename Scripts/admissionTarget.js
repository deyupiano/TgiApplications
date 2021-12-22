$(function () {
    $("#loaderbody").addClass('hide');


    $(document).bind('ajaxStart', function () {
        $("#loaderbody").removeClass('hide');
    }).bind('ajaxStop', function () {
        $("#loaderbody").addClass('hide');
    });
});
$(document).ready(function () {
 
    $('#admissionTarget').hide();
});

// Set title for create new

$('.ddl').change(function () {
    //debugger
        if (this.value === '1') {
            $('#admissionTarget').show();
        }
        else {
            $('#admissionTarget').hide();
        }
    });


// Close modal
$("#btnClose").click(function () {
    clear();
});

// Clear all items
function clear() {
    $("#HfId").val("");
    $("#Name").val("");
    $("#Address").val("");
}