jQuery ->
  
  # Toggle the tuts menu
  $('#tuts-index').click ->
    $('#tuts').toggle()
    false
    
  # Save a mac address
  $('#add_mac').click ->
    
    name = $('#name').val()
    first_name = $('#first_name').val()
    mac_address = $('#mac_address').val()
    
    $.ajax({
      type: 'post'
      url: 'data/receiver.php'
      data: {
        action: 'add_mac'
        name: name
        first_name: first_name
        mac_address: mac_address
        is_validated: false
      }
      success: (result) ->
        data = jQuery.parseJSON result
        if data.status is 200
          $('#ajax-response').html('').html '<div class="info">' + data.message + '</div>'
        else if data.status is 400
          $('#ajax-response').html('').html '<div class="warning">' + data.message + '</div>'
    })