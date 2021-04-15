export interface User{
    id: string;
    email: string;
    password: string;
    username: string;
}
export interface UserProfile{
    email: string;
    username: string;
    status: boolean;
    uid: string;
    profileImageUrl: string;
}