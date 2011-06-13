<?php

class Data {
  
  private $m = null;
  private $db = 'test';
  private $collection = null;
  
  function __construct($db) {
    
    $this->m = new Mongo();
    $this->db = $this->m->isen;
    
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
    $query = array('is_validated' => 'false');
    
    if ($show_validated) return $this->collection->find()->sort(array('name' => 1, 'first_name' => 1));
    else return $this->collection->find($query)->sort(array('name' => 1, 'first_name' => 1));
    
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
    
    return $result['ok'];
    
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
  
}