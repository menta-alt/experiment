package com.elvira.database.pojo;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
@TableName("risk_result")
public class RiskResult {

    @TableId
    private String entrustId;  // 异常委托id

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date dealTime; //异常行为时间

    private String scenes; //异常场景

    private String accountId; //异常交易账户Id

    private String marketSegmentId; //市场版块id

    private String securitiesId; //证券Id

    private String isDeal; //是否处理解决

    private String preciseData; //异常行为具体数据

    private String otherInfo; //其他信息

    private String dt; //日期分区字段
}
