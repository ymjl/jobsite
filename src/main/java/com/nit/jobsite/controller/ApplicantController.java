package com.nit.jobsite.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nit.jobsite.dto.AjaxMsgDto;
import com.nit.jobsite.model.Applicant;
import com.nit.jobsite.service.ApplicantService;



@Controller
@RequestMapping("/applicant")
public class ApplicantController {
	@Resource
	private ApplicantService applicantService;

	
	@RequestMapping(value = "/getApplicantName", method = RequestMethod.POST)
	@ResponseBody
	public AjaxMsgDto getApplicantName(Integer memberID){
		
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		try{
			ajaxMsgDto = applicantService.getApplicantName(memberID);
		}catch (Exception e) {
            e.printStackTrace();
        }
		
		
		System.out.println(ajaxMsgDto.getData());
		
		
		
		return ajaxMsgDto;
	}
	
	
	@RequestMapping(value = "/insertApplicantName", method = RequestMethod.POST)
	@ResponseBody
	public AjaxMsgDto insertApplicantName(String name, Integer memberID){
		
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		try{
			ajaxMsgDto = applicantService.insertApplicantName(name,memberID);
		}catch (Exception e) {
            e.printStackTrace();
        }
		
		
		System.out.println(ajaxMsgDto.getData());
		
		
		
		return ajaxMsgDto;
	}
	//此处方法去掉Name
	@RequestMapping(value = "/getApplicant", method = RequestMethod.POST)
	@ResponseBody
	public AjaxMsgDto getApplicant(String applicantName, Integer memberID){
		
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		try{
			ajaxMsgDto = applicantService.getApplicant(applicantName, memberID);
		}catch (Exception e) {
            e.printStackTrace();
        }
		
		
		System.out.println(ajaxMsgDto.getData());
		
		
		
		return ajaxMsgDto;
	}
	@RequestMapping(value = "/saveApplicant", method = RequestMethod.POST)
	@ResponseBody
	public AjaxMsgDto saveApplicant(Applicant applicant){
		
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		try{
			ajaxMsgDto = applicantService.saveApplicant(applicant);
		}catch (Exception e) {
            e.printStackTrace();
        }
		
		
		System.out.println(ajaxMsgDto.getData());
		
		
		
		return ajaxMsgDto;
	}	
	@RequestMapping(value = "/deleteApplicant", method = RequestMethod.POST)
	@ResponseBody
	public AjaxMsgDto deleteApplicant(Integer applicantID){
		
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		try{
			ajaxMsgDto = applicantService.deleteApplicant(applicantID);
		}catch (Exception e) {
            e.printStackTrace();
        }
		
		
		System.out.println(ajaxMsgDto.getData());
		
		
		
		return ajaxMsgDto;
	}	
	
	
	@RequestMapping(value = "/getApplicantMsg", method = RequestMethod.POST)
	@ResponseBody
	public AjaxMsgDto getApplicantMsg(Integer memberID){
		
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		try{
			ajaxMsgDto = applicantService.getApplicantMsg(memberID);
		}catch (Exception e) {
            e.printStackTrace();
        }
		
		
		System.out.println(ajaxMsgDto.getData());
		
		
		
		return ajaxMsgDto;
	}
	
	@RequestMapping(value = "/getApplicantDataTable", method = RequestMethod.POST)
	@ResponseBody
	public AjaxMsgDto getApplicantDataTable(Integer memberID){
		
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		try{
			ajaxMsgDto = applicantService.getApplicantDataTable(memberID);
		}catch (Exception e) {
            e.printStackTrace();
        }
		
		
		System.out.println(ajaxMsgDto.getData());
		
		
		
		return ajaxMsgDto;
	}
	@RequestMapping(value = "/getRecruitmentDataTable", method = RequestMethod.POST)
	@ResponseBody
	public AjaxMsgDto getRecruitmentDataTable(Integer companyID){
		
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		try{
			ajaxMsgDto = applicantService.getRecruitmentDataTable(companyID);
		}catch (Exception e) {
            e.printStackTrace();
        }
		
		
		System.out.println(ajaxMsgDto.getData());
		
		
		
		return ajaxMsgDto;
	}
	@RequestMapping(value = "/getApplicantInfo", method = RequestMethod.GET)
	@ResponseBody
	public AjaxMsgDto getApplicantName(){
		
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		try{
			ajaxMsgDto = applicantService.getApplicantInfo();
		}catch (Exception e) {
            e.printStackTrace();
        }
		
		
		System.out.println(ajaxMsgDto.getData());
		
		
		
		return ajaxMsgDto;
	}
}
