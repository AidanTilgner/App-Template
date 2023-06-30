import Controller from ".";
import { entities } from "../database";
import User from "../database/models/user";

export default class UserController extends Controller<User> {
  constructor() {
    super({ model: "User", name: "User" });
  }

  public async list() {
    try {
      return await this.getRepository()?.find();
    } catch (error) {
      this.error(error);
      return undefined;
    }
  }

  public async create(data: any) {
    try {
      if (!data) {
        throw new Error("No data provided");
      }
      if (!data.email) {
        throw new Error("No email provided");
      }
      if (!data.password) {
        throw new Error("No password provided");
      }
      if (!data.firstName) {
        throw new Error("No firstName provided");
      }
      if (!data.lastName) {
        throw new Error("No lastName provided");
      }
      if (!data.role) {
        throw new Error("No role provided");
      }
      const user = new entities.User();
      user.email = data.email;
      user.password = data.password;
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.role = data.role;
      return await this.getRepository()?.save(user);
    } catch (error) {
      this.error(error);
      return undefined;
    }
  }

  public async update(data: any) {
    try {
      if (!data) {
        throw new Error("No data provided");
      }
      if (!data.id) {
        throw new Error("No id provided");
      }
      const user = await this.getRepository()?.findOne(data.id);
      if (!user) {
        throw new Error("No user found");
      }
      if (data.email) {
        user.email = data.email;
      }
      if (data.password) {
        user.password = data.password;
      }
      if (data.firstName) {
        user.firstName = data.firstName;
      }
      if (data.lastName) {
        user.lastName = data.lastName;
      }
      if (data.role) {
        user.role = data.role;
      }
      return await this.getRepository()?.save(user);
    } catch (error) {
      this.error(error);
      return undefined;
    }
  }

  public async read(id: string) {
    try {
      if (!id) {
        throw new Error("No id provided");
      }
      return await this.getRepository()?.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      this.error(error);
      return undefined;
    }
  }

  public async delete(id: string) {
    try {
      if (!id) {
        throw new Error("No id provided");
      }

      const user = await this.getRepository()?.findOne({
        where: {
          id,
        },
      });
      if (!user) {
        throw new Error("No user found");
      }

      const deleted = await this.getRepository()?.remove(user);
      if (!deleted) {
        return false;
      }
      return true;
    } catch (error) {
      this.error(error);
      return undefined;
    }
  }
}
