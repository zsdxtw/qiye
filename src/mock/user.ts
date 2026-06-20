// 用户与企业信息 Mock 数据
export const currentUser = {
  id: "u001",
  name: "张明远",
  title: "总经理",
  role: "owner",
  avatar: "",
  phone: "138****8866",
  email: "zhangmy@qijia.com",
};

export const currentCompany = {
  id: "c001",
  name: "明远精密制造有限公司",
  industry: "制造业",
  revenueRange: "1000万-3000万",
  employees: 86,
  established: "2018",
  location: "江苏省苏州市",
};

export const companyMembers = [
  { id: "m01", name: "张明远", role: "超级管理员", title: "总经理", phone: "138****8866", status: "active", avatar: "", email: "zhangmy@qijia.com", lastLogin: "2026-06-21 08:32" },
  { id: "m02", name: "李秀芬", role: "财务负责人", title: "财务总监", phone: "139****2233", status: "active", avatar: "", email: "lixs@qijia.com", lastLogin: "2026-06-20 17:45" },
  { id: "m03", name: "王建国", role: "行政管理", title: "行政经理", phone: "137****5566", status: "active", avatar: "", email: "wangjg@qijia.com", lastLogin: "2026-06-21 09:12" },
  { id: "m04", name: "陈丽华", role: "财务", title: "会计", phone: "136****7788", status: "active", avatar: "", email: "chenlh@qijia.com", lastLogin: "2026-06-20 16:20" },
  { id: "m05", name: "刘志强", role: "销售", title: "销售经理", phone: "135****9900", status: "inactive", avatar: "", email: "liuzq@qijia.com", lastLogin: "2026-06-15 10:08" },
  { id: "m06", name: "赵小燕", role: "人事", title: "HR专员", phone: "134****1122", status: "active", avatar: "", email: "zhaoxy@qijia.com", lastLogin: "2026-06-21 08:50" },
];
