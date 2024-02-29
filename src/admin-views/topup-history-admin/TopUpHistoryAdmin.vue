<script setup>
import { formatDate, formatToVND } from "@/utils";
import { reactive, onMounted } from "vue";
import IconTitle from "@/components/common/IconTitle.vue";
import { STORE_TOP_UP_HISTORY_ADMIN } from "@/services/stores";

const { onGetterTopUpHistory: topUpHistory, onActionGetTopUpHistory } =
  STORE_TOP_UP_HISTORY_ADMIN.StoreTopUpHistoryAdmin();

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

const onSearch = (keySearch) => {
  onActionGetTopUpHistory(keySearch);
};

onMounted(() => {
  onActionGetTopUpHistory();
});
</script>

<template>
  <div class="flex flex-column gap-3">
    <IconTitle icon="pi pi-history" title="Lịch sử nạp tiền" />

    <DataTable
      :paginator="true"
      :value="topUpHistory"
      :first="data.body.pagination.first"
      :rows="data.body.pagination.rows"
      :rowsPerPageOptions="[5, 10, 15, 20]"
      :removableSort="true"
      paginatorTemplate=" FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      currentPageReportTemplate="Hiển thị {first} - {last} / tổng {totalRecords} dòng"
      class="card"
    >
      <template #header>
        <div class="flex flex-wrap gap-2 justify-content-between">
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

      <Column
        field="email"
        header="Tên tài khoản"
        headerClass="white-space-nowrap"
        bodyClass="line-height-3"
        style="width: 7rem"
        :sortable="true"
      />

      <Column
        field="moneyNumber"
        header="Số tiền"
        headerClass="white-space-nowrap"
        bodyClass="line-height-3"
        style="width: 7rem"
        :sortable="true"
      >
        <template #body="{ data }">
          <span>+{{ formatToVND(data?.moneyNumber) }}</span>
        </template>
      </Column>

      <Column
        field="content"
        header="Nội dung"
        headerClass="white-space-nowrap"
        bodyClass="line-height-3"
        style="width: 7rem"
        :sortable="true"
      />

      <Column
        field="moneyBalance"
        header="Số dư cuối cùng"
        headerClass="white-space-nowrap"
        bodyClass="line-height-3"
        style="width: 7rem"
        :sortable="true"
      >
        <template #body="{ data }">
          <span>{{ formatToVND(data?.moneyBalance) }}</span>
        </template>
      </Column>

      <Column
        field="createdAt"
        header="Thời gian"
        class="white-space-nowrap"
        style="width: 7rem"
        :sortable="true"
      >
        <template #body="{ data }">
          <span>{{ formatDate(data?.createdAt, true) }}</span>
        </template>
      </Column>

      <template #empty>
        <div class="flex justify-content-center">
          Không tìm thấy kết quả nào
        </div>
      </template>
    </DataTable>
  </div>
</template>
