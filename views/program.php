<?php
    include_once('../fns/getFns.php');
    include_once('../fns/checkToken.php');



    if(!$_POST['props']){


    }else{

        // begin payload
        $json = json_decode($_POST['props']);
        //$id = $json->{'eventID'};
        //echo $json->page->pageParam;
        $event = getEventByParam($json->page->pageParam);
        try {
            if(empty($event)){
                throw new Exception('Could not find match to pageParam in db');
            }
        }catch (Exception $e) { header('HTTP/1.0 500 Server Boo Boo: '.$e->getMessage()); }

?>

        <div id="program" class="col-sm-12" data-title="<?php echo $event[0]['EventTitle']?>">
            <div class="printEvent row">
                <div class="col-sm-10">
                    <h3><?php echo $event[0]['EventTitle']; ?></h3>
                    <h4 class="dateAndTime"><span class="date"><?php echo $event[0]['StartDate']; ?></span>, <span class="time"><?php echo $event[0]['StartTime'];?></span>-<span class="time"><?php echo $event[0]['EndTime'];?></span></h4>
                    <div class="printDescription">
                        <?php echo $event[0]['Description']; ?>
                        <?php echo $event[0]['AdmissionCharge']; ?>
                    </div>
                    <?php if(!empty($event[0]['ExhibitionTitle'])){ echo '<h4><small>Related Exhibition: '.$event[0]['ExhibitionTitle']. '</small></h4>'; }?>
                    <?php echo '<h4><small>Event ID: '.$event[0]['EventID']. '</small></h4>';?>
                </div>
            </div>
        </div>

<?php
    }

?>
