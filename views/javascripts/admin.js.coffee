jQuery ->
  
  loader = '<li><img src="../images/loader.gif" alt="#" />&nbsp;<strong>Chargement des donn&eacute;es...</strong></li>'
  
  ## What do we do?
  
  switch $('body').attr 'class'
    when "admin admin_index" then load = 'data'
    when "admin admin_registrations" then load = 'waiting'
    when "admin admin_computer_convention" then load = 'cc_signatures'
    when "admin admin_protel_convention" then load = 'cp_signatures'
    when "admin admin_repositories" then load = 'waiting_repositories'
  
  ## Functions
    
  get_waiting_registrations = ->
    $('#registrations').html('').html loader
    $.ajax({
      type: 'get'
      url: '../data/receiver_admin.php'
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
    
  get_validated_registrations = ->
    $('#registrations').html('').html loader
    $.ajax({
      type: 'get'
      url: '../data/receiver_admin.php'
      data: {
        action: 'get_validated'
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
    
  get_waiting_repositories = ->
    $('#repositories').html('').html loader
    $.ajax({
      type: 'get'
      url: '../data/receiver_admin.php'
      data: {
        action: 'get_waiting_repositories'
      }
      success: (result) ->
        data = jQuery.parseJSON result
        if data.status is 200
          $('#repositories').html('').html data.repositories
        else if data.status is 400 or data.status is 500
          alert 'Une erreur est survenue lors de la communication avec le serveur.'
      error: (a, b, c) ->
        $('#repositories').html('').html '<li><span style="color:#980905;">Impossible de contacter le serveur.</span></li>'
    })
    
  get_validated_repositories = ->
    $('#repositories').html('').html loader
    $.ajax({
      type: 'get'
      url: '../data/receiver_admin.php'
      data: {
        action: 'get_validated_repositories'
      }
      success: (result) ->
        data = jQuery.parseJSON result
        if data.status is 200
          $('#repositories').html('').html data.repositories
        else if data.status is 400 or data.status is 500
          alert 'Une erreur est survenue lors de la communication avec le serveur.'
      error: (a, b, c) ->
        $('#repositories').html('').html '<li><span style="color:#980905;">Impossible de contacter le serveur.</span></li>'
    })
    
  get_cc_signatures = ->
    $('#signatures').html('').html loader
    $.ajax({
      type: 'get'
      url: '../data/receiver_admin.php'
      data: {
        action: 'get_cc_signatures'
      }
      success: (result) ->
        data = jQuery.parseJSON result
        if data.status is 200
          $('#signatures').html('').html data.signatures
        else if data.status is 400
          alert 'Une erreur est survenue lors de la communication avec le serveur.'
      error: (a, b, c) ->
        $('#signatures').html('').html '<li><span style="color:#980905;">Impossible de contacter le serveur.</span></li>'
    })
    
  get_cp_signatures = ->
    $('#signatures').html('').html loader
    $.ajax({
      type: 'get'
      url: '../data/receiver_admin.php'
      data: {
        action: 'get_cp_signatures'
      }
      success: (result) ->
        data = jQuery.parseJSON result
        if data.status is 200
          $('#signatures').html('').html data.signatures
        else if data.status is 400
          alert 'Une erreur est survenue lors de la communication avec le serveur.'
      error: (a, b, c) ->
        $('#signatures').html('').html '<li><span style="color:#980905;">Impossible de contacter le serveur.</span></li>'
    })
    
  ## Loadings 
  
  # Get cc signatures
  if load is 'cc_signatures'
    get_cc_signatures()
    
  # Get cp signatures
  if load is 'cp_signatures'
    get_cp_signatures()
    
  # Get waiting registrations
  if load is 'waiting'
    get_waiting_registrations()
    
  # Get waiting repositories
  if load is 'waiting_repositories'
    get_waiting_repositories()
  
  # Get data from the server
  if load is 'data'
    $.ajax({
      type: 'get'
      url: '../data/receiver_admin.php'
      data: {
        action: 'get_data'
      }
      success: (result) ->
        data = jQuery.parseJSON result
        if data.status is 200
          $('#registrations').html('').html data.registrations
          $('#repositories').html('').html data.repositories
          $('#signatures').html('').html data.signatures
        else if data.status is 400 or data.status is 500
          alert 'Une erreur est survenue lors de la communication avec le serveur.'
      error: (a, b, c) ->
        $('#registrations').html('').html '<li><span style="color:#980905;">Impossible de contacter le serveur.</span></li>'
        $('#repositories').html('').html '<li><span style="color:#980905;">Impossible de contacter le serveur.</span></li>'
        $('#signatures').html('').html '<li><span style="color:#980905;">Impossible de contacter le serveur.</span></li>'
    })
    
  ## Events then loading
    
  # Delete a registration
  $('.admin_registrations .delete').live 'click', ->
    li = $(@).parent()
    mac_address = $(@).parent().find('input[type=checkbox]').attr 'id'
    $('#loading-' + mac_address).show();
    $.ajax({
      type: 'post'
      url: '../data/receiver_admin.php'
      data: {
        action: 'delete_registration'
        mac_address: mac_address
      }
      success: (result) ->
        data = jQuery.parseJSON result
        if data.status is 200
          li.remove()
        else if data.status is 400 or data.status is 500
          alert 'Une erreur est survenue lors de la communication avec le serveur.'
      error: (a, b, c) ->
        alert 'Impossible de contacter le serveur.'
    })
    false
    
  # Mark a registration as validated
  $('.admin_registrations #registrations input[type=checkbox]').live 'click', ->
    li = $(@).parent()
    mac_address = $(@).attr 'id'
    li.find('input[type=checkbox]').hide();
    $('#loading-' + mac_address).show();
    $.ajax({
      type: 'post'
      url: '../data/receiver_admin.php'
      data: {
        action: 'validate_registration'
        mac_address: mac_address
      }
      success: (result) ->
        data = jQuery.parseJSON result
        if data.status is 200
          li.find('input[type=checkbox]').attr("checked", "checked")
          li.addClass 'validated'
        else if data.status is 400 or data.status is 500
          alert 'Une erreur est survenue lors de la communication avec le serveur.'
      error: (a, b, c) ->
        alert 'Impossible de contacter le serveur.'
    })
    li.find('input[type=checkbox]').show();
    $('#loading-' + mac_address).hide();
    true
    
  # Unmark a registration as validated
  $('.admin_registrations #registrations .validated input[type=checkbox]').live 'click', ->
    li = $(@).parent()
    mac_address = $(@).attr 'id'
    li.find('input[type=checkbox]').hide();
    $('#loading-' + mac_address).show();
    $.ajax({
      type: 'post'
      url: '../data/receiver_admin.php'
      data: {
        action: 'unvalidate_registration'
        mac_address: mac_address
      }
      success: (result) ->
        data = jQuery.parseJSON result
        if data.status is 200 or data.status is 500
        	li.removeClass 'validated'
        	li.find('input[type=checkbox]').removeAttr("checked")      
        else if data.status is 400
          alert 'Une erreur est survenue lors de la communication avec le serveur.'
      error: (a, b, c) ->
        alert 'Impossible de contacter le serveur.'
    })
    li.find('input[type=checkbox]').show();
    $('#loading-' + mac_address).hide();
    false
  
  # Delete a repository
  $('.admin_repositories .delete').live 'click', ->
    li = $(@).parent()
    repository = $(@).parent().find('input[type=checkbox]').attr 'id'
    $('#loading-' + repository).show();
    $.ajax({
      type: 'post'
      url: '../data/receiver_admin.php'
      data: {
        action: 'delete_repository'
        repository: repository
      }
      success: (result) ->
        data = jQuery.parseJSON result
        if data.status is 200
          li.remove()
        else if data.status is 400 or data.status is 500
          alert 'Une erreur est survenue lors de la communication avec le serveur.'
      error: (a, b, c) ->
        alert 'Impossible de contacter le serveur.'
    })
    false
    
  # Mark a repository as validated
  $('.admin_repositories #repositories input[type=checkbox]').live 'click', ->
    li = $(@).parent()
    repository = $(@).attr 'id'
    li.find('input[type=checkbox]').hide();
    $('#loading-' + repository).show();
    $.ajax({
      type: 'post'
      url: '../data/receiver_admin.php'
      data: {
        action: 'validate_repository'
        repository: repository
      }
      success: (result) ->
        data = jQuery.parseJSON result
        if data.status is 200
          li.find('input[type=checkbox]').attr("checked", "checked")
          li.addClass 'validated'
        else if data.status is 400 or data.status is 500
          alert 'Une erreur est survenue lors de la communication avec le serveur.'
      error: (a, b, c) ->
        alert 'Impossible de contacter le serveur.'
    })
    li.find('input[type=checkbox]').show();
    $('#loading-' + repository).hide();
    true
    
  # Unmark a registration as validated
  $('.admin_repositories #repositories .validated input[type=checkbox]').live 'click', ->
    li = $(@).parent()
    repository = $(@).attr 'id'
    li.find('input[type=checkbox]').hide();
    $('#loading-' + repository).show();
    $.ajax({
      type: 'post'
      url: '../data/receiver_admin.php'
      data: {
        action: 'unvalidate_repository'
        repository: repository
      }
      success: (result) ->
        data = jQuery.parseJSON result
        if data.status is 200
        	li.removeClass 'validated'
        	li.find('input[type=checkbox]').removeAttr("checked")      
        else if data.status is 400 or data.status is 500
          alert 'Une erreur est survenue lors de la communication avec le serveur.'
      error: (a, b, c) ->
        alert 'Impossible de contacter le serveur.'
    })
    li.find('input[type=checkbox]').show();
    $('#loading-' + repository).hide();
    false  
    
  # Delete a cc signature
  $('.admin_computer_convention .delete').live 'click', ->
    li = $(@).parent()
    email = $(@).attr 'title'    
    $.ajax({
      type: 'post'
      url: '../data/receiver_admin.php'
      data: {
        action: 'delete_cc_signature'
        email: email
      }
      success: (result) ->
        data = jQuery.parseJSON result
        if data.status is 200
          li.remove()
        else if data.status is 400 or data.status is 500
          alert 'Une erreur est survenue lors de la communication avec le serveur.'
      error: (a, b, c) ->
        alert 'Impossible de contacter le serveur.'
    })
    false
    
  # Delete a cp signature
  $('.admin_protel_convention .delete').live 'click', ->
    li = $(@).parent()
    email = $(@).attr 'title'    
    $.ajax({
      type: 'post'
      url: '../data/receiver_admin.php'
      data: {
        action: 'delete_cp_signature'
        email: email
      }
      success: (result) ->
        data = jQuery.parseJSON result
        if data.status is 200
          li.remove()
        else if data.status is 400 or data.status is 500
          alert 'Une erreur est survenue lors de la communication avec le serveur.'
      error: (a, b, c) ->
        alert 'Impossible de contacter le serveur.'
    })
    false
  
  ## Events
    
  # Show the bin to delete a registration
  $('.waiting').live 'mouseenter', ->
    $(@).find('.delete').show()
    
  $('.waiting').live 'mouseleave', ->
    $(@).find('.delete').hide()
  
  # Switch from waiting to validated registration
  $('.admin_registrations #switch').click ->
    if $('.content-title').hasClass 'waiting-title'
      $('.content-title').html('').html 'Enregistrements valid&eacute;s'
      $('.content-title').removeClass('waiting-title').addClass 'validated-title'
      get_validated_registrations()
    else
      $('.content-title').html('').html 'Enregistrements en attente'
      $('.content-title').removeClass('validated-title').addClass 'waiting-title'
      get_waiting_registrations()
    false
    
   # Switch from waiting to validated repositories
  $('.admin_repositories #switch').click ->
    if $('.content-title').hasClass 'waiting-title'
      $('.content-title').html('').html 'Demandes valid&eacute;es'
      $('.content-title').removeClass('waiting-title').addClass 'validated-title'
      get_validated_repositories()
    else
      $('.content-title').html('').html 'Demandes en attente'
      $('.content-title').removeClass('validated-title').addClass 'waiting-title'
      get_waiting_repositories()
    false