import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../conf/conf";

export class BookingServices {
  client = new Client();
  database;
  bucket;

  constructor() {
    this.client
      .setProject(conf.projectId);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
    async createBooking(data) {
        try {
        const response = await this.database.createDocument(
            conf.bookingDataBase,
            conf.userInfoCollectionId,
            ID.unique(),
            data
        );
        return response;
        } catch (error) {
        console.error("Error creating booking:", error);
        throw error;
        }
    }
    async getBookingData() {
        try {
        const response = await this.database.listDocuments(
            conf.bookingDataBase,
            conf.userInfoCollectionId
        );
        return response.documents;
        } catch (error) {
        console.error("Error fetching booking data:", error);
        throw error;
        }
    }
    async deleteBookingData(bookingId) {
        try {
        const response = await this.database.deleteDocument(
            conf.bookingDataBase,
            conf.userInfoCollectionId,
            bookingId
        );
        return response;
        } catch (error) {
        console.error("Error deleting booking data:", error);
        throw error;
        }
    }

    async deleteMultipleBookingData(bookingIds) {
        try {
            const deletePromises = bookingIds.map(id => this.deleteBookingData(id));
            const responses = await Promise.all(deletePromises);
            return responses;
        } catch (error) {
            console.error("Error deleting multiple booking data:", error);
            throw error;
        }
    }



}

const bookingServices = new BookingServices();
export { bookingServices};