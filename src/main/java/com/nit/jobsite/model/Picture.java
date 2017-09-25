package com.nit.jobsite.model;

public class Picture {
    private Integer pictureID;

    private String pictureURL;

    private Integer memberID;

    private String pictureType;

    public Integer getPictureID() {
        return pictureID;
    }

    public void setPictureID(Integer pictureID) {
        this.pictureID = pictureID;
    }

    public Picture() {
		super();
	}

	public Picture(String pictureURL, Integer memberID) {
		super();
		this.pictureURL = pictureURL;
		this.memberID = memberID;
	}

	public String getPictureURL() {
        return pictureURL;
    }

    public void setPictureURL(String pictureURL) {
        this.pictureURL = pictureURL == null ? null : pictureURL.trim();
    }

    public Integer getMemberID() {
        return memberID;
    }

    public void setMemberID(Integer memberID) {
        this.memberID = memberID;
    }

    public String getPictureType() {
        return pictureType;
    }

    public void setPictureType(String pictureType) {
        this.pictureType = pictureType == null ? null : pictureType.trim();
    }
}