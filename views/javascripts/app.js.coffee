jQuery ->
  
  loader = '<img src="images/loader.gif" alt="#" />&nbsp;<strong>Veuillez patienter...</strong>'
  
  # Toggle the tuts menu
  $('#tuts-index').click ->
    $('#tuts').toggle()
    false
    
  # Save a mac address
  $('#add_mac').click ->
    
    $('#ajax-response').html('').html loader
    
    name = $('#name').val()
    first_name = $('#first_name').val()
    email = $('#email').val()
    mac_address = $('#mac_address').val()
    
    $.ajax({
      type: 'post'
      url: 'data/receiver.php'
      data: {
        action: 'add_mac'
        name: name
        first_name: first_name
        email: email
        mac_address: mac_address
        is_validated: false
      }
      success: (result) ->
        data = jQuery.parseJSON result
        if data.status is 200
          $('#ajax-response').html('').html '<div class="info">' + data.message + '</div>'
          $('#mac_address').val ''
        else if data.status is 400
          $('#ajax-response').html('').html '<div class="warning">' + data.message + '</div>'
      error: (a, b, c) ->
        $('#ajax-response').html('').html '<div class="warning">Impossible de contacter le serveur.</div>'
    })
    
  # Save a cc signature
  $('#add_cc').click ->
    
    $('#ajax-response').html('').html loader
    
    name = $('#name').val()
    first_name = $('#first_name').val()
    email = $('#email').val()
    
    $.ajax({
      type: 'post'
      url: 'data/receiver.php'
      data: {
        action: 'add_cc'
        name: name
        first_name: first_name
        email: email
      }
      success: (result) ->
        data = jQuery.parseJSON result
        if data.status is 200
          $('#ajax-response').html('').html '<div class="info">' + data.message + '</div>'
        else if data.status is 400
          $('#ajax-response').html('').html '<div class="warning">' + data.message + '</div>'
      error: (a, b, c) ->
        $('#ajax-response').html('').html '<div class="warning">Impossible de contacter le serveur.</div>'
    })
    
  # Save a cp signature
  $('#add_cp').click ->
    
    $('#ajax-response').html('').html loader
    
    name = $('#name').val()
    first_name = $('#first_name').val()
    email = $('#email').val()
    
    $.ajax({
      type: 'post'
      url: 'data/receiver.php'
      data: {
        action: 'add_cp'
        name: name
        first_name: first_name
        email: email
      }
      success: (result) ->
        data = jQuery.parseJSON result
        if data.status is 200
          $('#ajax-response').html('').html '<div class="info">' + data.message + '</div>'
        else if data.status is 400
          $('#ajax-response').html('').html '<div class="warning">' + data.message + '</div>'
      error: (a, b, c) ->
        $('#ajax-response').html('').html '<div class="warning">Impossible de contacter le serveur.</div>'
    })
    
  # Show the form to add a R/W user
  $('#add_rw_user').click (e) ->
    $('#add_user_rw_box').css('left', e.pageX - 60).css('top', e.pageY - 180);
    
  # Show the form to add a R user
  $('#add_r_user').click (e) ->
    $('#add_user_r_box').css('left', e.pageX - 60).css('top', e.pageY - 180);
    