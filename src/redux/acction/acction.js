export const getList = (id) => ({
    type: 'GETLIST',
    payload: id,
});

export const updateAccount = (item) => ({
    type: 'UPDATEACCOUNT',
    payload: item,
});

