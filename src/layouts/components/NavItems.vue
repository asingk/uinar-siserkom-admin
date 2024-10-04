<script lang="ts" setup>
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import VerticalNavGroup from '@layouts/components/VerticalNavGroup.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
</script>

<template>
  <!-- 👉 Dashboards -->
  <VerticalNavGroup
    :item="{
      title: 'Dashboards',
      badgeContent: '1',
      badgeClass: 'bg-error',
      icon: 'bx-home-smile',
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'Analytics',
        to: '/dashboard',
      }"
    />
  </VerticalNavGroup>

  <!-- 👉 Apps & Pages -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Admin & Pengajar',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Mahasiswa',
      icon: 'bx-male-female',
      to: '/mahasiswa',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Tagihan',
      icon: 'bx-receipt',
      to: '/invoice',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Kelas',
      icon: 'bx-arch',
      to: '/kelas',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Pengajar',
      icon: 'bx-group',
      to: '/pengajar',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Mata Kuliah',
      icon: 'bx-notepad',
      to: '/matakuliah',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Nilai Ujian',
      icon: 'bx-book-content',
      to: '/nilai-ujian',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Jenis Tagihan',
      icon: 'bx-leaf',
      to: '/jenis-tagihan',
    }"
  />
</template>
