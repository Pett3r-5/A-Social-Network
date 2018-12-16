$(document).ready(function () {
  // var source = document.getElementById('vai').innerHTML
  // var template = Handlebars.compile(source)
  // var output = template({nome: 'oi', _id: 'ninguem'})
  // document.getElementById('pp').innerHTML = output
  if ($(window).width() <= 1097) {
    $('.wrapper').css('grid-template-columns', 'repeat(6, 1fr)');
  } else{
      $('.wrapper').css('grid-template-columns', 'repeat(8, 1fr)');
  }
  $(window).resize(function(){
    if($(window).width()<= 1097){
        $('.wrapper').css('grid-template-columns', 'repeat(6, 1fr)');
    } else{
        $('.wrapper').css('grid-template-columns', 'repeat(8, 1fr)');
    }
  })

  if ($(window).width() <= 750) {
    $('.wrapper').css('grid-template-columns', 'repeat(4, 1fr)');
  }
  $(window).resize(function(){
    if($(window).width() <= 750){
        $('.wrapper').css('grid-template-columns', 'repeat(4, 1fr)');
    }
  })

  var url = location.protocol + '//' + location.hostname + ':' + location.port
  $('#settings').attr('href', url + '/config')
// background-image: url('../avatar.jpg');
  $('html').on('click', function(e) {
  if (typeof $(e.target).data('original-title') === 'undefined' && !$(e.target).parents().is('.popover.in')) {
    $('[data-original-title]').popover('hide');
  }
});
  $('.ui-menu-item-wrapper').click(function () {
    // window.location = url + '/user:' + $('#searching').val()
    $('#procura').attr('href', url + '/users/user:' + $('#searching').val())
  })
  $('#procura').click(function (event) {
    event.preventDefault()
    window.location = url + '/users/user:' + $('#searching').val()
  })
  // document.getElementsByClassName('postFriend').onclick
  document.getElementById("searching").onkeyup = function (event) {
    var input = $('#searching').val()
    $.ajax({
      type: 'GET',
      data: input,
      url: url + '/actions/search',
      success: function (data) {
        for (var i = 0; i < data.length; i++) {
          data[i] = data[i].nome
        }
        $('#searching').autocomplete({
          source: data,
          select: function (e, ui) {
            $('#procura').click(function (event) {
              event.preventDefault()
              window.location = url + '/users/user:' + ui.item.value
            })
          }
        // $('.ui-menu-item-wrapper').each(function (index) {
        //   console.log('val' + $('.ui-menu-item-wrapper').eq(index).val())
        //   $('.ui-menu-item-wrapper').eq(index).attr('href', url + '/:' + $('.ui-menu-item-wrapper').eq(index).val())
        // })
        })
      }
    })
  // $('#home').attr('href', url + '/home:' + )
  }
})