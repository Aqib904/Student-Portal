import { Provider } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Auth from "./layout/Auth";
import Student from "./layout/Student";
import Teacher from "./layout/Teacher"
import Admin from "./layout/Admin"
import routes from "./routes";
import store from "./store";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            {routes.map((route) => {
              switch (route.layout) {
                case "student":
                  return (
                    <Route exact path={route.path}>
                      <Student>
                        <route.component />
                      </Student>
                    </Route>
                  );
                  case "teacher":
                    return (
                      <Route exact path={route.path}>
                        <Teacher>
                          <route.component />
                        </Teacher>
                      </Route>
                    );
                    case "admin":
                      return (
                        <Route exact path={route.path}>
                          <Admin>
                            <route.component />
                          </Admin>
                        </Route>
                      );
                case "auth":
                  return (
                    <Route exact path={route.path}>
                      <Auth>
                        <route.component />
                      </Auth>
                    </Route>
                  );
              }
            })}
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;