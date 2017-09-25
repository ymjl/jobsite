package com.nit.jobsite.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.nit.jobsite.dao.PictureMapper;
import com.nit.jobsite.dto.AjaxMsgDto;
import com.nit.jobsite.model.Picture;

@Service
public class PictureService {
	
	
	@Resource
	private PictureMapper pictureDao;
	public AjaxMsgDto addPicturePath(Picture picture){
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		Integer result = pictureDao.insertSelective(picture);
		if(result==null){
			ajaxMsgDto.setData(null);
			ajaxMsgDto.setIsSuccess(false);
			
		}else{
			ajaxMsgDto.setData("success");
			ajaxMsgDto.setIsSuccess(true);
			
		}
		
			
		
		return ajaxMsgDto;
	}
	
	public AjaxMsgDto getURLList(Integer companyID){
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		List<String> result = pictureDao.getPicturesByID(companyID);
		if(result==null){
			ajaxMsgDto.setData(null);
			ajaxMsgDto.setIsSuccess(false);
			
		}else{
			ajaxMsgDto.setData(result);
			ajaxMsgDto.setIsSuccess(true);
			
		}
		
			
		
		return ajaxMsgDto;
	}	

}
