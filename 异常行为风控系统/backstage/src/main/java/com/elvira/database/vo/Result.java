package com.elvira.database.vo;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor //之后不用写构造函数了,自动生成
public class Result {

    private boolean status; //是否成功

    private int code;

    private String msg;

    private Object data;

    public static Result success(Object data){
        return new Result(true,200,"success",data);
    }

    public static Result fail(int code, String msg){
        return new Result(false,code,msg,null);
    }
}