<?php
require 'database.php';


$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);

  $tag = trim($request->tag);
  $storyHashID = trim($request->storyHashID);

    $stmt = mysqli_prepare($con, "insert into storiesHaveTags (storyHashID,tag) values (?, ?)");
    if ($stmt)
    {
        mysqli_stmt_bind_param($stmt, "ss", $storyHashID, $tag);
        mysqli_stmt_execute($stmt);
        
        if (mysqli_stmt_errno($stmt) != 0)
        {
            echo $stmt->error;
        }
        mysqli_stmt_close($stmt);
        http_response_code(201);
        
    }
    else
    {
        return http_response_code(422);
    }

}
