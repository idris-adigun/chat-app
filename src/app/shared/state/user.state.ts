import { State, Action, StateContext, Selector } from '@ngxs/store';
import { UserProfile } from '../models/user.model';
import { setUserProfile, RemoveUserProfile } from '../actions/user.actions';

export class UserProfileStateModel {
    userProfile : UserProfile
}

@State<UserProfileStateModel>({
    name: 'userProfile',
    defaults: {
        userProfile : {
            email: '',
            username: '',
            status: false,
            uid: '',
            profileImageUrl: '',
        }
    }
})

export class UserProfileState{

    @Selector()
    static getUserProfile(state: UserProfileStateModel) {
        return state;
    }

    @Action(setUserProfile)
    setUserProfile({setState}: StateContext<UserProfileStateModel>, { payload } : setUserProfile){
            setState({userProfile: payload})
    }

    @Action(RemoveUserProfile)
    remove({getState, patchState}: StateContext<UserProfileStateModel>, { payload } : RemoveUserProfile){
        patchState({
            userProfile: getState().userProfile
        })
    }
}