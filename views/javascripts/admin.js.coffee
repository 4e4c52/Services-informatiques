jQuery ->
  
  switch $('body').attr 'class'
    when "admin admin_index" then load = 'data'
    when "admin admin_registrations" then load = 'waiting'
  
  # Get data from the server
  if load is 'data'
    $.ajax({
      type: 'post'
      url: '../data/receiver.php'
      data: {
        action: 'get_data'
      }
      success: (result) ->
        data = jQuery.parseJSON result
        if data.status is 200
          $('#registrations').html('').html data.registrations
          $('#signatures').html('').html data.signatures
        else if data.status is 400
          alert 'Une erreur est survenue lors de la communication avec le serveur.'
      error: (a, b, c) ->
        $('#registrations').html('').html '<li><span style="color:#980905;">Impossible de contacter le serveur.</span></li>'
        $('#signatures').html('').html '<li><span style="color:#980905;">Impossible de contacter le serveur.</span></li>'
    })
    
  # Get waiting registrations
  if load is 'waiting'
    $.ajax({
      type: 'post'
      url: '../data/receiver.php'
      data: {
        action: 'get_waiting'
      }
      success: (result) ->
        data = jQuery.parseJSON result
        if data.status is 200
          $('#registrations').html('').html data.registrations
        else if data.status is 400
          alert 'Une erreur est survenue lors de la communication avec le serveur.'
      error: (a, b, c) ->
        $('#registrations').html('').html '<li><span style="color:#980905;">Impossible de contacter le serveur.</span></li>'
    })
    
  # Show the bin to delete a registration
  $('.waiting').live 'mouseenter', ->
    $(@).find('.delete').show()
    
  $('.waiting').live 'mouseleave', ->
    $(@).find('.delete').hide()
    
  # Delete a registration
  $('.delete').live 'click', ->
    li = $(@).parent()
    mac_address = $(@).parent().find('input[type=checkbox]').attr 'id'
    $.ajax({
      type: 'post'
      url: '../data/receiver.php'
      data: {
        action: 'delete_registration'
        mac_address: mac_address
      }
      success: (result) ->
        data = jQuery.parseJSON result
        if data.status is 200
          li.remove()
          #identity = li.find('.identity a').text()
          #li.find('.identity a').remove()
          #li.find('.identity').text(identity)
          #li.find('.delete').remove()
          #li.addClass 'deleted'
        else if data.status is 400
          alert 'Une erreur est survenue lors de la communication avec le serveur.'
      error: (a, b, c) ->
        alert 'Impossible de contacter le serveur.'
    })
    false
    
  # Mark a registration as validated
  $('input[type=checkbox]').live 'click', ->
    li = $(@).parent()
    mac_address = $(@).attr 'id'
    $.ajax({
      type: 'post'
      url: '../data/receiver.php'
      data: {
        action: 'validate_registration'
        mac_address: mac_address
      }
      success: (result) ->
        data = jQuery.parseJSON result
        if data.status is 200
          li.find('input[type=checkbox]').attr("checked", "checked")
          li.addClass 'validated'
        else if data.status is 400
          alert 'Une erreur est survenue lors de la communication avec le serveur.'
      error: (a, b, c) ->
        alert 'Impossible de contacter le serveur.'
    })
    true
    
  # Unmark a registration as validated
  $('.validated input[type=checkbox]').live 'click', ->
    li = $(@).parent()
    mac_address = $(@).attr 'id'
    $.ajax({
      type: 'post'
      url: '../data/receiver.php'
      data: {
        action: 'unvalidate_registration'
        mac_address: mac_address
      }
      success: (result) ->
        data = jQuery.parseJSON result
        if data.status is 200
        	li.removeClass 'validated'
        	li.find('input[type=checkbox]').removeAttr("checked")      
        else if data.status is 400
          alert 'Une erreur est survenue lors de la communication avec le serveur.'
      error: (a, b, c) ->
        alert 'Impossible de contacter le serveur.'
    })
    false