<?php
    include_once('../fns/getFns.php');
    include_once('../fns/checkToken.php');



    if(!$_POST['props']){


    }else{

        // begin payload
        $json = json_decode($_POST['props']);
        $date = date('Y-m-d H:i:s');
        $maxDate = date('Y-m-d H:i:s', PHP_INT_MAX);
        $mainEx = getMainEx();
        $currentEx = getEx('current');
        $upcomingEx = getEx('upcoming');
        $prevEx = getEx('previous');
?>

        <div id="exhibitions" class="col-sm-12">
            <div class="row">
                <div class="col-sm-12">
                    <h3>Main Exhibition</h3>
                    <div class="row card">
                        <div class="col-sm-6">
                            <img src="http://www.nbmaa.org/images/exhibition-page-images/<?php echo $mainEx[0]['ImgFilePath']; ?>">
                        </div>
                        <div class="col-sm-6">
                            <h3 class="title"><?php echo $mainEx[0]['Title'] ?></h3>
                            <h4 class="dateAndTime">
                                <span class="date"><?php echo $mainEx[0]['StartDate']; ?></span>-<span class="date"><?php echo $mainEx[0]['EndDate'];?></span>
                            </h4>
                            <div class="description"><?php echo  $mainEx[0]['BodyContent']; ?></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <h3>Current</h3>
                    <?php foreach($currentEx as $c){ printEx($c); } ?>
                </div>
                <div class="col-sm-6">
                    <h3>Upcoming</h3>
                    <?php foreach($upcomingEx as $u){ printEx($u); } ?>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-3">
                    <h3>Previous</h3>
                    <?php foreach($prevEx as $p){ printEx($p); } ?>
                </div>
            </div>
        </div>

<?php
    }

    function printEx($ex){
        $desc = preg_replace('#<link(.*?)>(.*?)</link>#is', '',   $ex['BodyContent']);
?>
                        <div class="exhibition card">
                            <img src="http://www.nbmaa.org/images/exhibition-page-images/<?php echo $ex['ExImgFilePath']; ?>">
                            <h3 class="title"><?php echo $ex['ExTitle'] ?></h3>
                            <h4 class="dateAndTime">
                                <span class="date"><?php echo $ex['ExStartDate']; ?></span>-<span class="date"><?php echo $ex['ExEndDate'];?></span>
                            </h4>
                            <div class="description"><?php echo $desc; ?></div>
                        </div>
<?php
    }

?>
