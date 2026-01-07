<?php
/**
 * register.php
 * Registriert User, loggt direkt ein und leitet auf index.html weiter.
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
    header("Location: register.html?err=missing");
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header("Location: register.html?err=email");
    exit;
}

if (strlen($password) < 8) {
    header("Location: register.html?err=pw");
    exit;
}

$existsQuery = "?select=id,email&email=eq." . rawurlencode($email) . "&limit=1";
$exists = supabase_request(USERS_TABLE, "GET", null, $existsQuery);

if (!$exists["ok"]) {
    header("Location: register.html?err=supabase&code=" . $exists["status"]);
    exit;
}

if (is_array($exists["data"]) && count($exists["data"]) > 0) {
    header("Location: register.html?err=taken");
    exit;
}

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$data = [
    "email" => $email,
    "password" => $hashedPassword,
    "full_name" => $name,
    "role" => "User"
];

$insert = supabase_request(USERS_TABLE, "POST", $data, "?select=id,email,full_name,role");

if (!$insert["ok"]) {
    // Häufig: 401/403 wegen RLS/Policies
    header("Location: register.html?err=insert&code=" . $insert["status"]);
    exit;
}

if (!is_array($insert["data"]) || empty($insert["data"][0]["id"])) {
    header("Location: register.html?err=insert_unknown");
    exit;
}

$user = $insert["data"][0];

session_regenerate_id(true);

$_SESSION["user"] = [
    "id" => $user["id"],
    "email" => $user["email"] ?? $email,
    "name" => $user["full_name"] ?? $name,
    "role" => $user["role"] ?? "User",
];

header("Location: index.html");
exit;
