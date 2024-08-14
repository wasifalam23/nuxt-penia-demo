<script setup>
import { TrashIcon, HeartIcon } from '@heroicons/vue/24/solid';

const taskStore = useTaskStore();
const { task } = defineProps(['task']);
</script>

<template>
  <div class="task">
    <h3>{{ task.title }}</h3>
    <div class="icons">
      <TrashIcon @click="taskStore.deleteTask(task.id)" />
      <HeartIcon
        :class="{ active: task.isFav }"
        @click="taskStore.toggleFav(task.id)"
      />
    </div>
  </div>
</template>
