$(document).ready(function () {
  $('#plan').on('change', function () {
    var priceText;
    switch (this.value) {
      case 'monthly':
        priceText = '10.00 / month'
        break
      case 'quarterly':
        priceText = '9.00 / month'
        break
      case 'yearly':
        priceText = '7.00 / month'
        break
    }
    $('#price').text(priceText);
  })

  $('#add').on('click', function () {
    var plan = $('#plan')
    var installment = plan.val()
    var price = $('#price').text()
    var inCart = $('#in-cart')
    var numeric = price.replace(/[[A-Za-z$\/\s]/g, '')
    var data = 'data-price="' + numeric + '" data-plan="' + installment + '"';
    inCart.append('<li class ="entry"' + data + '>' + installment + ' - ' + price + '<button class = "remove">x</button></li>')
    // inCart.append(`<li class='entry' #{data}> ${installment} - #{price} </li>`)
    updateTotal()
  })

  function updateTotal() {
    var total = 0
    var entries = $('.entry')

    if (entries.length)
      $('#empty').show()
    else
      $('#empty').hide()

    entries.each(function (index, entry) {
      var data = $(entry).data()
      var price = parseFloat(data.price)
      var installment = data.plan
      switch (installment) {
        case 'monthly':
          total += price;
          break
        case 'quarterly':
          total += price * 3
          break
        case 'yearly':
          total += price * 12
          break
      }
    })
    $('#total').text('$' + total)
  }

  $('#empty').on('click', function () {
    $('#in-cart').empty();
    updateTotal()
  })

  $('#empty').on('click', function () {
    $('#in-cart').empty()
    updateTotal()
  })

  $(document).on('click', '.remove', function () {
    $(this).parents('li').remove()
    updateTotal()

  })

  $('#display-cart').on('click', function () {
    var cart = $('#cart');
    var button = $(this);


    if (button.text() === 'Hide Cart')
      button.text('Show Cart');
    else
      button.text('Hide Cart');

    cart.slideToggle('slow');

  })
  $('#purchase').on('click', function () {
    $('#complete')
      .html('<h2> PURCHASE COMPLETE </h2>')
      .css({
        'backgorund-color': '#bca',
        'width': '25%',
        'border': '1px solid green',
        'text-align': 'center'
      })
      .animate({
        width: '70%',
        opacity: 0.4,
        marginleft: '0.6in',
        fontSize: '3em',
        borderWidth: '10px'
      }, 1500)
  })

})