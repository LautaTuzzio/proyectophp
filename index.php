<?php

// Create a database connection
$db = new PDO("mysql:host=localhost;dbname=frases;charset=utf8mb4", "root", "");

// Get the phrases from the input
$phrases = $_POST["phrases"];

// Insert the phrases into the database
foreach ($phrases as $phrase) {
  $sql = "INSERT INTO phrases (phrase) VALUES ('$phrase')";
  $db->query($sql);
}

// Merge the phrases and display them on the page
$merged_phrase = implode(" ", $phrases);
echo $merged_phrase;

?>