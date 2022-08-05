package com.elvira.database.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.elvira.database.mapper.RiskResultMapper;
import com.elvira.database.pojo.Entrust;
import com.elvira.database.pojo.RiskResult;
import com.elvira.database.service.RiskResultService;
import com.elvira.database.vo.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RiskResultServiceImpl implements RiskResultService {
    @Autowired
    private RiskResultMapper riskResultMapper;

    @Override
    public Result getRiskInfo() {
        LambdaQueryWrapper<RiskResult> queryWrapper = new LambdaQueryWrapper<>();
        List<RiskResult> riskResultsList = riskResultMapper.selectList(queryWrapper);

        return Result.success(riskResultsList);
    }
}
