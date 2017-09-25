package com.nit.jobsite.dto;

public class ApplicantMsgDataTable {

	private String recruitmentPosition;
	private String applicantName;
	private String companyName;
	private Integer applyStatus;
	private String applyTime;
    private Integer applicantID;

    private Integer recruitmentID;





	@Override
	public String toString() {
		return "ApplicantMsgDataTable [recruitmentPosition=" + recruitmentPosition + ", applicantName=" + applicantName
				+ ", companyName=" + companyName + ", applyStatus=" + applyStatus + ", applyTime=" + applyTime
				+ ", applicantID=" + applicantID + ", recruitmentID=" + recruitmentID + "]";
	}

	public Integer getApplicantID() {
		return applicantID;
	}

	public void setApplicantID(Integer applicantID) {
		this.applicantID = applicantID;
	}

	public Integer getRecruitmentID() {
		return recruitmentID;
	}

	public void setRecruitmentID(Integer recruitmentID) {
		this.recruitmentID = recruitmentID;
	}

	public String getApplicantName() {
		return applicantName;
	}

	public void setApplicantName(String applicantName) {
		this.applicantName = applicantName;
	}

	public String getRecruitmentPosition() {
		return recruitmentPosition;
	}

	public void setRecruitmentPosition(String recruitmentPosition) {
		this.recruitmentPosition = recruitmentPosition;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public Integer getApplyStatus() {
		return applyStatus;
	}

	public void setApplyStatus(Integer applyStatus) {
		this.applyStatus = applyStatus;
	}

	public String getApplyTime() {
		return applyTime;
	}

	public void setApplyTime(String applyTime) {
		this.applyTime = applyTime;
	}

}
