package com.nit.jobsite.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.nit.jobsite.dao.CompanyMapper;
import com.nit.jobsite.dto.AjaxMsgDto;
import com.nit.jobsite.model.Company;


@Service
public class CompanyService {

	
	@Resource
	private CompanyMapper companyDao;
	
	
	public AjaxMsgDto getCompany(Integer memberID){
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		Integer result = companyDao.checkIsExist(memberID);

		if(result==null){
			ajaxMsgDto.setData(null);
			ajaxMsgDto.setIsSuccess(true);	
		}else{
			
			ajaxMsgDto.setData(companyDao.selectByPrimaryKey(result));
			ajaxMsgDto.setIsSuccess(true);	
		}

		return ajaxMsgDto;
		
	}	
	public AjaxMsgDto insertCompany(Company company){
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		Integer result = companyDao.insert(company);

		if(result==null){
			ajaxMsgDto.setData(null);
			ajaxMsgDto.setIsSuccess(true);	
		}else{
			
			ajaxMsgDto.setData("success");
			ajaxMsgDto.setIsSuccess(true);	
		}

		return ajaxMsgDto;
		
	}
	public AjaxMsgDto getCompanyByName(String companyName){
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		Company result = companyDao.getCompanyByName(companyName);

		if(result==null){
			ajaxMsgDto.setData(null);
			ajaxMsgDto.setIsSuccess(true);	
		}else{
			
			ajaxMsgDto.setData(result);
			ajaxMsgDto.setIsSuccess(true);	
		}

		return ajaxMsgDto;
		
	}
	public AjaxMsgDto getCompanyReviewList(){
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		List<Company> result = companyDao.getCompanyReviewList();

		if(result==null){
			ajaxMsgDto.setData(null);
			ajaxMsgDto.setIsSuccess(true);	
		}else{
			
			ajaxMsgDto.setData(result);
			ajaxMsgDto.setIsSuccess(true);	
		}

		return ajaxMsgDto;
		
	}
	public AjaxMsgDto getCompanyReviewListByStaus(){
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		List<Company> result = companyDao.getCompanyReviewListByStaus();

		if(result==null){
			ajaxMsgDto.setData(null);
			ajaxMsgDto.setIsSuccess(true);	
		}else{
			
			ajaxMsgDto.setData(result);
			ajaxMsgDto.setIsSuccess(true);	
		}

		return ajaxMsgDto;
		
	}
	
	public AjaxMsgDto setReviewPass(Integer companyID){
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		Integer result = companyDao.setReviewPass(companyID);

		if(result==null){
			ajaxMsgDto.setData(null);
			ajaxMsgDto.setIsSuccess(true);	
		}else{
			
			ajaxMsgDto.setData(result);
			ajaxMsgDto.setIsSuccess(true);	
		}

		return ajaxMsgDto;
		
	}
	public AjaxMsgDto updateCompany(Company company){
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		Integer result = companyDao.updateByPrimaryKeySelective(company);

		if(result==null){
			ajaxMsgDto.setData(null);
			ajaxMsgDto.setIsSuccess(true);	
		}else{
			
			ajaxMsgDto.setData(result);
			ajaxMsgDto.setIsSuccess(true);	
		}

		return ajaxMsgDto;
		
	}
	

}
