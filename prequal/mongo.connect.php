<?php
$host   = $_ENV["OPENSHIFT_MONGODB_DB_HOST"];
$user   = $_ENV["OPENSHIFT_MONGODB_DB_USERNAME"];
$passwd = $_ENV["OPENSHIFT_MONGODB_DB_PASSWORD"];
$port   = $_ENV["OPENSHIFT_MONGODB_DB_PORT"];
$uri = "mongodb://" . $user . ":" . $passwd . "@" . $host . ":" . $port;
$m = new Mongo($uri);
$db = $m->production;
$collectionACI = $db->prequal;
?>
