import {fetchOffersPending,fetchOffersSuccess, fetchOffersError} from './actions';



export function fetchOffers(name){
    const URL = 'http://localhost';
    return dispatch => {
        dispatch(fetchOffersPending());
        fetch(`${URL}/find/job/${name}`,{

            method: 'GET',
            // headers: cors_headers,
        })
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(res => {
            console.log(res);
            if(res.error) {
                throw(res.error);
            }
            dispatch(fetchOffersSuccess(res));
        })
        .catch(error => {
            dispatch(fetchOffersError(error));
        }
    )
}
}