<?php
if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $text = $_POST['text'];

    $to = 'harinimaruthasalam@gmail.com';
    $message = "Name: " . $name . "\n" . "Email: " . $email . "\n" . "Subject: " . $subject . "\n" . "Message: " . $text;
    $headers = "From: " . $email;

    if (mail($to, $subject, $message, $headers)) {
        echo "<script>alert('Your message has been sent successfully!');</script>";
    } else {
        echo "<script>alert('Your message could not be sent. Please try again later.');</script>";
    }
}
?>
