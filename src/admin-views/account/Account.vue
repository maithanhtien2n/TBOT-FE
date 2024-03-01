<script setup>
import { ToastService } from "@/utils/toast";
import { formatToVND, socket, formatDate } from "@/utils";
import { useConfirm } from "primevue/useconfirm";
import { STORE_ACCOUNT_ADMIN } from "@/services/stores";
import IconTitle from "@/components/common/IconTitle.vue";
import { reactive, computed, onMounted, watch } from "vue";

const TOAST = ToastService();
const confirm = useConfirm();

const {
  onGetterListUser: listUser,
  onActionGetListUser,
  onActionUpdateMoneyBalanceUser,
  onActionUpdateStatusUser,
  onActionDeleteAccount,
} = STORE_ACCOUNT_ADMIN.StoreAccountAdmin();

const tabMenu = [
  {
    name: "Tất cả",
    code: "ALL",
  },
  {
    name: "Đang hoạt động",
    code: "ACTIVE",
  },
  {
    name: "Đã khóa",
    code: "LOCKED",
  },
  {
    name: "Chưa xác thực",
    code: "NO_AUTH",
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

const accounts = computed(() => {
  switch (data.tabIndex) {
    case 0:
      return listUser.value.all;
    case 1:
      return listUser.value.active;
    case 2:
      return listUser.value.locked;
    case 3:
      return listUser.value.noAuth;
    default:
      return listUser.value.all;
  }
});

const onMapTableSelection = (field) => {
  return data.tableSelection.map((item) => item[field]);
};

const onDisableButton = (code) => {
  return !onMapTableSelection("status").includes(code);
};

const onReturnGender = (code) => {
  switch (code) {
    case "male":
      return "Nam";
    case "female":
      return "Nữ";
    case "other":
      return "Khác";
    default:
      return "";
  }
};

const onTabChange = () => {
  data.body.keySearch = "";
  data.tableSelection = [];
};

const onSearch = (tab, keySearch) => {
  if (keySearch) onActionGetListUser({ tab, keySearch });
};

const onClickConfirm = (status, message, type, { tab, keySearch }) => {
  if (
    onMapTableSelection("status").includes(
      ["TOPUP", "DELETE"].includes(type) ? "LOCKED" : type
    )
  ) {
    TOAST.error("Vui lòng chỉ chọn dòng dữ liệu có trạng thái: " + status);
    return;
  }

  confirm.require({
    message: `Bạn muốn ${message} tài khoản?`,
    header: type === "TOPUP" ? "Nhập số tiền cần nạp" : "Xác nhận",
    acceptLabel: type === "TOPUP" ? "Nạp tiền" : "Đồng ý",
    acceptClass: ["LOCKED", "DELETE"].includes(type) ? "p-button-danger" : "",
    rejectLabel: "Hủy bỏ",
    rejectClass: "p-button-outlined",
    type,
    accept: async () => {
      if (type === "TOPUP") {
        const res = await onActionUpdateMoneyBalanceUser({
          ids: onMapTableSelection("_id"),
          moneyNumber: data.topUpNumber,
        });

        if (res.success) {
          await onActionGetListUser({ tab, keySearch }, true);
          socket.emit("isNewData", "Dữ liệu mới");

          data.topUpNumber = null;
          data.tableSelection = [];
        }
      } else if (type === "DELETE") {
        const res = await onActionDeleteAccount(onMapTableSelection("_id"));
        if (res.success) {
          await onActionGetListUser({ tab, keySearch }, true);
          data.tableSelection = [];
        }
      } else {
        const res = await onActionUpdateStatusUser({
          ids: onMapTableSelection("_id"),
          status: type,
        });
        if (res.success) {
          await onActionGetListUser({ tab, keySearch }, true);
          data.tableSelection = [];
        }
      }
    },
  });
};

watch(
  () => data.body.keySearch,
  (newKeySearch) => {
    if (!newKeySearch) onActionGetListUser({ tab: "ALL", keySearch: "" }, true);
  }
);

onMounted(() => {
  onActionGetListUser({ tab: "ALL", keySearch: "" });
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
          paginatorTemplate=" FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Hiển thị {first} - {last} / tổng {totalRecords} dòng"
        >
          <template #header>
            <div class="flex flex-wrap gap-2 justify-content-between">
              <div class="flex gap-2">
                <Button
                  v-show="tab.code !== 'ACTIVE' && tab.code !== 'NO_AUTH'"
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
                  v-show="tab.code !== 'LOCKED' && tab.code !== 'NO_AUTH'"
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
                <Button
                  v-show="tab.code !== 'LOCKED' && tab.code !== 'NO_AUTH'"
                  label="Nạp tiền"
                  severity="secondary"
                  :disabled="onDisableButton('ACTIVE')"
                  @click="
                    onClickConfirm('hoạt động', 'nạp tiền', 'TOPUP', {
                      tab: tab.code,
                      keySearch: data.body.keySearch,
                    })
                  "
                />
                <Button
                  v-show="tab.code === 'NO_AUTH'"
                  label="Xóa tài khoản"
                  class="p-button-danger"
                  :disabled="onDisableButton('NO_AUTH')"
                  @click="
                    onClickConfirm('hoạt động', 'xóa', 'DELETE', {
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
            field="email"
            header="Tên tài khoản"
            class="white-space-nowrap"
            style="width: 7rem"
            :sortable="true"
          />

          <Column
            field="avatar"
            header="Ảnh đại diện"
            class="white-space-nowrap"
            style="width: 7rem"
            :hidden="tab.code === 'NO_AUTH'"
          >
            <template #body="{ data }">
              <img
                class="w-4rem h-4rem object-fit-cover box-shadow-1"
                :src="data.avatar || '/images/avatar.jpg'"
                onerror="this.onerror=null; this.src='/images/avatar.jpg';"
              />
            </template>
          </Column>

          <Column
            field="fullName"
            header="Họ và tên"
            class="white-space-nowrap"
            style="width: 7rem"
            :sortable="true"
            :hidden="tab.code === 'NO_AUTH'"
          />

          <Column
            field="phoneNumber"
            header="Số điện thoại"
            class="white-space-nowrap"
            style="width: 7rem"
            :sortable="true"
            :hidden="tab.code === 'NO_AUTH'"
          />

          <Column
            field="gender"
            header="Giới tính"
            class="white-space-nowrap"
            style="width: 7rem"
            :sortable="true"
            :hidden="tab.code === 'NO_AUTH'"
          >
            <template #body="{ data }">
              <span>{{ onReturnGender(data.gender) }}</span>
            </template>
          </Column>

          <Column
            field="otp"
            header="Mã xác thực"
            class="white-space-nowrap"
            style="width: 7rem"
            :sortable="true"
            :hidden="tab.code !== 'NO_AUTH'"
          />

          <Column
            field="createdAt"
            header="Ngày đăng ký"
            class="white-space-nowrap"
            style="width: 7rem"
            :sortable="true"
            :hidden="tab.code !== 'NO_AUTH'"
          >
            <template #body="{ data }">
              <span>{{ formatDate(data?.createdAt, true) }}</span>
            </template>
          </Column>

          <Column
            field="updatedAt"
            header="Ngày đăng ký gần nhất"
            class="white-space-nowrap"
            style="width: 7rem"
            :sortable="true"
            :hidden="tab.code !== 'NO_AUTH'"
          >
            <template #body="{ data }">
              <span>{{ formatDate(data?.updatedAt, true) }}</span>
            </template>
          </Column>

          <Column
            field="moneyBalance"
            header="Số dư"
            class="white-space-nowrap"
            style="width: 7rem"
            :sortable="true"
            :hidden="tab.code === 'NO_AUTH'"
          >
            <template #body="{ data }">
              <span>{{ formatToVND(data.moneyBalance) }}</span>
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

  <ConfirmDialog class="line-height-3">
    <template #message="slotProps">
      <InputNumber
        v-if="slotProps.message.type === 'TOPUP'"
        v-model="data.topUpNumber"
        class="w-full"
        currency="VND"
        locale="vn-VN"
      />
      <span v-else>{{ slotProps.message.message }}</span>
    </template>
  </ConfirmDialog>
</template>
