/*
 *
 * HomePage
 *
 */

import React, { memo, useState, useEffect } from "react";
import { nanoid } from "nanoid";
import {
  Layout,
  BaseHeaderLayout,
  ContentLayout,
} from "@strapi/design-system/Layout";

import { EmptyStateLayout } from "@strapi/design-system/EmptyStateLayout";
import { Button } from "@strapi/design-system/Button";
import Plus from "@strapi/icons/Plus";
import { Illo } from "../../components/Illo";

import TodoModal from "../../components/TodoModal";
import TodoCount from "../../components/TodoCount";
import TodoTable from "../../components/TodoTable";
import { LoadingIndicatorPage, useFetchClient } from "@strapi/helper-plugin";

const HomePage = () => {
  const [todoData, setTodoData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { get, put, del, post } = useFetchClient();
  const fetchData = async () => {
    const { data } = await get("/todo/find");
    setTodoData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function addTodo(data) {
    await post("/todo/create", {
      data: data,
    });
    fetchData();
  }

  async function toggleTodo(id) {
    await put(`/todo/toggle/${id}`);
  }

  async function deleteTodo(id) {
    await del(`/todo/delete/${id}`);
    fetchData();
  }

  async function editTodo(id, data) {
    await put(`/todo/update/${id}`, {
      data: data,
    });
    fetchData();
  }

  if (isLoading) {
    return <LoadingIndicatorPage />;
  }
  return (
    <Layout>
      <BaseHeaderLayout
        title="Todo Plugin"
        subtitle="All your todos in one place."
        as="h2"
      />

      <ContentLayout>
        {todoData.length === 0 ? (
          <EmptyStateLayout
            icon={<Illo />}
            content="You don't have any todos yet..."
            action={
              <Button
                onClick={() => setShowModal(true)}
                variant="secondary"
                startIcon={<Plus />}
              >
                Add your first todo
              </Button>
            }
          />
        ) : (
          <>
            <TodoCount count={todoData.length} />
            <TodoTable
              todoData={todoData}
              setShowModal={setShowModal}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          </>
        )}
      </ContentLayout>
      {showModal && <TodoModal setShowModal={setShowModal} addTodo={addTodo} />}
    </Layout>
  );
};

export default memo(HomePage);
