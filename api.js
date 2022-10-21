const newman = require("newman"),
  ExcelJS = require("exceljs");

newman
  .run({
    collection: require("./wanandroid.json"),
    reporters: "cli",
    // iterationData: "./data.csv",
  })

  .on("request", function (error, args) {
    //After response of the request is received
    if (error) {
      console.error(error);
    } else {
      // Log the response body
      const resStr = args.response.stream.toString();
      const arr = JSON.parse(resStr).data.datas;
      const workbook = new ExcelJS.Workbook(); //创建工作簿
      const worksheet = workbook.addWorksheet("My Sheet"); //添加工作表
      // 添加列标题并定义列键和宽度
      // 注意：这些列结构仅是构建工作簿的方便之处，除了列宽之外，它们不会完全保留。
      //key作为添加数据时的标适
      worksheet.columns = [
        { header: "标题", key: "title", width: 10 },
        { header: "链接", key: "link", width: 32 },
      ];
      arr.forEach((element) => {
        worksheet.addRow({ title: element.title, link: element.link }); //逐行添加数据，key对应上面列的key，value对应单元格的值
      });
      workbook.xlsx.writeFile("./data.xlsx"); //把数据写入excel，文件不存在会自动创建
    }
  });
