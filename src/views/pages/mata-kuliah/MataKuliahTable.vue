<script setup lang="ts">
import TambahDialog from '@/views/pages/mata-kuliah/TambahDialog.vue'
import EditDialog from '@/views/pages/mata-kuliah/EditDialog.vue'
import HapusDialog from '@/views/pages/mata-kuliah/HapusDialog.vue'

const page = ref(1)
const searchString = ref('')
const debouncedSearchString = ref('')
const matkulList = ref([])

const debouncedFn = useDebounceFn(newVal => {
  debouncedSearchString.value = newVal
  page.value = 1
}, 1000, { maxWait: 5000 })

watch(searchString, newVal => {
  debouncedFn(newVal)
})

const url = computed(() => {
  return `${import.meta.env.VITE_SISERKOM_API_URL}/mata-kuliah?page=${page.value - 1}&size=20&searchString=${debouncedSearchString.value}`
})

const { data } = await useFetch(url, { refetch: true }).get().json()
async function submit() {
  if (page.value > 1) {
    page.value = 1
  }
  else {
    const { data: submitData } = await useFetch(url).get().json()

    matkulList.value = submitData.value._embedded?.mataKuliahModelList
  }
}
watchEffect(() => {
  matkulList.value = data.value._embedded?.mataKuliahModelList
})
</script>

<template>
  <div class="d-flex mb-6">
    <TambahDialog @submit="submit" />
    <VSpacer />
    <VSpacer />
    <VTextField
      v-model="searchString"
      label="Cari Kode / Nama"
      append-inner-icon="bx-search"
      class="ma-2"
    />
  </div>
  <VTable>
    <thead>
      <tr>
        <th class="text-uppercase">
          Kode
        </th>
        <th>
          Nama
        </th>
        <th>
          Dipakai
        </th>
        <th />
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="item in matkulList"
        :key="item.id"
      >
        <td>
          {{ item.id }}
        </td>
        <td>
          {{ item.nama }}
        </td>
        <td>
          <i
            v-if="item.isDisabled"
            class="bx bxs-x-circle"
            style="color:darkred"
          />
          <i
            v-else
            class="bx bxs-check-shield"
            style="color:forestgreen"
          />
        </td>
        <td>
          <div class="d-flex justify-center">
            <EditDialog
              :id="item.id"
              @submit="submit"
            />
            <HapusDialog
              :id="item.id"
              :nama="item.nama"
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
