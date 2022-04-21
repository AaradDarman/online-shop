import { createContext } from "react";

export const productsContext = createContext({
  page: 1,
  setPage: () => {},
  sortBy: "",
  setSortBy: () => {},
  handleShowDeleteDialog: () => {},
  handleShowEditModal: () => {},
});
