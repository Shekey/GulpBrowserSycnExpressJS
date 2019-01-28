// var perPage = document.querySelector('input[name=perPage]');
// var currentPage = document.querySelector('input[name=currentPage]');
// var form = document.querySelector('.search-form');
// var pagination = document.querySelectorAll('.pagination a');
// pagination.forEach(element => {
//   element.addEventListener('click',function(e){
//     var active = document.querySelector('.pagination a.active');
//     currentPage.value= element.innerHTML;
//     active.classList.remove('active');
//     element.classList.add('active');
//     form.submit();
//   })
// });

// console.log(perPage);
// console.log(currentPage);
// console.log("Hello world");

//started using jquery

$(document).ready (() => {
  var $body =$('#foods-table-body');
  $('#querySubmit').click(() => {
    var query =  document.getElementsByName('query')[0].value;
    var currentPage =  document.getElementsByName('currentPage')[0].value;
    document.getElementsByName('query')[0].value = '';
    console.log(query);
    $.ajax({
      url: '/test/',
      dataType: 'json',
      data: {query: query, currentPage: currentPage},
      type: 'POST',
      success: (data) =>{
        $body.empty();
        var tr;
        for (var i = 0; i < data.length; i++) {
          tr = $('<tr/>');
          tr.append("<td>" + data[i].name + "</td>");
          tr.append("<td>" + data[i].category + "</td>");
          tr.append("<td>" + data[i].manu + "</td>");
          $body.append(tr);
        }
      }
    });
  })
})