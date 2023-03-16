import { legacy_createStore } from 'redux';

const initState = {
    user: null
}
const reducer = (state = initState, action) => {
    if (action.type === 'login'){
        localStorage.setItem('JWT_PAYLOAD', action.token);
        localStorage.setItem('_ID', action._id);
        localStorage.setItem('Q_ID', action._qid);
        return {
            ...state,
            user: action.user,
            quiz: action.quiz
        } 
    } else if (action.type === 'set_user') {
        return {
            ...state,
            user: action.user,
          
        }
        } else if (action.type === 'set_quiz') {
            return {
                ...state,
                quiz: action.quiz
            }
            
        
    } else {
    return state;
}
}
const storage = legacy_createStore(reducer); 


export default storage;