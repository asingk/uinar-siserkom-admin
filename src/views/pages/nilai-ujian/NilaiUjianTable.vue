<script setup lang="ts">
import EditDialog from '@/views/pages/nilai-ujian/EditDialog.vue'

const nilaiUjianList = ref([])

const url = `${import.meta.env.VITE_SISERKOM_API_URL}/nilai-ujian`

const { data } = await useFetch(url).get().json()

nilaiUjianList.value = data.value
async function submit() {
  const { data: submitData } = await useFetch(url).get().json()

  nilaiUjianList.value = submitData.value
}
</script>

<template>
  <VTable>
    <thead>
      <tr>
        <th class="text-uppercase">
          Nilai Huruf
        </th>
        <th>
          Nilai Angka
        </th>
        <th>
          Lulus
        </th>
        <th />
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="item in nilaiUjianList"
        :key="item.id"
      >
        <td>
          {{ item.id }}
        </td>
        <td>
          {{ item.nilaiAngka }}
        </td>
        <td>
          <i
            v-if="item.isLulus"
            class="bx bxs-check-shield"
            style="color:forestgreen"
          />
          <i
            v-else
            class="bx bxs-x-circle"
            style="color:darkred"
          />
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
