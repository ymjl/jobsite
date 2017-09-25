package com.nit.jobsite.service;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;

import com.nit.jobsite.dao.MemberMapper;
import com.nit.jobsite.dto.AjaxMsgDto;
import com.nit.jobsite.dto.LoginTokenDto;
import com.nit.jobsite.model.Member;
import com.nit.jobsite.utils.HttpServletUtil;



@Service


public class UserService {
	
    @Resource
    private MemberMapper memberDao;


    @Resource
    private HttpServletUtil servletUtil;
    
    
    
	public AjaxMsgDto loginCheck(String loginName, String loginPwd){
    	
    	AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
    	Integer memberId = memberDao.loginCheck(loginName, loginPwd);
    	if(memberId == null){
            ajaxMsgDto.setData(null);
            ajaxMsgDto.setIsSuccess(true);
    	}else{
            HttpServletRequest request = servletUtil.getRequest();
            HttpSession session = request.getSession();
            
            String sessionId = session.getId();
    		LoginTokenDto loginInfo = memberDao.getLoginInfo(memberId);
    		loginInfo.setSessionId(sessionId);
    		ajaxMsgDto.setData(loginInfo);
    		ajaxMsgDto.setIsSuccess(true);
    		          
            
    	}
    	 	
    	
    	return ajaxMsgDto;
    	
    	
    }
	public AjaxMsgDto userRegister(String username,String email, String password,Integer memberType){
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date();
        String tp = sd.format(date);;
		Member member = new Member(username, password, email, memberType,tp );
		Integer isExist = memberDao.registerCheck(username);
		if(isExist != null){
            ajaxMsgDto.setData(null);
            ajaxMsgDto.setIsSuccess(true);
		}else{
			memberDao.insert(member);
			System.out.println(member);
			ajaxMsgDto.setData("success");
			ajaxMsgDto.setIsSuccess(true);
		}
		return ajaxMsgDto;
		
	}
	
	

	
	public AjaxMsgDto changePWD(Member member, String oldPwd){
		AjaxMsgDto ajaxMsgDto = new AjaxMsgDto();
		String getOldPwd = memberDao.getPassword(member.getMemberID());
		if(getOldPwd.equals(oldPwd)){
			Integer isSuccess = memberDao.updateByPrimaryKeySelective(member);
			if(isSuccess != null){
				ajaxMsgDto.setData("success");
				ajaxMsgDto.setIsSuccess(true);
			}else{

				ajaxMsgDto.setData("error");
				ajaxMsgDto.setIsSuccess(true);
			}
		}else{
			ajaxMsgDto.setData("pwderror");
			ajaxMsgDto.setIsSuccess(true);
			
		}
		

		return ajaxMsgDto;
		
	}
	
	
	
	

}
