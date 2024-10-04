<script setup lang="ts">
import TambahDialog from '@/views/pages/pengajar/TambahDialog.vue'
import EditDialog from '@/views/pages/pengajar/EditDialog.vue'
import HapusDialog from '@/views/pages/pengajar/HapusDialog.vue'

const pengajarList = ref([])

const url = `${import.meta.env.VITE_SISERKOM_API_URL}/pengajar`

const { data } = await useFetch(url).get().json()

pengajarList.value = data.value
async function submit() {
  const { data: submitData } = await useFetch(url).get().json()

  pengajarList.value = submitData.value
}
</script>

<template>
  <TambahDialog @submit="submit" />
  <VTable>
    <thead>
      <tr>
        <th class="text-uppercase">
          Username
        </th>
        <th>
          Nama
        </th>
        <th>
          Aktif
        </th>
        <th />
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="item in pengajarList"
        :key="item.id"
      >
        <td>
          {{ item.username }}
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
</template>
