import {fetchNeighboursPending, fetchNeighboursSuccess, fetchNeighboursError} from './actions';


export function fetchNeighbours(request){

    // const cors_headers = {'Access-Control-Allow-Credentials' : true,
    //     'Access-Control-Allow-Origin':'*',
    //     'Access-Control-Allow-Methods':'GET,POST',
    //     'Access-Control-Allow-Headers':'application/json',
    //   };
      const URL = 'http://localhost/get_neighbours';
      if (typeof(request) === "string")
        {
            return dispatch => {
                dispatch(fetchNeighboursPending());
                fetch(`${URL}/login/${request}`,{

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
                    dispatch(fetchNeighboursSuccess(res));
                })
                .catch(error => {
                    dispatch(fetchNeighboursError(error));
                }
            )
        }
    }else{
        let data = {}
        console.log(request);

        for (let i = 0 ; i <  request.cats.length; i++){
            data[i] = true
        }
        data['languages'] = request.languages
        return dispatch => {
            dispatch(fetchNeighboursPending());
            fetch(`${URL}`,{

                method: 'POST',
                headers: Object.assign( {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }),
                body: JSON.stringify(data)
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
                dispatch(fetchNeighboursSuccess(res));
                // return res.stats;
            })
            .catch(error => {
                dispatch(fetchNeighboursError(error));
            }
        )
    }
    }
}