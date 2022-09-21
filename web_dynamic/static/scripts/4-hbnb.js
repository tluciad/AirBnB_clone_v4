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
	$.get('http://localhost:5001/api/v1/status/', function(data, Status){
		if (Status === 'success') {
			if (data.status === 'OK') {
				$('#api_status').addClass('available')
			} else {
				$('#api_status').removeClass('available')
			}
		}
	});
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: 'http://localhost:5001/api/v1/places_search',
		dataType: 'json',
		data: '{}',
		success: function (data) {
			for (let i = 0; i < data.length; i++){
				place = data[i];
				$('.places').append(
					`<article>` +
					`<div class="title_box">` +
					`<h2>${ place.name }</h2>` +
					`<div class="price_by_night">${ place.price_by_night }</div>` +
					`</div>` +
					`<div class="information">` +
					`<div class="max_guest">` + `${ place.max_guest } Guest</div>` +
					`<div class="number_rooms">${ place.number_rooms }` + `Bedroom</div>` +
					`<div class="number_bathrooms">${ place.number_bathrooms } Bathroom</div>` +
					`</div>` +
					`<div class="description">` +
					`${ place.description}` +
					`</div>` +
					`</article>`);
			}
		}
	  });

	  $("button").click(function() {
		$.ajax({
			type: 'POST',
			contentType: 'application/json',
			url: 'http://localhost:5001/api/v1/places_search',
			dataType: 'json',
			data: JSON.stringify({'amenities': Object.keys(checkamenity)}),
			success: function (data) {
				$('.places').empty()
				for (let i = 0; i < data.length; i++){
					place = data[i];
					$('.places').append(
						`<article>` +
						`<div class="title_box">` +
						`<h2>${ place.name }</h2>` +
						`<div class="price_by_night">${ place.price_by_night }</div>` +
						`</div>` +
						`<div class="information">` +
						`<div class="max_guest">` + `${ place.max_guest } Guest</div>` +
						`<div class="number_rooms">${ place.number_rooms }` + `Bedroom</div>` +
						`<div class="number_bathrooms">${ place.number_bathrooms } Bathroom</div>` +
						`</div>` +
						`<div class="description">` +
						`${ place.description}` +
						`</div>` +
						`</article>`);
				}
			}
		  });
	  });

});
