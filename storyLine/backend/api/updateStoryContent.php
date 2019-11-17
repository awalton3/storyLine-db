<?php
require 'database.php';

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);

  $storyHashID = hash("sha256", trim($request->storyHashID));
  $content = trim($request->$content);

    $stmt = mysqli_prepare($con, "update stories set content=?,storyHashID=? where storyHashID=?");

  if ($stmt)
  {
    mysqli_stmt_bind_param($stmt,"ss", $content,$storyHashID);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    http_response_code(201);
  }
  else
  {
    http_response_code(422);
  }

}

