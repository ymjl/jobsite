package com.nit.jobsite.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.nit.jobsite.dao.RecruitmentMapper;
import com.nit.jobsite.dto.AjaxMsgDto;
import com.nit.jobsite.dto.RecruitmentMsgDto;
import com.nit.jobsite.utils.HttpServletUtil;
import com.nit.jobsite.utils.Page;


@Service
public class SearchService {
	@Resource
	HttpServletUtil httpservletUtil;
	@Resource
	RecruitmentMapper recruitmentDao;
	public AjaxMsgDto getRecruitmentMsgList(){
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		List<RecruitmentMsgDto> result = recruitmentDao.getRecruitmentMsgList();

		ajaxMsgDto.setData(result);
		ajaxMsgDto.setIsSuccess(true);	


		return ajaxMsgDto;
	}
	

	public AjaxMsgDto selectRecruitmentByPage(){
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		String pageNow = httpservletUtil.getRequest().getParameter("pageNow");

		String searchText = httpservletUtil.getRequest().getParameter("searchText");

		Page page = null; 
		Integer totalCount;
		
		List<RecruitmentMsgDto> result;
		
		if(searchText!=null){
		
			totalCount = (int) recruitmentDao.getRecruitmentCountAndText(searchText);
			
		    if (pageNow != null) {  
		        page = new Page(totalCount, Integer.parseInt(pageNow));  
		    
		        result = this.recruitmentDao.selectRecruitmentByPageAndText(searchText,page.getStartPos(), page.getPageSize());

		        
		    } else {  
		        page = new Page(totalCount, 1);  
		        
		        result = this.recruitmentDao.selectRecruitmentByPageAndText(searchText,page.getStartPos(), page.getPageSize());  

		    }
			
		}else{
			totalCount = (int) recruitmentDao.getRecruitmentCount();
		    if (pageNow != null) {  
		        page = new Page(totalCount, Integer.parseInt(pageNow));  
		       
		        result = this.recruitmentDao.selectRecruitmentByPage(page.getStartPos(), page.getPageSize()); 

		    } else {  
		        page = new Page(totalCount, 1);  

		        result = this.recruitmentDao.selectRecruitmentByPage(page.getStartPos(), page.getPageSize());  

		    }
		}
		
		

		
	
		ajaxMsgDto.setData(result);
		ajaxMsgDto.setIsSuccess(true);	
 
		ajaxMsgDto.setPage(page);
		System.out.println(result.size());

		return ajaxMsgDto;
	}

}
