const hariarray = [
	"Minggu,",
	"Senin,",
	"Selasa,",
	"Rabu,",
	"Kamis,",
	"Jum'at,",
	"Sabtu,"
]
const bulanarray = [
	"Januari",
	"Februari",
	"Maret",
	"April",
	"Mei",
	"Juni",
	"Juli",
	"Agustus",
	"September",
	"Oktober",
	"Nopember",
	"Desember"
]
const bulanhijri = [
	'Muharram',
	'Safar', 
	'Rabi\'ul Awal',
	'Rabi\'ul Akhir',
	'Jumadil Awal',
	'Jumadil Akhir',
	'Rajab',
	'Syaban',
	'Ramadan',
	'Syawal',
	'Dzulqaidah',
	'Dzulhijah'
]
var tgl_sekarang = ''
var jadwalSholat = []

function set_tgl() {
	const tgl_hijri = new HijriDate()
	var tw = new Date();
	if (tw.getTimezoneOffset() == 0)(a = tw.getTime() + (7 * 60 * 60 * 1000))
	else(a = tw.getTime());
	tw.setTime(a);

	var tahun = tw.getFullYear();
	var hari = tw.getDay();
	var bulan = tw.getMonth();
	var tanggal = tw.getDate();


	$('#hari').html(hariarray[hari])
	$('#tgl_masehi').html(`${tanggal} ${bulanarray[bulan]} ${tahun} M`)
	$('#tgl_hijriah').html(`${tgl_hijri._date} ${bulanhijri[tgl_hijri._month-1]} ${tgl_hijri._year} H`)
	$('#jam').html(`${('0'+tgl_hijri._hours).slice(-2)}:${('0'+tgl_hijri._minutes).slice(-2)}:${('0'+tgl_hijri._seconds).slice(-2)}`)
	setTimeout(set_tgl, 1000)

	if (`${tgl_hijri._date}` != tgl_sekarang) {
		tgl_sekarang = tgl_hijri._date
		jadwalSholatHariIni()
	}

	if (jadwalSholat.length == 0) {
		return
	}

	var solat = 0
	var jamMenit = `${('0'+tgl_hijri._hours).slice(-2)}:${('0'+tgl_hijri._minutes).slice(-2)}`
	for (var i = 0; i < jadwalSholat.length; i++) {
  	if (jamMenit < jadwalSholat[i][2]) {
  		solat = i
  		break
  	}
  }
  var jamNya = jadwalSholat[solat][2]
  var jadwalNya = [parseInt(jamNya.substring(0, jamNya.length-3), 10), parseInt(jamNya.substring(3, jamNya.length), 10)]
  var sekarang = [parseInt(jamMenit.substring(0, jamMenit.length-3), 10), parseInt(jamMenit.substring(3, jamMenit.length), 10), tgl_hijri.seconds]
  var kurang = selisihWaktu(jadwalNya, sekarang)
  if (solat == 0) {
  	kurang = selisihWaktu(jadwalNya, sekarang, true)
  }

  $('.solatSelanjutnya').html(`${jadwalSholat[solat][0]} -${kurang}`)
}

const convertTime12to24 = (time12h) => {
  const [time, modifier] = time12h.split(' ');

  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'pm') {
    hours = parseInt(hours, 10) + 12;
  }

  return `${('0'+hours).slice(-2)}:${('0'+minutes).slice(-2)}`
}

function selisihWaktu(dt1, dt2, subuh = false) {
	var date1 = new Date(2000, 0, 1, dt1[0], dt1[1]);
	if (subuh == true) {
		date1 = new Date(2000, 0, 2, dt1[0], dt1[1]);
	}
	const date2 = new Date(2000, 0, 1, dt2[0], dt2[1], dt2[2]);
	const diffTime = Math.abs(date2 - date1);

	return convertMsToHM(diffTime)
}

function convertMsToHM(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  seconds = seconds % 60;
  minutes = seconds >= 30 ? minutes + 1 : minutes;

  minutes = minutes % 60;
  hours = hours % 24;

  return `${('0'+hours).slice(-2)}:${('0'+minutes).slice(-2)}:${('0'+seconds).slice(-2)}`;
}

function jadwalSholatHariIni() {
	$.ajax({
	  url: "/jadwal",
	}).done(function(data) {
		jadwalSholat = JSON.parse(data)
	  var isi = ``
	  for (var i = 0; i < jadwalSholat.length; i++) {
	  	jadwalSholat[i][2] = convertTime12to24(jadwalSholat[i][1])
	  	isi += `
		  	<div class="col">
		  		<div class="card fw-bold">
		  			<div class="card-header text-uppercase">${jadwalSholat[i][0]}</div>
		  			<div class="card-body">
		  				<h5 class="card-title"></h5>
		  				<p class="card-text">${jadwalSholat[i][1]}</p>
		  			</div>
		  		</div>
		  	</div>
		  `
	  }

	  $(`#jadwalSholat`).html(isi)
	});
}

$(document).ready(() => {
	set_tgl()
})