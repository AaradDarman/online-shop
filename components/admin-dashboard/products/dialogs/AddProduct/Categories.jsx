import React, { useEffect } from "react";

import styled from "styled-components";
import { TreeSelect, ConfigProvider } from "antd";
import { FormHelperText, useTheme } from "@mui/material";
import "antd/dist/antd.variable.min.css";

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
  let rawCategories = [
    {
      _id: "620749e7c0c0df1d00a52f45",
      parent: null,
      name: "مردانه",
      slug: "mens-apparel",
      __v: 0,
      subcategories: [
        {
          _id: "62074a8cc0c0df1d00a52f4b",
          parent: "620749e7c0c0df1d00a52f45",
          name: "لباس",
          slug: "mens-clothes",
          __v: 0,
          subcategories: [
            {
              _id: "62074b47c0c0df1d00a52f5f",
              parent: "62074a8cc0c0df1d00a52f4b",
              name: "سویشرت و هودی",
              slug: "mens-hoodies",
              __v: 0,
              subcategories: [],
            },
            {
              _id: "62074b98c0c0df1d00a52f63",
              parent: "62074a8cc0c0df1d00a52f4b",
              name: "ژاکت و پلیور",
              slug: "mens-knitwear",
              __v: 0,
              subcategories: [],
            },
            {
              _id: "62074bbdc0c0df1d00a52f67",
              parent: "62074a8cc0c0df1d00a52f4b",
              name: "تیشرت و پولو شرت",
              slug: "mens-tee-shirts-and-polos",
              __v: 0,
              subcategories: [],
            },
            {
              _id: "62074bd5c0c0df1d00a52f6b",
              parent: "62074a8cc0c0df1d00a52f4b",
              name: "پیراهن",
              slug: "mens-shirts",
              __v: 0,
              subcategories: [],
            },
            {
              _id: "62074c21c0c0df1d00a52f6f",
              parent: "62074a8cc0c0df1d00a52f4b",
              name: "شلوار",
              slug: "mens-pants",
              __v: 0,
              subcategories: [],
            },
            {
              _id: "62074c3dc0c0df1d00a52f73",
              parent: "62074a8cc0c0df1d00a52f4b",
              name: "جین",
              slug: "mens-jeans",
              __v: 0,
              subcategories: [],
            },
            {
              _id: "62074c80c0c0df1d00a52f77",
              parent: "62074a8cc0c0df1d00a52f4b",
              name: "لباس زیر",
              slug: "mens-ubder-wear",
              __v: 0,
              subcategories: [],
            },
          ],
        },
        {
          _id: "62074aaac0c0df1d00a52f4f",
          parent: "620749e7c0c0df1d00a52f45",
          name: "کیف",
          slug: "mens-bag",
          __v: 0,
          subcategories: [
            {
              _id: "62074ce0c0c0df1d00a52f7b",
              parent: "62074aaac0c0df1d00a52f4f",
              name: "کیف پول",
              slug: "mens-wallet",
              __v: 0,
              subcategories: [],
            },
            {
              _id: "62074d07c0c0df1d00a52f7f",
              parent: "62074aaac0c0df1d00a52f4f",
              name: "کوله پشتی",
              slug: "mens-backpacks",
              __v: 0,
              subcategories: [],
            },
            {
              _id: "62074d46c0c0df1d00a52f83",
              parent: "62074aaac0c0df1d00a52f4f",
              name: "کیف سفری و چمدان",
              slug: "mens-baggage",
              __v: 0,
              subcategories: [],
            },
          ],
        },
        {
          _id: "62074ab8c0c0df1d00a52f53",
          parent: "620749e7c0c0df1d00a52f45",
          name: "کفش",
          slug: "mens-shoes",
          __v: 0,
          subcategories: [
            {
              _id: "62074da0c0c0df1d00a52f87",
              parent: "62074ab8c0c0df1d00a52f53",
              name: "بوت",
              slug: "mens-boot",
              __v: 0,
              subcategories: [],
            },
            {
              _id: "62074dadc0c0df1d00a52f8b",
              parent: "62074ab8c0c0df1d00a52f53",
              name: "نیم بوت",
              slug: "mens-ankle-boots",
              __v: 0,
              subcategories: [],
            },
            {
              _id: "62074dd2c0c0df1d00a52f8f",
              parent: "62074ab8c0c0df1d00a52f53",
              name: "کفش رسمی",
              slug: "mens-formal-shoes",
              __v: 0,
              subcategories: [],
            },
            {
              _id: "62074e87c0c0df1d00a52f93",
              parent: "62074ab8c0c0df1d00a52f53",
              name: "کفش ورزشی",
              slug: "mens-sport-shoes",
              __v: 0,
              subcategories: [],
            },
          ],
        },
        {
          _id: "62074ac6c0c0df1d00a52f57",
          parent: "620749e7c0c0df1d00a52f45",
          name: "اکسسوری",
          slug: "mens-accesory",
          __v: 0,
          subcategories: [
            {
              _id: "6209e2cffde6f503f491d489",
              parent: "62074ac6c0c0df1d00a52f57",
              name: "دستبند",
              slug: "bracelet",
              __v: 0,
              subcategories: [],
            },
          ],
        },
        {
          _id: "62074ad3c0c0df1d00a52f5b",
          parent: "620749e7c0c0df1d00a52f45",
          name: "ورزشی",
          slug: "mens-sport",
          __v: 0,
          subcategories: [],
        },
      ],
    },
    {
      _id: "62074a0fc0c0df1d00a52f48",
      parent: null,
      name: "زنانه",
      slug: "womens-apparel",
      __v: 0,
      subcategories: [
        {
          _id: "62074ebdc0c0df1d00a52f97",
          parent: "62074a0fc0c0df1d00a52f48",
          name: "لباس",
          slug: "womens-clothes",
          __v: 0,
          subcategories: [
            {
              _id: "62074f44c0c0df1d00a52fab",
              parent: "62074ebdc0c0df1d00a52f97",
              name: "تاپ",
              slug: "womens-top",
              __v: 0,
              subcategories: [],
            },
            {
              _id: "62074f4bc0c0df1d00a52faf",
              parent: "62074ebdc0c0df1d00a52f97",
              name: "تونیک",
              slug: "womens-tonic",
              __v: 0,
              subcategories: [],
            },
            {
              _id: "62074f63c0c0df1d00a52fb3",
              parent: "62074ebdc0c0df1d00a52f97",
              name: "لباس زیر",
              slug: "womens-under-wear",
              __v: 0,
              subcategories: [],
            },
            {
              _id: "62074f8bc0c0df1d00a52fb7",
              parent: "62074ebdc0c0df1d00a52f97",
              name: "لباس بارداری",
              slug: "womens-maternity",
              __v: 0,
              subcategories: [],
            },
            {
              _id: "62074fb0c0c0df1d00a52fbb",
              parent: "62074ebdc0c0df1d00a52f97",
              name: "کت و جلیقه",
              slug: "womens-blazers-and-suits",
              __v: 0,
              subcategories: [],
            },
          ],
        },
        {
          _id: "62074ed3c0c0df1d00a52f9b",
          parent: "62074a0fc0c0df1d00a52f48",
          name: "کیف",
          slug: "womens-bag",
          __v: 0,
          subcategories: [
            {
              _id: "62074ff9c0c0df1d00a52fbf",
              parent: "62074ed3c0c0df1d00a52f9b",
              name: "کیف پول و لوازم آرایش",
              slug: "womens-wallets-and-cosmetic-bags",
              __v: 0,
              subcategories: [],
            },
            {
              _id: "62075031c0c0df1d00a52fc3",
              parent: "62074ed3c0c0df1d00a52f9b",
              name: "کوله پشتی",
              slug: "womens-backpacks",
              __v: 0,
              subcategories: [],
            },
          ],
        },
        {
          _id: "62074edbc0c0df1d00a52f9f",
          parent: "62074a0fc0c0df1d00a52f48",
          name: "کفش",
          slug: "womens-shoes",
          __v: 0,
          subcategories: [],
        },
        {
          _id: "62074ef4c0c0df1d00a52fa3",
          parent: "62074a0fc0c0df1d00a52f48",
          name: "اکسسوری",
          slug: "womens-accesory",
          __v: 0,
          subcategories: [],
        },
        {
          _id: "62074f06c0c0df1d00a52fa7",
          parent: "62074a0fc0c0df1d00a52f48",
          name: "ورزشی",
          slug: "womens-sport",
          __v: 0,
          subcategories: [],
        },
      ],
    },
  ];

  const [categories, setCategories] = React.useState([]);

  useEffect(() => {
    setCategories(
      rawCategories.map((cat) =>
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
        treeData={categories}
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
