<?php

require 'database.php';

if ($_GET['oneliner'] !== null)
{
    if ($_GET['authorUsername'] !== null)
    {
      $oneliner = trim($_GET['oneliner']);
      $authorUsername = trim($_GET['authorUsername']);
    }
}
else
{
  return http_response_code(400);
}


$stmt = mysqli_prepare($con, "delete from accountsLikeOneLiners where oneLiner=? and authorUsername=?");

if ($stmt)
{
  mysqli_stmt_bind_param($stmt, "ss", $oneliner, $authorUsername);
  mysqli_stmt_execute($stmt);
  mysqli_stmt_close($stmt);
  http_response_code(200);
}
else
{
  return http_response_code(422);
}
