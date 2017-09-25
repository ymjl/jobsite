package com.nit.jobsite.dto;

public class ApplicantMsgDto {
    private Integer applicantID;
    private Integer memberID;
    private String applicantName;
	@Override
	public String toString() {
		return "ApplicantMsgDto [applicantID=" + applicantID + ", memberID=" + memberID + ", applicantName="
				+ applicantName + "]";
	}
	public Integer getApplicantID() {
		return applicantID;
	}
	public void setApplicantID(Integer applicantID) {
		this.applicantID = applicantID;
	}
	public Integer getMemberID() {
		return memberID;
	}
	public void setMemberID(Integer memberID) {
		this.memberID = memberID;
	}
	public String getApplicantName() {
		return applicantName;
	}
	public void setApplicantName(String applicantName) {
		this.applicantName = applicantName;
	}
    
    
}
