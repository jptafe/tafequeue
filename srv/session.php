<?php
    session_start();
    include 'db.php';

    if(isset($_POST['username'])) {
        $studentNumber = studentNoExists($_POST['username'], $_POST['password']);
        if($studentNumber != false) {
            $_SESSION['student_NO'] = $studentNumber['student_NO'];
            $_SESSION['nickname'] = $studetnNumber['nick'];
            $_SESSION['privilege'] = $studetnNumber['privilege'];
        } else {
            unset($_SESSION['student_NO']);
            unset($_SESSION['nickname']);
            unset($_SESSION['privilege']);
        }
    }
    if(isset($_POST['logout'])) {
      unset($_SESSION['student_NO']);
      unset($_SESSION['nickname']);
      unset($_SESSION['privilege']);
    }
?>
