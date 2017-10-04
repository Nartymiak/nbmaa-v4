<?php
    include_once('../fns/getFns.php');
    include_once('../fns/checkToken.php');



    if(!$_POST['props']){


    }else{

        // begin payload
        $json = json_decode($_POST['props']);
        $events = getCalendarEventsByRange($json->cal->startRange, $json->cal->endRange);

        foreach($events as $e){
?>
            <div id="<?php echo $e['EventID']?>" class="program opacTransit"
                data-title="<?php echo $e['EventTitle']?>"
                data-date="<?php echo $e['StartDate']; ?>"
                data-start-time="<?php echo $e['StartTime'];?>"
                data-end-time="<?php echo $e['EndTime'];?>"
                data-catagory="<?php echo $e['KeywordLink'];?>"
                data-exhibition="<?php echo $e['ExhibitionTitle'] ?>"
            >
                <div class="evCatContainer h4 small">
                    <div class="eventCat"><?php echo $e['Word']; ?></div>
                </div>
                <div class="card">
                    <h3><a class="appLink" href="calendar/<?php echo $e['Link']; ?>"><?php echo $e['EventTitle']; ?></a></h3>
                    <h4 class="dateAndTime"><span class="date"><?php echo $e['StartDate']; ?></span>, <span class="time"><?php echo $e['StartTime'];?></span>-<span class="time"><?php echo $e['EndTime'];?></span></h4>
                    <div class="description"><?php echo $e['Description']; ?></div>
                    <?php if(!empty($e['ExhibitionTitle'])){ echo '<h4><small>Related Exhibition: '.$e['ExhibitionTitle']. '</small></h4>'; }?>
                </div>
                <div class="row subCard">
                    <div class="col-sm-8">
                        <h4><small><?php echo removePsAndAddBrs($e['AdmissionCharge']); ?></small></h4>
                    </div>
                    <div class="col-sm-4" style="text-align:right;">
                        <h4><small><a href="#" class="appLink"> share &nbsp;<span class="glyphicon glyphicon-share-alt">&nbsp;</span></a></small></h4>
                    </div>
                </div>
            </div>
<?php
        }


    }

    function removePsAndAddBrs($string){
        $s = $string;
        $s = str_replace("</p><p>", " | ", $s);
        $s = str_replace("<br>", " | ", $s);
        $s = str_replace("<p>", "", $s);
        $s = str_replace("</p>", "", $s);
        return $s;
    }
?>
