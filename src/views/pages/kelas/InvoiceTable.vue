<script setup lang="ts">
import EditInvoiceDialog from '@/views/pages/kelas/EditInvoiceDialog.vue'
import PindahKelasDialog from '@/views/pages/kelas/PindahKelasDialog.vue'

const props = defineProps({
  id: Number,
})

const invoiceList = ref([])

const url = `${import.meta.env.VITE_SISERKOM_API_URL}/kelas/${props.id}/invoice`

const { data } = await useFetch(url).get().json()

invoiceList.value = data.value._embedded?.invoiceModelList

async function submit() {
  const { data: submitData } = await useFetch(url).get().json()

  invoiceList.value = submitData.value._embedded?.invoiceModelList
}
</script>

<template>
  <VTable>
    <thead>
      <tr>
        <th class="text-uppercase">
          NIM
        </th>
        <th>
          Nama
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
      <tr
        v-for="item in invoiceList"
        :key="item.id"
      >
        <td>
          {{ item.nim }}
        </td>
        <td>
          {{ item.namaMahasiswa }}
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
          <div class="d-flex justify-center">
            <VBtn
              icon="bx-show-alt"
              rounded
              color="success"
              class="ma-2 pa-2"
              @click="$router.push(`/mahasiswa/${item.nim}`)"
            />
            <EditInvoiceDialog
              :id="item.id"
              @submit="submit"
            />
            <PindahKelasDialog
              :id="item.id"
              :nama="item.namaMahasiswa"
              :jenis="item.idJenis"
              :id-kelas="props.id"
              @submit="submit"
            />
          </div>
        </td>
      </tr>
    </tbody>
  </VTable>
</template>
