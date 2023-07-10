<?php

$db = new PDO("mysql:host=localhost;dbname=mydb", "root", "");

$phrases = $_POST["phrases"];

foreach ($phrases as $phrase) {
  $sql = "INSERT INTO phrases (phrase) VALUES ('$phrase')";
  $db->query($sql);
}

?>