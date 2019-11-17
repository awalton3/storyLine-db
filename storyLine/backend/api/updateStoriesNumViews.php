<?php
require 'database.php';

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);

  $storyHashID = trim($request->storyHashID);
  $change = (int)$request->change;

  if ($change == 1)
  {
    $stmt = mysqli_prepare($con, "update stories set numViews=(numViews+1) where storyHashID=?");
  }
  else
  {
    $stmt = mysqli_prepare($con, "update stories set numViews=(numViews-1) where storyHashID=?");
  }

  if ($stmt)
  {
    mysqli_stmt_bind_param($stmt,"s", $storyHashID);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    http_response_code(201);
  }
  else
  {
    http_response_code(422);
  }

}

