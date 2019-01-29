$(document).ready(() => {
  var $pageLinks = $('.pagination a');
  var currentPage = document.getElementsByName('currentPage')[0];
  var tr = document.querySelectorAll('#foods-table-body tr');

  for (var i = 0; i < $pageLinks.length; i++) {
    $pageLinks[i].addEventListener('click', (e) => {
      currentPage.value = e.target.text;
      var query = document.getElementsByName('query')[0].value;
      var $activeLink = $('.pagination a.active');
      $activeLink[0].classList.remove('active');
      e.target.classList.add('active');
      ajaxCall(query, currentPage.value>0?currentPage.value-1:currentPage);
    });
  };

  for (var j = 0; j < tr.length; j++) {
    tr[j].addEventListener('click', () => {
      // window.location.href = "http://stackoverflow.com"+tr.item(i).dataset.href;
      window.location.href = "http://localhost:9001/test/"+tr.item(i).dataset.href;
    });
  };

  $('#querySubmit').click(() => {
    var $activeLink = $('.pagination a.active');
    $activeLink[0].classList.remove('active');
    $pageLinks[0].classList.add('active');
    var currentPageValue = 0;
    var query = document.getElementsByName('query')[0].value;
    var $body = $('#foods-table-body');
    var $totalFoodList = $('#totalFoodList');
    var $fromDb = $('#fromDb');
    $.ajax({
      url: '/test/',
      dataType: 'json',
      data: { query: query, currentPage: currentPageValue },
      type: 'POST',
      success: (data) => {
        $body.empty();
        $totalFoodList.text(data.offset +'/' + data.total);
        var result = data.result;
        $fromDb.text(data.fromDb);
        var tr;
        for (var i = 0; i < result.length; i++) {
          tr = $('<tr/>');
          tr.append("<td>" + result[i].name + "</td>");
          tr.append("<td>" + result[i].category + "</td>");
          tr.append("<td>" + result[i].manu + "</td>");
          tr.append("<td>" + result[i].ndbno + "</td>");
          $body.append(tr);
        }
      }
    });
  })
})

function ajaxCall(query, currentPageValue) {
  $.ajax({
    url: '/test/',
    dataType: 'json',
    data: { query: query, currentPage: currentPageValue },
    type: 'POST',
    success: (data) => {
      var $body = $('#foods-table-body');
      var $totalFoodList = $('#totalFoodList');
      var $fromDb = $('#fromDb');
      $body.empty();
      $totalFoodList.text(data.offset +'/' + data.total);
      var result = data.result;
      $fromDb.text(data.fromDb);
      var tr;
      for (var i = 0; i < result.length; i++) {
        tr = $('<tr/>');
        tr.append("<td>" + result[i].name + "</td>");
        tr.append("<td>" + result[i].category + "</td>");
        tr.append("<td>" + result[i].manu + "</td>");
        tr.append("<td>" + result[i].ndbno + "</td>");
        $body.append(tr);
      }
    }
  });
}

