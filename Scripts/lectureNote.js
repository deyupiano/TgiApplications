$(document).ready(function () {
    getDocumentList();
    document.getElementById('security').style.display = 'none';
});



var doc = '';
function OpenDocx(doc) {
    $.ajax({
        url: '/School/GetDocumentForEdit?DocumentPath=' + doc,
        type: 'POST',
        async: false,
        data: { 'DocumentPath': doc },
        success: function (data) {
            debugger
            HtmlEditor.SetHtml(data);

            //$("#HtmlEditor").val(data);
            //window.location.href = "/School/LectureNote";
            //debugger
            //$("#DocumentDocxName").val(docN);
            //$("#Id").val(docId);
        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }

    });
}
$("#SaveButton").click(function () {
    document.getElementById('security').style.display = 'none';
})

$("#OpenDocx").click(function () {
    debugger
    $.ajax({
        url: '/School/GetDocumentById/' + id,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $("#Id").val(data.Id);
            $("#DocumentPath").val(data.DocumentPath);//$("#DocumentPath").is(':checked');
            $("#ChkCanAssembleDocument").val(data.ChkCanAssembleDocument);
            $("#ChkCanCopyContent").val(data.ChkCanCopyContent);
            $("#ChkCanEditAnnotations").val(data.ChkCanEditAnnotations);
            $("#ChkCanEditContent").val(data.ChkCanEditContent);
            $("#ChkCanFillFormFields").val(data.ChkCanFillFormFields);
            $("#ChkCanPrint").val(data.ChkCanPrint);
            $("#ClassDescrip").val(data.ClassDescrip);
            OpenDocx(data.DocumentPath);
        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });

});
var Id = '';
function getDocumentList() {
    //debugger
    $.ajax({
        url: '/School/TeacherDocumentList/',
        type: 'get',
        dataType: 'json',
        success: function (data) {

            $('#documentTab').DataTable({
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
                        'visible': false,
                        'render': function (id) {
                            Id = id;
                            return Id;
                        }
                    },
                    {
                        'data': 'DocumentPath',
                        'render': function (fileDir) {
                            debugger
                            if (fileDir !== null) {
                                docxpath = fileDir;
                                var path = fileDir.substr(13);
                                return '<a href="" onclick="return getDocumentById(' + Id + ')">' + path + '</a>';
                            } else {
                                return null
                            }

                        }
                    },

                    {
                        'data': 'DateCreated',
                        'render': function (jsonDate) {
    
                            if (jsonDate !== null) {
                                var date = new Date(parseInt(jsonDate.substr(6)));
                                var month = date.getMonth() + 1;
                                return date.getDate() + "/" + month + "/" + date.getFullYear();
                            }
                        }
                    },
                    {
                        'data': 'LastModifiedDate',
                        'render': function (jsonD) {
                            if (jsonD !== null) {
                                var date = new Date(parseInt(jsonD.substr(6)));
                                var month = date.getMonth() + 1;
                                return date.getDate() + "/" + month + "/" + date.getFullYear();
                            } else {
                                return null;

                            }
                        }
                    },
                    { 'data': 'Downloadable' },
                    {
                        "data": "Id", "render": function (Id) {
                            return "<button type='button' id='btnEdit' class='btn btn-default glyphicon glyphicon-pencil' onclick='return getDocumentById(" + Id + ")'></button> <button type='button' id='btnDelete' class='btn btn-danger glyphicon glyphicon-trash' onclick='return deleteDocumentById(" + Id + ")'></button>";
                        },
                    },

                ],

            });
        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
}

function deleteDocumentById(id) {
    $("#confirmModal #title").text("Remove Document From List");
    $("#confirmModal").modal('show');
    $("#confirmModal #btnOk").click(function (e) {
        $.ajax({
            url: "/School/DeleteDocumentById/" + id,
            type: "POST",
            dataType: 'json',
            success: function (data) {
                $("#confirmModal").modal('hide');
                $("#documentTab").dataTable().fnDestroy();
                getDocumentList();
            },
            error: function (err) {
                alert("Error: " + err.responseText);
            }
        });

        e.preventDefault();
    });
}
var docId = '';
var docN = '';
function getDocumentById(id) {
    debugger
    $.ajax({
        url: '/School/GetDocumentById/' + id,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            document.getElementById('security').style.display = 'block';
            $("#Id").val(data.Id);
            var docNamePlusExt = data.DocumentPath.substr(13);
            var docNameOnly = docNamePlusExt.substr(0, docNamePlusExt.length - 5);
            $("#DocumentPath").val(docNameOnly);
            docN = docNameOnly;
            $("#ChkCanAssembleDocument").val(data.ChkCanAssembleDocument);
            $("#ChkCanCopyContent").val(data.ChkCanCopyContent);
            $("#ChkCanEditAnnotations").val(data.ChkCanEditAnnotations);
            $("#ChkCanEditContent").val(data.ChkCanEditContent);
            $("#ChkCanFillFormFields").val(data.ChkCanFillFormFields);
            $("#ChkCanPrint").val(data.ChkCanPrint);
            $("#ClassDescrip").val(data.ClassDescrip);
            docId = data.Id;

            OpenDocx(docNameOnly);
        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
}

