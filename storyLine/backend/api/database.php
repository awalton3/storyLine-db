<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


define('DB_HOST', 'localhost');
define('DB_USER', 'kmalecki');
define('DB_PASS', 'klm');
define('DB_NAME', 'kmalecki');

function connect() {

  $connect = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

  /* Check for errors */
  if (mysqli_connect_errno($connect)) {
    die("Failed to connect: " . mysqli_connect_error());
  }

  //FIXME: we might need ASCII?
  mysqli_set_charset($connect, "ASCII");
  return $connect;

}

$con = connect();
