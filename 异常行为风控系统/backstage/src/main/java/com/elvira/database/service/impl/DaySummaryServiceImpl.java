package com.elvira.database.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.elvira.database.mapper.DaySummaryMapper;
import com.elvira.database.mapper.EntrustMapper;
import com.elvira.database.pojo.DaySummary;
import com.elvira.database.pojo.Entrust;
import com.elvira.database.service.DaySummaryService;
import com.elvira.database.vo.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DaySummaryServiceImpl implements DaySummaryService {
    @Autowired
    private DaySummaryMapper daySummaryMapper;

    @Override
    public Result getDaySummaryInfo() {
        LambdaQueryWrapper<DaySummary> queryWrapper = new LambdaQueryWrapper<>();
        List<DaySummary> daySummaryList = daySummaryMapper.selectList(queryWrapper);

        return Result.success(daySummaryList);
    }
}
