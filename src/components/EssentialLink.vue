<template>
  <div v-if="!hide">
    <q-expansion-item
      v-if="children"
      :icon="icon || 'menu_open'"
      :label="title"
    >
      <EssentialLink
        v-for="child in children"
        :key="child.title"
        :level="level + 1"
        v-bind="child"
        :style="`padding-left:${level * 2 + 3}em !important`"
      />
    </q-expansion-item>
    <!-- <q-item v-else clickable :to="link" :style="style"> -->
    <q-item v-else clickable :to="link">
      <q-item-section v-if="icon" avatar>
        <q-icon :name="icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ title }}</q-item-label>
        <q-item-label v-if="caption" caption>{{ caption }}</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script setup lang="ts">
export interface EssentialLinkProps {
  title: string
  caption?: string
  link?: string
  icon?: string
  children?: EssentialLinkProps[]
  level?: number
  hide?: boolean
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
  level: 0,
})
</script>
