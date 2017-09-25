package com.nit.jobsite.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.nit.jobsite.dao.ApplicantMapper;
import com.nit.jobsite.dto.AjaxMsgDto;
import com.nit.jobsite.dto.ApplicantMsgDataTable;
import com.nit.jobsite.dto.ApplicantMsgDto;
import com.nit.jobsite.model.Applicant;
import com.nit.jobsite.utils.HttpServletUtil;

@Service
public class ApplicantService {
	@Resource
	private ApplicantMapper applicantDao;
	@Resource
	HttpServletUtil httpservletUtil;
	
	public AjaxMsgDto getApplicantName(Integer memberID){
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		List<String> applicantNameList = applicantDao.getApplicantNameList(memberID);
		if(applicantNameList.isEmpty()){
			ajaxMsgDto.setData(null);
			ajaxMsgDto.setIsSuccess(true);	
		}else{
			ajaxMsgDto.setData(applicantNameList);
			ajaxMsgDto.setIsSuccess(true);	
		}

		return ajaxMsgDto;
		
	}
	
	public AjaxMsgDto insertApplicantName(String name, Integer memberID){
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		String getName = applicantDao.checkApplicantName(name,memberID);
		if(getName == null){
			Integer result = applicantDao.insertApplicantName(name, memberID);
			if(result == null){
				ajaxMsgDto.setData(null);
				ajaxMsgDto.setIsSuccess(true);	
			}else{
				ajaxMsgDto.setData("success");
				ajaxMsgDto.setIsSuccess(true);	
			}			
		}else{
			ajaxMsgDto.setData(null);
			ajaxMsgDto.setIsSuccess(true);
		}
		
		


		return ajaxMsgDto;
		
	}
	
	public AjaxMsgDto getApplicant(String name, Integer memberID){
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		Applicant applicant = applicantDao.getApplicantData(name, memberID);
		System.out.println("----" + name);
		if(applicant==null){
			ajaxMsgDto.setData(null);
			ajaxMsgDto.setIsSuccess(true);	
		}else{
			ajaxMsgDto.setData(applicant);
			ajaxMsgDto.setIsSuccess(true);	
		}

		return ajaxMsgDto;
		
	}
	public AjaxMsgDto saveApplicant(Applicant applicant){
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		Integer result = applicantDao.updateByPrimaryKeySelective(applicant);

		if(result==null){
			ajaxMsgDto.setData(null);
			ajaxMsgDto.setIsSuccess(true);	
		}else{
			ajaxMsgDto.setData("success");
			ajaxMsgDto.setIsSuccess(true);	
		}

		return ajaxMsgDto;
		
	}	
	public AjaxMsgDto deleteApplicant(Integer applicantID){
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		Integer result = applicantDao.deleteByPrimaryKey(applicantID);

		if(result==null){
			ajaxMsgDto.setData(null);
			ajaxMsgDto.setIsSuccess(true);	
		}else{
			ajaxMsgDto.setData("success");
			ajaxMsgDto.setIsSuccess(true);	
		}

		return ajaxMsgDto;
		
	}	
	
	public AjaxMsgDto getApplicantMsg(Integer memberID){
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		List<ApplicantMsgDto> applicantMsgList = applicantDao.getApplicantMsgList(memberID);
		if(applicantMsgList.isEmpty()){
			ajaxMsgDto.setData(null);
			ajaxMsgDto.setIsSuccess(true);	
		}else{
			ajaxMsgDto.setData(applicantMsgList);
			ajaxMsgDto.setIsSuccess(true);	
		}

		return ajaxMsgDto;
		
	}
	
	public AjaxMsgDto getApplicantDataTable(Integer memberID){
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		List<ApplicantMsgDataTable> applicantMsgList = applicantDao.getApplicantDatatable(memberID);
		if(applicantMsgList.isEmpty()){
			ajaxMsgDto.setData(null);
			ajaxMsgDto.setIsSuccess(true);	
		}else{
			ajaxMsgDto.setData(applicantMsgList);
			ajaxMsgDto.setIsSuccess(true);	
		}

		return ajaxMsgDto;
		
	}
	public AjaxMsgDto getRecruitmentDataTable(Integer companyID){
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		List<ApplicantMsgDataTable> applicantMsgList = applicantDao.getRecruitmentDatatable(companyID);
		if(applicantMsgList.isEmpty()){
			ajaxMsgDto.setData(null);
			ajaxMsgDto.setIsSuccess(true);	
		}else{
			ajaxMsgDto.setData(applicantMsgList);
			ajaxMsgDto.setIsSuccess(true);	
		}

		return ajaxMsgDto;
		
	}
	
	public AjaxMsgDto getApplicantInfo(){
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		Integer applicantID = Integer.parseInt(httpservletUtil.getRequest().getParameter("applicantID"));
		Applicant applicant = applicantDao.selectByPrimaryKey(applicantID);
	
		if(applicant==null){
			ajaxMsgDto.setData(null);
			ajaxMsgDto.setIsSuccess(true);	
		}else{
			ajaxMsgDto.setData(applicant);
			ajaxMsgDto.setIsSuccess(true);	
		}

		return ajaxMsgDto;
		
	}
}
