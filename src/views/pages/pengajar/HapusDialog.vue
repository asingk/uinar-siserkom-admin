<script setup lang="ts">
const props = defineProps({
  id: Number,
  nama: String,
})

const emit = defineEmits(['submit'])

const dialog = ref(false)

async function submit() {
  const { data: submitData } = await useFetch(`${import.meta.env.VITE_SISERKOM_API_URL}/pengajar/${props.id}`, {
    headers: {
      apikey: import.meta.env.VITE_SISERKOM_API_KEY,
    },
  }).delete()

  if (submitData) {
    dialog.value = false
    emit('submit')
  }
}
</script>

<template>
  <div class="text-center pa-2">
    <VDialog
      v-model="dialog"
      max-width="400"
      persistent
    >
      <template #activator="{ props: activatorProps }">
        <VBtn
          v-bind="activatorProps"
          icon="bx-trash-alt"
          rounded
          color="error"
        />
      </template>

      <VCard
        prepend-icon="bx-trash-alt"
        :text="`Anda yakin menghapus pengajar ${props.nama}?`"
        title="Hapus Pengajar"
      >
        <template #actions>
          <VSpacer />

          <VBtn @click="dialog = false">
            Batal
          </VBtn>

          <VBtn @click="submit">
            Hapus
          </VBtn>
        </template>
      </VCard>
    </VDialog>
  </div>
</template>
