import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Home";
import SignUp from "./SignUp";
import MakeProblem from "./makeProblem";
import MakeWorkbook from "./makeWorkbook";
import Community from "./community";
import Mypage from "./Mypage";
import viewproblem from "./view/problemsView";
import viewworkbook from "./view/workbookView";
function Index() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/makeproblem" exact component={MakeProblem} />
      <Route path="/makeworkbook" exact component={MakeWorkbook} />
      <Route path="/mypage" exact component={Mypage} />
      <Route path="/community" exact component={Community} />
      <Route path="/viewproblem/:title/:subtitle/:img/" exact component={viewproblem} />
      <Route path="/viewworkbook/:title/" exact component={viewworkbook} />
    </Switch>
  );
}

export default Index;
