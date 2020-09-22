//var api_url = "http://localhost:8090"
//var api_url = "http://10.20.90.188:8090"	
//var _linksegs = location.host.split(":");
//var api_url  = 'http://'+_linksegs[0] +":8090";
var api_url = 'http://oneplus.secureone.co.kr:8080/vgateway';
//var api_url = "http://oneplus.secureone.co.kr:8090";

function init_url( url ) {
	return api_url + url;
}	
	
function full_url( url ) {
	base64session = localStorage.getItem("__base64session__");
	base64key	= localStorage.getItem("__base64key__");
	return api_url + url;
}

function leadingZeros(n, digits) {
	  var zero = '';
	  n = n.toString();

	  if (n.length < digits) {
	    for (i = 0; i < digits - n.length; i++)
	      zero += '0';
	  }
	  return zero + n;
}



function auto_number(obj ,event) {
	
	var sentence =  obj.value;
	//obj.value = sentence.replace(/[a-z][A-Z]\-/g,'');
	obj.value = sentence.replace(/[^0123456789]/g,'');
}

var addr_search_flag = false;


function showDaumPostcode( name1  ,  name2 ) {
	if( addr_search_flag ) 
		return ;
	var  ozipcode	= document.getElementById(name1);
	var  oaddr 		= document.getElementById(name2);
	addr_search_flag = true;

    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var fullAddr = ''; // 최종 주소 변수
            var extraAddr = ''; // 조합형 주소 변수

            // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                fullAddr = data.roadAddress;

            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                fullAddr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
            if(data.userSelectedType === 'R'){
                //법정동명이 있을 경우 추가한다.
                if(data.bname !== ''){
                    extraAddr += data.bname;
                }
                // 건물명이 있을 경우 추가한다.
                if(data.buildingName !== ''){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
                fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            ozipcode.value = data.zonecode; //5자리 새우편번호 사용
            oaddr.value = fullAddr;
            addr_search_flag = false;
            // 커서를 상세주소 필드로 이동한다.
            oaddr.focus();
        }
    	,onclose:function(state) {
    		 addr_search_flag = false;
    	}
    }).open();
}

function isEmpty(id){
	var value = $("#"+id).val();
	value = value.replace(/ /gi, '');
	if(value == "" || value == null || value == undefined || (value!=null && typeof value =="object" && !Object.keys(value).length)){
		return false
	}else{
		return true
	}
}

function checkEmpty(id){
	var value = $("#"+id).val();
	value = value.replace(/ /gi, '');
	if(value == "" || value == null || value == undefined || (value!=null && typeof value =="object" && !Object.keys(value).length)){
		return false
	}else{
		return true
	}
}

///////////////////////////////////////////////////////
// 게시판 ....................
function add_mouseevent(name , _func) {
	
	$(name).click(function(){
		_func(this.id);
		
	});
	
	$(name).mouseover(function(){
		$(this).css("background-color", "#fffbfb");
	}); 
	$(name).mouseleave(function(){$(this).css("background-color", "#ffffff");});	
	
}

function _check_call_url( name ) {
	
	var referrer =  document.referrer;
	if(referrer.indexOf(name) < 0 ) {
		return true;
	}
	
	return false;
}

String.prototype.replaceAll = function(org, dest) {
    return this.split(org).join(dest);
}


function get_list( _data , arrs ) {
	var _template = _data;
	
	var keys = Object.keys(arrs);
	for( var _k=0 ; _k < keys.length ; _k++) {
		var name = keys[_k];
		var value = arrs[keys[_k]];
		var oname = '#_' + name + '_#';
		_template = _template.replaceAll(oname , value);
	}
	
	return _template;
}

function go_page(no) {
	if( eval((first_page-1) + no) >last_page  ) {
		return ;
	} else {
		location.href= _link_url + eval((first_page-1) + no);
	}
}

function go_page_func( _no  , _func ) {
	if( eval((first_page-1) + _no) >last_page  ) {
		return ;
	} else {
		cur_page = '' + ((first_page-1) + _no);
		_func();
	}
}




function go_next( _func ) {
	if( (first_page + page_cnt) > last_page ) {
		cur_page = '' + eval( last_page);
		_func();
	} else {
		//location.href= _link_url + eval( first_page + page_cnt);
		cur_page = '' + eval( first_page + page_cnt);
		_func();
	}
	
}

function go_next1() {
	if( (first_page + page_cnt) > last_page ) {
		location.href= _link_url + last_page;
	} else {
		location.href= _link_url + eval( first_page + page_cnt);
	}
	
}

function go_last(_func) {
	//location.href= _link_url + last_page;
	cur_page = '' + eval( last_page);
	_func();	
}

function go_last1() {
	location.href= _link_url + last_page;
}

function go_prev(_func) {
	if( (eval(first_page) - page_cnt) <= 0 ) {
		cur_page = '1';
		_func();
	} else {
		cur_page = '' + eval( first_page - page_cnt);
		_func();
	}
	
}

function go_prev1() {
	if( (eval(first_page) - page_cnt) <= 0 ) {
		cur_page = '1';
		_func();
	} else {
//		location.href= _link_url + eval(first_page-1);
		location.href= _link_url + eval( first_page + page_cnt);
	}
	
}

function go_first(_func ) {
	cur_page = '' + 1;
	_func();
}

function go_first1() {
	location.href=_link_url +"1";
	
}


function set_page( _id , _pid ) {
	
	if(total_cnt == 0 )
		last_page = 1;
	else  {
		if( (total_cnt%list_cnt) == 0 ) 
			last_page = Math.floor(total_cnt/list_cnt);
		else 
			last_page = Math.floor(total_cnt/list_cnt) +1;
	}
	
	if(cur_page == 0 )
		first_page = 1;
	else 
		if((cur_page%page_cnt) == 0 )
			first_page = (Math.floor(cur_page/page_cnt)-1)*page_cnt+1;
		else 
			first_page = Math.floor(cur_page/page_cnt)*page_cnt + 1;
	
	
	for( var _x=1 ; _x <= page_cnt; _x++ ) {
		$(_id + _x ).show();
		$(_id + _x ).removeClass("on");
		if(first_page+(_x-1) > last_page ) {
			$(_id + _x ).hide();
		} else {
			
			$(_id + _x ).text(first_page+(_x-1));
			if( (first_page+_x-1) == cur_page)
				$(_id + _x ).addClass("on");
		}
	}	
}

function _authA006( auth_code) {

	if( auth_code != 'A006' ) {
		location.href="/secureone/main.do";
	}
	
}

function _authA003( auth_code ) {
	
	if( auth_code != 'A006' &&  auth_code != 'A003') {
		location.href="/secureone/main.do";
	}
	
}

function _change_time( name ) {
	$(name).change(function() {
		if( this.value.length > 5) {
			this.value = this.value.substring(0,5);
		}
	});	
}

function elapsed_day( start_day , end_time ) {
	
	//년계산 
	var sday = new Date( start_day.substring(0,4) , start_day.substring(4,6), start_day.substring(6,8), start_day.substring(8,10) , start_day.substring(10,12) );
	var eday = new Date( end_time.substring(0,4) , end_time.substring(4,6), end_time.substring(6,8) , end_time.substring(8,10) , end_time.substring(10,12) );
	return  (eday.getTime()-sday.getTime() )/1000;

}


function isCheckList( _fields ) {
	
	for( var _x=0 ; _x < _fields.length ; _x++ ) {
		var _field = _fields[_x];
		var _val = $("#" + _field.name ).val();
		if(_field.nulcheck ) {
			if( _val  == null ||  _val == undefined ||_val == ''  || _val.length >  _field.len )  {
				alert( _field.message );
				 $("#" + _field.name ).focus();
				return true;
			}
		} else {
			if( _val  == null ||  _val == undefined || _val.length >  _field.len )  {
				alert( _field.message );
				 $("#" + _field.name ).focus();
				return true;
			}			
		}
	}
	
	return false;
}

function _search_option_call( _id , _func ) {
	
    $("#" + _id ).change(function(){
    	var _label =  $(this).val();
        var select_name = $(this).children("option:selected").text();
        $(this).siblings("label").text(select_name);
        _func();
	}); 	
	
}

function _search_option( _id ) {
	
    $("#" + _id ).change(function(){
    	var _label =  $(this).val();
        var select_name = $(this).children("option:selected").text();
        $(this).siblings("label").text(select_name);

	}); 	
	
}


var prev_hp = ['02','010', '012','016', '017', '018', '019', '031','032','033','041','042','043','044','051','052','053','054','055','061','062','063','064' , '070'];

function _hpchange( _obj ) {
	if( _obj.value.length > 13 ) {
		_obj.value = '';
		return ;
	}
		
	var hplist = _obj.value.split('-');
	var hp1 = hplist[0];
	var hp2 = hplist[1];

	if(hp2 == null || hp2 == undefined) {
		_obj.value = '';
		return ;
	}
	
	if(hp2.length !=3 && hp2.length != 4) {
		_obj.value = '';
		return ;
	}
	
	var hpflag = false;
	for( var _k=0 ; _k < prev_hp.length ; _k++ ) {
		if( hp1 == prev_hp[_k]) {
			hpflag = true;
		}
	}
	if( !hpflag ) {
		_obj.value = '';
	}
	
}
