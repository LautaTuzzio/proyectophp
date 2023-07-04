<?php

$nombre_ = $_POST['nombre'];
$apellido_ = $_POST['apellido'];
$mail_ = $_POST['mail'];
$observaciones_ = $_POST['observaciones'];
$conexion = new mysqli('localhost', 'root', '', 'contacto');

if(!$conexion){
    die('no funca');
}

$sql = "INSERT INTO `contacto`(`nombre`,`apellido`,`mail`,`observaciones`) VALUES ('$nombre_','$apellido_','$mail_','$observaciones_')";
if(mysqli_query($conexion, $sql)){
    $sucess = "test";
}else{
    echo "me quiero matar";
}
mysqli_close($conexion)

?>