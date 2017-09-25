package com.nit.jobsite.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.nit.jobsite.dao.InfoMapper;
import com.nit.jobsite.dto.AjaxMsgDto;

import com.nit.jobsite.model.Info;
import com.nit.jobsite.model.InfoKey;
import com.nit.jobsite.utils.HttpServletUtil;

@Service
public class InfoService {
	
	@Resource
	private InfoMapper infoDao;
	@Resource
	HttpServletUtil httpservletUtil;
	public AjaxMsgDto insertInfo(Info info){
		Integer memberID = Integer.parseInt(httpservletUtil.getRequest().getParameter("memberID"));
		List<Integer> result = infoDao.checkIsPost(info.getRecruitmentID());
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		if(!result.contains(memberID)){
			info.setApplyStatus(0);
			SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	        Date date = new Date();
	        String tp = sd.format(date);;
			info.setApplyTime(tp);
		

			
			Integer res = infoDao.insertSelective(info);
			if(res == null){
				ajaxMsgDto.setData(null);
				ajaxMsgDto.setIsSuccess(true);	
			}else{
				ajaxMsgDto.setData("success");
				ajaxMsgDto.setIsSuccess(true);	
			}			
					
		}else{
			ajaxMsgDto.setData("isPost");
			ajaxMsgDto.setIsSuccess(false);		
		}
		

		


		return ajaxMsgDto;
		
	}	
	
	public AjaxMsgDto delInfo(InfoKey infoKey){
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		Integer result = infoDao.deleteByPrimaryKey(infoKey);

		if(result==null){
			ajaxMsgDto.setData(null);
			ajaxMsgDto.setIsSuccess(true);	
		}else{
			
			ajaxMsgDto.setData("success");
			ajaxMsgDto.setIsSuccess(true);	
		}

		return ajaxMsgDto;
		
	}
	
	public AjaxMsgDto setInfo(InfoKey infoKey){
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		
		Integer result = infoDao.setInfo(infoKey);

		if(result==null){
			ajaxMsgDto.setData(null);
			ajaxMsgDto.setIsSuccess(true);	
		}else{
			
			ajaxMsgDto.setData("success");
			ajaxMsgDto.setIsSuccess(true);	
		}

		return ajaxMsgDto;
		
	}	

}
