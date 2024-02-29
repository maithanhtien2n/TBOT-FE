<script setup>
import { useField } from "vee-validate";

const props = defineProps({
  name: { type: String, required: true, default: "" },
  label: { type: String, required: false, default: "" },
  class: { type: String, required: false, default: "" },
  style: { type: Object, required: false, default: () => {} },
  disabled: { type: Boolean, required: false, default: false },
  type: { type: String, required: false, default: "locale" },
  inputNumberProps: {
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

const emits = defineEmits(["onBlur", "onChange", "onInput"]);

const { value, errorMessage, setErrors, setValue, validate } = useField(
  props.name
);

const onInput = (e) => {
  setValue(e?.value);
  emits("onInput");
};
</script>

<template>
  <div :class="['flex flex-column gap-2', props.class]" :style="props.style">
    <label>
      <span>{{ props.label }}</span>
      <span v-show="props.inputNumberProps.required" class="p-error">*</span>
    </label>

    <div class="flex flex-column gap-1 w-full">
      <InputNumber
        v-if="props.type === 'locale'"
        v-model="value"
        class="w-full"
        :disabled="props.disabled"
        currency="VND"
        locale="vn-VN"
        @input="onInput"
        @change="emits('onChange')"
      />

      <InputNumber
        v-if="props.type === 'number'"
        v-model="value"
        class="w-full"
        :useGrouping="false"
        :disabled="props.disabled"
        @input="onInput"
        @change="emits('onChange')"
      />
      <small v-show="errorMessage" class="p-error">{{ errorMessage }}</small>
    </div>
  </div>
</template>
