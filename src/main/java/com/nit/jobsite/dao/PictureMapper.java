package com.nit.jobsite.dao;

import java.util.List;

import com.nit.jobsite.model.Picture;

public interface PictureMapper {
    int deleteByPrimaryKey(Integer pictureID);

    int insert(Picture record);

    Integer insertSelective(Picture record);

    Picture selectByPrimaryKey(Integer pictureID);

    int updateByPrimaryKeySelective(Picture record);

    int updateByPrimaryKey(Picture record);
    List<String> getPicturesByID(Integer companyID);
}