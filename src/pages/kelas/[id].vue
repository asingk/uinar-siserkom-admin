<script setup lang="ts">
import InvoiceTable from '@/views/pages/kelas/InvoiceTable.vue'

const props = defineProps({
  id: Number,
})

const { data } = await useFetch(`${import.meta.env.VITE_SISERKOM_API_URL}/kelas/${props.id}`).get().json()
const { data: nilaiUjianData } = await useFetch(`${import.meta.env.VITE_SISERKOM_API_URL}/nilai-ujian`).get().json()
const nilaiUjianItems = nilaiUjianData.value.map(row => `${row.id} = ${row.nilaiAngka} ${row.isLulus ? 'Lulus' : 'Tidak Lulus'}`)
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard :title="`Kelas ${props.id}`">
        <div class="ma-6 font-weight-bold">
          <p>
            {{ `Tanggal: ${data.tanggal}` }}
          </p>
          <p>
            {{ `Jam: ${data.jam.substring(0, 5)}` }}
          </p>
          <p>
            {{ `Jenis: ${data.namaJenis}` }}
          </p>
          <p>
            {{ `Pengajar: ${data.namaPengajar}` }}
          </p>
        </div>
        <InvoiceTable :id="props.id" />
      </VCard>
      <VAlert
        color="primary"
        icon="bx-bxs-graduation"
        prominent
        class="mt-3"
      >
        Nilai Ujian:
        <VList :items="nilaiUjianItems" />
      </VAlert>
    </VCol>
  </VRow>
</template>
