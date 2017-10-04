<?php
    include_once('../fns/getFns.php');
    include_once('../fns/checkToken.php');



    if(!$_POST['props']){


    }else{

        // begin payload
        $json = json_decode($_POST['props']);
        //$id = $json->{'eventID'};
?>

        <div id="exhibition-sub-cat" class="col-sm-12">
            <h2>Exhibition Sub Cat</h2>
        </div>

<?php
    }

?>
