(function() {
  jQuery(function() {
    var get_validated_registrations, get_waiting_registrations, load, loader;
    loader = '<li><img src="../images/loader.gif" alt="#" />&nbsp;<strong>Chargement des donn&eacute;es...</strong></li>';
    get_waiting_registrations = function() {
      $('#registrations').html('').html(loader);
      return $.ajax({
        type: 'get',
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
    };
    get_validated_registrations = function() {
      $('#registrations').html('').html(loader);
      return $.ajax({
        type: 'get',
        url: '../data/receiver.php',
        data: {
          action: 'get_validated'
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
    };
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
      get_waiting_registrations();
    }
    $('.waiting').live('mouseenter', function() {
      return $(this).find('.delete').show();
    });
    $('.waiting').live('mouseleave', function() {
      return $(this).find('.delete').hide();
    });
    $('.delete').live('click', function() {
      var li, mac_address;
      li = $(this).parent();
      mac_address = $(this).parent().find('input[type=checkbox]').attr('id');
      $('#loading-' + mac_address).show();
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
    $('input[type=checkbox]').live('click', function() {
      var li, mac_address;
      li = $(this).parent();
      mac_address = $(this).attr('id');
      li.find('input[type=checkbox]').hide();
      $('#loading-' + mac_address).show();
      $.ajax({
        type: 'post',
        url: '../data/receiver.php',
        data: {
          action: 'validate_registration',
          mac_address: mac_address
        },
        success: function(result) {
          var data;
          data = jQuery.parseJSON(result);
          if (data.status === 200) {
            li.find('input[type=checkbox]').attr("checked", "checked");
            return li.addClass('validated');
          } else if (data.status === 400) {
            return alert('Une erreur est survenue lors de la communication avec le serveur.');
          }
        },
        error: function(a, b, c) {
          return alert('Impossible de contacter le serveur.');
        }
      });
      li.find('input[type=checkbox]').show();
      $('#loading-' + mac_address).hide();
      return true;
    });
    $('.validated input[type=checkbox]').live('click', function() {
      var li, mac_address;
      li = $(this).parent();
      li.append;
      mac_address = $(this).attr('id');
      li.find('input[type=checkbox]').hide();
      $('#loading-' + mac_address).show();
      $.ajax({
        type: 'post',
        url: '../data/receiver.php',
        data: {
          action: 'unvalidate_registration',
          mac_address: mac_address
        },
        success: function(result) {
          var data;
          data = jQuery.parseJSON(result);
          if (data.status === 200) {
            li.removeClass('validated');
            return li.find('input[type=checkbox]').removeAttr("checked");
          } else if (data.status === 400) {
            return alert('Une erreur est survenue lors de la communication avec le serveur.');
          }
        },
        error: function(a, b, c) {
          return alert('Impossible de contacter le serveur.');
        }
      });
      li.find('input[type=checkbox]').show();
      $('#loading-' + mac_address).hide();
      return false;
    });
    return $('#switch').click(function() {
      if ($('.content-title').hasClass('waiting-title')) {
        $('.content-title').html('').html('Enregistrements valid&eacute;s');
        $('.content-title').removeClass('waiting-title').addClass('validated-title');
        get_validated_registrations();
      } else {
        $('.content-title').html('').html('Enregistrements en attente');
        $('.content-title').removeClass('validated-title').addClass('waiting-title');
        get_waiting_registrations();
      }
      return false;
    });
  });
}).call(this);
