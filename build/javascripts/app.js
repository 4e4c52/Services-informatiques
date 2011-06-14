(function() {
  jQuery(function() {
    var loader;
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
          name: name,
          first_name: first_name,
          email: email,
          mac_address: mac_address,
          is_validated: false
        },
        success: function(result) {
          var data;
          data = jQuery.parseJSON(result);
          if (data.status === 200) {
            $('#ajax-response').html('').html('<div class="info">' + data.message + '</div>');
            return $('#mac_address').val('');
          } else if (data.status === 400) {
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
          } else if (data.status === 400) {
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
          } else if (data.status === 400) {
            return $('#ajax-response').html('').html('<div class="warning">' + data.message + '</div>');
          }
        },
        error: function(a, b, c) {
          return $('#ajax-response').html('').html('<div class="warning">Impossible de contacter le serveur.</div>');
        }
      });
    });
    $('#add_rw_user').click(function(e) {
      return $('#add_user_rw_box').css('left', e.pageX - 60).css('top', e.pageY - 180);
    });
    return $('#add_r_user').click(function(e) {
      return $('#add_user_r_box').css('left', e.pageX - 60).css('top', e.pageY - 180);
    });
  });
}).call(this);
