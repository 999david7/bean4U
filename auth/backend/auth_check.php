<?php
/**
 * auth_check.php
 * Schützt Seiten: wenn nicht eingeloggt -> login.html
 */

declare(strict_types=1);

require __DIR__ . "/config.php";

if (!isset($_SESSION["user"])) {
    header("Location: login.html");
    exit;
}
