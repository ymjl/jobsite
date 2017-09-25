package com.nit.jobsite.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nit.jobsite.dto.AjaxMsgDto;
import com.nit.jobsite.model.Member;
import com.nit.jobsite.service.UserService;


@Controller
@RequestMapping("/user")
public class UserController {
	
	@Resource
	private UserService userService;
	
	@RequestMapping(value = "/userlogin", method = RequestMethod.POST)
	@ResponseBody
	public AjaxMsgDto userLogin(String username, String password){
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		try{
			ajaxMsgDto = userService.loginCheck(username, password);
		}catch (Exception e) {
            e.printStackTrace();
        }
		
		
		System.out.println(ajaxMsgDto.getData());
		
		
		
		return ajaxMsgDto;
			
		
	}

	@RequestMapping(value = "/userregister", method = RequestMethod.POST)
	@ResponseBody
	public AjaxMsgDto userRegister(String username,String email, String password,Integer memberType ){
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		try{
			ajaxMsgDto = userService.userRegister(username, email, password, memberType);
		}catch (Exception e) {
            e.printStackTrace();
        }
		
		
		System.out.println(ajaxMsgDto.getData());
		
		
		
		return ajaxMsgDto;
			
		
	}
	
	
	@RequestMapping(value = "/changepwd", method = RequestMethod.POST)
	@ResponseBody
	public AjaxMsgDto userRegister(Integer memberID, String loginName, String loginPwd, String memberEmail, Integer memberType, String registerTime, String oldPwd){
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		Member member = new Member(memberID,loginName,loginPwd, memberEmail,memberType,registerTime);
		System.out.println(loginName + "----------" + oldPwd);
		try{
			ajaxMsgDto = userService.changePWD(member,oldPwd);
		}catch (Exception e) {
            e.printStackTrace();
        }
		
		
		System.out.println(ajaxMsgDto.getData());
		
		
		
		return ajaxMsgDto;
			
		
	}
	
	
	

}
