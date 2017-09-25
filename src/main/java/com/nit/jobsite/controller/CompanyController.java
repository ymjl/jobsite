package com.nit.jobsite.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nit.jobsite.dto.AjaxMsgDto;
import com.nit.jobsite.model.Company;
import com.nit.jobsite.service.CompanyService;



@Controller
@RequestMapping("/company")
public class CompanyController {
	@Resource
	private CompanyService companyService;
	
	@RequestMapping(value = "/getCompany", method = RequestMethod.POST)
	@ResponseBody	
	public AjaxMsgDto getCompany(Integer memberID){
		
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		try{
			ajaxMsgDto = companyService.getCompany(memberID);
			
		}catch (Exception e) {
            e.printStackTrace();
        }
		System.out.println(ajaxMsgDto.getData());
		return ajaxMsgDto;
		
	}
	
	@RequestMapping(value = "/insertCompany", method = RequestMethod.POST)
	@ResponseBody	
	public AjaxMsgDto insertCompany(Company company){
		
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		try{
			ajaxMsgDto = companyService.insertCompany(company);
			
		}catch (Exception e) {
            e.printStackTrace();
        }
		System.out.println(ajaxMsgDto.getData());
		return ajaxMsgDto;
		
	}
	
	@RequestMapping(value = "/getCompanyByName", method = RequestMethod.POST)
	@ResponseBody	
	public AjaxMsgDto getCompanyByName(String companyName){
		
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		try{
			ajaxMsgDto = companyService.getCompanyByName(companyName);
			
		}catch (Exception e) {
            e.printStackTrace();
        }
		System.out.println(ajaxMsgDto.getData());
		return ajaxMsgDto;
		
	}
	@RequestMapping(value = "/getCompanyReviewList", method = RequestMethod.POST)
	@ResponseBody	
	public AjaxMsgDto getCompanyReviewList(){
		
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		try{
			ajaxMsgDto = companyService.getCompanyReviewList();
			
		}catch (Exception e) {
            e.printStackTrace();
        }
	
		return ajaxMsgDto;
		
	}
	@RequestMapping(value = "/getCompanyReviewListByStaus", method = RequestMethod.POST)
	@ResponseBody	
	public AjaxMsgDto getCompanyReviewListByStaus(){
		
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		try{
			ajaxMsgDto = companyService.getCompanyReviewListByStaus();
			
		}catch (Exception e) {
            e.printStackTrace();
        }
	
		return ajaxMsgDto;
		
	}
	@RequestMapping(value = "/setReviewPass", method = RequestMethod.POST)
	@ResponseBody	
	public AjaxMsgDto setReviewPass(Integer companyID){
		
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		try{
			ajaxMsgDto = companyService.setReviewPass(companyID);
			
		}catch (Exception e) {
            e.printStackTrace();
        }
	
		return ajaxMsgDto;
		
	}
	@RequestMapping(value = "/updateCompany", method = RequestMethod.POST)
	@ResponseBody	
	public AjaxMsgDto updateCompany(Company company){
		System.out.println(company+"-------------------------------");
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		try{
			ajaxMsgDto = companyService.updateCompany(company);
			
		}catch (Exception e) {
            e.printStackTrace();
        }
	
		return ajaxMsgDto;
		
	}

}
