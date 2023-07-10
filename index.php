<?php

$db = new PDO("mysql:host=localhost;dbname=mydb;charset=utf8mb4", "root", "");

$phrases = $_POST["phrases"];

foreach ($phrases as $phrase) {
  $sql = "INSERT INTO phrases (phrase) VALUES ('$phrase')";
  $db->query($sql);
}

?>