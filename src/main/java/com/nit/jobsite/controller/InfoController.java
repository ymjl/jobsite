package com.nit.jobsite.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nit.jobsite.dto.AjaxMsgDto;
import com.nit.jobsite.model.Info;
import com.nit.jobsite.model.InfoKey;
import com.nit.jobsite.service.InfoService;

@Controller
@RequestMapping("/info")
public class InfoController {
	@Resource 
	InfoService infoService;
	
	@RequestMapping(value = "/insertInfo", method = RequestMethod.POST)
	@ResponseBody	
	public AjaxMsgDto insertInfo(Info info){
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		try{
			ajaxMsgDto = infoService.insertInfo(info);
			
		}catch (Exception e) {
            e.printStackTrace();
        }
		System.out.println(ajaxMsgDto.getData());
		return ajaxMsgDto;	
	}
	
	@RequestMapping(value = "/delInfo", method = RequestMethod.POST)
	@ResponseBody	
	public AjaxMsgDto delInfo(InfoKey infoKey){
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		try{
			ajaxMsgDto = infoService.delInfo(infoKey);
			
		}catch (Exception e) {
            e.printStackTrace();
        }
		System.out.println(ajaxMsgDto.getData());
		return ajaxMsgDto;	
	}
	@RequestMapping(value = "/setInfo", method = RequestMethod.POST)
	@ResponseBody	
	public AjaxMsgDto setInfo(InfoKey infoKey){
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		try{
			ajaxMsgDto = infoService.setInfo(infoKey);
			
		}catch (Exception e) {
            e.printStackTrace();
        }
		System.out.println(ajaxMsgDto.getData());
		return ajaxMsgDto;	
	}
	
	

}
