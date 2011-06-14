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
  
  case 'add_mac':
    add_mac($safe_data);
    break;
    
  case 'sign_cc':
    add_cc_signature($safe_data);
    break;
    
  case 'get_data':
    get_data();
    break;
    
  case 'get_waiting':
    get_waiting();
    break;
    
  case 'get_validated':
    get_validated();
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
    
  default:
    exit('What do you do there?!');
  
}


function add_mac($data) {
  
  $d = new Data(DB);
  if ( ! isset($data['mac_address']) OR ! isset($data['name']) OR ! isset($data['first_name']) OR ! isset($data['email'])) {
    $message = array('status' => 400, 'message' => 'Veuillez remplir tous les champs.');
    exit(json_encode($message));
  }
  else if ( ! $d->is_mac_address($data['mac_address'])) {
    $message = array('status' => 400, 'message' => 'Veuillez entrer une adresse MAC valide.');
    exit(json_encode($message));    
  }
  else if ($d->mac_address_exists($data['mac_address'])) {
    $message = array('status' => 400, 'message' => 'Cette addresse MAC a déjà été enregistrée.');
    exit(json_encode($message));   
  }
  else if (strlen($data['name']) < 3) {
    $message = array('status' => 400, 'message' => 'Veuillez entrer un nom d\'au moins 3 caractères.');
    exit(json_encode($message));   
  }
  else if (strlen($data['first_name']) < 3) {
    $message = array('status' => 400, 'message' => 'Veuillez entrer un prénom d\'au moins 3 caractères.');
    exit(json_encode($message));   
  }
  else if ( ! $d->is_email_address($data['email'])) {
    $message = array('status' => 400, 'message' => 'Veuillez entrer un adresse email valide.');
    exit(json_encode($message));   
  }
  else {
    
    unset($data['action']);
    
    if ($d->save_mac_address($data)) {
      $message = array('status' => 200, 'message' => 'Votre adresse MAC a été enregistrée avec succès.<br />Votre requête sera traitée dans un delais de 3 à 5 jours.');
      exit(json_encode($message));  
    }
    else {
      $message = array('status' => 500, 'message' => 'Erreur lors de la sauvegarde des données.');
      exit(json_encode($message));  
    }
    
  }
  
}

function get_data() {
  
  $d = new Data(DB);
  
  $registrations_v = $d->count_all_mac_addresses(true);
  $registrations = $d->count_all_mac_addresses();
  $registrations = '<li>' . $registrations . ' en attente</li><li>' . $registrations_v . ' validés</li>';
  
  $signatures_c = 0;
  $signatures_p = 0; 
  $signatures = '<li>Convention informatique signée ' . $signatures_c . ' fois</li><li>Convention Protel signée ' . $signatures_p . ' fois</li>';
  
  $message = array('status' => 200, 'registrations' => $registrations, 'signatures' => $signatures);
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

function add_cc_signature($data) {
  
  $d = new Data(DB);
  if ( ! isset($data['name']) OR ! isset($data['first_name']) OR ! isset($data['email'])) {
    $message = array('status' => 400, 'message' => 'Veuillez remplir tous les champs.');
    exit(json_encode($message));
  }
  else if ($d->cc_signature_exists($data['name'], $data['first_name'])) {
    $message = array('status' => 400, 'message' => 'Vous avez déjà signé la convention.');
    exit(json_encode($message));   
  }
  else if (strlen($data['name']) < 3) {
    $message = array('status' => 400, 'message' => 'Veuillez entrer un nom d\'au moins 3 caractères.');
    exit(json_encode($message));   
  }
  else if (strlen($data['first_name']) < 3) {
    $message = array('status' => 400, 'message' => 'Veuillez entrer un prénom d\'au moins 3 caractères.');
    exit(json_encode($message));   
  }
  else if (! $d->is_email_address($data['email'])) {
    $message = array('status' => 400, 'message' => 'Veuillez entrer un adresse email valide.');
    exit(json_encode($message));   
  }
  else {
    
    unset($data['action']);
    
    if ($d->save_cc_address($data)) {
      $message = array('status' => 200, 'message' => 'Votre signature a été enregistrée avec succès.');
      exit(json_encode($message));  
    }
    else {
      $message = array('status' => 500, 'message' => 'Erreur lors de la sauvegarde des données.');
      exit(json_encode($message));  
    }
    
  }
  
}