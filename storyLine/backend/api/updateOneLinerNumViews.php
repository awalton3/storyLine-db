<?php
require 'database.php';

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);

  $oneLiner = trim($request->oneLiner);
  $change = (int)$request->change;

  if ($change == 1)
  {
    $stmt = mysqli_prepare($con, "update oneLiners set numViews=(numViews+1) where oneLiner=?");
  }
  else
  {
    $stmt = mysqli_prepare($con, "update oneLiners set numViews=(numViews-1) where oneLiner=?");
  }

  if ($stmt)
  {
    mysqli_stmt_bind_param($stmt,"s", $oneLiner);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    http_response_code(201);
  }
  else
  {
    http_response_code(422);
  }

}

