<?php
    include_once('../fns/getFns.php');
    include_once('../fns/checkToken.php');



    if(!$_POST['props']){


    }else{

        // begin payload
        $json = json_decode($_POST['props']);
        //$id = $json->{'eventID'};
        //echo $json->page->pageParam;
        $title = getTitle($json->page->pageParam);
        try {
            if(empty($title)){
                throw new Exception('Could not find title match to pageParam in db');
            }else{
                echo $title[0];
            }
        }catch (Exception $e) { header('HTTP/1.0 500 Server Boo Boo: '.$e->getMessage()); }

    }
?>
