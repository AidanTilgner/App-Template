import React from "react";
import useFetch from "../../../Hooks/useFetch";
import { User } from "../../../declarations/main";
import styles from "./index.module.scss";
import { TrashSimple, PencilSimple } from "@phosphor-icons/react";

const Index = () => {
  console.log("rendered");
  const { data: users, loading } = useFetch<undefined, User[]>({
    url: "/users",
    runOnMount: true,
  });

  console.log("users: ", users);

  return (
    <div className={styles.users}>
      {loading && <p>Loading...</p>}
      <h1>Users</h1>
      <br />
      <table className={styles.usertable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td>{`${user.firstName} ${user.lastName}`}</td>
              <td className={styles["role_" + user.role]}>{user.role}</td>
              <td>{user.email}</td>
              <td>{user.createdAt}</td>
              <td>{user.updatedAt}</td>
              <td>
                <button className={styles.action_btn} title="Edit user">
                  <PencilSimple weight="bold" />
                </button>
                <button className={styles.action_btn} title="Delete user">
                  <TrashSimple weight="bold" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Index;
