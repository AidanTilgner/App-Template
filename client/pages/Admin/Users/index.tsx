import React, { useState } from "react";
import useFetch from "../../../Hooks/useFetch";
import { Roles, User } from "../../../declarations/main";
import styles from "./index.module.scss";
import { TrashSimple, PencilSimple, Check, X, Power } from "@phosphor-icons/react";
import { useUser } from "../../../Contexts/User";

const Index = () => {
  const {
    data: users,
    loading,
    load: refreshUsers,
  } = useFetch<undefined, User[]>({
    url: "/users",
    runOnMount: true,
  });

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
          {users?.map((user) => <UserRow key={user.id} user={user} refreshUsers={refreshUsers} />)}
        </tbody>
      </table>
    </div>
  );
};

export default Index;

const UserRow = ({ user, refreshUsers }: { user: User; refreshUsers: () => void }) => {
  const [editing, setEditing] = useState(false);
  const [newUser, setNewUser] = useState<Partial<User>>({});

  const { load: updateUser } = useFetch<Partial<User>, User>({
    url: `/users/${user.id}`,
    method: "PUT",
    body: newUser,
    onFinally: refreshUsers,
  });

  const { load: deleteUser } = useFetch<undefined, undefined>({
    url: `/users/${user.id}`,
    method: "DELETE",
    onFinally: refreshUsers,
    onConfirm: () => {
      if (window.confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) {
        return true;
      }
      return false;
    },
  });

  const formatDate = (date: string) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  const statusClass = user.active ? styles.status_active : styles.status_inactive;

  const { load: toggleStatus } = useFetch<
    {
      active: boolean;
    },
    undefined
  >({
    url: `/users/${user.id}`,
    method: "PUT",
    body: { active: !user.active },
    onFinally: refreshUsers,
  });

  const { user: currUser } = useUser();

  const filteredRoleOptions = () => {
    const allRoles = ["superadmin", "admin", "user"];

    return allRoles.filter((role) => {
      const userRoleIndex = allRoles.indexOf(role);
      const currUserRoleIndex = allRoles.indexOf(currUser.role);
      return userRoleIndex >= currUserRoleIndex;
    });
  };

  return (
    <tr className={`${styles.userrow} ${statusClass} ${editing ? styles.editing : ""}`}>
      <td>
        {editing ? (
          <div className={styles.nameGroup}>
            <input
              type="text"
              value={user.firstName || ""}
              onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
              placeholder={user.firstName}
            />
            <input
              type="text"
              value={user.lastName || ""}
              onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
              placeholder={user.lastName}
            />
          </div>
        ) : (
          `${user.firstName} ${user.lastName}`
        )}
      </td>
      <td>
        {editing ? (
          <div className={styles.roleGroup}>
            <select
              value={user.role || ""}
              onChange={(e) => {
                if (e.target.value in filteredRoleOptions())
                  setNewUser({ ...newUser, role: e.target.value as Roles });
              }}
            >
              {filteredRoleOptions().map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <span className={styles["role_" + user.role] + " " + styles.role}>{user.role}</span>
        )}
      </td>
      <td>
        {editing ? (
          <input
            type="text"
            value={user.email || ""}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            placeholder={user.email}
          />
        ) : (
          <span>{user.email}</span>
        )}
      </td>
      <td>{formatDate(user.createdAt)}</td>
      <td>{formatDate(user.updatedAt)}</td>
      <td>
        {!editing && (
          <button
            className={styles.action_btn}
            title="Edit user"
            onClick={() => {
              setEditing(!editing);
              setNewUser(user);
            }}
          >
            <PencilSimple weight="bold" />
          </button>
        )}
        {editing && (
          <button
            className={styles.action_btn}
            title="Cancel edit"
            onClick={() => {
              setEditing(false);
              setNewUser({});
            }}
          >
            <X weight="bold" />
          </button>
        )}
        {editing && (
          <button
            className={styles.action_btn}
            title="Save user"
            onClick={() => {
              updateUser();
              setEditing(false);
            }}
          >
            <Check weight="bold" />
          </button>
        )}
        <button className={styles.action_btn} title="Delete user" onClick={() => deleteUser()}>
          <TrashSimple weight="bold" />
        </button>
        <button
          className={
            styles.action_btn + " " + (user.active ? styles.power_active : styles.power_inactive)
          }
          title="Toggle user status"
          onClick={() => toggleStatus()}
        >
          <Power weight="bold" />
        </button>
      </td>
    </tr>
  );
};
