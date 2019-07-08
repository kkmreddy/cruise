function getMovies() {
	fetch('http://localhost:3000/movies')
		.then((response) => {
			// console.log(response);
			if (response.status == 200) {
				return response.json();
			}
		})
		.then((movies) => {
			let body = document.getElementById("moviesList");
			let bodyHtml = "";
			movies.forEach(element => {
				bodyHtml += `
				<div class="col-md-3">
				
				<div class="card space" style="width: 18rem;">
				<img class="card-img-top" src="${element.posterpath}" alt="Card image cap">
				<div class="card-body">
				  <h5 class="card-title">   ${element.title}</h5>
				 <button class="btn btn-primary" onclick="addFavourite(${ element.id})">Add to favourites</button>
				</div>
			  </div>
			  </div>
			 
			 
			  `
			});
			body.innerHTML = bodyHtml;
		})
		.catch((error) => {
			console.log(error);
		})
}

function getFavourites() {
	fetch('http://localhost:3000/favourites')
		.then((response) => {
			// console.log(response);
			if (response.status == 200) {
				return response.json();
			}
		})
		.then((favourites) => {
			let body = document.getElementById("favouritesList");
			let bodyHtml = "";
			favourites.forEach(element => {
				bodyHtml += `
			<div class="col-md-3">
			
			<div class="card space" style="width: 18rem;">
			<img class="card-img-top" src="${element.posterpath}" alt="Card image cap">
			<div class="card-body">
			  <h5 class="card-title">   ${element.title}</h5>
			</div>
		  </div>
		  </div>
		 
		 
		  `
			});
			body.innerHTML = bodyHtml;
		})
		.catch((error) => {
			console.log(error);
		})


}

function addFavourite(id) {
	var url = "http://localhost:3000/movies/" + id
	fetch(url, {
		"method": "get",
		"content-Type": {
			"headers": "application/json"
		}
	})
		.then((response) => {
			// console.log(response);
			if (response.status == 200) {
				return response.json();
			}
		})
		.then((favourite) => {
			fetch('http://localhost:3000/favourites', {
				"method": "post",
				"body": JSON.stringify(favourite),
				"headers": {
					"content-type": "application/json"
				}

			})
				.then((response) => {
					// console.log(response);
					if (response.status == 201) {
						console.log("record added succeessfully.");
						getFavourites();
					}
				})
				.catch((error) => {
					console.log(error);
				})

		})
		.catch((error) => {
			console.log(error);
		})

}

module.exports = {
	getMovies,
	getFavourites,
	addFavourite
};

// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution


