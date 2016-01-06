function loadData() {

	var url = 'https://api.foursquare.com/v2/venues/search' +
  		'?client_id=FNMHOGTDEWE10PGKTEBDW5IYWTXLFJKJFH4G232RV3ZEVCVO' +
		'&client_secret=3PFR1W2WZYV5RAP3TSCCYUOXIE5CJSKJSPPFBJUXQDFKORH2' +
  		'&v=20160105' +
  		'&m=foursquare' +
  		'&limit=3' +
  		'&near=Daly City, CA' +
  		'&query=boulevard cafe';

  	$.getJSON(url, function(data){
        console.log(data);
    }).error(function(){
        console.log('getJSON error');
    });

  	//console.log(url);

}

loadData();