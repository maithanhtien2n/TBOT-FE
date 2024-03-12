<script setup>
import { ToastService } from "@/utils/toast";
import { formatToVND, socket, formatDate } from "@/utils";
import { useConfirm } from "primevue/useconfirm";
import { STORE_APPLICATION_ADMIN } from "@/services/stores";
import IconTitle from "@/components/common/IconTitle.vue";
import { reactive, computed, onMounted, watch } from "vue";
import ApplicationAdminDialog from "./ApplicationAdminDialog.vue";

const TOAST = ToastService();
const confirm = useConfirm();

const {
  onGetterListBotVersatile: listBotVersatile,
  onActionGetListBotVersatile,
  onActionSaveBotVersatile,
  onActionUpdateStatusBotVersatile,
} = STORE_APPLICATION_ADMIN.StoreApplicationAdmin();

const tabMenu = [
  {
    name: "Tất cả",
    code: "ALL",
  },
  {
    name: "Dự thảo",
    code: "DRAFT",
  },
  {
    name: "Đang hoạt động",
    code: "ACTIVE",
  },
  {
    name: "Đã khóa",
    code: "LOCKED",
  },
];

const data = reactive({
  tabIndex: 0,
  body: {
    pagination: {
      first: 0,
      rows: 5,
      sort: null,
    },
    keySearch: "",
  },
  topUpNumber: null,
  tableSelection: [],
  rowValue: null,
});

const accounts = computed(() => {
  switch (data.tabIndex) {
    case 0:
      return listBotVersatile.value.all;
    case 1:
      return listBotVersatile.value.draft;
    case 2:
      return listBotVersatile.value.active;
    case 3:
      return listBotVersatile.value.locked;
    default:
      return listBotVersatile.value.all;
  }
});

const onMapTableSelection = (field) => {
  return data.tableSelection.map((item) => item[field]);
};

const onDisableButton = (code) => {
  return !onMapTableSelection("status").includes(code);
};

const onTabChange = () => {
  data.body.keySearch = "";
  data.tableSelection = [];
};

const onSearch = (tab, keySearch) => {
  if (keySearch) onActionGetListBotVersatile({ tab, keySearch });
};

const onClickConfirm = (status, message, type, { tab, keySearch }) => {
  if (type === "DRAFT") {
    if (
      onMapTableSelection("status").includes("ACTIVE") ||
      onMapTableSelection("status").includes("LOCKED")
    ) {
      TOAST.error("Vui lòng chỉ chọn dòng dữ liệu có trạng thái: " + status);
      return;
    }
  } else {
    if (
      onMapTableSelection("status").includes(type) ||
      onMapTableSelection("status").includes("DRAFT")
    ) {
      TOAST.error("Vui lòng chỉ chọn dòng dữ liệu có trạng thái: " + status);
      return;
    }
  }

  confirm.require({
    message: `Bạn muốn ${message} ứng dụng?`,
    header: "Xác nhận",
    acceptLabel: "Đồng ý",
    acceptClass: ["LOCKED"].includes(type) ? "p-button-danger" : "",
    rejectLabel: "Hủy bỏ",
    rejectClass: "p-button-outlined",
    accept: async () => {
      switch (type) {
        case "DRAFT":
          await onActionUpdateStatusBotVersatile({
            ids: onMapTableSelection("_id"),
            status: "ACTIVE",
          });
          break;
        case "ACTIVE":
          await onActionUpdateStatusBotVersatile({
            ids: onMapTableSelection("_id"),
            status: "ACTIVE",
          });
          break;
        case "LOCKED":
          await onActionUpdateStatusBotVersatile({
            ids: onMapTableSelection("_id"),
            status: "LOCKED",
          });
          break;
      }
      onActionGetListBotVersatile({ tab, keySearch }, true);
      data.tableSelection = [];
    },
  });
};

const onRowDbClick = (event) => {
  data.rowValue = event.data;
};

const onSaveBotVersatile = async (event, { tab, keySearch }) => {
  const res = await onActionSaveBotVersatile(event);
  if (res.success) {
    onActionGetListBotVersatile({ tab, keySearch }, true);
    data.rowValue = null;
  }
};

watch(
  () => data.body.keySearch,
  (newKeySearch) => {
    if (!newKeySearch)
      onActionGetListBotVersatile({ tab: "ALL", keySearch: "" }, true);
  }
);

onMounted(() => {
  onActionGetListBotVersatile({ tab: "ALL", keySearch: "" });
});
</script>

<template>
  <div class="flex flex-column gap-3">
    <IconTitle icon="pi pi-user" title="Quản lý tài khoản" />

    <TabView
      v-model:activeIndex="data.tabIndex"
      @tab-change="onTabChange"
      class="card"
    >
      <TabPanel v-for="(tab, index) in tabMenu" :key="index" :header="tab.name">
        <DataTable
          :paginator="true"
          v-model:selection="data.tableSelection"
          :value="accounts"
          :first="data.body.pagination.first"
          :rows="data.body.pagination.rows"
          :rowsPerPageOptions="[5, 10, 15, 20]"
          :removableSort="true"
          @row-dblclick="onRowDbClick($event)"
          paginatorTemplate=" FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Hiển thị {first} - {last} / tổng {totalRecords} dòng"
        >
          <template #header>
            <div class="flex flex-wrap gap-2 justify-content-between">
              <div class="flex gap-2">
                <ApplicationAdminDialog
                  v-if="['DRAFT'].includes(tab.code)"
                  :value="data.rowValue"
                  @onOpen="data.rowValue = null"
                  @onCancel="data.rowValue = null"
                  @onSave="
                    onSaveBotVersatile($event, {
                      tab: tab.code,
                      keySearch: data.body.keySearch,
                    })
                  "
                />
                <Button
                  v-show="!['ACTIVE', 'DRAFT'].includes(tab.code)"
                  label="Mở khóa"
                  :disabled="onDisableButton('LOCKED')"
                  @click="
                    onClickConfirm('đã khóa', 'mở khóa', 'ACTIVE', {
                      tab: tab.code,
                      keySearch: data.body.keySearch,
                    })
                  "
                />
                <Button
                  v-show="['ALL', 'DRAFT'].includes(tab.code)"
                  label="Kích hoạt"
                  severity="secondary"
                  :disabled="onDisableButton('DRAFT')"
                  @click="
                    onClickConfirm('dự thảo', 'kích hoạt', 'DRAFT', {
                      tab: tab.code,
                      keySearch: data.body.keySearch,
                    })
                  "
                />
                <Button
                  v-show="!['LOCKED', 'DRAFT'].includes(tab.code)"
                  label="Khóa"
                  class="p-button-danger"
                  :disabled="onDisableButton('ACTIVE')"
                  @click="
                    onClickConfirm('hoạt động', 'khóa', 'LOCKED', {
                      tab: tab.code,
                      keySearch: data.body.keySearch,
                    })
                  "
                />
              </div>

              <InputGroup class="w-20rem">
                <InputText
                  v-model="data.body.keySearch"
                  placeholder="Tìm theo tên tài khoản"
                  size="small"
                  class="w-full"
                  maxLength="35"
                  @keypress.enter="onSearch(tab.code, data.body.keySearch)"
                />
                <Button
                  icon="pi pi-search"
                  :class="{ 'p-disabled': !data.body.keySearch }"
                  @click="onSearch(tab.code, data.body.keySearch)"
                />
              </InputGroup>
            </div>
          </template>

          <Column selectionMode="multiple" class="max-w-3rem w-3rem" />

          <Column
            field="image"
            header="Ảnh biểu tượng"
            headerClass="white-space-nowrap"
            style="width: 7rem"
          >
            <template #body="{ data }">
              <img
                class="w-4rem h-4rem object-fit-cover box-shadow-1"
                :src="data.image || '/images/image-product-default.svg'"
                onerror="this.onerror=null; this.src='/images/image-product-default.svg';"
              />
            </template>
          </Column>

          <Column
            field="name"
            header="Tên ứng dụng"
            headerClass="white-space-nowrap"
            style="width: 7rem"
            :sortable="true"
          />

          <Column
            field="type"
            header="Loại phản hồi"
            headerClass="white-space-nowrap"
            style="width: 7rem"
            :sortable="true"
          />

          <Column
            field="content"
            header="Nội dung đào tạo"
            bodyClass="line-height-2"
            style="width: 17rem"
            :sortable="true"
          >
            <template #body="{ data }">
              <span class="fixed-text">{{ data.content }}</span>
            </template>
          </Column>

          <Column
            field="message"
            header="Thông điệp"
            headerClass="white-space-nowrap"
            bodyClass="line-height-2"
            style="width: 7rem"
            :sortable="true"
          />

          <Column
            field="placeholder"
            header="Gợi ý nhập"
            headerClass="white-space-nowrap"
            bodyClass="line-height-2"
            style="width: 7rem"
            :sortable="true"
          />

          <Column
            field="status"
            header="Trạng thái"
            headerClass="white-space-nowrap"
            style="width: 7rem"
            :sortable="true"
          >
            <template #body="{ data }">
              <StatusComponent :code="data?.status" />
            </template>
          </Column>

          <template #empty>
            <div class="flex justify-content-center">
              Không tìm thấy kết quả nào
            </div>
          </template>
        </DataTable>
      </TabPanel>
    </TabView>
  </div>

  <ConfirmDialog />
</template>
