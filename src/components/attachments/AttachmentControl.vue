<template>
  <div>
    <div class="mb-3">
        <input
            class="form-control form-control-sm"
            id="formFileSm"
            type="file"
            ref="attachments"
            @change="handleFiles"
            :multiple="multiple"
        >
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { mapGetters } from 'vuex'


export default {
    props: {
        multiple: Boolean,
    },
    computed: {
        ...mapGetters({
            attachments: 'attachments/items',
        })
    },
    methods: {
        async handleFiles() {
            store.commit(
                'attachments/SET_ITEMS',
                this.attachments.concat(Array.from(this.$refs.attachments.files))
            )
        },
    }
}
</script>

<style>

</style>