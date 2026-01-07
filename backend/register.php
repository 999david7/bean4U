<?php
/**
 * register.php
 * Registrierung: hashed Passwort speichern, E-Mail-Format prüfen,
 * Duplikat-Check per Supabase REST.
 */

declare(strict_types=1);

require __DIR__ . "/config.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: register.html");
    exit;
}

$email = trim((string) ($_POST["email"] ?? ""));
$password = (string) ($_POST["password"] ?? "");
$name = trim((string) ($_POST["full_name"] ?? ""));

if ($email === "" || $password === "") {
    echo "<script>alert('❌ Bitte E-Mail und Passwort eingeben.');" .
        "window.location.href='register.html';</script>";
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "<script>alert('❌ Ungültige E-Mail-Adresse.');" .
        "window.location.href='register.html';</script>";
    exit;
}

if (strlen($password) < 8) {
    echo "<script>alert('❌ Passwort muss mindestens 8 Zeichen haben.');" .
        "window.location.href='register.html';</script>";
    exit;
}

$existsQuery = "?select=id&email=eq." . rawurlencode($email) . "&limit=1";
$exists = supabase_request("Users", "GET", null, $existsQuery);

if (isset($exists["error"])) {
    echo "<script>alert('❌ Serverfehler (Supabase).');" .
        "window.location.href='register.html';</script>";
    exit;
}

if (!empty($exists)) {
    echo "<script>alert('❌ E-Mail ist bereits registriert.');" .
        "window.location.href='register.html';</script>";
    exit;
}

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$data = [
    "email" => $email,
    "password" => $hashedPassword,
    "full_name" => $name,
    "role" => "User",
];

$insert = supabase_request("Users", "POST", $data, "?select=id");

if (isset($insert["error"])) {
    echo "<script>alert('❌ Registrierung fehlgeschlagen.');" .
        "window.location.href='register.html';</script>";
    exit;
}

if (!empty($insert) && isset($insert[0]["id"])) {
    echo "<script>alert('✅ Registrierung erfolgreich! Du kannst dich " .
        "jetzt einloggen.'); window.location.href='login.html';</script>";
    exit;
}

echo "<script>alert('❌ Registrierung fehlgeschlagen.');" .
    "window.location.href='register.html';</script>";
