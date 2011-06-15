<?php

class Data {
  
  private $m = null;
  private $db = 'test';
  private $collection = null;
  
  function __construct($db) {
    
    $this->m = new Mongo();
    $this->db = $this->m->isen;
    
    date_default_timezone_set("Europe/Paris");
    
  }
  
  /* Mac addresses stuff */
  
  function save_mac_address($data) {
    
    $this->collection = $this->db->mac_addresses;
    $options = array('fsync' => false);
    
    if ( ! empty($data) && ! empty($data['name']) && ! empty($data['first_name']) && ! empty($data['mac_address']) && ! empty($data['is_validated'])) {
      $this->collection->insert($data);
      return true;
    }
    
    return false;
    
  }
  
  function get_all_mac_addresses($show_validated = false) {
    
    $this->collection = $this->db->mac_addresses;
    if ($show_validated) $query = array('is_validated' => "true");
    else $query = array('is_validated' => "false");
    
    return $this->collection->find($query)->sort(array('name' => 1, 'first_name' => 1));
    
  }
  
  function count_all_mac_addresses($show_validated = false) {
    
    $this->collection = $this->db->mac_addresses;
    if ($show_validated) $query = array('is_validated' => 'true');
    else $query = array('is_validated' => 'false');
    
    return $this->collection->count($query);
    
  }
  
  function mark_mac_address_as_validated($mac) {
    
    $this->collection = $this->db->mac_addresses;
    $query = array('mac_address' => $mac);
    
    $result = $this->collection->findOne($query);
    
    $result['is_validated'] = "true";
    
    $options = array('upsert' => false, 'multiple' => false, 'fsync' => false);
    return $this->collection->update($query, $result, $options);
    
  }
  
  function unmark_mac_address_as_validated($mac) {
    
    $this->collection = $this->db->mac_addresses;
    $query = array('mac_address' => $mac);
    
    $result = $this->collection->findOne($query);
    
    $result['is_validated'] = "false";
    
    $options = array('upsert' => false, 'multiple' => false, 'fsync' => false);
    return $this->collection->update($query, $result, $options);
    
  }
  
  function delete_mac_address($mac) {
    
    $this->collection = $this->db->mac_addresses;
    $query = array('mac_address' => $mac);
    
    $options = array('justOne' => true, 'fsync' => false);
    $result = $this->collection->remove($query, $options);
    
    return $result;
    
  }
  
  /* SVN stuff */
  
  function save_repository($data) {
    
    $this->collection = $this->db->repositories;
    $options = array('fsync' => false);
    
    if ( ! empty($data) && ! empty($data['repository']) && ! empty($data['email']) && ! empty($data['is_validated'])) {
      $this->collection->insert($data);
      return true;
    }
    
    return false;
    
  }
  
  function get_all_repositories($show_validated = false) {
    
    $this->collection = $this->db->repositories;
    if ($show_validated) $query = array('is_validated' => "true");
    else $query = array('is_validated' => "false");
    
    return $this->collection->find($query)->sort(array('repository' => 1, 'email' => 1));
    
  }
  
  function count_all_repositories($show_validated = false) {
    
    $this->collection = $this->db->repositories;
    if ($show_validated) $query = array('is_validated' => 'true');
    else $query = array('is_validated' => 'false');
    
    return $this->collection->count($query);
    
  }
  
  function mark_repository_as_validated($repository) {
    
    $this->collection = $this->db->repositories;
    $query = array('repository' => $repository);
    
    $result = $this->collection->findOne($query);
    
    $result['is_validated'] = "true";
    
    $options = array('upsert' => false, 'multiple' => false, 'fsync' => false);
    return $this->collection->update($query, $result, $options);
    
  }
  
  function unmark_repository_as_validated($repository) {
    
    $this->collection = $this->db->repositories;
    $query = array('repository' => $repository);
    
    $result = $this->collection->findOne($query);
    
    $result['is_validated'] = "false";
    
    $options = array('upsert' => false, 'multiple' => false, 'fsync' => false);
    return $this->collection->update($query, $result, $options);
    
  }
  
  function delete_repository($repository) {
    
    $this->collection = $this->db->repositories;
    $query = array('repository' => $repository);
    
    $options = array('justOne' => true, 'fsync' => false);
    $result = $this->collection->remove($query, $options);
    
    return $result;
    
  }
  
  /* Signatures stuff */
  
  function save_cc_signature($data) {
    
    $this->collection = $this->db->cc_signatures;
    $options = array('fsync' => false);
    
    if ( ! empty($data) && ! empty($data['name']) && ! empty($data['first_name']) && ! empty($data['email'])) {
      $date = date("d-m-Y", time());
      $data['on_date'] = $date;
      $this->collection->insert($data);
      return true;
    }
    
    return false;
    
  }
  
  function save_cp_signature($data) {
    
    $this->collection = $this->db->cp_signatures;
    $options = array('fsync' => false);
    
    if ( ! empty($data) && ! empty($data['name']) && ! empty($data['first_name']) && ! empty($data['email'])) {
      $date = date("d-m-Y", time());
      $data['on_date'] = $date;
      $this->collection->insert($data);
      return true;
    }
    
    return false;
    
  }
  
  function get_all_cc_signatures() {
    
    $this->collection = $this->db->cc_signatures;
    
    return $this->collection->find()->sort(array('name' => 1, 'first_name' => 1));
    
  }
  
  function get_all_cp_signatures() {
    
    $this->collection = $this->db->cp_signatures;
    
    return $this->collection->find()->sort(array('name' => 1, 'first_name' => 1));
    
  }
  
  function count_all_cc_signatures() {
    
    $this->collection = $this->db->cc_signatures;
    
    return $this->collection->count();
    
  }
  
  function count_all_cp_signatures() {
    
    $this->collection = $this->db->cp_signatures;
    
    return $this->collection->count();
    
  }
  
  /* Utilities */
  
  function is_mac_address($mac) {
    
    if (preg_match("/^([0-9a-f]{2}([:-]|$)){6}$/i", $mac)) return true;
    
    return false;
    
  }
  
  function mac_address_exists($mac) {
    
    $this->collection = $this->db->mac_addresses;
    $query = array('mac_address' => $mac);
    
    if ($this->collection->findOne($query)) return true;
    return false;
    
  }
  
  function repository_exists($repository) {
    
    $this->collection = $this->db->repositories;
    $query = array('repository' => $repository);
    
    if ($this->collection->findOne($query)) return true;
    return false;
    
  }
  
  function cc_signature_exists($name, $first_name) {
    
    $this->collection = $this->db->cc_signatures;
    $query = array('name' => $name, 'first_name' => $first_name);
    
    if ($this->collection->findOne($query)) return true;
    return false;
    
  }
  
  function cp_signature_exists($name, $first_name) {
    
    $this->collection = $this->db->cp_signatures;
    $query = array('name' => $name, 'first_name' => $first_name);
    
    if ($this->collection->findOne($query)) return true;
    return false;
    
  }
  
  function is_email_address($email) {
    
    if (preg_match('/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/', $email)) return true;
    return false;
    
  }
  
}