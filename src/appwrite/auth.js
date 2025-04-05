import { Account, Client, ID } from "appwrite";
import conf from "../conf/conf";

class AuthServices {
  client = new Client();
  account = new Account(this.client);

  constructor() {
    this.client
      .setProject(conf.projectId);
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("Appwrite service :: login :: error", error);
      throw error;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSession('current');
    } catch (error) {
      console.error("Appwrite service :: logout :: error", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Appwrite service :: getCurrentUser :: error", error);
      // Return null instead of throwing if user is not authenticated
      return null;
    }
  }

 

}

const authService = new AuthServices();
export default authService;
