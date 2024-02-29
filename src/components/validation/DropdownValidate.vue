<script setup>
import { useField } from "vee-validate";

const props = defineProps({
  name: { type: String, required: true, default: "" },
  label: { type: String, required: false, default: "" },
  options: { type: Array, required: false, default: "" },
  class: { type: String, required: false, default: "" },
  style: { type: Object, required: false, default: () => {} },
  disabled: { type: Boolean, required: false, default: false },
  placeholder: { type: String, required: false, default: "" },
  dropdownProps: {
    type: Object,
    required: false,
    default: () => {
      return {
        optionLabel: "name",
        optionValue: "code",
        placeholder: "",
        class: "",
        required: true,
      };
    },
  },
});

const emits = defineEmits(["onChange"]);

const { value, errorMessage, setErrors, setValue } = useField(props.name);
</script>

<template>
  <div :class="['flex flex-column gap-2', props.class]" :style="props.style">
    <label>
      <span>{{ props.label }}</span>
      <span v-show="props.dropdownProps.required" class="p-error"> *</span>
    </label>

    <div class="flex flex-column gap-1 w-full">
      <Dropdown
        v-model="value"
        :options="props.options"
        :optionLabel="props.dropdownProps.optionLabel"
        :optionValue="props.dropdownProps.optionValue"
        :placeholder="props.placeholder"
        :class="props.dropdownProps.class"
        :disabled="props.disabled"
        @change="emits('onChange')"
      />
      <small v-show="errorMessage" class="p-error">{{ errorMessage }}</small>
    </div>
  </div>
</template>
