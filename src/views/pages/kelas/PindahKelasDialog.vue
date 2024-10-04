<script setup lang="ts">
const props = defineProps({
  id: String,
  nama: String,
  jenis: Number,
  idKelas: Number,
})

const emit = defineEmits(['submit'])
const dialog = ref(false)
const kelasItem = ref([])
const kelasBaruId = ref()
const adminId = inject('adminId')

watch(dialog, async newX => {
  if (newX) {
    const { data } = await useFetch(`${import.meta.env.VITE_SISERKOM_API_URL}/kelas/available?jenisInvoice=${props.jenis}`).get().json()

    kelasItem.value = data.value.map(row => ({ value: row.id, title: `${row.namaPengajar} | ${row.tanggal} | ${row.jam.substring(0, 5)}` }))
  }
})

async function submit() {
  await useFetch(`${import.meta.env.VITE_SISERKOM_API_URL}/kelas/${props.idKelas}/invoice/${props.id}`, {
    headers: {
      apikey: import.meta.env.VITE_SISERKOM_API_KEY,
    },
  }).delete({
    updatedBy: adminId,
  })

  const { data: submitData } = await useFetch(`${import.meta.env.VITE_SISERKOM_API_URL}/invoice/${props.id}/kelas/${kelasBaruId.value}`, {
    headers: {
      apikey: import.meta.env.VITE_SISERKOM_API_KEY,
    },
  }).post({
    updatedBy: adminId,
  })

  if (submitData) {
    dialog.value = false
    emit('submit')
  }
}
</script>

<template>
  <div class="pa-2">
    <VDialog
      v-model="dialog"
      max-width="600"
    >
      <template #activator="{ props: activatorProps }">
        <VBtn
          v-bind="activatorProps"
          icon="bx-right-arrow-alt"
          rounded
          color="info"
        />
      </template>

      <VCard
        prepend-icon="bx-edit-alt"
        :title="`Pindah Kelas ${props.nama}`"
      >
        <VCardText>
          <VRow dense>
            <VCol cols="12">
              <VSelect
                v-model="kelasBaruId"
                :items="kelasItem"
                label="Kelas*"
                required
              />
            </VCol>
          </VRow>
          <small class="text-caption text-medium-emphasis">*wajib diisi</small>
        </VCardText>

        <VDivider />

        <VCardActions>
          <VSpacer />

          <VBtn
            text="Close"
            variant="plain"
            @click="dialog = false"
          />

          <VBtn
            color="primary"
            text="Save"
            variant="tonal"
            @click="submit"
          />
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>
