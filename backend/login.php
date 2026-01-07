<?php
/**
 * login.php
 * Login: User per E-Mail laden, Passwort prüfen, Session setzen.
 */

declare(strict_types=1);

require __DIR__ . "/config.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: login.html");
    exit;
}

$email = trim((string) ($_POST["email"] ?? ""));
$password = (string) ($_POST["password"] ?? "");

if ($email === "" || $password === "") {
    echo "<script>alert('❌ Bitte E-Mail und Passwort eingeben.');" .
        "window.location.href='login.html';</script>";
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "<script>alert('❌ Ungültige E-Mail-Adresse.');" .
        "window.location.href='login.html';</script>";
    exit;
}

$query = "?select=id,email,full_name,role,password&email=eq." .
    rawurlencode($email) . "&limit=1";

$response = supabase_request("Users", "GET", null, $query);

if (isset($response["error"])) {
    echo "<script>alert('❌ Serverfehler (Supabase).');" .
        "window.location.href='login.html';</script>";
    exit;
}

if (empty($response) || !isset($response[0]["password"])) {
    echo "<script>alert('❌ Benutzer nicht gefunden.');" .
        "window.location.href='login.html';</script>";
    exit;
}

$user = $response[0];

if (!password_verify($password, (string) $user["password"])) {
    echo "<script>alert('❌ Falsches Passwort.');" .
        "window.location.href='login.html';</script>";
    exit;
}

session_regenerate_id(true);

$_SESSION["user"] = [
    "id" => $user["id"],
    "email" => $user["email"],
    "name" => $user["full_name"] ?? "",
    "role" => $user["role"] ?? "User",
];

header("Location: index.html");
exit;
