const alert = (msg, loc=null) => {
	var html = `<script>alert('${msg}');`;
	if(loc) html += `location.href='${loc}'`;
	html += `</script>`;
}

module.exports = {alert};