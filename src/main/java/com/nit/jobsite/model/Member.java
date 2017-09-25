package com.nit.jobsite.model;

public class Member {
    private Integer memberID;

    private String loginName;
    
    private String loginPwd;

    private String memberEmail;
    
	private Integer memberType;

    private String registerTime;
    public Member(String loginName, String loginPwd, String memberEmail, Integer memberType, String registerTime) {
		
		this.loginName = loginName;
		this.loginPwd = loginPwd;
		this.memberEmail = memberEmail;
		this.memberType = memberType;
		this.registerTime = registerTime;
	}

	public Member(Integer memberID, String loginName, String loginPwd, String memberEmail, Integer memberType,
			String registerTime) {
		super();
		this.memberID = memberID;
		this.loginName = loginName;
		this.loginPwd = loginPwd;
		this.memberEmail = memberEmail;
		this.memberType = memberType;
		this.registerTime = registerTime;
	}


    
    public Integer getMemberID() {
        return memberID;
    }

    @Override
	public String toString() {
		return "Member [memberID=" + memberID + ", loginName=" + loginName + ", loginPwd=" + loginPwd + ", memberEmail="
				+ memberEmail + ", memberType=" + memberType + ", registerTime=" + registerTime + "]";
	}

	public void setMemberID(Integer memberID) {
        this.memberID = memberID;
    }

    public String getLoginName() {
        return loginName;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName == null ? null : loginName.trim();
    }

    public String getLoginPwd() {
        return loginPwd;
    }

    public void setLoginPwd(String loginPwd) {
        this.loginPwd = loginPwd == null ? null : loginPwd.trim();
    }

    public String getMemberEmail() {
        return memberEmail;
    }

    public void setMemberEmail(String memberEmail) {
        this.memberEmail = memberEmail == null ? null : memberEmail.trim();
    }

    public Integer getMemberType() {
        return memberType;
    }

    public void setMemberType(Integer memberType) {
        this.memberType = memberType;
    }

    public String getRegisterTime() {
        return registerTime;
    }

    public void setRegisterTime(String registerTime) {
        this.registerTime = registerTime == null ? null : registerTime.trim();
    }
}