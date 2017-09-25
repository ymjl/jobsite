package com.nit.jobsite.model;

public class Recruitment {

	private Integer recruitmentID;

    private Integer companyID;

    private String recruitmentPosition;

    private Integer recruitmentStatus;

    private String recruitmentInfo;

    public Integer getRecruitmentID() {
        return recruitmentID;
    }

    public void setRecruitmentID(Integer recruitmentID) {
        this.recruitmentID = recruitmentID;
    }

    public Integer getCompanyID() {
        return companyID;
    }

    public void setCompanyID(Integer companyID) {
        this.companyID = companyID;
    }

    public String getRecruitmentPosition() {
        return recruitmentPosition;
    }

    public void setRecruitmentPosition(String recruitmentPosition) {
        this.recruitmentPosition = recruitmentPosition == null ? null : recruitmentPosition.trim();
    }

    public Integer getRecruitmentStatus() {
        return recruitmentStatus;
    }

    public void setRecruitmentStatus(Integer recruitmentStatus) {
        this.recruitmentStatus = recruitmentStatus;
    }

    public String getRecruitmentInfo() {
        return recruitmentInfo;
    }

    public void setRecruitmentInfo(String recruitmentInfo) {
        this.recruitmentInfo = recruitmentInfo == null ? null : recruitmentInfo.trim();
    }
    @Override
	public String toString() {
		return "Recruitment [recruitmentID=" + recruitmentID + ", companyID=" + companyID + ", recruitmentPosition="
				+ recruitmentPosition + ", recruitmentStatus=" + recruitmentStatus + ", recruitmentInfo="
				+ recruitmentInfo + "]";
	}

}