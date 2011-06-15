<?php
require 'Data_class.php';
define('DB', 'isen');

// Securing the input data
$safe_data = array();
while ($data = current($_REQUEST)) { 
  $data = htmlentities($data, ENT_COMPAT, 'UTF-8');
  $data = trim($data);
  $safe_data[key($_REQUEST)] = $data;
  next($_REQUEST);
}

// What do we do?
switch ($safe_data['action']) {
    
  case 'get_data':
    get_data();
    break;
    
  case 'get_waiting':
    get_waiting();
    break;
    
  case 'get_validated':
    get_validated();
    break;
    
  case 'get_cc_signatures':
    get_cc_signatures();
    break;
    
  case 'get_cp_signatures':
    get_cp_signatures();
    break;
    
  case 'delete_registration':
    delete_registration($safe_data);
    break;
    
  case 'validate_registration':
  	validate_registration($safe_data);
  	break;
  	
  case 'unvalidate_registration':
  	unvalidate_registration($safe_data);
  	break;
  	
  case 'get_waiting_repositories':
    get_waiting_repositories();
    break;
    
  case 'get_validated_repositories':
    get_validated_repositories();
    break;
    
  case 'delete_repository':
    delete_repository($safe_data);
    break;
    
  case 'validate_repository':
  	validate_repository($safe_data);
  	break;
  	
  case 'unvalidate_repository':
  	unvalidate_repository($safe_data);
  	break;
    
  default:
    exit('What do you do there?!');
  
}

function get_data() {
  
  $d = new Data(DB);
  
  $registrations_v = $d->count_all_mac_addresses(true);
  $registrations_w = $d->count_all_mac_addresses();
  $registrations = '<li>' . $registrations_w . ' en attente</li><li>' . $registrations_v . ' validés</li>';
  
  $repositories_v = $d->count_all_repositories(true);
  $repositories_w = $d->count_all_repositories();
  $repositories = '<li>' . $repositories_w . ' en attente</li><li>' . $repositories_v . ' validés</li>';
  
  $signatures_c = $d->count_all_cc_signatures();
  $signatures_p = $d->count_all_cp_signatures(); 
  $signatures = '<li>Charte informatique signée ' . $signatures_c . ' fois</li><li>Charte PROTEL signée ' . $signatures_p . ' fois</li>';
  
  $message = array('status' => 200, 'registrations' => $registrations, 'repositories' => $repositories, 'signatures' => $signatures);
  exit(json_encode($message));  
  
}

function get_waiting() {
  
  $d = new Data(DB);
  
  $cursor = $d->get_all_mac_addresses();
  $registrations = '';
  
  foreach ($cursor as $data) {
    
    $registrations .= '<li class="waiting"><span style="display:none;" id="loading-' . $data['mac_address'] . '"><img src="../images/loader.gif" alt="#" /></span>';
    $registrations .= '<input type="checkbox" id="' . $data['mac_address'] . '" name="' . $data['mac_address'] . '" />&nbsp;';
    $registrations .= '<span>' . $data['mac_address'] . '</span>&nbsp;';
    $registrations .= ' <span class="identity"><a href="mailto:' . $data['email'] . '">' . $data['first_name'] . ' ' . $data['name'] . '</a></span>';
    $registrations .= '&nbsp;<a href="#" class="delete" style="display:none;"><img src="../images/bin.png" alt="supprimer" /></a></li>';
    
  }
  
  $message = array('status' => 200, 'registrations' => $registrations);
  exit(json_encode($message));  
  
}

function get_validated() {
  
  $d = new Data(DB);
  
  $cursor = $d->get_all_mac_addresses(true);
  $registrations = '';
  
  foreach ($cursor as $data) {
    
    $registrations .= '<li class="waiting validated"><span style="display:none;" id="loading-' . $data['mac_address'] . '"><img src="../images/loader.gif" alt="#" /></span>';
    $registrations .= '<input type="checkbox" id="' . $data['mac_address'] . '" name="' . $data['mac_address'] . '" checked="checked" />&nbsp;';
    $registrations .= '<span>' . $data['mac_address'] . '</span>&nbsp;';
    $registrations .= ' <span class="identity"><a href="mailto:' . $data['email'] . '">' . $data['first_name'] . ' ' . $data['name'] . '</a></span>';
    $registrations .= '&nbsp;<a href="#" class="delete" style="display:none;"><img src="../images/bin.png" alt="supprimer" /></a></li>';
    
  }
  
  $message = array('status' => 200, 'registrations' => $registrations);
  exit(json_encode($message));  
  
}

function delete_registration($data) {
  
  $d = new Data(DB);
  
  $result = $d->delete_mac_address($data['mac_address']);
  
  if ($result) {
    $message = array('status' => 200, 'message' => 'Enregistrement supprimé.');
    exit(json_encode($message));  
  }
  else {
    $message = array('status' => 500, 'message' => 'Erreur lors de la suppression de l\'enregistrement.');
    exit(json_encode($message));  
  }
  
}

function validate_registration($data) {
  
  $d = new Data(DB);
  
  unset($data['action']);
  
  $result = $d->mark_mac_address_as_validated($data['mac_address']);
  
  if ($result) {
    $message = array('status' => 200, 'message' => 'Enregistrement validé.');
    exit(json_encode($message));  
  }
  else {
    $message = array('status' => 500, 'message' => 'Erreur lors de la validation de l\'enregistrement.');
    exit(json_encode($message));  
  }
  
}

function unvalidate_registration($data) {
  
  $d = new Data(DB);
  
  unset($data['action']);
  
  $result = $d->unmark_mac_address_as_validated($data['mac_address']);
  
  if ($result) {
    $message = array('status' => 200, 'message' => 'Enregistrement invalidé.');
    exit(json_encode($message));  
  }
  else {
    $message = array('status' => 500, 'message' => 'Erreur lors de l\'invalidation de l\'enregistrement.');
    exit(json_encode($message));  
  }
  
}

function get_waiting_repositories() {
  
  $d = new Data(DB);
  
  $cursor = $d->get_all_repositories();
  $repositories = '';
  
  foreach ($cursor as $data) {
    
    $rw_users = explode(';', $data['rw_users_logins']);
    $r_users = explode(';', $data['r_users_logins']);
    
    array_pop($rw_users);
    array_pop($r_users);
    
    $repositories .= '<li class="waiting"><span style="display:none;" id="loading-' . $data['repository'] . '"><img src="../images/loader.gif" alt="#" /></span>';
    $repositories .= '<input type="checkbox" id="' . $data['repository'] . '" name="' . $data['repository'] . '" />&nbsp;';
    $repositories .= '<span>' . $data['repository'] . '</span>&nbsp;';
    $repositories .= ' <span class="identity"><a href="mailto:' . $data['email'] . '">' . $data['email'] . '</a></span>';
    $repositories .= '&nbsp;<a href="#" class="delete" style="display:none;"><img src="../images/bin.png" alt="supprimer" /></a><ul>';
    if ($data['rw_users_count'] > 0) {
      $repositories .= '<li><strong>Utilisateurs Read/Write</strong></li>';
      foreach ($rw_users as $user) {
        $repositories .= '<li>' . $user . '</li>';
      }
    }
    if ($data['r_users_count'] > 0) {
      $repositories .= '<li><strong>Utilisateurs Read only</strong></li>';
      foreach ($r_users as $user) {
        $repositories .= '<li>' . $user . '</li>';
      }
    }
    $repositories .= '</ul></li>';
    
  }
  
  $message = array('status' => 200, 'repositories' => $repositories);
  exit(json_encode($message));  
  
}

function get_validated_repositories() {
  
  $d = new Data(DB);
  
  $cursor = $d->get_all_repositories(true);
  $repositories = '';
  
  foreach ($cursor as $data) {
    
    $rw_users = explode(';', $data['rw_users_logins']);
    $r_users = explode(';', $data['r_users_logins']);
    
    array_pop($rw_users);
    array_pop($r_users);
    
    $repositories .= '<li class="waiting validated"><span style="display:none;" id="loading-' . $data['repository'] . '"><img src="../images/loader.gif" alt="#" /></span>';
    $repositories .= '<input type="checkbox" id="' . $data['repository'] . '" name="' . $data['repository'] . '" checked="checked" />&nbsp;';
    $repositories .= '<span>' . $data['repository'] . '</span>&nbsp;';
    $repositories .= ' <span class="identity"><a href="mailto:' . $data['email'] . '">' . $data['email'] . '</a></span>';
    $repositories .= '&nbsp;<a href="#" class="delete" style="display:none;"><img src="../images/bin.png" alt="supprimer" /></a><ul>';
    if ($data['rw_users_count'] > 0) {
      $repositories .= '<li><strong>Utilisateurs Read/Write</strong></li>';
      foreach ($rw_users as $user) {
        $repositories .= '<li>' . $user . '</li>';
      }
    }
    if ($data['r_users_count'] > 0) {
      $repositories .= '<li><strong>Utilisateurs Read only</strong></li>';
      foreach ($r_users as $user) {
        $repositories .= '<li>' . $user . '</li>';
      }
    }
    $repositories .= '</ul></li>';
    
  }
  
  $message = array('status' => 200, 'repositories' => $repositories);
  exit(json_encode($message));  
  
}

function delete_repository($data) {
  
  $d = new Data(DB);
  
  $result = $d->delete_repository($data['repository']);
  
  if ($result) {
    $message = array('status' => 200, 'message' => 'Enregistrement supprimé.');
    exit(json_encode($message));  
  }
  else {
    $message = array('status' => 500, 'message' => 'Erreur lors de la suppression de l\'enregistrement.');
    exit(json_encode($message));  
  }
  
}

function validate_repository($data) {
  
  $d = new Data(DB);
  
  unset($data['action']);
  
  $result = $d->mark_repository_as_validated($data['repository']);
  
  if ($result) {
    $message = array('status' => 200, 'message' => 'Enregistrement validé.');
    exit(json_encode($message));  
  }
  else {
    $message = array('status' => 500, 'message' => 'Erreur lors de la validation de l\'enregistrement.');
    exit(json_encode($message));  
  }
  
}

function unvalidate_repository($data) {
  
  $d = new Data(DB);
  
  unset($data['action']);
  
  $result = $d->unmark_repository_as_validated($data['repository']);
  
  if ($result) {
    $message = array('status' => 200, 'message' => 'Enregistrement invalidé.');
    exit(json_encode($message));  
  }
  else {
    $message = array('status' => 500, 'message' => 'Erreur lors de l\'invalidation de l\'enregistrement.');
    exit(json_encode($message));  
  }
  
}

function get_cc_signatures() {
  
  $d = new Data(DB);
  
  $cursor = $d->get_all_cc_signatures();
  $signatures = '';
  
  foreach ($cursor as $data) {
    
    $signatures .= '<li class="waiting">' . $data['on_date'] . '&nbsp;';
    $signatures .= '<span>' . $data['first_name'] . ' ' . $data['name'] . '</span>&nbsp;';
    $signatures .= '<span class="identity"><a href="mailto:' . $data['email'] . '">' . $data['email'] . '</a></span></li>';
    
  }
  
  $message = array('status' => 200, 'signatures' => $signatures);
  exit(json_encode($message));  
  
}

function get_cp_signatures() {
  
  $d = new Data(DB);
  
  $cursor = $d->get_all_cp_signatures();
  $signatures = '';
  
  foreach ($cursor as $data) {
    
    $signatures .= '<li class="waiting">' . $data['on_date'] . '&nbsp;';
    $signatures .= '<span>' . $data['first_name'] . ' ' . $data['name'] . '</span>&nbsp;';
    $signatures .= '<span class="identity"><a href="mailto:' . $data['email'] . '">' . $data['email'] . '</a></span></li>';
    
  }
  
  $message = array('status' => 200, 'signatures' => $signatures);
  exit(json_encode($message));  
  
}