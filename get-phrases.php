<?php
  $servername = "localhost";
  $username = "phpmyadmin";
  $password = "RedesInformaticas";
  $dbname = "db_tuzzio";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("" . $conn->connect_error);
}

$sql = "SELECT frase FROM frases";
$result = $conn->query($sql);

$phrases = [];
if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $phrases[] = $row["frase"];
  }
}

echo json_encode($phrases);

$conn->close();
?>