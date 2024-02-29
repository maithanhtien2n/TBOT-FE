<script setup>
import { useField } from "vee-validate";

const props = defineProps({
  name: { type: String, required: true, default: "" },
  label: { type: String, required: false, default: "" },
  placeholder: { type: String, required: false, default: "" },
  class: { type: String, required: false, default: "" },
  style: { type: Object, required: false, default: () => {} },
  disabled: { type: Boolean, required: false, default: false },
  type: { type: String, required: false, default: "text" },
  inputTextProps: {
    type: Object,
    required: false,
    default: () => {
      return {
        maxlength: 100,
        required: true,
      };
    },
  },
});

const emits = defineEmits(["onChange", "onInput"]);

const { value, errorMessage, setErrors, setValue, validate } = useField(
  props.name
);

const onInputUpdatePassword = (event) => {
  setValue(event.target.value);
  emits("onInput");
};
</script>

<template>
  <div :class="['flex flex-column gap-2', props.class]" :style="props.style">
    <label v-show="props.label">
      <span>{{ props.label }}</span>
      <span v-show="props.inputTextProps.required" class="p-error"> *</span>
    </label>

    <div class="flex flex-column gap-1 w-full">
      <InputText
        v-if="props.type === 'text'"
        type="text"
        v-model="value"
        class="w-full"
        :disabled="props.disabled"
        :maxlength="props.inputTextProps.maxlength"
        :placeholder="props.placeholder"
        @input="emits('onInput')"
        @change="emits('onChange')"
      />

      <InputText
        v-if="props.type === 'number'"
        type="text"
        v-model="value"
        class="w-full"
        :disabled="props.disabled"
        :maxlength="props.inputTextProps.maxlength"
        :placeholder="props.placeholder"
        @input="emits('onInput')"
        @change="emits('onChange')"
        onkeydown="
            return (
            event.key >= 0 ||
            event.key == 'Backspace' ||
            event.key == 'Tab');"
      />

      <Password
        v-if="props.type === 'password'"
        v-model="value"
        class="w-full"
        :disabled="props.disabled"
        :placeholder="props.placeholder"
        :feedback="false"
        toggleMask
        inputClass="w-full"
        @input="onInputUpdatePassword"
        @change="emits('onChange')"
      />
      <small v-show="errorMessage" class="p-error">{{ errorMessage }}</small>
    </div>
  </div>
</template>
