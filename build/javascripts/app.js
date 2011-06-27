(function() {
  jQuery(function() {
    var design, device_width, getCookie, get_session, loader, reg_tuts, save_r_user, save_rw_user, setCookie, setDesign;
    loader = '<span id="loader"><img src="images/loader.gif" alt="#" />&nbsp;<strong>Veuillez patienter...</strong></span>';
    if (jQuery.browser.mobile) {
      $('head').append('<link rel="stylesheet" href="stylesheets/mobile.css" id="mobile" media="screen" type="text/css" />');
      device_width = $(window).width();
      $('body').css('width', device_width + 'px');
      $('#isen-title').show();
      $('#mobile-sub-col').html('').html($('#sub-col').html());
    }
    if (!jQuery.browser.mobile) {
      $('#tuts-index').click(function() {
        $('#tuts').toggle();
        return false;
      });
    } else {
      $('#tuts-index').click(function() {
        var tuts;
        tuts = $('#tuts').html();
        $('#mobile-tuts .wrapper').html('').html(tuts);
        $('#mobile-tuts .wrapper').find('hr').remove();
        $('#mobile-tuts').toggle('normal');
        return false;
      });
    }
    reg_tuts = /^tuts\//;
    if ($('body').hasClass('tuts')) {
      $('#mobile').attr('href', '../' + $('#mobile').attr('href'));
      $('#isen-title').attr('href', '../' + $('#isen-title').attr('href'));
      $('#logo-home').attr('href', '../' + $('#logo-home').attr('href'));
      $('#home').attr('href', '../' + $('#home').attr('href'));
      $('#offers').attr('href', '../' + $('#offers').attr('href'));
      $('#registration').attr('href', '../' + $('#registration').attr('href'));
      $('#tuts a').each(function() {
        var link;
        link = $(this).attr('href');
        link = link.replace(reg_tuts, "");
        return $(this).attr('href', link);
      });
    }
    if (!jQuery.browser.mobile) {
      $('a.fancybox').fancybox({
        hideOnContentClick: true
      });
    }
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
      var entry, logins, regex, total, user;
      total = $('#rw_users_count').val();
      total++;
      $('#rw_users_count').val(total);
      user = $('#rw_user_login').val();
      regex = /^[a-z]{6}[0-9]{2}$/;
      if (!regex.exec(user)) {
        $('#rw_user_format').html('Ex: jsmith18');
        return false;
      }
      $('#rw_user_login').val('');
      $('#rw_user_format').html('');
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
      var entry, logins, regex, total, user;
      total = $('#r_users_count').val();
      total++;
      $('#r_users_count').val(total);
      user = $('#r_user_login').val();
      regex = /^[a-z]{6}[0-9]{2}$/;
      if (!regex.exec(user)) {
        $('#r_user_format').html('Ex: jsmith18');
        return false;
      }
      $('#r_user_login').val('');
      $('#r_user_format').html('');
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
    $('#add_svn').click(function() {
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
    setCookie = function(name, value) {
      var expires, today;
      today = new Date();
      expires = new Date();
      expires.setTime(today.getTime() + (365 * 24 * 60 * 60 * 1000));
      return document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + expires.toGMTString();
    };
    getCookie = function(name) {
      var regex;
      regex = new RegExp("(?:; )?" + name + "=([^;]*);?");
      if (regex.test(document.cookie)) {
        return decodeURIComponent(RegExp["$1"]);
      } else {
        return false;
      }
    };
    setDesign = function() {
      var link, stylesheet;
      link = $('#app-stylesheet').clone();
      stylesheet = link.attr('href');
      stylesheet = stylesheet.replace("app", "alternate");
      link.attr('href', stylesheet);
      link.attr('id', 'alternate');
      $('head').append(link);
      return setCookie('design', 'alternate');
    };
    get_session = function() {
      return $.ajax({
        type: 'get',
        url: 'data/receiver.php',
        data: {
          action: 'get_session'
        },
        success: function(result) {
          var data;
          data = jQuery.parseJSON(result);
          if (data.status === 200) {
            if (data.iadm) {
              setCookie("iadm", true);
              return $('#iadm').show();
            }
          }
        }
      });
    };
    $('#design').change(function() {
      var design;
      design = $(this).val();
      if (design === 'alternate') {
        return setDesign();
      } else {
        $('#alternate').remove();
        return setCookie('design', 'isen');
      }
    });
    if (design = getCookie('design')) {
      if (design === 'alternate') {
        setDesign();
        $('#design option[value="alternate"]').attr('selected', 'selected');
      }
    }
    if (getCookie("iadm")) {
      return $('#iadm').show();
    } else {
      return get_session();
    }
  });
}).call(this);
