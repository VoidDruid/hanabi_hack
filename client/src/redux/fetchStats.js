import {fetchPRLangsPending, fetchPRLangsSuccess, fetchPRLangsError,
        fetchPRHistoryPending, fetchPRHistorySuccess, fetchPRHistoryError,
        fetchLangPrsStatsPending,fetchLangPrsStatsSuccess, fetchLangPrsStatsError,
        fetchStarsPending, fetchStarsSuccess, fetchStarsError,
        fetchLangsCountPending, fetchLangsCountSuccess, fetchLangsCountError,
} from './actions';

function fetchStats(name) {
    console.log("get request");
    console.log(name);
    // const cors_headers = {'Access-Control-Allow-Credentials' : true,
    //     'Access-Control-Allow-Origin':'*',
    //     'Access-Control-Allow-Methods':'GET',
    //     'Access-Control-Allow-Headers':'application/json',
    //   };
      const URL = 'http://localhost';
    return dispatch => {
        dispatch(fetchPRLangsPending());
        fetch(`${URL}/prs/by_lang/${name}`,{

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
            dispatch(fetchPRLangsSuccess(res));
            // return res.stats;
        })
        .catch(error => {
            dispatch(fetchPRLangsError(error));
        })
        dispatch(fetchPRHistoryPending());
        fetch(`${URL}/prs/by_date/${name}`,{

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
            dispatch(fetchPRHistorySuccess(res));
        })
        .catch(error => {
            dispatch(fetchPRHistoryError(error));
        })
        dispatch(fetchLangPrsStatsPending());
        fetch(`${URL}/langs/prs/${name}`,{

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
            dispatch(fetchLangPrsStatsSuccess(res));

        })
        .catch(error => {
            dispatch(fetchLangPrsStatsError(error));
        })
        dispatch(fetchStarsPending());
        fetch(`${URL}/stars/${name}`,{

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
            dispatch(fetchStarsSuccess(res));

        })
        .catch(error => {
            dispatch(fetchStarsError(error));
        })
        dispatch(fetchLangsCountPending());
        fetch(`${URL}/langs/counts/${name}`,{

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
            dispatch(fetchLangsCountSuccess(res));

        })
        .catch(error => {
            dispatch(fetchLangsCountError(error));
        })
    }
}

export default fetchStats;