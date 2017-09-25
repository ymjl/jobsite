package com.nit.jobsite.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nit.jobsite.dto.AjaxMsgDto;
import com.nit.jobsite.model.Recruitment;
import com.nit.jobsite.service.RecruitmentService;
import com.nit.jobsite.service.SearchService;

@Controller
@RequestMapping("/recruitment")
public class RecruitmentController {
	@Resource
	private RecruitmentService recruitmentService;
	@Resource
	private SearchService searchService;
	@RequestMapping(value = "/insertRecruitment", method = RequestMethod.POST)
	@ResponseBody
	public AjaxMsgDto insertRecruitment(Recruitment recruitment){
		
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		try{
			ajaxMsgDto = recruitmentService.insertRecruitment(recruitment);
		}catch (Exception e) {
            e.printStackTrace();
        }
		
		
		
		
		
		
		return ajaxMsgDto;
	}	
	@RequestMapping(value = "/getRecruitmentMsgList", method = RequestMethod.POST)
	@ResponseBody
	public AjaxMsgDto getRecruitmentMsgList(){
		
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		try{
			ajaxMsgDto = searchService.getRecruitmentMsgList();
		}catch (Exception e) {
            e.printStackTrace();
        }
		
		
		
		
		
		return ajaxMsgDto;
	}		
	@RequestMapping(value = "/selectRecruitmentByPage", method = RequestMethod.GET)
	@ResponseBody
	public AjaxMsgDto selectRecruitmentByPage(){
		
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		try{
			ajaxMsgDto = searchService.selectRecruitmentByPage();
		}catch (Exception e) {
            e.printStackTrace();
        }
		
		
	
		
		
		
		return ajaxMsgDto;
	}	
	@RequestMapping(value = "/getRecruitmentList", method = RequestMethod.POST)
	@ResponseBody
	public AjaxMsgDto getRecruitmentList(Integer companyID){
		
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		try{
			ajaxMsgDto = recruitmentService.getRecruitmentList(companyID);
		}catch (Exception e) {
            e.printStackTrace();
        }
		
		
	
		
		
		
		return ajaxMsgDto;
	}	
	@RequestMapping(value = "/delRecruitment", method = RequestMethod.POST)
	@ResponseBody
	public AjaxMsgDto delRecruitment(Integer recruitmentID){
		
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		try{
			ajaxMsgDto = recruitmentService.delRecruitment(recruitmentID);
		}catch (Exception e) {
            e.printStackTrace();
        }
		
			
		
		return ajaxMsgDto;
	}	
	
	@RequestMapping(value = "/saveRecruitment", method = RequestMethod.POST)
	@ResponseBody
	public AjaxMsgDto saveRecruitment(Recruitment record){
		
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		try{
			ajaxMsgDto = recruitmentService.updateByPrimaryKeySelective(record);
		}catch (Exception e) {
            e.printStackTrace();
        }
		
			
		
		return ajaxMsgDto;
	}	

}
