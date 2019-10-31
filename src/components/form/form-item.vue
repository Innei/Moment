<template>
  <div class="item">
    <label :for="$slots.default[0].data.attrs.id" class="name">{{name}}</label>
    <slot class="input"></slot>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
  }
}
</script>

<style scoped>
.item {
  display: grid;
  margin: 1rem 0;
  grid-template-columns: 30% 70%;
}
.name {
  user-select: none;
}
textarea,
input[type='text'] {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  padding: 5px 15px;
  line-height: 1.5;
  font-size: 1rem
}

textarea:focus,
input[type='text']:focus {
  outline: none;
  border-color: #409eff;
}

select:focus {
  outline: 1px #409eff solid;
}

input[type='file'] {
  display: none;
}

button {
  padding: 9px 15px;
  font-size: 12px;
  border-radius: 3px;
  color: #fff;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  -webkit-appearance: none;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  width: 8rem;
}
button.primary {
  background-color: #409eff;
  border-color: #409eff;
}
</style>