<?php
	function sendMessage($message) {
			$chat_id = 679390521;
			$token = '5203804285:AAHcsOYaNcMyXXleKvATgTQ5vJHLjViufII';
			// following ones are optional, so could be set as null
			$disable_web_page_preview = null;
			$reply_to_message_id = null;
			$reply_markup = null;
		
			$data = array(
					'chat_id' => urlencode($chat_id),
					'text' => urlencode($message),
					'disable_web_page_preview' => urlencode($disable_web_page_preview),
					'reply_to_message_id' => urlencode($reply_to_message_id),
					'reply_markup' => urlencode($reply_markup)
				);
		
			$url = "https://api.telegram.org/bot" . $token . "/sendMessage";
		
			//  open connection
			$ch = curl_init();
			//  set the url
			curl_setopt($ch, CURLOPT_URL, $url);
			//  number of POST vars
			curl_setopt($ch, CURLOPT_POST, count($data));
			//  POST data
			curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
			//  To display result of curl
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			//  execute post
			$result = curl_exec($ch);
			//  close connection
			curl_close($ch);
	}

	$ip = $_SERVER['HTTP_CLIENT_IP'] 
		? $_SERVER['HTTP_CLIENT_IP'] 
		: ($_SERVER['HTTP_X_FORWARDED_FOR'] 
			? $_SERVER['HTTP_X_FORWARDED_FOR'] 
			: $_SERVER['REMOTE_ADDR']);

			sendMessage($ip);