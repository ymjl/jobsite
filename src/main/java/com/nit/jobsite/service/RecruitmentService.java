package com.nit.jobsite.service;



import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.nit.jobsite.dao.RecruitmentMapper;
import com.nit.jobsite.dto.AjaxMsgDto;

import com.nit.jobsite.model.Recruitment;

@Service
public class RecruitmentService {
	@Resource
	RecruitmentMapper recruitmentDao;
	public AjaxMsgDto insertRecruitment(Recruitment recruitment){
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		Integer result = recruitmentDao.insertSelective(recruitment);
		if(result==null){
			ajaxMsgDto.setData(null);
			ajaxMsgDto.setIsSuccess(true);	
		}else{
			ajaxMsgDto.setData("success");
			ajaxMsgDto.setIsSuccess(true);	
		}

		return ajaxMsgDto;
	}
	
	
	public AjaxMsgDto getRecruitmentList(Integer companyID){
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		List<Recruitment> result = recruitmentDao.getRecruitmentList(companyID);
		

		ajaxMsgDto.setData(result);
		ajaxMsgDto.setIsSuccess(true);	


		return ajaxMsgDto;
	}
	public AjaxMsgDto delRecruitment(Integer recruitmentID){
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		Integer result = recruitmentDao.deleteByPrimaryKey(recruitmentID);
		if(result==null){
			ajaxMsgDto.setData(null);
			ajaxMsgDto.setIsSuccess(true);	
		}else{
			ajaxMsgDto.setData("success");
			ajaxMsgDto.setIsSuccess(true);	
		}		



		return ajaxMsgDto;
	}
	
	public AjaxMsgDto updateByPrimaryKeySelective(Recruitment record){
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		Integer result = recruitmentDao.updateByPrimaryKeySelective(record);
		if(result==null){
			ajaxMsgDto.setData(null);
			ajaxMsgDto.setIsSuccess(true);	
		}else{
			ajaxMsgDto.setData("success");
			ajaxMsgDto.setIsSuccess(true);	
		}		
		System.out.println(record);



		return ajaxMsgDto;
	}
}
