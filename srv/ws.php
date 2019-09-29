<?php
    if($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
      //  header('Access-Control-Allow-Headers: X-Requested-With');
        header("HTTP/1.1 200 OK");
        die();
    }

    // include a settings file to put db pass & doman lock

    header('Content-Type: application/json');

    include 'session.php';
    if(isset($_GET['getData'])) {
        if($_GET['getData'] == 'listqueue') {
            $res = getQueue();
        }
        if($_GET['getData'] == 'listsuggestions') {
            $res = getSuggestions();
        }
        if($_GET['getData'] == 'enqueue') {
            $data = Array('studentno'=>$_SESSION['student_NO'],
                            'title'=>$_POST['problem'],
                            'desc'=>$_POST['description']);
            $res = enQueue($data);
        }
        if($_GET['getData'] == 'dequeue') {
            $res = deQueue($_GET['queueid'], $_GET['student_NO']);
        }
        if($_GET['getData'] == 'settings') {
            $res = upSettings($_POST['student_NO'], $_POST['nick'], $_POST['pass']);
        }
        if($_GET['getData'] == 'createdb') {
            $res = populateDatabase();
        }
    }
    if(isset($res)) {
        echo json_encode($res);
    } else {
        echo json_encode(Array('error'=>'true'));
    }
?>
