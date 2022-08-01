import React, { useContext, useEffect } from "react";

import Header from "components/Header";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";

import { setUser } from "redux/slices/user";
import { syncCartToDb, setCartItems } from "redux/slices/cart";
import { loadState } from "utils/browser-storage";
import OrderContext from "context/OrderContext";
import userApi from "adapters/user-adapter";
import MapContext from "context/MapContext";
import AddressModal from "components/profile/addressess/AddressModal";
import { appContext } from "context/app-context";

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const { setAddressModalOpen, addressModalOpen } = useContext(appContext);

  const getUserData = async () => {
    try {
      const { data, status } = await userApi.getUserData();
      if (status === 200) {
        if (user.user.addresses === undefined) {
          dispatch(setUser(data.user));
        }
        let localBasket = loadState();
        if (!_.isEmpty(localBasket?.items)) {
          dispatch(syncCartToDb(localBasket?.items));
        } else {
          dispatch(setCartItems(data.userBasket));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.user]);

  return (
    <OrderContext>
      <>
        <Header />
        <section className="main-section">
          {children}
          <MapContext>
            <AddressModal
              isOpen={addressModalOpen}
              onClose={() => setAddressModalOpen(false)}
              modalState="map"
            />
          </MapContext>
        </section>
      </>
    </OrderContext>
  );
};

export default MainLayout;
