<!DOCTYPE html>
<html lang="en">

<head>

	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
	<link rel="stylesheet" href="/css/style.css">
	<title><?= $title; ?></title>
</head>

<body>
	<header>
		<div class="tgl fst-italic">
			<span id="hari"></span><br>
			<span id="tgl_masehi"></span><br>
			<!-- <span>____________________</span><br> -->
			<span id="tgl_hijriah"></span><br>
		</div>
		<div class="masjid text-center">
			<h3>Masjid Al-Irfan
				<br>Malang
			</h3>
			<small>admin@sekolahsabilillah.sch.id</small><br>
			<small>Jl. Terusan Piranha Atas No.135 Malang</small><br>
		</div>
		<div class="jam">
			<span id="jam"></span>
		</div>
	</header>

	<footer>
		<div class="solatSelanjutnya"></div>
		<div class="jadwal" id="jadwalSholat"></div>

		<!-- Text berjalan -->
		<marquee scrollamount="12" style="color: white;">Tetap Putus Asa Dan Jangan Semangat </marquee>
	</footer>
</body>
<!-- tgl hiriah -->
<script src="hijri-date.js" type="text/javascript"></script>

<!-- jquery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

<!-- script  -->
<script type="text/javascript" src="query.js"></script>

</html>