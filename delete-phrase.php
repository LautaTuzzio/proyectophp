<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $phrase = $_POST["phrase"];

  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "wenas";

  $conn = new mysqli($servername, $username, $password, $dbname);

  if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
  }

  $deleteSql = "DELETE FROM frases WHERE frase = '$phrase'";

  if ($conn->query($deleteSql) === TRUE) {
    echo "";
  } else {
    echo "" . $conn->error;
  }

  $conn->close();
}
?>
