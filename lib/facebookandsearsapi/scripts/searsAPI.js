var searsAPI = (function () {
    
    var apiKey = 'vHx4VVinWzPM6YONut2W2aPgFMyAozDR';
  
    return {
        test: function () {
          console.log('test');
        },
        getCategoryProducts: function(category, callback) {
            $.ajax({
                dataType: "jsonp",
                crossDomain: true,
                async: false,
                url: 'http://api.developer.sears.com/v2.1/products/search/Sears/jsonp/keyword/' + category + '?apikey='+apiKey,
                success: callback
            });
             
            //$.get('http://api.developer.sears.com/v2.1/products/search/Sears/json/keyword/baby?apikey='+apiKey, function(res){
            //   return res; 
            //});
            
        }
    };

})();