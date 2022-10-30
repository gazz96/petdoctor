import { hookstate, useHookstate } from '@hookstate/core';

const userState = hookstate({});

const UserContext = () => {
    const user = useHookstate(userState);
    return {
        get: () => user.value,
        setUser: (data) => {
            user.set(data);
        },
    }
}

export default UserContext;