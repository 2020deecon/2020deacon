import React from "react";
import { Route as Switch, Route } from "react-router-dom";

import Home from "./Home";
import SignUp from "./SignUp";
import MakeProblem from "./makeProblem";
import MakeWorkbook from "./makeWorkbook";
import Community from "./community";
import Mypage from "./Mypage";
import viewproblem from "./view/problemsView";
import viewworkbook from "./view/workbookView";
import viewcommunity from "./view/communityView";
import makeproblem from "./makecommunity";
import DetailsView from "./DetailProblem";
import Login from "./login";
import New from "./newcommuntiy";


function Index() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/login" exact component={Login} />
      <Route path="/makeproblem" exact component={MakeProblem} />
      <Route path="/makeworkbook" exact component={MakeWorkbook} />
      <Route path="/mypage" exact component={Mypage} />
      <Route path="/community" exact component={Community} />
      <Route path="/makecommunity" exact component={makeproblem} />
      <Route path="/viewproblem/:id/" exact component={viewproblem} />
      <Route path="/viewworkbook/:id/" exact component={viewworkbook} />
      <Route path="/viewCommunity/:id/" exact component={viewcommunity} />
      <Route path="/popup/:id/" exact component={DetailsView} />
      <Route path={["/test/:id", "/test"]} exact component={New} />
    </Switch>
  );
}

export default Index;
