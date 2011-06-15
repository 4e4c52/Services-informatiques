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
        is_validated: false
        name: name
        first_name: first_name
        email: email
        mac_address: mac_address
      }
      success: (result) ->
        data = jQuery.parseJSON result
        if data.status is 200
          $('#ajax-response').html('').html '<div class="info">' + data.message + '</div>'
          $('#mac_address').val ''
        else if data.status is 400 or data.status is 500
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
        else if data.status is 400 or data.status is 500
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
        else if data.status is 400 or data.status is 500
          $('#ajax-response').html('').html '<div class="warning">' + data.message + '</div>'
      error: (a, b, c) ->
        $('#ajax-response').html('').html '<div class="warning">Impossible de contacter le serveur.</div>'
    })
    
  # Show the form to add a R/W user
  $('#add_rw_user').click (e) ->
    offset = $(@).offset()
    if $('#add_rw_user_box').hasClass 'active'
      $('#add_rw_user_box').css('left', -10000).removeClass('active');
    else
      if $('#add_r_user_box').hasClass 'active'
        $('#add_r_user_box').css('left', -10000).removeClass('active');
      $('#add_rw_user_box').css('left', offset.left - 155).css('top', offset.top - 55).addClass('active');
      $('#rw_user_login').focus()
    false
    
  # Show the form to add a R user
  $('#add_r_user').click (e) ->
    offset = $(@).offset()
    if $('#add_r_user_box').hasClass 'active'
      $('#add_r_user_box').css('left', -10000).removeClass('active');
    else
      if $('#add_rw_user_box').hasClass 'active'
        $('#add_rw_user_box').css('left', -10000).removeClass('active');
      $('#add_r_user_box').css('left', offset.left - 155).css('top', offset.top - 55).addClass('active');
      $('#r_user_login').focus()
    false
    
  save_rw_user = ->
    total = $('#rw_users_count').val()
    total++
    $('#rw_users_count').val(total)
    
    user = $('#rw_user_login').val()
    $('#rw_user_login').val('')
    
    logins = $('#rw_users_logins').val()
    logins += user + ';'
    $('#rw_users_logins').val(logins)
    
    entry = '<li id="rw_user_' + total + '" class="rw_user"><strong>' + user + '</strong>&nbsp;';
    entry += '<a href="#" id="delete_rw_user_' + total + '" class="delete_rw_user"><img src="images/bin.png" alt="supprimer" /></a></li>';
      
    $('#rw_users').append(entry);
    $('#add_rw_user_box').css('left', -10000).removeClass('active');
    
  # Save a RW user
  $('#add_rw_user_button').click ->
    save_rw_user()
  $('#rw_user_login').keydown (e) ->
    if e.keyCode is 13
      save_rw_user()
      
  save_r_user = ->
    total = $('#r_users_count').val()
    total++
    $('#r_users_count').val(total)
    
    user = $('#r_user_login').val()
    $('#r_user_login').val('')
    
    logins = $('#r_users_logins').val()
    logins += user + ';'
    $('#r_users_logins').val(logins)
    
    entry = '<li id="r_user_' + total + '" class="r_user"><strong>' + user + '</strong>&nbsp;';
    entry += '<a href="#" id="delete_r_user_' + total + '" class="delete_r_user"><img src="images/bin.png" alt="supprimer" /></a></li>';
      
    $('#r_users').append(entry);
    $('#add_r_user_box').css('left', -10000).removeClass('active');
            
  # Save a R user
  $('#add_r_user_button').click ->
    save_r_user()
  $('#r_user_login').keydown (e) ->
    if e.keyCode is 13
      save_r_user()
       
  # Remove a RW user
  $('.delete_rw_user').live 'click', ->
    $(@).parent().remove()
    total = $('#rw_users_count').val()
    total--
    $('#rw_users_count').val(total)
    
    $('#rw_users_logins').val('')
    
    i = 1
    logins = ''
    $('.rw_user').each ->
      $(@).attr('id', 'rw_user_' + i)
      $(@).find('.delete_rw_user').attr('id', 'delete_rw_user_' + i);
      user = $(@).find('strong').text()
      logins += user + ';'
      i++
    $('#rw_users_logins').val(logins)
    false
    
  # Remove a R user
  $('.delete_r_user').live 'click', ->
    $(@).parent().remove()
    total = $('#r_users_count').val()
    total--
    $('#r_users_count').val(total)
    
    $('#r_users_logins').val('')
    
    i = 1
    logins = ''
    $('.r_user').each ->
      $(@).attr('id', 'r_user_' + i)
      $(@).find('.delete_r_user').attr('id', 'delete_r_user_' + i);
      user = $(@).find('strong').text()
      logins += user + ';'
      i++
    $('#r_users_logins').val(logins)
    false
    
  # Save a SVN request
  $('#add_svn').click ->
    
    $('#ajax-response').html('').html loader
    
    repository = $('#repository').val()
    email = $('#email').val()
    rw_users_count = $('#rw_users_count').val()
    rw_users_logins = $('#rw_users_logins').val()
    r_users_count = $('#r_users_count').val()
    r_users_logins = $('#r_users_logins').val()
    
    $.ajax({
      type: 'post'
      url: 'data/receiver.php'
      data: {
        action: 'add_repository'
        is_validated: false
        repository: repository
        email: email
        rw_users_count: rw_users_count
        rw_users_logins: rw_users_logins
        r_users_count: r_users_count
        r_users_logins: r_users_logins
      }
      success: (result) ->
        data = jQuery.parseJSON result
        if data.status is 200
          $('#rw_users_count').val('0')
          $('#r_users_count').val('0')
          $('#rw_users_logins').val('')
          $('#r_users_logins').val('')
          $('#repository').val('')
          $('#email').val('')
          $('#rw_users').html('')
          $('#r_users').html('')
          $('#ajax-response').html('').html '<div class="info">' + data.message + '</div>'
        else if data.status is 400 or data.status is 500
          $('#ajax-response').html('').html '<div class="warning">' + data.message + '</div>'          
      error: (a, b, c) ->
        $('#ajax-response').html('').html '<div class="warning">Impossible de contacter le serveur.</div>'
    })