var SERVERURL = "http://localhost:8080/jobsite";
var loginInfo;
var companyInfo =null;
var mainDT;
var jianliDT;
var yingpinDT;
var reviewDT;
var manageDT;
$(function(){



	
		
	$.ajaxSetup({
		type : "POST", // 默认使用POST方式

		error : function(XMLHttpRequest, textStatus, errorThrown) {
			$.alert("登录超时，请重新登录！", 4);
			window.location.replace(SERVERURL);
		}
	});

	if (sessionStorage.loginInfo == undefined)
		window.location.replace(SERVERURL);
	else{
		
		try{
			loginInfo = JSON.parse(sessionStorage.loginInfo);
		}catch(err){
			window.location.replace(SERVERURL);

		}
		
		$('#menu_right').html('<li role="presentation"><a  id = "menu_name" href="#" >' + loginInfo.loginName +'</a></li><li role="presentation"><a  id = "menu_exit" href="#" onclick="userExit()">退出&nbsp;<span class="glyphicon glyphicon-log-out">&nbsp;&nbsp;&nbsp;</span></a></li>');
		initMsg();
		if (loginInfo.memberType!=1) {
			$('#jianliRecord').hide();
			$('#jianli').hide();		
		}
		if (loginInfo.memberType==0) {
			$('#side_list').append('<li><a href="#" id="adminReview">公司审核</a></li>');
			$('#side_list').append('<li><a href="#" id="adminManage">公司管理</a></li>');
		}
		if (loginInfo.memberType==2) {

			$('#side_list').append('<li><a href="#" id="company">公司信息</a></li>');
			$('#side_list').append('<li><a href="#" id="recruitment">发布信息</a></li>');
			$('#side_list').append('<li><a href="#" id="changeRecruitment">修改信息</a></li>');
			$('#side_list').append('<li><a href="#" id="searchRecruitment">查看简历</a></li>');

			var memberId ={
				'memberID':loginInfo.memberID
			}
			$.ajax({
				url : SERVERURL + '/company/getCompany',
				type : 'post',
				data : memberId,
				dataType : 'json',
				success: function(msg){
					if (msg.isSuccess==true) {
						if (msg.data!=null) {
							companyInfo=msg.data;


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

		}
	}
	
	$('.sideTitle').hide();
	$('#userMSG').show();
	$('#side_list > li').click(function (e) {
		e.preventDefault();
		$('#side_list > li').removeClass('active');
		$(this).addClass('active');

	});
	
	
	$('#index').click(function(){
		
		$('.sideTitle').hide();
		$("#userMSG").show();
		


		
	});
	
	
	
	$('#changepwd').click(function(){

		$('.sideTitle').hide();
		$('#changePWD').show();

	});

	$('#adminReview').click(function(){
		$('.sideTitle').hide();
			reviewDT = $('#reviewDT').DataTable({
				ajax:{
					url : SERVERURL + "/company/getCompanyReviewListByStaus",
					type : "POST"
				},
				pageLength: 5,
				"bRetrieve": true,
				"bSort":false,
				
				"pagingType":"full_numbers",
				"destroy": true,
				"autoWidth": true,
				 "bJQueryUI": false, 
				columns:[{
					"data":null,
					"targets" : 0,


				},
				{
					"data":"companyName"
				},
				{
					"data":"companyCode"

				},
				{
					"data":"companyPhone"
				},
				{
					"data":"companyEmail"
				},
				{
					"data":"companyAdmin"
				},
				{
					"data":"adminCard"
				},
				{
					"data":"companyImage",
					render:function(data,type,row){
						return "<button class='btn btn-default btn-xs' onclick='$.lookImage(" + JSON.stringify(row)+ ")'><span class='glyphicon glyphicon-zoom-in' aria-hidden='true'></span>查看资料</button>";
					}


				},
				{
					"data":"companyStatus",
					render:function(data,type,row){
						return "审核中...";
					}
				},
				{
					"data":"companyID",
					render:function(data,type,row){
						return "<button class='btn btn-default btn-xs' onclick='$.setReview(" + data + ")'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span>审核</button>";

					}
				}
				]

			});
			reviewDT.on('order.dt search.dt',
			function() {
			    reviewDT.column(0, {	
			        "search": 'applied',
			        "order": 'applied'
			    }).nodes().each(function(cell, i) {
			        cell.innerHTML = i + 1;
			    });
			}).draw();

			$('#adminReviewMsg').show();
		

	});

	$('#adminManage').click(function(){
		$('.sideTitle').hide();

			manageDT = $('#manageDT').DataTable({
				ajax:{
					url : SERVERURL + "/company/getCompanyReviewList",
					type : "POST"
				},
				pageLength: 5,
				"bRetrieve": true,
				"bSort":false,
				
				"pagingType":"full_numbers",
				"destroy": true,
				"autoWidth": true,
				 "bJQueryUI": false, 
				columns:[{
					"data":null,
					"targets" : 0,


				},
				{
					"data":"companyName"
				},
				{
					"data":"companyCode"

				},
				{
					"data":"companyPhone"
				},
				{
					"data":"companyEmail"
				},
				{
					"data":"companyAdmin"
				},
				{
					"data":"adminCard"
				},
				{
					"data":"companyImage",
					render:function(data,type,row){
						return "<button class='btn btn-default btn-xs' onclick='$.lookImage(" + JSON.stringify(row)+ ")'><span class='glyphicon glyphicon-zoom-in' aria-hidden='true'></span>查看资料</button>";
					}
				},
				{
					"data":"companyStatus",
					render:function(data,type,row){
						var status;
						if(data==0){
							status = '审核中........';

						}else if (data==1) {
							status = '审核通过';
						}else{
							status = '审核未通过';
						}
						return status;
					}
				},
				{
					"data":"companyID",
					render:function(data,type,row){
						return "<button class='btn btn-default btn-xs' onclick='$.companyManage(" +  JSON.stringify(row) + ")'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span>编辑</button>";

					}
				}
				]

			});
			manageDT.on('order.dt search.dt',
			function() {
			    manageDT.column(0, {	
			        "search": 'applied',
			        "order": 'applied'
			    }).nodes().each(function(cell, i) {
			        cell.innerHTML = i + 1;
			    });
			}).draw();

			$('#adminManageMsg').show();







	});

	//-------------------------------------------------------------查看简历情况
	$('#jianliRecord').click(function(){

		$('.sideTitle').hide();

			jianliDT = $('#jianliDT').DataTable({
				ajax:{
					url : SERVERURL + "/applicant/getApplicantDataTable",
					data:{
						"memberID":loginInfo.memberID

					},
					type : "POST"
				},
				pageLength: 5,
				"bRetrieve": true,
				
				"pagingType":"full_numbers",
				"destroy": true,
				"autoWidth": true,
				 "bJQueryUI": false, 
				columns:[{
					"data":null,
					"targets" : 0,


				},
				{
					"data":"recruitmentPosition"
				},
				{
					"data":"companyName"

				},
				{
					"data":"applicantName"
				},
				{
					"data":"applyStatus",
					render:function(data,type,row){
						if (data==0) {
							var s = "<p>待反馈<p>";

						}else{
							var s = "<p style='color: green'>企业已查看<p>"
						}
						return s;

					}
				},
				{
					"data":"applyTime",
					"bSort": true
				},
				{
					"data":"applicantID",
					render:function(data,type,row){
					return  "<button class='btn btn-default btn-xs' onclick='$.delInfo(" + JSON.stringify(row) + ")'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span> 删除</button>";
					}
				}
				],
				columnDefs:[{
			                 orderable:false,//禁用排序
			                 targets:[0,3,4,6]   //指定的列
			             }]

			});
			jianliDT.on('order.dt search.dt',
			function() {
			    jianliDT.column(0, {	
			        "search": 'applied',
			        "order": 'applied'
			    }).nodes().each(function(cell, i) {
			        cell.innerHTML = i + 1;
			    });
			}).draw();
		$('#jianliRecordMsg').show();

	});
	//---------------------------------------------------------------结束


	//---------------------------------------------------应聘信息
	$('#searchRecruitment').click(function(){
		if (companyInfo == null || companyInfo.companyStatus !=1) {
			bootbox.alert({
				title : "提示信息",
				message : "企业未注册或未审核通过，通过后才能修改招聘信息！",
				buttons : {
					ok : {
						label : "确定"
					}
				}
			});
		}else{
$('.sideTitle').hide();


			yingpinDT = $('#yingpinDT').DataTable({
				ajax:{
					url : SERVERURL + "/applicant/getRecruitmentDataTable",
					data:{
						"companyID":companyInfo.companyID

					},
					type : "POST"
				},
				pageLength: 5,
				"bRetrieve": true,
				
				"pagingType":"full_numbers",
				"destroy": true,
				"autoWidth": true,
				 "bJQueryUI": false, 
				columns:[{
					"data":null,
					"targets" : 0,


				},
				{
					"data":"recruitmentPosition"
				},
				{
					"data":"applicantName"
				},
				{
					"data":"applyStatus",
					render:function(data,type,row){
						if (data==0) {
							var s = "<p>未查看<p>";

						}else{
							var s = "<p style='color: green'>已查看<p>"
						}
						return s;

					}
				},
				{
					"data":"applyTime",
					"bSort": true
				},
				{
					"data":"applicantID",
					render:function(data,type,row){
					return  "<button class='btn btn-default btn-xs' onclick='$.setInfo(" + JSON.stringify(row) + ")'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span> 设置已阅</button>" +
					"<button class='btn btn-default btn-xs' onclick='$.openMsg(" + data + ")'><span class='glyphicon glyphicon-zoom-in aria-hidden='true'></span> 查看简历</button>";
					}
				}
				],
				columnDefs:[{
			                 orderable:false,//禁用排序
			                 targets:[0,2,3,5]   //指定的列
			             }]

			});
			yingpinDT.on('order.dt search.dt',
			function() {
			    yingpinDT.column(0, {	
			        "search": 'applied',
			        "order": 'applied'
			    }).nodes().each(function(cell, i) {
			        cell.innerHTML = i + 1;
			    });
			}).draw();
		$('#searchRecruitmentMsg').show();

		}		
		

	});




	//--------------------------------------------------------------应聘信息结束
	//----------------------------修改招聘信息开始
	$('#changeRecruitment').click(function(){
		
		if (companyInfo == null || companyInfo.companyStatus !=1) {
			bootbox.alert({
				title : "提示信息",
				message : "企业未注册或未审核通过，通过后才能修改招聘信息！",
				buttons : {
					ok : {
						label : "确定"
					}
				}
			});
		}else{
			$('.sideTitle').hide();
			var companyId ={
				'companyID':companyInfo.companyID
			}



			mainDT = $('#mainDT').DataTable({
				ajax:{
					url : SERVERURL + "/recruitment/getRecruitmentList",
					data:companyId,
					type : "POST"
				},
				pageLength: 5,
				"bRetrieve": true,
				"bSort": false,
				"pagingType":"full_numbers",
				"destroy": true,
				"autoWidth": true,
				 "bJQueryUI": false, 
				columns:[{
					"data":null,
					"targets" : 0,


				},
				{
					"data":"recruitmentPosition"
				},
				{
					"data":"recruitmentInfo"
				},
				{
					"data":"recruitmentID",
					render:function(data,type,row){
					return "<button class='btn btn-default btn-xs' onclick='$.editInfo(" + JSON.stringify(row) + ")'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span> 编辑</button>" +
					"<button class='btn btn-default btn-xs' onclick='$.delMsg(" + data + ")'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span> 删除</button>";
					}
				}
				]

			});
			mainDT.on('order.dt search.dt',
			function() {
			    mainDT.column(0, {	
			        "search": 'applied',
			        "order": 'applied'
			    }).nodes().each(function(cell, i) {
			        cell.innerHTML = i + 1;
			    });
			}).draw();
			$('#changeRecruitmentMsg').show();
		}








	});
	





	//修改招聘信息结束----------------------
	$('#company').click(function(){


		$('.sideTitle').hide();
		var memberId ={
			'memberID':loginInfo.memberID
		}
		
		$("input[name='memberID']").val(loginInfo.memberID);
		$.ajax({
			url : SERVERURL + '/company/getCompany',
			type : 'post',
			data : memberId,
			dataType : 'json',
			success: function(msg){
				if (msg.isSuccess==true) {
					if (msg.data==null) {
						bootbox.alert({
							title:'提示信息',
							message:'企业未认证，请填写企业信息',
							buttons:{
								ok:{
									label:'确定'
								}
								
							},
							callback:function(){
								$('#companyMsg').show();
								$("input[name='companyName']").attr("readonly",false);
								$("input[name='companyCode']").attr("readonly",false);
								$("input[name='companyPhone']").attr("readonly",false);
								$("input[name='companyEmail']").attr("readonly",false);
								$("input[name='companyAdmin']").attr("readonly",false);
								$("input[name='adminCard']").attr("readonly",false);
								$("input[name='companyImage']").attr("disabled",false);
								$(".companyStatusDiv").hide();
								$("input[name='companyStatus']").val(0);
								$("button[name='companySubmit']").show();

							}
							
						});


					}else{
						var status;
						if(msg.data.companyStatus==0){
							status = '审核中........';

						}else if (msg.data.companyStatus==1) {
							status = '审核通过';
						}else{
							status = '审核未通过';
						}
						$('#companyMsg').show();
						$("input[name='companyName']").attr("readonly",true);
						$("input[name='companyCode']").attr("readonly",true);
						$("input[name='companyPhone']").attr("readonly",true);
						$("input[name='companyEmail']").attr("readonly",true);
						$("input[name='companyAdmin']").attr("readonly",true);
						$("input[name='adminCard']").attr("readonly",true);
						$("input[name='companyImage']").attr("disabled",true);
						$("input[name='companyImage']").hide();
						$("input[name='companyStatus']").attr("readonly",true);
						$("input[name='companyName']").val(msg.data.companyName);
						$("input[name='companyCode']").val(msg.data.companyCode);
						$("input[name='companyPhone']").val(msg.data.companyPhone);
						$("input[name='companyEmail']").val(msg.data.companyEmail);
						$("input[name='companyAdmin']").val(msg.data.companyAdmin);
						$("input[name='adminCard']").val(msg.data.adminCard);
						$("input[name='companyImage']").val(msg.data.companyImage);
						$("input[name='companyStatus']").val(status);
						$("button[name='companySubmit']").hide();
						companyInfo=msg.data;


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






	$("#changePWD_form").bootstrapValidator({
		message:'This value is not valid',
		feedbackIcons:{
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
         	validating: 'glyphicon glyphicon-refresh'
		},
		fields:{
			oldpwd:{
				message:'密码验证失败',
				validators:{
					notEmpty:{
						message:'密码不能为空'
					},
					stringLength:{
										
						min:6,
						max:20,
						message:'密码长度必须再6到20位之间'					
					}
				}

			},
			
			newpwd:{
				message:'密码验证失败',
				validators:{
					notEmpty:{
						message:'密码不能为空'
					},
					stringLength:{
										
						min:6,
						max:20,
						message:'密码长度必须再6到20位之间'					
					}
				}

			},
			'newpwd1':{
				message:'密码确认失败',
				validators:{
					notEmpty:{
						message:'确认密码不能为空'
					},
					identical:{
						field:'newpwd',
						message:'两次输入密码不一致'
					}
				}


			}

		}
	}).on('success.form.bv',function(e){
		loginInfo.loginPwd = $("#newPwd").val();
		loginInfo.oldPwd = $("#oldPwd").val();
		
		e.preventDefault();
		var $form = $(e.target);
		$.ajax({
			url : SERVERURL + '/user/changepwd',
			type : 'post',
			data : loginInfo,
			dataType : 'json',
			success: function(msg){
				if(msg.isSuccess == true){
					if(msg.data=="error"){
						bootbox.alert({
							title:'提示信息',
							message:'对不起，密码修改失败',
							buttons:{
								ok:{
									label:'确定'
								}
								
							},
							callback:function(){
								$('#changePWD_form').bootstrapValidator('disableSubmitButtons', false).bootstrapValidator('resetForm', true);
							}
							
						});
//						$('#myAlert').fadeIn();
						
						
					}else if(msg.data=="pwderror"){
						
							bootbox.alert({
								title:'提示信息',
								message:'对不起，原密码错误',
								buttons:{
									ok:{
										label:'确定'
									}
									
								},
								callback:function(){
									$('#changePWD_form').bootstrapValidator('disableSubmitButtons', false).bootstrapValidator('resetForm', true);
								}
								
							});
				
					
				}
					else{

					
						
						if(msg.data=="success"){
							bootbox.alert({
								title:'提示信息',
								message:'你好，密码修改成功请重新登录',
								buttons:{
									ok:{
										label:'确定'
									}
									
								},
								callback:function(){
									$('#changePWD_form').bootstrapValidator('disableSubmitButtons', false).bootstrapValidator('resetForm', true);
									userExit();
								}
								
							});
							

						

					}
					
				}}
					else {
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

	$('#companySubmit').click(function(){

		var formContent = $('#companyMsgForm').serialize();
		formContent  = decodeURIComponent(formContent ,true);
		
		$.ajax({
			url : SERVERURL + '/company/insertCompany',
			type : 'post',
			data:{
				
				'memberID':loginInfo.memberID

			},
			data:formContent,
			dataType : 'json',
			success: function(msg){
				if (msg.isSuccess==true) {
					if (msg.data==null) {
						bootbox.alert({
							title : "提示信息",
							message : "提交失败！",
							buttons : {
								ok : {
									label : "确定"
								}
							}
						});

					}else{
						bootbox.alert({
							title : "提示信息",
							message : "提交成功！",
							buttons : {
								ok : {
									label : "确定"
								}
							},
							callback:function(){
								$('#company').click();
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
	$('#recruitment').click(function(){

		if (companyInfo == null || companyInfo.companyStatus !=1 ) {
				bootbox.alert({
					title : "提示信息",
					message : "企业未注册或未审核通过，通过后才能发布招聘信息！",
					buttons : {
						ok : {
							label : "确定"
						}
					},
					callback:function(){
						$('#index').click();
					}
				});			
		}else{
			$('.sideTitle').hide();
			$('#recruitmentMsg').show();

			$("input[name='companyID']").val(companyInfo.companyID);

		}

	});
	$('#recruitmentSubmitButton').click(function(){
		var formContent = $('#recruitmentForm').serialize();
		formContent  = decodeURIComponent(formContent ,true);
		
		$.ajax({
			url : SERVERURL + '/recruitment/insertRecruitment',
			type : 'post',
			data:formContent,
			dataType : 'json',
			success: function(msg){
				if (msg.isSuccess==true) {
					if (msg.data==null) {
						bootbox.alert({
							title : "提示信息",
							message : "发布失败！",
							buttons : {
								ok : {
									label : "确定"
								}
							}
						});

					}else{
						bootbox.alert({
							title : "提示信息",
							message : "发布成功！",
							buttons : {
								ok : {
									label : "确定"
								}
							}
						});
						mainDT.ajax.reload(null, false);
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

//-------------------------------------初始化上传组件
 // Initialize the widget when the DOM is ready
    var uploader = $("#uploader").pluploadQueue({
      // General settings
      runtimes: 'html5,flash,silverlight,html4',
      url: "http://localhost:8080/jobsite/picture/uploadFile?memberID="+loginInfo.memberID,

      // Maximum file size
      max_file_size: '50mb',

      chunk_size: '1mb',

      // Resize images on clientside if we can
      resize: {
        width: 200,
        height: 200,
        quality: 90,
        crop: true // crop to exact dimensions
      },

      // Specify what files to browse for
      filters: [
        {title: "Image files", extensions: "jpg,gif,png"},
        {title: "Vedio files", extensions: "mp4,mkv"},
        {title: "Zip files", extensions: "zip,avi"}
      ],

      // Rename files by clicking on their titles
      rename: true,

      // Sort files
      sortable: true,

      // Enable ability to drag'n'drop files onto the widget (currently only HTML5 supports that)
      dragdrop: true,

      // Views to activate
      views: {
        list: true,
        thumbs: true, // Show thumbs
        active: 'thumbs'
      },

      // Flash settings
      flash_swf_url: '../../front-plugin/plupload-2.2.1/Moxie.swf',

      // Silverlight settings
      silverlight_xap_url: '../../front-plugin/plupload-2.2.1/Moxie.xap'
    });


	$('.carousel').carousel({
	  interval: false
	});
});
function initMsg(){
	if(loginInfo.memberType==0){
		var type = "管理员";
	}else if(loginInfo.memberType==1){
		var type = "求职者";
	}else{
		var type = "企业管理员";
	}
	$("input[name='nameMsg']").val(loginInfo.loginName);
	$("input[name='emailMsg']").val(loginInfo.memberEmail);
	$("input[name='memberTypeMsg']").val(type);
	$("input[name='registerTimeMsg']").val(loginInfo.registerTime);
	
	
}
$.editInfo = function(data){
	$("#myModal").attr("data-targetId",data.recruitmentID);
	$("#templateModalLabel").text("编辑招聘信息");
	$("input[name='targetName']").val(data.recruitmentPosition);
	$("textarea[name='recruitmentInfo1']").val(data.recruitmentInfo);
	$("#templateModal").modal({
		backdrop : 'static',
		keyboard : false,
		show : true
	});	
}
$.delMsg = function(targetId){
bootbox.confirm({  
        buttons: {  
            confirm: {  
                label: '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span> 确认',  
                className: 'btn btn-success'  
            },  
            cancel: {  
                label: '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span> 取消',  
                className: 'btn btn-primary'  
            }  
        },  
        message: '确定删除该招聘信息？',  
        callback: function(result) {  
            if(result) {  
            	$.ajax({
            		url : SERVERURL + '/recruitment/delRecruitment',
            		type : 'post',
            		dataType : 'json',
            		data : {
            			"recruitmentID" : targetId,

            		},
            		success : function(data) {
            		
            			if (data.isSuccess == true) {
            				mainDT.ajax.reload(null, false);
            				$.alert("删除成功！");
            			} else
            				$.alert("删除失败！");
            				
            		}
            	});
            }
        },  
        title: "确认信息",  
	});
}
$.closeDefaultModel = function(obj) {
	 obj.modal("hide");
};
$.saveMsg = function(){

	$.ajax({
		url : SERVERURL + '/recruitment/saveRecruitment',
		type : 'post',
		dataType : 'json',
		data : {
			"recruitmentID" : $("#myModal").attr("data-targetId"),
			"recruitmentPosition" : $("input[name='targetName']").val(),
			"recruitmentInfo" : $('#recruitmentInfo1').val(),
		
		},
		success : function(data) {
			if (data.isSuccess == true) {
				mainDT.ajax.reload(null, false);
				$.alert("操作成功！");
			} else{
				$.alert("系统错误！");
			}
			$.closeDefaultModel($("#templateModal"));
		}
	});	
};
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

$.delInfo = function(data){
bootbox.confirm({  
        buttons: {  
            confirm: {  
                label: '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span> 确认',  
                className: 'btn btn-success'  
            },  
            cancel: {  
                label: '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span> 取消',  
                className: 'btn btn-primary'  
            }  
        },  
        message: '确定删除该投递记录？',  
        callback: function(result) {  
            if(result) {  

            	$.ajax({
            		url : SERVERURL + '/info/delInfo',
            		type : 'post',
            		dataType : 'json',
            		data : {
            			"recruitmentID" : data.recruitmentID,
            			"applicantID":data.applicantID

            		},
            		success : function(data) {
            		
            			if (data.isSuccess == true) {
            				jianliDT.ajax.reload(null, false);
            				$.alert("删除成功！");
            			} else
            				$.alert("删除失败！");
            				
            		}
            	});
            }
        },  
        title: "确认信息",  
	});	
}

$.setInfo = function(data){
bootbox.confirm({  
        buttons: {  
            confirm: {  
                label: '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span> 确认',  
                className: 'btn btn-success'  
            },  
            cancel: {  
                label: '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span> 取消',  
                className: 'btn btn-primary'  
            }  
        },  
        message: '确定设置此简历为已阅读？',  
        callback: function(result) {  
            if(result) {  

            	$.ajax({
            		url : SERVERURL + '/info/setInfo',
            		type : 'post',
            		dataType : 'json',
            		data : {
            			"recruitmentID" : data.recruitmentID,
            			"applicantID":data.applicantID

            		},
            		success : function(data) {
            		
            			if (data.isSuccess == true) {
            				yingpinDT.ajax.reload(null, false);
            				$.alert("设置成功！");
            			} else
            				$.alert("设置失败！");
            				
            		}
            	});
            }
        },  
        title: "确认信息",  
	});	


}
$.openMsg = function(data){

	window.open("applicant.html?applicantID="+ data);

}
$.setReview = function(data){
bootbox.confirm({  
        buttons: {  
            confirm: {  
                label: '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span> 确认',  
                className: 'btn btn-success'  
            },  
            cancel: {  
                label: '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span> 取消',  
                className: 'btn btn-primary'  
            }  
        },  
        message: '确定设置此公司通过审核？',  
        callback: function(result) {  
            if(result) {  

            	$.ajax({
            		url : SERVERURL + '/company/setReviewPass',
            		type : 'post',
            		dataType : 'json',
            		data : {
            			"companyID" : data,
            			

            		},
            		success : function(data) {
            		
            			if (data.isSuccess == true) {
            				reviewDT.ajax.reload(null, false);
            				if (manageDT!=undefined) {
            					manageDT.ajax.reload(null, false);
            				}
            				$.alert("设置审核通过成功！");
            			} else
            				$.alert("设置失败！");
            				
            		}
            	});
            }
        },  
        title: "确认信息",  
	});		

}
$.companyManage = function(data){

	$("#myCompanyModal").attr("data-targetId",data.companyID);
	$("#companyModalLabel").text("编辑公司信息");
	$('#companyNameA').val(data.companyName);
	$('#companyCodeA').val(data.companyCode);
	$('#companyPhoneA').val(data.companyPhone);
	$('#companyEmailA').val(data.companyEmail);
	$('#companyAdminA').val(data.companyAdmin);
	$('#adminCardA').val(data.adminCard);
	$('#companyImageA').val(data.companyImage);
	$('#companyStatusA').val(data.companyStatus);

	$("#companyModal").modal({
		backdrop : 'static',
		keyboard : false,
		show : true
	});



}

$.saveCompanyMsg = function(){
	
	$.ajax({
		url : SERVERURL + '/company/updateCompany',
            		type : 'post',
            		dataType : 'json',
            		data:{
            			"companyID":$("#myCompanyModal").attr("data-targetId"),
            			"companyName":$('#companyNameA').val(),
            			"companyCode":$('#companyCodeA').val(),
            			"companyPhone":$('#companyPhoneA').val(),
            			"companyEmail":$('#companyEmailA').val(),
            			"companyAdmin":$('#companyAdminA').val(),
            			"adminCard":$('#adminCardA').val(),
            			"companyImage":$('#companyImageA').val(),
            			"companyStatus":$('#companyStatusA').val()
            		},
            		success:function(data){
			if (data.isSuccess == true) {
				manageDT.ajax.reload(null, false);
				if (reviewDT!=undefined) {
					reviewDT.ajax.reload(null, false);
				}
				$.alert("操作成功！");
			} else{
				$.alert("系统错误！");
			}
			$.closeDefaultModel($("#companyModal"));

            		}




	});




}
$.lookImage = function(data){
	$.ajax({
		url : SERVERURL + '/picture/getURLList',
            		type : 'post',
            		dataType : 'json',
            		data:{
            			"companyID":data.companyID
            		},
            		success:function(msg){
            			if (msg.isSuccess==true) {
            				if (msg.data == null) {
					bootbox.alert({
						title : "提示信息",
						message : "图片加载错误！",
						buttons : {
							ok : {
								label : "确定"
							}
						}
					});
            				}else{
            					var i;
            					$('.carousel-indicators').html('');
            					for(i=0;i < msg.data.length; i++){
            						if (i==0) {
							$('.carousel-indicators').append('<li data-target="#carousel-example-generic" data-slide-to="'+i+'" class="active"></li>');
            						}else{
            							$('.carousel-indicators').append('<li data-target="#carousel-example-generic" data-slide-to="'+i+'"></li>');					
            						}
            						

            					}
            					$('.carousel-inner').html('');
            					for (i=0; i < msg.data.length; i++) {
            						if (i==0) {
            							
            							$('.carousel-inner').append('<div class="item active"> \
							<img src="'+SERVERURL+msg.data[i]+'" width="94%">\
		  					</div>');
            						}else{
            							$('.carousel-inner').append('<div class="item"> \
							<img src="'+SERVERURL+msg.data[i]+'" width="94%">\
		  					</div>');		
            						}
            						$('.carousel-inner').append('<a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">\
						<span class="glyphicon glyphicon-chevron-left"></span>\
			 			<span class="sr-only">Previous</span> </a>\
						<a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">\
			 			<span class="glyphicon glyphicon-chevron-right"></span>\
						<span class="sr-only">Next</span></a>')
            						
            					}

            					









            				}

            			}else{
 				bootbox.alert({
					title : "提示信息",
					message : "系统错误，请与系统管理员联系！！",
					buttons : {
						ok : {
							label : "确定"
						}
					}
				});           				
            			}


            		}

	});





	$("#picturesModal").modal();	
}