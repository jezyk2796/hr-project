import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AppRoute } from '../AppRoute';
import { Home } from '../views/home/Home';
import { SignIn } from '../views/sign-in/SignIn';
import { SignUp } from '../views/sign-up/SignUp';
import { Dashboard } from '../views/dashboard/Dashboard';
import { Profile } from '../views/profile/Profile';
import { Jobs } from '../views/jobs/Jobs';
import { Job } from '../views/job/Job';
import { AddJob } from '../views/add-job/AddJob';
import { EditJob } from '../views/edit-job/EditJob';

import { AuthGuard } from './auth-guard/AuthGuard';
import { GuestGuard } from './guest-guard/GuestGuard';

export const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route element={<GuestGuard />}>
          <Route path={AppRoute.home} element={<Home />} />
          <Route path={AppRoute.signIn} element={<SignIn />} />
          <Route path={AppRoute.signUp} element={<SignUp />} />
        </Route>
        <Route element={<AuthGuard />}>
          <Route path={AppRoute.dashboard} element={<Dashboard />} />
          <Route path={AppRoute.profile} element={<Profile />} />
          <Route path={AppRoute.jobs} element={<Jobs />} />
          <Route path={AppRoute.jobsId} element={<Job />} />
          <Route path={AppRoute.addJob} element={<AddJob />} />
          <Route path={AppRoute.editJob} element={<EditJob />} />
        </Route>
      </Routes>
    </Router>
  );
};
