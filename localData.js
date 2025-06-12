const ExcelJS = require('exceljs'); //引入exceljs库
const arr = []; //合并数组
console.log(arr); //打印合并后的数组
const workbook = new ExcelJS.Workbook(); //创建工作簿
const worksheet = workbook.addWorksheet('My Sheet'); //添加工作表
//key作为添加数据时的标适
worksheet.columns = [
  { header: '姓名', key: 'userName' },
  { header: '手机号', key: 'userMobile' },
];
arr.forEach((element) => {
  worksheet.addRow({ userName: element.userName, userMobile: element.userMobile }); //逐行添加数据，key对应上面列的key，value对应单元格的值
});
workbook.xlsx.writeFile('./data.xlsx'); //把数据写入excel，文件不存在会自动创建
