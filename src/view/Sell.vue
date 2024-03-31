<template>
    <div>
        <TheHeader/>
        <TheFooter/>
    </div>
</template>


<script>
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';

export default {
    name: 'SellProducts',
    data() {
      return {
      }
    },
    created(){
    },
    methods: {
    },
    components:{
      TheHeader,
      TheFooter
    }
  }

</script>