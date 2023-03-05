<template>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error',
    created() {
      this.$router.push({name: 'index'});
    }
  };
</script>
