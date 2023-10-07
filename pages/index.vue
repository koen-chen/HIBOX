<template>
  <div class="w-3/4 m-auto py-20">
    <div class="intro">
      <div class="text-box">
        <p class="title primary-title">嗨盒子! </p>
        <p class="desc">轻松创建和共享在线表单和调查问卷。</p>

        <el-button class="mt-20" size="large" type="primary" @click="navigateTo('/login')">开始使用</el-button>
      </div>

      <div class="img-box"><img src="/demo3.jpg" /></div>
    </div>

    <div class="intro">
      <div class="img-box"><img src="/demo2.jpg" /></div>

      <div class="text-box">
        <p class="title">创建在线表单像创建文档一样简单</p>
        <p class="desc">您可以从多个问题类型中进行选择，通过拖放操作将问题重新排序，还可轻松对各个值进行自定义（就像粘贴列表一样简单）。</p>
      </div>

    </div>

    <div class="intro">
      <div class="text-box">
        <p class="title">发送精美的调查问卷和表单</p>
        <p class="desc">自定义颜色、图片和字体以调整外观和风格，或突显贵单位的品牌形象。您还可以添加自定义逻辑来根据答案显示问题，以获取更顺畅的体验。</p>
      </div>

      <div class="img-box"><img src="/demo1.jpg" /></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.intro {
  @apply flex items-center justify-between pb-40;
}

.img-box {
  width: 45%;

  img {
    width: 100%;
  }
}

.text-box {
  width: 50%;
}

.title {
  font-size: 36px;
  font-weight: bolder;
  margin-bottom: 20px;
  color: $textColor;
}

.primary-title {
  font-size: 68px;
  color: $primaryColor;
}
.desc {
  font-size: 20px;
  color: $textSecondaryColor;
}
</style>