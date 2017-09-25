package com.nit.jobsite.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.nit.jobsite.dto.RecruitmentMsgDto;
import com.nit.jobsite.model.Recruitment;

public interface RecruitmentMapper {
    Integer deleteByPrimaryKey(Integer recruitmentID);

    int insert(Recruitment record);

    Integer insertSelective(Recruitment record);

    Recruitment selectByPrimaryKey(Integer recruitmentID);

    Integer updateByPrimaryKeySelective(Recruitment record);

    int updateByPrimaryKeyWithBLOBs(Recruitment record);

    int updateByPrimaryKey(Recruitment record);
    List<RecruitmentMsgDto> getRecruitmentMsgList();
    List<RecruitmentMsgDto> selectRecruitmentByPage(@Param(value="startPos") Integer startPos,@Param(value="pageSize") Integer pageSize);
    long getRecruitmentCount();
    List<RecruitmentMsgDto> selectRecruitmentByPageAndText(@Param(value="searchText")String searchText,@Param(value="startPos") Integer startPos,@Param(value="pageSize") Integer pageSize);
    long getRecruitmentCountAndText(@Param(value="searchText")String searchText);
    List<Recruitment> getRecruitmentList(Integer companyID);
}