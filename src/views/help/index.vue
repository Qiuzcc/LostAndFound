<template>
  <div>
    <el-descriptions title="FAQ常见问题答疑" :column="1" direction="vertical">
      <el-descriptions-item
        v-for="item in questions"
        :key="item.id"
        :label="item.id + '、' + item.question"
        labelStyle="margin-down:10px"
        >{{ item.answer }}</el-descriptions-item
      >
    </el-descriptions>
   <el-divider></el-divider>
   <p>联系我们：1670906129@qq.com</p>

  </div>
</template>

<script>
export default {
  data() {
    return {
      questions: [
        {
          id: 1,
          question: "Q：初始账号密码是什么？",
          answer: "A：初始账号为学号，初始密码为身份证后6位，第一次登陆操作后会提示绑定微信账号，后续使用微信扫码登陆",
        },
        {
          id: 2,
          question: "Q：哪些操作需要登陆？",
          answer: "A：浏览主页是不需要登陆的，如果您想查看详细信息、发布信息、修改个人信息，需要先登陆",
        },
        {
            id:3,
            question:'Q：待补充......',
            answer:'A：待补充......'
        },
      ],
    };
  },
};
</script>