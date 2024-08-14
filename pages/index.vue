<script setup>
	const taskStore = useTaskStore();

	// const { tasks, isLoading, favs, totalCount, favCount } = storeToRefs(taskStore);

	onMounted(() => {
		taskStore.getTasks();
	});
	const filter = ref("all");
</script>

<template>
	<main>
		<header>
			<img src="@/assets/pinia-logo.svg" alt="pinia_logo" />
			<h1>Pinia Tasks</h1>
		</header>

		<div class="new-task-form">
			<TaskForm />
		</div>

		<nav class="filter">
			<button @click="filter = 'all'">All tasks</button>
			<button @click="filter = 'favs'">Fav tasks</button>
		</nav>

		<div class="loading" v-if="taskStore.isLoading">Loading tasks...</div>

		<div class="task-list" v-if="filter === 'all'">
			<p>You have {{ taskStore.totalCount }} tasks left to do</p>
			<div v-for="task in taskStore.tasks">
				<TaskDetails :task="task" />
			</div>
		</div>
		<div class="task-list" v-if="filter === 'favs'">
			<p>You have {{ taskStore.favCount }} favs left to do</p>
			<div v-for="task in taskStore.favs">
				<TaskDetails :task="task" />
			</div>
		</div>

		<!-- <button @click="taskStore.$reset">reset state</button> -->
	</main>
</template>
