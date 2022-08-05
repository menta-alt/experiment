package com.elvira.database.controller;

import com.elvira.database.service.EntrustService;
import com.elvira.database.vo.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class EntrustController {
    @Autowired
    private EntrustService entrustService;

    // 获取委托数据
    @GetMapping("/entrustInfo")
    public Result entrustInfoList(){
        return entrustService.getEntrustInfo();
    }

}
