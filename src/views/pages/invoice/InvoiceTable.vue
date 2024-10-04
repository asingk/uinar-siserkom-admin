<script setup lang="ts">
const page = ref(1)
const searchString = ref('')
const debouncedSearchString = ref('')

const debouncedFn = useDebounceFn(newVal => {
  debouncedSearchString.value = newVal
}, 500, { maxWait: 5000 })

watch(searchString, newVal => {
  debouncedFn(newVal)
})

const url = computed(() => {
  return `${import.meta.env.VITE_SISERKOM_API_URL}/invoice?page=${page.value - 1}&size=20&searchString=${debouncedSearchString.value}`
})

const { data } = await useFetch(url, { refetch: true }).get().json()
</script>

<template>
  <VRow justify="end">
    <VCol cols="4">
      <VTextField
        v-model="searchString"
        label="Cari ID / NIM"
        append-inner-icon="bx-search"
        class="ma-2"
      />
    </VCol>
  </VRow>
  <VTable>
    <thead>
      <tr>
        <th class="text-uppercase">
          ID
        </th>
        <th>
          Jenis
        </th>
        <th>
          Tanggal
        </th>
        <th>
          NIM
        </th>
        <th>
          Nama
        </th>
        <th>
          Lunas
        </th>
        <th>
          Kode Sevima
        </th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="item in data._embedded?.invoiceModelList"
        :key="item.id"
      >
        <td>
          {{ item.id }}
        </td>
        <td>
          {{ item.namaJenis }}
        </td>
        <td>
          {{ item.createdAt.substring(0, 10) }}
        </td>
        <td>
          {{ item.nim }}
        </td>
        <td>
          {{ item.namaMahasiswa }}
        </td>
        <td>
          <i
            v-if="item.isSudahBayar"
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
          {{ item.sevimaInv }}
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
