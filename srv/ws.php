<?php
    header('Content-Type: application/json');
    include 'session.php';

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
        $res = json_encode(Array('enQueued'=>(int)$res));
    }
    if($_GET['getData'] == 'dequeue') {
        $res = deQueue($_GET['queueid'], $_SESSION['student_NO']);
        $res = json_encode(Array('deQueued'=>(int)$res));
    }
    if(isset($res)) {
      echo json_encode($res);
    } else {
      echo json_encode(Array('error'=>'true'));
    }
?>
