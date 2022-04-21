import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const withAdminPrivileges = (WrappedComponent) => {
  const WithAdminPrivileges = ({ handleDelete, handleEdit, ...props }) => {
    return (
      <>
        <WrappedComponent {...props}>
          <div className="admin-btns-wraper">
            <IconButton onClick={handleDelete}>
              <DeleteIcon color="error"/>
            </IconButton>
            <IconButton onClick={handleEdit}>
              <EditIcon />
            </IconButton>
          </div>
        </WrappedComponent>
      </>
    );
  };
  WithAdminPrivileges.displayName = `WithAdminPrivileges(${getDisplayName(
    WrappedComponent
  )})`;
  return WithAdminPrivileges;
};

export default withAdminPrivileges;

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
};
