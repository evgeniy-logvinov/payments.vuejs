<script setup lang="ts"></script>

<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <el-scrollbar>
          <el-row>
            <el-col :span="2" :offset="6"><RouterView /> </el-col
          ></el-row>
        </el-scrollbar>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped></style>
