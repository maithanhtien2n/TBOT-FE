<script setup>
import IconTitle from "@/components/common/IconTitle.vue";
import { reactive, computed, onMounted, watch } from "vue";
import { STORE_NOTIFICATION_ADMIN } from "@/services/stores";
import { useConfirm } from "primevue/useconfirm";
import { ToastService } from "@/utils/toast";
import { useRouter } from "vue-router";
import { formatDate } from "@/utils";

const ROUTER = useRouter();
const TOAST = ToastService();
const confirm = useConfirm();

const {
  onGetterListNotification: listNotification,
  onActionGetListNotification,
  onActionUpdateStatusNotification,
} = STORE_NOTIFICATION_ADMIN.StoreNotificationAdmin();

const tabMenu = [
  {
    name: "Tất cả",
    code: "ALL",
  },
  {
    name: "Mọi người",
    code: "EVERY_BODY",
  },
  {
    name: "Cá nhân",
    code: "PERSONAL",
  },
  {
    name: "Đã từng nạp",
    code: "JOINED",
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
});

const notifications = computed(() => {
  switch (data.tabIndex) {
    case 0:
      return listNotification.value.all;
    case 1:
      return listNotification.value.everyBody;
    case 2:
      return listNotification.value.personal;
    case 3:
      return listNotification.value.joined;
    default:
      return listNotification.value.all;
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
  onActionGetListNotification({ tab, keySearch });
};

const onRowDblclick = ({ data }) => {
  ROUTER.push({ name: "NotificationDetailAdmin", params: { id: data._id } });
};

const onClickConfirm = (status, message, type, { tab, keySearch }) => {
  if (onMapTableSelection("status").includes(type)) {
    TOAST.error("Vui lòng chỉ chọn dòng dữ liệu có trạng thái: " + status);
    return;
  }

  confirm.require({
    message: `Bạn muốn ${message} thông báo?`,
    header: "Xác nhận",
    acceptLabel: "Đồng ý",
    acceptClass: type === "LOCKED" ? "p-button-danger" : "",
    rejectLabel: "Hủy bỏ",
    rejectClass: "p-button-outlined",
    accept: async () => {
      const res = await onActionUpdateStatusNotification({
        ids: onMapTableSelection("_id"),
        status: type,
      });

      if (res.success) {
        data.tableSelection = [];
        onActionGetListNotification({ tab, keySearch }, true);
      }
    },
  });
};

watch(
  () => data.body.keySearch,
  (newKeySearch) => {
    if (!newKeySearch)
      onActionGetListNotification({ tab: "ALL", keySearch: "" }, true);
  }
);

onMounted(() => {
  onActionGetListNotification({ tab: "ALL", keySearch: "" });
});
</script>

<template>
  <div class="flex flex-column gap-3">
    <IconTitle icon="pi pi-bell" title="Quản lý thông báo" />

    <TabView
      v-model:activeIndex="data.tabIndex"
      @tab-change="onTabChange"
      class="card"
    >
      <TabPanel v-for="(tab, index) in tabMenu" :key="index" :header="tab.name">
        <DataTable
          :paginator="true"
          v-model:selection="data.tableSelection"
          :value="notifications"
          :first="data.body.pagination.first"
          :rows="data.body.pagination.rows"
          :rowsPerPageOptions="[5, 10, 15, 20]"
          :removableSort="true"
          paginatorTemplate=" FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Hiển thị {first} - {last} / tổng {totalRecords} dòng"
          @rowDblclick="onRowDblclick"
        >
          <template #header>
            <div class="flex flex-wrap gap-2 justify-content-between">
              <div class="flex gap-2">
                <Button
                  label="Thêm thông báo"
                  severity="secondary"
                  @click="
                    ROUTER.push({
                      name: 'NotificationDetailAdmin',
                      params: { id: 'create' },
                      query: { sendType: tab.code },
                    })
                  "
                />
                <Button
                  v-show="tab.code !== 'ACTIVE'"
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
                  v-show="tab.code !== 'LOCKED'"
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

          <Column selectionMode="multiple" class="max-w-5rem w-5rem" />

          <Column
            field="image"
            header="Ảnh thông báo"
            class="white-space-nowrap"
            style="width: 7rem"
          >
            <template #body="{ data }">
              <img
                style="object-fit: contain"
                class="w-4rem h-4rem"
                :src="data.image || '/images/image-product-default.svg'"
                onerror="this.onerror=null; this.src='/images/image-product-default.svg';"
              />
            </template>
          </Column>

          <Column
            field="title"
            header="Tiêu đề"
            headerClass="white-space-nowrap"
            bodyClass="line-height-3"
            style="width: 13rem"
            :sortable="true"
          />

          <Column
            field="createdAt"
            header="Thời gian gửi"
            class="white-space-nowrap"
            style="width: 7rem"
            :sortable="true"
          >
            <template #body="{ data }">
              <span>{{ formatDate(data?.createdAt, true) }}</span>
            </template>
          </Column>

          <Column
            field="sendType"
            header="Đối tượng"
            class="white-space-nowrap"
            style="width: 7rem"
            :sortable="true"
          />

          <Column
            field="isNewNotification"
            header="Người dùng đã xem"
            class="white-space-nowrap"
            style="width: 7rem"
            :sortable="true"
          >
            <template #body="{ data }">
              <span>{{ data.isNewNotification ? "Chưa xem" : "Đã xem" }}</span>
            </template>
          </Column>

          <Column
            field="status"
            header="Trạng thái"
            class="white-space-nowrap"
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

  <ConfirmDialog class="line-height-3" />
</template>
