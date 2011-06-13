(function() {
  jQuery(function() {
    var load;
    switch ($('body').attr('class')) {
      case "admin admin_index":
        load = 'data';
        break;
      case "admin admin_registrations":
        load = 'waiting';
    }
    if (load === 'data') {
      $.ajax({
        type: 'post',
        url: '../data/receiver.php',
        data: {
          action: 'get_data'
        },
        success: function(result) {
          var data;
          data = jQuery.parseJSON(result);
          if (data.status === 200) {
            $('#registrations').html('').html(data.registrations);
            return $('#signatures').html('').html(data.signatures);
          } else if (data.status === 400) {
            return alert('Une erreur est survenue lors de la communication avec le serveur.');
          }
        },
        error: function(a, b, c) {
          $('#registrations').html('').html('<li><span style="color:#980905;">Impossible de contacter le serveur.</span></li>');
          return $('#signatures').html('').html('<li><span style="color:#980905;">Impossible de contacter le serveur.</span></li>');
        }
      });
    }
    if (load === 'waiting') {
      $.ajax({
        type: 'post',
        url: '../data/receiver.php',
        data: {
          action: 'get_waiting'
        },
        success: function(result) {
          var data;
          data = jQuery.parseJSON(result);
          if (data.status === 200) {
            return $('#registrations').html('').html(data.registrations);
          } else if (data.status === 400) {
            return alert('Une erreur est survenue lors de la communication avec le serveur.');
          }
        },
        error: function(a, b, c) {
          return $('#registrations').html('').html('<li><span style="color:#980905;">Impossible de contacter le serveur.</span></li>');
        }
      });
    }
    $('.waiting').live('mouseenter', function() {
      return $(this).find('.delete').show();
    });
    $('.waiting').live('mouseleave', function() {
      return $(this).find('.delete').hide();
    });
    return $('.delete').live('click', function() {
      var li, mac_address;
      li = $(this).parent();
      mac_address = $(this).parent().find('input[type=checkbox]').attr('id');
      $.ajax({
        type: 'post',
        url: '../data/receiver.php',
        data: {
          action: 'delete_registration',
          mac_address: mac_address
        },
        success: function(result) {
          var data;
          data = jQuery.parseJSON(result);
          if (data.status === 200) {
            return li.remove();
          } else if (data.status === 400) {
            return alert('Une erreur est survenue lors de la communication avec le serveur.');
          }
        },
        error: function(a, b, c) {
          return alert('Impossible de contacter le serveur.');
        }
      });
      return false;
    });
  });
}).call(this);
