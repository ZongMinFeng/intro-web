module.exports = {

  Function: [
    {
      FunctionId: 'instAction',
      FunctionParentId: 'Root',
      FunctionName: '机构管理',
      Lavel: 1,     
      ChoseFlag: 2   
    },
    {
      FunctionId: 'instClear',
      FunctionParentId: 'instAction',
      FunctionName: '删除子机构',
      Lavel: 2,
      ChoseFlag: 2
    },
    {
      FunctionId: 'instGetById',
      FunctionParentId: 'instAction',
      FunctionName: '查询指定机构',
      Lavel: 2,
      ChoseFlag: 2
    },
    {
      FunctionId: 'instModification',
      FunctionParentId: 'instAction',
      FunctionName: '修改子机构',
      Lavel: 2,
      ChoseFlag: 2
    },
    {
      FunctionId: 'instPreservation',
      FunctionParentId: 'instAction',
      FunctionName: '新建子机构',
      Lavel: 2,
      ChoseFlag: 2
    },
    {
      FunctionId: 'roleAction',
      FunctionParentId: 'Root',
      FunctionName: '角色管理',
      Lavel: 1,      
      ChoseFlag: 2   
    },
    {
      FunctionId: 'roleClear',
      FunctionParentId: 'roleAction',
      FunctionName: '删除角色',
      Lavel: 2,
      ChoseFlag: 2
    },
    {
      FunctionId: 'roleGetById',
      FunctionParentId: 'roleAction',
      FunctionName: '查询指定角色',
      Lavel: 2,
      ChoseFlag: 2
    },
    {
      FunctionId: 'roleModification',
      FunctionParentId: 'roleAction',
      FunctionName: '修改角色',
      Lavel: 2,
      ChoseFlag: 2
    },
    {
      FunctionId: 'rolePreservation',
      FunctionParentId: 'roleAction',
      FunctionName: '新建角色',
      Lavel: 2,
      ChoseFlag: 2
    },
    {
      FunctionId: 'tellerAction',
      FunctionParentId: 'Root',
      FunctionName: '操作员管理',
      Lavel: 1,      
      ChoseFlag: 2  
    },
    {
      FunctionId: 'tellerClear',
      FunctionParentId: 'tellerAction',
      FunctionName: '删除操作员',
      Lavel: 2,
      ChoseFlag: 2
    },
    {
      FunctionId: 'tellerGetById',
      FunctionParentId: 'tellerAction',
      FunctionName: '查询指定操作员',
      Lavel: 2,
      ChoseFlag: 2
    },
    {
      FunctionId: 'tellerModification',
      FunctionParentId: 'tellerAction',
      FunctionName: '修改操作员',
      Lavel: 2,
      ChoseFlag: 2
    },
    {
      FunctionId: 'tellerPreservation',
      FunctionParentId: 'tellerAction',
      FunctionName: '新建操作员',
      Lavel: 2,
      ChoseFlag: 2
    },
  ]
}
