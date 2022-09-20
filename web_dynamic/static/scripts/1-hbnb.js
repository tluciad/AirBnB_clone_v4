// A $( document ).ready() block.
$( document ).ready(function() {
	let checkamenity = {};
	$(document).on('change', "input[type='checkbox']", function () {
		if (this.checked){
			checkamenity[$(this).data('id')] = $(this).data('name');
		} else {
			delete checkamenity[$(this).data('id')];
		}
		let list = Object.values(checkamenity);
		if (list.length > 0){
			$('div.amenities > h4').text(Object.values(checkamenity).join(', '));
		} else {
			$('div.amenities > h4').html('&nbsp;');
		}
	});
});