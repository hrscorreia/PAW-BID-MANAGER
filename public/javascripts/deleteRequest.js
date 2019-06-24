
function disableItem(){
    var id = $(this).
    //.parent().parent().children('.id').html();

    alert(id);

    $.ajax({
        url: "http://localhost:3000/me/"+id,
        type: "DELETE",
        sucess: function(result){
        }
    })
}