(function() {
  jQuery(function() {
    var get_cc_signatures, get_cp_signatures, get_validated_registrations, get_validated_repositories, get_waiting_registrations, get_waiting_repositories, load, loader;
    loader = '<li><img src="../images/loader.gif" alt="#" />&nbsp;<strong>Chargement des donn&eacute;es...</strong></li>';
    switch ($('body').attr('class')) {
      case "admin admin_index":
        load = 'data';
        break;
      case "admin admin_registrations":
        load = 'waiting';
        break;
      case "admin admin_computer_convention":
        load = 'cc_signatures';
        break;
      case "admin admin_protel_convention":
        load = 'cp_signatures';
        break;
      case "admin admin_repositories":
        load = 'waiting_repositories';
    }
    get_waiting_registrations = function() {
      $('#registrations').html('').html(loader);
      return $.ajax({
        type: 'get',
        url: '../data/receiver_admin.php',
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
        url: '../data/receiver_admin.php',
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
    get_waiting_repositories = function() {
      $('#repositories').html('').html(loader);
      return $.ajax({
        type: 'get',
        url: '../data/receiver_admin.php',
        data: {
          action: 'get_waiting_repositories'
        },
        success: function(result) {
          var data;
          data = jQuery.parseJSON(result);
          if (data.status === 200) {
            return $('#repositories').html('').html(data.repositories);
          } else if (data.status === 400 || data.status === 500) {
            return alert('Une erreur est survenue lors de la communication avec le serveur.');
          }
        },
        error: function(a, b, c) {
          return $('#repositories').html('').html('<li><span style="color:#980905;">Impossible de contacter le serveur.</span></li>');
        }
      });
    };
    get_validated_repositories = function() {
      $('#repositories').html('').html(loader);
      return $.ajax({
        type: 'get',
        url: '../data/receiver_admin.php',
        data: {
          action: 'get_validated_repositories'
        },
        success: function(result) {
          var data;
          data = jQuery.parseJSON(result);
          if (data.status === 200) {
            return $('#repositories').html('').html(data.repositories);
          } else if (data.status === 400 || data.status === 500) {
            return alert('Une erreur est survenue lors de la communication avec le serveur.');
          }
        },
        error: function(a, b, c) {
          return $('#repositories').html('').html('<li><span style="color:#980905;">Impossible de contacter le serveur.</span></li>');
        }
      });
    };
    get_cc_signatures = function() {
      $('#signatures').html('').html(loader);
      return $.ajax({
        type: 'get',
        url: '../data/receiver_admin.php',
        data: {
          action: 'get_cc_signatures'
        },
        success: function(result) {
          var data;
          data = jQuery.parseJSON(result);
          if (data.status === 200) {
            return $('#signatures').html('').html(data.signatures);
          } else if (data.status === 400) {
            return alert('Une erreur est survenue lors de la communication avec le serveur.');
          }
        },
        error: function(a, b, c) {
          return $('#signatures').html('').html('<li><span style="color:#980905;">Impossible de contacter le serveur.</span></li>');
        }
      });
    };
    get_cp_signatures = function() {
      $('#signatures').html('').html(loader);
      return $.ajax({
        type: 'get',
        url: '../data/receiver_admin.php',
        data: {
          action: 'get_cp_signatures'
        },
        success: function(result) {
          var data;
          data = jQuery.parseJSON(result);
          if (data.status === 200) {
            return $('#signatures').html('').html(data.signatures);
          } else if (data.status === 400) {
            return alert('Une erreur est survenue lors de la communication avec le serveur.');
          }
        },
        error: function(a, b, c) {
          return $('#signatures').html('').html('<li><span style="color:#980905;">Impossible de contacter le serveur.</span></li>');
        }
      });
    };
    if (load === 'cc_signatures') {
      get_cc_signatures();
    }
    if (load === 'cp_signatures') {
      get_cp_signatures();
    }
    if (load === 'waiting') {
      get_waiting_registrations();
    }
    if (load === 'waiting_repositories') {
      get_waiting_repositories();
    }
    if (load === 'data') {
      $.ajax({
        type: 'get',
        url: '../data/receiver_admin.php',
        data: {
          action: 'get_data'
        },
        success: function(result) {
          var data;
          data = jQuery.parseJSON(result);
          if (data.status === 200) {
            $('#registrations').html('').html(data.registrations);
            $('#repositories').html('').html(data.repositories);
            return $('#signatures').html('').html(data.signatures);
          } else if (data.status === 400 || data.status === 500) {
            return alert('Une erreur est survenue lors de la communication avec le serveur.');
          }
        },
        error: function(a, b, c) {
          $('#registrations').html('').html('<li><span style="color:#980905;">Impossible de contacter le serveur.</span></li>');
          $('#repositories').html('').html('<li><span style="color:#980905;">Impossible de contacter le serveur.</span></li>');
          return $('#signatures').html('').html('<li><span style="color:#980905;">Impossible de contacter le serveur.</span></li>');
        }
      });
    }
    $('.admin_registrations .delete').live('click', function() {
      var li, mac_address;
      li = $(this).parent();
      mac_address = $(this).parent().find('input[type=checkbox]').attr('id');
      $('#loading-' + mac_address).show();
      $.ajax({
        type: 'post',
        url: '../data/receiver_admin.php',
        data: {
          action: 'delete_registration',
          mac_address: mac_address
        },
        success: function(result) {
          var data;
          data = jQuery.parseJSON(result);
          if (data.status === 200) {
            return li.remove();
          } else if (data.status === 400 || data.status === 500) {
            return alert('Une erreur est survenue lors de la communication avec le serveur.');
          }
        },
        error: function(a, b, c) {
          return alert('Impossible de contacter le serveur.');
        }
      });
      return false;
    });
    $('.admin_registrations #registrations input[type=checkbox]').live('click', function() {
      var li, mac_address;
      li = $(this).parent();
      mac_address = $(this).attr('id');
      li.find('input[type=checkbox]').hide();
      $('#loading-' + mac_address).show();
      $.ajax({
        type: 'post',
        url: '../data/receiver_admin.php',
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
          } else if (data.status === 400 || data.status === 500) {
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
    $('.admin_registrations #registrations .validated input[type=checkbox]').live('click', function() {
      var li, mac_address;
      li = $(this).parent();
      mac_address = $(this).attr('id');
      li.find('input[type=checkbox]').hide();
      $('#loading-' + mac_address).show();
      $.ajax({
        type: 'post',
        url: '../data/receiver_admin.php',
        data: {
          action: 'unvalidate_registration',
          mac_address: mac_address
        },
        success: function(result) {
          var data;
          data = jQuery.parseJSON(result);
          if (data.status === 200 || data.status === 500) {
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
    $('.admin_repositories .delete').live('click', function() {
      var li, repository;
      li = $(this).parent();
      repository = $(this).parent().find('input[type=checkbox]').attr('id');
      $('#loading-' + repository).show();
      $.ajax({
        type: 'post',
        url: '../data/receiver_admin.php',
        data: {
          action: 'delete_repository',
          repository: repository
        },
        success: function(result) {
          var data;
          data = jQuery.parseJSON(result);
          if (data.status === 200) {
            return li.remove();
          } else if (data.status === 400 || data.status === 500) {
            return alert('Une erreur est survenue lors de la communication avec le serveur.');
          }
        },
        error: function(a, b, c) {
          return alert('Impossible de contacter le serveur.');
        }
      });
      return false;
    });
    $('.admin_repositories #repositories input[type=checkbox]').live('click', function() {
      var li, repository;
      li = $(this).parent();
      repository = $(this).attr('id');
      li.find('input[type=checkbox]').hide();
      $('#loading-' + repository).show();
      $.ajax({
        type: 'post',
        url: '../data/receiver_admin.php',
        data: {
          action: 'validate_repository',
          repository: repository
        },
        success: function(result) {
          var data;
          data = jQuery.parseJSON(result);
          if (data.status === 200) {
            li.find('input[type=checkbox]').attr("checked", "checked");
            return li.addClass('validated');
          } else if (data.status === 400 || data.status === 500) {
            return alert('Une erreur est survenue lors de la communication avec le serveur.');
          }
        },
        error: function(a, b, c) {
          return alert('Impossible de contacter le serveur.');
        }
      });
      li.find('input[type=checkbox]').show();
      $('#loading-' + repository).hide();
      return true;
    });
    $('.admin_repositories #repositories .validated input[type=checkbox]').live('click', function() {
      var li, repository;
      li = $(this).parent();
      repository = $(this).attr('id');
      li.find('input[type=checkbox]').hide();
      $('#loading-' + repository).show();
      $.ajax({
        type: 'post',
        url: '../data/receiver_admin.php',
        data: {
          action: 'unvalidate_repository',
          repository: repository
        },
        success: function(result) {
          var data;
          data = jQuery.parseJSON(result);
          if (data.status === 200) {
            li.removeClass('validated');
            return li.find('input[type=checkbox]').removeAttr("checked");
          } else if (data.status === 400 || data.status === 500) {
            return alert('Une erreur est survenue lors de la communication avec le serveur.');
          }
        },
        error: function(a, b, c) {
          return alert('Impossible de contacter le serveur.');
        }
      });
      li.find('input[type=checkbox]').show();
      $('#loading-' + repository).hide();
      return false;
    });
    $('.waiting').live('mouseenter', function() {
      return $(this).find('.delete').show();
    });
    $('.waiting').live('mouseleave', function() {
      return $(this).find('.delete').hide();
    });
    $('.admin_registrations #switch').click(function() {
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
    return $('.admin_repositories #switch').click(function() {
      if ($('.content-title').hasClass('waiting-title')) {
        $('.content-title').html('').html('Demandes valid&eacute;es');
        $('.content-title').removeClass('waiting-title').addClass('validated-title');
        get_validated_repositories();
      } else {
        $('.content-title').html('').html('Demandes en attente');
        $('.content-title').removeClass('validated-title').addClass('waiting-title');
        get_waiting_repositories();
      }
      return false;
    });
  });
}).call(this);
