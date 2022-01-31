import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import {
  Register,
  Login,
  View,
  Shop,
  Product,
  SvgInfo,
  Cart,
  Addresses,
  AddressFormEdit,
  AddressFormAdd,
  Order,
  Home,
  User,
  Contact,
  YourOrders,
  Dashboard,
  AdminOrders,
  AdminCategories,
  AdminSeries,
  AdminProducts,
  AdminDelivery,
  CategoryAdd,
  CategoryEdit,
  SeriesAdd,
  SeriesEdit,
  ProductAdd,
  ProductEdit,
  DeliveryAdd,
  DeliveryEdit,
  TokenVerification,
} from "../Views";
import { Main, Sign } from "../Layouts";
import PrivateRoute from "./PrivateRoute";
import UserRoute from "./UserRoute";
import AdminRoute from "./AdminRoute";

const Routing = () => {
  return (
    <Switch>
      <Route path="/">
        <Route
          exact
          path="/"
          render={() => (
            <UserRoute>
              <Main>
                <View>
                  <Home />
                </View>
              </Main>
            </UserRoute>
          )}
        />
        <Route path="/product">
          <UserRoute>
            <Main>
              <View>
                <Route exact path="/product/:id" render={() => <Product />} />
              </View>
            </Main>
          </UserRoute>
        </Route>
        <Route path="/shop">
          <UserRoute>
            <Main>
              <View>
                <Route exact path="/shop/:category" render={() => <Shop />} />
                <Route
                  exact
                  path="/shop"
                  render={() => <Redirect to="/shop/All" />}
                />
              </View>
            </Main>
          </UserRoute>
        </Route>
        <Route path="/user">
          <UserRoute>
            <Main>
              <View>
                <PrivateRoute>
                  <Route exact path="/user" render={() => <User />} />
                  <Route exact path="/user/cart" render={() => <Cart />} />
                  <Route path="/user/order">
                    <Route
                      exact
                      path="/user/order/:id"
                      render={() => <Order />}
                    />
                  </Route>
                  <Route path="/user/address">
                    <Route
                      exact
                      path="/user/address"
                      render={() => <Addresses />}
                    />
                    <Route
                      exact
                      path="/user/address/edit/:id"
                      render={() => <AddressFormEdit />}
                    />
                    <Route
                      exact
                      path="/user/address/add"
                      render={(props) => <AddressFormAdd {...props} />}
                    />
                  </Route>
                  <Route path="/user/your-orders">
                    <Route
                      exact
                      path="/user/your-orders"
                      render={() => <YourOrders />}
                    />
                  </Route>
                </PrivateRoute>
              </View>
            </Main>
          </UserRoute>
        </Route>
        <Route
          exact
          path="/contact"
          render={() => (
            <UserRoute>
              <Main>
                <View>
                  <Contact />
                </View>
              </Main>
            </UserRoute>
          )}
        />
        <Route path="/order">
          <UserRoute>
            <Main>
              <View>
                <Route
                  exact
                  path="/order/fail"
                  render={() => <SvgInfo type="Payment Failed" />}
                />
                <Route
                  exact
                  path="/order/success"
                  render={() => <SvgInfo type="Order Confirmed" />}
                />
              </View>
            </Main>
          </UserRoute>
        </Route>
        <Route exact path="/register">
          <Main>
            <View>
              <Sign>
                <Register />
              </Sign>
            </View>
          </Main>
        </Route>
        <Route exact path="/login">
          <Main>
            <View>
              <Sign>
                <Login />
              </Sign>
            </View>
          </Main>
        </Route>
        <Route
          exact
          path="/wentWrong"
          render={() => (
            <Main>
              <View>
                <SvgInfo type="Something Went Wrong" />
              </View>
            </Main>
          )}
        />
        <Route
          exact
          path="/accessDenied"
          render={() => (
            <Main>
              <View>
                <SvgInfo type="Access Denied" />
              </View>
            </Main>
          )}
        />
        <Route
          exact
          path="/verificationSuccess"
          render={() => (
            <Main>
              <View>
                <SvgInfo type="User Verified" />
              </View>
            </Main>
          )}
        />
        <Route
          exact
          path="/verificationFailed"
          render={() => (
            <Main>
              <View>
                <SvgInfo type="Verification Failed" />
              </View>
            </Main>
          )}
        />
        <Route
          exact
          path="/userVerify/:token"
          render={() => (
            <Main>
              <View>
                <TokenVerification />
              </View>
            </Main>
          )}
        />
        <Route path="/admin">
          <AdminRoute>
            <Dashboard>
              <Route exact path="/admin" render={() => <AdminOrders />} />
              <Route path="/admin/categories">
                <Route
                  exact
                  path="/admin/categories"
                  render={() => <AdminCategories />}
                />
                <Route
                  exact
                  path="/admin/categories/add"
                  render={() => <CategoryAdd />}
                />
                <Route
                  exact
                  path="/admin/categories/edit/:id"
                  render={() => <CategoryEdit />}
                />
              </Route>
              <Route path="/admin/series">
                <Route
                  exact
                  path="/admin/series"
                  render={() => <AdminSeries />}
                />
                <Route
                  exact
                  path="/admin/series/add"
                  render={() => <SeriesAdd />}
                />
                <Route
                  exact
                  path="/admin/series/edit/:id"
                  render={() => <SeriesEdit />}
                />
              </Route>
              <Route path="/admin/products">
                <Route
                  exact
                  path="/admin/products"
                  render={() => <AdminProducts />}
                />
                <Route
                  exact
                  path="/admin/products/add"
                  render={() => <ProductAdd />}
                />
                <Route
                  exact
                  path="/admin/products/edit/:id"
                  render={() => <ProductEdit />}
                />
              </Route>
              <Route path="/admin/delivery">
                <Route
                  exact
                  path="/admin/delivery"
                  render={() => <AdminDelivery />}
                />
                <Route
                  exact
                  path="/admin/delivery/add"
                  render={() => <DeliveryAdd />}
                />
                <Route
                  exact
                  path="/admin/delivery/edit/:id"
                  render={() => <DeliveryEdit />}
                />
              </Route>
            </Dashboard>
          </AdminRoute>
        </Route>
      </Route>
      <Route
        render={() => (
          <Main>
            <View>
              <SvgInfo type="Not Found" />
            </View>
          </Main>
        )}
      />
    </Switch>
  );
};

export default Routing;
