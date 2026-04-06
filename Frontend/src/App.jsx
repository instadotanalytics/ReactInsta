import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Home from "./Pages/Home";
import AdminLogin from "./Admin/AdminLogin";
import Dashboard from "./Admin/AdminDashboard/Dashboard";
import PrivateRoute from "./Admin/AdminDashboard/PrivateRoute";
import CoursePage from "./Pages/Courses/CoursePage";
import CourseDetailPage from "./Pages/CourseDetailPage";
import Internship from "./Pages/Career/Internship/Internship";
import FullTimeJob from "./Pages/Career/FullTimeJob/FullTimeJob";
import PlacementRoute from "./Pages/Career/Placement/PlacementRoute";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import MicrosoftHeroSection from "./Pages/Certification/Microsoft/MicrosoftHeroSecton";
import IBM from "./Pages/Certification/IBM/IBM";
import AWS from "./Pages/Certification/Aws/AWS";
import Redhat from "./Pages/Certification/RedHat/Redhat";
import Custom from "./Pages/Certification/Custom/custom";
import ForgotPassword from "./Hr&Counsler/ForgotPassword";
import HrCounslerLogin from "./Hr&Counsler/HrCounslerLogin";
import HrCounslerSignup from "./Hr&Counsler/HrCounslerSignup";
import HrDashboard from "./Hr&Counsler/hr-dashboard/HrDashboard";
import CounselorDashboard from "./Hr&Counsler/counselor-dashboard/CounselorDashboard"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/course/:id" element={<CourseDetailPage />} />
        <Route path="/career/internship" element={<Internship />} />
        <Route path="/career/fulltime" element={<FullTimeJob />} />
        <Route path="/career/placement" element={<PlacementRoute />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/certification/microsoft"
          element={<MicrosoftHeroSection />}
        />
        <Route path="/certification/ibm" element={<IBM />} />
        <Route path="/certification/aws" element={<AWS />} />
        <Route path="/certification/redhat" element={<Redhat />} />
        <Route path="/certification/custom" element={<Custom />} />
        <Route path="/hr-counsler-signup" element={<HrCounslerSignup />} />
        <Route path="/hr-counsler-login" element={<HrCounslerLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/counselor-dashboard" element={<CounselorDashboard/>} />

        <Route path="/hr-dashboard" element={<HrDashboard/>} />

        {/* Protected Route */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
