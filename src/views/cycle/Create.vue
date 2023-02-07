<script setup>
import { reactive } from "vue";
import { createCycle } from "../../api";

const state = reactive({
    cycles: [],
  loading: false,
});

</script>
