import { createApp } from "vue";
import PrimeVue from "primevue/config";
import { createPinia } from "pinia";

import AppWrapper from "./AppWrapper.vue";
import router from "./services/router";
import "./assets/main.css";

import ToastService from "primevue/toastservice";
import Tooltip from "primevue/tooltip";

// PrimeVue Component
import "primevue/resources/themes/aura-light-green/theme.css";
import "primevue/resources/primevue.min.css";

// PrimeVue Icon
import "primeicons/primeicons.css";

// PrimeVue CSS
import "/node_modules/primeflex/primeflex.css";

// Components
import RatingCustom from "@/components/common/RatingCustom.vue";
import BackgroundRemovePopup from "@/components/common/BackgroundRemovePopup.vue";
import PopupNotification from "@/components/common/PopupNotification.vue";
import StatusComponent from "@/components/common/StatusComponent.vue";
import IconTitle from "@/components/common/IconTitle.vue";
import UserChat from "@/components/common/UserChat.vue";
import ButtonBack from "@/components/common/ButtonBack.vue";

import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import Password from "primevue/password";
import Button from "primevue/button";
import Galleria from "primevue/galleria";
import Carousel from "primevue/carousel";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import Dialog from "primevue/dialog";
import ProgressSpinner from "primevue/progressspinner";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import FileUpload from "primevue/fileupload";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Editor from "primevue/editor";
import ScrollPanel from "primevue/scrollpanel";
import Image from "primevue/image";
import Rating from "primevue/rating";
import Toast from "primevue/toast";
import Textarea from "primevue/textarea";
import Checkbox from "primevue/checkbox";
import Listbox from "primevue/listbox";
import ConfirmationService from "primevue/confirmationservice";
import ConfirmDialog from "primevue/confirmdialog";
import SelectButton from "primevue/selectbutton";
import Sidebar from "primevue/sidebar";
import PanelMenu from "primevue/panelmenu";
import InputNumber from "primevue/inputnumber";
import Skeleton from "primevue/skeleton";
import Message from "primevue/message";
import ProgressBar from "primevue/progressbar";
import Avatar from "primevue/avatar";
import Tag from "primevue/tag";
import Chip from "primevue/chip";
import Timeline from "primevue/timeline";
import InputOtp from "primevue/inputotp";
import InputGroup from "primevue/inputgroup";

const app = createApp(AppWrapper);

app.use(createPinia());
app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.directive("tooltip", Tooltip);
app.use(ConfirmationService);

app.component("RatingCustom", RatingCustom);
app.component("BackgroundRemovePopup", BackgroundRemovePopup);
app.component("PopupNotification", PopupNotification);
app.component("StatusComponent", StatusComponent);
app.component("IconTitle", IconTitle);
app.component("UserChat", UserChat);
app.component("ButtonBack", ButtonBack);

app.component("InputText", InputText);
app.component("FloatLabel", FloatLabel);
app.component("Password", Password);
app.component("Button", Button);
app.component("Galleria", Galleria);
app.component("Carousel", Carousel);
app.component("Dropdown", Dropdown);
app.component("Calendar", Calendar);
app.component("Dialog", Dialog);
app.component("ProgressSpinner", ProgressSpinner);
app.component("TabView", TabView);
app.component("TabPanel", TabPanel);
app.component("FileUpload", FileUpload);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("Editor", Editor);
app.component("ScrollPanel", ScrollPanel);
app.component("Image", Image);
app.component("Rating", Rating);
app.component("Toast", Toast);
app.component("Textarea", Textarea);
app.component("Checkbox", Checkbox);
app.component("Listbox", Listbox);
app.component("ConfirmDialog", ConfirmDialog);
app.component("SelectButton", SelectButton);
app.component("Sidebar", Sidebar);
app.component("PanelMenu", PanelMenu);
app.component("InputNumber", InputNumber);
app.component("Skeleton", Skeleton);
app.component("Message", Message);
app.component("ProgressBar", ProgressBar);
app.component("Avatar", Avatar);
app.component("Tag", Tag);
app.component("Chip", Chip);
app.component("Timeline", Timeline);
app.component("InputOtp", InputOtp);
app.component("InputGroup", InputGroup);

app.mount("#app");
