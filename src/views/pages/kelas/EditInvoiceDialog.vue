<script setup lang="ts">
const props = defineProps({
  id: String,
})

const emit = defineEmits(['submit'])
const dialog = ref(false)
const nilai = ref()
const nama = ref()
const adminId = inject('adminId')

watch(dialog, async newX => {
  if (newX) {
    const { data } = await useFetch(`${import.meta.env.VITE_SISERKOM_API_URL}/invoice/${props.id}`).get().json()

    nilai.value = data.value.nilaiUjianAngka
    nama.value = data.value.namaMahasiswa
  }
})

async function submit() {
  const { data: submitData } = await useFetch(`${import.meta.env.VITE_SISERKOM_API_URL}/invoice/${props.id}/nilai-ujian`, {
    headers: {
      apikey: import.meta.env.VITE_SISERKOM_API_KEY,
    },
  }).post({
    nilai: nilai.value,
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
          icon="bx-edit-alt"
          rounded
          color="warning"
        />
      </template>

      <VCard
        prepend-icon="bx-edit-alt"
        :title="`Ubah Nilai Ujian ${nama}`"
      >
        <VCardText>
          <VRow dense>
            <VCol cols="12">
              <VTextField
                v-model="nilai"
                label="Nilai Angka*"
                required
                type="number"
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
