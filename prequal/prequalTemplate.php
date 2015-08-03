<?php
$emailTemplate = '
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Test</title>
		
    <style type="text/css">
		#outlook a{
			padding:0;
		}
		.ReadMsgBody{
			width:100%;
		}
		.ExternalClass{
			width:100%;
		}
		.yshortcuts,a .yshortcuts,a .yshortcuts:hover,a .yshortcuts:active,a .yshortcuts:focus{
			background-color:transparent !important;
			border:none !important;
			color:inherit !important;
		}
		body{
			margin:0;
			padding:0;
		}
		img{
			border:0;
			height:auto;
			line-height:100%;
			outline:none;
			text-decoration:none;
		}
		table,td{
			border-collapse:collapse !important;
			mso-table-lspace:0pt;
			mso-table-rspace:0pt;
		}
		#bodyTable,#bodyCell{
			height:100% !important;
			margin:0;
			padding:0;
			width:100% !important;
		}
		#bodyCell{
			padding:20px;
		}
		.templateContainer{
			width:600px;
		}
		h1{
			color:#202020;
			display:block;
			font-family:Helvetica;
			font-size:26px;
			font-style:normal;
			font-weight:bold;
			line-height:100%;
			letter-spacing:normal;
			margin-top:0;
			margin-right:0;
			margin-bottom:10px;
			margin-left:0;
			text-align:left;
		}
		h2{
			color:#404040;
			display:block;
			font-family:Helvetica;
			font-size:20px;
			font-style:normal;
			font-weight:bold;
			line-height:100%;
			letter-spacing:normal;
			margin-top:0;
			margin-right:0;
			margin-bottom:10px;
			margin-left:0;
			text-align:left;
		}
		h3{
			color:#606060;
			display:block;
			font-family:Helvetica;
			font-size:16px;
			font-style:normal;
			font-weight:bold;
			line-height:100%;
			letter-spacing:normal;
			margin-top:0;
			margin-right:0;
			margin-bottom:10px;
			margin-left:0;
			text-align:left;
		}
		h4{
			color:#808080;
			display:block;
			font-family:Helvetica;
			font-size:12px;
			font-style:normal;
			font-weight:bold;
			line-height:100%;
			letter-spacing:normal;
			margin-top:0;
			margin-right:0;
			margin-bottom:10px;
			margin-left:0;
			text-align:left;
		}
		#templatePreheader{
			background-color:#007DC3;
			border-top:0px solid #007DC3;
			border-bottom:0px none #007DC3;
		}
		.preheaderContent{
			color:#FFFFFF;
			font-family:Helvetica;
			font-size:10px;
			line-height:125%;
			padding-top:10px;
			padding-bottom:10px;
			text-align:left;
		}
		.preheaderContent a:link,.preheaderContent a:visited,.preheaderContent a .yshortcuts {
			color:#FFFFFF;
			font-weight:normal;
			text-decoration:underline;
		}
		#templateHeader{
			background-color:#FFFFFF;
			border-top:10px solid #007DC3;
			border-bottom:0;
		}
		.headerContent{
			color:#202020;
			font-family:Helvetica;
			font-size:20px;
			font-weight:bold;
			line-height:100%;
			padding-top:40px;
			padding-right:0;
			padding-bottom:20px;
			padding-left:0;
			text-align:left;
			vertical-align:middle;
		}
		.headerContent a:link,.headerContent a:visited,.headerContent a .yshortcuts {
			color:#990000;
			font-weight:normal;
			text-decoration:underline;
		}
		.templateBodyContainer{
			width:400px;
		}
		#templateBody{
			background-color:#FFFFFF;
			border-top:0;
			border-bottom:0;
		}
		.titleContentBlock{
			background-color:#990000;
			border-top:1px solid #990000;
			border-bottom:1px solid #B14031;
		}
		.titleContent{
			color:#FFFFFF;
			font-family:Helvetica;
			font-size:24px;
			font-weight:bold;
			line-height:150%;
			padding-top:5px;
			padding-bottom:5px;
			text-align:left;
		}
		.bodyContentBlock{
			background-color:#FFFFFF;
			border-top:0;
			border-bottom:1px solid #E5E5E5;
		}
		.bodyContent{
			color:#505050;
			font-family:Helvetica;
			font-size:16px;
			line-height:150%;
			padding-top:20px;
			padding-bottom:20px;
			text-align:left;
		}
		.bodyContent a:link,.bodyContent a:visited,.bodyContent a .yshortcuts {
			color:#990000;
			font-weight:normal;
			text-decoration:underline;
		}
		.templateButton{
			-moz-border-radius:5px;
			-webkit-border-radius:5px;
			background-color:#4CB2CB;
			border:0;
			border-radius:5px;
		}
		.templateButtonContent,.templateButtonContent a:link,.templateButtonContent a:visited,.templateButtonContent a .yshortcuts {
			color:#FFFFFF;
			font-family:Helvetica;
			font-size:15px;
			font-weight:bold;
			letter-spacing:-.5px;
			line-height:100%;
			text-align:center;
			text-decoration:none;
		}
		.bodyContent img{
			display:inline;
			height:auto;
			max-width:380px;
		}
		.templateSidebarContainer{
			width:180px;
		}
		.sidebarTitleContentBlock{
			background-color:#007dc3;
			border-top:1px solid #007dc3;
			border-bottom:1px solid #007dc3;
		}
		.sidebarTitleContent{
			color:#FFFFFF;
			font-family:Helvetica;
			font-size:24px;
			font-weight:bold;
			line-height:150%;
			padding-top:5px;
			padding-bottom:5px;
			text-align:left;
		}
		.sidebarContentBlock{
			background-color:#FFFFFF;
			border-top:0;
			border-bottom:1px solid #E5E5E5;
		}
		.sidebarContent{
			color:#505050;
			font-family:Helvetica;
			font-size:14px;
			line-height:125%;
			padding-top:20px;
			padding-bottom:20px;
			text-align:left;
		}
		.sidebarContent a:link,.sidebarContent a:visited,.sidebarContent a .yshortcuts {
			color:#007dc3;
			font-weight:normal;
			text-decoration:underline;
		}
		.sidebarContent img{
			display:inline;
			height:auto;
			max-width:160px;
		}
		body,#bodyTable{
			background-color:#202020;
		}
		#templateFooter{
			border-top:0;
		}
		.footerContent{
			color:#808080;
			font-family:Helvetica;
			font-size:10px;
			line-height:150%;
			padding-top:20px;
			text-align:left;
		}
		.footerContent a:link,.footerContent a:visited,.footerContent a .yshortcuts {
			color:#606060;
			font-weight:normal;
			text-decoration:underline;
		}
		.footerContent img{
			display:inline;
			max-width:600px;
		}
	@media only screen and (max-width: 480px){
		body,table,td,p,a,li,blockquote{
			-webkit-text-size-adjust:none !important;
		}

}	@media only screen and (max-width: 480px){
		body{
			width:auto !important;
		}

}	@media only screen and (max-width: 480px){
		table[class=templateBodyContainer]{
			width:100% !important;
		}

}	@media only screen and (max-width: 480px){
		table[class=templateSidebarContainer]{
			width:100% !important;
		}

}	@media only screen and (max-width: 480px){
		table[class=templateContainer]{
			max-width:600px !important;
			width:100% !important;
		}

}	@media only screen and (max-width: 480px){
		h1{
			font-size:24px !important;
			line-height:100% !important;
		}

}	@media only screen and (max-width: 480px){
		h2{
			font-size:20px !important;
			line-height:100% !important;
		}

}	@media only screen and (max-width: 480px){
		h3{
			font-size:18px !important;
			line-height:100% !important;
		}

}	@media only screen and (max-width: 480px){
		h4{
			font-size:16px !important;
			line-height:100% !important;
		}

}	@media only screen and (max-width: 480px){
		table[id=templatePreheader]{
			display:none !important;
		}

}	@media only screen and (max-width: 480px){
		img[id=headerImage]{
			height:auto !important;
			max-width:233px !important;
			width:100% !important;
		}

}	@media only screen and (max-width: 480px){
		td[class=headerContent]{
			font-size:20px !important;
			line-height:150% !important;
			padding-top:40px !important;
			padding-right:10px !important;
			padding-bottom:20px !important;
			padding-left:10px !important;
		}

}	@media only screen and (max-width: 480px){
		td[class=titleContent]{
			font-size:20px !important;
			line-height:125% !important;
			padding-right:10px;
			padding-left:10px;
		}

}	@media only screen and (max-width: 480px){
		img[class=bodyImage]{
			height:auto !important;
			max-width:380px !important;
			width:100% !important;
		}

}	@media only screen and (max-width: 480px){
		td[class=bodyContent]{
			font-size:18px !important;
			line-height:125% !important;
			padding-right:10px;
			padding-left:10px;
		}

}	@media only screen and (max-width: 480px){
		td[class=footerContent]{
			font-size:14px !important;
			line-height:150% !important;
			padding-right:10px;
			padding-left:10px;
		}

}	@media only screen and (max-width: 480px){
		td[class=footerContent] a{
			display:block !important;
		}

}		.headerContent a:link,.headerContent a:visited,.headerContent a .yshortcuts{
			color:#007DC3;
		}
		.bodyContent a:link,.bodyContent a:visited,.bodyContent a .yshortcuts{
			color:#990000;
		}
</style></head>
    <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="margin: 0;padding: 0;background-color: #202020;">
    	<center>
        	<table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;margin: 0;padding: 0;background-color: #202020;border-collapse: collapse !important;height: 100% !important;width: 100% !important;">
            	<tr>
                	<td align="center" valign="top" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;">
                    	<table border="0" cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;">
                        	<tr>
                            	<td align="center" valign="top" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templatePreheader" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;background-color: #007DC3;border-top: 0px solid #007DC3;border-bottom: 0px none #007DC3;border-collapse: collapse !important;">
                                        <tr>
                                            <td align="center" valign="top" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;">
                                                <table border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;width: 600px;border-collapse: collapse !important;">
                                                    <tr>
                                                        <td valign="top" class="preheaderContent" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;color: #FFFFFF;font-family: Helvetica;font-size: 10px;line-height: 125%;padding-top: 10px;padding-bottom: 10px;text-align: left;border-collapse: collapse !important;">
                                                           Thank you '.$fname.' '.$lname.'!  You have been successfully prequalified. 
                                                        </td>
                                                        <!-- 
                                                        <td valign="top" class="preheaderContent" style="padding-left: 20px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;color: #FFFFFF;font-family: Helvetica;font-size: 10px;line-height: 125%;padding-top: 10px;padding-bottom: 10px;text-align: left;border-collapse: collapse !important;" width="200">
                                                          
                                                            Email not displaying correctly?<br><a href="http://us6.campaign-archive1.com/?u=b798ca4dfe1e3be774f14df02&id=72656e001f&e=" target="_blank" style="color: #FFFFFF;font-weight: normal;text-decoration: underline;">View it in your browser</a>.
                                                        </td>
                                                        
 -->
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" valign="top" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateHeader" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;background-color: #FFFFFF;border-top: 10px solid #007DC3;border-bottom: 0;border-collapse: collapse !important;">
                                        <tr>
                                            <td align="center" valign="top" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;">
                                                <table border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;width: 600px;border-collapse: collapse !important;">
                                                    <tr>
                                                        <td class="headerContent" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;color: #202020;font-family: Helvetica;font-size: 20px;font-weight: bold;line-height: 100%;padding-top: 40px;padding-right: 0;padding-bottom: 20px;padding-left: 0;text-align: left;vertical-align: middle;border-collapse: collapse !important;">
                                                            <div style="text-align: left;"><a href="https://retrotax-aci.com?utm_source=RetroTax+List&utm_campaign=72656e001f-Test_Share_Campaign3_1_2013&utm_medium=email" target="_blank" style="color: #007DC3;font-weight: normal;text-decoration: underline;"><img src="http://gallery.mailchimp.com/b798ca4dfe1e3be774f14df02/images/logo_RetroTax_White.png" alt="RetroTax" border="0" style="border: px none;border-color: ;border-style: none;border-width: px;height: 72px;width: 300px;margin: 0;padding: 0;max-width: 600px;line-height: 100%;outline: none;text-decoration: none;" width="300" height="72" id="headerImage"></a></div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                 </td>
                            </tr>
                            <tr>
                            	<td align="center" valign="top" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;">
                                	<table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateBody" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;background-color: #FFFFFF;border-top: 0;border-bottom: 0;border-collapse: collapse !important;">
                                    	<tr>
                                        	<td align="center" valign="top" style="padding-top: 20px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;">
                                            	<table border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;width: 600px;border-collapse: collapse !important;">
                                                	<tr>
                                                    	<td align="left" valign="top" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;">
                                                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="templateBodyContainer" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;width: 400px;border-collapse: collapse !important;">
                                                                <tr mc:repeatable="repeat_1" mc:repeatindex="0" mc:hideable="hideable_repeat_1_1" mchideable="hideable_repeat_1_1">
                                                                	<td align="left" valign="top" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;">
                                                                    	<table border="0" cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;">
                                                                        	<tr>
                                                                                <td align="center" valign="top" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;">
                                                                                    <table border="0" cellpadding="10" cellspacing="0" width="100%" class="titleContentBlock" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;background-color: #990000;border-top: 1px solid #990000;border-bottom: 1px solid #B14031;border-collapse: collapse !important;">
                                                                                        <tr>
                                                                                            <td valign="top" class="titleContent" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;color: #FFFFFF;font-family: Helvetica;font-size: 24px;font-weight: bold;line-height: 150%;padding-top: 5px;padding-bottom: 5px;text-align: left;border-collapse: collapse !important;">Work Opportunity Tax Credit<br>
</td>
                                                                                        </tr>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="center" valign="top" style="padding-bottom: 40px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;">
                                                                                    <table border="0" cellpadding="10" cellspacing="0" width="100%" class="bodyContentBlock" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;background-color: #FFFFFF;border-top: 0;border-bottom: 1px solid #E5E5E5;border-collapse: collapse !important;">
                                                                                        <tr>
                                                                                            <td class="bodyContent" style="padding-bottom: 20px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;color: #505050;font-family: Helvetica;font-size: 16px;line-height: 150%;padding-top: 20px;text-align: left;border-collapse: collapse !important;">
                                                                                                '.$emailMap.'
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td valign="top" class="bodyContent" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;color: #505050;font-family: Helvetica;font-size: 16px;line-height: 150%;padding-top: 20px;padding-bottom: 20px;text-align: left;border-collapse: collapse !important;">
                                                                                                <strong>Success!</strong> - An employer that hires you may be eligible for a federal tax credit.  So, why is that good news for you?  Simple.  This gives employers more incentive to hire you over other applicants, which makes you a more competitive applicant. We have attached a pre-qualification letter for you to give to your future employer.  This PDF provides additional details, including contact information on how to take advantage of these programs.  
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr mc:hideable="hideable_repeat_1_2" mchideable="hideable_repeat_1_2">
                                                                                            <td align="left" valign="top" style="padding-bottom: 40px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;">
                                                                                                <table border="0" cellpadding="15" cellspacing="0" class="templateButton" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;-moz-border-radius: 5px;-webkit-border-radius: 5px;background-color: #007dc3;border: 0;border-radius: 5px;border-collapse: collapse !important;">
                                                                                                    <tr>
                                                                                                        <td align="center" valign="middle" class="templateButtonContent" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;color: #FFFFFF;font-family: Helvetica;font-size: 15px;font-weight: bold;letter-spacing: -.5px;line-height: 100%;text-align: center;text-decoration: none;border-collapse: collapse !important;">Please See the Enclosed PDF</td>
                                                                                                    </tr>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            <table align="right" border="0" cellpadding="0" cellspacing="0" class="templateSidebarContainer" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;width: 180px;border-collapse: collapse !important;">
                                                                <tr mc:repeatable="repeat_2" mc:repeatindex="0" mc:hideable="hideable_repeat_2_1" mchideable="hideable_repeat_2_1">
                                                                    <td align="center" valign="top" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;">
                                                                    	<table border="0" cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;">
                                                                            <tr>
                                                                                <td align="center" valign="top" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;">
                                                                                    <table border="0" cellpadding="10" cellspacing="0" width="100%" class="sidebarTitleContentBlock" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;background-color: #007DC3;border-top: 1px solid #007DC3;border-bottom: 1px solid #007DC3;border-collapse: collapse !important;">
                                                                                        <tr>
                                                                                            <td valign="top" class="sidebarTitleContent" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;color: #FFFFFF;font-family: Helvetica;font-size: 24px;font-weight: bold;line-height: 150%;padding-top: 5px;padding-bottom: 5px;text-align: left;border-collapse: collapse !important;">More Info</td>
                                                                                        </tr>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="center" valign="top" style="padding-bottom: 40px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;">
                                                                                    <table border="0" cellpadding="10" cellspacing="0" width="100%" class="sidebarContentBlock" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;background-color: #FFFFFF;border-top: 0;border-bottom: 1px solid #E5E5E5;border-collapse: collapse !important;">
                                                                                        <tr>
                                                                                            <td valign="top" class="sidebarContent" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;color: #505050;font-family: Helvetica;font-size: 14px;line-height: 125%;padding-top: 20px;padding-bottom: 20px;text-align: left;border-collapse: collapse !important;"><h2 style="color: #404040;display: block;font-family: Helvetica;font-size: 20px;font-style: normal;font-weight: bold;line-height: 100%;letter-spacing: normal;margin-top: 0;margin-right: 0;margin-bottom: 10px;margin-left: 0;text-align: left;">
	Share the News</h2>
'.$shareSidebar.'
       <br></td></tr>
                                                                                         <tr>
                                                                                            <td valign="top" class="sidebarContent" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;color: #505050;font-family: Helvetica;font-size: 14px;line-height: 125%;padding-top: 20px;padding-bottom: 20px;text-align: left;border-collapse: collapse !important;"><h2 style="color: #404040;display: block;font-family: Helvetica;font-size: 20px;font-style: normal;font-weight: bold;line-height: 100%;letter-spacing: normal;margin-top: 0;margin-right: 0;margin-bottom: 10px;margin-left: 0;text-align: left;">
	Government Documentation, Resources</h2>
For additional information on us, you can visit the <a href="https://www.retrotax-aci.com" target="_blank"> Retrotax</a> Website or email us at question@retrotax-aci.com.  You can also find information about '.$org.' <a href="'.$site.'" target="_blank">here</a>.  Official documentation can be found at the <a href="https://www.irs.gov" target="_blank">IRS Website</a>.</td>
                                                                                        </tr>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                            	<td align="center" valign="top" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;">
                                	<table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateFooter" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-top: 0;border-collapse: collapse !important;">
                                    	<tr>
                                        	<td align="center" valign="top" style="padding-bottom: 40px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: collapse !important;">
                                            	<table border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;width: 600px;border-collapse: collapse !important;">
                                                	<tr>
                                                    	<td valign="top" class="footerContent" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;color: #808080;font-family: Helvetica;font-size: 10px;line-height: 150%;padding-top: 20px;text-align: left;border-collapse: collapse !important;"></td>
                                                    </tr>
                                                	<tr>
                                                    	<td valign="top" class="footerContent" style="mso-table-lspace: 0pt;mso-table-rspace: 0pt;color: #808080;font-family: Helvetica;font-size: 10px;line-height: 150%;padding-top: 20px;text-align: left;border-collapse: collapse !important;">
                                                            <em>Copyright &copy; 2013 RetroTax, All rights reserved.</em>
                                                            <br>
                                                            <br>
                                                            <strong>Our Contact Information:</strong>
                                                            <br>
                                                            Office: 800-925-0557 | Office: 317-925-0553 | Fax: 317-925-9152 |
                                                            <br>
                                                            <br>
                                                            <strong>Our Mailing Address is:</strong>
                                                            <br>
                                                            <div class="vcard"><span class="org fn">Associated Consultants Inc. dba RetroTax</span><div class="adr"><div class="street-address">3730 Washington Blvd, Indianapolis, IN</div><span class="locality">Indianapolis</span>, <span class="region">IN</span>  <span class="postal-code">46205</span></div><br>
                                                          
                                                            </div> 
                                                             Any tax advice contained in this communication (including any attachments, enclosures or other accompanying materials) was not intended or written to be used, and it cannot be used, by any taxpayer for the purpose of (1) avoiding tax related penalties under the U.S. Internal Revenue code and regulations; or for (2) the promotion, marketing or recommending to another party any transaction or matter addressed herein.
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                    <td>
                                                  

                                                    </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </center>
    </body>
</html>
';
?>
