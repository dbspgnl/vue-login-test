var BASE64EXUTIL = {
	     seed:12345,
	rand_seed:0,
	_keys: "~!@#$%^&*()_+`1234567890-=QWERTYUIOP{}qwertyuiop[]ASDFGHJKL:\"asdfghjkl;'ZXCVBNM<>?zxcvbnm,./\\|",
	_random_data : "abcdefghijklmnopqrstuvwxyzBCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@$^*()_-~:/.,{}[]|",
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	random_data:"",
	
	next:function() {
		if( BASE64EXUTIL.rand_seed == 0 ) 
			BASE64EXUTIL.rand_seed = BASE64EXUTIL.seed;	
			
		BASE64EXUTIL.rand_seed = ((BASE64EXUTIL.rand_seed = BASE64EXUTIL.rand_seed*30402457+9689)>>>16)&0x7fff;
	
		if(BASE64EXUTIL.rand_seed== 0)  {
			BASE64EXUTIL.setSeed( BASE64EXUTIL.seed +1 )%BASE64EXUTIL.random_data.length;
			return BASE64EXUTIL.next();	
		}
		
		return BASE64EXUTIL.rand_seed;
	},
	setSeed:function( no ) {
		BASE64EXUTIL.rand_seed = 0;
		BASE64EXUTIL.seed = no%BASE64EXUTIL.random_data.length;
	},
	nextInt:function( max_number ) {
		return BASE64EXUTIL.next()%max_number;
	},	
	skipRand:function( c ) {
		var n = BASE64EXUTIL._keys.indexOf(c);
		for( var x=0 ; x < n ; x++)
			BASE64EXUTIL.next();
	},

	setMap:function( seed  , keys ) {
		try
		{
		
			BASE64EXUTIL.random_data = BASE64EXUTIL._random_data;
			BASE64EXUTIL.setSeed(seed);	
			BASE64EXUTIL._keyStr = "";
			
			var cn = 0;
			for( var x=0 ; x < 63 ;  ) {
			
				BASE64EXUTIL.skipRand(keys.charAt(cn));
				
				var n = BASE64EXUTIL.nextInt(BASE64EXUTIL.random_data.length);
				var random_flag = false;
				
				for( var k=0 ; k < x ; k++ ) {
					if( BASE64EXUTIL._keyStr[k] == BASE64EXUTIL.random_data[n] ) {
						random_flag = true;
						break;
					}
				}
				if( !random_flag ) {
				
					BASE64EXUTIL._keyStr += BASE64EXUTIL.random_data[n];
					var temp_data = BASE64EXUTIL.random_data[n];
					BASE64EXUTIL.random_data = BASE64EXUTIL.random_data.replace(temp_data,"");
					
					x++;
					cn++;
					if( cn >= keys.length ) {
						cn = 0;
					}
				}

			}

			BASE64EXUTIL._keyStr += "A;";
		}
		catch ( e )
		{
			alert(e);
		}
	},	
	
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = BASE64EXUTIL._utf8_encode(input);
 
		while (i < input.length) {
 
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
 
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
 
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
 
			output = output +
			BASE64EXUTIL._keyStr.charAt(enc1) + BASE64EXUTIL._keyStr.charAt(enc2) +
			BASE64EXUTIL._keyStr.charAt(enc3) + BASE64EXUTIL._keyStr.charAt(enc4);
 
		}
 
		return output;
	},	
	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
 
		//input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
		while (i < input.length) {
 
			enc1 = BASE64EXUTIL._keyStr.indexOf(input.charAt(i++));
			enc2 = BASE64EXUTIL._keyStr.indexOf(input.charAt(i++));
			enc3 = BASE64EXUTIL._keyStr.indexOf(input.charAt(i++));
			enc4 = BASE64EXUTIL._keyStr.indexOf(input.charAt(i++));
 
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
 
			output = output + String.fromCharCode(chr1);
 
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
 
		}
 
		output = BASE64EXUTIL._utf8_decode(output);
 
		return output;
 
	},
	
	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	},
		
	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
	
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;

		while ( i < utftext.length ) {
			c = utftext.charCodeAt(i);
			
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}				
		}
		
		return string;

	}	
};

var base64key = "12345";
var base64session = "session";
var enc1key = "";
var enc2key = "";

var cm_params = "";

var fmaps;

var fixwords = ['&gt;', '&lt;'];

function init_params() {
	if( fmaps != null ) {
		var keys = Object.keys(fmaps);
		for( var i=keys.length-1; i >=0 ; i-- ) {
			delete fmaps[keys[i]];
		}
	}
	fmaps = new Object();

}

function add_parameter(param) {
	var value = document.getElementById(param).value;
	if( value == null|| value == 'null'|| value == 'undefined')
		value ='';	
	fmaps[param]= value;
}

function add_params(param , value) {
	if( value == null ||value == 'null'|| value == 'undefined')
		value ='';	
	fmaps[param]= value;
}





function set_input() {
	
	var inputs = document.getElementsByTagName('input');
	for (var x = 0; x < inputs.length; ++x) {
		if( (inputs[x].id != 'undefined') && (inputs[x].id != null) && ( inputs[x].id != '') ) {
	    	var value = inputs[x].value;
	    	if( value == null ||value == 'null'|| value == 'undefined') 
	    		value ='';
	    	fmaps[inputs[x].id]= value;
	    	
	    	//cm_params  = cm_params + "\""+ inputs[x].id +"\":\"" + value +"\"";
	    	
		}
	}	
}

function init_input() {
	
	var inputs = document.getElementsByTagName('input');
	for (var x = 0; x < inputs.length; ++x) {
		if(inputs[x].type != 'radio'){
			inputs[x].value = '';
		}
	}	
}


function set_textarea() {
	
	var textareas = document.getElementsByTagName('textarea');
	for (var x = 0; x < textareas.length; ++x) {
	
		if( (textareas[x].id != 'undefined') && (textareas[x].id != null) && ( textareas[x].id != '') ) {	
	    	var value = textareas[x].value;
	    	if( value == null ||value == 'null'|| value == 'undefined') 
	    		value ='';	
	    	fmaps[textareas[x].id]= value;
	    	//cm_params  = cm_params + "\""+ textareas[x].id +"\":\"" + value +"\"";
	    	
		}
	}	
}

function get_form_param() {
	var keys = Object.keys(fmaps);
	cm_params = "{";
	 for( var i=0; i < keys.length ; i++ ) {
		//alert( keys[i] + ":" + fmaps[keys[i]]);
		var value = fmaps[keys[i]];
		if( value == null ||value == 'null'|| value == 'undefined')
			value ='';
		if( i < (keys.length-1) )
			cm_params  = cm_params + "\""+ keys[i] +"\":\"" + value +"\",";
		else 
			cm_params  = cm_params + "\""+ keys[i]  +"\":\"" + value +"\"";
	 }
	
	cm_params  = cm_params + "}";
	return cm_params;
}

function init_textarea() {
	
	var textareas = document.getElementsByTagName('textarea');
	for (var x = 0; x < textareas.length; ++x) {
		textareas[x].value='';
	}	
}

function init_form() {
	init_input();
	init_textarea();
}

function add_form() {
	set_input();
	set_textarea();
}


function get_parameter(param) {
	var value = document.getElementById(param).value;
	if( value == null ||value == 'null'|| value == 'undefined')
		value ='';
	//cm_params  = cm_params + "\""+ param +"\":\"" + value +"\"";
	//cm_params  = cm_params + "}";
	fmaps[param]= value;
	cm_params = get_form_param();
	return cm_params;
}


function get_params(param , value) {
	if( value == null ||value == 'null'|| value == 'undefined')
		value ='';	
	//cm_params  = cm_params + "\""+ param +"\":\"" + value +"\"";
//	cm_params  = cm_params + "}";
	fmaps[param]=value;
	cm_params = get_form_param();
	
	return cm_params;
}




function get_url( var_url , params) {
	
	BASE64EXUTIL.setMap(base64key, base64session);
	var tempno = (new Date()).getTime();
	
	var encdata = BASE64EXUTIL.encode(params);
	
	var rdata = "{";
	rdata  = rdata + "\"jsessionkey\":\"" + encodeURIComponent(base64session) +"\",";	
	rdata  = rdata + "\"data\":\"" + encodeURIComponent(encdata) +"\"";
	rdata  = rdata + "}";
	$.ajax({
		 type:'POST'
		,url: var_url
		,contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
		,dataType:'json'
		,data: rdata
		,async: false
		,success:function(data) {
			try {

				if( data.result == 200) {
					var rencdata = data.data;
					var decdata = BASE64EXUTIL.decode(rencdata);
					var odata = JSON.parse(decdata);
					
					base64session = odata.session;					
					base64key = odata.key;
					localStorage.setItem("__base64session__", base64session);
					localStorage.setItem("__base64key__", base64key);					
				} else if (data.result == 500 ) {
					w2alert('서버 확인이 필요합니다.');
				}
				
			} catch(e) {
				alert(e);
			}
			
		}
		,error:function(xhr,status,error) {
			w2alert( '네트워크 오류 입니다.');
		}
	});	

}



function call_url( var_url , params , getfunc ) {
	
	base64session = localStorage.getItem("__base64session__");
	base64key	= localStorage.getItem("__base64key__");
	
	
	BASE64EXUTIL.setMap(base64key, base64session);
	var tempno = (new Date()).getTime();
	
	var encdata = BASE64EXUTIL.encode(params);
	
	var rdata = "{";
	rdata  = rdata + "\"jsessionkey\":\"" + encodeURIComponent(base64session) +"\",";	
	rdata  = rdata + "\"data\":\"" + encodeURIComponent(encdata) +"\"";
	rdata  = rdata + "}";
	$.ajax({
		 url: var_url
		,data: rdata
		,type:'POST'
		,dataType:'json'
		,contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
		,success:function(data) {
			try {
				if( data.result == 200) {
					var rencdata = data.data;
					var decdata = BASE64EXUTIL.decode(rencdata);
					getfunc(decdata);
				} else {
					var rencdata = data.data;
					var decdata = BASE64EXUTIL.decode(rencdata);
					var robj = JSON.parse(decdata);
					alert(robj.message);
				}
				
			} catch(e) {
				alert(e);
			}
			
		}
		,error:function(xhr,status,error) {
			alert( '네트워크 오류 입니다.');
		}
	});	

}

function grid_url( var_url , params , getfunc ) {
	
	base64session = localStorage.getItem("__base64session__");
	base64key	= localStorage.getItem("__base64key__");
	
	
	BASE64EXUTIL.setMap(base64key, base64session);
	var tempno = (new Date()).getTime();
	
	var encdata = BASE64EXUTIL.encode(params);
	
	var rdata = "{";
	rdata  = rdata + "\"jsessionkey\":\"" + encodeURIComponent(base64session) +"\",";	
	rdata  = rdata + "\"data\":\"" + encodeURIComponent(encdata) +"\"";
	rdata  = rdata + "}";

	$.ajax({
		 url: var_url
		,data: rdata
		,type:'POST'
		,dataType:'json'
		,contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
		,success:function(data) {
			try {
				if( data.result == 200) {
					var rencdata = data.data;
					var decdata = BASE64EXUTIL.decode(rencdata);
					getfunc(decdata);
				} else {
					var rencdata = data.data;
					var decdata = BASE64EXUTIL.decode(rencdata);
					var robj = JSON.parse(decdata);
					alert(robj.message);
				}
				
			} catch(e) {
				alert(e);
			}
			
		}
		,error:function(xhr,status,error) {
			w2alert( '네트워크 오류 입니다.');
		}
	});	

}


function set_base64ex( session , key1 , key2 ) {

	if( session != null && session != "" ) {
		base64session = session;
		enc1key = key1;
		base64key = key1;
		BASE64EXUTIL.setMap(base64key, base64session);
		base64key = BASE64EXUTIL.decode(key2);
		enc2key = key2;		
		localStorage.setItem("__base64session__", session);
		localStorage.setItem("__base64key__", base64key);
	}
	
}

function location_url(url , params ) { 
	var full_url = url + "?jsessionkey=" + base64session + "&ikey=" + enc1key + "&key1="+encodeURIComponent(enc2key) + params;
	location.href= full_url;
	
}

function event_enter(evt , _func){
	
	var keyCode = evt.which?evt.which:event.keyCode; 
	if( keyCode == 13 ) {
		_func();
	}
}

function get_form_data( _prev , _next) {
	
	var _tags = ['input' ,'select' , 'textarea'];
	var _maps={};
	
	for( var _x=0; _x < _tags.length ; _x++) {
		var _objs = document.getElementsByTagName(_tags[_x]);
		for (var _k = 0; _k < _objs.length; ++_k) {
			if( (_objs[_k].id != 'undefined') && (_objs[_k].id != null) && ( _objs[_k].id != '') ) {
				
				if( (_objs[_k].id).indexOf(_prev)==0 ) {
			    	var _value = _objs[_k].value;
			    	if( _value == null ||_value == 'null'|| _value == 'undefined') 
			    		_value ='';
			    	var name = _objs[_k].id.replace(_prev , _next);
			    	_maps[name]=_value;
				}	    					
				
			}
		}
	}
	
	return _maps;
	
}

function init_form_data( _prev ) {
	
	var _tags = ['input' ,'select' , 'textarea'];
	var _maps={};
	
	for( var _x=0; _x < _tags.length ; _x++) {
		var _objs = document.getElementsByTagName(_tags[_x]);
		for (var _k = 0; _k < _objs.length; ++_k) {
			if( (_objs[_k].id != 'undefined') && (_objs[_k].id != null) && ( _objs[_k].id != '') ) {
				if(_objs[_k].id.indexOf(_prev)>=0)	    					
					_objs[_k].value = '';
			}
		}
	}

	
}


function form_disable( _prev ) {
	var _tags = ['input' ,'select' , 'textarea'];
	var _maps={};
	
	for( var _x=0; _x < _tags.length ; _x++) {
		var _objs = document.getElementsByTagName(_tags[_x]);
		for (var _k = 0; _k < _objs.length; ++_k) {
			if( (_objs[_k].id != 'undefined') && (_objs[_k].id != null) && ( _objs[_k].id != '') ) {
				if(  _objs[_k].id.indexOf(_prev) >= 0 ) {
					 _objs[_k].disabled = true;
				}
			}
		}
	}
}


function form_enable( _prev ) {
	var _tags = ['input' ,'select' , 'textarea'];
	var _maps={};
	
	for( var _x=0; _x < _tags.length ; _x++) {
		var _objs = document.getElementsByTagName(_tags[_x]);
		for (var _k = 0; _k < _objs.length; ++_k) {
			if( (_objs[_k].id != 'undefined') && (_objs[_k].id != null) && ( _objs[_k].id != '') ) {
				if(  _objs[_k].id.indexOf(_prev) >= 0 ) {
					 _objs[_k].disabled = false;
				}
			}
		}
	}
}



function _date_assist(event){
	var time = new Date()
	  , y = String(time.getFullYear())
	  , m = time.getMonth()
	  , d = time.getDate()
	  , h = '-'
	  , lists = {

	    keyup : [
	  [/[^\d\-]/, '']
	 , [/^(\d\d)(\d\d)$/, '$1-$2']
	 , [/^(\d\d\-\d\d)(\d+)$/, '$1-$2']
	 , [/^(\d\d)-(\d\d)-(\d\d)(\d+)$/, '$1$2-$3-$4']
	 , [/^(\d\d)-(\d\d)-(\d\d?)(-\d+)$/, '$1$2-$3$4']
	 , [/^(\d{4}-\d\d)(\d\d)$/, '$1-$2']
	 , [/^(\d{4})(\d\d)(\d\d)$/, '$1-$2-$3']
	 , [/(\d{4}-\d\d?-\d\d).+/, '$1']
	 ]
	 , blur : [
	 [/^(0?[1-9]|[1-2][0-9]|3[0-1])$/, m+'-$1', 1]
	 , [/^(0?[1-9]|1[0-2])\-?(0[1-9]|[1-2][0-9]|3[01])$/, y+'-$1-$2']
	 , [/^((?:0m?[1-9]|1[0-2])\-[1-9])$/, y+'-$1']
	 , [/^(\d\-\d\d?\-\d\d?)$/, y.substr(0, 3)+'$1', 1]
	 , [/^(\d\d\-\d\d?\-\d\d?)$/, y.substr(0, 2)+'$1', 1]
	 , [/(\d{4}-)(\d-\d\d?)$/, '$10$2', 1]
	 , [/(\d{4}-\d\d-)(\d)$/, '$10$2']
	 ]
	};

	event = event || window.event;

	var input = event.target || event.srcElement, value = input.value, list = lists[event.type];

	  for(var i=0, c=list.length, match; i<c; i++){
		match = list[i];
		if(match[0].test(value)){
			input.value = value.replace(match[0], match[1]);
			if(!match[2])
			    break;
		}
	}
}

function getYMDhms() {

	var _date = new Date();
	return _date.getFullYear() + ("0" + (_date.getMonth() + 1)).slice(-2) + ("0" + _date.getDate()).slice(-2) + ("0" + _date.getHours() ).slice(-2) + ("0" + _date.getMinutes()).slice(-2) + ("0" + _date.getSeconds()).slice(-2) ;

}

function _data_encoding(_data) {
	var _temp_data = (((_data.replaceAll('&gt;' , '<')).replaceAll('&lt;' , '>')).replaceAll('>' , '&lt;')).replaceAll('<' , '&gt;');
	return _temp_data;
}

function _data_decoding(_data) {
	var _temp_data = (_data.replaceAll('&gt;' , '<')).replaceAll('&lt;' , '>');
	return _temp_data;
}


function set_session() {
	
	base64session = localStorage.getItem("__base64session__");
	base64key	= localStorage.getItem("__base64key__");
	
	
}

function _get_session() {
	return localStorage.getItem("__base64session__");
}