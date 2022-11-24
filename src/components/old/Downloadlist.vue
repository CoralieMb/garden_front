<template>
  <div class="telecharger">
    <p class="text">Télécharger la liste complète</p>
    <div @click="download()" class="btn">
      <Icon class="iconify" icon="vscode-icons:file-type-excel" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Icon } from "@iconify/vue2";
export default {
  name: "Downloadlist",
  components: {
    Icon,
  },
  methods: {
    async download() {
      const path = "/export_uais/";
      try {
        const response = await axios.get(path, { responseType: "blob" });
        let data = response.data;
        /* If we want another format (ex : .zip) we have to replace "ms-excel" */
        const blob = new Blob([data], { type: "application/vnd.ms-excel" });
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "export_uais.xls";
        link.click();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.telecharger {
  display: flex;
}

.text {
  margin-right: 15px;
}

.btn {
  position: relative;
  bottom: 4px;
  right: 8px;
}

.iconify {
  width: 24px;
  height: 24px;
  margin-left: 5px;
}

.iconify:hover {
  cursor: pointer;
}
</style>
>
