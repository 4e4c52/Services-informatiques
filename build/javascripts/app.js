(function() {
  jQuery(function() {
    var loader, save_r_user, save_rw_user;
    loader = '<img src="images/loader.gif" alt="#" />&nbsp;<strong>Veuillez patienter...</strong>';
    $('#tuts-index').click(function() {
      $('#tuts').toggle();
      return false;
    });
    $('#add_mac').click(function() {
      var email, first_name, mac_address, name;
      $('#ajax-response').html('').html(loader);
      name = $('#name').val();
      first_name = $('#first_name').val();
      email = $('#email').val();
      mac_address = $('#mac_address').val();
      return $.ajax({
        type: 'post',
        url: 'data/receiver.php',
        data: {
          action: 'add_mac',
          is_validated: false,
          name: name,
          first_name: first_name,
          email: email,
          mac_address: mac_address
        },
        success: function(result) {
          var data;
          data = jQuery.parseJSON(result);
          if (data.status === 200) {
            $('#ajax-response').html('').html('<div class="info">' + data.message + '</div>');
            return $('#mac_address').val('');
          } else if (data.status === 400 || data.status === 500) {
            return $('#ajax-response').html('').html('<div class="warning">' + data.message + '</div>');
          }
        },
        error: function(a, b, c) {
          return $('#ajax-response').html('').html('<div class="warning">Impossible de contacter le serveur.</div>');
        }
      });
    });
    $('#add_cc').click(function() {
      var email, first_name, name;
      $('#ajax-response').html('').html(loader);
      name = $('#name').val();
      first_name = $('#first_name').val();
      email = $('#email').val();
      return $.ajax({
        type: 'post',
        url: 'data/receiver.php',
        data: {
          action: 'add_cc',
          name: name,
          first_name: first_name,
          email: email
        },
        success: function(result) {
          var data;
          data = jQuery.parseJSON(result);
          if (data.status === 200) {
            return $('#ajax-response').html('').html('<div class="info">' + data.message + '</div>');
          } else if (data.status === 400 || data.status === 500) {
            return $('#ajax-response').html('').html('<div class="warning">' + data.message + '</div>');
          }
        },
        error: function(a, b, c) {
          return $('#ajax-response').html('').html('<div class="warning">Impossible de contacter le serveur.</div>');
        }
      });
    });
    $('#add_cp').click(function() {
      var email, first_name, name;
      $('#ajax-response').html('').html(loader);
      name = $('#name').val();
      first_name = $('#first_name').val();
      email = $('#email').val();
      return $.ajax({
        type: 'post',
        url: 'data/receiver.php',
        data: {
          action: 'add_cp',
          name: name,
          first_name: first_name,
          email: email
        },
        success: function(result) {
          var data;
          data = jQuery.parseJSON(result);
          if (data.status === 200) {
            return $('#ajax-response').html('').html('<div class="info">' + data.message + '</div>');
          } else if (data.status === 400 || data.status === 500) {
            return $('#ajax-response').html('').html('<div class="warning">' + data.message + '</div>');
          }
        },
        error: function(a, b, c) {
          return $('#ajax-response').html('').html('<div class="warning">Impossible de contacter le serveur.</div>');
        }
      });
    });
    $('#add_rw_user').click(function(e) {
      var offset;
      offset = $(this).offset();
      if ($('#add_rw_user_box').hasClass('active')) {
        $('#add_rw_user_box').css('left', -10000).removeClass('active');
      } else {
        if ($('#add_r_user_box').hasClass('active')) {
          $('#add_r_user_box').css('left', -10000).removeClass('active');
        }
        $('#add_rw_user_box').css('left', offset.left - 155).css('top', offset.top - 55).addClass('active');
        $('#rw_user_login').focus();
      }
      return false;
    });
    $('#add_r_user').click(function(e) {
      var offset;
      offset = $(this).offset();
      if ($('#add_r_user_box').hasClass('active')) {
        $('#add_r_user_box').css('left', -10000).removeClass('active');
      } else {
        if ($('#add_rw_user_box').hasClass('active')) {
          $('#add_rw_user_box').css('left', -10000).removeClass('active');
        }
        $('#add_r_user_box').css('left', offset.left - 155).css('top', offset.top - 55).addClass('active');
        $('#r_user_login').focus();
      }
      return false;
    });
    save_rw_user = function() {
      var entry, logins, total, user;
      total = $('#rw_users_count').val();
      total++;
      $('#rw_users_count').val(total);
      user = $('#rw_user_login').val();
      $('#rw_user_login').val('');
      logins = $('#rw_users_logins').val();
      logins += user + ';';
      $('#rw_users_logins').val(logins);
      entry = '<li id="rw_user_' + total + '" class="rw_user"><strong>' + user + '</strong>&nbsp;';
      entry += '<a href="#" id="delete_rw_user_' + total + '" class="delete_rw_user"><img src="images/bin.png" alt="supprimer" /></a></li>';
      $('#rw_users').append(entry);
      return $('#add_rw_user_box').css('left', -10000).removeClass('active');
    };
    $('#add_rw_user_button').click(function() {
      return save_rw_user();
    });
    $('#rw_user_login').keydown(function(e) {
      if (e.keyCode === 13) {
        return save_rw_user();
      }
    });
    save_r_user = function() {
      var entry, logins, total, user;
      total = $('#r_users_count').val();
      total++;
      $('#r_users_count').val(total);
      user = $('#r_user_login').val();
      $('#r_user_login').val('');
      logins = $('#r_users_logins').val();
      logins += user + ';';
      $('#r_users_logins').val(logins);
      entry = '<li id="r_user_' + total + '" class="r_user"><strong>' + user + '</strong>&nbsp;';
      entry += '<a href="#" id="delete_r_user_' + total + '" class="delete_r_user"><img src="images/bin.png" alt="supprimer" /></a></li>';
      $('#r_users').append(entry);
      return $('#add_r_user_box').css('left', -10000).removeClass('active');
    };
    $('#add_r_user_button').click(function() {
      return save_r_user();
    });
    $('#r_user_login').keydown(function(e) {
      if (e.keyCode === 13) {
        return save_r_user();
      }
    });
    $('.delete_rw_user').live('click', function() {
      var i, logins, total;
      $(this).parent().remove();
      total = $('#rw_users_count').val();
      total--;
      $('#rw_users_count').val(total);
      $('#rw_users_logins').val('');
      i = 1;
      logins = '';
      $('.rw_user').each(function() {
        var user;
        $(this).attr('id', 'rw_user_' + i);
        $(this).find('.delete_rw_user').attr('id', 'delete_rw_user_' + i);
        user = $(this).find('strong').text();
        logins += user + ';';
        return i++;
      });
      $('#rw_users_logins').val(logins);
      return false;
    });
    $('.delete_r_user').live('click', function() {
      var i, logins, total;
      $(this).parent().remove();
      total = $('#r_users_count').val();
      total--;
      $('#r_users_count').val(total);
      $('#r_users_logins').val('');
      i = 1;
      logins = '';
      $('.r_user').each(function() {
        var user;
        $(this).attr('id', 'r_user_' + i);
        $(this).find('.delete_r_user').attr('id', 'delete_r_user_' + i);
        user = $(this).find('strong').text();
        logins += user + ';';
        return i++;
      });
      $('#r_users_logins').val(logins);
      return false;
    });
    return $('#add_svn').click(function() {
      var email, r_users_count, r_users_logins, repository, rw_users_count, rw_users_logins;
      $('#ajax-response').html('').html(loader);
      repository = $('#repository').val();
      email = $('#email').val();
      rw_users_count = $('#rw_users_count').val();
      rw_users_logins = $('#rw_users_logins').val();
      r_users_count = $('#r_users_count').val();
      r_users_logins = $('#r_users_logins').val();
      return $.ajax({
        type: 'post',
        url: 'data/receiver.php',
        data: {
          action: 'add_repository',
          is_validated: false,
          repository: repository,
          email: email,
          rw_users_count: rw_users_count,
          rw_users_logins: rw_users_logins,
          r_users_count: r_users_count,
          r_users_logins: r_users_logins
        },
        success: function(result) {
          var data;
          data = jQuery.parseJSON(result);
          if (data.status === 200) {
            $('#rw_users_count').val('0');
            $('#r_users_count').val('0');
            $('#rw_users_logins').val('');
            $('#r_users_logins').val('');
            $('#repository').val('');
            $('#email').val('');
            $('#rw_users').html('');
            $('#r_users').html('');
            return $('#ajax-response').html('').html('<div class="info">' + data.message + '</div>');
          } else if (data.status === 400 || data.status === 500) {
            return $('#ajax-response').html('').html('<div class="warning">' + data.message + '</div>');
          }
        },
        error: function(a, b, c) {
          return $('#ajax-response').html('').html('<div class="warning">Impossible de contacter le serveur.</div>');
        }
      });
    });
  });
}).call(this);
