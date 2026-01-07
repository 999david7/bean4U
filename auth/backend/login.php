<?php
/**
 * login.php
 * Loggt User ein und leitet auf index.html weiter.
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
    header("Location: login.html?err=missing");
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header("Location: login.html?err=email");
    exit;
}

$query = "?select=id,email,full_name,role,password&email=eq." .
    rawurlencode($email) . "&limit=1";

$res = supabase_request(USERS_TABLE, "GET", null, $query);

if (!$res["ok"]) {
    header("Location: login.html?err=supabase&code=" . $res["status"]);
    exit;
}

if (!is_array($res["data"]) || empty($res["data"][0]["password"])) {
    header("Location: login.html?err=notfound");
    exit;
}

$user = $res["data"][0];

if (!password_verify($password, (string) $user["password"])) {
    header("Location: login.html?err=wrongpw");
    exit;
}

session_regenerate_id(true);

$_SESSION["user"] = [
    "id" => $user["id"],
    "email" => $user["email"] ?? $email,
    "name" => $user["full_name"] ?? "",
    "role" => $user["role"] ?? "User"
];

header("Location: index.html");
exit;
