package com.nit.jobsite.controller;

import java.io.File;


import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nit.jobsite.dto.AjaxMsgDto;

import com.nit.jobsite.service.PictureService;
import com.nit.jobsite.service.PluploadService;
import com.nit.jobsite.utils.HttpServletUtil;
import com.nit.jobsite.utils.Plupload;


@Controller
@RequestMapping("/picture")
public class PictureController {

	
	@Resource
	private PluploadService pluploadService;
	@Resource
	private PictureService pictureService;
	@Resource
	HttpServletUtil httpservletUtil;
	@RequestMapping(value = "/uploadFile", method = RequestMethod.POST)
	@ResponseBody
	public String uploadFile(Plupload plupload,HttpServletRequest request,HttpServletResponse response){

		String FileDir = "img";//文件保存的文件夹
        plupload.setRequest(request);//手动传入Plupload对象HttpServletRequest属性

        int memberId = Integer.parseInt(httpservletUtil.getRequest().getParameter("memberID"));

        //文件存储绝对路径,会是一个文件夹，项目相应Servlet容器下的"pluploadDir"文件夹，还会以用户唯一id作划分
        File dir = new File(request.getSession().getServletContext().getRealPath("/") + FileDir+"/"+ memberId);
    
        
        if(!dir.exists()){
            dir.mkdirs();//可创建多级目录，而mkdir()只能创建一级目录
        }
        //开始上传文件
        pluploadService.upload(plupload, dir,memberId);
        
        return "success";
	}
	
	@RequestMapping(value = "/getURLList", method = RequestMethod.POST)
	@ResponseBody	
	public AjaxMsgDto getURLList(Integer companyID){
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		try{
			ajaxMsgDto = pictureService.getURLList(companyID);
			
		}catch (Exception e) {
            e.printStackTrace();
        }
		System.out.println(ajaxMsgDto.getData());
		return ajaxMsgDto;	
	}
	
	

}
