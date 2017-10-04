<?php
    include_once('db_fns.php');

	function getEventByParam($link){
		// create the connection
		$conn = pdo_connect();

		// write the generic statement
		$sql = '	SELECT 		EVENT.EventID, EVENT.Title as EventTitle, EVENT_DATE_TIMES.StartDate, EventNoteID, OkToPub, Word, EXHIBITION.Title as ExhibitionTitle, EVENT.Description, ImgFilePath, Print, Sponsors
		      		FROM    	EVENT
		      		LEFT JOIN 	EVENT_DATE_TIMES ON EVENT.EventID = EVENT_DATE_TIMES.EventID
		      		LEFT JOIN 	KEYWORD ON EVENT.EventTypeID = KEYWORD.KeywordID
		      		LEFT JOIN 	EXHIBITION_EVENTS ON EVENT.EventID = EXHIBITION_EVENTS.EventID
		      		LEFT JOIN 	EXHIBITION ON EXHIBITION_EVENTS.ExhibitionID = EXHIBITION.ExhibitionID
		      		WHERE 		EVENT.Link = :Link
		      		GROUP BY 	EVENT.EventID
		      		ORDER BY 	EVENT_DATE_TIMES.StartDate DESC';

		// prepare the statement object
		$statement = $conn->prepare($sql);

        $statement->bindValue(":Link", $link, PDO::PARAM_STR);

        try { $statement->execute();
        } catch (Exception $e) { header('HTTP/1.0 500 Server Boo Boo: '.$e->getMessage()); }

		//Fetch all of the results.
		$result = $statement->fetchAll(PDO::FETCH_ASSOC);

		// sort result by date
		$conn = null;
		return $result;
    }

    function getCalendarEventsByRange($startDate, $endDate){
		// create the connection
		$conn = pdo_connect();

		// write the generic statement
		$sql = '	SELECT 		EVENT.EventID, EVENT.Title as EventTitle,
                                EVENT_DATE_TIMES.StartDate, EVENT_DATE_TIMES.StartTime, EVENT_DATE_TIMES.EndTime,
                                EVENT.AdmissionCharge, Word, KEYWORD.link as KeywordLink, EXHIBITION.Title as ExhibitionTitle,
                                EVENT.Description, ImgFilePath, EVENT.Link
		      		FROM    	EVENT
		      		LEFT JOIN 	EVENT_DATE_TIMES ON EVENT.EventID = EVENT_DATE_TIMES.EventID
		      		LEFT JOIN 	KEYWORD ON EVENT.EventTypeID = KEYWORD.KeywordID
		      		LEFT JOIN 	EXHIBITION_EVENTS ON EVENT.EventID = EXHIBITION_EVENTS.EventID
		      		LEFT JOIN 	EXHIBITION ON EXHIBITION_EVENTS.ExhibitionID = EXHIBITION.ExhibitionID
		      		WHERE 		EVENT.Publish = "1"
                    AND         EVENT_DATE_TIMES.StartDate BETWEEN :startDate AND :endDate
		      		ORDER BY 	EVENT_DATE_TIMES.StartDate ASC, EVENT_DATE_TIMES.StartTime ASC';

		// prepare the statement object
		$statement = $conn->prepare($sql);
        $statement->bindValue(":startDate", $startDate, PDO::PARAM_STR);
        $statement->bindValue(":endDate", $endDate, PDO::PARAM_STR);
		$statement->execute();

		//Fetch all of the results.
		$result = $statement->fetchAll(PDO::FETCH_ASSOC);

		// sort result by date
		$conn = null;
		return $result;
    }

    function getMainEx(){
        $conn = pdo_connect();
        $sql = '    SELECT      EXHIBITION.Title, StartDate, EndDate, ExhibitionID, ArtworkReferenceNo, MainArtworkReferenceNo,
                                BodyContent, ShowArtists, GalleryReferenceNo, Link, Rank, Slider, ImgFilePath
                    FROM        EXHIBITION
                    LEFT JOIN   ARTWORK ON ARTWORK.ArtworkID = EXHIBITION.MainArtworkReferenceNo
                    WHERE       EXHIBITION.Publish = "1"
                    AND         ExhibitionID = "46"';
        $statement = $conn->prepare($sql);
        $statement->execute();
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        $conn = null;
        return $result;
    }

    function getEx($case){

        $sql = '    SELECT      EXHIBITION.Title as ExTitle, EXHIBITION.StartDate as ExStartDate, EXHIBITION.EndDate as ExEndDate, EXHIBITION.ExhibitionID, ArtworkReferenceNo, MainArtworkReferenceNo,
                                BodyContent, ShowArtists, GalleryReferenceNo, EXHIBITION.Link as ExLink, Rank, Slider, ARTWORK.ImgFilePath as ExImgFilePath
                    FROM        EXHIBITION
                    LEFT JOIN   EXHIBITION_ARTWORKS ON EXHIBITION_ARTWORKS.ExhibitionID = EXHIBITION.ExhibitionID
                    LEFT JOIN   ARTWORK ON ARTWORK.ArtworkID = EXHIBITION_ARTWORKS.ArtworkID
                    WHERE       EXHIBITION.Publish = "1"';

        switch($case) {

          case "current":
            $and = '    AND     :date BETWEEN EXHIBITION.StartDate AND EndDate ORDER BY Rank';
            break;

          case "upcoming":
            $and = '    AND     EXHIBITION.StartDate > :date ORDER BY EXHIBITION.StartDate';
            break;

          case "previous":
            $and = '    AND     EXHIBITION.EndDate < :date ORDER BY EXHIBITION.EndDate DESC';
            break;

          default:
            $and = '    AND     :date BETWEEN EXHIBITION.StartDate AND EXHIBITION.EndDate ORDER BY Rank';
        }

        // today's date
        $date = date("Y-m-d");
        $conn = pdo_connect();
        $statement = $conn->prepare($sql . $and);
        $statement->bindValue(":date", $date, PDO::PARAM_STR);
        $statement->execute();
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        $conn = null;
        return $result;
    }

?>
