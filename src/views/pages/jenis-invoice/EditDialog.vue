<script setup lang="ts">
const props = defineProps({
  id: Number,
})

const emit = defineEmits(['submit'])
const dialog = ref(false)
const nama = ref()
const biaya = ref()
const adminId = inject('adminId')

watch(dialog, async newX => {
  if (newX) {
    const { data } = await useFetch(`${import.meta.env.VITE_SISERKOM_API_URL}/jenis-invoice/${props.id}`).get().json()

    nama.value = data.value.nama
    biaya.value = data.value.biaya
  }
})

async function submit() {
  const { data: submitData } = await useFetch(`${import.meta.env.VITE_SISERKOM_API_URL}/jenis-invoice/${props.id}`, {
    headers: {
      apikey: import.meta.env.VITE_SISERKOM_API_KEY,
    },
  }).put({
    biaya: biaya.value,
    nama: nama.value,
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
        title="Ubah Jenis Tagihan"
      >
        <VCardText>
          <VRow dense>
            <VCol
              cols="12"
              sm="6"
            >
              <VTextField
                v-model="nama"
                label="Nama*"
                required
              />
            </VCol>
            <VCol
              cols="12"
              sm="6"
            >
              <VTextField
                v-model="biaya"
                label="Biaya*"
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
