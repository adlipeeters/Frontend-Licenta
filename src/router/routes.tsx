import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";
import AuthLayout from "../components/Layout/AuthLayout";
import FullScreenLoader from "../components/FullScreenLoader/FullScreenLoader";
import Layout from "../components/Layout/Layout";
import RequireUser from "../middleware/RequireUser";
// import UnauthorizePage from "../middleware/UnauthorizedPage";
import About from "../pages/About/About";
import Accounts from "../pages/Accounts/Accounts";
import AccountPage from "../pages/Accounts/components/AccountPage";
import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";
import Categories from "../pages/Categories/Categories";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import Transactions from "../pages/Transactions/Transactions";
// import RequireUser from '../components/requireUser';
// import HomePage from '../pages/home.page';
// import LoginPage from '../pages/login.page';
// import ProfilePage from '../pages/profile.page';

const Loadable =
  (Component: React.ComponentType<any>) => (props: JSX.IntrinsicAttributes) =>
    (
      <Suspense fallback={<FullScreenLoader />}>
        <Component {...props} />
      </Suspense>
    );

// const RegisterPage = Loadable(lazy(() => import('../pages/register.page')));
const UnauthorizePage = Loadable(
  lazy(() => import("../middleware/UnauthorizedPage"))
);
// const EmailVerificationPage = Loadable(
//   lazy(() => import('../pages/verifyemail.page'))
// );

const authRoutes: RouteObject = {
  path: "*",
  element: <AuthLayout />,
  children: [
    {
      path: "login",
      element: <SignIn />,
    },
    {
      path: "register",
      element: <SignUp />,
    },
    // {
    //   path: 'verifyemail',
    //   element: <EmailVerificationPage />,
    //   children: [
    //     {
    //       path: ':verificationCode',
    //       element: <EmailVerificationPage />,
    //     },
    //   ],
    // },
  ],
};

const normalRoutes: RouteObject = {
  path: "*",
  element: <Layout />,
  children: [
    {
      // index: true,
      path: "dashboard",
      element: <RequireUser allowedRoles={["user", "admin"]} />,
      children: [
        {
          path: "",
          element: <Home />,
        },
      ],
    },
    {
      // index: true,
      path: "profile-settings",
      element: <RequireUser allowedRoles={["user", "admin"]} />,
      children: [
        {
          path: "",
          element: <Profile />,
        },
      ],
    },
    {
      path: "about",
      element: <RequireUser allowedRoles={["user", "admin"]} />,
      children: [
        {
          path: "",
          element: <About />,
        },
      ],
    },
    {
      path: "accounts",
      element: <RequireUser allowedRoles={["user", "admin"]} />,
      children: [
        {
          path: "",
          element: <Accounts />,
        },
        {
          path: ":id",
          element: <AccountPage />,
        },
      ],
    },
    {
      path: "transactions",
      element: <RequireUser allowedRoles={["user", "admin"]} />,
      children: [
        {
          path: "",
          element: <Transactions />,
        },
      ],
    },
    {
      path: "categories",
      element: <RequireUser allowedRoles={["user", "admin"]} />,
      children: [
        {
          path: "",
          element: <Categories />,
        },
      ],
    },
    {
      path: "unauthorized",
      element: <UnauthorizePage />,
    },
  ],
};

const routes: RouteObject[] = [authRoutes, normalRoutes];

export default routes;

// Old routes variant
// <BrowserRouter>
//   <Routes>
//     <Route element={<Layout />}>
//       <Route index path="/" element={<Home />} />
//       <Route path="/about">
//         <Route index element={<About />} />
//         <Route path=":number" element={<About />} />
//       </Route>
//       <Route path="*" element={<NotFound />} />
//     </Route>
//     <Route element={<AuthLayout />}>
//       <Route path="/auth">
//         <Route index element={<SignIn />} />
//         <Route path="*" element={<SignIn />} />
//       </Route>
//     </Route>
//     <Route path="*" element={<NotFound />} />
//   </Routes>
// </BrowserRouter>
