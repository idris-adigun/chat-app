// import { State, Action, StateContext, Selector } from '@ngxs/store';
// import { Contact } from '../models/contact.model';
// import { setContact, removeContact } from '../actions/contact.action';


// export class ContactStateModel {
//     contact : Contact[]
// }

// @State<ContactStateModel>({
//     name: 'contact',
//     defaults:  {
//         contact: []
//     }
// })

// export class ContactState{
//     @Selector()
//     static getContact(state: ContactStateModel) {
//         return state.contact;
//     }

//     @Action(setContact)
//     set({setState}: StateContext<ContactStateModel>, { payload } : setContact){
//         setState({contact: [payload]})
//     }

//     @Action(removeContact)
//     remove({getState, patchState}: StateContext<ContactStateModel>, { payload } : removeContact){
//         patchState({
//             contact: getState().contact.filter(a => a.uid != payload)
//         })
//     }

// }
