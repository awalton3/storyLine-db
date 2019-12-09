<?php
require 'database.php';


$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);

  $follower = trim($request->follower);
  $followed = trim($request->followed);

    $stmt = mysqli_prepare($con, "insert into followers (follower,followed) values (?, ?)");
    if ($stmt)
    {
        mysqli_stmt_bind_param($stmt, "ss", $follower, $followed);
        mysqli_stmt_execute($stmt);
        $resultVar = [
        'follower' => $follower,
        'followed' => $followed ];

        echo json_encode($resultVar);
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
