import React from "react";
import ReactDOM from "react-dom/client";
//import 'bootstrap/dist/css/bootstrap.min.css'
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import { AdminRoute, PrivateRoute, ResetRoute, OtpRoute } from "./components";

import {
  CollectionScreen,
  CoursesScreen,
  DocumentListScreen,
  DocumentScreen,
  ExamsScreen,
  HomeScreen,
  LoginScreen,
  OTPinput,
  ProfileScreen,
  RegisterScreen,
  ResetPassword,
  SearchScreen,
  SummariesScreen,
  UserEditScreen,
  UserListScreen,
  DocumentEditScreen,
} from "./screens";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/exams' element={<ExamsScreen />} />
      <Route path='/exams/page/:pageNumber' element={<ExamsScreen />} />
      <Route path='/courses' element={<CoursesScreen />} />
      <Route path='/courses/page/:pageNumber' element={<CoursesScreen />} />
      <Route path='/summaries' element={<SummariesScreen />} />
      <Route path='/summaries/page/:pageNumber' element={<SummariesScreen />} />
      <Route path='/search/:keyword' element={<SearchScreen />} />
      <Route path='/page/:pageNumber' element={<SearchScreen />} />
      <Route
        path='/search/:keyword/page/:pageNumber'
        element={<SearchScreen />}
      />
      <Route path='/document/:id' element={<DocumentScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />

      <Route path='' element={<OtpRoute />}>
        <Route path='/forgotpassword' element={<OTPinput />} />
      </Route>

      <Route path='' element={<ResetRoute />}>
        <Route path='/resetpassword' element={<ResetPassword />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path='/collection/:id' element={<CollectionScreen />} />
        <Route path='/profile' element={<ProfileScreen />}>
          <Route path='/profile/userinfo' element={<ProfileScreen />} />
          <Route path='/profile/favourites' element={<ProfileScreen />} />
          <Route path='/profile/collections' element={<ProfileScreen />} />
        </Route>
      </Route>

      <Route element={<AdminRoute />}>
        <Route path='/admin/documentlist' element={<DocumentListScreen />} />
        <Route
          path='/admin/documentlist/:pageNumber'
          element={<DocumentListScreen />}
        />
        <Route
          path='/admin/document/:id/edit'
          element={<DocumentEditScreen />}
        />
        <Route path='/admin/userlist' element={<UserListScreen />} />
        <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
      </Route>
    </Route>,
  ),
);

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>,
);
