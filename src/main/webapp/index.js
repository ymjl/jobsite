var loginInfo;
var SERVERURL = "http://localhost:8080/jobsite";
var currentPage;
var isHasPre;
var isHasNext;
var allpages;
$(function(){
//$('#container_1').load("001pages/index.html #container_1");

	if(sessionStorage.loginInfo!=undefined){
		
		try{
			loginInfo = JSON.parse(sessionStorage.loginInfo);
		}catch(err){
			sessionStorage.removeItem("loginInfo");
			window.location.replace(SERVERURL);
			

		}
		initUser();
	}

	$('#indexSearchButton').click(function(){
		var inputText;
		inputText = $('input[name="search"]').val().trim();

		if (inputText!="") {
			window.location.href="001pages/search/search.html?searchText=" + inputText ;
		}

	});

$.ajax({
	url : SERVERURL+ '/recruitment/selectRecruitmentByPage',
	type : 'get',
	dataType : 'json',
	success: function(msg){
		if (msg.isSuccess == true) {
			if (msg.data==null) {
				bootbox.alert({
					title : "提示信息",
					message : "招聘信息加载失败！",
					buttons : {
						ok : {
							label : "确定"
						}
					}
				});
			}else{


				var i;
				


				for (i = 0; i < msg.page.pageSize; i++) {
					$('#resultList').append('<div class="list-group col-md-8 col-sm-8 recruitmentMsg">\
						<div class="col-md-5 col-sm-5"> <a href=""><h4 class="list-group-item-heading recruitmentTitle">'+ msg.data[i].recruitmentPosition+'</h4></a>\
					<p class="list-group-item-text">'+msg.data[i].recruitmentInfo+'</p>\
				</div><div class="col-md-5 col-sm-5" style="float: right;">\
					<button class="btn" style="float:right;background-color: #00b38a; border: 1px solid #00b38a;margin-top: 15px;color: #fff;" onclick="postRecruitment('+msg.data[i].recruitmentID+')">投个简历</button>\
					<a href="javascript:void(0)" onclick="openCompany(\''+msg.data[i].companyName+'\')"><h4 class="list-group-item-heading recruitmentTitle">'+msg.data[i].companyName+'</h4></a>\
					<label  style="float: left;">联系方式:</label><p class="list-group-item-text" style="float: left;">'+msg.data[i].companyEmail+'</p>\
				</div></div>');
				}
				for(i = 1; i <= msg.page.totalPageCount; i++ ){
					$('#pagerItem').append('<li class="allPage" onclick="loadPage('+i+')" id="item'+i+'"><a href="#" >'+i+'</a></li>');
					if (i==1) {
						$('.allPage').addClass('active');

					}
					
				}	
				currentPage = msg.page.pageNow;
				isHasPre = msg.page.hasPre;
				isHasNext = msg.page.hasNext;
				allpages = msg.page.totalPageCount
				if (isHasPre==true) {
					$('#pagePre').removeClass('disabled');
				}else{

					$('#pagePre').addClass('disabled');
				}
				if (isHasNext==true) {
					$('#pageNext').removeClass('disabled');
				}else{
					$('#pageNext').addClass('disabled');
				}
			

				 


			}


		}else{
				bootbox.alert({
					title : "提示信息",
					message : "系统错误！",
					buttons : {
						ok : {
							label : "确定"
						}
					}
				});
		}
	}

});	
	


	
	
$('input[name="search"]').keydown(function(){
	if (event.keyCode == "13"){
		$('#indexSearchButton').click();
	}
});



$('#searchLabel  a').each(function(){
	
	$(this).attr('href','001pages/search/search.html?searchText='+$(this).html());
});




});
function loadPage(i){
	
	if (i==-1) {
		if (isHasPre==true) {
			i = currentPage - 1;
			$('#pagePre').removeClass('disabled');

		}



	}
	if (i==-2) {
		if (isHasNext==true) {
			i = currentPage + 1;
			$('#pageNext').removeClass('disabled');
		}
	}
	

		
	if (i>=0&& i<=allpages) {
		$('.allPage').removeClass('active');
		$('#item'+i).addClass('active');

		$.ajax({
			url : SERVERURL+ '/recruitment/selectRecruitmentByPage?pageNow='+ i,
			type : 'get',
			dataType : 'json',
			success:function(msg){
				//------------------------------------------------------------------------
			if (msg.isSuccess == true) {
				if (msg.data==null) {
					bootbox.alert({
						title : "提示信息",
						message : "招聘信息加载失败！",
						buttons : {
							ok : {
								label : "确定"
							}
						}
					});
				}else{
					currentPage = msg.page.pageNow;
					isHasPre = msg.page.hasPre;
					isHasNext = msg.page.hasNext;
					if (isHasPre==true) {
						
						$('#pagePre').removeClass('disabled');
					}else{
						
						$('#pagePre').addClass('disabled');
					}
					if (isHasNext == true) {
						
						$('#pageNext').removeClass('disabled');
					}else{
						
						$('#pageNext').addClass('disabled');
					}
					var i;

					$('#resultList').html('');
					for (i = 0; i < msg.page.pageSize; i++) {
						$('#resultList').append('<div class="list-group col-md-8 col-sm-8 recruitmentMsg">\
							<div class="col-md-5 col-sm-5"> <a href=""><h4 class="list-group-item-heading recruitmentTitle">'+ msg.data[i].recruitmentPosition+'</h4></a>\
						<p class="list-group-item-text">'+msg.data[i].recruitmentInfo+'</p>\
					</div><div class="col-md-5 col-sm-5" style="float: right;">\
					<button class="btn" style="float:right;background-color: #00b38a; border: 1px solid #00b38a;margin-top: 15px;color: #fff;" onclick="postRecruitment('+msg.data[i].recruitmentID+')">投个简历</button>\
						<a href="javascript:void(0)" onclick="openCompany(\''+msg.data[i].companyName+'\')"><h4 class="list-group-item-heading recruitmentTitle">'+msg.data[i].companyName+'</h4></a>\
						<label  style="float: left;">联系方式:</label><p class="list-group-item-text" style="float: left;">'+msg.data[i].companyEmail+'</p>\
					</div></div>');
					}
				

					 


				}


			}else{
					bootbox.alert({
						title : "提示信息",
						message : "系统错误！",
						buttons : {
							ok : {
								label : "确定"
							}
						}
					});
			}
			//-----------------------------------------------------------
			}

		})		
	}

}
function postRecruitment(recruitmentID){

	if (sessionStorage.loginInfo!=undefined) {
		loginInfo = JSON.parse(sessionStorage.loginInfo);
		if (loginInfo.memberType != 1) {
			bootbox.alert({
				title : "提示信息",
				message : "你没有权限投递简历！",
				buttons : {
					ok : {
						label : "确定"
					}
				}
			});
		}else{


			//----------------------------------------------------------------------------------------简历加载
			$.ajax({
				url : SERVERURL + '/applicant/getApplicantMsg',
				type : 'post',
				data:{
				memberID:loginInfo.memberID
				},
				dataType : 'json',
				success: function(msg){
					if (msg.isSuccess == true) {
						if (msg.data == null) {
							bootbox.alert({
								title : "提示信息",
								message : "建简历列表为空，请添加简历！",
								buttons : {
									ok : {
										label : "确定"
									}
								}
							});

						}else{
							$("#myModal").attr("data-targetId",recruitmentID);
							$("#templateModalLabel").text("选择简历");
							$('#applicantList').html('');

							
							for(var item in msg.data){
								
								$('#applicantList').prepend("<option id = 'theLastSelected' data-applicantId='"+msg.data[item].applicantID+"' value='"+msg.data[item].applicantName+"'>"+msg.data[item].applicantName+"</option>");

								
							}
							$('#applicantList').val(msg.data[msg.data.length-1].applicantName);
							$("#templateModal").modal({
								backdrop : 'static',
								keyboard : false,
								show : true
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






			//---------------------------------------------------------------------------------------------
			

		
		}


	}else{

		bootbox.alert({
			title : "提示信息",
			message : "未登录，登录后才能投简历！",
			buttons : {
				ok : {
					label : "确定"
				}
			}
		});		

	}

}
$.closeDefaultModel = function(obj) {
	 obj.modal("hide");
};

$.saveMsg = function(){

	$.ajax({
		url : SERVERURL + '/info/insertInfo?memberID=' + loginInfo.memberID,
		type : 'post',
		dataType : 'json',
		data : {
			"recruitmentID" : $("#myModal").attr("data-targetId"),
			"applicantID" : $('#applicantList').find("option:selected").attr("data-applicantId")
		
		
		},
		success : function(data) {
			if (data.isSuccess == true) {
				
				$.alert("操作成功！");

			} else{
					bootbox.alert({
						title : "提示信息",
						message : "您已经投过简历了！",
						buttons : {
							ok : {
								label : "确定"
							}
						}
					});	
				
			}
			$.closeDefaultModel($("#templateModal"));
		}
	});	
}

$.alert = function(content, alertType) {
	$("#alertDiv").remove();
	$("body").append("<div id='alertDiv' style='position:fixed;top:5px;width:20%;margin-left:40%;z-index:1500;display:none;'>" + "<div id='alert' style='padding:10px;' class='alert text-center' role='alert'>" + "</div>" + "</div>");
	$("#alert").html(content + "<button type='button' class='close'>&times;</button>");
	$("#alertDiv").fadeIn();
	$("#alertDiv button").click(function() {
		onclick = $("#alertDiv").fadeOut();
	})
	if (alertType == 1) {
		$("#alert").addClass("alert-info");
		$("#alertDiv").delay(1500).hide(0, function() {
			$(this).remove();
		});
	} else if (alertType == 2) {
		$("#alert").addClass("alert-success");
		$("#alertDiv").delay(1500).hide(0, function() {
			$(this).remove();
		});
	} else if (alertType == 3) {
		$("#alert").addClass("alert-warning");
	} else {
		$("#alert").addClass("alert-danger");
	}
};
function openCompany(companyName){
	
	
	$("#companyModalLabel").text("公司信息");

	$.ajax({
		url : SERVERURL + '/company/getCompanyByName',
            		type : 'post',
            		dataType : 'json',
            		data : {
            			"companyName" : companyName,

            		},
            		success : function(msg){
            			var t;
            			if (msg.data.companyStatus==1) {
            				t = '已认证';
            			}else{
            				t = '未认证';
            			}
            			$('#showCompanyName').html(msg.data.companyName);
            			$('#showCompanyCode').html(msg.data.companyCode);
            			$('#showCompanyPhone').html(msg.data.companyPhone);
            			$('#showCompanyEmail').html(msg.data.companyEmail);
            			$('#showCompanyAdmin').html(msg.data.companyAdmin);
            			$('#showCompanyStatus').html(t);

            		}

	});


	$("#companyModal").modal({
		backdrop : 'static',
		keyboard : false,
		show : true
	});


};