jQuery ->
  
  loader = '<span id="loader"><img src="images/loader.gif" alt="#" />&nbsp;<strong>Veuillez patienter...</strong></span>'
  
  # TODO: Switch the not from de conditions
  
  # Mobile detection support
  if jQuery.browser.mobile
    $('head').append('<link rel="stylesheet" href="stylesheets/mobile.css" id="mobile" media="screen" type="text/css" />')
    device_width = $(window).width()
    $('body').css('width', device_width + 'px')
    $('#isen-title').show()
    $('#mobile-sub-col').html('').html($('#sub-col').html())
  
  # Toggle the tuts menu
  if not jQuery.browser.mobile
    $('#tuts-index').click ->
      $('#tuts').toggle()
      false
  else
    $('#tuts-index').click ->
      tuts = $('#tuts').html()
      $('#mobile-tuts .wrapper').html('').html(tuts)
      $('#mobile-tuts .wrapper').find('hr').remove()
      $('#mobile-tuts').toggle('normal')
      false
    
  # Replace links url in the header when in tuts/ directory
  reg_tuts = /^tuts\//
  if $('body').hasClass('tuts')
    $('#mobile').attr('href', '../' + $('#mobile').attr('href'))
    $('#isen-title').attr('href', '../' + $('#isen-title').attr('href'))
    $('#logo-home').attr('href', '../' + $('#logo-home').attr('href'))
    $('#home').attr('href', '../' + $('#home').attr('href'))
    $('#offers').attr('href', '../' + $('#offers').attr('href'))
    $('#registration').attr('href', '../' + $('#registration').attr('href'))
    $('#tuts a').each ->
      link = $(@).attr('href')
      link = link.replace(reg_tuts, "")
      $(@).attr('href', link)  
    
  # Fancybox
  if not jQuery.browser.mobile
    $('a.fancybox').fancybox({
      hideOnContentClick: true
    })
    
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
    regex = /^[a-z]{6}[0-9]{2}$/
    if not regex.exec(user) 
      $('#rw_user_format').html('Ex: jsmith18')
      return false
    $('#rw_user_login').val('')
    $('#rw_user_format').html('')
    
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
    regex = /^[a-z]{6}[0-9]{2}$/
    if not regex.exec(user) 
      $('#r_user_format').html('Ex: jsmith18')
      return false
    $('#r_user_login').val('')
    $('#r_user_format').html('')
    
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
    
  # Design management
  
  setCookie = (name, value) ->
    today = new Date()
    expires = new Date()
    expires.setTime(today.getTime() + (365*24*60*60*1000))
    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + expires.toGMTString()
    
  getCookie = (name) ->
    regex = new RegExp("(?:; )?" + name + "=([^;]*);?")
    if regex.test(document.cookie)
      decodeURIComponent(RegExp["$1"])
    else
      false;
      
  setDesign = ->
    link = $('#app-stylesheet').clone()
    stylesheet = link.attr('href')
    stylesheet = stylesheet.replace("app", "alternate")
    link.attr('href', stylesheet)
    link.attr('id', 'alternate')
    $('head').append(link)
    setCookie 'design', 'alternate'
    
  get_session = ->
    $.ajax({
      type: 'get'
      url: 'data/receiver.php'
      data: {
        action: 'get_session'
      }
      success: (result) ->
        data = jQuery.parseJSON result
        if data.status is 200
          if data.iadm
            setCookie "iadm", true
            $('#iadm').show()
    }) 
      
  $('#design').change ->
    design = $(@).val()
    if design is 'alternate'
      setDesign()
    else
      $('#alternate').remove()
      setCookie 'design', 'isen'
      
  if design = getCookie('design')
    if design is 'alternate'
      setDesign()
      $('#design option[value="alternate"]').attr('selected', 'selected')
 
  # Checks if the user is an admin
  if getCookie("iadm")
    $('#iadm').show()
  else
    get_session()
  