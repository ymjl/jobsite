package com.nit.jobsite.dto;

public class RecruitmentMsgDto {
	private Integer recruitmentID;
	private String recruitmentPosition;
	private String recruitmentInfo;
	private String companyName;
	private String companyEmail;
	public String getCompanyEmail() {
		return companyEmail;
	}
	public void setCompanyEmail(String companyEmail) {
		this.companyEmail = companyEmail;
	}


	@Override
	public String toString() {
		return "RecruitmentMsgDto [recruitmentID=" + recruitmentID + ", recruitmentPosition=" + recruitmentPosition
				+ ", recruitmentInfo=" + recruitmentInfo + ", companyName=" + companyName + ", companyEmail="
				+ companyEmail + "]";
	}
	public Integer getRecruitmentID() {
		return recruitmentID;
	}
	public void setRecruitmentID(Integer recruitmentID) {
		this.recruitmentID = recruitmentID;
	}
	public String getRecruitmentPosition() {
		return recruitmentPosition;
	}
	public void setRecruitmentPosition(String recruitmentPosition) {
		this.recruitmentPosition = recruitmentPosition;
	}
	public String getRecruitmentInfo() {
		return recruitmentInfo;
	}
	public void setRecruitmentInfo(String recruitmentInfo) {
		this.recruitmentInfo = recruitmentInfo;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

}
