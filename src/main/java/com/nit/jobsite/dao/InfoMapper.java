package com.nit.jobsite.dao;

import java.util.List;

import com.nit.jobsite.model.Info;
import com.nit.jobsite.model.InfoKey;

public interface InfoMapper {
    Integer deleteByPrimaryKey(InfoKey key);

    int insert(Info record);

    Integer insertSelective(Info record);

    Info selectByPrimaryKey(InfoKey key);

    int updateByPrimaryKeySelective(Info record);

    int updateByPrimaryKey(Info record);
    List<Integer> checkIsPost(Integer recruitmentID);
    Integer setInfo(InfoKey infoKey);
}