package com.elvira.database.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.elvira.database.mapper.EntrustMapper;
import com.elvira.database.pojo.Entrust;
import com.elvira.database.service.EntrustService;
import com.elvira.database.vo.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EntrustServiceImpl implements EntrustService {
    @Autowired
    private EntrustMapper entrustMapper;

    @Override
    public Result getEntrustInfo() {
        LambdaQueryWrapper<Entrust> queryWrapper = new LambdaQueryWrapper<>();
        List<Entrust> entrustList = entrustMapper.selectList(queryWrapper);

        return Result.success(entrustList);
    }
}
