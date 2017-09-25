package com.nit.jobsite.dao;

import org.apache.ibatis.annotations.Param;

import com.nit.jobsite.dto.LoginTokenDto;
import com.nit.jobsite.model.Member;

public interface MemberMapper {
	Integer deleteByPrimaryKey(Integer memberID);

	Integer insert(Member record);

	Integer insertSelective(Member record);

    Member selectByPrimaryKey(Integer memberID);

    Integer updateByPrimaryKeySelective(Member record);

    Integer updateByPrimaryKey(Member record);
    Integer loginCheck(@Param(value="loginName") String loginName,@Param(value="loginPassword") String loginPassword);
    LoginTokenDto getLoginInfo(Integer memberId);
    Integer registerCheck(String loginName);
    String getPassword(Integer memberId);
    
    
    
   
    
}