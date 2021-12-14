import {fetchUsers} from "./fetch-users";

export const fetchUserByUsername = async (username: string) => {
    const users = await fetchUsers();
    return users.find(user => user.username === username);
}
