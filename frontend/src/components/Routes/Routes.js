import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { restoreSession } from '../../store/session';

export const ProtectedRoute = ({ comp: Component, ...rest }) => {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => !!state.session.user);
    useEffect(() => {
        dispatch(restoreSession())
    }, [])

    const action = () => {
        return (
            loggedIn ? (
                <Component {...rest} />
              ) : (
                <Redirect to="/login" />
              )
        )
    }
  
    return (
      <Route
        {...rest}
        >
            {action()}
        </Route>
        
    );
};