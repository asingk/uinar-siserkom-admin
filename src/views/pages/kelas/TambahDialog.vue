<script setup lang="ts">
const emit = defineEmits(['submit'])
const dialog = ref(false)
const d = new Date()
const pengajarItem = ref()
const tahun = ref(null)
const bulan = ref(null)
const tanggal = ref(null)
const jam = ref(null)
const menit = ref(null)
const waktu = ref('')
const pengajarId = ref(null)
const jenisId = ref(null)
const dayaTampung = ref(null)
const adminId = inject('adminId')

const jenisItem = [
  { value: 1, title: 'Pelatihan' },
  { value: 2, title: 'Ujian' },
]

watch(dialog, async newX => {
  if (newX) {
    const { data } = await useFetch(`${import.meta.env.VITE_SISERKOM_API_URL}/pengajar`).get().json()

    pengajarItem.value = data.value.filter(row => !row.isDisabled)
  }
})

async function submit() {
  const { data } = await useFetch(`${import.meta.env.VITE_SISERKOM_API_URL}/kelas`, {
    headers: {
      apikey: import.meta.env.VITE_SISERKOM_API_KEY,
    },
  }).post({
    idPengajar: pengajarId.value,
    idJenisInvoice: jenisId.value,
    waktu: waktu.value,
    dayaTampung: dayaTampung.value,
    createdBy: adminId,
  })

  if (data) {
    dialog.value = false
    emit('submit')
  }
}
watchEffect(() => {
  const bulanStr = bulan.value < 10 ? `0${bulan.value}` : bulan.value
  const tglStr = tanggal.value < 10 ? `0${tanggal.value}` : tanggal.value
  const jamStr = jam.value < 10 ? `0${jam.value}` : jam.value
  const menitStr = menit.value < 10 ? `0${menit.value}` : menit.value

  waktu.value = `${tahun.value}-${bulanStr}-${tglStr}T${jamStr}:${menitStr}:00`
})
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
        title="Tambah Kelas"
      >
        <VCardText>
          <VRow dense>
            <VCol
              cols="12"
              sm="6"
            >
              <VSelect
                v-model="jenisId"
                :items="jenisItem"
                label="Jenis*"
                required
              />
            </VCol>
            <VCol
              cols="12"
              sm="6"
            >
              <VSelect
                v-model="pengajarId"
                :items="pengajarItem"
                label="Pengajar*"
                item-title="nama"
                item-value="id"
                required
              />
            </VCol>
            <VCol
              cols="12"
              sm="4"
            >
              <VSelect
                v-model="tahun"
                :items="[d.getFullYear(), d.getFullYear() + 1]"
                label="Tahun*"
                required
              />
            </VCol>
            <VCol
              cols="12"
              sm="4"
            >
              <VSelect
                v-model="bulan"
                :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
                label="Bulan*"
                required
              />
            </VCol>
            <VCol
              cols="12"
              sm="4"
            >
              <VSelect
                v-model="tanggal"
                :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]"
                label="Tanggal*"
                required
              />
            </VCol>
            <VCol
              cols="12"
              sm="4"
            >
              <VSelect
                v-model="jam"
                :items="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]"
                label="Jam*"
                required
              />
            </VCol>
            <VCol
              cols="12"
              sm="4"
            >
              <VSelect
                v-model="menit"
                :items="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]"
                label="Menit*"
                required
              />
            </VCol>
            <VCol
              cols="12"
              md="4"
              sm="6"
            >
              <VTextField
                v-model="dayaTampung"
                label="Daya Tampung*"
                type="number"
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
