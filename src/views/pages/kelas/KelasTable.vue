<script setup lang="ts">
import TambahDialog from '@/views/pages/kelas/TambahDialog.vue'
import EditDialog from '@/views/pages/kelas/EditKelasDialog.vue'

const page = ref(1)
const kelasList = ref([])

const url = computed(() => {
  return `${import.meta.env.VITE_SISERKOM_API_URL}/kelas?page=${page.value - 1}&size=20`
})

const { data } = await useFetch(url, { refetch: true }).get().json()
async function submit() {
  if (page.value > 1) {
    page.value = 1
  }
  else {
    const { data: submitData } = await useFetch(url).get().json()

    kelasList.value = submitData.value._embedded?.kelasModelList
  }
}
watchEffect(() => {
  kelasList.value = data.value._embedded?.kelasModelList
})
</script>

<template>
  <TambahDialog @submit="submit" />
  <VTable>
    <thead>
      <tr>
        <th class="text-uppercase">
          ID
        </th>
        <th>
          Tanggal
        </th>
        <th>
          Pukul
        </th>
        <th>
          Jenis
        </th>
        <th>
          Pengajar
        </th>
        <th>
          Daya Tampung
        </th>
        <th>
          Terisi
        </th>
        <th />
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="item in kelasList"
        :key="item.id"
      >
        <td>
          {{ item.id }}
        </td>
        <td>
          {{ item.tanggal }}
        </td>
        <td>
          {{ item.jam.substring(0, 5) }}
        </td>
        <td>
          {{ item.namaJenis }}
        </td>
        <td>
          {{ item.namaPengajar }}
        </td>
        <td>
          {{ item.dayaTampung }}
        </td>
        <td>
          <span
            v-if="item.isPenuh"
            style="color: red"
          >{{ item.isi }}</span>
          <span
            v-else
            style="color: lawngreen"
          >{{ item.isi }}</span>
        </td>
        <td>
          <div class="d-flex justify-center">
            <VBtn
              icon="bx-show-alt"
              rounded
              color="success"
              class="ma-2 pa-2"
              @click="$router.push(`/kelas/${item.id}`)"
            />
            <EditDialog
              :id="item.id"
              @submit="submit"
            />
          </div>
        </td>
      </tr>
    </tbody>
  </VTable>
  <div class="text-center">
    <VRow justify="center">
      <VCol cols="8">
        <VContainer class="max-width">
          <VPagination
            v-model="page"
            :length="data.page.totalPages"
            class="my-4"
          />
        </VContainer>
      </VCol>
    </VRow>
  </div>
</template>
