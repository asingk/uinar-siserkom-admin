<script setup lang="ts">
const emit = defineEmits(['submit'])
const dialog = ref(false)
const username = ref('')
const nama = ref('')
const adminId = inject('adminId')

async function submit() {
  const { data } = await useFetch(`${import.meta.env.VITE_SISERKOM_API_URL}/pengajar`, {
    headers: {
      apikey: import.meta.env.VITE_SISERKOM_API_KEY,
    },
  }).post({
    username: username.value,
    nama: nama.value,
    createdBy: adminId,
  })

  if (data) {
    dialog.value = false
    emit('submit')
  }
}
</script>

<template>
  <div class="pa-4">
    <VDialog
      v-model="dialog"
      max-width="600"
    >
      <template #activator="{ props: activatorProps }">
        <VBtn v-bind="activatorProps">
          Tambah
          <VIcon
            end
            icon="bx-plus-circle"
          />
        </VBtn>
      </template>

      <VCard
        prepend-icon="bx-plus-circle"
        title="Tambah Pengajar"
      >
        <VCardText>
          <VRow dense>
            <VCol
              cols="12"
              sm="6"
            >
              <VTextField
                v-model="username"
                label="Username*"
                required
              />
            </VCol>
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
