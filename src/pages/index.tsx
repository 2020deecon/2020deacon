import React from 'react';
import { Route as Switch, Route } from 'react-router-dom';

import Home from './Home';
import SignUp from './SignUp';
import MakeProblem from './makeProblem';
import MakeWorkbook from './makeWorkbook';
import Mypage from './Mypage';
import viewworkbook from './view/workbookView';
import makeproblem from './makecommunity';
import DetailsView from './view/DetailProblem';
import Login from './login';
import comuntiy from './communtiy';

function Index() {
	return (
		<Switch>
			<Route path={['/', '/explan/:id']} exact component={Home} />
			<Route path="/signup" exact component={SignUp} />
			<Route path="/login" exact component={Login} />
			<Route path="/makeproblem" exact component={MakeProblem} />
			<Route path="/makeworkbook" exact component={MakeWorkbook} />
			<Route path="/makecommunity" exact component={makeproblem} />
			<Route path="/mypage" exact component={Mypage} />
			<Route path="/viewworkbook/:id/" exact component={viewworkbook} />
			<Route path="/popup/:id/" exact component={DetailsView} />
			<Route
				path={['/community/:id', '/community']}
				exact
				component={comuntiy}
			/>
		</Switch>
	);
}

export default Index;
