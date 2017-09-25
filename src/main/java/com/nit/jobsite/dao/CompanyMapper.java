package com.nit.jobsite.dao;

import java.util.List;

import com.nit.jobsite.model.Company;

public interface CompanyMapper {
    int deleteByPrimaryKey(Integer companyID);

    Integer insert(Company record);

    Integer insertSelective(Company record);

    Company selectByPrimaryKey(Integer companyID);

    Integer updateByPrimaryKeySelective(Company record);

    int updateByPrimaryKey(Company record);
    Integer checkIsExist(Integer memberID);
    Company getCompanyByName(String companyName);
    List<Company> getCompanyReviewListByStaus();
    List<Company> getCompanyReviewList();
    Integer setReviewPass(Integer companyID);
    
}