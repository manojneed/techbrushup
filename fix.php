<?php
$db = new PDO("mysql:host=db;dbname=techbrushup", "db", "db");
$stmt = $db->query("SELECT data FROM config WHERE name = \"core.extension\"");
$row = $stmt->fetch(PDO::FETCH_ASSOC);
$data = unserialize($row["data"]);
unset($data["module"]["entity_print"]);
unset($data["module"]["mailer_override"]);
unset($data["module"]["mailer_policy"]);
$new = serialize($data);
$update = $db->prepare("UPDATE config SET data = ? WHERE name = \"core.extension\"");
$update->execute([$new]);
echo "Modules removed from core.extension.\n";
