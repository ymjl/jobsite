var SERVERURL = "http://localhost:8080/jobsite";
$(function(){

	$('input').attr('readonly',true);
	$('textarea').attr('readonly',true);

if (getUrlParam('applicantID')!=null) {
	var applicantID = getUrlParam('applicantID');


}
	$.ajax({
		url:SERVERURL + '/applicant/getApplicantInfo',
		type : 'get',
		data:{
			"applicantID":applicantID
		},
		dataType : 'json',
		success:function(msg){
//-----------------------------
		if (msg.isSuccess==true) {
			if (msg.data == null) {
				alert("加载简历错误");

			}else{

				$("input[name='name']").val(msg.data.name);
				$("input[name='applicantID']").val(msg.data.applicantID);
				$("input[name='applicantNation']").val(msg.data.applicantNation);
				$("input[name='userBirthday']").val(msg.data.userBirthday);
				$("input[name='applicantSchool']").val(msg.data.applicantSchool);
				$("input[name='applicantMajor']").val(msg.data.applicantMajor);
				$("input[name='applicantPhone']").val(msg.data.applicantPhone);
				$("input[name='applicantQQ']").val(msg.data.applicantQQ);
				$("input[name='applicantSex']").val(msg.data.applicantSex);
				$("input[name='homePlace']").val(msg.data.homePlace);
				$("input[name='applicantPolitics']").val(msg.data.applicantPolitics);
				$("input[name='applicantEducation']").val(msg.data.applicantEducation);
				$("input[name='applicantEnglish']").val(msg.data.applicantEnglish);
				$("input[name='applicantEmail']").val(msg.data.applicantEmail);
				$("input[name='applicantAddress']").val(msg.data.applicantAddress);
				$("textarea[name='applicantStudy']").val(msg.data.applicantStudy);
				$("textarea[name='applicantProject']").val(msg.data.applicantProject);
				$("textarea[name='applicantHonor']").val(msg.data.applicantHonor);
				$("textarea[name='applicantHobby']").val(msg.data.applicantHobby);
				// sessionStorage.applicant = JSON.stringify(msg.data);
			}


		}else{
			alert("发生未知错误");

		}



//---------------------------------
		}





	});
});
        function getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); 
            var r = window.location.search.substr(1).match(reg); 
            return r?decodeURIComponent(r[2]):null;
        }







