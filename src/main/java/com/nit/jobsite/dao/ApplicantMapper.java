package com.nit.jobsite.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.nit.jobsite.dto.ApplicantMsgDataTable;
import com.nit.jobsite.dto.ApplicantMsgDto;
import com.nit.jobsite.model.Applicant;

public interface ApplicantMapper {
    Integer deleteByPrimaryKey(Integer applicantID);

    Integer insert(Applicant record);

    Integer insertSelective(Applicant record);

    Applicant selectByPrimaryKey(Integer applicantID);

    Integer updateByPrimaryKeySelective(Applicant record);

    Integer updateByPrimaryKey(Applicant record);
    
    List<String> getApplicantNameList(Integer memberID);
    String checkApplicantName(@Param(value="name")String name,@Param(value="memberID") Integer memberID);
    Integer insertApplicantName(@Param(value="name")String name,@Param(value="memberID") Integer memberID);
    Applicant getApplicantData(@Param(value="name")String applicantName,@Param(value="memberID")Integer memberID);
    List<ApplicantMsgDto> getApplicantMsgList(Integer memberID);
    List<ApplicantMsgDataTable> getApplicantDatatable(Integer memberID);
    List<ApplicantMsgDataTable> getRecruitmentDatatable(Integer companyID);
}