<?php

namespace App\Controllers;

class Masjid extends BaseController
{
	public function index()
	{

		$data = [
			'title' => 'Jam Digital Fadhil',
		];

	  return view('pages/index', $data);
	}

	function jadwalSholat() {
		$jadwalSolat = json_decode(file_get_contents("http://muslimsalat.com/surabaya" . ".json?key=f9fa86bd8bfe28c48e7b57c13537fe52"), TRUE);

		$solat = [
			['shubuh', $jadwalSolat['items'][0]['fajr']],
			['dzuhur', $jadwalSolat['items'][0]['dhuhr']],
			['ashar', $jadwalSolat['items'][0]['asr']],
			['maghrib', $jadwalSolat['items'][0]['maghrib']],
			['isya', $jadwalSolat['items'][0]['isha']],
		];

		return json_encode($solat);
	}
}
