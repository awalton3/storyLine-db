<?php

require 'database.php';

// Get the oneLiner to delete
if ($_GET['oneLiner'] !== null)
{
  //$oneLiner = mysqli_real_escape_string($con, trim($_GET['oneLiner']));
  $oneLiner = trim($_GET['oneLiner']);
}
else
{
  return http_response_code(400);
}


$stmt = mysqli_prepare($con, "delete from oneLiners where oneLiner=?");

if ($stmt)
{
  mysqli_stmt_bind_param($stmt, "s", $oneLiner);
  mysqli_stmt_execute($stmt);
  mysqli_stmt_close($stmt);
  http_response_code(200);
}
else
{
  return http_response_code(422);
}



// Delete the oneLiner from oneLiners
/*$sql = "DELETE FROM `oneLiners` WHERE `oneLiner` ='{$oneLiner}'";

if(mysqli_query($con, $sql))
{
  http_response_code(204);
}
else
{
  return http_response_code(422);
}
*/
