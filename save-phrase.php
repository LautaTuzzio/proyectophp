<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $phrase = $_POST["phrase"];
  $isRandom = $_POST["isRandom"];

  $servername = "localhost";
  $username = "phpmyadmin";
  $password = "RedesInformaticas";
  $dbname = "db_tuzzio";

  $conn = new mysqli($servername, $username, $password, $dbname);

  if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
  }

  if ($isRandom === "true") {
    $sql = "INSERT INTO frases (frases_aleatorias) VALUES ('$phrase')";
  } else {
    $sql = "INSERT INTO frases (frase) VALUES ('$phrase')";
  }

  if ($conn->query($sql) === TRUE) {
    echo "";
  } else {
    echo "" . $conn->error;
  }

  $conn->close();
}
?>
