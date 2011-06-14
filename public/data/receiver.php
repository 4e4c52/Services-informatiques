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
    
  case 'add_cc':
    add_cc_signature($safe_data);
    break;
    
  case 'add_cp':
    add_cp_signature($safe_data);
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

function add_cc_signature($data) {
  
  $d = new Data(DB);
  if ( ! isset($data['name']) OR ! isset($data['first_name']) OR ! isset($data['email'])) {
    $message = array('status' => 400, 'message' => 'Veuillez remplir tous les champs.');
    exit(json_encode($message));
  }
  else if ($d->cc_signature_exists($data['name'], $data['first_name'])) {
    $message = array('status' => 400, 'message' => 'Vous avez déjà signé la charte informatique.');
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
    
    if ($d->save_cc_signature($data)) {
      $message = array('status' => 200, 'message' => 'Votre signature a été enregistrée avec succès.');
      exit(json_encode($message));  
    }
    else {
      $message = array('status' => 500, 'message' => 'Erreur lors de la sauvegarde des données.');
      exit(json_encode($message));  
    }
    
  }
  
}

function add_cp_signature($data) {
  
  $d = new Data(DB);
  if ( ! isset($data['name']) OR ! isset($data['first_name']) OR ! isset($data['email'])) {
    $message = array('status' => 400, 'message' => 'Veuillez remplir tous les champs.');
    exit(json_encode($message));
  }
  else if ($d->cp_signature_exists($data['name'], $data['first_name'])) {
    $message = array('status' => 400, 'message' => 'Vous avez déjà signé la charte PROTEL.');
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
    
    if ($d->save_cp_signature($data)) {
      $message = array('status' => 200, 'message' => 'Votre signature a été enregistrée avec succès.');
      exit(json_encode($message));  
    }
    else {
      $message = array('status' => 500, 'message' => 'Erreur lors de la sauvegarde des données.');
      exit(json_encode($message));  
    }
    
  }
  
}