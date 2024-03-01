<script setup>
import IconTitle from "@/components/common/IconTitle.vue";
import { reactive, computed, onMounted, watch } from "vue";
import { STORE_QUESTION_ADMIN } from "@/services/stores";
import { useConfirm } from "primevue/useconfirm";
import UserCard from "@/components/common/UserCard.vue";
import { socket } from "@/utils";

const confirm = useConfirm();

const {
  onGetterListQuestion,
  onActionGetListQuestion,
  onActionDeleteQuestion,
  onActionReplyQuestion,
} = STORE_QUESTION_ADMIN.StoreQuestion();

const tabMenu = [
  {
    name: "Tất cả",
    code: "ALL",
  },
  {
    name: "Chưa trả lời",
    code: "NOT_ANSWERED",
  },
  {
    name: "Đã trả lời",
    code: "ANSWERED",
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
  replyContent: null,
  tableSelection: [],
});

const notifications = computed(() => {
  switch (data.tabIndex) {
    case 0:
      return onGetterListQuestion.value.all;
    case 1:
      return onGetterListQuestion.value.notAnswered;
    case 2:
      return onGetterListQuestion.value.answered;
    default:
      return onGetterListQuestion.value.all;
  }
});

const onTabChange = () => {
  data.body.keySearch = "";
  data.tableSelection = [];
};

const onSearch = (tab, keySearch) => {
  onActionGetListQuestion({ tab, keySearch });
};

const onClickConfirm = (type, message, question, { tab, keySearch }) => {
  if (question.answer) {
    data.replyContent = question.answer.content;
  }

  confirm.require({
    message: `Bạn muốn ${message} câu hỏi?`,
    header: type === "DELETE" ? "Xác nhận" : "Nhập câu trả lời",
    acceptLabel: type === "DELETE" ? "Đồng ý" : "Trả lời",
    acceptClass: type === "DELETE" ? "p-button-danger" : "",
    rejectLabel: "Hủy bỏ",
    rejectClass: "p-button-outlined",
    accept: async () => {
      if (type === "DELETE") {
        await onActionDeleteQuestion(question._id);
      }

      if (type === "REPLY") {
        await onActionReplyQuestion({
          questionId: question._id,
          answer: data.replyContent || "",
        });
      }

      socket.emit("isNewData", "Dữ liệu mới");
      onActionGetListQuestion({ tab, keySearch }, true);
      data.replyContent = "";
    },
    type,
  });
};

watch(
  () => data.body.keySearch,
  (newKeySearch) => {
    if (!newKeySearch)
      onActionGetListQuestion({ tab: "ALL", keySearch: "" }, true);
  }
);

onMounted(() => {
  onActionGetListQuestion({ tab: "ALL", keySearch: "" });
});
</script>

<template>
  <div class="flex flex-column gap-3">
    <IconTitle icon="pi pi-question-circle" title="Câu hỏi của người dùng" />

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
            field="question"
            header="Câu hỏi"
            class="white-space-nowrap"
            style="width: 13rem"
          >
            <template #body="{ data }">
              <UserCard
                :value="{
                  avatar: data?.question?.avatar || '/images/avatar.jpg',
                  fullName: data?.question?.fullName || data?.question?.email,
                  sentDate: data?.question?.sentDate,
                  content: data?.question?.content,
                }"
              />
            </template>
          </Column>

          <Column
            field="answer"
            header="Câu trả lời"
            class="white-space-nowrap"
            style="width: 13rem"
          >
            <template #body="{ data }">
              <UserCard
                v-if="data?.answer"
                :value="{
                  avatar: '/images/avatar-admin.jpg',
                  fullName: 'Quản trị viên',
                  sentDate: data?.answer?.sentDate,
                  content: data?.answer?.content,
                }"
              />

              <div v-else class="p-2 card-bg text-center">Chưa trả lời</div>
            </template>
          </Column>

          <Column
            class="white-space-nowrap"
            headerClass="text-center"
            style="width: 7rem"
          >
            <template #header>
              <div class="text-center w-full">Thao tác</div>
            </template>

            <template #body="{ data }">
              <div class="flex gap-3 justify-content-center">
                <Button
                  icon="pi pi-trash "
                  class="p-button-danger"
                  @click="
                    onClickConfirm('DELETE', 'xóa', data, {
                      tab: tab.code,
                      keySearch: data.body?.keySearch,
                    })
                  "
                />
                <Button
                  :icon="`pi ${!data.answer ? 'pi-check' : 'pi-pencil'} `"
                  @click="
                    onClickConfirm('REPLY', 'trả lời', data, {
                      tab: tab.code,
                      keySearch: data.body?.keySearch,
                    })
                  "
                />
              </div>
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
      <Textarea
        v-if="slotProps.message.type === 'REPLY'"
        v-model="data.replyContent"
        class="w-20rem"
        rows="2"
      />

      <span v-else>{{ slotProps.message.message }}</span>
    </template>
  </ConfirmDialog>
</template>
