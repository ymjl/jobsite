$(function(){
	
	$('#userBirthday').datetimepicker({
		lang:"ch",
		startDate:"1970-01-01",
		endDate:"2001-01-01",
		 startView:4,
		 minView: 2,
   		 format: 'yyyy-mm-dd',
   		 autoclose:true,

	});
	$('#jianli').click(function(){
		

		$('.sideTitle').hide();
		$('#applicant').show();
		$('#applicantSelect').html("");
		var memberID = {
			memberID:loginInfo.memberID
		}
		
		
		$.ajax({
			url : SERVERURL + '/applicant/getApplicantName',
			type : 'post',
			data:memberID,
			dataType : 'json',
			success: function(msg){
				if (msg.isSuccess == true) {
					if (msg.data == null) {
						bootbox.prompt({
							title: "添加简历",
							message:"请为一个新的简历输入标识名称",
							callback:function(result){

								if (result=="" || result == null) {
									$("#index").click();	


								}else{
									$.post(SERVERURL + '/applicant/insertApplicantName',
									  {
									    'name':result,
									    'memberID':loginInfo.memberID
									  },
									  function(msg){

									  	if (msg.data==null) {
											bootbox.alert({
												title:'提示信息',
												message:'对不起，此名称已使用',
												buttons:{
													ok:{
														label:'确定'
													}
													
												}
												
											});							
									  	}else{
									  		$('#applicantSelect').prepend("<option value='"+result+"'>"+result+"</option>");
									  		$("#jianli").click();
									  	}
									    
									  });



									
											
								}


							}



						});




					}else{

						
						for(var item in msg.data){
							
							$('#applicantSelect').prepend("<option id = 'theLastSelected' value='"+msg.data[item]+"'>"+msg.data[item]+"</option>");
							
						}
						$('#applicantSelect').val(msg.data[msg.data.length-1]);
						loadSelectItem(msg.data[msg.data.length-1]);


					}





				}else{


					bootbox.alert({
						title : "提示信息",
						message : "系统错误，请与系统管理员联系！",
						buttons : {
							ok : {
								label : "确定"
							}
						}
					});


				}

			}
		});





	});


	$('#save_applicantButton').click(function(){
		var formContent = $('#applicantForm').serialize();
		
		formContent  = decodeURIComponent(formContent ,true);
		
		

		$.ajax({
			url : SERVERURL + '/applicant/saveApplicant',
			type : 'post',
			data:formContent,
			dataType : 'json',
			success: function(msg){
				if (msg.isSuccess==true) {
					if (msg.data==null) {
						bootbox.alert({
							title : "提示信息",
							message : "保存失败！",
							buttons : {
								ok : {
									label : "确定"
								}
							}
						});

					}else{
						bootbox.alert({
							title : "提示信息",
							message : "保存成功！",
							buttons : {
								ok : {
									label : "确定"
								}
							}
						});
					}

				}else{
						bootbox.alert({
							title : "提示信息",
							message : "系统错误，请与系统管理员联系！",
							buttons : {
								ok : {
									label : "确定"
								}
							}
						});

				}
				
			}
		});

	});

	$("#change_applicantButton").click(function(){
		bootbox.prompt({
			title: "修改简历名称",
			message:"请为一个新的简历名称",
			callback:function(result){
				if (result=="" || result == null) {
				$("#jianli").click();	
				}else{
				$.post(SERVERURL + '/applicant/saveApplicant',
				{
			  	   'applicantName':result,
				   'applicantID':$("#applicantID").val()					
				},
				function(msg){
				if (msg.isSuccess==true) {
					if (msg.data==null) {
						bootbox.alert({
							title : "提示信息",
							message : "修改失败！",
							buttons : {
								ok : {
									label : "确定"
								}
							}
						});

					}else{
						bootbox.alert({
							title : "提示信息",
							message : "修改成功！",
							buttons : {
								ok : {
									label : "确定"
								}
							}
						});
						$('#jianli').click();
					}

				}else{
						bootbox.alert({
							title : "提示信息",
							message : "系统错误，请与系统管理员联系！",
							buttons : {
								ok : {
									label : "确定"
								}
							}
						});

				}


				}

				)

				}

			}
		});






	});

$("#delete_applicantButton").click(function(){


				$.post(SERVERURL + '/applicant/deleteApplicant',
				{
				   'applicantID':$("#applicantID").val()					
				},
				function(msg){
				if (msg.isSuccess==true) {
					if (msg.data==null) {
						bootbox.alert({
							title : "提示信息",
							message : "删除失败！",
							buttons : {
								ok : {
									label : "确定"
								}
							}
						});

					}else{
						bootbox.alert({
							title : "提示信息",
							message : "删除成功！",
							buttons : {
								ok : {
									label : "确定"
								}
							}
						});
						$('#jianli').click();
					}

				}else{
						bootbox.alert({
							title : "提示信息",
							message : "系统错误，请与系统管理员联系！",
							buttons : {
								ok : {
									label : "确定"
								}
							}
						});

				}


				}

				)





	});

});			
function addApplicant(){
	bootbox.prompt({
		title: "提示",
		message:"请为一个新的简历输入标识名称",
		callback:function(result){

			if (result=="" || result == null) {
				$("#jianli").click();	


			}else{
				$.post(SERVERURL + '/applicant/insertApplicantName',
				  {
				    'name':result,
				    'memberID':loginInfo.memberID
				  },
				  function(msg){

					if (msg.data==null) {
						bootbox.alert({
							title:'提示信息',
							message:'对不起，此名称已使用',
							buttons:{
								ok:{
									label:'确定'
								}
													
							}
												
						});							
						}else{
							$('#applicantSelect').prepend("<option  value='"+result+"'>"+result+"</option>");
							$("#jianli").click();
						}
									    
					  });



									
											
				}


			}



		});

}
function loadSelectItem(applicantName){
	
	$.post(SERVERURL + '/applicant/getApplicant',
	{
		'applicantName':applicantName,
		'memberID':loginInfo.memberID
	},
	function(msg){
		if (msg.isSuccess==true) {
			if (msg.data == null) {
				alert("加载简历错误");

			}else{

				$("input[name='name']").val(msg.data.name);
				$("input[name='applicantID']").val(msg.data.applicantID);
				$("#applicantNation").val(msg.data.applicantNation);
				$("input[name='userBirthday']").val(msg.data.userBirthday);
				$("input[name='applicantSchool']").val(msg.data.applicantSchool);
				$("input[name='applicantMajor']").val(msg.data.applicantMajor);
				$("input[name='applicantPhone']").val(msg.data.applicantPhone);
				$("input[name='applicantQQ']").val(msg.data.applicantQQ);
				$("#applicantSex").val(msg.data.applicantSex);
				$("input[name='homePlace']").val(msg.data.homePlace);
				$("#applicantPolitics").val(msg.data.applicantPolitics);
				$("#applicantEducation").val(msg.data.applicantEducation);
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



	});


}