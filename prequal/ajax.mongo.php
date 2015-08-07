<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
ob_clean();
require 'plugins/PHPMailer-master/class.phpmailer.php';
require_once('plugins/tcpdf/config/lang/eng.php');
require_once('plugins/tcpdf/tcpdf.php');
/*
function get_string_between($string, $start, $end){
    $string = " ".$string;
    $ini = strpos($string,$start);
    if ($ini == 0) return "";
    $ini += strlen($start);
    $len = strpos($string,$end,$ini) - $ini;
    return substr($string,$ini,$len);
}
*/
$obj           = json_decode($HTTP_RAW_POST_DATA, true);
$employee      = $obj['employee'];
$prequalConfig = $obj['prequalConfig'];

$email            = (string) $prequalConfig['email_to'];
$emailCC          = (string) $prequalConfig['email_cc'];
$emailBCC         = (string) $prequalConfig['email_bcc'];
$ccArray          = explode(',', $emailCC);
//$bccArray = explode(',',$emailBCC);
$closing          = (string) $prequalConfig['closing_text'];
$partner          = (string) $prequalConfig['partner_name'];
$org              = (string) $prequalConfig['partner_organization'];
$site             = (string) $prequalConfig['partner_website'];
$retrotax_contact = (string) $prequalConfig['retrotax_contact'];
$fname            = ucfirst(trim($employee['rows'][0]['maindata']['firstname']));
$lname            = ucfirst(trim($employee['rows'][0]['maindata']['lastname']));
$logo_width       = (string) $prequalConfig['logo_width'];
$logo_height      = (string) $prequalConfig['logo_height'];
$logo_url         = (string) $prequalConfig['logo_url'];
$googleMap    = '';
$emailMap     = '';
$mapSection   = '';
$shareSidebar = 'Let your friends, family, & colleagues know by forwarding this email. They might be eligible, too.';
//$subdata=$employee['rows'][0]['maindata'];
//foreach($subdata as $qualification){}
//$amt          = get_string_between(trim($employee['rows'][0]['maindata']['qualifications'][1]),"[","]");
$amt="A";

if (!filter_var($logo_url, FILTER_VALIDATE_URL) === false && is_numeric($logo_width) && is_numeric($logo_height)) {
    $partner_logo = '<td align="center"><img src="' . $logo_url . '" width="' . $logo_width . '" height="' . $logo_height . '" /></td>';
} else {
    $partner_logo = '';
}


//var_dump($partner_logo);
$partner_logo = '<td align="center"><img src="' . $logo_url . '" width="' . $logo_width . '" height="' . $logo_height . '" /></td>';
$intro = "";
$extra = '';

$retrotax_contact_name = 'Angie Mackey';
$retrotax_contact_phone= '317-925-0553';
switch ($retrotax_contact) {
    case 'john.hess@retrotax-aci.com':
        $retrotax_contact_name = 'John Hess';
        $retrotax_contact_phone= '312-646-7386';
        break;
    case 'natalie.commons@retrotax-aci.com':
        $retrotax_contact_name = 'Natalie Commons';
        $retrotax_contact_phone= '347.451.0982';
        break;
    case 'alan.newcomb@retrotax-aci.com':
        $retrotax_contact_name = 'Alan Newcomb';
        $retrotax_contact_phone= '317-513-5429';
        break;
}

switch ($amt) {
    case "A":
        $amt = "$2,400";
        break;
    case "B":
        $amt = "$2,400";
        break;
    case "C":
        $amt = "$2,400";
        break;
    case "D":
        $amt = "$2,400";
        break;
    case "E":
        $amt = "$2,400";
        break;
    case "F":
        $amt = "$1,200";
        break;
    case "G":
        $amt = "$2,400";
        break;
    case "H":
        $amt = "$2,400";
        break;
    case "I":
        $amt = "$9,000";
        break;
    case "J":
        $amt = "$4,800";
        break;
    case "T":
        $amt = "$2,400";
        break;
    case "S":
        $amt = "$2,400";
        break;
    case "R":
        $amt = "$5,600";
        break;
    case "W":
        $amt = "$9,600";
        break;
    default:
        $amt = "$2,400";
}

try {
    
    $mail = new PHPMailer;
    
    include "prequalTemplate.php";
    global $l;
    $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
    $pdf->SetCreator(PDF_CREATOR);
    $pdf->SetAuthor('RetroTax');
    $pdf->SetTitle('Employer Tax Credit Pre-Qualification');
    $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
    $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
    $pdf->setLanguageArray($l);
    $pdf->SetFont('helvetica', '', 12);
    $pdf->AddPage();
    $html = '
                <table cellspacing="0" cellpadding="5" border="0" >
                <tr>
                <td align="center"><img src="img/aci.png" width="300" height="72" /></td>
                ' . $partner_logo . '
                </tr>
                </table>    
                <h2><span style="text-align:center;">Notice of Employer Tax Credit Pre-Qualification</span></h2>
                <br>
                <p>To Whom It May Concern:
                <br></p>
                <p><span style="text-align:justify;">' . $intro . '' . $fname . '  ' . $lname . ' has been pre-qualified by our
                partner <a href="http://retrotax-aci.com">RetroTax</a>&#174; as potentially eligible for the Work Opportunity Tax
                Credit. An employer that hires  ' . $fname . '  ' . $lname . '  could be eligible for a<b> ' . $amt . ' </b>Federal
                Tax Credit.  In addition, ' . $fname . '  ' . $lname . '\'s state of residence may offer a State Tax Incentive for hiring certain individuals. ' . $extra . '</span>
                        </p><br>    
                ' . $mapSection . '
                <br><br>
                <p><span style="text-align:justify;">Please contact <a href="http://retrotax-aci.com">RetroTax</a>&#174; and reference this document for more information as to how your organization can take advantage of these valuable employer incentives. Please keep in mind that these programs require timely action on part of the employer in order to capitalize on the available credits- contact RetroTax at or before the time of hiring.</span><br></p>
                <p>
                RetroTax&#174;<br>
                Attn: ' . $retrotax_contact_name . '<br>
                3730 Washington Blvd<br>
                Indianapolis, IN 46205<br>
                ' . $retrotax_contact_phone . '<br>
                <a>' . $retrotax_contact . '</a><br>
                </p>
                <p>' . $closing . '</p><br>
                <table cellspacing="0" cellpadding="0" border="0" >
                    <tr>
                        <td align="left"><p>Sincerely,</p><p>' . $partner . '</p></td>
                    </tr>
                </table>
                ';
    $pdf->writeHTML($html, true, false, true, false, '');
    //ob_clean();
    $pdf->Output($fname . '-' . $lname . '-Employer-Tax-Credit-Pre-Qualification.pdf', 'F');
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'prequalification@retrotax-aci.com';
    $mail->Password   = "C*V=Q8rN!";
    $mail->SMTPSecure = 'tls'; // Enable encryption, 'ssl' also accepted
    $mail->From       = 'prequalification@retrotax-aci.com';
    $mail->FromName   = 'RetroTax';
    $mail->addReplyTo('john.hess@retrotax-aci.com', 'PreQual');
    $mail->addAttachment($fname . '-' . $lname . '-Employer-Tax-Credit-Pre-Qualification.pdf');
    $mail->addAddress($email);
    
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $mail->addAddress($email);
    } else {
        //adding my email as backup if front-end does not validate proper email
        $mail->addAddress('paul.commons@retrotax-aci.com');
    }
    
    if ($ccArray[0] != '') {
        foreach ($ccArray as $cc) {
            if (filter_var($cc, FILTER_VALIDATE_EMAIL)) {
                $mail->addCC($cc);
            }
        }
    }
    /*
    //Throwing 500 error for some reason...  
    if($bccArray[0]!=''){ 
    foreach($bccArray as $bcc){
    if (filter_var($bcc, FILTER_VALIDATE_EMAIL)) {
    $mail->addBCC($bcc);
    }               
    }
    */
    $mail->addBCC('paul.commons@retrotax-aci.com');
    $mail->isHTML(true);
    $mail->Subject = "RetroTax Pre-Qualification for " . $amt . " Employer Tax Credit";
    $mail->Body    = $emailTemplate;
    //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
    if (!$mail->send()) {
        echo 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo;
    } else {
        echo '1';
    }
    
}
catch (Exception $e) {
    echo $e->getMessage();
    die("0");
}
?>