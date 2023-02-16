const knex = require('../models/knex');

class Base{
  constructor(props){
    // console.log(props)
    this.table = props;
  }

  // 查找
  all (){
    // console.log(this.table)
    return knex(this.table). select();
  }

  // 新增
  insert (params){
    return knex(this.table).insert(params);
  }

  // 更改
  update (id, params){
    return knex(this.table).where('id', '=', id).update(params);
  }

  // 删除
  delete (id){
    return knex(this.table).where('id', '=', id).del();
  }

}

module.exports = Base;