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
  window.addEventListener('scroll', function () {
    if ($(document).scrollTop() > 50) {
      $('#navbarSupportedContent').css('padding-bottom', '0%')
      $('#navbarSupportedContent').css('padding-top', '0%')
      $('#logo').css('font-size', '100%')
      $('#logo').css('color', 'rgb(100, 150, 200)')
      $('#navbase').css('background-color', 'rgb(250, 250, 250)')
      console.log('oi')
    } else {
      $('#navbarSupportedContent').css('padding-bottom', '2%')
      $('#navbarSupportedContent').css('padding-top', '2%')
      $('#logo').css('font-size', '300%')
      $('#logo').css('color', 'rgb(150, 200, 250)')
      $('#navbase').css('background-color', 'rgb(228, 199, 255)')
      console.log('io')
    }
  })
  $('.ui-menu-item-wrapper').click(function () {
    // window.location = url + '/user:' + $('#searching').val()
    console.log(foi);
    $('#procura').attr('href', url + '/user:' + $('#searching').val())
  })
  document.getElementById("searching").onkeyup = function (event) {
    var input = $('#searching').val()
    console.log(input)
    $.ajax({
      type: 'GET',
      data: input,
      url: url + '/search',
      success: function (data) {
        console.log(data)
        if (!Array.isArray(data)) {
          data = [data]
          console.log(data)
        }
        $('#searching').autocomplete({
          source: data
        })
        // $('.ui-menu-item-wrapper').each(function (index) {
        //   console.log('val' + $('.ui-menu-item-wrapper').eq(index).val())
        //   $('.ui-menu-item-wrapper').eq(index).attr('href', url + '/:' + $('.ui-menu-item-wrapper').eq(index).val())
        // })
      }
    })
  }
  $("#postFriend").attr('action', window.location.href)
  // $('#home').attr('href', url + '/home:' + )
})
