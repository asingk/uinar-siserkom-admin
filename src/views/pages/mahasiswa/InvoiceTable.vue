<script setup lang="ts">
const props = defineProps({
  nim: String,
})

const { data } = await useFetch(`${import.meta.env.VITE_SISERKOM_API_URL}/mahasiswa/${props.nim}/invoice`).get().json()
</script>

<template>
  <VTable>
    <thead>
      <tr>
        <th class="text-uppercase">
          Kelas
        </th>
        <th>
          Invoice
        </th>
        <th>
          Jenis
        </th>
        <th>
          Nilai Angka
        </th>
        <th>
          Nilai Huruf
        </th>
        <th>
          Lulus
        </th>
        <th />
      </tr>
    </thead>

    <tbody>
      <template
        v-for="item in data._embedded?.invoiceModelList"
        :key="item.id"
      >
        <tr v-if="item.idJenis < 3">
          <td>
            {{ item.idKelas }}
          </td>
          <td>
            {{ item.id }}
          </td>
          <td>
            {{ item.namaJenis }}
          </td>
          <td>
            {{ item.nilaiUjianAngka }}
          </td>
          <td>
            {{ item.nilaiUjianHuruf }}
          </td>
          <td>
            <i
              v-if="item.isLulusUjian"
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
            <VBtn
              icon="bx-show-alt"
              rounded
              color="success"
              class="ma-2 pa-2"
              @click="$router.push(`/kelas/${item.idKelas}`)"
            />
          </td>
        </tr>
      </template>
    </tbody>
  </VTable>
</template>
