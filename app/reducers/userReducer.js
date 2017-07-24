const ADD_USER = 'ADD_USER';

const addUser = user => ({ type: ADD_USER, user });

const initialState = {
    users: [],
    user: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return Object.assign({}, { users: [...state.users, action.user] })
        default: 
            return state;
    }
}