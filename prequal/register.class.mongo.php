<?php
class Register
{
    public $collectionACI;
    private $data;
    public function __construct($par)
    {
        if (is_array($par))
            $this->data = $par;
    }

    public static function sendEmail($from_name, $from_mail, $subject, $message, $mailto, $cc, $type)
    {
        $uid    = md5(uniqid(time()));
        //$header = "From: RetroTax <  ".$from." >\r\n";
        $header  = "From: " . $from_name . " <" . $from_mail . ">\r\n";
        $header = "Cc: <" . $cc . ">\r\n";
        $header .= "MIME-Version: 1.0\r\n";
        if(isset($type)){
        $header .= "Content-Type: multipart/mixed; boundary=\"" . $uid . "\"\r\n\r\n";
        $header .= "This is a multi-part message in MIME format.\r\n";
        $header .= "--" . $uid . "\r\n";
        }
        $header .= "Content-type:text/html; charset=iso-8859-1\r\n";
        $header .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
        $header .= $message . "\r\n\r\n";
        $header .= "--" . $uid . "--";
        if (mail($mailto, $subject, "", $header)) {
        }
    }


    public static function writePDF($closing, $logo, $intro, $partner, $aln, $amt, $email, $fname, $lname, $alliance, $mapSection, $extra, $logoACI, $isPCG, $size)
    {
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
		Attn: John Hess<br>
		3730 Washington Blvd<br>
		Indianapolis, IN 46205<br>
		312-646-7386<br>
		<a>john.hess@retrotax-aci.com</a><br>
		</p>
		<p>' . $closing . '</p><br>
		<table cellspacing="0" cellpadding="0" border="0" >
		    <tr>
			    <td align="left"><p>Sincerely,</p><p>' . $partner . '</p></td>
			    <td align="right"><img src="qr.png" alt="Candidate QR Code" width="75" height="75" border="0" /></td>
		    </tr>
		</table>
		';
        $pdf->writeHTML($html, true, false, true, false, '');
        
        if($isPCG == true){
        // reset pointer to the last page
        $pdf->lastPage();
        $pdf->AddPage();

        $html = '
		<table cellspacing="0" cellpadding="5" border="0" >
		    <tr>
                <td align="right">' . $aln . '<img src="img/aci.png" width="125" height="40" /></td>
		    </tr>
		</table>	
		<h2><span style="text-align:center;">Notice of Employer Tax Credit Pre-Qualification</span></h2>
		<br>
		<p>To Whom It May Concern:
		<br></p>
		<p><span style="text-align:justify;">' . $intro . '' . $fname . '  ' . $lname . ' has been pre-qualified by <a href="http://retrotax-aci.com">RetroTax</a>&#174; as potentially eligible for the Work Opportunity Tax
		Credit. An employer that hires  ' . $fname . '  ' . $lname . '  could be eligible for a<b> ' . $amt . ' </b>Federal
		Tax Credit.  In addition, ' . $fname . '  ' . $lname . '\'s state of residence may offer a State Tax Incentive for hiring certain individuals. '.$extra.'</span>
                </p><br>	
		' . $mapSection . '
		<br><br>
		<p><span style="text-align:justify;">Please contact <a href="http://retrotax-aci.com">RetroTax</a>&#174; and reference this document for more information as to how your organization can take advantage of these valuable employer incentives.</span><br></p>
		<p>
		RetroTax&#174;<br>
		Attn: John Hess<br>
		3730 Washington Blvd<br>
		Indianapolis, IN 46205<br>
		312-646-7386<br>
		<a>john.hess@retrotax-aci.com</a><br>
		</p>
		<p>' . $closing . '</p><br>
		<table cellspacing="0" cellpadding="0" border="0" >
		    <tr>
			    <td align="left"><p>Sincerely,</p><p>RetroTax, LLC</p></td>
			    <td align="right"><img src="qr.png" alt="Candidate QR Code" width="75" height="75" border="0" /></td>
		    </tr>
		</table>
		';
        $pdf->writeHTML($html, true, false, true, false, '');        
        }
        $pdf->Output($fname.'-'.$lname.'-Employer-Tax-Credit-Pre-Qualification.pdf', 'F');
        //$pdf->Output($_ENV["OPENSHIFT_REPO_DIR"].'/'.$fname.'-'.$lname.'-Employer-Tax-Credit-Pre-Qualification.pdf', 'F');
    }
}
?>
