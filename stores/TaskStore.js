import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
	state: () => ({
		tasks: [],
		isLoading: false,
	}),

	getters: {
		favs() {
			return this.tasks.filter((task) => task.isFav);
		},

		favCount() {
			return this.tasks.reduce((p, c) => {
				return c.isFav ? p + 1 : p;
			}, 0);
		},

		totalCount: (state) => {
			return state.tasks.length;
		},
	},

	actions: {
		async getTasks() {
			this.isLoading = true;
			const res = await $fetch("http://localhost:3000/tasks");

			this.tasks = res;

			this.isLoading = false;
		},

		async addTask(task) {
			this.tasks.push(task);

			const res = await $fetch("http://localhost:3000/tasks", {
				method: "POST",
				body: JSON.stringify(task),
				headers: { "Content-Type": "application/json" },
			});

			if (res.error) {
				console.log(res.error);
			}
		},

		async deleteTask(id) {
			try {
				this.tasks = this.tasks.filter((task) => task.id !== id);

				await $fetch("http://localhost:3000/tasks/" + id, {
					method: "DELETE",
				});
			} catch (err) {
				console.error("🤪", err);
			}
		},

		async toggleFav(id) {
			try {
				const task = this.tasks.find((task) => task.id === id);
				task.isFav = !task.isFav;

				await $fetch("http://localhost:3000/tasks/" + id, {
					method: "PATCH",
					body: JSON.stringify({ isFav: task.isFav }),
					headers: { "Content-Type": "application/json" },
				});
			} catch (err) {
				console.error("🤪", err);
			}
		},
	},
});
