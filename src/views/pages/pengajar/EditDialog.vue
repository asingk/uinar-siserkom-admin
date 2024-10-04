<script setup lang="ts">
const props = defineProps({
  id: Number,
})

const emit = defineEmits(['submit'])
const dialog = ref(false)
const username = ref()
const nama = ref()
const isAktif = ref()
const adminId = inject('adminId')

watch(dialog, async newX => {
  if (newX) {
    const { data } = await useFetch(`${import.meta.env.VITE_SISERKOM_API_URL}/pengajar/${props.id}`).get().json()

    username.value = data.value.username
    nama.value = data.value.nama
    isAktif.value = !data.value.isDisabled
  }
})

async function submit() {
  const { data: submitData } = await useFetch(`${import.meta.env.VITE_SISERKOM_API_URL}/pengajar/${props.id}`, {
    headers: {
      apikey: import.meta.env.VITE_SISERKOM_API_KEY,
    },
  }).put({
    username: username.value,
    nama: nama.value,
    isDisabled: !isAktif.value,
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
        title="Ubah Pengajar"
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
            <VCol
              cols="12"
              md="9"
            >
              <VCheckbox
                v-model="isAktif"
                label="Aktif"
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
