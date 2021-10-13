<template>
    <div class="notify" style="display: none"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import { ENotifyType } from '@/models/ENotifyType';

export default defineComponent({
    name: 'app',
    computed: {
        ...mapGetters(['notify'])
    },
    watch: {
        notify () {
                const data = this.notify;
                this.$toast.open({
                    message: data.message,
                    type: ENotifyType[data.type]
                });
        }
    }
})
</script>
