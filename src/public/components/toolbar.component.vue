<script>
import LanguageSwitcher from "./language-switcher.component.vue";
import {useRouter} from "vue-router";

export default {
  name: "toolbar",
  components: {LanguageSwitcher},
  data() {
    return {
      router: useRouter(),
      items: [
        {
          label: 'Sign Out',
          icon: 'pi pi-fw pi-sign-out',
          command: () => {
            localStorage.clear();
            this.router.push('/sign-in');
          }
        }
      ]
    }
  },
  computed: {
    currentUsername() {
      const username = localStorage.getItem("username");
      if (username && username.length >= 2) {
        return username.slice(0, 2).toUpperCase();
      } else if (username && username.length === 1) {
        return username.toUpperCase();
      } else {
        return "NA";
      }
    }
  },
  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event);
    }
  }
}
</script>

<template>
  <pv-toolbar class="bg-primary">
    <template #start>
      <img src="../../assets/images/bontech_logo.png" alt="Bondtech Logo" class="h-[250px] object-fill" />
    </template>
    <template #center>
      <router-link :to="{ name: 'home' }"
                   class="text-white text-lg font-bold">
       Home
      </router-link>
    </template>
    <template #end>
      <language-switcher />
      <div class="flex items-center gap-2">
        <pv-button type="button" :label="currentUsername" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu"
                   icon="pi pi-user" class="bg-white text-primary"
        />
        <pv-menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
      </div>
    </template>
  </pv-toolbar>
</template>

<style scoped>

</style>