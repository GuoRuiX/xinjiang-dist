import request from '@/utils/request'

// 信贷信息查询
export function selectFuzzy(data) {
  return request({
    url: '/api/statisticalAnalysis/selectFuzzy',
    method: 'post',
    data
  })
}

// 根据信用等级统计出信用户数量
export function statByCreditLevel(data) {
  return request({
    url: '/api/statisticalAnalysis/statByCreditLevel',
    method: 'post',
    data
  })
}

// 信贷信息导出
export function exportExcelStatistical(data) {
  return request({
    url: '/api/statisticalAnalysis/exportExcelStatistical',
    method: 'post',
    data
  })
}

// 贫困户信息查询
export function poorHouseholdsInformation(data) {
  return request({
    url: '/api/poorHouseholdsInformation',
    method: 'post',
    data
  })
}

// 贫困户信息导出
export function exportExcelDate(data) {
  return request({
    url: '/api/poorHouseholdsInformation/exportExcelDate',
    method: 'post',
    data
  })
}

// 日志列表查询
export function logs(data) {
  return request({
    url: '/api/logs',
    method: 'post',
    data
  })
}

// 日志列表查询
export function userMana(data) {
  return request({
    url: '/api/userMana',
    method: 'post',
    data
  })
}

// 机构列表查询
export function orgManagerInterface(data) {
  return request({
    url: '/api/orgManagerInterface',
    method: 'post',
    data
  })
}

// 预警列表查询
export function waringPoor(data) {
  return request({
    url: '/api/waringPoor',
    method: 'post',
    data
  })
}

// 根据身份证号和户主姓名查询贫困户信息
export function selectPoor(data) {
  return request({
    url: '/api/poorHouseholdsInformation/selectPoor/'+data,
    method: 'get',
    data:null
  })
}

// 获取年份
export function selYear() {
  return request({
    url: '/api/annualStatistics/selYear',
    method: 'get',
    data:null
  })
}

// 获取总览数据
export function queryReportStatistics() {
  return request({
    url: '/api/annualStatistics/queryReportStatistics',
    method: 'get',
    data:null
  })
}

// 获取报表数据
export function reportStatistics(data) {
  return request({
    url: '/api/reportStatistics',
    method: 'post',
    data:data
  })
}
//贫困县列表展示
export function poorCountyArr(data) {
  return request({
    url: '/api/reportStatistics/slecounty',
    method: 'post',
    data:data
  })
}

//获取地区
export function region() {
  return request({
    url: '/api/region',
    method: 'get',
    data:null
  })
}

//查询3级地区数据
export function regionCounty(data) {
  return request({
    url: '/api/region/selectByLevel/'+data,
    method: 'get',
    data:null
  })
}


//查询3级地区数据
export function getTree() {
  return request({
    url: '/api/region/getTree',
    method: 'get',
    data:null
  })
}
