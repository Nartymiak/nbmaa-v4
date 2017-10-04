<?php
    include_once('../fns/getFns.php');
    include_once('../fns/checkToken.php');



    if(!$_POST['props']){


    }else{

        // begin payload
        $json = json_decode($_POST['props']);
?>

        <div id="calendar" class="col-sm-12">
            <div class="row">
                <div class="col-sm-5"><div id="nbmaacal"></div></div>
                <div class="col-sm-1"></div>
                <div class="col-sm-6">

                    <div id="calEventList"></div>
                </div>
            </div>
        </div>

<?php
    }

?>
