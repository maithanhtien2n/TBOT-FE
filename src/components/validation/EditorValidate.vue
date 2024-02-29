<script setup>
import { useField } from "vee-validate";

const props = defineProps({
  name: { type: String, required: true, default: "" },
  label: { type: String, required: false, default: "" },
  class: { type: String, required: false, default: "" },
  editorStyle: { type: String, required: false, default: "height: 180px" },
  style: { type: Object, required: false, default: () => {} },
  disabled: { type: Boolean, required: false, default: false },
  editorProps: {
    type: Object,
    required: false,
    default: () => {
      return {
        length: 100,
        required: true,
      };
    },
  },
});

const emits = defineEmits(["onChange", "onInput"]);

const { value, errorMessage, setErrors, setValue, validate } = useField(
  props.name
);
</script>

<template>
  <div :class="['flex flex-column gap-2', props.class]" :style="props.style">
    <label>
      <span>{{ props.label }}</span>
      <span v-show="props.editorProps.required" class="p-error">*</span>
    </label>

    <div
      :class="{ 'p-disabled': props.disabled }"
      class="flex flex-column gap-1"
    >
      <Editor v-model="value" :editorStyle="props.editorStyle"> </Editor>
      <small v-show="errorMessage" class="p-error">{{ errorMessage }}</small>
    </div>
  </div>
</template>
