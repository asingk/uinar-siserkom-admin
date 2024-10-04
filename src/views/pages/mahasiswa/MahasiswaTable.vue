<script setup lang="ts">
const page = ref(1)
const searchString = ref('')
const debouncedSearchString = ref('')

const debouncedFn = useDebounceFn(newVal => {
  debouncedSearchString.value = newVal
}, 1000, { maxWait: 5000 })

watch(searchString, newVal => {
  debouncedFn(newVal)
})

const url = computed(() => {
  return `${import.meta.env.VITE_SISERKOM_API_URL}/mahasiswa?page=${page.value - 1}&size=20&searchString=${debouncedSearchString.value}`
})

const { data } = await useFetch(url, { refetch: true }).get().json()
</script>

<template>
  <VRow justify="end">
    <VCol cols="4">
      <VTextField
        v-model="searchString"
        label="Cari NIM / Nama"
        append-inner-icon="bx-search"
        class="ma-2"
      />
    </VCol>
  </VRow>
  <VTable>
    <thead>
      <tr>
        <th class="text-uppercase">
          Nama
        </th>
        <th>
          NIM
        </th>
        <th>
          Program Studi
        </th>
        <th>
          Lulus MK
        </th>
        <th>
          Sertifikat
        </th>
        <th />
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="item in data._embedded?.mahasiswaModelList"
        :key="item.nim"
      >
        <td>
          {{ item.nama }}
        </td>
        <td>
          {{ item.nim }}
        </td>
        <td>
          {{ item.prodi }}
        </td>
        <td>
          <i
            v-if="item.isLulusMataKuliah"
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
          <a
            :href="item.certificateUrl"
            target="_blank"
            rel="noopener noreferrer"
          >{{ item.certificateNo }}</a>
        </td>
        <td>
          <VBtn
            icon="bx-show-alt"
            rounded
            color="success"
            class="ma-2 pa-2"
            @click="$router.push(`/mahasiswa/${item.nim}`)"
          />
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
