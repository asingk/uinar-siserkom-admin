<script setup lang="ts">
const props = defineProps({
  id: String,
})

const emit = defineEmits(['submit'])
const dialog = ref(false)
const nilaiAngka = ref()
const isLulus = ref()
const adminId = inject('adminId')

watch(dialog, async newX => {
  if (newX) {
    const { data } = await useFetch(`${import.meta.env.VITE_SISERKOM_API_URL}/nilai-ujian/${props.id}`).get().json()

    nilaiAngka.value = data.value.nilaiAngka
    isLulus.value = data.value.isLulus
  }
})

async function submit() {
  const { data: submitData } = await useFetch(`${import.meta.env.VITE_SISERKOM_API_URL}/nilai-ujian/${props.id}`, {
    headers: {
      apikey: import.meta.env.VITE_SISERKOM_API_KEY,
    },
  }).put({
    nilaiAngka: nilaiAngka.value,
    isLulus: isLulus.value,
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
        :title="`Ubah Nilai Ujian ${props.id}`"
      >
        <VCardText>
          <VRow dense>
            <VCol cols="12">
              <VTextField
                v-model="nilaiAngka"
                label="Nilai Angka*"
                required
                type="number"
              />
            </VCol>
            <VCol
              cols="12"
              md="9"
            >
              <VCheckbox
                v-model="isLulus"
                label="Lulus"
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
