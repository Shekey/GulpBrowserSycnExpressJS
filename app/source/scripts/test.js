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
  var $totalFoodList =$('#totalFoodList');
  var $fromDb =$('#fromDb');

  $('#querySubmit').click(() => {
    var query =  document.getElementsByName('query')[0].value;
    var currentPage =  document.getElementsByName('currentPage')[0].value;
    document.getElementsByName('query')[0].value = '';
    $.ajax({
      url: '/test/',
      dataType: 'json',
      data: {query: query, currentPage: currentPage},
      type: 'POST',
      success: (data) =>{
        $body.empty();
        $totalFoodList.text(data.result.length);
        var result = data.result;
        $fromDb.text(data.fromDb);
        var tr;
        for (var i = 0; i < result.length; i++) {
          tr = $('<tr/>');
          tr.append("<td>" + result[i].name + "</td>");
          tr.append("<td>" + result[i].category + "</td>");
          tr.append("<td>" + result[i].manu + "</td>");
          $body.append(tr);
        }
      }
    });
  })
})