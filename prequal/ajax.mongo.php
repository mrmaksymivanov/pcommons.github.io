<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

//require "mongo.connect.php";
require 'plugins/PHPMailer-master/class.phpmailer.php';
//require_once "register.class.mongo.php";
require_once('plugins/tcpdf/config/lang/eng.php');
require_once('plugins/tcpdf/tcpdf.php');
//require_once("plugins/qr/qrlib.php");

$obj=json_decode($HTTP_RAW_POST_DATA,true);
$employee = $obj['employee'];
$prequalConfig = $obj['prequalConfig'];

$email = (string)$prequalConfig['email_to'];
$emailCC = (string)$prequalConfig['email_cc'];
$emailBCC = (string)$prequalConfig['email_bcc'];
$alliance = (string)$prequalConfig['alliance'];
$closing = (string)$prequalConfig['closing_text'];  
$partner = (string)$prequalConfig['partner_name'];  
$org = (string)$prequalConfig['partner_organization'];  
$site   = (string)$prequalConfig['partner_website']; 
$retrotax_contact = (string)$prequalConfig['retrotax_contact'];
$fname = ucfirst(trim($employee['rows'][0]['maindata']['firstname']));
$lname = ucfirst(trim($employee['rows'][0]['maindata']['lastname']));

$logoACI = 'img/aci.png';
$googleMap    = '';
$emailMap     = '';
$mapSection = '';
$shareSidebar = 'Let your friends, family, & colleagues know by forwarding this email.';
$amt="A";
$logo    = "img/mw.jpg";
$size    = 'width="600" height="150"';                  
$intro   = "";
$aln   = '';
$extra   = '';                   
$isPCG=false;

try {
    
    switch ('register') {
        
        case 'register':
        
        	$mail = new PHPMailer;
        				
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
            }
            include "prequalTemplate.php";           
            //Register::signUp($email, $obj, $fname, $lname, $alliance);
            //Register::writeQR($email);
            //Register::writePDF($closing, $logo, $intro, $partner, $aln, $amt, $email, $fname, $lname, $alliance, $mapSection, $extra, $logoACI, $isPCG, $size);
            //Register::prequalEmail($email, $amt, $fname, $lname, $emailTemplate);


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
                </table>    
                <h2><span style="text-align:center;">Notice of Employer Tax Credit Pre-Qualification</span></h2>
                <br>
                <p>To Whom It May Concern:
                <br></p>
                <p><span style="text-align:justify;">' . $intro . '' . $fname . '  ' . $lname . ' has been pre-qualified by our
                partner <a href="http://retrotax-aci.com">RetroTax</a>&#174; as potentially eligible for the Work Opportunity Tax
                Credit. An employer that hires  ' . $fname . '  ' . $lname . '  could be eligible for a<b> ' . $amt . ' </b>Federal
                Tax Credit.  In addition, ' . $fname . '  ' . $lname . '\'s state of residence may offer a State Tax Incentive for hiring certain individuals. '.$extra.'</span>
                        </p><br>    
                ' . $mapSection . '
                <br><br>
                <p><span style="text-align:justify;">Please contact <a href="http://retrotax-aci.com">RetroTax</a>&#174; and reference this document for more information as to how your organization can take advantage of these valuable employer incentives.</span><br></p>
                <p>
                RetroTax&#174;<br>
                Attn: '.$retrotax_contact.'<br>
                3730 Washington Blvd<br>
                Indianapolis, IN 46205<br>
                312-646-7386<br>
                <a>john.hess@retrotax-aci.com</a><br>
                </p>
                <p>' . $closing . '</p><br>
                <table cellspacing="0" cellpadding="0" border="0" >
                    <tr>
                        <td align="left"><p>Sincerely,</p><p>' . $partner . '</p></td>
                    </tr>
                </table>
                ';
                $pdf->writeHTML($html, true, false, true, false, '');


			$mail->isSMTP();                                      
			$mail->Host = 'smtp.gmail.com';  					
			$mail->SMTPAuth = true;                                                         
			$mail->SMTPSecure = 'tls'; // Enable encryption, 'ssl' also accepted
			$mail->From = 'admin@retrotax-aci.com';
			$mail->FromName = 'RetroTax';
			$mail->addReplyTo('john.hess@retrotax-aci.com', 'PreQual');				
			$mail->addAddress('paul.commons@retrotax-aci.com');  
		    $file = $fname.'-'.$lname.'-Employer-Tax-Credit-Pre-Qualification.pdf';
			$mail->addAttachment($file);             			           
			//$mail->addCC('paul.commons@retrotax-aci.com');
			//$mail->addCC('john.hess@retrotax-aci.com');    
			$mail->isHTML(true);
			$mail->Subject = "RetroTax Pre-Qualification for " . $amt . " Employer Tax Credit";
			$mail->Body    = $emailTemplate;          
			//$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
			if(!$mail->send()) {
			    echo 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo;
			}else{
				echo '1';
			}
            break;
    }
    
}
catch (Exception $e) {
    echo $e->getMessage();
    die("0");
}
?>
