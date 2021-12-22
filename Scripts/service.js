$(document).ready(function () {
    alert("HHHHHHHHHHHHHHHHHHHHHHh");
    alert(@Model.ServiceCategoryId);
    var $Cat = $("#ServiceCategoryId");
    var $Itm = $("#ItemId");

    $Cat.children().filter(function () {
        return this.value == @Model.ServiceCategoryId;
    }).prop('selected', true);
    $Itm.children().filter(function () {
        return this.value == @Model.ItemId;
    }).prop('selected', true);
});