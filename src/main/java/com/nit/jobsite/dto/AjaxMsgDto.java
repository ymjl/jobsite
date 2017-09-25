package com.nit.jobsite.dto;

import com.nit.jobsite.utils.Page;

public class AjaxMsgDto {
	private Boolean isSuccess;
	private Object data;
	private Page page;
	
	public Page getPage() {
		return page;
	}

	public void setPage(Page page) {
		this.page = page;
	}

	public AjaxMsgDto() {
		super();
	}
	
	public AjaxMsgDto(Boolean isSuccess, Object data) {
		super();
		this.isSuccess = isSuccess;
		this.data = data;
	}

	public Boolean getIsSuccess() {
		return isSuccess;
	}
	public void setIsSuccess(Boolean isSuccess) {
		this.isSuccess = isSuccess;
	}
	public Object getData() {
		return data;
	}
	public void setData(Object data) {
		this.data = data;
	}

}
