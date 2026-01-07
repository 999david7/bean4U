<?php
/**
 * auth_check.php
 * Schützt Seiten: leitet auf login.html um, wenn nicht eingeloggt.
 */

declare(strict_types=1);

require __DIR__ . "/config.php";

if (!isset($_SESSION["user"])) {
    header("Location: login.html");
    exit;
}
