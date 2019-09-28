<?php
    session_start();
    include 'db.php';

    if(isset($_POST['username'])) {
        $studentNumber = studentNoExists($_POST['username'], $_POST['password']);
        if($studentNumber != false) {
            $_SESSION['student_NO'] = $studentNumber['student_NO'];
            $_SESSION['nickname'] = $studentNumber['nick'];
            $_SESSION['privilege'] = $studentNumber['privilege'];
            echo json_encode(Array('login'=>$studentNumber['student_NO'],
                'privilege'=>$studentNumber['privilege'],
                'nick'=>$studentNumber['nick']));
            die();
        } else {
            unset($_SESSION['student_NO']);
            unset($_SESSION['nickname']);
            unset($_SESSION['privilege']);
            echo json_encode(Array('login'=>false));
            die();
        }
    }
    if(isset($_POST['logout'])) {
      unset($_SESSION['student_NO']);
      unset($_SESSION['nickname']);
      unset($_SESSION['privilege']);
      echo json_encode(Array('login'=>false));
      die();
    }
?>
