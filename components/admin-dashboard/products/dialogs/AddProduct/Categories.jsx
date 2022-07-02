import React, { useEffect } from "react";

import styled from "styled-components";
import { TreeSelect, ConfigProvider } from "antd";
import { FormHelperText, useTheme } from "@mui/material";
import "antd/dist/antd.variable.min.css";
import { useSelector } from "react-redux";

ConfigProvider.config({
  theme: {
    primaryColor: "#7fd4ff",
  },
});

const StyledTreeSelect = styled(TreeSelect)`
  margin-top: 8px;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.palette.text.primary};
`;

const Categories = ({ onChange, category, error, helperText, onBlur }) => {
  const { categories } = useSelector((state) => state);

  const [updatedCategories, setUpdatedCategories] = React.useState([]);

  useEffect(() => {
    setUpdatedCategories(
      categories.entity.map((cat) =>
        replaceKeysDeep(cat, {
          name: "title",
          _id: "value",
          subcategories: "children",
        })
      )
    );
    // eslint-disable-next-line
  }, []);

  const handleOnSelect = (value, label, extra) => {
    if (value === undefined && label[0] === undefined) {
      onChange({});
    } else {
      onChange({ value, label: label[0] });
    }
  };

  function replaceKeysDeep(obj, keysMap) {
    return _.transform(obj, function (result, value, key) {
      var currentKey = keysMap[key] || key;
      result[currentKey] = _.isObject(value)
        ? replaceKeysDeep(value, keysMap)
        : value;
    });
  }

  const theme = useTheme();
  return (
    <ConfigProvider direction="rtl">
      <StyledTreeSelect
        className={`${
          theme.palette.mode === "dark"
            ? "custom-treeselect_dark"
            : "custom-treeselect"
        } ${error ? "error" : ""}`}
        dropdownClassName={
          theme.palette.mode === "dark"
            ? "custom-dropdown_dark"
            : "custom-dropdown"
        }
        style={{ width: "100%" }}
        value={category?.value}
        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
        treeData={updatedCategories}
        placeholder="دسته بندی"
        allowClear
        onChange={handleOnSelect}
        onBlur={onBlur}
      />
      <FormHelperText
        sx={{ marginRight: "14px", marginLeft: "14px" }}
        error={error}
        id="category-error"
      >
        {helperText}
      </FormHelperText>
    </ConfigProvider>
  );
};

export default Categories;
