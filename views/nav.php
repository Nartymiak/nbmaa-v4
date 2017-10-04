<?php
    include_once('../fns/getFns.php');
    include_once('../fns/checkToken.php');



    if(!$_POST['props']){


    }else{

        // begin payload
        $json = json_decode($_POST['props']);
        //$id = $json->{'eventID'};
?>

        <nav id="nav" role="navigation" class="col-sm-12 nav">
            <ul>
                <li><a class="appLink hovStyle h4" href="exhibitions" data-view="exhibition-sub-cat">Exhibitions</a></li>
                <li><a class="appLink hovStyle h4" href="calendar" data-view="calendar">Calendar</a></li>
                <li><a class="appLink hovStyle h4" href="visit" data-view="default">Visit</a></li>
                <li><a class="appLink hovStyle h4" href="about" data-view="default">About</a></li>
                <li><a class="appLink hovStyle h4" href="emuseum" data-view="emuseum">Collection</a></li>
                <li><a class="appLink hovStyle h4" href="membership" data-view="membership">Membership</a></li>
                <li><a class="appLink hovStyle h4" href="contact" data-view="default">Contact</a></li>
                <li><a class="appLink hovStyle h4" href="cafe" data-view="cafe">Caf&eacute;</a></li>
                <li><a class="appLink hovStyle h4" href="rent-the-museum" data-view="rent-the-museum">Rent the Museum</a></li>
                <li><a class="appLink hovStyle h4" href="defaut" data-view="default">Opportunites for Artists</a></li>
                <li><a class="appLink hovStyle h4" href="education-department" data-view="education-dept">Education Department</a></li>
            </ul>
        </nav>

<?php
    }

?>
