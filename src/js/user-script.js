$(document).ready(function () {
  var url = location.protocol + '//' + location.hostname + ':' + location.port
  for (var i = 0; i < 15; i++) {
    var current
    console.log(i + ': ' + (i % 5))
    $('#friends').append("<div style='height: 80px; width: 80px; margin-top:0%; margin:4%;'> <a href='http://pudim.com.br'><button type='button' class='btn btn-lg btn-danger' style='background-color: orange; border: none; height: 100%; width: 100%; border-radius: 50%;'></button></a></div>")
  }
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
    if ($(document).scrollTop() > 250) {
      if (!$( "#perfilUm" ).length) {
        $('.navbar-nav').append("<div id='perfilUm' class='fade-in' style='height: 20px; width: 20px;'><button type='button' class='btn btn-lg btn-danger' id='photoPerfil2' data-toggle='popover' title='José' data-content='<a href=\"http://pudim.com.br\">Editar perfil</a>' style='margin-top: 40%; border: none;'></button></div>")
        $(function () {
          var template1 = '<a href="http://pudim.com.br" class="popover-body">editar perfil</a>'
        $('#photoPerfil2').popover({html: true})
      })
      }
    } else {
      if ($( "#perfilDois" ).length) {
        $('#photoPerfil2').popover('dispose')
        $('#perfilUm').remove()
      }
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

  $.ajax({
    type: 'GET',
    url: window.location.href
    success: function (data) {
      console.log(data)
      // $('.ui-menu-item-wrapper').each(function (index) {
      //   console.log('val' + $('.ui-menu-item-wrapper').eq(index).val())
      //   $('.ui-menu-item-wrapper').eq(index).attr('href', url + '/:' + $('.ui-menu-item-wrapper').eq(index).val())
      // })
    }
  })
  // $('#home').attr('href', url + '/home:' + )
})
