<?php

require 'database.php';

if ($_GET['username'] !== null)
{
  $username = trim($_GET['username']);
}
else
{
  return http_response_code(400);
}


$stmt = mysqli_prepare($con, "delete from accounts where username=?");

if ($stmt)
{
  mysqli_stmt_bind_param($stmt, "s", $username);
  mysqli_stmt_execute($stmt);
  mysqli_stmt_close($stmt);
  http_response_code(200);
}
else
{
  return http_response_code(422);
}

