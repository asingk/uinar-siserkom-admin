<script setup lang="ts">
import EditDialog from '@/views/pages/jenis-invoice/EditDialog.vue'

const jenisList = ref([])

const url = `${import.meta.env.VITE_SISERKOM_API_URL}/jenis-invoice`

const { data } = await useFetch(url).get().json()

jenisList.value = data.value
async function submit() {
  const { data: submitData } = await useFetch(url).get().json()

  jenisList.value = submitData.value
}
</script>

<template>
  <VTable>
    <thead>
      <tr>
        <th class="text-uppercase">
          Id
        </th>
        <th>
          Nama
        </th>
        <th>
          Biaya
        </th>
        <th />
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="item in jenisList"
        :key="item.id"
      >
        <td>
          {{ item.id }}
        </td>
        <td>
          {{ item.nama }}
        </td>
        <td>
          {{ item.biaya }}
        </td>
        <td>
          <EditDialog
            :id="item.id"
            @submit="submit"
          />
        </td>
      </tr>
    </tbody>
  </VTable>
</template>
