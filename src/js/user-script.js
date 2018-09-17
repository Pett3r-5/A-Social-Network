$(document).ready(function () {
  // var source = document.getElementById('vai').innerHTML
  // var template = Handlebars.compile(source)
  // var output = template({nome: 'oi', _id: 'ninguem'})
  // document.getElementById('pp').innerHTML = output
  var url = location.protocol + '//' + location.hostname + ':' + location.port
// background-image: url('../avatar.jpg');
  $('html').on('click', function(e) {
  if (typeof $(e.target).data('original-title') === 'undefined' && !$(e.target).parents().is('.popover.in')) {
    $('[data-original-title]').popover('hide');
  }
});
  $('.ui-menu-item-wrapper').click(function () {
    // window.location = url + '/user:' + $('#searching').val()
    console.log(foi);
    $('#procura').attr('href', url + '/user:' + $('#searching').val())
  })
  $('#procura').click(function (event) {
    event.preventDefault()
    window.location = url + '/user:' + $('#searching').val()
  })
  // document.getElementsByClassName('postFriend').onclick
  document.getElementById("searching").onkeyup = function (event) {
    var input = $('#searching').val()
    console.log(input)
    $.ajax({
      type: 'GET',
      data: input,
      url: url + '/search',
      success: function (data) {
        for (var i = 0; i < data.length; i++) {
          data[i] = data[i].nome
        }
        $('#searching').autocomplete({
          source: data,
          select: function (e, ui) {
            $('#procura').click(function (event) {
              event.preventDefault()
              window.location = url + '/user:' + ui.item.value
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
