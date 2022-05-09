<template>
    <div>
        <label for="searchField">Search by {{ fieldName }}:</label>
        <input
            type="text"
            v-model="nameFilterField"
            class="form-control form-control mb-3"
            id="searchField"
        >
    </div>
</template>

<script>
import { searchByField } from '@/logic/utils.js' 


export default {
    props: {
        target: Array,
        fieldName: String,
    },
    data() {
        return {
            nameFilterField: '',
        }
    },
    watch: {
        nameFilterField(value) {
            const filteredTarget = searchByField(this.target, this.fieldName, value)
            this.$emit('onFilter', filteredTarget)
        }
    }
}
</script>

<style>

</style>