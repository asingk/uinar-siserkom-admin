<script setup lang="ts">
import InvoiceTable from '@/views/pages/mahasiswa/InvoiceTable.vue'

const props = defineProps({
  id: String,
})

const { data } = await useFetch(`${import.meta.env.VITE_SISERKOM_API_URL}/mahasiswa/${props.id}`).get().json()
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard :title="data.nama">
        <InvoiceTable :nim="$route.params.id" />
      </VCard>
    </VCol>
  </VRow>
</template>
