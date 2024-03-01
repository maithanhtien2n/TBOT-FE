<script setup>
import { useConfirm } from "primevue/useconfirm";
import { reactive, onMounted, computed, watch } from "vue";
import IconTitle from "@/components/common/IconTitle.vue";
import { STORE_TOP_UP_HISTORY_ADMIN } from "@/services/stores";
import {
  formatDate,
  formatToVND,
  isValidFormat,
  getCurrentMonthYear,
} from "@/utils";

const confirm = useConfirm();

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

const revenue = reactive({
  dataTime: getCurrentMonthYear(),
  calculatedMoney: 0,
  errorMessage: "",
});

const totalAmountDeposited = computed(() =>
  topUpHistory.value
    .map((item) => item?.moneyNumber)
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0)
);

const onSearch = (keySearch) => {
  onActionGetTopUpHistory(keySearch);
};

const onInputDateTime = () => {
  if (isValidFormat(revenue.dataTime)) {
    revenue.errorMessage = isValidFormat(revenue.dataTime);
  } else {
    revenue.errorMessage = "";
  }
};

const onSeeRevenue = () => {
  if (revenue.errorMessage) {
    return;
  }

  const totalMoney = topUpHistory.value
    .filter((item) =>
      `${formatDate(item?.createdAt)}`.includes(revenue.dataTime)
    )
    .map((item) => item?.moneyNumber)
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

  revenue.calculatedMoney = totalMoney;

  confirm.require({
    message: `Số tiền: ${formatToVND(revenue.calculatedMoney)}`,
    header: `Doanh thu tháng ${revenue.dataTime}`,
    acceptClass: "hidden",
    rejectLabel: "Đóng",
    rejectClass: "p-button-outlined",
  });
};

watch(
  () => data.body.keySearch,
  (newKeySearch) => {
    if (!newKeySearch) onActionGetTopUpHistory(data.body.keySearch, true);
  }
);

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
        <div class="flex flex-column gap-3">
          <span class="text-2xl text-600">
            Tổng số tiền nạp: {{ formatToVND(totalAmountDeposited) }}
          </span>

          <div class="flex flex-wrap gap-2 justify-content-between">
            <div class="w-20rem flex flex-column gap-1">
              <InputGroup class="w-full">
                <InputText
                  v-model="data.body.keySearch"
                  placeholder="Tìm theo tên tài khoản"
                  size="small"
                  class="w-full"
                  maxLength="35"
                />
                <Button
                  icon="pi pi-search"
                  :class="{ 'p-disabled': !data.body.keySearch }"
                  @click="onSearch(data.body.keySearch)"
                />
              </InputGroup>
              <small v-show="revenue.errorMessage" class="p-error opacity-0">
                {{ revenue.errorMessage }}
              </small>
            </div>

            <div class="w-20rem flex flex-column gap-1">
              <InputGroup class="w-full">
                <InputText
                  v-model="revenue.dataTime"
                  placeholder="Xem theo tháng, năm"
                  size="small"
                  class="flex-1"
                  maxLength="35"
                  @input="onInputDateTime"
                />
                <Button
                  label="Số tiền nạp theo tháng"
                  :class="[{ 'p-disabled': !revenue.dataTime }]"
                  @click="onSeeRevenue(revenue.dataTime)"
                />
              </InputGroup>
              <small v-show="revenue.errorMessage" class="p-error">
                {{ revenue.errorMessage }}
              </small>
            </div>
          </div>
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

  <ConfirmDialog />
</template>
