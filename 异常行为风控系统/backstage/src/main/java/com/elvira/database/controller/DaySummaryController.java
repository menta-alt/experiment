package com.elvira.database.controller;

import com.elvira.database.service.DaySummaryService;
import com.elvira.database.vo.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DaySummaryController {

    @Autowired
    private DaySummaryService daySummaryService;

    // 获取风险结果数据
    @GetMapping("/daySummaryInfo")
    public Result summaryInfoList(){
        return daySummaryService.getDaySummaryInfo();
    }
}
