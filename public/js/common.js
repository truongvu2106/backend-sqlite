define(['jquery', 'bootstrap'], function($, bootstrap) {
    var Common = {
        SERVER_URL: "http://" + window.location.host,
        showMessage: function(title, msg) {
            document.getElementById('commonModalBody').innerHTML = msg;
            document.getElementById('myModalLabel').innerHTML = title;
            $('#commonModal').modal('show');
        },
        getUrl: function(module, pathParam, queryParams) {
        	var url = Common.SERVER_URL + "/" + module;
        	if(pathParam) {
        		url += "/" + pathParam;
        	}
        	if(queryParams) {
        		url += "?";
        		for(var i=0; i<queryParams.length; i++) {
        			if(i > 0) {
        				url += "&";
        			}
        			url += queryParams[i];
        		}
        	}
        	return url;
        },
        rest: function(url, method, data, callback) {
            $.ajax({
                url: url,
                type: method,
                data: data,
                success: function(result, textStatus, xhr) {
                    callback(null, result);
                },
                error: function(err) {
                    callback(err);
                },
                timeout: 10000
            });
        }
    }
    return Common;
});