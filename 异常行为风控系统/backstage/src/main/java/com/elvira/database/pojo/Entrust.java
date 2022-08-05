package com.elvira.database.pojo;

import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import java.util.Date;

@Data
@TableName("entrust_core")
public class Entrust {

    @TableId
    private String entrustId;  // 委托id

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date createTime; //创建时间

    private String msegmentId; //市场版块id

    private String msegmentName; //市场版块名称

    private String securitiesId; //证券Id

    private String accountId; //账户Id

    private String action; // 业务行为

    private String isCancel; //是否撤单

    private Long entrustCnt; //委托数量

    private Long entrustPrice; //委托单笔价格

    private Long entrustPriceCnt; //委托金额

    private String otherInfo; //其他信息

    private String dt; //日期分区字段
}
