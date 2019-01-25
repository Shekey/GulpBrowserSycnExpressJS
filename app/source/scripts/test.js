var perPage = document.querySelector('input[name=perPage]');
var currentPage = document.querySelector('input[name=currentPage]');
var form = document.querySelector('.search-form');
var pagination = document.querySelectorAll('.pagination a');
pagination.forEach(element => {
  element.addEventListener('click',function(e){
    var active = document.querySelector('.pagination a.active');
    currentPage.value= element.innerHTML;
    active.classList.remove('active');
    element.classList.add('active');
    form.submit();
  })
});

console.log(perPage);
console.log(currentPage);
console.log("Hello world");