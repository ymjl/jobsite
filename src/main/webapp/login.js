$(function() {
	var SERVERURL = "http://localhost:8080/jobsite";
	if ((localStorage.loginName != null) && (localStorage.loginPwd != null)) {
		$("#username").val(localStorage.loginName);
		$("#password").val(localStorage.loginPwd);
		
 		
 	}	
 	$('#register').click(function() {
		$('.logincnt').modal();
		$('#register-form-link').click();
		
	});
	$('#login').click(function() {
		$('.logincnt').modal();
		$('#login-form-link').click();
		
	});
 	$('#login-form-link').click(function() {

		$("#login-form").delay(1).fadeIn(1);
 		$("#register-form").fadeOut(1);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
	});
	$('#register-form-link').click(function() {
		$("#register-form").delay(1).fadeIn(1);
 		$("#login-form").fadeOut(10);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
	});
	

	$("#login-form").bootstrapValidator({
		message:'This value is not valid',
		feedbackIcons:{
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
		},
		fields:{
			username:{
				message:'用户名验证失败',
				validators:{
					notEmpty:{
						message:'用户名不能为空'
					},
					stringLength:{
										
						min:5,
						max:20,
						message:'用户名长度必须再5到20位之间'					
					},
					regexp:{
						regexp: /^[a-zA-Z0-9_]+$/,
						message:'用户名只能包含大写、小写、数字和下划线'
					}


				}
			},
			password:{
				message:'密码不能为空',
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

			}
		}
	}).on('success.form.bv',function(e){
		
		e.preventDefault();
		var $form = $(e.target);
		$.ajax({
			url : SERVERURL + '/user/userlogin',
			type : 'post',
			data : $form.serialize(),
			dataType : 'json',
			success: function(msg){
				if(msg.isSuccess == true){
					if(msg.data==null){
						bootbox.alert({
							title:'提示信息',
							message:'对不起，用户名或密码错误',
							buttons:{
								ok:{
									label:'确定'
								}
								
							},
							callback:function(){
								$('#login-form').bootstrapValidator('disableSubmitButtons', false).bootstrapValidator('resetForm', true);
							}
							
						});
//						$('#myAlert').fadeIn();
						
						
					}else{

						if($('#remember').is(':checked')==true){
							localStorage.loginName = $("#username").val();
							localStorage.loginPwd = $("#password").val();
						}
						sessionStorage.loginInfo = JSON.stringify(msg.data);
						$('#login-form').bootstrapValidator('disableSubmitButtons', false).bootstrapValidator('resetForm', true);
						$('.logincnt').modal('hide');
						

						$('#menu_right').html('<li role="presentation"><a  id = "menu_name" href="#" onclick="loadSystem()">' + msg.data.loginName +'</a></li><li role="presentation"><a  id = "menu_exit" href="#" onclick="userExit()" >退出&nbsp;<span class="glyphicon glyphicon-log-out">&nbsp;&nbsp;&nbsp;</span></a></li>');

					}
					
				}else {
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
	$("#register-form").bootstrapValidator({
		message:'This value is not valid',
		feedbackIcons:{
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
		},
		fields:{
			username:{
				message:'用户名验证失败',
				validators:{
					notEmpty:{
						message:'用户名不能为空'
					},
					stringLength:{
										
						min:5,
						max:20,
						message:'用户名长度必须再5到20位之间'					
					},
					regexp:{
						regexp: /^[a-zA-Z0-9_]+$/,
						message:'用户名只能包含大写、小写、数字和下划线'
					}



				}


			},
			email:{
				message:'邮箱验证失败',

				validators:{
					notEmpty:{
						message:'邮箱不能为空'

					},
					emailAddress:{
						message:'邮箱格式有误'
					}

				}

			},
			password:{
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
			'confirm-password':{
				message:'密码确认失败',
				validators:{
					notEmpty:{
						message:'确认密码不能为空'
					},
					identical:{
						field:'password',
						message:'两次输入密码不一致'
					}
				}


			}

		}
	}).on('success.form.bv',function(e){
		
		e.preventDefault();
		var $form = $(e.target);
		$.ajax({
			url : SERVERURL + '/user/userregister',
			type : 'post',
			data : $form.serialize(),
			dataType : 'json',
			success: function(msg){
				if(msg.isSuccess == true){
					if(msg.data==null){
						bootbox.alert({
							title:'提示信息',
							message:'对不起，用户名已使用',
							buttons:{
								ok:{
									label:'确定'
								}
								
							}
							
						});
//						$('#myAlert').fadeIn();
						
						$('#register-form').bootstrapValidator('disableSubmitButtons', false).bootstrapValidator('resetForm', true);
					}else{

						$('#register-form').bootstrapValidator('disableSubmitButtons', false).bootstrapValidator('resetForm', true);
						$('.logincnt').modal('hide');
						alert('你好！！注册成功');

						

					}
					
				}else {
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









});

function initUser(){

	$('#menu_right').html('<li role="presentation"><a  id = "menu_name" href="#" onclick="loadSystem()">' + loginInfo.loginName +'</a></li><li role="presentation"><a  id = "menu_exit" href="#" onclick="userExit()">退出&nbsp;<span class="glyphicon glyphicon-log-out">&nbsp;&nbsp;&nbsp;</span></a></li>');

	
}
function initMenu(){
		

	$('#menu_right').html('<li role="presentation"><a id = "register" href="#"  onclick="userRegister()">注册&nbsp;<span class="glyphicon glyphicon-user"></span></a></li><li role="presentation"><a id="login" href="#" onclick="userLogin()">登录&nbsp;<span class="glyphicon glyphicon-log-in">&nbsp;&nbsp;&nbsp;</span></a></li>');
	

	
}
function userRegister(){
	$('.logincnt').modal();
	$('#register-form-link').click();
}
function userLogin(){
	$('.logincnt').modal();
	$('#login-form-link').click();
}
function userExit(){
	sessionStorage.loginInfo =undefined;

	initMenu();
	window.location.href=SERVERURL+ "/index.html";
}
function loadSystem(){
	

	window.location.href="001pages/manage/manage.html";
	
	

}

 	 	


