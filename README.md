# 流程图：
1. 判断是不是由分隔符开头(`{{}}`),Ps.分隔符可以自定义
    1. 如果只找到开头，未找到结尾，则报错
    判断方式：
    ```JS
    const [open, close] = context.options.delimiters; // options里传入的分隔符(默认"{{}}")
    const closeIndex = context.source/*被编译的字符串*/.indexOf(close/*分隔符结束部分*/, open.length/* 分隔符开始部分的长度*/); // 分隔符开始部分的长度为起点查找分隔符结尾的索引位置
    if (closeIndex === -1) {
        // 抛出异常
    }
    ```

2. 