package com.nit.jobsite.dto;

public class LoginTokenDto {
	
    private Integer memberID;
    
    private String loginName;
    
    private String memberEmail;
    
    private Integer memberType;
    
    private String sessionId;
    
    private String RegisterTime;
    
    
    
	public String getRegisterTime() {
		return RegisterTime;
	}

	public void setRegisterTime(String registerTime) {
		RegisterTime = registerTime;
	}

	public String getSessionId() {
		return sessionId;
	}

	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}

	@Override
	public String toString() {
		return "LoginTokenDto [memberID=" + memberID + ", loginName=" + loginName + ", memberEmail=" + memberEmail
				+ ", memberType=" + memberType + ", sessionId=" + sessionId + "]";
	}

	public Integer getMemberID() {
		return memberID;
	}

	public void setMemberID(Integer memberID) {
		this.memberID = memberID;
	}

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public String getMemberEmail() {
		return memberEmail;
	}

	public void setMemberEmail(String memberEmail) {
		this.memberEmail = memberEmail;
	}

	public Integer getMemberType() {
		return memberType;
	}

	public void setMemberType(Integer memberType) {
		this.memberType = memberType;
	}


	
	
	
	

}
