package com.elvira.database.pojo;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("entrust_day_summary")
public class DaySummary {

    private String createDay;

    private String accountId;

    private String securitiesId;

    private String msegmentName;

    private String action;

    private Long cnt;

    private Long price;
}
